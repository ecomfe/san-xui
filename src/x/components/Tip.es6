/**
 * @file Tip.es6
 * @author leeight
 */
import dom from 'esui/lib/dom';
import {defineComponent} from 'san';

import {nextZindex, create, hasUnit} from './util';
import Layer from './Layer';
import Ghost from './Ghost';

const cx = create('ui-tip');
const cx2 = create('ui-tiplayer');

/* eslint-disable */
const template = `<template>
    <div on-mouseover="showLayer" on-mouseout="hideLayer" class="{{mainClass}}">
        <ui-layer open="{=active=}" auto-position="{{false}}" s-ref="layer">
            <ui-ghost class="{{tiplayerClass}}" s-ref="layer-body">
                <div class="${cx2('body-panel')}" on-mouseenter="cancelTimer" on-mouseleave="hideLayer">
                    <div class="${cx2('body')}" s-if="message" style="{{messageStyle}}">
                        {{message | raw}}
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
        },
        messageStyle() {
            const style = {};
            const width = this.data.get('width');
            if (width != null) {
                style.width = hasUnit(width) ? width : width + 'px';
            }
            return style;
        }
    },
    initData() {
        return {
            message: null,
            position: 'lt', // 'lt' | 'tc' | 'rt' | 'bc'
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
            const style = {'z-index': nextZindex()};
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
            layer.data.set('layerStyle', style);
        }
    },
    updated() {
        const active = this.data.get('active');
        if (active) {
            this.positionLayer();
        }
    },
    showLayer() {
        this.cancelTimer();
        this.timer = setTimeout(
            () => {
                this.timer = null;
                this.data.set('active', true);
            },
            this.data.get('duration')
        );
    },
    cancelTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    },
    hideLayer() {
        this.cancelTimer();
        const active = this.data.get('active');
        if (!active) {
            return;
        }
        this.timer = setTimeout(
            () => {
                this.timer = null;
                this.data.set('active', false);
            },
            this.data.get('duration')
        );
    }
});

