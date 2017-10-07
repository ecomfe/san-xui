/**
 * 因为 esui/BoxGroup.es6 存在一个比较难处理的问题，所以换一个新的组件试试
 * 但是样式还是沿用之前的
 *
 * @file esui/BoxGroup.es6
 * @author leeight
 */

import u from 'lodash';
import {defineComponent} from 'san';

import {nexUuid, create} from './util';

const cx = create('ui-boxgroup');

/* eslint-disable */
const template = `
<template>
<div class="{{mainClass}}">
    <label class="${cx('radio', 'wrapper')}" title="{{item|title}}" san-for="item in datasource">
        <input san-if="boxType == 'radio'"
            type="radio" on-change="onChange" name="{{name}}" disabled="{{item.disabled || disabled}}"
            title="{{item|title}}" value="{{item.value}}" checked="{=value=}" />
        <input san-else
            type="checkbox" on-change="onChange" name="{{name}}" disabled="{{item.disabled || disabled}}"
            title="{{item|title}}" value="{{item.value}}" checked="{=value=}" />
        <span>{{item|title}}</span>
    </label>
</div>
</template>
`;
/* eslint-enable */

export default defineComponent({
    template,
    initData() {
        return {
            datasource: [],             // Array.<{value: string, title: string}>
            disabled: false,
            orientation: 'horizontal',  // 'vertical' | 'horizontal'
            value: null,
            name: 'esui' + nexUuid(),
            boxType: 'radio'            // 'radio' | 'checkbox'
        };
    },
    computed: {
        mainClass() {
            const klass = cx.mainClass(this);
            const orientation = this.data.get('orientation');
            if (orientation) {
                klass.push(cx(orientation));
                klass.push('state-' + orientation);
            }
            return klass;
        }
    },
    filters: {
        title(item) {
            return item.text || item.title;
        }
    },
    inited() {
        const {boxType, value, disabled} = this.data.get();
        if (disabled === '') {
            this.data.set('disabled', true);
        }
        if (boxType === 'radio' && u.isArray(value)) {
            this.data.set('value', value[0]);
        }
        if (boxType === 'checkbox' && !value) {
            this.data.set('value', []);
        }
    },
    onChange() {
        const value = this.data.get('value');
        this.fire('change', {value});
    }
});

