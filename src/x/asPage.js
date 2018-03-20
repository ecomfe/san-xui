/**
 * @file san-xui/x/asPage.js
 * @author leeight
 */

import _ from 'lodash';
import URL from 'er/URL';

import {defineComponent} from '../sanx';
import Toolbar from './biz/Toolbar';
import RightToolbar from './biz/RightToolbar';
import XPager from './biz/XPager';
import Filter from './biz/Filter';
import BulkActions from './biz/BulkActions';
import {Page, matchAll, valueTransform, createToolbar} from './biz/helper';
import {ajaxAction} from './biz/ajaxAction';
import {dialogAlertAction} from './biz/dialogAlertAction';
import {dialogPlainAction} from './biz/dialogPlainAction';
import {dialogXLoaderAction} from './biz/dialogXLoaderAction';

// TODO(user) 注意使用 schema.$withTip 的地方，可能并不是一个好的设计
// 为了让不同的页面可以注入一些私货，貌似在生成模板的地方需要插入一些私货，否则只有在页面 attached 之后再动态的创建一些组件？

// 一个标记而已
const kShieldType = {};

export function asPage(schema, MainComponent) {
    /* eslint-disable */
    const template = `<template>
    <x-page
        class="{{klass}}"
        title="{{title}}"
        navs="{{navs}}"
        remark="{{remark}}"
        with-tip="{{withTip}}"
        with-sidebar="{{withSidebar}}"
        breadcrumbs="{{breadcrumbs}}"
    >
        <div class="list-page-helps" slot="helps" s-if="helps.length">
            <x-toolbar controls="{{helps}}" />
        </div>

        <div class="list-page-filter" slot="filter" s-if="withFilter">
            <x-filter
                s-ref="filter"
                title="{{filter.title}}"
                form-data="{=$filterPayload=}"
                submit-text="{{filter.submitText}}"
                controls="{{filter.controls}}"
                on-submit="onXFilter($event)" />
        </div>

        <div class="list-page-tb-left-filter" slot="tb-filter" s-if="withToolbarFilter">
            <x-filter
                s-ref="filter"
                title="{{filter.title}}"
                form-data="{=$filterPayload=}"
                submit-text="{{filter.submitText}}"
                controls="{{filter.controls}}"
                on-submit="onXFilter($event)" />
        </div>

        <div class="list-page-tb-left-toolbar" slot="tb-left" s-if="toolbar.length">
            <x-toolbar controls="{{toolbar}}" on-item-clicked="onToolbarEvent($event)" />
            <x-bulk-actions controls="{{bulkActions}}" disabled="{{!enableBuckActions}}" />
        </div>

        ${schema.$withTip ? '<div slot="tip">' + schema.$withTip + '</div>' : ''}

        <div slot="tb-right">
            <x-right-toolbar
                loading="{{table.loading}}"

                with-searchbox="{{withSearchbox}}"
                with-batch-delete="{{withBatchDelete}}"
                searchbox-value="{=$filterPayload.keyword=}"
                searchbox-placeholder="{{filter.$searchbox.placeholder}}"
                searchbox-keyword-type="{=$filterPayload.keywordType=}"
                searchbox-keyword-types="{{filter.$searchbox.datasource}}"

                with-tct="{{tct.datasource.length}}"
                tct-value="{=tct.value=}"
                tct-datasource="{{tct.datasource}}"

                on-refresh="refreshTable"
                on-search="doSearch"
                on-batch-delete="batchDelete"
                on-table-columns-changed="toggleTableColumns"
            />
        </div>

        <x-main
            columns="{{tableColumns}}"
            table="{{table}}"
            on-command="onTableCommand($event)"
            on-filter="onFilter($event)"
            on-sort="onSort($event)"
            on-selected-change="onTableRowSelected($event)"
            on-refresh="refreshTable"
        />

        <x-pager
            s-if="withPager && pager.count > 0"
            class="list-page-pager"
            pager="{=pager=}"
            with-total-count="{{withTotalCount}}"
            with-pager-size="{{withPagerSize}}"
            on-pager-size-change="onPagerSizeChange($event)"
            on-pager-change="onPagerChange($event)"
        />
    </x-page></template>`;
    /* eslint-enable */

    const WrappedComponent = defineComponent({    // eslint-disable-line
        template,
        components: {
            'x-main': MainComponent, // 这个是自定义的组件

            'x-page': Page,
            'x-filter': Filter,
            'x-bulk-actions': BulkActions,
            'x-toolbar': Toolbar,
            'x-right-toolbar': RightToolbar,
            'x-pager': XPager
        },

        computed: {
            withFilter() {
                const filter = this.data.get('filter');
                return filter
                    && filter.$position !== 'tb'
                    && filter.controls
                    && filter.controls.length > 0;
            },
            withToolbarFilter() {
                const filter = this.data.get('filter');
                return filter
                    && filter.$position === 'tb'
                    && filter.controls
                    && filter.controls.length > 0;
            },
            tableColumns() {
                const schema = this.data.get('table.schema');
                if (schema[0].$when && schema[0].$then) {
                    // 动态的情况，遍历所有的可能？
                    for (let i = 0; i < schema.length; i++) {
                        const {$when, $then} = schema[i];
                        if (matchAll(this, $when)) {
                            return $then;
                        }
                    }
                    // TODO(leeight) 这种情况怎么处理?
                    return [];
                }
                return schema;
            },
            enableBuckActions() {
                const selectedIndex = this.data.get('table.selectedIndex');
                const loading = this.data.get('table.loading');
                return !loading && selectedIndex && selectedIndex.length > 0;
            },
            pageState() {
                const pager = this.data.get('pager');
                const extraPayload = this.data.get('$extraPayload');
                const filterPayload = this.data.get('$filterPayload');
                return {
                    p: pager,
                    e: extraPayload,
                    f: filterPayload
                };
            },
            searchCriteria() {
                const pager = this.data.get('pager');
                const extraPayload = this.data.get('$extraPayload');
                const filterPayload = this.data.get('$filterPayload');
                const searchCriteria = {
                    pageNo: pager.page,
                    pageSize: pager.size
                };

                const keywordName = this.data.get('filter.$searchbox.name');
                if (keywordName) {
                    const keyword = filterPayload.keyword;
                    _.extend(searchCriteria, extraPayload,
                        _.omit(filterPayload, 'keyword'),
                        {[keywordName]: keyword}
                    );
                }
                else {
                    _.extend(searchCriteria, extraPayload, filterPayload);
                }

                return valueTransform(searchCriteria);
            }
        },

        initData() {
            /* eslint-disable */
            const {
                $pageClass, $breadcrumbs, $navs, $helps, $persistState, $autoToPrevPage,
                $withTip, $withPager, $withPagerSize, $withTotalCount, $withSearchbox, $withSidebar, $withBatchDelete,
                remark, title, toolbar, body
            } = schema;
            /* eslint-enable */
            const {bulkActions, filter, columns, $extraPayload, $select, $cellRenderer, $pageSize} = body;
            const {$onRequest, $onResponse, $onError} = body;
            const cellRenderer = $cellRenderer
                ? (...args) => $cellRenderer.apply(null, [...args, this.getSearchCriteria()])
                : null;

            const $filterPayload = {};
            const keywordType = _.get(filter, '$searchbox.keywordType');
            if (keywordType) {
                $filterPayload.keywordType = keywordType;
            }
            const keyword = _.get(filter, '$searchbox.value');
            if (keyword) {
                $filterPayload.keyword = keyword;
            }

            const withPersistState = $persistState && typeof history.pushState === 'function';

            this.$onRequest = $onRequest;
            this.$onResponse = $onResponse;
            this.$onError = $onError;

            const {p, e, f} = withPersistState ? this.__restorePageState() : {};

            const data = {
                title,
                klass: $pageClass,
                navs: $navs,
                helps: $helps,
                remark,
                toolbar: createToolbar(toolbar),
                bulkActions,
                filter,
                breadcrumbs: $breadcrumbs,
                withSidebar: !!$withSidebar,
                withPagerSize: !!$withPagerSize,
                withTotalCount: !!$withTotalCount,
                autoToPrevPage: !!$autoToPrevPage,
                withSearchbox: $withSearchbox !== false,
                withPager: $withPager !== false,
                withTip: !!$withTip,
                withBatchDelete: !!$withBatchDelete, // 是否支持批量删除
                withPersistState,

                loading: false, // 数据是否在加载中
                error: null, // 错误的情况
                table: {
                    loading: false, // 数据是否在加载中
                    disabledSelectAll: false, // 禁用全选的功能
                    error: null, // 加载失败的情况??
                    cellRenderer,
                    select: $select,
                    schema: columns, // 当前表格的列
                    datasource: [], // 当前可见的数据
                    selectedIndex: [],
                    selectedItems: [] // 当前选中的行
                },

                $extraPayload: e || $extraPayload,
                $filterPayload: f || $filterPayload,
                pager: p || {
                    size: $pageSize || 10,
                    page: 1,
                    count: 0,
                    datasource: [
                        {text: '10', value: 10},
                        {text: '20', value: 20},
                        {text: '50', value: 50},
                        {text: '100', value: 100}
                    ]
                }
            };

            return data;
        },

        __watcherTableColumns(tableColumns) {
            const datasource = [];
            const value = [];
            for (let i = 0; i < tableColumns.length; i++) {
                const col = tableColumns[i];
                if (!col.xui__hidden) {
                    value.push(col.name);
                }
                if (col.toggled) {
                    datasource.push({text: col.label, value: col.name});
                }
            }
            this.data.set('tct', {datasource, value});
        },

        // compiled,

        inited() {
            this.$childs = [];
            this.$tableInited = false;
            this.watch('tableColumns', tableColumns => this.__watcherTableColumns(tableColumns));
        },

        // created,

        attached() {
            this.__watcherTableColumns(this.data.get('tableColumns'));
            this.refreshTable();
        },

        // detached,

        disposed() {
            this.disposeInternalChilds();
        },

        onXFilter(formData) {
            this.onFilter(formData);
        },

        onFilter(filterPayload) {
            // a: b
            // c: d
            // e: f
            this.resetSearchCriteria(filterPayload);
            this.doSearch();
        },

        onSort({orderBy, order}) {
            this.data.set('$extraPayload.orderBy', orderBy);
            this.data.set('$extraPayload.order', order);
            this.doSearch();
        },

        $filterValue(key, value) {
            const nowValue = this.data.get(`$filterPayload.${key}`);
            if (nowValue === value) {
                return;
            }
            this.data.set(`$filterPayload.${key}`, value);
            this.refreshTable();
        },

        dialogActionType(config, payload = {}) {
            const body = config.dialog.body;
            switch (body.type) {
                case 'alert':
                    this.$dialogAlertAction(config, payload);
                    break;
                case 'plain':
                    this.$dialogPlainAction(config, payload);
                    break;
                case 'action-loader':
                    this.$dialogXLoaderAction(config, payload);
                    break;
                default:
                    throw new Error('Unsupported dialog type = ' + body.type);
            }
        },

        $ajaxAction: ajaxAction,
        $dialogAlertAction: dialogAlertAction,
        $dialogPlainAction: dialogPlainAction,
        $dialogXLoaderAction: dialogXLoaderAction,

        dispatchAction(config, payload = {}) {
            switch (config.actionType) {
                case 'ajax':
                    this.$ajaxAction(config, payload);
                    break;
                case 'dialog':
                    this.dialogActionType(config, payload);
                    break;
                case 'new-window':
                    window.open(_.template(config.link)(payload));
                    break;
                case 'go':
                    this.$go(_.template(config.link)(payload));
                    break;
                case 'link':
                    this.$redirect(_.template(config.link)(payload));
                    break;
                case 'filter':
                    // SEE: iam/account/policy/v3/List
                    this.$filterValue(config.$filterKey, config.value);
                    break;
            }
        },

        onTableCommand({type, payload, rowIndex}) {
            const config = schema.body.$commands && schema.body.$commands[type];
            if (!config) {
                return;
            }
            this.data.set('table.rowIndex', rowIndex - 1);
            this.dispatchAction(config, payload);
        },

        onToolbarEvent(item) {
            const config = item;
            if (config.actionType === 'custom') {
                if (typeof config.action === 'function') {
                    config.action.apply(this);
                }
                return;
            }
            const select = this.data.get('table.select');
            const payload = select === 'single'
                ? this.__selectedItems[0]
                : {items: this.__selectedItems};
            this.dispatchAction(config, payload);
        },

        onTableRowSelected({selectedIndex, selectedItems}) {
            this.__selectedItems = selectedItems;
            this.__selectedIndex = selectedIndex;
            // console.log(selectedIndex, selectedItems);

            // 更新 bulkActions 的状态
            const bulkActions = this.data.get('bulkActions');
            _.each(bulkActions, (item, i) => {
                // FIXME(leeight) 应该起个什么名字呢？
                if (typeof item.reactive === 'function') {
                    const newState = item.reactive(selectedItems); // 根据当前选中的内容，重新计算状态
                    if (newState && _.isObject(newState)) {
                        // 比如返回的可以是
                        // {disabled: true, label: 'eee'}
                        // {datasource: [], value: 'eee'}
                        _.each(newState, (value, key) => this.data.set(`bulkActions[${i}].${key}`, value));
                    }
                }
            });
        },

        onPagerSizeChange({value}) {
            const payload = this.getSearchCriteria();
            payload.pageNo = 1;
            payload.pageSize = value;
            this.loadPage(payload);
        },

        onPagerChange({pageNo}) {
            const payload = this.getSearchCriteria();
            payload.pageNo = pageNo;
            this.loadPage(payload);
        },

        resetSearchCriteria(filterPayload) {
            const $filterPayload = this.data.get('$filterPayload');
            const newFilterPayload = _.extend({}, $filterPayload, filterPayload);
            this.data.set('$filterPayload', newFilterPayload);
        },

        getSearchCriteria() {
            return this.data.get('searchCriteria');
        },

        disposeInternalChilds() {
            _.each(this.$childs, component => {
                const dialog = component.ref('dialog');
                if (dialog) {
                    dialog.dispose();
                }
                component.dispose();
            });
            this.$childs = [];
        },

        refreshTable() {
            this.disposeInternalChilds();
            const payload = this.getSearchCriteria();
            return this.loadPage(payload);
        },

        toggleTableColumns() {
            const columnNames = this.data.get('tct.value');
            const tableColumns = this.data.get('tableColumns');
            _.each(tableColumns, (col, i) => {
                // 如果不存在，说明需要隐藏
                const xuiHidden = _.indexOf(columnNames, col.name) === -1;
                this.data.set(`tableColumns[${i}].xui__hidden`, xuiHidden);
            });
        },

        transformTable(tableData) {
            return tableData;
        },

        __doRequest(api, payload) {
            let promise = '';
            if (_.isString(api)) {
                promise = this.$post(api, payload);
            }
            else {
                promise = api.then(request => request(payload))
                    .then(response => response.body);
            }
            return promise.then(page => {
                    return {
                        searchCriteria: payload,
                        searchResponse: page
                    };
                })
                .catch(error => {
                    throw {
                        searchCriteria: payload,
                        error
                    };
                });
        },

        __restorePageState() {
            // silent
            const query = this.$route().query;
            if (query && query.__state) {
                try {
                    // {p: ..., e: ..., f: ...}
                    return JSON.parse(query.__state);
                }
                catch (ex) {
                }
            }

            return {};
        },

        __savePageState() {
            // 保存当前页面的搜索条件
            const disableCache = true;
            const {query, path} = this.$route(disableCache);
            const pageState = this.data.get('pageState');
            query.__state = JSON.stringify(pageState);
            const newUrl = '#' + URL.withQuery(path, query).toString();
            history.pushState(null, '', newUrl);
        },

        loadPage(payload) {
            if (!this.lifeCycle.attached) {
                return;
            }

            const requestPayload = typeof this.$onRequest === 'function'
                ? this.$onRequest(payload) || payload
                : payload;

            if (_.isEqual(this.__searchCriteria, requestPayload)) {
                // 如果搜索条件一样，就忽略本次的请求
                return;
            }

            // this.__searchCriteria 保存最后一次的查询条件
            this.__searchCriteria = requestPayload;
            this.data.set('table.loading', true);
            return this.__doRequest(schema.body.api, requestPayload)
                .then(({searchCriteria, searchResponse}) => {
                    if (this.__searchCriteria === kShieldType
                        || this.__searchCriteria !== searchCriteria) {
                        return;
                    }
                    this.__searchCriteria = kShieldType;
                    this.$tableInited = true;
                    const page = searchResponse;
                    const responsePayload = typeof this.$onResponse === 'function'
                        ? this.$onResponse(page) || page
                        : page;
                    const {result, pageNo, totalCount} = responsePayload;

                    // 尝试请求前一页数据
                    const autoToPrevPage = this.data.get('autoToPrevPage');
                    if (autoToPrevPage && pageNo > 1 && result.length <= 0) {
                        return this.loadPage({...payload, pageNo: pageNo - 1});
                    }
                    const tableData = this.transformTable(result);
                    // 有些接口返回的 page.totalCount 是 0，但是 page.result 居然有内容
                    const resultTotalCount = totalCount > 0 ? totalCount : tableData.length;
                    this.data.set('table.loading', false);
                    this.data.set('table.error', null);
                    this.data.set('table.datasource', tableData);
                    this.data.set('pager.page', pageNo);
                    this.data.set('pager.count', resultTotalCount);

                    const withPersistState = this.data.get('withPersistState');
                    if (withPersistState) {
                        this.__savePageState();
                    }
                })
                .catch(({searchCriteria, error}) => {
                    if (this.__searchCriteria === kShieldType
                        || this.__searchCriteria !== searchCriteria) {
                        return;
                    }
                    this.__searchCriteria = kShieldType;
                    this.$tableInited = true;
                    if (typeof this.$onError === 'function') {
                        this.$onError(error);
                    }
                    this.data.set('table.loading', false);
                    this.data.set('table.error', error && error.global ? error.global : error);
                });
        },

        doSearch() {
            this.disposeInternalChilds();
            const payload = this.getSearchCriteria();
            if (this.$tableInited) {
                // 如果已经完成了数据的初始化，那么后续切换过滤条件的时候，才需要把页码恢复到第一页
                // 否则在初始化的时候，经常会发现因为 x-filter#submit 触发执行了 onXFilter 的逻辑，然后执行了
                // doSearch，导致把页面从 pageState 里面的值重置到了第一页
                payload.pageNo = 1;
            }
            return this.loadPage(payload);
        },

        // FIXME(leeight) 这个 messages 的应用场景如何?
        messages: {
            'refresh'() {
                this.refreshTable();
            },
            '*'(arg) {
                // 目前只有schema.body.$commands中的方法。如果后续添加了有不在$commands中的方法，可以再进行判断
                this.dispatchCommand(arg.name, arg.value);
            }
        },

        dispatchCommand(type, id) {
            const datasource = this.data.get('table.datasource');
            const payload = _.isString(id)
                ? _.find(datasource, item => item.id === id)
                : id; // maybe it's a payload object
            if (payload && type) {
                // TODO(leeight) rowIndex 可能会错，如何处理？
                this.onTableCommand({type, payload});
            }
        },

        // 根据查询条件批量删除数据
        batchDelete() {
            const payload = _.clone(this.getSearchCriteria());
            const reqOptions = {
                url: schema.body.deleteApi
            };
            const requestPayload = typeof this.$onRequest === 'function'
                ? this.$onRequest(payload, reqOptions) || payload
                : payload;

            const config = {
                actionType: 'ajax',
                api: schema.body.deleteApi,
                confirmText: '危险！是否确认删除当前筛选的所有数据？删除后数据将无法恢复。',
                $toastMessage: '批量删除成功'
            };
            this.dispatchAction(config, payload);
        }
    });

    // TODO(leeight) cache the WrappedComponent
    return WrappedComponent;
}
