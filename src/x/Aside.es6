/**
 * @file aside.es6
 * @author leeight
 */

import {defineComponent} from 'san';

/* eslint-disable */
const template = `<div class="aside">
    <dl s-for="block, i in blocks">
        <dt on-click="toggleItems(i)">{{block.title}}<span>[{{block.collapse ? '+' : '-'}}]</span></dt>
        <dd s-if="!block.collapse">
            <ul>
                <li on-click="onClick(item)"
                    class="{{activedItem === item ? 'selected' : ''}}"
                    s-for="item in block.items">{{item.text}}</li>
            </ul>
        </dd>
    </dl>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    initData() {
        return {
            activedItem: null,
            blocks: []
        };
    },
    toggleItems(bi) {
        const key = `blocks[${bi}].collapse`;
        const collapse = this.data.get(key);
        this.data.set(key, !collapse);
    },
    getItemByText(text) {
        const blocks = this.data.get('blocks');

        for (let i = 0; i < blocks.length; i++) {
            const items = blocks[i].items;
            for (let j = 0; j < items.length; j++) {
                const item = items[j];
                if (item.text === text) {
                    return item;
                }
            }
        }

        return blocks[0].items[0];
    },
    activeItemByText(text) {
        let activedItem = this.getItemByText(text);
        this.onClick(activedItem);
    },
    inited() {
        this.watch('selectedItemText', text => this.activeItemByText(text));
    },
    attached() {
        this.activeItemByText(this.data.get('selectedItemText'));
    },
    onClick(item) {
        this.data.set('activedItem', item);
        this.fire('item-selected', item);
    }
});
