/**
 * @file demos/xui-userpicker.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, UserPicker} from 'san-xui';

function searchRequester(keyword) {
    return fetch('https://randomuser.me/api/?results=5')
        .then(response => response.json())
        .then(response => {
            const results = response.results;
            return results.map(o => {
                // 必须要有 accountId 和 username 两个属性
                o.accountId = o.email;
                o.username = o.name.first + ' ' + o.name.last;
                return o;
            });
        });
}

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    请输入用户名：
    <xui-userpicker
        search-requester="{{searchRequester}}"
    >
        <div slot="layer-item">
            <img width="30" height="30" src="{{item.picture.thumbnail}}" />
            <span>{{item.name.title}} {{item.username}}</span>
        </div>
    </xui-userpicker>
</x-row>
<x-row label="initialized by value">
    <xui-userpicker
        search-requester="{{searchRequester}}"
        value="{=value=}"
    >
        <div slot="layer-item">
            <img width="30" height="30" src="{{item.picture.thumbnail}}" />
            <span>{{item.name.title}} {{item.username}}</span>
        </div>
    </xui-userpicker>
    <pre><code>{{value | stringify}}</code></pre>
</x-row>
<x-row label="preview">
    <xui-userpicker preview value="{=value=}" />
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-userpicker': UserPicker
    },
    filters: {
        stringify(value) {
            return JSON.stringify(value, null, 2);
        }
    },
    initData() {
        return {
            value: [
                {username: '李玉北', accountId: 'liyubei'}
            ],
            searchRequester
        };
    }
});

