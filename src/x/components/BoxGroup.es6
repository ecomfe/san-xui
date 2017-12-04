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
import {asInput} from './asInput';

const cx = create('ui-boxgroup');

/* eslint-disable */
const template = `
<template>
<div class="{{mainClass}}">
    <div class="${cx('group')}" s-for="datasource, i in groupedDatasource">
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
</div>
</template>
`;
/* eslint-enable */

const BoxGroup = defineComponent({
    template,
    initData() {
        return {
            datasource: [], // Array.<{value: string, title: string}>
            disabled: false,
            orientation: 'horizontal', // 'vertical' | 'horizontal'
            value: null,
            colCount: 0, // 展示N列
            name: 'esui' + nexUuid(),
            boxType: 'radio' // 'radio' | 'checkbox'
        };
    },
    computed: {
        groupedDatasource() {
            const datasource = this.data.get('datasource');
            const colCount = this.data.get('colCount');
            if (!colCount) {
                return [datasource];
            }
            const itemsCount = datasource.length;
            const groups = [];
            const groupCount = Math.ceil(itemsCount / colCount);

            for (let i = 0; i < groupCount; i++) {
                const group = [];
                const startIndex = i * colCount;
                const endIndex = Math.min(itemsCount, (i + 1) * colCount);
                for (let j = startIndex; j < endIndex; j++) {
                    group.push(datasource[j]);
                }
                groups.push(group);
            }

            return groups;
        },
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
        this.nextTick(() => {
            const value = this.data.get('value');
            this.fire('change', {value});
        });
    }
});

export default asInput(BoxGroup);
