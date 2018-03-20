/**
 * @file TextBox.js
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';

import {create} from './util';
import {asInput} from './asInput';

const cx = create('ui-textbox');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <div s-if="addon && addonPosition === 'begin'" class="${cx('addon')}">{{addon}}</div>
    <textarea s-if="multiline"
        s-ref="inputEl"
        on-input="onInput"
        on-keyup="onKeyUp($event)"
        on-keydown="onKeyDown($event)"
        on-keypress="onKeyPress($event)"
        value="{=value=}"
        disabled="{{disabled}}"
        placeholder="{{placeholder}}"
        style="{{textboxStyle}}"></textarea>
    <input s-else
        s-ref="inputEl"
        on-input="onInput"
        on-keyup="onKeyUp($event)"
        on-keydown="onKeyDown($event)"
        on-keypress="onKeyPress($event)"
        on-focus="onFocus($event)"
        on-blur="onBlur($event)"
        on-click="onClick($event)"
        value="{=value=}"
        min="{{min}}",
        max="{{max}}"
        step="{{step}}"
        type="{{type}}"
        disabled="{{disabled}}"
        placeholder="{{placeholder}}"
        style="{{textboxStyle}}" />
    <div s-if="addon && addonPosition === 'end'" class="${cx('addon', 'addon-end')}">{{addon}}</div>
</div>`;
/* eslint-enable */

const TextBox = defineComponent({
    template,
    computed: {
        mainClass() {
            return cx.mainClass(this);
        },
        textboxStyle() {
            return cx.mainStyle(this);
        }
    },
    initData() {
        return {
            disabled: false,
            autofocus: false,
            focusPosition: 'end', // 'end' | 'begin' | 'all'
            type: 'text',
            multiline: false,
            skin: '',
            placeholder: '',
            addon: '',
            addonPosition: 'begin', // 'begin' | 'end'
            width: null,
            height: null
        };
    },
    dataTypes: {
        /**
         * 控件的禁用状态
         *
         * @default false
         */
        disabled: DataTypes.bool,

        /**
         * 是否默认获取焦点
         *
         * @default false
         */
        autofocus: DataTypes.bool,

        /**
         * 光标出现的位置
         *
         * @default end
         */
        focusPosition: DataTypes.string,

        /**
         * 单行文本框的输入类型，可以控制输入 email, number, url 等格式
         *
         * @default text
         */
        type: DataTypes.string,

        /**
         * 获取或者设置控件的值
         *
         * @bindx
         */
        value: DataTypes.string,

        /**
         * 是否展示成多行输入的文本框(textarea)
         *
         * @default false
         */
        multiline: DataTypes.bool,

        /**
         * 皮肤样式
         */
        skin: DataTypes.string,

        /**
         * 设置 placeholder 的内容
         */
        placeholder: DataTypes.string,

        /**
         * 输入框的前缀或者后缀文案
         */
        addon: DataTypes.string,

        /**
         * addon 文案的位置，可以设置 begin 或者 end
         *
         * @default begin
         */
        addonPosition: DataTypes.string,

        /**
         * 输入框的宽度
         */
        width: DataTypes.number,


        /**
         * 输入框的高度
         */
        height: DataTypes.number,

        /**
         * 当 type 设置成 number 的时候，有效
         */
        min: DataTypes.number,

        /**
         * 当 type 设置成 number 的时候，有效
         */
        max: DataTypes.number,

        /**
         * 当 type 设置成 number 的时候，有效
         */
        step: DataTypes.number
    },
    attached() {
        const autofocus = this.data.get('autofocus');
        if (autofocus) {
            this.focus();
        }
    },
    focus() {
        const inputEl = this.ref('inputEl');
        const focusPosition = this.data.get('focusPosition');
        if (inputEl) {
            if (document.activeElement === inputEl) {
                return;
            }
            if (typeof inputEl.selectionStart === 'number') {
                if (focusPosition === 'end') {
                    // 光标在内容的后面
                    inputEl.selectionStart = inputEl.selectionEnd = this.data.get('value').length;
                }
                else if (focusPosition === 'all') {
                    // 全选
                    inputEl.selectionStart = 0;
                    inputEl.selectionEnd = this.data.get('value').length;
                }
            }
            inputEl.focus();
        }
    },
    onInput() {
        const value = this.data.get('value');
        this.fire('input', {value});
    },
    onFocus(e) {
        this.fire('focus', e);
    },
    onBlur(e) {
        this.fire('blur', e);
    },
    onKeyUp(e) {
        this.fire('keyup', e);
    },
    onKeyDown(e) {
        this.fire('keydown', e);
    },
    onKeyPress(e) {
        const keyCode = e.which || e.keyCode;
        if (keyCode === 13) {
            this.fire('enter', e);
        }
        this.fire('keypress', e);
    },
    onClick(e) {
        this.fire('click', e);
    }
});

export default asInput(TextBox);
