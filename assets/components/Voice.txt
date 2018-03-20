/**
 * @file components/Voice.js
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';

import Button from './Button';
import Recorder from './Recorder';
import {create} from './util';
import {asInput} from './asInput';

const cx = create('ui-voice');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <div class="${cx('error')}" s-if="error">{{error}}</div>
    <ui-button s-else icon="voice" on-click="startRecording">{{label}}</ui-button>
</div>`;
/* eslint-enable */

const Voice = defineComponent({
    template,
    components: {
        'ui-button': Button
    },
    computed: {
        mainClass() {
            return cx.mainClass(this);
        }
    },
    initData() {
        return {
            error: null,
            value: null,
            label: '开始',
            url: 'https://sp3.baidu.com/6qUDsjip0QIZ8tyhnq/echo.fcgi'
        };
    },
    dataTypes: {
        /**
         * 错误状态
         */
        error: DataTypes.object,

        /**
         * 识别的结果
         * <pre><code>{
         *   text: string,
         *   corpus_no?: string
         * }</code></pre>
         */
        value: DataTypes.object,

        /**
         * 按钮上的文字
         * @default 开始
         */
        label: DataTypes.string,

        /**
         * 服务器的地址
         * @default https://sp3.baidu.com/6qUDsjip0QIZ8tyhnq/echo.fcgi
         */
        url: DataTypes.string
    },

    inited() {
        this.watch('value', value => this.fire('change', {value}));
    },

    attached() {
        if (!Recorder.support()) {
            this.data.set('error', '浏览器不支持这个功能');
            return;
        }
        Recorder.addStyle();
    },

    startRecording() {
        const url = this.data.get('url');
        Recorder.init({url}).done(recorder => {
            recorder.openUI();
            recorder.onfinish(t => {
                const e = t.content.item[0];
                const n = t && t.result ? t.result.corpus_no : '';
                const value = {
                    text: e,
                    corpus_no: n
                };
                this.data.set('value', value);
            });
        })
        .fail(() => this.data.set('error', '不能获得麦克风的权限'));
    }
});

export default asInput(Voice);

