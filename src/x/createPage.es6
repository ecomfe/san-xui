/**
 * @file inf-ui/x/createPage.es6
 * @author leeight
 */

import $ from 'jquery';
import _ from 'lodash';
import Promise from 'promise';
import locator from 'er/locator';
import {defineComponent} from 'san';
import Table from 'inf-ui/x/components/Table';
import TableColumnToggle from 'inf-ui/x/components/TableColumnToggle';
import FrozenColumnTable from 'inf-ui/x/components/FrozenColumnTable';
import Pager from 'inf-ui/x/components/Pager';
import Icon from 'inf-ui/x/components/Icon';
import Button from 'inf-ui/x/components/Button';
import Clipboard from 'inf-ui/x/components/Clipboard';
import Dialog from 'inf-ui/x/components/Dialog';
import RadioSelect from 'inf-ui/x/components/RadioSelect';
import Select from 'inf-ui/x/components/Select';
import SearchBox from 'inf-ui/x/components/SearchBox';
import Toast from 'inf-ui/x/components/Toast';
import Loading from 'inf-ui/x/components/Loading';
import Go from 'inf-ui/x/components/Go';
import {asDialog} from 'inf-ui/x/components/asDialog';
import io from 'bat-ria/io/serverIO';

import LegacyActionAdapter from './biz/LegacyActionAdapter';
import Filter from './biz/Filter';
import BulkActions from './biz/BulkActions';
import {Page, Ghost, matchAll, confirm, alert, plain, displayDialog, createPayload, createToolbar} from './biz/helper';

function createClient(api) {
    return {
        sendRequest(payload = {}) {
            return io.post(api, payload, {'X-silence': true, 'x-silent': true});
        }
    };
}

