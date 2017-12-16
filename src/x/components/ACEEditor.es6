/**
 * @file components/ACEEditor.es6
 * @author leeight
 */

/* global ace */

import {defineComponent} from 'san';

import {create} from './util';
import Loading from './Loading';
import {asInput} from './asInput';
import Ghost from './Ghost';

const cx = create('ui-aceeditor');
const kUrl = 'inf-ria/js!https://cdn.bdstatic.com/ace-builds/src-min-noconflict/ace.js';

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <div class="${cx('error')}" s-if="error">{{error}}</div>
    <ui-loading s-if="loading" />
    <ui-ghost s-ref="ghost" style="{{mainStyle}}" />
</div>`;
/* eslint-enable */

const ACEEditor = defineComponent({
    template,
    components: {
        'ui-ghost': Ghost,
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
        /**
        this.watch('value', value => {
            if (this.editor) {
                this.editor.setValue(value, 1);
            }
        });
        */
    },
    attached() {
        window.require([kUrl], () => {
            this.data.set('loading', false);
            this.nextTick(() => {
                const ghost = this.ref('ghost');
                if (!ghost || !ghost.el) {
                    this.data.set('error', new Error('ACEEditor初始化失败.'));
                    return;
                }

                const editor = this.editor = ace.edit(ghost.el);
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
