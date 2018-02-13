define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([2],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 436:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

var _helper = __webpack_require__(76);

var _Row = __webpack_require__(4);

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
/**
 * @file demos/xui-dialog.es6
 * @author leeight
 */

var template = '<template>\n<x-row label="[default]">\n<xui-button skin="primary" on-click="onShowDialog">Show Dialog</xui-button>\n\n<xui-dialog open="{=dialog.showDialog=}">\n    <xui-tip><xui-button>Button In Tip</xui-button></xui-tip>\n    <xui-button on-click="closeTheDialog">\u5173\u95ED.</xui-button>\n    <xui-button on-click="openNewDialog">\u6253\u5F00\u4E00\u4E2A\u65B0\u7684Dialog.</xui-button>\n    <xui-button on-click="showToast">show toast.</xui-button>\n    <xui-select datasource="{{select.datasource}}" value="{=select.value=}" />\n</xui-dialog>\n\n<xui-dialog open="{=dialog.showDialog2=}" width="300" foot="{{false}}">\n    <xui-button on-click="closeTheDialog">\u5173\u95ED\u4E0A\u4E00\u4E2ADialog</xui-button>\n</xui-dialog>\n</x-row>\n\n<x-row label="alert,confirm,plain">\n    <xui-button on-click="showAlertDialog">alert</xui-button>\n    <xui-button on-click="showConfirmDialog">confirm</xui-button>\n    <xui-button on-click="showPlainDialog">plain</xui-button>\n</x-row>\n\n<x-row label="AlertDialog">\n    <xui-alert-dialog open="{=alertDialogOpened=}" message="Hello Alert Dialog" />\n    <xui-button on-click="showAlertDialog2">AlertDialog Component</xui-button>\n</x-row>\n\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-tip': _sanXui.Tip,
        'xui-select': _sanXui.Select,
        'xui-dialog': _sanXui.Dialog,
        'xui-alert-dialog': _sanXui.AlertDialog,
        'xui-button': _sanXui.Button
    },
    initData: function initData() {
        return {
            alertDialogOpened: false,
            select: {
                value: 'abc7',
                multi: {
                    value: ['foo', 'bar', 'abc1', 'abc2']
                },
                datasource: [{ text: 'foo', value: 'foo' }, { text: 'bar', value: 'bar' }, { text: '123', value: '123', disabled: true }, { text: 'abc1', value: 'abc1' }, { text: 'abc2', value: 'abc2' }, { text: 'abc3', value: 'abc3' }, { text: 'abc4', value: 'abc4' }, { text: 'abc5', value: 'abc5' }, { text: 'abc6', value: 'abc6' }, { text: 'abc7', value: 'abc7' }, { text: 'abc8', value: 'abc8' }, { text: 'abc9', value: 'abc9' }, { text: 'abc0', value: 'abc0' }]
            }
        };
    },
    onShowDialog: function onShowDialog() {
        this.data.set('dialog.showDialog', true);
    },
    openNewDialog: function openNewDialog() {
        this.data.set('dialog.showDialog2', true);
    },
    closeTheDialog: function closeTheDialog() {
        this.data.set('dialog.showDialog', false);
    },
    showAlertDialog2: function showAlertDialog2() {
        this.data.set('alertDialogOpened', true);
    },
    showAlertDialog: function showAlertDialog() {
        (0, _helper.alert)({ message: 'Alert dialog (w=500)' }).then(function () {
            return _sanXui.Toast.success('OK');
        });
    },
    showConfirmDialog: function showConfirmDialog() {
        (0, _helper.confirm)({ message: 'Confirm dialog (w=400)', width: 400 }).then(function () {
            return _sanXui.Toast.success('OK');
        }).catch(function () {
            return _sanXui.Toast.warning('Canceled');
        });
    },
    showPlainDialog: function showPlainDialog() {
        (0, _helper.plain)({ message: 'Plain dialog (w=500)' }).then(function () {
            return _sanXui.Toast.success('OK');
        });
    },
    showToast: function showToast() {
        _sanXui.Toast.success('ok');
    }
});

/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Ghost = exports.Page = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @file san-xui/x/biz/helper.es6
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @author leeight
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

exports.asPromise = asPromise;
exports.displayDialog = displayDialog;
exports.buildDialog = buildDialog;
exports.plain = plain;
exports.alert = alert;
exports.confirm = confirm;
exports.waitActionDialog = waitActionDialog;
exports.createPayload = createPayload;
exports.createToolbar = createToolbar;
exports.matchAll = matchAll;
exports.valueTransform = valueTransform;

var _lodash = __webpack_require__(5);

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = __webpack_require__(1);

var _moment2 = _interopRequireDefault(_moment);

var _promise = __webpack_require__(9);

