/**
 * @file RadioSelect.es6
 * @author leeight
 */
import u from 'lodash';
import {defineComponent} from 'san';

import {create} from './util';

const cx = create('ui-radioselect');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <ul>
        <li on-click="onItemClick(item, i)"
            class="{{selectedIndex === i ? 'ui-radio-block ui-radio-selected' : 'ui-radio-block'}}"
            s-for="item, i in datasource">
          <div class="ui-radio-item-hover" s-if="item.tip">{{item.tip}}<br/></div>
          <div class="arrow-down" s-if="item.tip"><i></i></div>
          {{item.text}}
        </li>
    </ul>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    computed: {
        mainClass() {
            return cx.mainClass(this);
        }
    },
    filters: {
        itemClass(item) {
            const value = this.data.get('value');
            const klass = ['ui-radio-block'];
            if (item && item.value === value) {
                klass.push('ui-radio-selected');
            }
            return klass;
        }
    },
    initData() {
        return {
            value: null,
            selectedIndex: -1,
            // TODO(leeight) 暂不支持 tip
            datasource: []
        };
    },
    inited() {
        const value = this.data.get('value');
        if (value) {
            const datasource = this.data.get('datasource');
            u.each(datasource, (item, i) => {
                if (item.value === value) {
                    this.data.set('selectedIndex', i);
                }
            });
        }
    },
    onItemClick(item, selectedIndex) {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }
        this.data.set('value', item.value);
        this.data.set('selectedIndex', selectedIndex);
    }
});


