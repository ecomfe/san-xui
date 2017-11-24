/**
 * @file demos/xui-monthview.es6
 * @author leeight
 */

import moment from 'moment';
import {defineComponent} from 'inf-ui/sanx';
import MonthView from 'inf-ui/x/components/MonthView';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-monthview value="{=monthview.value=}" />
    <strong class="large">
        Value is: {{monthview.value | datetime('YYYY-MM-DD')}}
    </strong>
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
                value: new Date()
            }
        };
    }
});
