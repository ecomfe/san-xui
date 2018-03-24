/**
 * @file demos/xui-calendar.js
 * @author leeight
 */

import moment from 'moment';
import {defineComponent} from 'san';
import {Row, Calendar} from 'san-xui';

/* eslint-disable */
const template = `<template>

<x-row label="[default]">
    <xui-calendar value="{=calendar.value=}" range="{{calendar.range}}"/>
    <strong class="large">
        Value is: {{calendar.value | datetime('YYYY-MM-DD')}}
    </strong>
</x-row>

<x-row label="value type is string: 1985-03-08T01:44:48Z">
    <xui-calendar value="1985-03-08T01:44:48Z" />
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
                value: new Date(),
                range: {
                    begin: new Date(2014, 4, 1),
                    end: new Date()
                }
            }
        };
    }
});