var _promise2 = _interopRequireDefault(_promise);

var _ConfirmDialog = __webpack_require__(50);

var _ConfirmDialog2 = _interopRequireDefault(_ConfirmDialog);

var _AlertDialog = __webpack_require__(47);

var _AlertDialog2 = _interopRequireDefault(_AlertDialog);

var _PlainDialog = __webpack_require__(52);

var _PlainDialog2 = _interopRequireDefault(_PlainDialog);

var _asDialog = __webpack_require__(75);

var _LegacyActionAdapter = __webpack_require__(77);

var _LegacyActionAdapter2 = _interopRequireDefault(_LegacyActionAdapter);

var _Page2 = __webpack_require__(78);

var _Page3 = _interopRequireDefault(_Page2);

var _Ghost2 = __webpack_require__(80);

var _Ghost3 = _interopRequireDefault(_Ghost2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = exports.Page = _Page3.default;
var Ghost = exports.Ghost = _Ghost3.default;

function asPromise(dialog) {
    return new _promise2.default(function (resolve, reject) {
        dialog.on('confirm', function () {
            resolve();
            dialog.dispose();
        });
        dialog.on('close', function () {
            reject();
            dialog.dispose();
        });
    });
}

function displayDialog(DialogComponent) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (typeof data === 'string') {
        data = { message: data };
    }
    var dialog = new DialogComponent({ data: data });
    dialog.attach(document.body);
    return asPromise(dialog);
}

function buildDialog(Klass) {
    return (0, _asDialog.asDialog)(Klass);
}

function plain(data) {
    return displayDialog(_PlainDialog2.default, data);
}

function alert(data) {
    return displayDialog(_AlertDialog2.default, data);
}

function confirm(data) {
    return displayDialog(_ConfirmDialog2.default, data);
}

function waitActionDialog(dialogOptions, actionOptions) {
    var myOptions = _lodash2.default.extend({
        open: true,
        width: 'auto',
        height: 'auto',
        title: 'Dialog Title'
    }, dialogOptions);
    myOptions.options = actionOptions;

    var component = new _LegacyActionAdapter2.default({
        data: {
            dialog: true,
            actionOptions: myOptions
        }
    });
    component.attach(document.body);
    return component;
}

function createPayload(payload, fields, extra) {
    // fields: ['a', 'b', 'c'] -> u.pick(payload, fields);
    // fields: ['a', ['id', 'userId'], 'c'] ->
    var requestPayload = fields ? {} : _lodash2.default.extend({}, payload);
    _lodash2.default.each(fields, function (key) {
        if (_lodash2.default.isArray(key)) {
            var _key = _slicedToArray(key, 2),
                a = _key[0],
                b = _key[1];

            requestPayload[b] = payload[a];
        } else if (_lodash2.default.isString(key)) {
            requestPayload[key] = payload[key];
        }
    });
    return _lodash2.default.extend(requestPayload, extra);
}

function createToolbar(toolbar) {
    return _lodash2.default.map(toolbar, function (item) {
        if (item.type === 'button') {
            var btn = _lodash2.default.clone(item);
            if (btn.primary) {
                btn.skin = 'primary';
            }
            return btn;
        } else if (item.type === 'button-group') {
            var btnGroup = {
                type: item.type,
                value: item.$value || item.buttons[0].$value,
                datasource: _lodash2.default.map(item.buttons, function (btn) {
                    var label = btn.label,
                        $value = btn.$value;

                    var props = _lodash2.default.omit(btn, 'label', '$value');
                    return _lodash2.default.extend({ text: label, value: $value }, props);
                })
            };
            return btnGroup;
        }
        return item;
    });
}

function matchAll(compProxy, when) {
    var keys = _lodash2.default.keys(when);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = when[key];
        if (compProxy.data.get(key) !== value) {
            return false;
        }
    }
    return true;
}

function valueTransform(formData) {
    var transformedData = {};
    var keyMap = formData.__s_key || [];
    _lodash2.default.each(formData, function (v, k) {
        if (/^__key_(.*)$/.test(k)) {
            var config = keyMap[+RegExp.$1];
            if (!config) {
                return;
            }
            if (config.type === 'p') {
                // 没有对应的 key，把 v 直接合并到 transformedData 里面去
                _lodash2.default.extend(transformedData, v);
            } else if (config.type === 'j') {
                // 对应的 key 是 JSON，重新处理恢复一下
                //
                // 针对 type: rangecalendar 的特殊情况
                // name: {
                //   begin: 'beginTime',
                //   end: 'endTime'
                // },
                // value: {
                //   begin: ...,
                //   end: ...
                // }
                _lodash2.default.each(config.value, function (name, valueKey) {
                    var value = v[valueKey];
                    if (value != null) {
                        transformedData[name] = value;
                    }
                });
            }
        } else if (k !== '__s_key') {
            transformedData[k] = v;
        }
    });

    _lodash2.default.each(transformedData, function (v, k) {
        if (_lodash2.default.isDate(v)) {
            transformedData[k] = (0, _moment2.default)(v).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
        }
    });

    return transformedData;
}

