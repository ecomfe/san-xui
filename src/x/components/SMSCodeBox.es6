/**
 * @file SMSCodeBox.es6
 * @author leeight
 */

import {defineComponent} from 'san';

import {create} from './util';
import Button from './Button';
import TextBox from './TextBox';
import {asInput} from './asInput';

const cx = create('ui-smscode');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <ui-textbox type="number"
        on-input="onInput"
        placeholder="{{placeholder}}"
        width="{{width}}"
        value="{=value=}"
        disabled="{{disabled}}" />
    <ui-button on-click="onBtnClick"
        width="{{60}}"
        disabled="{{freezed || disabled}}">{{btnText}}</ui-button>
</div>`;
/* eslint-enable */

const SMSCodeBox = defineComponent({
    template,
    components: {
        'ui-textbox': TextBox,
        'ui-button': Button
    },
    initData() {
        return {
            freezed: false,
            disabled: false,
            freezeTime: 60,
            btnText: '获取验证码',
            value: '',
            width: null,
            placeholder: '请输入验证码'
        };
    },
    computed: {
        mainClass() {
            const klass = cx.mainClass(this);
            const freezed = this.data.get('freezed');
            if (freezed) {
                klass.push('state-freezed');
                klass.push(cx('freezed'));
            }
            return klass;
        }
    },
    onInput() {
        this.fire('input');
    },
    onBtnClick() {
        this.fire('click');
        this.data.set('freezed', true);
        let freezeTime = this.data.get('freezeTime');
        const countdown = () => {
            if (freezeTime <= 0) {
                this.data.set('freezed', false);
                this.data.set('btnText', '获取验证码');
            }
            else {
                this.data.set('btnText', '剩余 ' + freezeTime-- + ' 秒');
                setTimeout(countdown, 1000);
            }
        };
        countdown();
    }
});

export default asInput(SMSCodeBox);
