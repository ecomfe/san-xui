/**
 * @file components/ACEEditor.js
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';

import {create} from './util';
import {loadThirdParty, js} from './helper';
import Loading from './Loading';
import {asInput} from './asInput';

const cx = create('ui-aceeditor');
const kUrl = typeof window.require === 'function'
    ? window.require.toUrl('ace-builds/ace.js').replace(/\?.*/, '')
    : 'https://cdn.bdstatic.com/ace-builds/src-min-noconflict/ace.js';

/* eslint-disable */
const template = `
<div class="{{mainClass}}">
    <div class="${cx('error')}" s-if="error">{{error}}</div>
    <ui-loading s-if="loading" />
    <div s-else s-ref="ghost" style="{{mainStyle}}"></div>
</div>`;
/* eslint-enable */

const ACEEditor = defineComponent({
    template,
    components: {
        'ui-loading': Loading
    },
    initData() {
        return {
            loading: true,
            theme: null,
            mode: null,
            readonly: false,
            width: '100%',
            height: 300,
            value: null
        };
    },
    dataTypes: {
        /**
         * 设置或者获取编辑器的值
         * @bindx
         */
        value: DataTypes.string,

        /**
         * 编辑器的风格
         */
        theme: DataTypes.string,

        /**
         * 编辑器支持的语言
         */
        mode: DataTypes.string,

        /**
         * 是否是只读模式
         * @default false
         */
        readonly: DataTypes.bool,

        /**
         * 宽度
         * @default 100%
         */
        width: DataTypes.string,

        /**
         * 高度
         * @default 300
         */
        height: DataTypes.number
    },
    computed: {
        mainStyle() {
            const loading = this.data.get('loading');
            const style = cx.mainStyle(this);
            style.display = loading ? 'none' : 'block';
            return style;
        },
        mainClass() {
            return cx.mainClass(this);
        }
    },
    inited() {
        this.watch('value', value => {
            if (this.editor) {
                const currentValue = this.editor.getValue();
                if (currentValue !== value) {
                    this.editor.setValue(value, 1);
                }
            }
        });
    },
    attached() {
        loadThirdParty('ace', [js(kUrl)]).then(ace => {
            this.data.set('loading', false);
            this.nextTick(() => {
                const ghost = this.ref('ghost');
                if (!ghost) {
                    this.data.set('error', new Error('ACEEditor初始化失败.'));
                    return;
                }

                const editor = this.editor = ace.edit(ghost);
                editor.on('change', e => {
                    this.data.set('value', editor.getValue());
                    this.fire('input');
                });
                const {theme, mode, readonly, value} = this.data.get();
                if (theme != null) {
                    editor.setTheme(theme);
                }
                if (mode != null) {
                    editor.getSession().setMode(mode);
                }
                if (readonly != null) {
                    editor.setReadOnly(readonly);
                }
                if (value != null) {
                    editor.setValue(value, 1);
                }
            });
        });
    },
    disposed() {
        if (this.editor) {
            this.editor.destroy();
        }
    }
});

export default asInput(ACEEditor);
