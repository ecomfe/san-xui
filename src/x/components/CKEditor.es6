/**
 * @file components/CKEditor.es6
 * @author leeight
 */

/* global CKEDITOR */

import {defineComponent} from 'san';

import {create} from './util';
import Loading from './Loading';

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

window.CKEDITOR_BASEPATH = require.toUrl('ckeditor').replace(/\?.*/, '') + '/';

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
        window.require(['inf-ria/js!ckeditor/ckeditor.js'], () => {
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
