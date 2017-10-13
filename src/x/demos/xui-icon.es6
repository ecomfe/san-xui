/**
 * @file demos/xui-icon.es6
 * @author leeight
 */

import u from 'lodash';
import {defineComponent} from 'san';
import Icon from 'inf-ui/x/components/Icon';
import Loading from 'inf-ui/x/components/Loading';
import TextBox from 'inf-ui/x/components/TextBox';

/* eslint-disable */
const template = `<template>
<xui-loading s-if="loading" />
<div s-else>
    <xui-textbox value="{=keyword=}" placeholder="Find icon by name" />
    Total count: {{filteredIcons.length}}
    <br />
    <div class="icons">
        <div s-for="icon in filteredIcons" class="tooltipped tooltipped-n" aria-label="{{icon}}">
            <xui-icon name="{{icon}}" /><br />{{icon}}
        </div>
    </div>
</div>
</template>`;
/* eslint-enable */

function getIcons() {
    return fetch('https://cdn.bdstatic.com/iconfont/iconfont.css')
        .then(response => response.text())
        .then(response => {
            // .icon-artec:before
            const pattern = /\.icon\-([^:]+):before/g;
            const icons = [];

            let match = null;
            while (match = pattern.exec(response)) {
                icons.push(match[1]);
            }

            return icons;
        });
}

export default defineComponent({
    template,
    components: {
        'xui-loading': Loading,
        'xui-textbox': TextBox,
        'xui-icon': Icon
    },
    initData() {
        return {
            loading: true,
            keyword: '',
            icons: []
        };
    },
    computed: {
        filteredIcons() {
            const keyword = this.data.get('keyword');
            const icons = this.data.get('icons');
            if (!keyword) {
                return icons;
            }
            return u.filter(icons, icon => icon.indexOf(keyword) !== -1);
        }
    },
    attached() {
        getIcons().then(icons => {
            this.data.set('icons', icons);
            this.data.set('loading', false);
        });
    }
});
