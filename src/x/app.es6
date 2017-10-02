/**
 * @file App.es6
 * @author leeight
 */

/* eslint-disable */
import moment from 'moment';
import {defineComponent} from 'san';

import Button from './components/Button';
import Table from './components/Table';
import Pager from './components/Pager';
import Dialog from './components/Dialog';
import Switch from './components/Switch';
import Select from './components/Select';
import TextBox from './components/TextBox';
import MonthView from './components/MonthView';

const Row = defineComponent({
    template: `<div class="x-row">
        <div class="label" s-if="label">{{label}}</div>
        <div class="content"><slot/></div>
    </div>`
});

const Section = defineComponent({
    template: `<fieldset class="x-section">
        <legend s-if="label" on-click="toggleViewport">{{label}}</legend>
        <div s-if="open"><slot/></div>
    </fieldset>`,

    toggleViewport() {
        const open = this.data.get('open');
        this.data.set('open', !open);
    },

    initData() {
        return {
            open: true
        };
    }
});

const App = defineComponent({
    template: `<template>Hello App
        <x-section label="xui-button">
            <xui-button>Hello xui-button</xui-button>
            <xui-button skin="primary">primary skin</xui-button>
            <xui-button disabled skin="primary">disabled button</xui-button>
        </x-section>

        <x-section label="xui-table">
            <xui-table select="{{table.select}}"
                schema="{{table.schema}}"
                loading="{{table.loading}}"
                error="{{table.error}}"
                datasource="{{table.datasource}}"
                selected-index="{=table.selectedIndex=}"
                on-selected-change="onTableRowSelected($event)">

                <div class="ui-table-loading" slot="loading">自定义加载中....</div>
                <div class="ui-table-error" slot="error">
                    啊呀，出错了？<a href="javascript:void(0)" on-click="refreshTable">重新加载</a>
                </div>
            </xui-table>
            <p>Table Selected Index: {{table.selectedIndex}}</p>
        </x-section>

        <x-section label="xui-pager">
            <xui-pager size="{{pager.size}}"
                page="{{pager.page}}"
                count="{{pager.count}}"
                on-change="onPagerChange($event)" />
        </x-section>

        <x-section label="xui-dialog">
            <xui-button skin="primary" on-click="onShowDialog">Show Dialog</xui-button>

            <xui-dialog open="{=dialog.showDialog=}">
                <xui-button on-click="closeTheDialog">关闭.</xui-button>
                <xui-button on-click="openNewDialog">打开一个新的Dialog.</xui-button>
            </xui-dialog>

            <xui-dialog open="{=dialog.showDialog2=}" width="300" foot="{{false}}">
                <xui-button on-click="closeTheDialog">关闭上一个Dialog</xui-button>
            </xui-dialog>
        </x-section>
        <x-section label="xui-switch">
            <xui-switch checked="{=switch.checked=}" />
            <xui-switch checked="{{false}}" />
            <xui-button disabled="{{!switch.checked}}">Hello xui-switch</xui-button>
        </x-section>
        <x-section label="xui-textbox">
            <x-row label="type=text">
                <xui-textbox placeholder="This is placeholder" value="{=text.value=}" on-enter="onPressEnterOnTextBox" />
                <xui-textbox disabled placeholder="This is disabled textbox" />
                Value is: {{text.value}}
            </x-row>
            <x-row label="type=password">
                <xui-textbox width="{{100}}" type="password" placeholder="This is placeholder" value="{=password.value=}" />
                <xui-textbox disabled width="300px" type="password" placeholder="This is disabled textbox" />
                Password is: {{password.value}}
            </x-row>
            <x-row label="multiline">
                <xui-textbox multiline placeholder="This is placeholder" value="{=textarea.value=}" />
                <xui-textbox multiline disabled placeholder="This is disabled textbox" />
                Value is: {{textarea.value}}
            </x-row>
        </x-section>
        <x-section label="xui-monthview">
            <xui-monthview value="{=monthview.value=}" />
            Value is: {{monthview.value | datetime}}
        </x-section>
        <x-section label="xui-uploader">TODO</x-section>
        <x-section label="xui-select">
            <xui-select datasource="{{select.datasource}}" value="{=select.value=}" />
            <xui-select datasource="{{select.datasource}}"  />
            <xui-select datasource="{{select.datasource}}" disabled />

            Selected value: {{select.value}}
        </x-section>
        <x-section label="xui-tabs">TODO</x-section>
        <x-section label="xui-loading">TODO</x-section>
        <x-section label="xui-toast">TODO</x-section>
        <x-section label="xui-tips">TODO</x-section>
    </template>`,

    filters: {
        datetime(value) {
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
        }
    },

    components: {
        'x-section': Section,
        'x-row': Row,

        'xui-button': Button,
        'xui-textbox': TextBox,
        'xui-monthview': MonthView,
        'xui-table': Table,
        'xui-pager': Pager,
        'xui-dialog': Dialog,
        'xui-switch': Switch,
        'xui-select': Select
    },

    initData() {
        return {
            table: {
                select: 'multi',
                selectedIndex: [1],
                schema: [
                    {name: 'name', label: '姓名', labelClassName: 'col-name'},
                    {name: 'age', label: '年龄', width: 500, sortable: true},
                    {name: 'gender', label: '性别', sortable: true}
                ],
                datasource: [
                    {name: 'foo', age: 10, gender: 'M'},
                    {name: 'bar', age: 20, gender: 'F'},
                    {name: 'xxx', age: 20, gender: '未知'}
                ]
            },
            pager: {
                size: 10,
                page: 1,
                count: 111
            },
            select: {
                value: 'bar',
                datasource: [
                    {text: 'foo', value: 'foo'},
                    {text: 'bar', value: 'bar'},
                    {text: '123', value: '123', disabled: true},
                    {text: 'abc1', value: 'abc1'},
                    {text: 'abc2', value: 'abc2'},
                    {text: 'abc3', value: 'abc3'},
                    {text: 'abc4', value: 'abc4'},
                    {text: 'abc5', value: 'abc5'},
                    {text: 'abc6', value: 'abc6'},
                    {text: 'abc7', value: 'abc7'},
                    {text: 'abc8', value: 'abc8'},
                    {text: 'abc9', value: 'abc9'},
                    {text: 'abc0', value: 'abc0'}
                ]
            },
            text: {
                value: ''
            },
            textarea: {
                value: ''
            },
            password: {
                value: ''
            },
            monthview: {
                value: new Date()
            },
            'switch': {
                checked: true
            }
        };
    },

    onPagerChange({pageNo}) {
        this.data.set('pager.page', pageNo);
    },

    onShowDialog() {
        this.data.set('dialog.showDialog', true);
    },
    openNewDialog() {
        this.data.set('dialog.showDialog2', true);
    },
    closeTheDialog() {
        this.data.set('dialog.showDialog', false);
    },

    onPressEnterOnTextBox() {
        alert('Press enter');
    }
});

export function start() {
    const app = new App();
    app.attach(document.getElementById('root'));
}
