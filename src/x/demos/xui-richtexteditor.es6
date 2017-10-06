/**
 * @file demos/xui-richtexteditor.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import RichTextEditor from 'inf-ui/x/components/RichTextEditor';

/* eslint-disable */
const template = `<template>
<xui-richtexteditor content="{{content}}" />
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'xui-richtexteditor': RichTextEditor
    },
    initData() {
        return {
            content: 'Hello world! <strong> This is the initialize content </strong>'
        };
    }
});
