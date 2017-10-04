/**
 * @file Tab.es6
 * @author leeight
 */

import u from 'lodash';
import {defineComponent} from 'san';

import {create} from './util';

const cx = create('ui-tab');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <ul class="${cx('navigator')}">
        <li
            on-click="onTabClick(item, i)"
            class="{{selectedIndex === i ? '${cx('item', 'item-active')}' : '${cx('item')}'}}"
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
        this.assertOK();

        const tabPanels = this.slotChilds[0].childs;
        const tabs = u.map(tabPanels, panel => ({text: panel.data.get('title')}));
        this.data.set('tabs', tabs);

        const selectedIndex = this.data.get('selectedIndex');
        const tabPanel = tabPanels[selectedIndex];
        if (tabPanel) {
            tabPanel.data.set('active', true);
        }
    },
    onTabClick(item, i) {
        this.assertOK();

        const tabPanels = this.slotChilds[0].childs;    // eslint-disable-line

        const selectedIndex = this.data.get('selectedIndex');
        const currentActiveTab = tabPanels[selectedIndex];
        if (currentActiveTab) {
            currentActiveTab.data.set('active', false);
        }

        const tabPanel = tabPanels[i];
        if (tabPanel) {
            tabPanel.data.set('active', true);
        }

        this.data.set('selectedIndex', i);
    }
});
