/**
 * @file demos/xui-buybucket.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import BuyBucket from 'inf-ui/x/components/BuyBucket';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<x-row label="[default],previous">
    <xui-buybucket
        previous
        datasource="{{buybucket.datasource}}" />
</x-row>
<x-row label="disabled,tip=This is a tip message">
    <xui-buybucket
        disabled
        previous
        tip="This is a tip message"
        datasource="{{buybucket.datasource}}" />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-buybucket': BuyBucket
    },
    initData() {
        return {
            buybucket: {
                datasource: [
                    {title: '地域', content: '华北 - 北京'},
                    {title: '可用区', content: '可用区A'},
                    {title: '购买配置', content: 'CPU：1核、内存：1GB、本地磁盘：20GB、公网带宽1Mbps'},
                    {title: '购买配额', content: '1台 * 1月'},
                    {title: '购买配额(2)', content: '2台 * 2月', hidden: true},
                    {title: '配置费用', content: '￥1296.00'}
                ]
            }
        };
    }
});
