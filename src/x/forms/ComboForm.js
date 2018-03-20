/**
 * @file san-xui/x/forms/ComboForm.js
 * @author leeight
 */

import _ from 'lodash';
import {DataTypes, defineComponent} from 'san';

import {create} from '../components/util';
import {asInput} from '../components/asInput';
import Button from '../components/Button';
import {asForm} from './asForm';
import StaticItem from './StaticItem';

const cx = create('ui-combo');

/* eslint-disable */
const template = `<div class="{{mainClass}}" style="{{mainStyle}}">
    <template s-if="!preview">
        <div s-if="multiple">
            <div class="${cx('item')}" s-for="v, i in formData">
                <ui-form form-data="{=v=}" />
                <ui-button icon="minus" on-click="removeElement(i)" />
            </div>
            <ui-button s-if="btnVisible" icon="plus" on-click="addElement" />
        </div>
        <div class="${cx('item')}" s-else>
            <ui-form form-data="{=formData=}" />
        </div>
    </template>
    
    <template s-else>
        <slot name="preview">
            <table width="100%" cellpadding="0" cellspacing="0">
                <tbody>
                    <template s-if="multiple">
                        <tr s-for="item in value">
                            <td s-for="col in previewCols">
                                <ui-static 
                                    mapper="{{col.mapper}}"
                                    datasource="{{col.datasource}}"
                                    value="{{item[col.name]}}"/>
                            </td>
                        </tr>
                    </template>
                    
                    <template s-else>
                        <tr>
                            <td s-for="col in previewCols">
                                <ui-static 
                                    mapper="{{col.mapper}}"
                                    datasource="{{col.datasource}}"
                                    formData="{{formData[col.name]}}"/>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </slot>
    </template>
</div>`;
/* eslint-enable */

const ComboForm = defineComponent({
    template,
    dataTypes: {
        /**
         * 是否预览状态
         * @default false
         */
        preview: DataTypes.bool,

        /**
         * 预览时显示的数据项。如果没有配置，会默认使用的controls变量的 name datasource 参数。
         * 如果自定义preview slot， 该参数可做扩展。
         * @default null
         */
        previewCols: DataTypes.array,

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
            const formData = this.data.get('formData');
            const max = this.data.get('max');
            const min = this.data.get('min');
            const size = formData && formData.length;
            return size >= min && size < max;
        }
    },
    initData() {
        return {
            preview: false,
            min: 0,
            max: Infinity,
            multiple: false,
            inline: true,
            value: null,
            previewCols: null,
            controls: []
        };
    },
    inited() {
        let {controls, multiple, value, previewCols} = this.data.get();

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

        if (!previewCols) {
            this.data.set('previewCols', _.map(controls, item => _.pick(item, ['name', 'datasource'])));
        }

        const Component = asForm({controls});
        this.components = {
            'ui-button': Button,
            'ui-static': StaticItem,
            'ui-form': Component
        };

        this.data.set('formData', _.cloneDeep(this.data.get('value')));

        // 此改动是处理combo类型为数组时, 控件没有填写值时，value值为[{}]，
        this.watch('formData', formData => {
            const value = _.isArray(formData) ? _.reject(formData, _.isEmpty) : formData;
            this.data.set('value', value);
            this.fire('change', {value});
        });
    },
    attached() {
        // TODO(leeight) 子表单的验证逻辑
        // TODO(chenbo09) combo目前有二重校验（1， 3）。可增加一个行校验（待出现实际需求时，目前暂无）。
        // 理想的校验如下：改动combo中组件的值（包括新增和删除）, 依次触发触发3， 2 ，1层级的校验，每层校验会使用下级校验的结果，比如1，2
        // 的校验 是 自身 + 下级校验的组合。
        // 行校验具体实现：通过diff当前的 value 和 formData，找到被改动的记录index。
        // 执行自己的validateForm方法并ref到具体的form查看其校验结果，综合后显示error在form行的下一行。
        // 1. combo顶层的校验。value是整个combo的值
        // 2. combo行校验。仅仅在multiple模式下有效 value值是整个数组中的某一个对象，也就是combo中的子form。
        // 3. 组件级自身校验，这个在controls中为每个组件配置即可，value是控件值。

        // 目前的问题：
        // 1. combo在顶层并没有机制去调用下层的校验。必须到修改了combo中的具体组件值时才能监听到事件，开始校验。
        // 2. 在combo顶层的rules可以自定义较为复杂的校验，只是只有一个提示的地方。上述方案是否有必要？
    },
    addElement() {
        this.data.push('formData', {});
    },
    removeElement(i) {
        this.data.removeAt('formData', i);
    }
});

export default asInput(ComboForm);
