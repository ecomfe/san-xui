/**
 * @file components/RichTextEditor.es6
 * @author leeight
 */

/* global UE */

import $ from 'jquery';
import u from 'lodash';
import {defineComponent} from 'san';

import {create} from './util';
import Loading from './Loading';

const cx = create('ui-richtexteditor');

const kDefaultEditorOptions = {
    // 如果配置了 urlArgs，那么后续用 UEDITOR_HOME_URL 拼接路径的时候就出问题了，因此把这个部分删掉
    UEDITOR_HOME_URL: require.toUrl('ueditor/').replace(/\?.*/, ''),
    // initialFrameWidth: 770,
    initialFrameHeight: 250,
    autoFloatEnabled: false,
    elementPathEnabled: false,
    autoHeightEnabled: false,
    iframeUrlMap: {
        link: require.toUrl('ueditor/dialogs/link/link.html')
    },
    serverUrl: '/api/mc/imageUpload',
    initialStyle: [
        `p, ol{
            line-height: 1.5em;
            color: #494949;
            font-family: Microsoft Yahei, Tahoma, Arial, Helvetica, STHeiti;
            font-size: 12px;
        }`
    ],
    toolbars: [[
        'source', 'undo', 'redo', 'insertunorderedlist', 'insertorderedlist', 'unlink',
        'link', 'bold', 'underline', 'fontborder', 'strikethrough', 'forecolor',
        'backcolor', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify',
        'removeformat', 'fontfamily', 'fontsize', '|', 'simpleupload', 'imagenone',
        'imageleft', 'imageright', 'imagecenter', 'blockquote', 'cleardoc', 'formatmatch',
        'indent', 'lineheight', 'paragraph', 'rowspacing', 'date', ''
    ]]
};

/* eslint-disable */
const template = `<template>
<div class="${cx()}">
    <ui-loading s-if="loading" />
    <div class="${cx('error')}" s-if="error">{{error}}</div>
    <div s-ref="ghost" style="{{mainStyle}}"></div>
</div>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-loading': Loading
    },
    computed: {
        mainStyle() {
            const loading = this.data.get('loading');
            const style = cx.mainStyle(this);
            style.display = loading ? 'none' : 'block';
            return style;
        },
        editorOptions() {
            const options = this.data.get('options');
            return u.extend({}, kDefaultEditorOptions, options);
        }
    },
    initData() {
        return {
            loading: true,
            error: null,
            width: '100%',
            height: null,
            options: null
        };
    },
    inited() {
        /** TODO(leeight) 暂时不支持在运行时动态的修改 editor 的内容
        this.watch('value', value => {
            if (this.editor) {
                this.editor.setContent(value);
            }
        });
        */
    },
    attached() {
        window.require(['zeroclipboard', 'inf-ria/js!ueditor/ueditor.all.min.js'], ZeroClipboard => {
            this.data.set('loading', false);

            // TODO(leeight) FIX ZeroClipboard
            window.ZeroClipboard = ZeroClipboard;

            const editorOptions = this.data.get('editorOptions');
            const value = this.data.get('value');
            const ghost = this.ref('ghost');

            if (!ghost) {
                this.data.set('error', new Error('RichTextEditor初始化失败'));
                return;
            }

            const editor = this.editor = new UE.ui.Editor(editorOptions);
            editor.render(ghost);
            if (value) {
                editor.addListener('ready', () => {
                    if (this.editor) {
                        this.editor.setContent(value);
                    }
                });
            }
            editor.addListener('contentchange', () => {
                if (this.editor) {
                    const value = this.editor.getContent();
                    // FIXME(leeight) 递归的问题如何处理呢？
                    this.data.set('value', value);
                }
            });
        });
    },
    disposed() {
        if (this.editor) {
            try {
                $('#edui_fixedlayer').remove();
                this.editor.destroy();
                this.editor = null;
            }
            catch (ex) {
            }
        }
    }
});
