/**
 * @file components/Dialog.es6
 * @author leeight
 */
import $ from 'jquery';
import lib from 'esui/lib';
import {defineComponent} from 'san';

import {create, nextZindex} from './util';
import Button from './Button';
import {i18n} from '../../mixins/filters';
import {opacity} from './fx/opacity';

const cx = create('ui-dialog');

/* eslint-disable */
const template = `<template>
<div s-if="open" s-transition="$fxOpacity" class="{{mainClass}}" style="{{dialogStyle}}">
    <div class="${cx('head', 'head-panel')}" san-if="head">
        <div class="${cx('title')}">
            <slot name="head">Title</slot>
        </div>
        <div class="${cx('close-icon')}" on-click="onCloseDialog"></div>
    </div>
    <div class="${cx('body', 'body-panel')}" style="{{dialogBodyStyle}}">
        <slot />
    </div>
    <div class="${cx('foot', 'foot-panel')}" san-if="foot">
        <slot name="foot">
            <ui-button on-click="onConfirmDialog" skin="primary">{{'确认'|i18n}}</ui-button>
            <ui-button on-click="onCloseDialog">{{'取消'|i18n}}</ui-button>
        </slot>
    </div>
</div>
<div s-if="open && mask" on-click="onClickMask" class="${cx('mask')}" style="{{maskStyle}}"></div>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    $fxOpacity: opacity(5),
    components: {
        'ui-button': Button
    },
    filters: {
        i18n
    },
    initData() {
        const zIndex = nextZindex();
        return {
            draggable: false,
            closeOnClickMask: false,
            maskZindex: zIndex,
            dialogZindex: zIndex + 1,
            width: 'auto',
            height: 'auto',
            left: null,
            top: '-10000px',
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
            const skin = this.data.get('skin');
            if (skin) {
                klass.push('skin-' + skin);
                klass.push('skin-' + skin + '-dialog');
            }
            return klass;
        },
        maskStyle() {
            return {
                'z-index': this.data.get('maskZindex')
            };
        },
        dialogBodyStyle() {
            const styles = {};
            const height = this.data.get('height');
            if (height !== 'auto') {
                styles.height = `${height}px`;
            }
            return styles;
        },
        dialogStyle() {
            const width = this.data.get('width');
            const left = this.data.get('left');
            const top = this.data.get('top');
            const styles = {'opacity': 1, 'z-index': this.data.get('dialogZindex')};
            if (width !== 'auto') {
                styles.width = `${width}px`;
            }
            if (left != null) {
                styles.left = left;
            }
            if (top != null) {
                styles.top = top;
            }
            return styles;
        }
    },
    onCloseDialog() {
        this.data.set('open', false);
        this.fire('close');
    },
    onConfirmDialog() {
        this.data.set('open', false);
        this.fire('confirm');
    },
    onClickMask() {
        if (this.data.get('closeOnClickMask')) {
            this.data.set('open', false);
            this.fire('close');
        }
    },
    __resize() {
        const open = this.data.get('open');
        if (!open) {
            return;
        }
        const zIndex = nextZindex();
        this.data.set('maskZindex', zIndex);
        this.data.set('dialogZindex', zIndex + 1);
        this.nextTick(() => {
            const main = $(this.el).find('> .ui-dialog-x');
            // const left = Math.max((lib.page.getViewWidth() - main.prop('offsetWidth')) / 2, 0);
            const top = lib.page.getScrollTop() + Math.max((lib.page.getViewHeight() - main.prop('offsetHeight')) / 2, 0);
            this.data.set('top', top + 'px');
        });
    },
    inited() {
        this.watch('open', () => this.__resize());
    },
    attached() {
        if (this.el.parentNode !== document.body) {
            document.body.appendChild(this.el);
        }
        this.__resize();
    },
    detached() {
        $(this.el).remove();
    }
});
