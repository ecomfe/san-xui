/**
 * @file components/Dialog.es6
 * @author leeight
 */
import $ from 'jquery';
import {defineComponent} from 'san';

import {create, nextZindex} from './util';
import Button from './Button';

const cx = create('ui-dialog');

/* eslint-disable */
const template = `<template>
<div s-if="open" class="{{mainClass}}" style="{{dialogStyle}}">
    <div class="${cx('head', 'head-panel')}" san-if="head">
        <div class="${cx('title')}">
            <slot name="head">Title</slot>
        </div>
        <div class="${cx('close-icon')}" on-click="onCloseDialog"></div>
    </div>
    <div class="${cx('body', 'body-panel')}">
        <slot />
    </div>
    <div class="${cx('foot', 'foot-panel')}" san-if="foot">
        <slot name="foot">
            <ui-button on-click="onCloseDialog">取消</ui-button>
            <ui-button skin="primary">确认</ui-button>
        </slot>
    </div>
</div>
<div s-if="open && mask" on-click="onClickMask" class="${cx('mask')}" style="{{maskStyle}}"></div>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-button': Button
    },
    initData() {
        return {
            draggable: false,
            closeOnClickMask: false,
            width: 'auto',
            height: 'auto',
            open: false,
            mask: true,
            foot: true,
            head: true
        };
    },
    computed: {
        mainClass() {
            const klass = [cx(), cx('x')];
            const draggable = this.data.get('draggable');
            if (draggable) {
                klass.push('state-draggable');
                klass.push(cx('draggable'));
            }
            return klass;
        },
        maskStyle() {
            return {
                'z-index': nextZindex()
            };
        },
        dialogStyle() {
            const width = this.data.get('width');
            const height = this.data.get('height');
            const styles = {'opacity': 1, 'z-index': nextZindex() + 1};
            if (width !== 'auto') {
                styles.width = `${width}px`;
            }
            if (height !== 'auto') {
                styles.height = `${height}px`;
            }
            return styles;
        }
    },
    onCloseDialog() {
        this.data.set('open', false);
        this.fire('close');
    },
    onClickMask() {
        if (this.data.get('closeOnClickMask')) {
            this.data.set('open', false);
            this.fire('close');
        }
    },
    attached() {
        if (this.el.parentNode !== document.body) {
            document.body.appendChild(this.el);
        }
    },
    disposed() {
        $(this.el).remove();
    }
});
