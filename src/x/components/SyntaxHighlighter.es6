/**
 * @file components/SyntaxHighlighter.es6
 * @author leeight
 */

import {defineComponent} from 'inf-ui/sanx';

import {create} from './util';

const cx = create('ui-hljs');

/* eslint-disable */
const template = `<div class="${cx()}">
<pre><code class="{{lang}}">{{highlightedCode|raw}}</code></pre>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    initData() {
        return {
            code: '',
            lang: 'javascript'
        };
    },
    __updateHighlightedCode(hljs) {
        const code = this.data.get('code');
        const lang = this.data.get('lang');
        try {
            const rv = hljs.highlight(lang, code);
            this.data.set('highlightedCode', rv.value);
        }
        catch (ex) {
            this.data.set('highlightedCode', '');
        }
    },
    attached() {
        const amdModules = ['hljs/highlight', 'inf-ria/css!hljs/styles/default.min.css'];
        window.require(amdModules, hljs => {
            this.watch('code', () => this.__updateHighlightedCode(hljs));
            this.watch('lang', () => this.__updateHighlightedCode(hljs));
            this.__updateHighlightedCode(hljs);
        });
    }
});
