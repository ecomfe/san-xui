/**
 * @file showcase.es6
 * @author leeight
 */

import {defineComponent} from 'san';

import Aside from './Aside';
import AppExplorer from './AppExplorer';
import {blocks} from './demos/config';

/* eslint-disable */
const template = `<div class="showcase">
    <ui-aside on-item-selected="onItemSelected($event)" blocks="{{blocks}}" />
    <ui-explorer
        title="{{explorer.title}}"
        loading="{{explorer.loading}}"
        error="{{explorer.error}}"
        comp="{{explorer.comp}}"
    />
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
    onItemSelected(item) {
        const moduleId = item.moduleId || `inf-ui/x/demos/${item.text}`;
        this.data.set('explorer.title', item.text);
        this.data.set('explorer.loading', true);
        window.require([moduleId], CompCtor => {
            this.disposeComponent();
            this.data.set('explorer.loading', false);
            this.data.set('explorer.comp', new CompCtor());
        });
    }
});

export function start() {
    const app = new App();
    app.attach(document.getElementById('root'));
}
