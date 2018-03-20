/**
 * @file Toast.js
 * @author leeight
 */
import $ from 'jquery';
import {DataTypes, defineComponent} from 'san';

import {create, nextZindex} from './util';

const cx = create('ui-toast');
const kToastContainerId = cx('container') + '-' + new Date().getTime();

/* eslint-disable */
const template = `<template>
    <div class="{{mainClass}}" style="{{style}}">
        {{message | raw}}
    </div>
</template>`;
/* eslint-enable */

const Toast = defineComponent({   // eslint-disable-line
    template,
    components: {},
    computed: {
        style() {
            return {};
        },
        mainClass() {
            const klass = [cx(), cx('x')];
            const level = this.data.get('level');
            if (level) {
                klass.push(cx(level));
            }
            return klass;
        }
    },
    initData() {
        return {
            message: null,
            duration: 5000,
            level: 'success' // 'success' | 'info' | 'warning' | 'error'
        };
    },
    dataTypes: {
        /**
         * 需要展示的信息
         */
        message: DataTypes.string,

        /**
         * 最长展示的时间
         * @default 5000
         */
        duration: DataTypes.number,

        /**
         * 组件的样式，可选的参数有 success, info, warning, error
         * @default success
         */
        level: DataTypes.string
    },
    attached() {
        setTimeout(() => {
            $(this.el).fadeOut({
                duration: 1000,
                easing: 'swing',
                complete: () => this.dispose()
            });
        }, this.data.get('duration'));
    }
});

function getToastContainer() {
    let container = document.getElementById(kToastContainerId);
    if (!container) {
        container = document.createElement('DIV');
        container.id = kToastContainerId;
        container.className = cx('container');
        document.body.appendChild(container);
    }
    return container;
}

function toastBuilder(level) {
    return (message, duration = 5000) => {
        const comp = new Toast({data: {message, level, duration}});
        const container = getToastContainer();
        container.style.zIndex = nextZindex();
        comp.attach(container);
    };
}

Toast.success = toastBuilder('success');
Toast.info = toastBuilder('info');
Toast.warning = toastBuilder('warning');
Toast.error = toastBuilder('error');
Toast.alert = toastBuilder('warning'); // 兼容历史用法
Toast.normal = toastBuilder('success'); // 兼容bat-ria/mvc/FormAction里调用Toast的方式

export default Toast;
