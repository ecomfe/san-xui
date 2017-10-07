/**
 * @file AppExplorer.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import Loading from 'inf-ui/x/components/Loading';
import Ghost from 'inf-ui/x/components/Ghost';
import SyntaxHighlighter from 'inf-ui/x/components/SyntaxHighlighter';

import Section from './demos/Section';

/* eslint-disable */
const template = `<div class="app-explorer">
    <div class="error" s-if="error">{{error}}</div>
    <x-section label="{{title}}" s-if="title">
        <ui-loading s-if="loading" />
        <ui-ghost s-ref="ghost" />
    </x-section>
    <x-section label="Source Code" s-if="code" open="{=open=}">
        <ui-hljs code="{{code}}" />
    </x-section>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-loading': Loading,
        'ui-ghost': Ghost,
        'ui-hljs': SyntaxHighlighter,
        'x-section': Section
    },
    initData() {
        return {
            comp: null,
            open: false
        };
    },
    inited() {
        this.watch('comp', comp => {
            const container = this.ref('ghost').el;
            comp.attach(container);
            this.data.set('open', false);
        });
    }
});
