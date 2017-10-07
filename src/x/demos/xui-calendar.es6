/**
 * @file demos/xui-calendar.es6
 * @author leeight
 */

import moment from 'moment';
import {defineComponent} from 'san';
import Calendar from 'inf-ui/x/components/Calendar';

/* eslint-disable */
const template = `<template>
<xui-calendar value="{=calendar.value=}" />
<xui-calendar value="{=calendar.value=}" disabled />
<strong class="large">
    Value is: {{calendar.value | datetime('YYYY-MM-DD')}}
</strong>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
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
