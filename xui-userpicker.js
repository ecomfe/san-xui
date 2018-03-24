define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([7],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 446:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/**
 * @file demos/xui-userpicker.js
 * @author leeight
 */

function searchRequester(keyword) {
    return fetch('https://randomuser.me/api/?results=5').then(function (response) {
        return response.json();
    }).then(function (response) {
        var results = response.results;
        return results.map(function (o) {
            // 必须要有 accountId 和 username 两个属性
            o.accountId = o.email;
            o.username = o.name.first + ' ' + o.name.last;
            return o;
        });
    });
}

/* eslint-disable */
var template = '<template>\n<x-row label="[default]">\n    \u8BF7\u8F93\u5165\u7528\u6237\u540D\uFF1A\n    <xui-userpicker\n        search-requester="{{searchRequester}}"\n    >\n        <div slot="layer-item">\n            <img width="30" height="30" src="{{item.picture.thumbnail}}" />\n            <span>{{item.name.title}} {{item.username}}</span>\n        </div>\n    </xui-userpicker>\n</x-row>\n<x-row label="initialized by value">\n    <xui-userpicker\n        search-requester="{{searchRequester}}"\n        value="{=value=}"\n    >\n        <div slot="layer-item">\n            <img width="30" height="30" src="{{item.picture.thumbnail}}" />\n            <span>{{item.name.title}} {{item.username}}</span>\n        </div>\n    </xui-userpicker>\n    <pre><code>{{value | stringify}}</code></pre>\n</x-row>\n<x-row label="preview">\n    <xui-userpicker preview value="{=value=}" />\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-userpicker': _sanXui.UserPicker
    },
    filters: {
        stringify: function stringify(value) {
            return JSON.stringify(value, null, 2);
        }
    },
    initData: function initData() {
        return {
            value: [{ username: '李玉北', accountId: 'liyubei' }],
            searchRequester: searchRequester
        };
    }
});

/***/ })

},[446])});;