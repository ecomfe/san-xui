/**
 * @file aside.es6
 * @author leeight
 */

import u from 'lodash';
import {defineComponent} from 'san';
import SearchBox from 'inf-ui/x/components/SearchBox';

/* eslint-disable */
const template = `<div class="aside">
    <div class="searchbox">
        <ui-searchbox
            search-btn="{{false}}"
            value="{=keyword=}"
            width="145"
            placeholder="请输入关键字" />
    </div>
    <dl s-for="block, i in filteredBlocks">
        <dt>{{block.title}}</dt>
        <dd s-if="!block.collapse">
            <ul>
                <li on-click="onClick(item)"
                    class="{{item === activedItem ? 'selected' : item.disabled ? 'disabled' : ''}}"
                    s-for="item in block.items">{{item.text}}</li>
            </ul>
        </dd>
    </dl>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-searchbox': SearchBox
    },
    initData() {
        return {
            activedItem: null,
            keyword: '',
            blocks: []
        };
    },
    computed: {
        filteredBlocks() {
            const keyword = this.data.get('keyword');
            const blocks = this.data.get('blocks');
            const filteredBlocks = [];
            u.each(blocks, block => {
                const items = [];
                u.each(block.items, item => {
                    if (item.text.indexOf(keyword) !== -1) {
                        items.push(item);
                    }
                });
                if (items.length) {
                    filteredBlocks.push({
                        title: block.title,
                        items
                    });
                }
            });

            return filteredBlocks;
        }
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
        if (item.disabled) {
            return;
        }
        this.data.set('activedItem', item);
        this.fire('item-selected', item);
    }
});