export default function createPage(schema) {
    /* eslint-disable */
    const template = `<template>
    <page class="{{klass}}"
        title="{{title}}"
        navs="{{navs}}"
        remark="{{remark}}"
        with-tip="{{withTip}}"
        with-sidebar="{{withSidebar}}"
        breadcrumbs="{{breadcrumbs}}">
        <div slot="filter" s-if="filter && filter.$position !== 'tb' && filter.controls.length > 0">
            <x-filter
                s-ref="filter"
                title="{{filter.title}}"
                submit-text="{{filter.submitText}}"
                controls="{{filter.controls}}"
                on-submit="onFilter($event)" />
        </div>

        <div slot="tb-filter" s-if="filter && filter.$position === 'tb' && filter.controls.length > 0">
            <x-filter
                s-ref="filter"
                title="{{filter.title}}"
                submit-text="{{filter.submitText}}"
                controls="{{filter.controls}}"
                on-submit="onFilter($event)" />
        </div>

        <div slot="helps" s-if="helps.length">
            <ui-ghost s-for="item in helps">
                <a
                    s-if="item.type === 'link'"
                    target="_blank"
                    href="{{item.link}}">{{item.label}}</a>
            </ui-ghost>
        </div>

        <div slot="tb-left" s-if="toolbar.length">
            <ui-ghost s-for="item in toolbar">
                <ui-button
                    s-if="item.type === 'button'"
                    on-click="onToolbarEvent(item)"
                    disabled="{{item.disabled}}"
                    icon="{{item.icon}}"
                    label="{{item.label}}"
                    skin="{{item.skin}}"
                    />
                <ui-radioselect
                    s-if="item.type === 'button-group'"
                    value="{{item.value}}"
                    disabled="{{item.disabled}}"
                    on-change="onToolbarEvent($event)"
                    datasource="{{item.datasource}}"
                    />
                <a
                    s-if="item.type === 'link'"
                    target="_blank"
                    href="{{item.link}}">{{item.label}}</a>
                <span s-if="item.type === 'divider'">&nbsp;</span>
            </ui-ghost>
            <bulk-actions items="{{bulkActions}}" disabled="{{!enableBuckActions}}" />
        </div>

        ${schema.$withTip ? '<div slot="tip">' + schema.$withTip + '</div>' : ''}

        <div slot="tb-right">
            <ui-searchbox
                s-if="withSearchbox"
                value="{=$extraPayload.keyword=}"
                keyword-type="{=$extraPayload.keywordType=}"
                placeholder="{{filter.$searchbox.placeholder}}"
                datasource="{{filter.$searchbox.datasource}}"
                on-search="doSearch"
            />
            <ui-button disabled="{{table.loading}}" on-click="refreshTable" icon="refresh" />
            <ui-table-column-toggle
                s-if="tct.datasource.length"
                on-change="toggleTableColumns"
                layer-align="right"
                layer-offset-left="{{0}}"
                value="{=tct.value=}"
                datasource="{{tct.datasource}}"
                />
        </div>

        <ui-f-table
            s-if="isFrozenTable"
            select="{{table.select}}"
            schema="{{tableColumns}}"
            loading="{{table.loading}}"
            error="{{table.error}}"
            datasource="{{table.datasource}}"
            cell-builder="{{table.cellRenderer}}"
            disabled-select-all="{{table.disabledSelectAll}}"
            selected-index="{=table.selectedIndex=}"
            on-command="onTableCommand($event)"
            on-filter="onFilter($event)"
            on-selected-change="onTableRowSelected($event)">
        >
            <div slot="error">
                啊呀，出错了？<a href="javascript:void(0)" on-click="refreshTable">重新加载</a>
            </div>
        </ui-f-table>

        <ui-table
            s-else
            select="{{table.select}}"
            schema="{{tableColumns}}"
            loading="{{table.loading}}"
            error="{{table.error}}"
            datasource="{{table.datasource}}"
            cell-builder="{{table.cellRenderer}}"
            disabled-select-all="{{table.disabledSelectAll}}"
            selected-index="{=table.selectedIndex=}"
            on-command="onTableCommand($event)"
            on-filter="onFilter($event)"
            on-selected-change="onTableRowSelected($event)">

            <div slot="error">
                啊呀，出错了？<a href="javascript:void(0)" on-click="refreshTable">重新加载</a>
            </div>
        </ui-table>

        <div class="list-page-pager" s-if="pager.count > 0">
            <label s-if="withPagerSize">每页展示</label>
            <ui-select
                s-if="withPagerSize"
                layer-width="80"
                datasource="{{pager.datasource}}"
                value="{=pager.size=}"
                on-change="onPagerSizeChange($event)"
                />
            <ui-pager
                size="{{pager.size}}"
                page="{{pager.page}}"
                count="{{pager.count}}"
                back-text="<"
                forward-text=">"
                on-change="onPagerChange($event)" />
        </div>
    </page></template>`;
    /* eslint-enable */

    return defineComponent({
        template,
        components: {
            'x-filter': Filter,
            'bulk-actions': BulkActions,
            'page': Page,
            'ui-ghost': Ghost,
            'ui-select': Select,
            'ui-radioselect': RadioSelect,
            'ui-table': Table,
            'ui-f-table': FrozenColumnTable,
            'ui-table-column-toggle': TableColumnToggle,
            'ui-pager': Pager,
            'ui-icon': Icon,
            'ui-clipboard': Clipboard,
            'ui-button': Button,
            'ui-dialog': Dialog,
            'ui-loading': Loading,
            'ui-searchbox': SearchBox
        },

        computed: {
            isFrozenTable() {
                const tableColumns = this.data.get('tableColumns');
                for (let i = 0; i < tableColumns.length; i++) {
                    const col = tableColumns[i];
                    if (col.freezed) {
                        return true;
                    }
                }
                return false;
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
            const {$pageClass, $breadcrumbs, $navs, $helps, $withTip, $withPagerSize, $withSearchbox, $withSidebar, remark, title, toolbar, body} = schema;
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

        setFilterValue(key, value) {
            const nowValue = this.data.get(`$extraPayload.${key}`);
            if (nowValue === value) {
                return;
            }
            this.data.set(`$extraPayload.${key}`, value);
            this.refreshTable();
        },

        ajaxActionType(config, payload) {
            const {confirmText, api, $before, $done, $error, $payloadFields, $extraPayload, $toastMessage} = config;
            const sendRequest = () => {
                const requestPayload = createPayload(payload, $payloadFields, $extraPayload);
                if (typeof $before === 'function') {
                    $before.call(this, requestPayload);
                }
                return createClient(api).sendRequest(requestPayload)
                    .then(response => {
                        if ($toastMessage) {
                            Toast.success($toastMessage, 3000);
                        }
                        if (typeof $done === 'function') {
                            return $done.call(this, response, requestPayload);
                        }
                        return this.refreshTable();
                    })
                    .fail(error => {
                        if (typeof $error === 'function') {
                            $error.call(this, error, requestPayload);
                        }

                        if (error.global) {
                            Toast.error(error.global);
                        }
                        this.data.set('error', error);
                    });
            };

            if (confirmText) {
                const message = _.template(confirmText)(payload);
                return confirm({message}).then(sendRequest);
            }
            return sendRequest();
        },

        dialogActionType(config, payload = {}) {
            const {width, height, title, body, foot} = config.dialog;
            const $title = _.template(title)(payload);
            const type = body.type;
            if (type === 'alert') {
                const content = body.content;
                const alertMessage = _.template(content)(payload);
                alert({title: $title, width, foot, message: alertMessage}).then(() => {
                    if (foot && foot.okBtn && foot.okBtn.actionType) {
                        const config = foot.okBtn;
                        this.dispatchAction(config, payload);
                        // FIXME(leeight) 可能不太合适
                        this.refreshTable();
                    }
                });
            }
            else if (type === 'plain') {
                const content = body.content;
                if (typeof content === 'function') {
                    // 重新构造一个动态的组件出来
                    const DialogComponent = asDialog(content);
                    const dialogData = {
                        title: $title, width, foot, payload
                    };
                    return displayDialog(DialogComponent, dialogData).then(() => {
                        if (foot && foot.okBtn && foot.okBtn.actionType) {
                            const config = foot.okBtn;
                            this.dispatchAction(config, payload);
                            // FIXME(leeight) 可能不太合适
                            this.refreshTable();
                        }
                    });
                }
                const plainMessage = _.template(content)(payload);
                return plain({title: $title, width, foot, message: plainMessage}).then(() => {
                    if (foot && foot.okBtn && foot.okBtn.actionType) {
                        const config = foot.okBtn;
                        this.dispatchAction(config, payload);
                        // FIXME(leeight) 可能不太合适
                        this.refreshTable();
                    }
                });
            }
            else if (type === 'action-loader') {
                let component;
                const {$payloadFields, $extraPayload, url} = body;
                const parentAction = {
                    reload: () => {
                        this.refreshTable();
                    },
                    view: {
                        showToast(message, options) {
                            Toast[options.messageType || 'success'](message);
                        }
                    },
                    // TODO(leeight) 貌似不是一个好的设计
                    dispatchCommand: (type, id) => {
                        const datasource = this.data.get('table.datasource');
                        const payload = _.isString(id)
                            ? _.find(datasource, item => item.id === id)
                            : id;   // maybe it's a payload object
                        if (payload && type) {
                            this.onTableCommand({type, payload});
                        }
                    }
                };
                const actionOptions = {
                    open: true,
                    width: width || 'auto',
                    height: height || 'auto',
                    title: $title, url,
                    options: _.extend(
                        {parentAction},
                        createPayload(payload, $payloadFields, $extraPayload)
                    )
                };
                const compData = {dialog: true, actionOptions};
                if (foot != null) {
                    compData.foot = foot;
                }
                component = new LegacyActionAdapter({data: compData});
                component.attach(document.body);
                this.$childs.push(component);
            }
        },

        dispatchAction(config, payload = {}) {
            switch (config.actionType) {
                case 'ajax':
                    this.ajaxActionType(config, payload);
                    break;
                case 'dialog':
                    this.dialogActionType(config, payload);
                    break;
                case 'new-window':
                    window.open(_.template(config.link)(payload));
                    break;
                case 'go':
                    this._goToService(_.template(config.link)(payload));
                    break;
                case 'link':
                    locator.redirect(_.template(config.link)(payload));
                    break;
                case 'filter':
                    this.setFilterValue(config.$filterKey, config.value);
                    break;
            }
        },

        _goToService(link) {
            const target = $(`<a href="${link}"></a>`);
            const event = $.Event('click', {target, currentTarget: target});  // eslint-disable-line
            Go.switchHandler(event, this);
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
            this.dispatchAction(config);
        },

        onTableRowSelected({selectedIndex, selectedItems}) {
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
            return createClient(schema.body.api).sendRequest(requestPayload)
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
        }
    });
}
