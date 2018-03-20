define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([43],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 453:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(5);

var _lodash2 = _interopRequireDefault(_lodash);

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

var _Row = __webpack_require__(4);

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
/**
 * @file demos/xui-icon.js
 * @author leeight
 */

var template = '<template>\n<xui-loading s-if="loading" />\n<div s-else>\n    <xui-textbox value="{=keyword=}" placeholder="Find icon by name" />\n    Total count: {{filteredIcons.length}}\n    <br />\n    <x-row label="{{g.name}} ({{g.icons.length}})" s-for="g in groupedIcons">\n        <div class="icons">\n            <div s-for="icon in g.icons" class="tooltipped tooltipped-n" aria-label="{{icon}}">\n                <xui-icon name="{{icon}}" /><br />{{icon}}\n            </div>\n        </div>\n    </x-row>\n</div>\n</template>';
/* eslint-enable */

function getIcons() {
    return fetch('https://cdn.bdstatic.com/iconfont/iconfont.css').then(function (response) {
        return response.text();
    }).then(function (response) {
        // .icon-artec:before
        var pattern = /\.icon\-([^:]+):before/g;
        var icons = [];

        var match = null;
        while (match = pattern.exec(response)) {
            icons.push(match[1]);
        }

        icons.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });

        return icons;
    });
}

function groupIcons(icons) {
    var groups = [];

    var group = null;
    _lodash2.default.each(icons, function (icon) {
        var groupName = icon.substr(0, 1).toUpperCase();
        if (!group || group.name !== groupName) {
            group = {
                name: groupName,
                icons: []
            };
            groups.push(group);
        }
        group.icons.push(icon);
    });

    return groups;
}

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-loading': _sanXui.Loading,
        'xui-textbox': _sanXui.TextBox,
        'xui-icon': _sanXui.Icon
    },
    initData: function initData() {
        return {
            loading: true,
            keyword: '',
            groupedIcons: [],
            icons: []
        };
    },

    computed: {
        groupedIcons: function groupedIcons() {
            return groupIcons(this.data.get('filteredIcons'));
        },
        filteredIcons: function filteredIcons() {
            var keyword = this.data.get('keyword');
            var icons = this.data.get('icons');
            if (!keyword) {
                return icons;
            }
            return _lodash2.default.filter(icons, function (icon) {
                return icon.indexOf(keyword) !== -1;
            });
        }
    },
    attached: function attached() {
        var _this = this;

        getIcons().then(function (icons) {
            _this.data.set('icons', icons);
            _this.data.set('loading', false);
        });
    }
});

/***/ })

},[453])});;