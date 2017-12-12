/**
 * @file Tab.es6
 * @author leeight
 */

import {defineComponent} from 'san';

import {create} from './util';

const cx = create('ui-tab');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <ul class="${cx('navigator')}">
        <li
            on-click="onTabClick(item, i)"
            class="{{selectedIndex === i ? '${cx('item', 'item-active')}' : item.hide ? '${cx('item', 'item-hide')}' : '${cx('item')}'}}"
            s-for="item, i in tabs"
            >{{item.text}}</li>
    </ul>
    <div class="${cx('content')}">
        <slot/>
    </div>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    initData() {
        return {
            selectedIndex: 0,
            tabs: []
        };
    },
    computed: {
        mainClass() {
            const klass = [cx(), cx('x')];
            return klass;
        }
    },
    assertOK() {
        const defaultSlot = this.slot();
        if (!defaultSlot || defaultSlot.length <= 0) {
            throw new Error('xui-tab-panel is missing');
        }
    },
    attached() {
        this.refreshTabs();
    },
    updated() {
    },
    refreshTabs() {
        this.assertOK();

        const defaultSlot = this.slot();
        const tabPanels = defaultSlot[0].children;
        const tabs = [];
        const selectedIndex = this.data.get('selectedIndex');
        for (let i = 0; i < tabPanels.length; i++) {
            const panel = tabPanels[i];
            const text = panel.data
                ? panel.data.get('title')
                : panel.cond && panel.children.length
                ? panel.children[0].data.get('title')
                : null;
            if (text) {
                tabs.push({text});
            }
            else {
                tabs.push({text: '-', hide: true});
            }

            // inactive tab
            if (i !== selectedIndex) {
                this.__setTabPanelStatus(panel, false);
            }
        }
        this.data.set('tabs', tabs);
        // active
        const tabPanel = tabPanels[selectedIndex];
        this.__setTabPanelStatus(tabPanel, true);
    },

    __setTabPanelStatus(tabPanel, active) {
        if (tabPanel) {
            if (tabPanel.data) {
                tabPanel.data.set('active', active);
            }
            else if (tabPanel.cond && tabPanel.children.length) {
                tabPanel.children[0].data.set('active', active);
            }
        }
    },

    onTabClick(item, i) {
        this.assertOK();

        const defaultSlot = this.slot();
        const tabPanels = defaultSlot[0].children;

        const selectedIndex = this.data.get('selectedIndex');
        const currentActiveTab = tabPanels[selectedIndex];
        this.__setTabPanelStatus(currentActiveTab, false);

        const tabPanel = tabPanels[i];
        this.__setTabPanelStatus(tabPanel, true);
        this.data.set('selectedIndex', i);
    }
});