/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _Dialog = __webpack_require__(19);

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Button = __webpack_require__(6);

var _Button2 = _interopRequireDefault(_Button);

var _Toast = __webpack_require__(56);

var _Toast2 = _interopRequireDefault(_Toast);

var _ActionLoader = __webpack_require__(72);

var _ActionLoader2 = _interopRequireDefault(_ActionLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
var template = '<template>\n    <ui-dialog\n        s-if="dialog"\n        s-ref="dialog"\n        open="{=actionOptions.open=}"\n        height="{{actionOptions.height}}"\n        width="{{actionOptions.width}}"\n        foot="{{foot}}"\n        on-close="onCloseDialog">\n        <span slot="head">{{actionOptions.title}}</span>\n        <ui-actionloader\n            on-actionloaded="onActionLoaded($event)"\n            url="{{actionOptions.url}}"\n            module="{{actionOptions.module}}"\n            options="{{actionOptions.options}}" />\n        <div slot="foot" s-if="foot">\n            <ui-button on-click="onConfirmDialog" skin="primary" disabled="{{confirm.disabled}}">{{confirm.label}}</ui-button>\n            <ui-button on-click="onCloseDialog">\u53D6\u6D88</ui-button>\n        </div>\n    </ui-dialog>\n    <ui-actionloader\n        s-else\n        on-actionloaded="onActionLoaded($event)"\n        url="{{actionOptions.url}}"\n        options="{{actionOptions.options}}"\n        module="{{actionOptions.module}}" />\n</template>';
/* eslint-enable */

/**
 * @file san-xui/x/biz/LegacyActionAdapter.es6
 * @author leeight
 */

function isSanPage(erAction) {
    return !!(erAction && erAction.page && erAction.SanPage);
}

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'ui-actionloader': _ActionLoader2.default,
        'ui-button': _Button2.default,
        'ui-dialog': _Dialog2.default
    },
    dataTypes: {
        dialog: _san.DataTypes.bool,
        foot: _san.DataTypes.bool,
        confirm: _san.DataTypes.objectOf({
            label: _san.DataTypes.string,
            disabled: _san.DataTypes.bool
        }),
        actionOptions: _san.DataTypes.objectOf({
            open: _san.DataTypes.bool,
            width: _san.DataTypes.number,
            height: _san.DataTypes.number,
            title: _san.DataTypes.string,
            url: _san.DataTypes.string,
            module: _san.DataTypes.string,
            options: _san.DataTypes.objectOf({
                parentAction: _san.DataTypes.object
            })
        })
    },
    initData: function initData() {
        return {
            dialog: false,
            foot: true,
            confirm: {
                label: '确定',
                disabled: false
            },
            actionOptions: {
                open: false
            }
        };
    },
    inited: function inited() {
        this.erAction = null;
    },
    closeDialog: function closeDialog() {
        this.data.set('actionOptions.open', false);
    },
    onActionLoaded: function onActionLoaded(e) {
        var _this = this;

        var erAction = e.action;
        var compInstance = isSanPage(erAction) ? erAction.page.children[0] : erAction;
        compInstance.on('legacyactioncustomevent', function (e) {
            var type = e.legacyActionFireCustomType;
            // 用owner判断是动态还是声明式 1.声明式的fire事件 通过on- 2.动态调用使用dispatch ，通过messages来处理
            erAction.owner ? _this.fire(type, e.value) : _this.dispatch(type, e.value);
        });
        this.erAction = erAction;
        // action加载完成调整dialog位置
        if (this.data.get('dialog')) {
            this.ref('dialog').__resize();
        }
        this.fire('actionloaded', e);
    },
    onConfirmDialog: function onConfirmDialog(e) {
        var _this2 = this;

        this.fire('beforeok', { action: this.erAction, e: e });
        // TODO 判断默认事件是否被阻止 (ER的isDefaultPrevented)
        if (e.defaultPrevented) {
            return;
        }
        var erAction = this.erAction;
        var isSan = isSanPage(erAction);
        var compInstance = isSan ? erAction.page.children[0] : erAction;
        if (compInstance && typeof compInstance.doSubmit === 'function') {
            this.data.set('confirm.label', '处理中...');
            this.data.set('confirm.disabled', true);
            return compInstance.doSubmit().then(function () {
                _this2.data.set('confirm.label', '确定');
                _this2.data.set('confirm.disabled', false);
                _this2.closeDialog();
                _this2.fire('ok');
            }).then(null, function () {
                var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                // san
                // 1. doSubmit 不一定有专门写catch来弹窗给用户错误信息，此处兜底。
                if (isSan && error.global) {
                    _Toast2.default.error(error.global);
                }
                // er
                // 1. 如果发送请求前校验失败 因为er中对每个输入组件已有相应的提示，所以不必再弹出Toast.error
                // 2. 如果触发了返回的数据中的错误信息触发了serverIO的弹框， 此时再弹出Toast.error已经冗余
                // 3. 如果后端返回message.field 指定了错误字段，因为错误都在此处处理，故执行view.notifyErrors
                if (!isSan && error.field) {
                    compInstance.view && compInstance.view.notifyErrors && compInstance.view.notifyErrors(error.field);
                }

                _this2.data.set('confirm.label', '确定');
                _this2.data.set('confirm.disabled', false);
            });
        }
        this.closeDialog();
        this.fire('ok');
    },
    onCloseDialog: function onCloseDialog() {
        this.fire('beforeclose', { action: this.erAction });
        this.closeDialog();
        this.fire('close');
    }
});

