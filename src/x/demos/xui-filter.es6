/**
 * @file inf-ui/x/demos/xui-filter.es6
 * @author leeight
 */

import {defineComponent} from 'inf-ui/sanx';
import Filter from 'inf-ui/x/biz/Filter';
import ToastLabel from 'inf-ui/x/components/ToastLabel';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<xui-toastlabel>通过JSON配置，来生成相应的过滤表单组件。当前支持的类型：select, rangecalendar, calendar, plain</xui-toastlabel>

<x-row label="[default]">
    <xui-filter
        controls="{{controls}}"
        on-submit="onFilter1"
        />
    <pre>{{formData.f1 | json}}</pre>
</x-row>

<x-row label="title && submit-text">
    <xui-filter
        title="过滤区域"
        submit-text="提交"
        controls="{{controls}}"
        on-submit="onFilter2"
        />
    <pre>{{formData.f2 | json}}</pre>
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-filter': Filter,
        'xui-toastlabel': ToastLabel
    },
    filters: {
        json(data) {
            return JSON.stringify(data, null, 2);
        }
    },
    initData() {
        return {
            formData: {},
            controls: [
                {
                    type: 'select',
                    name: 'the-select',
                    value: 'foo',
                    width: 300,
                    options: [
                        {text: 'FOO', value: 'foo'},
                        {text: 'BAR', value: 'bar'},
                        {text: '123', value: '123'}
                    ]
                },
                {
                    type: 'rangecalendar',
                    name: 'the-rangecalendar',
                    value: {
                        begin: new Date(),
                        end: new Date()
                    },
                    width: 500
                },
                {
                    type: 'calendar',
                    name: 'the-calendar',
                    value: new Date(),
                    width: 200,
                    prev: true,
                    next: true
                },
                {
                    type: 'plain',
                    text: '<a href="https://www.baidu.com" target="_blank">Go to www.baidu.com</a>'
                }
            ]
        };
    },
    onFilter1(formData) {
        this.data.set('formData.f1', formData);
    },
    onFilter2(formData) {
        this.data.set('formData.f2', formData);
    }
});
