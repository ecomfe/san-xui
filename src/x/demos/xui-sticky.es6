/**
 * @file demos/xui-sticky.es6
 * @author liyuan
 */

import {defineComponent} from 'san';
import {Sticky} from 'san-xui';

import Row from './Row';

/* eslint-disable */
const template = `<template>

    <div class="container" style="{{boxStyle}}">
        <xui-sticky marginTop="20" container=".container">
            <div slot="sticky" style="{{boxStyle}}">
                <strong class="large" >Sticky Element of custom container</strong>
            </div>
            <div style="{{boxStyle}}">
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
                sticky 自定义容器区域<br>
            </div>
        </xui-sticky>
    </div>
    <div style="{{boxStyle}}">
        stick容器外的内容<br>
        stick容器外的内容<br>
        stick容器外的内容<br>
        stick容器外的内容<br>
        stick容器外的内容<br>
        stick容器外的内容<br>
        stick容器外的内容<br>
        stick容器外的内容<br>
        stick容器外的内容<br>
        stick容器外的内容<br>
        stick容器外的内容<br>
        stick容器外的内容<br>
        stick容器外的内容<br>
    </div>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,

    components: {
        'x-row': Row,
        'xui-sticky': Sticky
    },

    initData() {
        return {
            boxStyle: {
                'padding': '10px',
                'box-sizing': 'border-box',
                'border': '1px solid #3d3d3d',
                'width': '100%',
                'text-align': 'center',
                'line-height': '30px'
            }
        };
    }
});

