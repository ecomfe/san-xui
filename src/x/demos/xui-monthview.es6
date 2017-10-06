/**
 * @file demos/xui-monthview.es6
 * @author leeight
 */

import moment from 'moment';
import {defineComponent} from 'san';
import MonthView from 'inf-ui/x/components/MonthView';

/* eslint-disable */
const template = `<template>
<xui-monthview value="{=monthview.value=}" />
<br/>
<br/>
<strong class="large">
    Value is: {{monthview.value | datetime('YYYY-MM-DD')}}
</strong>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
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
