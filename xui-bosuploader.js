define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([55],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

var _Row = __webpack_require__(4);

var _Row2 = _interopRequireDefault(_Row);

var _uuid = __webpack_require__(228);

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
/**
 * @file demos/xui-bosuploader.es6
 * @author leeight
 */

var template = '<template>\n<x-row label="initialize error">\n    <xui-bosuploader />\n</x-row>\n\n<x-row label="normal">\n    <xui-bosuploader\n        bos-endpoint="https://bce-bos-uploader.cdn.bcebos.com"\n        uptoken-url="https://cloud.baidu.com/api/authorization" />\n</x-row>\n\n<x-row label="multiple,key-cb,ak,sk,bos-endpoint,on-complete">\n    <xui-bosuploader\n        multiple\n        key-cb="{{keyCb}}"\n        bos-endpoint="https://bce-bos-uploader.bj.bcebos.com"\n        ak="ydFi9KR2YOrvHlmGD3oYKEWW"\n        sk="KGCc1x4KEpSVmXUu1gOfutqMDmxf0Hvn"\n        on-complete="onComplete"\n    >\n        <div slot="preview">\n            <div s-for="f in files">\n                <a s-if="f.url" href="{{f.url}}" target="_blank">{{f.name}}</a>\n                <span s-else>{{f.name}} ({{f.progress}})</span>\n            </div>\n        </div>\n    </xui-bosuploader>\n</x-row>\n\n<x-row label="auto-start=true">\n    <xui-bosuploader\n        auto-start\n        bos-endpoint="https://bce-bos-uploader.cdn.bcebos.com"\n        uptoken-url="https://cloud.baidu.com/api/authorization" />\n</x-row>\n\n<x-row label="disabled">\n    <xui-bosuploader\n        disabled\n        bos-endpoint="https://bce-bos-uploader.cdn.bcebos.com"\n        uptoken-url="https://cloud.baidu.com/api/authorization" />\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-bosuploader': _sanXui.BosUploader
    },
    initData: function initData() {
        return {
            keyCb: function keyCb(file) {
                var uuid = _uuid2.default.generate();
                var extIndex = file.name.lastIndexOf('.');
                if (extIndex === -1) {
                    return uuid;
                }
                var ext = file.name.substr(extIndex);
                return uuid + ext;
            }
        };
    },
    onComplete: function onComplete(_ref) {
        var files = _ref.files;

        _sanXui.Toast.success('上传完毕，文件数量：' + files.length);
    }
});

/***/ })

},[426])});;