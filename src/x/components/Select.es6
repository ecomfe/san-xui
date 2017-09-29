/**
 * @file Select.es6
 * @author leeight
 */

import $ from 'jquery';
import {defineComponent} from 'san';

import {create} from './util';
import Layer from './Layer';

const cx = create('ui-select');
const kDefaultLabel = '请选择';

/* eslint-disable */
const template = `<div on-click="toggleLayer($event)" class="{{mainClass}}">
    <span class="${cx('text')}">{{label}}</span>
    <ui-layer open="{=active=}">
        <ul class="${cx('layer')} ${cx('layer-x')}">
            <li on-click="selectItem($event, item)" class="{{item | itemClass}}" s-for="item in datasource">
                <span>{{item.text}}</span>
            </li>
        </ul>
    </ui-layer>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-layer': Layer
    },
    initData() {
        return {
            active: false,
            selectedItem: null,
            value: ''
        };
    },
    computed: {
        label() {
            const selectedItem = this.data.get('selectedItem');
            return selectedItem ? selectedItem.text : kDefaultLabel;
        },
        mainClass() {
            const skin = this.data.get('skin');
            const disabled = this.data.get('disabled');
            const active = this.data.get('active');
            const klass = [cx(), cx('x')];
            if (skin) {
                klass.push('skin-' + skin);
                klass.push('skin-' + skin + '-button');
            }
            if (disabled) {
                klass.push('state-disabled');
                klass.push(cx('disabled'));
            }
            if (active) {
                klass.push('state-active');
                klass.push(cx('active'));
            }
            return klass;
        }
    },
    filters: {
        itemClass(item) {
            const value = this.data.get('value');
            const klass = [cx('item')];
            if (item.value === value) {
                klass.push(cx('item-selected'));
            }
            if (item.disabled) {
                klass.push(cx('item-disabled'));
            }
            return klass;
        }
    },
    inited() {
        const value = this.data.get('value');
        const datasource = this.data.get('datasource');
        if (value && datasource) {
            for (let i = 0; i < datasource.length; i++) {
                if (datasource[i] && datasource[i].value === value) {
                    this.data.set('selectedItem', datasource[i]);
                    break;
                }
            }
        }
    },
    selectItem(e, item) {
        const $e = $.event.fix(e);
        $e.stopPropagation();
        if (item.disabled) {
            return;
        }
        this.data.set('selectedItem', item);
        this.data.set('value', item.value);
        this.data.set('active', false);
    },
    toggleLayer(e) {
        const $e = $.event.fix(e);
        $e.stopPropagation();
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }
        const active = this.data.get('active');
        this.data.set('active', !active);
    }
});
