/**
 * @file demos/xui-icon.js
 * @author leeight
 */

import u from 'lodash';
import {defineComponent} from 'san';
import {Row, Icon, Loading, TextBox} from 'san-xui';

/* eslint-disable */
const template = `<template>
<xui-loading s-if="loading" />
<div s-else>
    <xui-textbox value="{=keyword=}" placeholder="Find icon by name" />
    Total count: {{filteredIcons.length}}
    <br />
    <x-row label="{{g.name}} ({{g.icons.length}})" s-for="g in groupedIcons">
        <div class="icons">
            <div s-for="icon in g.icons" class="tooltipped tooltipped-n" aria-label="{{icon}}">
                <xui-icon name="{{icon}}" /><br />{{icon}}
            </div>
        </div>
    </x-row>
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

            icons.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

            return icons;
        });
}

function groupIcons(icons) {
    const groups = [];

    let group = null;
    u.each(icons, icon => {
        const groupName = icon.substr(0, 1).toUpperCase();
        if (!group || group.name !== groupName) {
            group = {
                name: groupName,
                icons: []
            };
            groups.push(group);
        }
        group.icons.push(icon);
    });

    return groups;
}

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-loading': Loading,
        'xui-textbox': TextBox,
        'xui-icon': Icon
    },
    initData() {
        return {
            loading: true,
            keyword: '',
            groupedIcons: [],
            icons: []
        };
    },
    computed: {
        groupedIcons() {
            return groupIcons(this.data.get('filteredIcons'));
        },
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
