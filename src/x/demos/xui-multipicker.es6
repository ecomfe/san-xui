/**
 * @file demos/xui-multipicker.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import MultiPicker from 'inf-ui/x/components/MultiPicker';
import ToastLabel from 'inf-ui/x/components/ToastLabel';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<xui-toastlabel>
暂时还不支持异步加载数据，欢迎PR.
</xui-toastlabel>

<x-row label="[default]">
    <xui-multipicker
        datasource="{{mp.datasource}}"
        value="{=mp.value=}"
        />
    <strong class="large">
        Value is: {{mp.value}}
    </strong>
</x-row>

<x-row label="disabled">
    <xui-multipicker
        disabled
        datasource="{{mp.datasource}}"
        value="{=mp.value=}"
        />
    <strong class="large">
        Value is: {{mp.value}}
    </strong>
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-toastlabel': ToastLabel,
        'xui-multipicker': MultiPicker
    },
    initData() {
        return {
            mp: {
                value: ['xyz', 'xyz1', 'xyz1_1'],
                datasource: [
                    {
                        text: 'foo',
                        value: 'foo',
                        children: [
                            {text: 'foo1', value: 'foo1'},
                            {text: 'foo2', value: 'foo2'},
                            {text: 'foo3', value: 'foo3'},
                            {text: 'foo4', value: 'foo4'},
                            {text: 'foo5', value: 'foo5'}
                        ]
                    },
                    {
                        text: 'bar',
                        value: 'bar',
                        children: [
                            {text: 'bar1', value: 'bar1'},
                            {text: 'bar2', value: 'bar2'},
                            {text: 'bar3', value: 'bar3'},
                            {text: 'bar4', value: 'bar4'},
                            {text: 'bar5', value: 'bar5'}
                        ]
                    },
                    {
                        text: 'xyz',
                        value: 'xyz',
                        children: [
                            {
                                text: 'xyz1',
                                value: 'xyz1',
                                children: [
                                    {text: 'xyz1_1', value: 'xyz1_1'},
                                    {
                                        text: 'xyz1_2',
                                        value: 'xyz1_2',
                                        children: [
                                            {text: 'xyz1_2_1', value: 'xyz1_2_1'},
                                            {text: 'xyz1_2_2', value: 'xyz1_2_2'},
                                            {text: 'xyz1_2_3', value: 'xyz1_2_3'},
                                            {text: 'xyz1_2_4', value: 'xyz1_2_4'},
                                            {text: 'xyz1_2_5', value: 'xyz1_2_5'}
                                        ]
                                    },
                                    {text: 'xyz1_3', value: 'xyz1_3'},
                                    {text: 'xyz1_4', value: 'xyz1_4'},
                                    {text: 'xyz1_5', value: 'xyz1_5'},
                                    {text: 'xyz1_6', value: 'xyz1_6'}
                                ]
                            },
                            {text: 'xyz2', value: 'xyz2'},
                            {text: 'xyz3', value: 'xyz3'},
                            {text: 'xyz4', value: 'xyz4'},
                            {text: 'xyz5', value: 'xyz5'}
                        ]
                    }
                ]
            }
        };
    }
});
