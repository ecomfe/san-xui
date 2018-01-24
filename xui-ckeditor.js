define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([49],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_CKEditor__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(5);
/**
 * @file demos/xui-ckeditor.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-ckeditor value="{=value=}" />
</x-row>

<x-row label="options=...">
    <xui-ckeditor options="{{options}}" value="{=value=}" />
    <strong class="large">
        Value is: {{value}}
    </strong>
</x-row>

</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-ckeditor': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_CKEditor__["a" /* default */]
    },
    initData() {
        return {
            value: 'Hello world! <strong> This is the initialize content </strong>',
            options: {
                toolbar: [
                    ['Source', '-', 'Bold', 'Italic'],
                    ['Source', '-', 'Bold', 'Italic']
                ]
            }
        };
    }
}));


/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/**
 * @file demos/Row.es6
 * @author leeight
 */



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template: `<div class="x-row">
        <div class="label" s-if="label">{{label}}</div>
        <div class="content"><slot/></div>
    </div>`
}));



/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Loading__ = __webpack_require__(15);
/**
 * @file components/CKEditor.es6
 * @author leeight
 */

/* global CKEDITOR */






const cx = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-ckeditor');

/* eslint-disable */
const template = `<template>
<div class="${cx()}">
    <ui-loading s-if="loading" />
    <div class="${cx('error')}" s-if="error">{{error}}</div>
    <div s-ref="ghost" style="{{mainStyle}}"></div>
</div>
</template>`;
/* eslint-enable */

window.CKEDITOR_BASEPATH = window.require.toUrl('ckeditor').replace(/\?.*/, '') + '/';

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'ui-loading': __WEBPACK_IMPORTED_MODULE_2__Loading__["a" /* default */]
    },
    computed: {
        mainStyle() {
            return cx.mainStyle(this);
        }
    },
    initData() {
        return {
            loading: true,
            error: null,
            value: null,
            options: {
                language: 'zh-cn',
                toolbarCanCollapse: true
            }
        };
    },
    dataTypes: {
        /**
         * 获取编辑器的值，不支持双绑
         */
        value: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * 编辑器的配置项目
         * @default {language: 'zh-cn', toolbarCanCollapse: true}
         */
        options: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].object
    },
    inited() {
        /**
        this.watch('value', value => {
            if (this.editor) {
                const editorData = this.editor.getData();
                if (value !== editorData) {
                    this.editor.setData(value);
                }
            }
        });
        */
    },
    attached() {
        window.require(['inf-ria/js!ckeditor/ckeditor.js'], () => {
            this.data.set('loading', false);
            const ghost = this.ref('ghost');
            const options = this.data.get('options');
            const editor = this.editor = CKEDITOR.replace(ghost.id, options);
            editor.on('instanceReady', () => {
                const value = this.data.get('value');
                if (value) {
                    editor.setData(value);
                }
            });

            editor.on('change', () => {
                const value = editor.getData();
                this.data.set('value', value);
                this.fire('change', {value});
            });
        });
    },
    disposed() {
        if (this.editor) {
            try {
                this.editor.destroy();
            }
            catch (ex) {
            }
        }
    }
}));


/***/ })

},[335])});;