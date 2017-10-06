/**
 * @file demos/xui-icon.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import Icon from 'inf-ui/x/components/Icon';

/* eslint-disable */
const template = `<template>
<table width="100%" class="icons">
    <tr>
        <td s-for="icon in icons"><xui-icon name="{{icon.name}}" /></td>
    </tr>
    <tr>
        <td s-for="icon in icons">{{icon.name}}</td>
    </tr>
</table>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'xui-icon': Icon
    },
    initData() {
        return {
            icons: [
                {name: 'bae'},
                {name: 'bdl'},
                {name: 'bos'},
                {name: 'eip'},
                {name: 'blb'},
                {name: 'vpc'},
                {name: 'cdn'},
                {name: 'scs'},
                {name: 'dts'},
                {name: 'cas'},
                {name: 'ses'},
                {name: 'sms'},
                {name: 'cds'},
                {name: 'bmr'},
                {name: 'bml'},
                {name: 'bcc'},
                {name: 'rds'}
            ]
        };
    }
});
