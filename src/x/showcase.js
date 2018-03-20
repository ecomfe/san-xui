/**
 * @file showcase.js
 * @author leeight
 */

/* global _hmt, G_PREFIX, G_SOURCE_EXT */

import $ from 'jquery';
import u from 'lodash';
import Promise from 'promise';
import {defineComponent} from 'san';
import _ from 'inf-i18n';
import i18nConfig from 'inf-i18n/config';

import Icon from './components/Icon';
import Aside from './Aside';
import AppExplorer from './AppExplorer';
import {blocks} from './demos/config';

const kUrl = 'https://github.com/ecomfe/san-xui';

function activateI18n() {
    // 设置 i18n 相关的配置
    i18nConfig.url = 'https://console-i18n.bj.bcebos.com/console.%s';
    i18nConfig.sourceType = 'amd';
    let locale = /locale=([a-zA-Z\-]+)/g.exec(location.search);
    let toSet = (locale || [])[1];
    return _.activate(toSet || _.getLanguage());
}

/* eslint-disable */
const template = `<div class="showcase">
    <h1><ui-icon name="collapse" on-click="native:onToggleAside($event)" /><a href="${kUrl}" target="_blank">San UI Library</a></h1>
    <main>
        <ui-aside
            class="{{aside.expand ? 'aside-expand' : ''}}"
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

if (typeof Promise.onReject === 'function'
    && typeof u.noop === 'function') {
    Promise.onReject(u.noop);   // eslint-disable-line
}

const App = defineComponent({   // eslint-disable-line
    template,
    components: {
        'ui-icon': Icon,
        'ui-aside': Aside,
        'ui-explorer': AppExplorer
    },
    initData() {
        return {
            blocks,
            aside: {
                expand: false
            },
            explorer: {
                title: '',
                loading: false,
                error: null,
                comp: null
            }
        };
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
        const clickHandler = () => {
            this.data.set('aside.expand', false);
        };
        $(window).on('hashchange', hashchangeHandler);
        $(document).on('click', clickHandler);
        hashchangeHandler();
    },
    disposed() {
        $(window).off('hashchange');
    },
    onToggleAside(e) {
        e.stopPropagation();
        const expand = this.data.get('aside.expand');
        this.data.set('aside.expand', !expand);
    },
    onItemSelected(item) {
        let demosModulePrefix = '\x69nf-ui/x/demos/';
        let demosCodePrefix = '\x69nf-ui/x/demos/';
        if (typeof G_PREFIX === 'object') {
            if (G_PREFIX.demosModule != null) {
                demosModulePrefix = G_PREFIX.demosModule;
            }
            if (G_PREFIX.demosCode != null) {
                demosCodePrefix = G_PREFIX.demosCode;
            }
        }
        const ext = typeof G_SOURCE_EXT === 'string' ? G_SOURCE_EXT : '.js';
        const moduleId = item.moduleId || `${demosModulePrefix}${item.text}`;
        const sourceCodeId = `${demosCodePrefix}${item.text}`;
        this.data.set('explorer.title', item.text);
        this.data.set('explorer.loading', true);
        this.data.set('aside.expand', false);
        const sourceUrl = window.require.toUrl(sourceCodeId).replace(/\?.*/, '') + ext + '?raw';
        fetch(sourceUrl)
            .then(response => response.text())
            .then(code => this.data.set('explorer.code', code));
        window.require([moduleId], CompCtor => {
            if (typeof CompCtor.default === 'function') {
                CompCtor = CompCtor.default;
            }
            _hmt.push(['_trackEvent', 'page', 'view', item.text]);
            _hmt.push(['_trackPageview', location.pathname + location.search + '#comp=' + item.text]);
            this.disposeComponent();
            this.data.set('explorer.loading', false);
            this.data.set('explorer.comp', new CompCtor());
            location.hash = 'comp=' + item.text;
        });
    }
});

export function start() {
    activateI18n().then(() => {
        const app = new App();
        app.attach(document.getElementById('root'));
    });
}


