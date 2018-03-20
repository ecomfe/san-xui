/**
 * @file components/InstantEditor.js
 * @author leeight
 */

import _ from 'lodash';
import {defineComponent, NodeType} from 'san';

import {hasUnit, create} from './util';
import Layer from './Layer';
import Button from './Button';

const cx = create('ui-instanteditor');

/* eslint-disable */
const template = `<div on-click="toggleLayer($event)" class="{{mainClass}}">
    <span s-if="label" class="${cx('text')}">{{label|raw}}</span>
    <ui-layer
        follow-scroll="{{false}}"
        auto-hide="{{true}}"
        open="{=active=}"
        offset-left="{{layerOffsetLeft}}"
        layer-style="{{position}}"
        s-ref="layer"
    >
        <div class="${cx('layer')} ${cx('layer-x')}" style="{{layerStyle}}">
            <div class="${cx('input-field')}">
                <slot />
                <div class="${cx('error')}" s-if="error">{{error}}</div>
            </div>
            <div class="${cx('help')}" s-if="help">{{help | raw}}</div>
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
            label: '编辑',
            help: null,
            active: false,
            submiting: false,
            submitDisabled: false,
            position: {},
            layerWidth: 'auto',
            layerOffsetLeft: 0
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
        }
    },
    getInputComp() {
        try {
            const slots = this.slot();
            const children = _.filter(slots[0].children, n => n.nodeType !== NodeType.TEXT);
            return children[0];
        }
        catch (ex) {
            return null;
        }
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

