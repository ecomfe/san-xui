/**
 * @file AppExplorer.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import Loading from 'inf-ui/x/components/Loading';
import SyntaxHighlighter from 'inf-ui/x/components/SyntaxHighlighter';

import Section from './demos/Section';
import DataTypeExplorer from './demos/DataTypeExplorer';

/* eslint-disable */
const template = `<div class="app-explorer">
    <div class="error" s-if="error">{{error}}</div>
    <x-section label="{{title}}" s-if="title">
        <ui-loading s-if="loading" />
        <div s-ref="ghost"></div>
    </x-section>
    <x-section label="DataTypes" open>
        <x-datatype-explorer key="{{title}}" code="{{code}}" />
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
        'ui-hljs': SyntaxHighlighter,
        'x-datatype-explorer': DataTypeExplorer,
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
            this.nextTick(() => {
                const container = this.ref('ghost');
                if (comp && container) {
                    comp.attach(container);
                }
                this.data.set('open', false);
            });
        });
    }
});
