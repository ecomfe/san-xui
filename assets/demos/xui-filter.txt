/**
 * @file inf-ui/x/demos/xui-filter.es6
 * @author leeight
 */

import {defineComponent} from 'inf-ui/sanx';
import Filter from 'inf-ui/x/biz/Filter';
import ToastLabel from 'inf-ui/x/components/ToastLabel';
import SyntaxHighlighter from 'inf-ui/x/components/SyntaxHighlighter';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<xui-toastlabel>通过JSON配置，来生成相应的过滤表单组件。当前支持的类型：select, rangecalendar, calendar, plain</xui-toastlabel>

<x-row label="[default]">
    <xui-filter
        controls="{{controls}}"
        on-submit="onFilter1"
        />
    <xui-hljs code="{=formData.f1=}" lang="json" />
</x-row>

<x-row label="title && submit-text">
    <xui-filter
        title="过滤区域"
        submit-text="提交"
        controls="{{controls}}"
        on-submit="onFilter2"
        />
    <xui-hljs code="{=formData.f2=}" lang="json" />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-hljs': SyntaxHighlighter,
        'xui-filter': Filter,
        'xui-toastlabel': ToastLabel
    },
    initData() {
        return {
            formData: {},
            controls: [
                {
                    type: 'select',
                    name: 'theSelect',
                    value: 'foo',
                    // multi: false,
                    // filterCallback: null,
                    filter: true,
                    filterPlaceholder: '输入域名查询，多个搜索项以空格分隔',
                    width: 300,
                    options: [
                        {text: 'FOO', value: 'foo'},
                        {text: 'BAR', value: 'bar'},
                        {text: '123', value: '123'}
                    ]
                },
                {
                    type: 'rangecalendar',
                    name: 'theRangecalendar',
                    value: {
                        begin: new Date(),
                        end: new Date()
                    },
                    width: 500
                },
                {
                    type: 'calendar',
                    name: 'theCalendar',
                    value: new Date(),
                    width: 200,
                    prev: true,
                    next: true,
                    range: {
                        begin: new Date(2014, 4, 1),
                        end: new Date()
                    }
                },
                {
                    type: 'textbox',
                    name: 'theText',
                    value: 'eeeee',
                    width: 200
                },
                {
                    type: 'plain',
                    text: '<a href="https://www.baidu.com" target="_blank">Go to www.baidu.com</a>'
                }
            ]
        };
    },
    onFilter1(formData) {
        this.data.set('formData.f1', JSON.stringify(formData, null, 2));
    },
    onFilter2(formData) {
        this.data.set('formData.f2', JSON.stringify(formData, null, 2));
    }
});
