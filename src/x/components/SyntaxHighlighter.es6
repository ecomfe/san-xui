/**
 * @file components/SyntaxHighlighter.es6
 * @author leeight
 */

import 'inf-ria/css!hljs/styles/default.min.css';
import hljs from 'hljs/highlight';
import {defineComponent} from 'san';

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
            lang: 'javascript'
        };
    },
    computed: {
        highlightedCode() {
            const code = this.data.get('code');
            const lang = this.data.get('lang');
            try {
                const rv = hljs.highlight(lang, code);
                return rv.value;
            }
            catch (ex) {
                return String(ex);
            }
        }
    }
});
