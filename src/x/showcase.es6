/**
 * @file showcase.es6
 * @author leeight
 */

/* global _hmt, G_PREFIX, G_SOURCE_EXT */

import $ from 'jquery';
import u from 'underscore';
import Promise from 'promise';
import {defineComponent} from 'san';
import _ from 'inf-i18n';
import i18nConfig from 'inf-i18n/config';
import Icon from 'inf-ui/x/components/Icon';

import Aside from './Aside';
import AppExplorer from './AppExplorer';
import SwitchLan from './SwitchLan';

import {blocks} from './demos/config';

const kUrl = 'http://icode.baidu.com/repo/baidu%2Fbce-console%2Ffe-base/files/master/tree/dep/inf-ui/0.0.0/src/x/';

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
    <ui-switch-lan></ui-switch-lan>
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

if (typeof u.noop === 'function') {
    Promise.onReject(u.noop);   // eslint-disable-line
}

const App = defineComponent({   // eslint-disable-line
    template,
    components: {
        'ui-icon': Icon,
        'ui-aside': Aside,
        'ui-explorer': AppExplorer,
        'ui-switch-lan': SwitchLan
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
        let demosModulePrefix = 'inf-ui/x/demos/';
        let demosCodePrefix = 'inf-ui/x/demos/';
        if (typeof G_PREFIX === 'object') {
            if (G_PREFIX.demosModule != null) {
                demosModulePrefix = G_PREFIX.demosModule;
            }
            if (G_PREFIX.demosCode != null) {
                demosCodePrefix = G_PREFIX.demosCode;
            }
        }
        const ext = typeof G_SOURCE_EXT === 'string' ? G_SOURCE_EXT : '.es6';
        const moduleId = item.moduleId || `${demosModulePrefix}${item.text}`;
        const sourceCodeId = `${demosCodePrefix}${item.text}`;
        this.data.set('explorer.title', item.text);
        this.data.set('explorer.loading', true);
        this.data.set('aside.expand', false);
        const sourceUrl = window.require.toUrl(sourceCodeId).replace(/\?.*/, '') + ext;
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


