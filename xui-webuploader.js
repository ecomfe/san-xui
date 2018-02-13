define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([10],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 483:
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
var template = '<template>\n\n<x-row label="initialize error">\n    <xui-webuploader />\n</x-row>\n\n<x-row label="[default]">\n    <xui-webuploader\n        url="/api/null/upload"\n        on-accept="onAccept($event)"\n    />\n</x-row>\n\n<x-row label="hide & show">\n    <xui-button on-click="toggleUploader">{{show ? \'Hide\' : \'Show\'}}</xui-button>\n    <xui-webuploader\n        url="/api/null/upload"\n        on-accept="onAccept($event)"\n        style="{{uploaderStyle}}"\n    />\n</x-row>\n\n<x-row label="jpg,gif,png;auto-start=false;multiple=true;options=...">\n    <xui-webuploader\n        url="/api/null/upload"\n        auto-start="{{false}}"\n        multiple\n        label="\u8BF7\u9009\u62E9\u56FE\u7247"\n        options="{{uploader.options}}"\n    />\n</x-row>\n\n<x-row label="disabled">\n    <xui-switch checked="{=uploader.disabled=}" />\n    <xui-webuploader\n        disabled="{=uploader.disabled=}"\n        url="/api/null/upload"\n    />\n</x-row>\n\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-webuploader.es6
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-button': _sanXui.Button,
        'xui-switch': _sanXui.Switch,
        'xui-webuploader': _sanXui.WebUploader
    },
    computed: {
        uploaderStyle: function uploaderStyle() {
            var show = this.data.get('show');
            var style = {
                display: show ? 'inline-block' : 'none'
            };
            return style;
        }
    },
    initData: function initData() {
        return {
            show: false,
            uploader: {
                disabled: true,
                options: {
                    accept: {
                        title: 'Files',
                        extensions: 'jpg,jpeg,gif,png',
                        mimeTypes: 'image/jpeg,image/gif,image/png'
                    }
                }
            }
        };
    },
    toggleUploader: function toggleUploader() {
        var show = this.data.get('show');
        this.data.set('show', !show);
    },
    onAccept: function onAccept(event) {
        var ret = event.ret;
        if (ret.success) {
            _sanXui.Toast.success('上传成功');
        }
    }
});

/***/ })

},[483])});;