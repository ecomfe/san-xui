/**
 * @file components/SubForm.js
 * @author chenbo09
 */

import _ from 'lodash';
import {defineComponent, DataTypes} from 'san';
import Button from '../components/Button';
import {asForm} from './asForm';
import FormDialog from './FormDialog';

const template = `
<div>
    <ui-button
        icon="{{icon}}"
        label="{{buttonLabel}}"
        width="{{buttonWidth}}"
        on-click="showFormDialog"
        />
        
    <ui-form-dialog
        s-if="viewFormDialog"
        title="{{title}}"
        preview="{{preview}}"
        on-ok="merge"
        on-close="closeFormDialog"
        form-comp="{{FormComp}}"
        form-data="{{subFormData}}"
     />
</div>`;

export default defineComponent({
    template,
    components: {
        'ui-button': Button,
        'ui-form-dialog': FormDialog
    },
    initData() {
        return {
            preview: false,
            icon: 'sdk',
            buttonLabel: '设置子表单',
            buttonWidth: null,
            width: null,
            formData: null,
            formSchema: {},
            title: '设置子表单',
            controls: [],
            pickName: '',

            viewFormDialog: false,
            FormComp: null,
            subFormData: null
        };
    },
    dataTypes: {
        /**
         * 是否预览状态
         * @default false
         */
        preview: DataTypes.bool,

        /**
         * 按钮的icon
         * @default sdk
         */
        icon: DataTypes.string,

        /**
         * 按钮的文字
         * @default 设置子表单
         */
        buttonLabel: DataTypes.string,

        /**
         * 按钮的宽度
         */
        buttonWidth: DataTypes.number,

        /**
         * 子表单弹框的宽度
         */
        width: DataTypes.number,

        /**
         * 子表单弹框的标题
         * @default 设置子表单
         */
        title: DataTypes.number,

        /**
         * 子表单弹框的值
         * @bindx
         * @default null
         */
        formData: DataTypes.object,


        /**
         * 可以输入的数据项
         * @default []
         */
        controls: DataTypes.array,

        /**
         * 只返回指定的数据项名称
         */
        pickName: DataTypes.string
    },
    computed: {
        subFormData() {
            const pickName = this.data.get('pickName');
            const formData = this.data.get('formData');
            let subFormData = formData;
            if (pickName) {
                subFormData = {};
                subFormData[pickName] = formData;
            }
            return subFormData;
        }
    },
    inited() {
        const controls = this.data.get('controls');
        this.data.set('FormComp', asForm({controls}));
    },
    showFormDialog() {
        this.data.set('viewFormDialog', true);
    },
    closeFormDialog() {
        this.data.set('viewFormDialog', false);
    },
    merge(formData) {
        // 在combo类型等情况下，需要的是一个数组，而不是 {name: [1, 2, 3]}
        // 由于name参数在schema中必须保留，故增加pickName参数，如果非空，将只返回指定值。 在上例子中 将返回数组[1, 2, 3]

        const pickName = this.data.get('pickName');
        this.data.set('formData', pickName ? _.get(formData, pickName) : formData);
        this.closeFormDialog();
    }
});

