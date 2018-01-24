define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([44],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/**
 * @file components/SyntaxHighlighter.es6
 * @author leeight
 */





const cx = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-hljs');

/* eslint-disable */
const template = `<div class="${cx()}">
<pre><code class="{{lang}}">{{highlightedCode|raw}}</code></pre>
</div>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    initData() {
        return {
            code: '',
            lang: 'javascript'
        };
    },
    dataTypes: {
        /**
         * 需要高亮的代码
         * @default ''
         */
        code: __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["a" /* DataTypes */].string,

        /**
         * 代码的类型
         * @default javascript
         */
        lang: __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["a" /* DataTypes */].string
    },
    __updateHighlightedCode(hljs) {
        const code = this.data.get('code');
        const lang = this.data.get('lang');
        try {
            const rv = hljs.highlight(lang, code);
            this.data.set('highlightedCode', rv.value);
        }
        catch (ex) {
            this.data.set('highlightedCode', '');
        }
    },
    attached() {
        const amdModules = ['hljs/highlight', 'inf-ria/css!hljs/styles/default.min.css'];
        window.require(amdModules, hljs => {
            this.watch('code', () => this.__updateHighlightedCode(hljs));
            this.watch('lang', () => this.__updateHighlightedCode(hljs));
            this.__updateHighlightedCode(hljs);
        });
    }
}));


/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_SyntaxHighlighter__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(5);
/**
 * @file demos/xui-hljs.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="lang=javascript">
    <xui-hljs code="{{code.javascript}}" />
</x-row>

<x-row label="lang=html">
    <xui-hljs code="{{code.html}}" lang="html" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-hljs': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_SyntaxHighlighter__["a" /* default */]
    },
    initData() {
        return {
            code: {
                javascript: 'var a = 10;\n'
                    + 'var b = 20;\n'
                    + 'console.log(a + b + \'c = 30\')\n',
                html: '<!doctype html>\n'
                    + '<html>\n'
                    + '<head>\n'
                    + '  <meta charset="utf-8" />\n'
                    + '  <title>sdfdfM<title>\n'
                    + '</head>\n'
                    + '<body>\n'
                    + '  Hello World.\n'
                    + '</body>\n'
                    + '</html>'
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



/***/ })

},[346])});;