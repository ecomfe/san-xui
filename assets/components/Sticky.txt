/**
 * @file components/Sticky.js
 * @author liyuan
 */

import {DataTypes, defineComponent} from 'san';
import _ from 'lodash';

import {getOffset} from '../esui/dom';
import {getScrollTop, getHeight} from '../esui/page';
import {create} from './util';

const cx = create('ui-sticky');

/* eslint-disable */
const template = `<template>
<div class="{{mainClass}}" style="{{mainStyle}}">
    <div class="sticky" style="{{stickElementStyle}}">
        <slot name="sticky"></slot>
    </div>
    <slot><slot>
</div>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,

    initData() {
        return {
            active: false, // sticky元素是否stuck
            top: 0, // sticky的时候距离container的高度
            container: 'body' // 设置sticky元素的容器，默认body
        };
    },

    dataTypes: {
        /**
         * sticky元素是否stuck
         * @default false
         */
        active: DataTypes.bool,

        /**
         * sticky的时候距离container的高度
         * @default 0
         */
        top: DataTypes.number,

        /**
         * 设置sticky元素的容器，默认body
         * @default 'body'
         */
        container: DataTypes.string
    },

    computed: {
        mainClass() {
            const klass = cx.mainClass(this);
            const active = this.data.get('active');
            if (active) {
                klass.push('state-active');
                klass.push(cx('active'));
                klass.push(cx('x-active'));
            }
            return klass;
        },
        mainStyle() {
            return cx.mainStyle(this);
        }
    },

    inited() {
        const top = this.data.get('top');
        this.data.set('top', parseInt(top, 10));

        this.scrollHandler = _.debounce(() => this.setPosition(), 20);
    },

    setPosition() {
        let active = this.data.get('active');
        let stickElementStyle = {position: '', width: '', top: '', left: ''};

        const {top, container, stickElementRect, stickyContainerRect, stickyContainer} = this.data.get();
        const scrollTop = getScrollTop();
        const containerHeight = container === 'body' ? getHeight() : stickyContainer.offsetHeight;

        if (stickElementRect.top === 0 && container === 'body') {
            stickElementStyle = {
                position: 'fixed',
                top: stickElementRect.top + 'px',
                left: stickElementRect.left + 'px',
                width: stickElementRect.width + 'px'
            };
        }
        else if (scrollTop > stickElementRect.top - top) {
            stickElementStyle = {
                position: 'fixed',
                width: stickElementRect.width + 'px',
                left: stickElementRect.left + 'px'
            };

            if (scrollTop + stickElementRect.height + top > stickyContainerRect.top + containerHeight) {
                active = false;
                stickElementStyle.top = stickyContainerRect.top + containerHeight - (scrollTop + stickElementRect.height) + 'px';
            }
            else {
                active = true;
                stickElementStyle.top = top + 'px';
            }
        }
        else {
            active = false;
            stickElementStyle = {position: '', width: '', top: '', left: ''};
        }

        this.data.set('stickElementStyle', stickElementStyle);
        this.data.set('active', active);
    },

    attached() {
        const container = this.data.get('container');
        const stickElement = document.querySelector('.sticky');
        const stickyContainer = document.querySelector(container);

        const stickElementRect =  getOffset(stickElement);
        const stickyContainerRect =  getOffset(stickyContainer);


        this.data.set('stickElementRect', stickElementRect);
        this.data.set('stickyContainerRect', stickyContainerRect);
        this.data.set('stickyContainer', stickyContainer);

        window.addEventListener('scroll', this.scrollHandler, true);
    },

    detached() {
        window.removeEventListener('scroll', this.scrollHandler, true);
    }
});
