/**
 * @file v3/List.es6
 * @author leeight
 */

import _ from 'lodash';
import {defineComponent} from 'san';

import {create, P} from './components/util';
import Breadcrumbs from './components/Breadcrumbs';
import Filter from './components/Filter';
import BulkActions from './components/BulkActions';
import Table from './components/Table';
import Pager from './components/Pager';
import Button from './components/Button';
import Dialog from './components/Dialog';

const cx = create('list-page');

/* eslint-disable */
const template = `<template>
<div class="${cx()}">
    <h1 s-if="title">{{title}}</h1>

    <breadcrumbs s-if="breadcrumbs" items="{{breadcrumbs.items}}"></breadcrumbs>

    <div class="${cx('body')}">
        <filter s-if="body.filter"
            items="{{body.filter}}"
            on-submit="onFilter" />

        <p>
            <ui-button on-click="selectAllRows">Select All</ui-button>
            <ui-button on-click="selectNothing" label="Select Nothing" />
            <ui-button skin="primary" on-click="onShowDialog">Show Dialog</ui-button>
            <ui-button disabled>Disabled All</ui-button>
        </p>
        <br/>

        <ui-dialog open="{=showDialog=}">
            <ui-button on-click="closeTheDialog">Button in the dialog (Close).</ui-button>
            <ui-button on-click="openNewDialog">Open New Dialog.</ui-button>
        </ui-dialog>

        <ui-dialog open="{=showDialog2=}" width="300" foot="{{false}}">
            <ui-button on-click="closeTheDialog">Button in the dialog (Close).</ui-button>
        </ui-dialog>

        <div class="${cx('content')}">
            <div class="${cx('toolbar')}">
                <div class="${cx('tb-left')}">
                    <ui-button skin="primary">New</ui-button>
                    <bulk-actions items="{{bulkActions}}" disabled="{{!enableBuckActions}}" />
                </div>
                <div class="${cx('tb-right')}">
                    <ui-button disabled="{{table.loading}}" on-click="refreshTable"><i class="iconfont icon-refresh"></i></ui-button>
                </div>
            </div>
            <ui-table select="multi"
                schema="{{table.schema}}"
                loading="{{table.loading}}"
                error="{{table.error}}"
                datasource="{{table.datasource}}"
                cell-builder="{{table.cellBuilder}}"
                selected-index="{=table.selectedIndex=}"
                on-selected-change="onTableRowSelected($event)">

                <div class="ui-table-loading" slot="loading">自定义加载中....</div>
                <div class="ui-table-error" slot="error">
                    啊呀，出错了？<a href="javascript:void(0)" on-click="refreshTable">重新加载</a>
                </div>
            </ui-table>

            <ui-pager size="{{pager.size}}"
                page="{{pager.page}}"
                count="{{pager.count}}"
                on-change="onPagerChange($event)" />
        </div>
    </div>
</div>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'breadcrumbs': Breadcrumbs,
        'filter': Filter,
        'bulk-actions': BulkActions,
        'ui-table': Table,
        'ui-pager': Pager,
        'ui-button': Button,
        'ui-dialog': Dialog
    },

    computed: {
        enableBuckActions() {
            const selectedIndex = this.data.get('table.selectedIndex');
            const loading = this.data.get('table.loading');
            return !loading && selectedIndex && selectedIndex.length > 0;
        }
    },

    initData() {
        return {
            loading: false,         // 数据是否在加载中
            error: null,            // 错误的情况
            showDialog: false,
            showDialog2: false,
            table: {
                loading: false,     // 数据是否在加载中
                error: null,        // 加载失败的情况??
                schema: [],         // 当前表格的列
                datasource: [],     // 当前可见的数据
                selectedIndex: [1],
                selectedItems: []   // 当前选中的行
            },
            bulkActions: [
                {label: '批量删除', type: 'button', level: 'info'},
                {label: '批量修改', type: 'button', level: 'danger'}
            ],
            filterItems: [],        // 过滤的项目
            breadcrumbs: {
                items: []
            },
            pager: {
                size: 10,
                page: 1,
                count: 0
            }
        };
    },

    cellBuilder(item, key, col, row) {
        if (key === 'name') {
            return item[key];
        }
        const options = {
            owner: this,
            data: {item, key, col, row}
        };
        /* eslint-disable */
        const template = key === 'age'
            ? '<template><div on-click="xxx"><div on-click="yyy"><ui-pager on-change="onPagerChange($event)" size="{{10}}" page="{{row+1}}" count="{{111}}" /></div></div></template>'
            : '<template><ui-button on-click="handleCellClick($event, item)">{{item.gender}}</ui-button></template>';
        return P(template, options); 
        /* eslint-enable */
    },

    handleCellClick(e, item) {
        console.log(e, item);
    },

    onFilter() {

    },

    selectAllRows() {
        // const renderer = compileToRenderer(Pager);
        // console.log(renderer(this.data.get('pager')));
        const datasource = this.data.get('table.datasource');
        this.data.set('table.selectedIndex',
            _.range(0, datasource.length).map(String));
    },

    selectNothing() {
        this.data.set('table.selectedIndex', []);
    },

    onShowDialog() {
        this.data.set('showDialog', true);
    },
    openNewDialog() {
        this.data.set('showDialog2', true);
    },
    closeTheDialog() {
        this.data.set('showDialog', false);
    },

    onTableRowSelected({selectedIndex, selectedItems}) {
        console.log(selectedIndex, selectedItems);
    },

    onPagerChange({pageNo}) {
        this.data.set('pager.page', pageNo);
        this.data.set('table.selectedIndex', []);
        this.data.set('table.datasource', [
            {name: 'foo-' + pageNo, age: 10, gender: 'M'},
            {name: 'bar-' + pageNo, age: 20, gender: 'F'},
            {name: 'xxx-' + pageNo, age: 20, gender: '未知'}
        ]);
    },

    inited() {
        this.temporaryChilds = {};
        this.data.set('table.cellBuilder', _.bind(this.cellBuilder, this));
        this.watch('table.datasource', () => this.datasourceChanged = true);
    },

    refreshTable() {
        this.data.set('table.loading', true);

        setTimeout(() => {
            this.data.set('table.loading', false);

            const v = Math.random();
            if (v > .7) {
                this.data.set('table.error', new Error('Custom Error'));
                return;
            }

            this.data.set('table.error', null);
            this.data.set('table.datasource', [
                {name: 'foo', age: 10, gender: 'M'},
                {name: 'bar', age: 20, gender: 'F'},
                {name: 'xxx', age: 20, gender: '未知'}
            ]);
        }, 200);
    },

    attached() {
        this.data.set('breadcrumbs.items', [
            {text: 'foo'},
            {text: 'bar'},
            {text: 'xyz'}
        ]);
        this.data.set('pager.count', 111);
        this.data.set('table.schema', [
            {name: 'name', label: '姓名', labelClassName: 'col-name'},
            {name: 'age', label: '年龄', width: 500, sortable: true},
            {name: 'gender', label: '性别', sortable: true}
        ]);
        this.refreshTable();
    },

    disposed() {
        if (this.temporaryChilds) {
            _.each(this.temporaryChilds, c => {
                c && c.dispose();
            });
            this.temporaryChilds = null;
        }
    },

    updated() {
        if (this.datasourceChanged) {
            // 清理之前的数据
            // _.each(this.temporaryChilds, (c) => {
            //     c && c.dispose();
            // });
            // this.temporaryChilds = {};

            // 重新构造 table cell 的内容
            _.each(this.temporaryChilds, (comp, uuid) => {
                comp.attach(document.getElementById(uuid));
            });

            // 恢复 flag 的内容
            this.datasourceChanged = false;
        }
    }
});
