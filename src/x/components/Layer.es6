/**
 * @file Layer.es6
 * @author leeight
 */
import $ from 'jquery';
import _ from 'lodash';
import {defineComponent} from 'san';
import lib from 'esui/lib';

import {nextZindex, create} from './util';
import {opacity} from './fx/opacity';

const cx = create('ui-layer');

/* eslint-disable */
const template = `
<template>
    <div s-if="open" s-transition="$fxOpacity" class="${cx()}" style="{{layerStyle}}"><slot/></div>
</template>
`;

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
            // 这两个值最好设置为实际需要的宽度和高度。特别是在slot里的内容有较多的动态变化时，
            // 因为可能会出现第一次显示浮层和后续用open控制时显示的同一浮层的高度宽度计算值不一样。
            width: null, // 外部传进来的宽度值
            height: null, // 外部传进来的高度值
            align: 'left', // 左边距对齐，有时候如果需要右边距对齐，设置为 'right' 即可
            offsetTop: 0, // 有时候自动定位不准确，需要修正一下
            offsetLeft: 0, // 有时候自动定位不准确，需要修正一下
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
                this.nextTick(() => this.selfPosition());
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
        const align = this.data.get('align');
        // 相当于 宽度 和 高度 分别进行了调整，然后进行计算
        const offsetTop = this.data.get('offsetTop');
        const offsetLeft = this.data.get('offsetLeft');


        const pc = this.parentComponent;

        if (!pc || !pc.el) {
            return;
        }
        let topValue = 0;
        let leftValue = 0;

        // 和esui/layer对齐  但是保留了 用户自定义的offset
        // 垂直算法：
        // offsetTop产生的偏移将合和height合并在一起，参与同上下空间的比较
        // 1. 将层的上边缘贴住目标元素的下边缘
        // 2. 如果下方空间不够，则转为层的下边缘贴住目标元素的上边缘
        // 3. 如果上方空间依旧不够，则强制使用第1步的位置
        //
        // 水平算法：
        // offsetLeft产生的偏移将合和width合并在一起，参与同左右空间的比较
        // 1. 将层的左边缘贴住目标元素的左边缘
        // 2. 如果右侧空间不够，则转为层的右边缘贴住目标元素的右边缘
        // 3. 如果左侧空间依旧不够，则强制使用第1步的位置

        const pageWidth = lib.page.getViewWidth();
        const pageHeight = lib.page.getViewHeight();
        const pageScrollTop = lib.page.getScrollTop();
        const pageScrollLeft = lib.page.getScrollLeft();

        const targetElement = lib.getOffset(pc.el);


        // 只有这样才能取到具体放置slot的div。
        const layer = this.el.children[0];
        const layerElement = lib.getOffset(layer);

        // todo  1.第一次打开时获取slot 由于一些动态项的变化，高度时可能比实际高度小，在这种情况下请认真设置height 和 width
        // 2.如果layer在打开的状态下高度变化 暂时无特殊处理, 还是会动态的去计算位置。

        if (this.data.get('width')) {
            layerElement.width = this.data.get('width');
        }

        if (this.data.get('height')) {
            layerElement.height = this.data.get('height');
        }


        // 先算垂直的位置
        const bottomSpace = pageHeight - (targetElement.bottom - pageScrollTop);
        const topSpace = targetElement.top - pageScrollTop;
        if (bottomSpace <= (layerElement.height + offsetTop)
            && topSpace > (layerElement.height + offsetTop)) {
            // 放上面
            topValue = targetElement.top - layerElement.height;
        }
        else {
            // 放下面
            topValue = targetElement.bottom;
        }
        topValue = topValue + offsetTop;

        // 再算水平的位置
        const rightSpace = pageWidth - (targetElement.left - pageScrollLeft);
        const leftSpace = targetElement.right - pageScrollLeft;
        if (rightSpace <= (layerElement.width + offsetLeft)
            && leftSpace > (layerElement.width + offsetLeft)
            && align !== 'left') {
            // 靠右侧
            leftValue = targetElement.right - layerElement.width;
        }
        else {
            // 靠左侧
            leftValue = targetElement.left;
        }
        leftValue = leftValue + offsetLeft;
        topValue = topValue + 'px';
        leftValue = leftValue + 'px';

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
