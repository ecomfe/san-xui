/**
 * @file components/InstantEditor.es6
 * @author leeight
 */

import u from 'lodash';
import {defineComponent} from 'san';

import {hasUnit, create} from './util';
import Layer from './Layer';
import Button from './Button';

const cx = create('ui-instanteditor');

/* eslint-disable */
const template = `<div on-click="toggleLayer($event)" class="{{mainClass}}">
    <span class="${cx('text')}">{{label|raw}}</span>
    <ui-layer auto-hide="{{true}}" open="{=active=}" s-ref="layer">
        <div class="${cx('layer')} ${cx('layer-x')}" style="{{layerStyle}}">
            <div class="${cx('input-field')}">
                <slot />
                <div class="${cx('error')}" s-if="error">{{error}}</div>
            </div>
            <div class="${cx('btns')}">
                <ui-button disabled="{{submitDisabled}}" on-click="onSubmit" skin="primary">{{submiting ? '提交中...' : '确定'}}</ui-button>
                <ui-button on-click="toggleLayer">取消</ui-button>
            </div>
        </div>
    </ui-layer>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-button': Button,
        'ui-layer': Layer
    },
    initData() {
        return {
            active: false,
            submiting: false,
            submitDisabled: false,
            layerWidth: 'auto'
        };
    },
    computed: {
        mainClass() {
            const klass = cx.mainClass(this);
            const active = this.data.get('active');
            if (active) {
                klass.push('state-active');
                klass.push(cx('active'));
            }
            return klass;
        },
        layerStyle() {
            const style = {};
            const layerWidth = this.data.get('layerWidth');
            if (layerWidth != null) {
                style.width = hasUnit(layerWidth) ? layerWidth : `${layerWidth}px`;
            }
            return style;
        },
        label() {
            return '编辑';
        }
    },
    getInputComp() {
        const slotChilds = this.slotChilds;
        if (!slotChilds || slotChilds.length <= 0) {
            return null;
        }

        const slotChild = u.find(slotChilds, item => !item.lifeCycle.is('disposed'));
        if (!slotChild) {
            return null;
        }

        const childs = slotChild.childs;
        if (!childs || childs.length <= 0) {
            return null;
        }

        const inputComp = childs[0];
        return inputComp;
    },
    attached() {
    },
    onSubmit() {
        const inputComp = this.getInputComp();
        const value = inputComp ? inputComp.data.get('value') : null;

        this.fire('submit', {value});
        // this.data.set('active', false);
    },
    toggleLayer(e) {
        const active = this.data.get('active');
        this.data.set('active', !active);
        this.data.set('error', null);
    }
});

