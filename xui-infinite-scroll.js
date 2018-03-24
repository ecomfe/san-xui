define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([37],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 416:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file xui-infinite-scroll.js
 * @author xuli07
 */

var template = '<template>\n    <xui-infinite-scroll on-more="loadMore" loading="{{loading}}" distance="150" finished="{{finished}}">\n        <div s-for="i in list">{{i}}</div>\n    </xui-infinite-scroll>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'xui-infinite-scroll': _sanXui.InfiniteScroll
    },
    initData: function initData() {
        return {
            start: 0,
            loading: false,
            finished: false,
            list: Array(30).fill(1).map(function (k, i) {
                return i;
            })
        };
    },
    loadMore: function loadMore() {
        var _this = this;

        this.data.set('loading', true);
        setTimeout(function () {
            if (_this.data.get('start') < 100) {
                _this.data.set('start', _this.data.get('start') + 30);
                _this.data.set('list', _this.data.get('list').concat(Array(30).fill(1).map(function (k, i) {
                    return _this.data.get('start') + i;
                })));
                _this.data.set('loading', false);
            } else {
                _this.data.set('finished', true);
            }
        }, 1000);
    }
});

/***/ })

},[416])});;