/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _util = __webpack_require__(2);

var _Breadcrumbs = __webpack_require__(79);

var _Breadcrumbs2 = _interopRequireDefault(_Breadcrumbs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cx = (0, _util.create)('list-page'); /**
                                          * @file san-xui/x/biz/Page.es6
                                          * @author leeight
                                          */

exports.default = (0, _san.defineComponent)({ // eslint-disable-line
    template: '<div class="{{mainClass}}">\n        <breadcrumbs s-if="breadcrumbs" items="{{breadcrumbs}}" />\n\n        <div class="' + cx('body') + '">\n            <div class="' + cx('title') + '" s-if="title || navs">\n                <h2 s-if="title">{{title}}<span s-if="remark">{{remark | raw}}</span></h2>\n                <div class="ui-tab ui-tab-x" s-elif="navs">\n                    <ul class="ui-tab-navigator">\n                        <li\n                            s-for="item in navs"\n                            class="{{item.active ? \'ui-tab-item ui-tab-item-active\' : \'ui-tab-item\'}}"\n                        >\n                            <a href="{{item.link}}" s-if="item.link">{{item.text}}</a>\n                            <span s-else>{{item.text}}</span>\n                        </li>\n                    </ul>\n                </div>\n                <slot name="helps" />\n            </div>\n            <div class="' + cx('content') + '">\n                <div class="' + cx('tip') + '" s-if="withTip">\n                    <slot name="tip" />\n                </div>\n\n                <slot name="filter" />\n\n                <div class="' + cx('toolbar') + '" s-if="withToolbar">\n                    <div class="' + cx('tb-left') + '">\n                        <slot name="tb-left" />\n                        <slot name="tb-filter" />\n                    </div>\n                    <div class="' + cx('tb-right') + '">\n                        <slot name="tb-right" />\n                    </div>\n                </div>\n                <slot/>\n            </div>\n        </div>\n    </div>',
    components: {
        breadcrumbs: _Breadcrumbs2.default
    },
    initData: function initData() {
        return {
            withSidebar: false,
            withTip: false,
            withToolbar: true,
            title: null,
            navs: null,
            remark: null,
            breadcrumbs: null
        };
    },

    computed: {
        mainClass: function mainClass() {
            var klass = [cx()];
            var withSidebar = this.data.get('withSidebar');
            if (withSidebar) {
                klass.push(cx('with-sidebar'));
            }

            return klass;
        }
    },
    hasSlot: function hasSlot(name) {
        return (0, _util.hasSlot)(this, name);
    },
    attached: function attached() {
        var withToolbar = this.hasSlot('tb-left') || this.hasSlot('tb-right') || this.hasSlot('tb-filter');
        this.data.set('withToolbar', withToolbar);
    }
});

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _util = __webpack_require__(2);

/**
 * @file san-xui/x/biz/Breadcrumbs.es6
 * @author leeight
 */

var cx = (0, _util.create)('ui-breadcrumbs');

/* eslint-disable */
var template = '<div class="' + cx() + '">\n    <div class="' + cx('item') + '" san-for="item, index in items">\n        <span class="' + cx('divider') + '" san-if="index > 0">/</span>\n        <a href="{{item.href}}" s-if="item.href">{{item.text}}</a>\n        <span s-else class="' + cx('label') + '">{{item.text}}</span>\n    </div>\n</div>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    initData: function initData() {
        return {
            items: []
        };
    }
});

/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _san = __webpack_require__(0);

exports.default = (0, _san.defineComponent)({
  template: '<template><slot/></template>'
}); /**
     * @file biz/Ghost.es6
     * @author leeight
     */

/***/ })

},[436])});;