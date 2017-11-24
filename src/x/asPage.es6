/**
 * @file inf-ui/x/createPage.es6
 * @author leeight
 */

import _ from 'lodash';
import Promise from 'promise';
import {defineComponent} from 'inf-ui/sanx';

import Toolbar from './biz/Toolbar';
import RightToolbar from './biz/RightToolbar';
import XPager from './biz/XPager';
import Filter from './biz/Filter';
import BulkActions from './biz/BulkActions';
import {Page, matchAll, createToolbar, createCommandMessages} from './biz/helper';
import {ajaxAction} from './biz/ajaxAction';
import {dialogAlertAction} from './biz/dialogAlertAction';
import {dialogPlainAction} from './biz/dialogPlainAction';
import {dialogXLoaderAction} from './biz/dialogXLoaderAction';

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
        <div slot="filter" s-if="withFilter">
            <x-filter
                s-ref="filter"
                title="{{filter.title}}"
                submit-text="{{filter.submitText}}"
                controls="{{filter.controls}}"
                on-submit="onFilter($event)" />
        </div>

        <div slot="tb-filter" s-if="withToolbarFilter">
            <x-filter
                s-ref="filter"
                title="{{filter.title}}"
                submit-text="{{filter.submitText}}"
                controls="{{filter.controls}}"
                on-submit="onFilter($event)" />
        </div>

        <div slot="helps" s-if="helps.length">
            <x-toolbar controls="{{helps}}" />
        </div>

        <div slot="tb-left" s-if="toolbar.length">
            <x-toolbar controls="{{toolbar}}" on-item-clicked="onToolbarEvent($event)" />
            <x-bulk-actions controls="{{bulkActions}}" disabled="{{!enableBuckActions}}" />
        </div>

        ${schema.$withTip ? '<div slot="tip">' + schema.$withTip + '</div>' : ''}

        <div slot="tb-right">
            <x-right-toolbar
                loading="{{table.loading}}"

                with-searchbox="{{withSearchbox}}"
                searchbox-value="{=$extraPayload.keyword=}"
                searchbox-placeholder="{{filter.$searchbox.placeholder}}"
                searchbox-keyword-type="{=$extraPayload.keywordType=}"
                searchbox-keyword-types="{{filter.$searchbox.datasource}}"

                with-tct="{{tct.datasource.length}}"
                tct-value="{=tct.value=}"
                tct-datasource="{{tct.datasource}}"

                on-refresh="refreshTable"
                on-search="doSearch"
                on-table-columns-changed="toggleTableColumns"
            />
        </div>

        <x-main
            columns="{{tableColumns}}"
            table="{{table}}"
            on-command="onTableCommand($event)"
            on-filter="onFilter($event)"
            on-selected-change="onTableRowSelected($event)"
            on-refresh="refreshTable"
        />

        <x-pager
            s-if="withPager && pager.count > 0"
            class="list-page-pager"
            pager="{{pager}}"
            with-pager-size="{{withPagerSize}}"
            on-pager-size-change="onPagerSizeChange($event)"
            on-pager-change="onPagerChange($event)"
        />
    </x-page></template>`;
    /* eslint-enable */

    const WrappedComponent = defineComponent({    // eslint-disable-line
        template,
        components: {
            'x-main': MainComponent,              // 这个是自定义的组件

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
            }
        },

        initData() {
            const {$pageClass, $breadcrumbs, $navs, $helps, $withTip, $withPager, $withPagerSize, $withSearchbox, $withSidebar, remark, title, toolbar, body} = schema;
            const {bulkActions, filter, columns, $extraPayload, $select, $cellRenderer, $pageSize} = body;
            const {$onRequest, $onResponse, $onError} = body;
            const cellRenderer = $cellRenderer
                ? (...args) => $cellRenderer.apply(null, [...args, this.data.get('$extraPayload')])
                : null;

            this.$onRequest = $onRequest;
            this.$onResponse = $onResponse;
            this.$onError = $onError;

            return {
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
                withSearchbox: $withSearchbox !== false,
                withPager: $withPager !== false,
                withTip: !!$withTip,
                $extraPayload,

                loading: false,         // 数据是否在加载中
                error: null,            // 错误的情况
                table: {
                    loading: false,           // 数据是否在加载中
                    disabledSelectAll: false, // 禁用全选的功能
                    error: null,              // 加载失败的情况??
                    cellRenderer,
                    select: $select,
                    schema: columns,          // 当前表格的列
                    datasource: [],           // 当前可见的数据
                    selectedIndex: [],
                    selectedItems: []         // 当前选中的行
                },
                pager: {
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

        inited() {
            const keywordType = this.data.get('filter.$searchbox.keywordType');
            if (keywordType) {
                this.data.set('$extraPayload.keywordType', keywordType);
            }

            const keyword = this.data.get('filter.$searchbox.value');
            if (keyword) {
                this.data.set('$extraPayload.keyword', keyword);
            }

            this.$childs = [];
            this.watch('tableColumns', tableColumns => this.__watcherTableColumns(tableColumns));
        },

        onFilter(filterOptions) {
            // a: b
            // c: d
            // e: f
            this.resetSearchCriteria(filterOptions);
            this.doSearch();
        },

        $filterValue(key, value) {
            const nowValue = this.data.get(`$extraPayload.${key}`);
            if (nowValue === value) {
                return;
            }
            this.data.set(`$extraPayload.${key}`, value);
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
            const config = schema.body.$commands[type];
            if (!config) {
                return;
            }
            this.data.set('table.rowIndex', rowIndex - 1);
            this.dispatchAction(config, payload);
        },

        onToolbarEvent(item) {
            const config = item;
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

        resetSearchCriteria(filterOptions) {
            const $extraPayload = this.data.get('$extraPayload');
            const newPayload = _.extend({}, $extraPayload, filterOptions);
            this.data.set('$extraPayload', newPayload);
        },

        getSearchCriteria() {
            const pager = this.data.get('pager');
            const payload = {
                pageNo: pager.page,
                pageSize: pager.size
            };

            const extraPayload = this.data.get('$extraPayload');
            const keywordName = this.data.get('filter.$searchbox.name');
            if (keywordName) {
                const keyword = extraPayload.keyword;
                return _.extend(payload, _.omit(extraPayload, 'keyword'), {[keywordName]: keyword});
            }
            return _.extend(payload, extraPayload);
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

        loadPage(payload) {
            const table = this.data.get('table');
            if (table.loading) {
                return Promise.resolve();
            }

            this.data.set('table.loading', true);
            const requestPayload = typeof this.$onRequest === 'function'
                ? this.$onRequest(payload) || payload
                : payload;
            return this.$post(schema.body.api, requestPayload)
                .then(page => {
                    const responsePayload = typeof this.$onResponse === 'function'
                        ? this.$onResponse(page) || page
                        : page;
                    const {result, pageNo, totalCount} = responsePayload;
                    const tableData = this.transformTable(result);
                    // 有些接口返回的 page.totalCount 是 0，但是 page.result 居然有内容
                    const resultTotalCount = totalCount > 0 ? totalCount : tableData.length;
                    this.data.set('table.loading', false);
                    this.data.set('table.error', null);
                    this.data.set('table.datasource', tableData);
                    this.data.set('pager.page', pageNo);
                    this.data.set('pager.count', resultTotalCount);
                })
                .fail(error => {
                    if (typeof this.$onError === 'function') {
                        this.$onError(error);
                    }
                    this.data.set('table.loading', false);
                    this.data.set('table.error', error);
                });
        },

        doSearch() {
            this.disposeInternalChilds();
            const payload = this.getSearchCriteria();
            payload.pageNo = 1;
            return this.loadPage(payload);
        },

        attached() {
            const filter = this.ref('filter');
            if (filter) {
                this.resetSearchCriteria(filter.data.get('formData'));
            }
            this.doSearch();

            this.__watcherTableColumns(this.data.get('tableColumns'));
        },

        messages: createCommandMessages(schema.body.$commands),

        dispatchCommand(type, id) {
            const datasource = this.data.get('table.datasource');
            const payload = _.isString(id)
                    ? _.find(datasource, item => item.id === id)
                    : id;   // maybe it's a payload object
            if (payload && type) {
                this.onTableCommand({type, payload});
            }
        }
    });

    // TODO(leeight) cache the WrappedComponent

    return WrappedComponent;
}
