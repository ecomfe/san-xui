define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([52],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 396:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

var _uuid = __webpack_require__(212);

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
var template = '<template>\n<xui-toastlabel>\n\u9700\u8981\u5728\u9875\u9762\u4E2D\u5F15\u5165 bce-bos-uploader-lite \u7684\u4EE3\u7801\uFF0C\u6709\u4E24\u79CD\u65B9\u5F0F\uFF1A<pre>\n1. \u624B\u5DE5\u5F15\u5165\n<code>&lt;script src="https://cdn.bdstatic.com/bce-bos-uploader-lite/1.0.5/bce-bos-uploader-lite.min.js"&gt;&lt;/script&gt;</code>\n\n2. AMD Loader\u81EA\u52A8\u5F15\u5165\n<code>require.config({\n  paths: {\n    \'baidubce\': \'https://cdn.bdstatic.com/bce-bos-uploader-lite/1.0.5/bce-bos-uploader-lite.min\'\n  }\n});</code>\n</pre>\n</xui-toastlabel>\n\n<x-row label="initialize error">\n    <xui-bosuploader />\n</x-row>\n\n<x-row label="normal">\n    <xui-bosuploader\n        bos-endpoint="https://bce-bos-uploader.cdn.bcebos.com"\n        uptoken-url="https://cloud.baidu.com/api/authorization" />\n</x-row>\n\n<x-row label="multiple,key-cb,ak,sk,bos-endpoint,on-complete">\n    <xui-bosuploader\n        multiple\n        key-cb="{{keyCb}}"\n        bos-endpoint="https://bce-bos-uploader.bj.bcebos.com"\n        ak="ydFi9KR2YOrvHlmGD3oYKEWW"\n        sk="KGCc1x4KEpSVmXUu1gOfutqMDmxf0Hvn"\n        on-complete="onComplete"\n    >\n        <div slot="preview">\n            <div s-for="f in files">\n                <a s-if="f.url" href="{{f.url}}" target="_blank">{{f.name}}</a>\n                <span s-else>{{f.name}} ({{f.progress}})</span>\n            </div>\n        </div>\n    </xui-bosuploader>\n</x-row>\n\n<x-row label="auto-start=true">\n    <xui-bosuploader\n        auto-start\n        bos-endpoint="https://bce-bos-uploader.cdn.bcebos.com"\n        uptoken-url="https://cloud.baidu.com/api/authorization" />\n</x-row>\n\n<x-row label="disabled">\n    <xui-bosuploader\n        disabled\n        bos-endpoint="https://bce-bos-uploader.cdn.bcebos.com"\n        uptoken-url="https://cloud.baidu.com/api/authorization" />\n</x-row>\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-bosuploader.js
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-toastlabel': _sanXui.ToastLabel,
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

},[396])});;