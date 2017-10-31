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
        const slotChilds = this.slotChilds;
        if (!slotChilds || slotChilds.length <= 0) {
            throw new Error('xui-tab-panel is missing');
        }
    },
    attached() {
        this.refreshTabs();
    },
    updated() {
        console.log('sdfsdf');
        // this.refreshTabs();
    },
    refreshTabs() {
        this.assertOK();

        const tabPanels = this.slotChilds[0].childs;
        const tabs = [];
        for (let i = 0; i < tabPanels.length; i++) {
            const panel = tabPanels[i];
            const text = panel.data
                ? panel.data.get('title')
                : panel.cond && panel.childs.length
                ? panel.childs[0].data.get('title')
                : null;
            if (text) {
                tabs.push({text});
            }
            else {
                tabs.push({text: '-', hide: true});
            }
        }
        this.data.set('tabs', tabs);

        const selectedIndex = this.data.get('selectedIndex');
        const tabPanel = tabPanels[selectedIndex];
        this.__setTabPanelStatus(tabPanel, true);
    },

    __setTabPanelStatus(tabPanel, active) {
        if (tabPanel) {
            if (tabPanel.data) {
                tabPanel.data.set('active', active);
            }
            else if (tabPanel.cond && tabPanel.childs.length) {
                tabPanel.childs[0].data.set('active', active);
            }
        }
    },

    onTabClick(item, i) {
        this.assertOK();

        const tabPanels = this.slotChilds[0].childs;    // eslint-disable-line

        const selectedIndex = this.data.get('selectedIndex');
        const currentActiveTab = tabPanels[selectedIndex];
        this.__setTabPanelStatus(currentActiveTab, false);

        const tabPanel = tabPanels[i];
        this.__setTabPanelStatus(tabPanel, true);
        this.data.set('selectedIndex', i);
    }
});
