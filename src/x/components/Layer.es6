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
            // 是否是打开的状态
            open: false,
            // 点击文档中其它位置的时候，是否自动隐藏
            autoHide: true,
            // 是否自动定位到 parentComponent.el 的下面
            autoPosition: true,
            style: {}
        };
    },
    attached() {
        if (this.el.parentNode !== document.body) {
            document.body.appendChild(this.el);
        }
        if (this.autoHideHandler) {
            $(document).on('mousedown', this.autoHideHandler);
        }
        $(this.el).on('mousedown', returnFalse);
        const pc = this.parentComponent;
        if (pc && pc.el) {
            $(pc.el).on('mousedown', returnFalse);
        }
    },
    inited() {
        const autoHide = this.data.get('autoHide');
        this.autoHideHandler = autoHide ? () => this.data.set('open', false) : null;
        this.watch('open', open => {
            const autoPosition = this.data.get('autoPosition');
            if (autoPosition && open) {
                this.selfPosition();
            }
        });
    },
    selfPosition() {
        const pc = this.parentComponent;
        if (!pc || !pc.el) {
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
        if (this.autoHideHandler) {
            $(document).off('mousedown', this.autoHideHandler);
        }
        $(this.el).off('mousedown', returnFalse);
        const pc = this.parentComponent;
        if (pc && pc.el) {
            $(pc.el).off('mousedown', returnFalse);
        }
    }
});
