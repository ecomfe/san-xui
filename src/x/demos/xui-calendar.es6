/**
 * @file demos/xui-calendar.es6
 * @author leeight
 */

import moment from 'moment';
import {defineComponent} from 'inf-ui/sanx';
import Calendar from 'inf-ui/x/components/Calendar';

import Row from './Row';

/* eslint-disable */
const template = `<template>

<x-row label="[default]">
    <xui-calendar value="{=calendar.value=}" />
    <strong class="large">
        Value is: {{calendar.value | datetime('YYYY-MM-DD')}}
    </strong>
</x-row>

<x-row label="prev,next,time">
    <xui-calendar prev next time value="{=calendar.value=}" />
    <strong class="large">
        Value is: {{calendar.value | datetime('YYYY-MM-DD HH:mm:ss')}}
    </strong>
</x-row>

<x-row label="disabled">
    <xui-calendar value="{=calendar.value=}" disabled />
</x-row>

<x-row label="disabled,prev,next">
    <xui-calendar prev next value="{=calendar.value=}" disabled />
</x-row>

</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-calendar': Calendar
    },
    filters: {
        datetime(value, f = 'YYYY-MM-DD HH:mm:ss') {
            return moment(value).format(f);
        }
    },
    initData() {
        return {
            calendar: {
                value: new Date()
            }
        };
    }
});
