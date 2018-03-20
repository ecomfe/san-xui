/**
 * @file demos/xui-rangecalendar.js
 * @author leeight
 */

import moment from 'moment';
import {defineComponent} from 'san';
import {RangeCalendar} from 'san-xui';

/* eslint-disable */
const template = `<template>
<xui-rangecalendar value="{=rangecalendar.value=}" />
<xui-rangecalendar value="{=rangecalendar.value=}" disabled="{{true}}" />
<xui-rangecalendar value="{=rangecalendar.value=}" shortcut="{{false}}" />
<xui-rangecalendar value="{=rangecalendar.value=}" time="{{true}}" />
<strong class="large">
    Value is: {{rangecalendar.value.begin | datetime('YYYY-MM-DD')}} - {{rangecalendar.value.end | datetime('YYYY-MM-DD')}}
</strong>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'xui-rangecalendar': RangeCalendar
    },
    filters: {
        datetime(value, f = 'YYYY-MM-DD HH:mm:ss') {
            return moment(value).format(f);
        }
    },
    initData() {
        return {
            rangecalendar: {
                value: {
                    begin: new Date(2017, 9, 19), // 2017-10-19
                    end: new Date(2018, 0, 12) // 2018-01-12
                },
                range: {
                    begin: new Date(2017, 9, 18), // 2017-10-18
                    end: new Date(2018, 0, 19) // 2018-01-19
                }
            }
        };
    }
});
