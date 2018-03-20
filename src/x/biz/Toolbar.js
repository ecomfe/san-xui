/**
 * 左侧工具栏的区域，包括 Button, ButtonGroupp, 链接 等等
 * @file san-xui/x/biz/Toolbar.js
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';

import Button from '../components/Button';
import RadioSelect from '../components/RadioSelect';
import Icon from '../components/Icon';
import {Ghost} from './helper';

/* eslint-disable */
const template = `<template>
<ui-ghost s-for="item in controls">
    <ui-button
        s-if="item.type === 'button'"
        on-click="onToolbarEvent(item)"
        disabled="{{item.disabled}}"
        icon="{{item.icon}}"
        label="{{item.label}}"
        skin="{{item.skin}}"
        />
    <ui-radioselect
        s-if="item.type === 'button-group'"
        value="{{item.value}}"
        disabled="{{item.disabled}}"
        on-change="onToolbarEvent($event)"
        datasource="{{item.datasource}}"
        />
    <a
        s-if="item.type === 'link'"
        target="_blank"
        href="{{item.link}}">
        <ui-icon s-if="{{item.icon}}" name="{{item.icon}}" />
        {{item.label}}
    </a>
    <span s-if="item.type === 'divider'">&nbsp;</span>
</ui-ghost>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-ghost': Ghost,
        'ui-button': Button,
        'ui-radioselect': RadioSelect,
        'ui-icon': Icon
    },
    dataTypes: {
        controls: DataTypes.array
    },
    onToolbarEvent(event) {
        this.fire('item-clicked', event);
    }
});
