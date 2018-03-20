/**
 * @file san-xui/x/components/Region.js
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';

import MultiPicker from './MultiPicker';
import {asInput} from './asInput';
import {create} from './util';
import kDs from './data/regions';

const cx = create('ui-region');

/* eslint-disable */
const template = `<template>
<div class="{{mainClass}}" style="{{mainStyle}}">
    <ui-multipicker
        disabled="{{disabled}}"
        datasource="{{datasource}}"
        value="{=value=}"
    />
</div>
</template>`;
/* eslint-enable */

const Region = defineComponent({
    template,
    components: {
        'ui-multipicker': MultiPicker
    },
    computed: {
        mainClass() {
            const klass = cx.mainClass(this);
            return klass;
        },
        mainStyle() {
            const style = cx.mainStyle(this);
            return style;
        }
    },
    initData() {
        return {
            datasource: kDs,
            disabled: false,
            value: []
        };
    },
    dataTypes: {
        /**
         * 组件的禁用状态
         * @default false
         */
        disabled: DataTypes.bool,

        /**
         * 设置或者获取组件的值
         * @bindx
         * @default []
         */
        value: DataTypes.array,

        /**
         * 组件的数据源
         * @default 国标的新政区域划分
         */
        datasource: DataTypes.array
    }
});

export default asInput(Region);
