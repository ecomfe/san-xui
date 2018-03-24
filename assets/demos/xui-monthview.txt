/**
 * @file demos/xui-monthview.js
 * @author leeight
 */

import moment from 'moment';
import {defineComponent} from 'san';
import {Row, MonthView} from 'san-xui';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-monthview value="{=monthview.value=}" range="{{monthview.range}}"/>
    <strong class="large">
        Value is: {{monthview.value | datetime('YYYY-MM-DD')}}
    </strong>
</x-row>

<x-row label="value type is string: 1985-03-08T01:44:48Z">
    <xui-monthview value="1985-03-08T01:44:48Z"/>
</x-row>

<x-row label="time">
    <xui-monthview time value="{=monthview.value=}" />
    <strong class="large">
        Value is: {{monthview.value | datetime('YYYY-MM-DD HH:mm:ss')}}
    </strong>
</x-row>

</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-monthview': MonthView
    },
    filters: {
        datetime(value, f = 'YYYY-MM-DD HH:mm:ss') {
            return moment(value).format(f);
        }
    },
    initData() {
        return {
            monthview: {
                value: new Date(),
                range: {
                    begin: new Date(2014, 4, 1),
                    end: new Date()
                }
            }
        };
    }
});
