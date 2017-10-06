/**
 * @file components/SyntaxHighlighter.es6
 * @author leeight
 */

/* global hljs */

import {defineComponent} from 'san';

import {create} from './util';

const cx = create('ui-hljs');

/* eslint-disable */
const template = `<div class="${cx()}">
<pre><code class="javascript hljs">{{highlightedCode|raw}}</code></pre>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    computed: {
        highlightedCode() {
            const code = this.data.get('code');
            try {
                const rv = hljs.highlight('javascript', code);
                return rv.value;
            }
            catch (ex) {
                return String(ex);
            }
        }
    }
});
