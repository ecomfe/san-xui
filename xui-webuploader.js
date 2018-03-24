define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([4],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 449:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

/* eslint-disable */
/**
 * @file demos/xui-webuploader.js
 * @author leeight
 */

var template = '<template>\n<xui-toastlabel>\n<strong style="color:red">\u8FD9\u4E2A demo \u65E0\u6CD5\u6B63\u5E38\u7684\u5DE5\u4F5C\uFF0C\u56E0\u4E3A\u9700\u8981\u6709\u4E00\u4E2A\u5728\u7EBF\u7684\u670D\u52A1\u63A5\u6536\u4E0A\u4F20\u7684\u8BF7\u6C42\uFF0C\u4F46\u662F\u73B0\u5728\u6CA1\u6709\u8FD9\u4E2A\u670D\u52A1\u3002</strong><br />\n\u9700\u8981\u5728\u9875\u9762\u4E2D\u5F15\u5165 WebUploader \u548C jQuery \u7684\u4EE3\u7801\uFF0C\u6709\u4E24\u79CD\u65B9\u5F0F\uFF1A<pre>\n1. \u624B\u5DE5\u5F15\u5165\n<code>&lt;script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"&gt;&lt;/script&gt;\n&lt;script src="https://cdn.staticfile.org/webuploader/0.1.0/webuploader.js"&gt;&lt;/script&gt;</code>\n\n2. AMD Loader\u81EA\u52A8\u5F15\u5165\n<code>require.config({\n  paths: {\n    \'jquery\': \'https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min\',\n    \'webuploader\': \'https://cdn.bdstatic.com/console/dep/05cfee93/webuploader/WebUploader\',\n    \'webuploader/webuploader\': \'https://cdn.bdstatic.com/console/dep/05cfee93/webuploader/webuploader\'\n  }\n});</code>\n</pre>\n</xui-toastlabel>\n\n<x-row label="initialize error">\n    <xui-webuploader />\n</x-row>\n\n<x-row label="[default]">\n    <xui-webuploader\n        url="/api/null/upload"\n        on-accept="onAccept($event)"\n    />\n</x-row>\n\n<x-row label="hide & show">\n    <xui-button on-click="toggleUploader">{{show ? \'Hide\' : \'Show\'}}</xui-button>\n    <xui-webuploader\n        url="/api/null/upload"\n        on-accept="onAccept($event)"\n        style="{{uploaderStyle}}"\n    />\n</x-row>\n\n<x-row label="jpg,gif,png;auto-start=false;multiple=true;options=...">\n    <xui-webuploader\n        url="/api/null/upload"\n        auto-start="{{false}}"\n        multiple\n        label="\u8BF7\u9009\u62E9\u56FE\u7247"\n        options="{{uploader.options}}"\n    />\n</x-row>\n\n<x-row label="disabled">\n    <xui-switch checked="{=uploader.disabled=}" />\n    <xui-webuploader\n        disabled="{=uploader.disabled=}"\n        url="/api/null/upload"\n    />\n</x-row>\n\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _sanXui.Row,
        'xui-button': _sanXui.Button,
        'xui-switch': _sanXui.Switch,
        'xui-toastlabel': _sanXui.ToastLabel,
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

},[449])});;