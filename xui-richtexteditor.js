define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([29],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__asInput__ = __webpack_require__(3);
/**
 * @file Switch.es6
 * @author leeight
 */






const cx = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-togglebutton');

/* eslint-disable */
const template = `<div on-click="toggleSwitch" class="{{mainClass}}">
    <span s-if="checked" class="${cx('part-on')}">ON</span>
    <span s-else class="${cx('part-off')}">OFF</span>
</div>`;
/* eslint-enable */

const Switch = Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({    // eslint-disable-line
    template,
    initData() {
        return {
            checked: true
        };
    },
    dataTypes: {
        /**
         * 获取或者设置 Switch 组件选中的状态
         * @bindx
         * @default true
         */
        checked: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,

        /**
         * Switch 组件的禁用状态
         */
        disabled: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool
    },
    computed: {
        value() {
            return this.data.get('checked');
        },
        mainClass() {
            const klass = cx.mainClass(this);
            const checked = this.data.get('checked');
            if (checked) {
                klass.push('state-checked');
                klass.push(cx('checked'));
            }
            return klass;
        }
    },
    inited() {
        this.watch('value', value => this.fire('change', {value}));
    },
    toggleSwitch() {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }

        const checked = this.data.get('checked');
        this.data.set('checked', !checked);
    }
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2__asInput__["a" /* asInput */])(Switch));


/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = asInput;
/**
 * @file components/asInput.es6
 * @author leeight
 */

function asInput(Klass) {
    return class extends Klass {
        fire(name, event) {
            super.fire(name, event);

            if (name === 'change' && event.value != null
                || name === 'input') {
                this.nextTick(() => {
                    const value = this.data.get('value');
                    this.dispatch('input-comp-value-changed', {value});
                });
            }
        }
    };
}


/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_Switch__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_RichTextEditor__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Row__ = __webpack_require__(5);
/**
 * @file demos/xui-richtexteditor.es6
 * @author leeight
 */







/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-richtexteditor value="{=value=}" />
</x-row>

<x-row label="options=...">
    <xui-richtexteditor
        options="{{options}}"
        value="{=value=}" />
    <strong class="large">
        Value is: {{value}}
    </strong>
</x-row>

<x-row label="s-if">
    <xui-switch checked="{=show=}" />
    <form s-if="show">
        <xui-richtexteditor options="{{options}}" />
    </form>
</x-row>

</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_3__Row__["a" /* default */],
        'xui-switch': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_Switch__["a" /* default */],
        'xui-richtexteditor': __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_RichTextEditor__["a" /* default */]
    },
    initData() {
        return {
            show: true,
            value: 'Hello world! <strong> This is the initialize content </strong>',
            options: {
                toolbars: [
                    [
                        'fullscreen', 'source', '|', 'undo', 'redo', '|',
                        'bold', 'italic', 'underline', 'fontborder', 'strikethrough'
                    ]
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

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Loading__ = __webpack_require__(15);
/**
 * @file components/RichTextEditor.es6
 * @author leeight
 */

/* global UE */








const cx = Object(__WEBPACK_IMPORTED_MODULE_3__util__["f" /* create */])('ui-richtexteditor');

const kDefaultEditorOptions = {
    // 如果配置了 urlArgs，那么后续用 UEDITOR_HOME_URL 拼接路径的时候就出问题了，因此把这个部分删掉
    UEDITOR_HOME_URL: window.require.toUrl('ueditor/').replace(/\?.*/, ''),
    // initialFrameWidth: 770,
    initialFrameHeight: 250,
    autoFloatEnabled: false,
    elementPathEnabled: false,
    autoHeightEnabled: false,
    iframeUrlMap: {
        link: window.require.toUrl('ueditor/dialogs/link/link.html')
    },
    serverUrl: '/api/mc/imageUpload',
    initialStyle: [
        `p, ol{
            line-height: 1.5em;
            color: #494949;
            font-family: Microsoft Yahei, Tahoma, Arial, Helvetica, STHeiti;
            font-size: 12px;
        }`
    ],
    toolbars: [[
        'source', 'undo', 'redo', 'insertunorderedlist', 'insertorderedlist', 'unlink',
        'link', 'bold', 'underline', 'fontborder', 'strikethrough', 'forecolor',
        'backcolor', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify',
        'removeformat', 'fontfamily', 'fontsize', '|', 'simpleupload', 'imagenone',
        'imageleft', 'imageright', 'imagecenter', 'blockquote', 'cleardoc', 'formatmatch',
        'indent', 'lineheight', 'paragraph', 'rowspacing', 'date', ''
    ]]
};

/* eslint-disable */
const template = `<template>
<div class="${cx()}">
    <ui-loading s-if="loading" />
    <div class="${cx('error')}" s-if="error">{{error}}</div>
    <div s-ref="ghost" style="{{mainStyle}}"></div>
</div>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_san__["defineComponent"])({
    template,
    components: {
        'ui-loading': __WEBPACK_IMPORTED_MODULE_4__Loading__["a" /* default */]
    },
    computed: {
        mainStyle() {
            const loading = this.data.get('loading');
            const style = cx.mainStyle(this);
            style.display = loading ? 'none' : 'block';
            return style;
        },
        editorOptions() {
            const options = this.data.get('options');
            return __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.extend({}, kDefaultEditorOptions, options);
        }
    },
    initData() {
        return {
            loading: true,
            error: null,
            width: '100%',
            height: null,
            options: null
        };
    },
    dataTypes: {
        /**
         * 获取编辑器的值，不支持双绑
         */
        value: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].string,

        /**
         * 编辑器的配置项
         * @default {...}
         */
        options: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].object,

        /**
         * 编辑器的宽度
         * @default 100%
         */
        width: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].string,

        /**
         * 编辑器的高度
         */
        height: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].string
    },
    inited() {
        /** TODO(leeight) 暂时不支持在运行时动态的修改 editor 的内容
        this.watch('value', value => {
            if (this.editor) {
                this.editor.setContent(value);
            }
        });
        */
    },
    attached() {
        window.require(['zeroclipboard', 'inf-ria/js!ueditor/ueditor.all.min.js'], ZeroClipboard => {
            this.data.set('loading', false);

            // TODO(leeight) FIX ZeroClipboard
            window.ZeroClipboard = ZeroClipboard;

            const editorOptions = this.data.get('editorOptions');
            const value = this.data.get('value');
            const ghost = this.ref('ghost');

            if (!ghost) {
                this.data.set('error', new Error('RichTextEditor初始化失败'));
                return;
            }

            const editor = this.editor = new UE.ui.Editor(editorOptions);
            editor.render(ghost);
            if (value) {
                editor.addListener('ready', () => {
                    if (this.editor) {
                        this.editor.setContent(value);
                    }
                });
            }
            editor.addListener('contentchange', () => {
                if (this.editor) {
                    const value = this.editor.getContent();
                    // FIXME(leeight) 递归的问题如何处理呢？
                    this.data.set('value', value);
                }
            });
        });
    },
    disposed() {
        if (this.editor) {
            try {
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#edui_fixedlayer').remove();
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#ueditor_textarea_editorValue').remove();
                this.editor.destroy();
                this.editor = null;
            }
            catch (ex) {
            }
        }
    }
}));


/***/ })

},[365])});;