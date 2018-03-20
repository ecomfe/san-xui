/**
 * @file components/ButtonMenu.js
 * @author leeight
 */

import {defineComponent} from 'san';

import {create} from './util';
import Button from './Button';
import Layer from './Layer';
import Icon from './Icon';

const cx = create('ui-button-menu');
const cx2 = create('ui-select');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <ui-button
        on-click="toggleMenu"
        disabled="{{disabled}}"
        icon="{{icon}}"
        skin="{{skin}}"
    >{{label}}<ui-icon name="downarrow" /></ui-button>
    <ui-layer open="{=open=}" s-ref="layer" follow-scroll="{{false}}">
        <ul class="${cx2('layer', 'layer-x')}">
            <li class="{{item.disabled ? '${cx2('item', 'item-disabled')}' : '${cx2('item')}'}}"
                on-click="onItemClick(item)"
                s-for="item in menus">{{item.text}}</li>
        </ul>
    </ui-layer>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-button': Button,
        'ui-icon': Icon,
        'ui-layer': Layer
    },
    initData() {
        return {
            disabled: false,
            skin: '',
            icon: '',
            label: '',
            menus: [],
            open: false
        };
    },
    computed: {
        mainClass() {
            const klass = cx.mainClass(this);
            const active = this.data.get('open');
            if (active) {
                klass.push('state-active');
                klass.push(cx('active'));
            }
            return klass;
        }
    },
    toggleMenu() {
        const open = this.data.get('open');
        this.data.set('open', !open);
    },
    onItemClick(item) {
        if (item.disabled) {
            return;
        }
        this.fire('command', item);
        this.data.set('open', false);
    }
});
