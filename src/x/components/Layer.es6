/**
 * @file Layer.es6
 * @author leeight
 */
import $ from 'jquery';
import _ from 'lodash';
import {nextTick, defineComponent} from 'san';

import {nextZindex, create} from './util';
import {opacity} from './fx/opacity';

const cx = create('ui-layer');

/* eslint-disable */
const template = `<template>
    <div s-if="open" s-transition="$fxOpacity" class="${cx()}" style="{{layerStyle}}"><slot/></div>
</template>`;

/* eslint-enable */

function returnFalse(e) {
    e.stopPropagation();
}

export default defineComponent({
    template,
    $fxOpacity: opacity(5),
    initData() {
        return {
            // 是否是打开的状态
            open: false,
            // 点击文档中其它位置的时候，是否自动隐藏
            autoHide: true,
            // 如果在页面中直接使用layer，可能希望点击了父节点也触发隐藏。变量默认为true，因为select等组件需要。
            // 如果autoHide 为false 此变量无效。
            autoHideExceptParent: true,
            // 是否自动定位到 parentComponent.el 的下面
            autoPosition: true,
            width: null,    // 外部传进来的宽度值
            align: 'left',  // 左边距对齐，有时候如果需要右边距对齐，设置为 'right' 即可
            offsetTop: 0,   // 有时候自动定位不准确，需要修正一下
            offsetLeft: 0,  // 有时候自动定位不准确，需要修正一下
            layerStyle: {
                left: '-10000px',
                top: '-10000px'
            }
        };
    },
    inited() {
        const autoHide = this.data.get('autoHide');
        this.autoHideHandler = autoHide ? () => this.data.set('open', false) : null;

        this.scrollHandler = _.throttle(() => this.selfPosition(true), 1000);

        this.watch('open', open => {
            // 一个表单页可以能有较多select && 其他浮层。关闭的情况下去掉事件。

            open ? this.bindLayerEvents() : this.unbindLayerEvents();

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

        // 这些事件只在显示时才有意义，默认情况下，一个页面只有一个浮层处于打开状态
        if (this.data.get('open')) {
            this.bindLayerEvents();
        }
    },
    bindLayerEvents() {
        if (this.autoHideHandler) {
            $(document).on('mousedown', this.autoHideHandler);
            $(this.el).on('mousedown', returnFalse);

            const pc = this.parentComponent;
            const autoHideExceptParent = this.data.get('autoHideExceptParent');
            // 用pc.id fix 点击选择组件闪动的bug
            if (autoHideExceptParent && pc && pc.el) {
                $(pc.el).on('mousedown', returnFalse);
            }
        }

        $(window).on('scroll', this.scrollHandler);
    },
    unbindLayerEvents() {
        if (this.autoHideHandler) {
            $(document).off('mousedown', this.autoHideHandler);
            $(this.el).off('mousedown', returnFalse);

            const pc = this.parentComponent;
            const autoHideExceptParent = this.data.get('autoHideExceptParent');
            if (autoHideExceptParent && pc && pc.el) {
                $(pc.el).off('mousedown', returnFalse);
            }
        }

        $(window).off('scroll', this.scrollHandler);
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
            this.data.set('layerStyle.left', leftValue);
            this.data.set('layerStyle.top', topValue);
        }
        else {
            this.data.set('layerStyle', {
                'z-index': nextZindex(),
                'left': leftValue,
                'top': topValue
            });
        }
    },
    detached() {
        this.unbindLayerEvents();
        $(this.el).remove();
    }
});
