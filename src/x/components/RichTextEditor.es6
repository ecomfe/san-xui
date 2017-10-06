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
    <ui-ghost s-ref="ghost" />
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
        editorOptions() {
            const options = this.data.get('options');
            return u.extend({}, kDefaultEditorOptions, options);
        }
    },
    initData() {
        return {
            loading: true,
            options: null
        };
    },
    attached() {
        window.require(['zeroclipboard', 'inf-ria/js!ueditor/ueditor.all.min.js'], ZeroClipboard => {
            this.data.set('loading', false);

            // TODO(leeight) FIX ZeroClipboard
            window.ZeroClipboard = ZeroClipboard;

            const editorOptions = this.data.get('editorOptions');
            const content = this.data.get('content');

            this.editor = new UE.ui.Editor(editorOptions);
            this.editor.render(this.ref('ghost').el);
            if (content) {
                this.editor.addListener('ready', () => this.editor.setContent(content));
            }
        });
    },
    disposed() {
        if (this.editor) {
            this.editor.destroy();
        }
    }
});
