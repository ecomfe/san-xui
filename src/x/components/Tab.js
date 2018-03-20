/**
 * @file Tab.js
 * @author leeight
 */

import _ from 'lodash';
import {defineComponent, NodeType} from 'san';

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
            skin: '',
            tabs: []
        };
    },
    computed: {
        mainClass() {
            const klass = cx.mainClass(this);
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
    getTabPanels() {
        // 获取当前所有的TabPanels
        const defaultSlot = this.slot();
        const slotChildren = defaultSlot[0].children;
        // 这里排除“Text“类型，解决san升级到3.4.3导致的问题
        const tabPanels = _.filter(slotChildren, n => n.nodeType !== NodeType.TEXT);
        return tabPanels;
    },
    refreshTabs() {
        this.assertOK();

        const tabPanels = this.getTabPanels();
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

        const tabPanels = this.getTabPanels();
        const selectedIndex = this.data.get('selectedIndex');
        const [currentActiveTab, tabPanel] = [tabPanels[selectedIndex], tabPanels[i]];
        this.__setTabPanelStatus(currentActiveTab, false);
        this.__setTabPanelStatus(tabPanel, true);

        this.data.set('selectedIndex', i);
    }
});
