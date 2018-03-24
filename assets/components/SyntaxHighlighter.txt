/**
 * @file components/SyntaxHighlighter.js
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';

import {create} from './util';
import {loadThirdParty, css} from './helper';

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
    dataTypes: {
        /**
         * 需要高亮的代码
         * @default ''
         */
        code: DataTypes.string,

        /**
         * 代码的类型
         * @default javascript
         */
        lang: DataTypes.string
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
        loadThirdParty('hljs', ['hljs/highlight', css('hljs/styles/default.min.css')])
            .then(hljs => {
                this.watch('code', () => this.__updateHighlightedCode(hljs));
                this.watch('lang', () => this.__updateHighlightedCode(hljs));
                this.__updateHighlightedCode(hljs);
            });
    }
});
