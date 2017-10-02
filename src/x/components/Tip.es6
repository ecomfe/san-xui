/**
 * @file Tip.es6
 * @author leeight
 */
import $ from 'jquery';
import dom from 'esui/lib/dom';
import {nextTick, defineComponent} from 'san';

import {create} from './util';
import Layer from './Layer';

const cx = create('ui-tip');
const cx2 = create('ui-tiplayer');

const Ghost = defineComponent({
    template: `<div><slot/></div>`
});

/* eslint-disable */
const template = `<template>
    <div on-mouseover="showLayer" on-mouseout="hideLayer" class="{{mainClass}}">
        <ui-layer open="{=active=}" auto-position="{{false}}" s-ref="layer">
            <ui-ghost class="{{tiplayerClass}}" s-ref="layer-body">
                <div class="${cx2('body-panel')}">
                    <div class="${cx2('body')}" s-if="message">
                        {{message}}
                    </div>
                    <div class="${cx2('body')}" s-else>
                        <slot />
                    </div>
                </div>
                <div class="{{arrowClass}}"></div>
            </ui-ghost>
        </ui-layer>
    </div>
</template>`;
/* eslint-enable */

export default defineComponent({   // eslint-disable-line
    template,
    components: {
        'ui-layer': Layer,
        'ui-ghost': Ghost
    },
    computed: {
        style() {
            return {};
        },
        tiplayerClass() {
            const position = this.data.get('position');
            const klass = [
                cx2(),
                cx2('x'),
                cx2(position)
            ];
            return klass;
        },
        arrowClass() {
            const position = this.data.get('position');
            const klass = [
                cx2('arrow'),
                cx2('arrow-' + position)
            ];
            return klass;
        },
        mainClass() {
            const klass = [cx(), cx('x')];
            return klass;
        }
    },
    initData() {
        return {
            message: null,
            position: 'lt',   // 'lt' | 'tc' | 'rt' | 'bc'
            active: false,
            duration: 500
        };
    },
    inited() {
        this.timer = null;
    },
    attached() {
    },
    positionLayer() {
        const layer = this.ref('layer');
        const layerBody = this.ref('layer-body');
        const position = this.data.get('position');
        if (layerBody && layerBody.el) {
            const rect = this.el.getBoundingClientRect();
            const offset = dom.getOffset(this.el);
            const {offsetHeight, offsetWidth} = layerBody.el;
            const style = {};
            if (position === 'lt') {
                style.top = (offset.top - (offsetHeight - rect.height) / 2) + 'px';
                style.left = offset.right + 'px';
            }
            else if (position === 'bc') {
                style.left = (offset.left - (offsetWidth - rect.width) / 2) + 'px';
                style.top = (offset.top + rect.height + 11) + 'px';
            }
            else if (position === 'rt') {
                style.top = (offset.top - (offsetHeight - rect.height) / 2) + 'px';
                style.left = (offset.left - offsetWidth) + 'px';
            }
            else if (position === 'tc') {
                style.left = (offset.left - (offsetWidth - rect.width) / 2) + 'px';
                style.top = (offset.top - rect.height - offsetHeight) + 'px';
            }
            layer.data.set('style', style);
        }
    },
    showLayer() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(
            () => {
                this.timer = null;
                this.data.set('active', true);
                nextTick(() => this.positionLayer());
            },
            this.data.get('duration')
        );
    },
    hideLayer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.timer = setTimeout(
            () => {
              this.timer = null;
              this.data.set('active', false)
            },
            this.data.get('duration')
        );
    }
});

