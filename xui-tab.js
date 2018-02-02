define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([21],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 468:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

var _Row = __webpack_require__(4);

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
var template = '<template>\n<x-row label="[default]">\n<xui-tab>\n    <xui-tab-panel title="\u56FE\u7247\u5904\u7406">\n        <xui-button>\u56FE\u7247\u5904\u7406</xui-button>\n    </xui-tab-panel>\n    <xui-tab-panel title="\u56FE\u50CF\u5BA1\u6838">\n        <xui-button>\u56FE\u50CF\u5BA1\u6838</xui-button>\n    </xui-tab-panel>\n    <xui-tab-panel title="\u97F3\u89C6\u9891\u5904\u7406">\n        <xui-button>\u97F3\u89C6\u9891\u5904\u7406</xui-button>\n    </xui-tab-panel>\n    <xui-tab-panel title="Android\u6279\u91CF\u6253\u5305">\n        <xui-monthview />\n    </xui-tab-panel>\n</xui-tab>\n</x-row>\n\n<x-row label="[skin=card]">\n<xui-tab skin="card">\n    <xui-tab-panel title="\u56FE\u7247\u5904\u7406">\n        <xui-button>\u56FE\u7247\u5904\u7406</xui-button>\n    </xui-tab-panel>\n    <xui-tab-panel title="\u56FE\u50CF\u5BA1\u6838">\n        <xui-button>\u56FE\u50CF\u5BA1\u6838</xui-button>\n    </xui-tab-panel>\n    <xui-tab-panel title="\u97F3\u89C6\u9891\u5904\u7406">\n        <xui-button>\u97F3\u89C6\u9891\u5904\u7406</xui-button>\n    </xui-tab-panel>\n    <xui-tab-panel title="Android\u6279\u91CF\u6253\u5305">\n        <xui-monthview />\n    </xui-tab-panel>\n</xui-tab>\n</x-row>\n\n<x-row label="[skin=sub]">\n<xui-tab skin="sub">\n    <xui-tab-panel title="\u56FE\u7247\u5904\u7406">\n        <xui-button>\u56FE\u7247\u5904\u7406</xui-button>\n    </xui-tab-panel>\n    <xui-tab-panel title="\u56FE\u50CF\u5BA1\u6838">\n        <xui-button>\u56FE\u50CF\u5BA1\u6838</xui-button>\n    </xui-tab-panel>\n    <xui-tab-panel title="\u97F3\u89C6\u9891\u5904\u7406">\n        <xui-button>\u97F3\u89C6\u9891\u5904\u7406</xui-button>\n    </xui-tab-panel>\n    <xui-tab-panel title="Android\u6279\u91CF\u6253\u5305">\n        <xui-monthview />\n    </xui-tab-panel>\n</xui-tab>\n</x-row>\n\n<x-row label="dynamic tabs">\n<xui-button on-click="toggleTab" skin="primary">Toggle Tab</xui-button>\n<br/>\n<br/>\n<xui-tab s-ref="tab">\n    <xui-tab-panel title="\u56FE\u7247\u5904\u7406">\n        <xui-button>\u56FE\u7247\u5904\u7406</xui-button>\n    </xui-tab-panel>\n    <xui-tab-panel title="\u56FE\u50CF\u5BA1\u6838">\n        <xui-button>\u56FE\u50CF\u5BA1\u6838</xui-button>\n    </xui-tab-panel>\n    <xui-tab-panel title="\u97F3\u89C6\u9891\u5904\u7406" s-if="show">\n        <xui-button>\u97F3\u89C6\u9891\u5904\u7406</xui-button>\n    </xui-tab-panel>\n    <xui-tab-panel title="Android\u6279\u91CF\u6253\u5305">\n        <xui-monthview />\n    </xui-tab-panel>\n</xui-tab>\n</x-row>\n\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-tab.es6
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-button': _sanXui.Button,
        'xui-monthview': _sanXui.MonthView,
        'xui-tab': _sanXui.Tab,
        'xui-tab-panel': _sanXui.TabPanel
    },
    initData: function initData() {
        return {
            show: false
        };
    },
    toggleTab: function toggleTab() {
        var _this = this;

        var show = this.data.get('show');
        this.data.set('show', !show);
        (0, _san.nextTick)(function () {
            var tab = _this.ref('tab');
            if (tab) {
                // XXX(leeight) 临时解决方案
                tab.refreshTabs();
            }
        });
    }
});

/***/ })

},[468])});;