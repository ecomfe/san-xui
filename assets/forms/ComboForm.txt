/**
 * @file san-xui/x/forms/ComboForm.es6
 * @author leeight
 */

import _ from 'lodash';
import {DataTypes, defineComponent} from 'san';

import {create} from '../components/util';
import {asInput} from '../components/asInput';
import Button from '../components/Button';
import {asForm} from './asForm';

const cx = create('ui-combo');

/* eslint-disable */
const template = `<div class="{{mainClass}}" style="{{mainStyle}}">
    <div s-if="multiple">
        <div class="${cx('item')}" s-for="v, i in value">
            <ui-form form-data="{=v=}" />
            <ui-button icon="minus" on-click="removeElement(i)" />
        </div>
        <ui-button s-if="btnVisible" icon="plus" on-click="addElement" />
    </div>
    <div class="${cx('item')}" s-else>
        <ui-form form-data="{=value=}" />
    </div>
</div>`;
/* eslint-enable */

const ComboForm = defineComponent({
    template,
    dataTypes: {
        /**
         * 是否支持添加多项目
         * @default false
         */
        multiple: DataTypes.bool,

        /**
         * 单行模式
         * @default true
         */
        inline: DataTypes.bool,

        /**
         * 可以输入的数据项
         */
        controls: DataTypes.array,

        /**
         * 最多的数量
         * @default Infinity
         */
        max: DataTypes.number,

        /**
         * 最少的数量
         * @default 0
         */
        min: DataTypes.number,

        /**
         * ComboForm 输入的内容
         * @bindx
         */
        value: DataTypes.any
    },
    computed: {
        mainClass() {
            const klass = cx.mainClass(this);
            const inline = this.data.get('inline');
            if (inline) {
                klass.push(cx('inline'));
                klass.push(cx('x-inline'));
            }
            return klass;
        },
        mainStyle() {
            return cx.mainStyle(this);
        },
        btnVisible() {
            const value = this.data.get('value');
            const max = this.data.get('max');
            const min = this.data.get('min');
            const size = value && value.length;
            return size >= min && size < max;
        }
    },
    initData() {
        return {
            min: 0,
            max: Infinity,
            multiple: false,
            inline: true,
            value: null,
            controls: []
        };
    },
    inited() {
        let {controls, multiple, value} = this.data.get();
        if (multiple) {
            if (!_.isArray(value)) {
                this.data.set('value', []);
            }
        }
        else {
            if (!_.isPlainObject(value)) {
                this.data.set('value', {});
            }
        }

        const Component = asForm({controls});
        this.components = {
            'ui-button': Button,
            'ui-form': Component
        };

        this.watch('value', value => this.fire('change', {value}));
    },
    attached() {
        // TODO(leeight) 子表单的验证逻辑
    },
    addElement() {
        this.data.push('value', {});
    },
    removeElement(i) {
        this.data.removeAt('value', i);
    }
});

export default asInput(ComboForm);
