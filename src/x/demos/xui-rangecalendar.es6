/**
 * @file demos/xui-rangecalendar.es6
 * @author leeight
 */

import moment from 'moment';
import {defineComponent} from 'inf-ui/sanx';
import RangeCalendar from 'inf-ui/x/components/RangeCalendar';

/* eslint-disable */
const template = `<template>
<xui-rangecalendar value="{=rangecalendar.value=}" />
<xui-rangecalendar value="{=rangecalendar.value=}" disabled />
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
                }
            }
        };
    }
});
