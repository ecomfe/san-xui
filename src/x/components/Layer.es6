/**
 * @file Layer.es6
 * @author leeight
 */
import $ from 'jquery';
import {defineComponent} from 'san';

import {create} from './util';

const cx = create('ui-layer');

/* eslint-disable */
const template = `<template>
    <div s-if="open" class="${cx()}" style="{{style}}"><slot/></div>
</template>`;
/* eslint-enable */

function returnFalse() {
    return false;
}

export default defineComponent({
    template,
    initData() {
        return {
            open: false,
            auto: true,
            style: {}
        };
    },
    attached() {
        if (this.el.parentNode !== document.body) {
            document.body.appendChild(this.el);
        }
        $(document).on('mousedown', this.autoHideHandler);
        $(this.el).on('mousedown', returnFalse);
        const pc = this.parentComponent;
        if (pc && pc.el) {
            $(pc.el).on('mousedown', returnFalse);
        }
    },
    inited() {
        this.autoHideHandler = () => this.data.set('open', false);
        this.watch('open', open => {
            const auto = this.data.get('auto');
            if (auto && open) {
                this.selfPosition();
            }
        });
    },
    selfPosition() {
        const pc = this.parentComponent;
        if (!pc) {
            return;
        }
        const $pce = $(pc.el);
        const {left, top} = $pce.offset();
        const height = $pce.height();
        this.data.set('style', {
            left: left + 'px',
            top: (top + height) + 'px'
        });
    },
    disposed() {
        $(document).off('mousedown', this.autoHideHandler);
        $(this.el).off('mousedown', returnFalse);
        const pc = this.parentComponent;
        if (pc && pc.el) {
            $(pc.el).off('mousedown', returnFalse);
        }
    }
});
