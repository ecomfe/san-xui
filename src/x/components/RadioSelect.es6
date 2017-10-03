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
            s-for="item, i in datasource">{{item.text}}</li>
    </ul>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    computed: {
        mainClass() {
            const skin = this.data.get('skin');
            const disabled = this.data.get('disabled');
            const klass = [cx()];
            if (skin) {
                klass.push('skin-' + skin);
                klass.push('skin-' + skin + '-radioselect');
            }
            if (disabled) {
                klass.push(cx('disabled'));
                klass.push('state-disabled');
            }
            return klass;
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


