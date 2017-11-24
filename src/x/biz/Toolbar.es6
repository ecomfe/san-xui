/**
 * @file inf-ui/x/biz/Toolbar.es6
 * @author leeight
 */

import {defineComponent} from 'inf-ui/sanx';
import {DataTypes} from 'san';
import Button from 'inf-ui/x/components/Button';
import RadioSelect from 'inf-ui/x/components/RadioSelect';

import {Ghost} from './helper';

/* eslint-disable */
const template = `<template>
<ui-ghost s-for="item in items">
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
        href="{{item.link}}">{{item.label}}</a>
    <span s-if="item.type === 'divider'">&nbsp;</span>
</ui-ghost>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-ghost': Ghost,
        'ui-button': Button,
        'ui-radioselect': RadioSelect
    },
    dataTypes: {
        items: DataTypes.array
    },
    onToolbarEvent(event) {
        this.fire('item-clicked', event);
    }
});
