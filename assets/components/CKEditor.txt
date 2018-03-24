/**
 * @file components/CKEditor.js
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';

import Loading from './Loading';
import {create} from './util';
import {loadThirdParty, js} from './helper';

const cx = create('ui-ckeditor');

/* eslint-disable */
const template = `<template>
<div class="${cx()}">
    <ui-loading s-if="loading" />
    <div class="${cx('error')}" s-if="error">{{error}}</div>
    <div s-ref="ghost" style="{{mainStyle}}"></div>
</div>
</template>`;
/* eslint-enable */

window.CKEDITOR_BASEPATH = 'https://cdn.bdstatic.com/ckeditor/4.8.0/';

export default defineComponent({
    template,
    components: {
        'ui-loading': Loading
    },
    computed: {
        mainStyle() {
            return cx.mainStyle(this);
        }
    },
    initData() {
        return {
            loading: true,
            error: null,
            value: null,
            options: {
                language: 'zh-cn',
                toolbarCanCollapse: true
            }
        };
    },
    dataTypes: {
        /**
         * 获取编辑器的值，不支持双绑
         */
        value: DataTypes.string,

        /**
         * 编辑器的配置项目
         * @default {language: 'zh-cn', toolbarCanCollapse: true}
         */
        options: DataTypes.object
    },
    inited() {
        /**
        this.watch('value', value => {
            if (this.editor) {
                const editorData = this.editor.getData();
                if (value !== editorData) {
                    this.editor.setData(value);
                }
            }
        });
        */
    },
    attached() {
        loadThirdParty('CKEDITOR', [js('ckeditor/ckeditor.js')]).then(CKEDITOR => {
            this.data.set('loading', false);
            const ghost = this.ref('ghost');
            const options = this.data.get('options');
            const editor = this.editor = CKEDITOR.replace(ghost.id, options);
            editor.on('instanceReady', () => {
                const value = this.data.get('value');
                if (value) {
                    editor.setData(value);
                }
            });

            editor.on('change', () => {
                const value = editor.getData();
                this.data.set('value', value);
                this.fire('change', {value});
            });
        });
    },
    disposed() {
        if (this.editor) {
            try {
                this.editor.destroy();
            }
            catch (ex) {
            }
        }
    }
});
