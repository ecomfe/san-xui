/**
 * @file SMSCodeBox.es6
 * @author leeight
 */

import {defineComponent} from 'san';

import {create} from './util';
import Button from './Button';
import TextBox from './TextBox';

const cx = create('ui-smscode');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <ui-textbox type="number" placeholder="{{placeholder}}" value="{=value=}" disabled="{{freezed || disabled}}" />
    <ui-button on-click="onBtnClick" disabled="{{freezed || disabled}}">{{btnText}}</ui-button>
</div>`;
/* eslint-enable */

export default defineComponent({
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
            placeholder: '请输入手机号'
        };
    },
    computed: {
        mainClass() {
            const skin = this.data.get('skin');
            const disabled = this.data.get('disabled');
            const freezed = this.data.get('freezed');
            const klass = [cx(), cx('x')];
            if (skin) {
                klass.push('skin-' + skin);
                klass.push('skin-' + skin + '-smscode');
            }
            if (disabled) {
                klass.push('state-disabled');
                klass.push(cx('disabled'));
            }
            if (freezed) {
                klass.push('state-freezed');
                klass.push(cx('freezed'));
            }
            return klass;
        }
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
                this.data.set('btnText', '重新发送(' + freezeTime-- + ')秒');
                setTimeout(countdown, 1000);
            }
        };
        countdown();
    }
});
