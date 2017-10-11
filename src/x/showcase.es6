/**
 * @file showcase.es6
 * @author leeight
 */

import $ from 'jquery';
import {defineComponent} from 'san';

import Aside from './Aside';
import AppExplorer from './AppExplorer';
import {blocks} from './demos/config';

const kUrl = 'http://icode.baidu.com/repo/baidu%2Fbce-console%2Ffe-base/files/master/tree/dep/inf-ui/0.0.0/src/x/';

/* eslint-disable */
const template = `<div class="showcase">
    <h1><a href="${kUrl}" target="_blank">San UI Library</a></h1>
    <main>
        <ui-aside
            on-item-selected="onItemSelected($event)"
            selected-item-text="{{selectedItemText}}"
            blocks="{{blocks}}" />
        <ui-explorer
            title="{{explorer.title}}"
            loading="{{explorer.loading}}"
            error="{{explorer.error}}"
            comp="{{explorer.comp}}"
            code="{{explorer.code}}"
        />
    </main>
</div>`;
/* eslint-enable */

const App = defineComponent({
    template,
    components: {
        'ui-aside': Aside,
        'ui-explorer': AppExplorer
    },
    initData() {
        return {
            blocks,
            explorer: {
                title: '',
                loading: false,
                error: null,
                comp: null
            }
        }
    },
    disposeComponent() {
        const comp = this.data.get('explorer.comp');
        if (comp) {
            comp.dispose();
        }
    },
    inited() {
        const hashchangeHandler = () => {
            if (/^#comp=/.test(location.hash)) {
                const text = location.hash.replace(/^#comp=/, '');
                this.data.set('selectedItemText', text);
            }
        };
        $(window).on('hashchange', hashchangeHandler);
        hashchangeHandler();
    },
    disposed() {
        $(window).off('hashchange');
    },
    onItemSelected(item) {
        const moduleId = item.moduleId || `inf-ui/x/demos/${item.text}`;
        this.data.set('explorer.title', item.text);
        this.data.set('explorer.loading', true);
        const sourceUrl = window.require.toUrl(moduleId) + '.es6';
        fetch(sourceUrl)
            .then(response => response.text())
            .then(code => this.data.set('explorer.code', code));
        window.require([moduleId], CompCtor => {
            this.disposeComponent();
            this.data.set('explorer.loading', false);
            this.data.set('explorer.comp', new CompCtor());
            location.hash = 'comp=' + item.text;
        });
    }
});

export function start() {
    const app = new App();
    app.attach(document.getElementById('root'));
}
