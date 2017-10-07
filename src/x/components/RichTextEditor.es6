/**
 * @file components/RichTextEditor.es6
 * @author leeight
 */

/* global UE */

import u from 'lodash';
import {defineComponent} from 'san';

import {create} from './util';
import Ghost from './Ghost';
import Loading from './Loading';

const cx = create('ui-richtexteditor');

const kDefaultEditorOptions = {
    // 如果配置了 urlArgs，那么后续用 UEDITOR_HOME_URL 拼接路径的时候就出问题了，因此把这个部分删掉
    UEDITOR_HOME_URL: require.toUrl('ueditor/').replace(/\?.*/, ''),
    autoFloatEnabled: false,
    iframeUrlMap: {
        link: require.toUrl('ueditor/dialogs/link/link.html')
    },
    toolbars: [[
        'fullscreen', 'source', '|', 'undo', 'redo', '|',
        'bold', 'italic', 'underline', 'fontborder', 'strikethrough',
        'superscript', 'subscript', 'removeformat', 'formatmatch',
        'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor',
        'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
        'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
        'directionalityltr', 'directionalityrtl', 'indent', '|',
        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
        'touppercase', 'tolowercase', '|',
        'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
        'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music',
        'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak',
        'template', 'background', '|',
        'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow',
        'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown',
        'splittocells', 'splittorows', 'splittocols', 'charts', '|',
        'print', 'preview', 'searchreplace', 'help', 'drafts'
    ]]
};

/* eslint-disable */
const template = `<template>
<div class="${cx()}">
    <ui-loading s-if="loading" />
    <div class="${cx('error')}" s-if="error">{{error}}</div>
    <ui-ghost s-ref="ghost" style="{{mainStyle}}" />
</div>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-ghost': Ghost,
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
            height: 100,
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

            if (!ghost || !ghost.el) {
                this.data.set('error', new Error('RichTextEditor初始化失败'));
                return;
            }

            const editor = this.editor = new UE.ui.Editor(editorOptions);
            editor.render(ghost.el);
            if (value) {
                editor.addListener('ready', () => editor.setContent(value));
            }
            editor.addListener('contentchange', () => {
                const value = editor.getContent();
                // FIXME(leeight) 递归的问题如何处理呢？
                this.data.set('value', value);
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
