/**
 * @file Layer.es6
 * @author leeight
 */
import $ from 'jquery';
import {nextTick, defineComponent} from 'san';

import {nextZindex, create} from './util';

const cx = create('ui-layer');

/* eslint-disable */
const template = `<template>
    <div s-if="open" class="${cx()}" style="{{style}}"><slot/></div>
</template>`;
/* eslint-enable */

function returnFalse(e) {
    // FIXME(leeight) This is a hack for xui-select[multi=true,filter=true]
    const nodeName = e.target.nodeName;
    if (nodeName === 'INPUT') {
        if (typeof e.target.focus === 'function') {
            e.target.focus();
            e.target.select();
        }
    }

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
            width: null,    // 外部传进来的宽度值
            align: 'left',  // 左边距对齐，有时候如果需要右边距对齐，设置为 'right' 即可
            offsetTop: 0,   // 有时候自动定位不准确，需要修正一下
            offsetLeft: 0,  // 有时候自动定位不准确，需要修正一下
            style: {}
        };
    },
    inited() {
        const autoHide = this.data.get('autoHide');
        this.autoHideHandler = autoHide ? () => this.data.set('open', false) : null;
        this.scrollHandler = () => this.selfPosition(true);
        this.watch('open', open => {
            const autoPosition = this.data.get('autoPosition');
            if (autoPosition && open) {
                nextTick(() => this.selfPosition());
            }
        });
    },
    attached() {
        if (this.el.parentNode !== document.body) {
            document.body.appendChild(this.el);
        }
        if (this.autoHideHandler) {
            $(document).on('mousedown', this.autoHideHandler);
        }
        if (this.scrollHandler) {
            $(window).on('scroll', this.scrollHandler);
        }
        $(this.el).on('mousedown', returnFalse);
        const pc = this.parentComponent;
        if (pc && pc.el) {
            $(pc.el).on('mousedown', returnFalse);
        }
    },
    selfPosition(kz) {
        const pc = this.parentComponent;
        if (!pc || !pc.el) {
            return;
        }
        const $pce = $(pc.el);
        const {left, top} = $pce.offset();
        const height = $pce.height();
        const width = $pce.width();
        const layerWidth = this.data.get('width') || $(this.el).width();
        const offsetTop = this.data.get('offsetTop');
        const offsetLeft = this.data.get('offsetLeft');
        const align = this.data.get('align');
        const leftValue = align === 'left'
            ? `${left + offsetLeft}px`
            : `${left - layerWidth + width + offsetLeft}px`;
        const topValue = `${top + height + offsetTop}px`;
        if (kz) {
            this.data.set('style.left', leftValue);
            this.data.set('style.top', topValue);
        }
        else {
            this.data.set('style', {
                'z-index': nextZindex(),
                'left': leftValue,
                'top': topValue
            });
        }
    },
    detached() {
        if (this.autoHideHandler) {
            $(document).off('mousedown', this.autoHideHandler);
        }
        if (this.scrollHandler) {
            $(window).off('scroll', this.scrollHandler);
        }
        const pc = this.parentComponent;
        if (pc && pc.el) {
            $(pc.el).off('mousedown', returnFalse);
        }
        $(this.el).off('mousedown', returnFalse);
        $(this.el).remove();
    }
});
