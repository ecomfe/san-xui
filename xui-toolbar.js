define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([2],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui_x_biz_Toolbar__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-toolbar.es6
 * @author leeight
 */







/* eslint-disable */
const template = `<template>
<xui-toastlabel>通过JSON配置，来生成工具栏(Toolbar)区域的组件。当前支持的类型：button, button-group, link, divider</xui-toastlabel>

<x-row label="[default]">
    <xui-toolbar controls="{{controls}}" on-item-clicked="onItemClicked" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_3__Row__["a" /* default */],
        'xui-toolbar': __WEBPACK_IMPORTED_MODULE_1_san_xui_x_biz_Toolbar__["a" /* default */],
        'xui-toastlabel': __WEBPACK_IMPORTED_MODULE_2_san_xui__["Q" /* ToastLabel */]
    },
    initData() {
        return {
            controls: [
                {
                    type: 'button',
                    icon: 'plus',
                    disabled: false,
                    skin: 'primary',
                    label: 'Create'
                },
                {
                    type: 'button-group',
                    disabled: false,
                    datasource: [
                        {text: 'FOO', value: 'FOO'},
                        {text: 'BAR', value: 'BAR'},
                        {text: '123', value: '123'}
                    ]
                },
                {
                    type: 'link',
                    link: 'https://www.baidu.com',
                    label: 'www.baidu.com'
                }
            ]
        };
    },
    onItemClicked(event) {
        __WEBPACK_IMPORTED_MODULE_2_san_xui__["P" /* Toast */].success(JSON.stringify(event));
    }
}));


/***/ }),

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Button__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_RadioSelect__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper__ = __webpack_require__(77);
/**
 * 左侧工具栏的区域，包括 Button, ButtonGroupp, 链接 等等
 * @file san-xui/x/biz/Toolbar.es6
 * @author leeight
 */







/* eslint-disable */
const template = `<template>
<ui-ghost s-for="item in controls">
    <ui-button
        s-if="item.type === 'button'"
        on-click="onToolbarEvent(item)"
        disabled="{{item.disabled}}"
        icon="{{item.icon}}"
        label="{{item.label}}"
        skin="{{item.skin}}"
        />
    <ui-radioselect
        s-if="item.type === 'button-group'"
        value="{{item.value}}"
        disabled="{{item.disabled}}"
        on-change="onToolbarEvent($event)"
        datasource="{{item.datasource}}"
        />
    <a
        s-if="item.type === 'link'"
        target="_blank"
        href="{{item.link}}">{{item.label}}</a>
    <span s-if="item.type === 'divider'">&nbsp;</span>
</ui-ghost>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'ui-ghost': __WEBPACK_IMPORTED_MODULE_3__helper__["a" /* Ghost */],
        'ui-button': __WEBPACK_IMPORTED_MODULE_1__components_Button__["a" /* default */],
        'ui-radioselect': __WEBPACK_IMPORTED_MODULE_2__components_RadioSelect__["a" /* default */]
    },
    dataTypes: {
        controls: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].array
    },
    onToolbarEvent(event) {
        this.fire('item-clicked', event);
    }
}));


/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export asPromise */
/* unused harmony export displayDialog */
/* unused harmony export buildDialog */
/* harmony export (immutable) */ __webpack_exports__["d"] = plain;
/* harmony export (immutable) */ __webpack_exports__["b"] = alert;
/* harmony export (immutable) */ __webpack_exports__["c"] = confirm;
/* unused harmony export waitActionDialog */
/* unused harmony export createPayload */
/* unused harmony export createToolbar */
/* unused harmony export matchAll */
/* unused harmony export valueTransform */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_promise__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_ConfirmDialog__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_AlertDialog__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_PlainDialog__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_asDialog__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__LegacyActionAdapter__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Page__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Ghost__ = __webpack_require__(81);
/**
 * @file san-xui/x/biz/helper.es6
 * @author leeight
 */













const Page = __WEBPACK_IMPORTED_MODULE_8__Page__["a" /* default */];
/* unused harmony export Page */

const Ghost = __WEBPACK_IMPORTED_MODULE_9__Ghost__["a" /* default */];
/* harmony export (immutable) */ __webpack_exports__["a"] = Ghost;


function asPromise(dialog) {
    return new __WEBPACK_IMPORTED_MODULE_2_promise___default.a((resolve, reject) => {
        dialog.on('confirm', () => {
            resolve();
            dialog.dispose();
        });
        dialog.on('close', () => {
            reject();
            dialog.dispose();
        });
    });
}

function displayDialog(DialogComponent, data = {}) {
    if (typeof data === 'string') {
        data = {message: data};
    }
    const dialog = new DialogComponent({data});
    dialog.attach(document.body);
    return asPromise(dialog);
}

function buildDialog(Klass) {
    return Object(__WEBPACK_IMPORTED_MODULE_6__components_asDialog__["a" /* asDialog */])(Klass);
}

function plain(data) {
    return displayDialog(__WEBPACK_IMPORTED_MODULE_5__components_PlainDialog__["a" /* default */], data);
}

function alert(data) {
    return displayDialog(__WEBPACK_IMPORTED_MODULE_4__components_AlertDialog__["a" /* default */], data);
}

function confirm(data) {
    return displayDialog(__WEBPACK_IMPORTED_MODULE_3__components_ConfirmDialog__["a" /* default */], data);
}

function waitActionDialog(dialogOptions, actionOptions) {
    const myOptions = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend({
        open: true,
        width: 'auto',
        height: 'auto',
        title: 'Dialog Title'
    }, dialogOptions);
    myOptions.options = actionOptions;

    const component = new __WEBPACK_IMPORTED_MODULE_7__LegacyActionAdapter__["a" /* default */]({
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
    const requestPayload = fields ? {} : __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend({}, payload);
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(fields, key => {
        if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isArray(key)) {
            const [a, b] = key;
            requestPayload[b] = payload[a];
        }
        else if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isString(key)) {
            requestPayload[key] = payload[key];
        }
    });
    return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(requestPayload, extra);
}

function createToolbar(toolbar) {
    return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(toolbar, item => {
        if (item.type === 'button') {
            const btn = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.clone(item);
            if (btn.primary) {
                btn.skin = 'primary';
            }
            return btn;
        }
        else if (item.type === 'button-group') {
            const btnGroup = {
                type: item.type,
                value: item.$value || item.buttons[0].$value,
                datasource: __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(item.buttons, btn => {
                    const {label, $value} = btn;
                    const props = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.omit(btn, 'label', '$value');
                    return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend({text: label, value: $value}, props);
                })
            };
            return btnGroup;
        }
        return item;
    });
}


function matchAll(compProxy, when) {
    const keys = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.keys(when);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = when[key];
        if (compProxy.data.get(key) !== value) {
            return false;
        }
    }
    return true;
}

function valueTransform(formData) {
    const transformedData = {};
    const keyMap = formData.__s_key || [];
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(formData, (v, k) => {
        if (/^__key_(.*)$/.test(k)) {
            const config = keyMap[+RegExp.$1];
            if (!config) {
                return;
            }
            if (config.type === 'p') {
                // 没有对应的 key，把 v 直接合并到 transformedData 里面去
                __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(transformedData, v);
            }
            else if (config.type === 'j') {
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
                __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(config.value, (name, valueKey) => {
                    const value = v[valueKey];
                    if (value != null) {
                        transformedData[name] = value;
                    }
                });
            }
        }
        else if (k !== '__s_key') {
            transformedData[k] = v;
        }
    });

    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(transformedData, (v, k) => {
        if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isDate(v)) {
            transformedData[k] = __WEBPACK_IMPORTED_MODULE_1_moment___default()(v).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
        }
    });

    return transformedData;
}


/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Dialog__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Button__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Toast__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_ActionLoader__ = __webpack_require__(72);
/**
 * @file san-xui/x/biz/LegacyActionAdapter.es6
 * @author leeight
 */








/* eslint-disable */
const template = `<template>
    <ui-dialog
        s-if="dialog"
        s-ref="dialog"
        open="{=actionOptions.open=}"
        height="{{actionOptions.height}}"
        width="{{actionOptions.width}}"
        foot="{{foot}}"
        on-close="onCloseDialog">
        <span slot="head">{{actionOptions.title}}</span>
        <ui-actionloader
            on-actionloaded="onActionLoaded($event)"
            url="{{actionOptions.url}}"
            module="{{actionOptions.module}}"
            options="{{actionOptions.options}}" />
        <div slot="foot" s-if="foot">
            <ui-button on-click="onConfirmDialog" skin="primary" disabled="{{confirm.disabled}}">{{confirm.label}}</ui-button>
            <ui-button on-click="onCloseDialog">取消</ui-button>
        </div>
    </ui-dialog>
    <ui-actionloader
        s-else
        on-actionloaded="onActionLoaded($event)"
        url="{{actionOptions.url}}"
        options="{{actionOptions.options}}"
        module="{{actionOptions.module}}" />
</template>`;
/* eslint-enable */

function isSanPage(erAction) {
    return !!(erAction && erAction.page && erAction.SanPage);
}

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'ui-actionloader': __WEBPACK_IMPORTED_MODULE_4__components_ActionLoader__["a" /* default */],
        'ui-button': __WEBPACK_IMPORTED_MODULE_2__components_Button__["a" /* default */],
        'ui-dialog': __WEBPACK_IMPORTED_MODULE_1__components_Dialog__["a" /* default */]
    },
    dataTypes: {
        dialog: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,
        foot: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,
        confirm: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].objectOf({
            label: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,
            disabled: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool
        }),
        actionOptions: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].objectOf({
            open: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,
            width: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number,
            height: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number,
            title: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,
            url: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,
            module: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,
            options: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].objectOf({
                parentAction: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].object
            })
        })
    },
    initData() {
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
    inited() {
        this.erAction = null;
    },
    closeDialog() {
        this.data.set('actionOptions.open', false);
    },

    onActionLoaded(e) {
        const erAction = e.action;
        const compInstance = isSanPage(erAction) ? erAction.page.children[0] : erAction;
        compInstance.on('legacyactioncustomevent', e => {
            const type = e.legacyActionFireCustomType;
            // 用owner判断是动态还是声明式 1.声明式的fire事件 通过on- 2.动态调用使用dispatch ，通过messages来处理
            erAction.owner ? this.fire(type, e.value) : this.dispatch(type, e.value);
        });
        this.erAction = erAction;
        // action加载完成调整dialog位置
        if (this.data.get('dialog')) {
            this.ref('dialog').__resize();
        }
    },
    onConfirmDialog() {
        const erAction = this.erAction;
        const isSan = isSanPage(erAction);
        const compInstance = isSan ? erAction.page.children[0] : erAction;

        if (compInstance && typeof compInstance.doSubmit === 'function') {
            this.data.set('confirm.label', '处理中...');
            this.data.set('confirm.disabled', true);
            return compInstance.doSubmit()
                .then(() => {
                    this.data.set('confirm.label', '确定');
                    this.data.set('confirm.disabled', false);
                    this.closeDialog();
                })
                .then(null, (error = {}) => {
                    // san
                    // 1. doSubmit 不一定有专门写catch来弹窗给用户错误信息，此处兜底。
                    if (isSan && error.global) {
                        __WEBPACK_IMPORTED_MODULE_3__components_Toast__["a" /* default */].error(error.global);
                    }

                    // er
                    // 1. 如果发送请求前校验失败 因为er中对每个输入组件已有相应的提示，所以不必再弹出Toast.error
                    // 2. 如果触发了返回的数据中的错误信息触发了serverIO的弹框， 此时再弹出Toast.error已经冗余
                    // 3. 如果后端返回message.field 指定了错误字段，因为错误都在此处处理，故执行view.notifyErrors
                    if (!isSan && error.field) {
                        compInstance.view && compInstance.view.notifyErrors && compInstance.view.notifyErrors(error.field);
                    }

                    this.data.set('confirm.label', '确定');
                    this.data.set('confirm.disabled', false);
                });
        }
        this.closeDialog();
    },
    onCloseDialog() {
        this.closeDialog();
        this.fire('close');
    }
}));


/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Breadcrumbs__ = __webpack_require__(80);
/**
 * @file san-xui/x/biz/Page.es6
 * @author leeight
 */






const cx = Object(__WEBPACK_IMPORTED_MODULE_1__components_util__["f" /* create */])('list-page');

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({      // eslint-disable-line
    template: `<div class="{{mainClass}}">
        <breadcrumbs s-if="breadcrumbs" items="{{breadcrumbs}}" />

        <div class="${cx('body')}">
            <div class="${cx('title')}" s-if="title || navs">
                <h2 s-if="title">{{title}}<span s-if="remark">{{remark}}</span></h2>
                <div class="ui-tab ui-tab-x" s-elif="navs">
                    <ul class="ui-tab-navigator">
                        <li
                            s-for="item in navs"
                            class="{{item.active ? 'ui-tab-item ui-tab-item-active' : 'ui-tab-item'}}"
                        >
                            <a href="{{item.link}}" s-if="item.link">{{item.text}}</a>
                            <span s-else>{{item.text}}</span>
                        </li>
                    </ul>
                </div>
                <slot name="helps" />
            </div>
            <div class="${cx('content')}">
                <div class="${cx('tip')}" s-if="withTip">
                    <slot name="tip" />
                </div>

                <slot name="filter" />

                <div class="${cx('toolbar')}" s-if="withToolbar">
                    <div class="${cx('tb-left')}">
                        <slot name="tb-left" />
                        <slot name="tb-filter" />
                    </div>
                    <div class="${cx('tb-right')}">
                        <slot name="tb-right" />
                    </div>
                </div>
                <slot/>
            </div>
        </div>
    </div>`,
    components: {
        breadcrumbs: __WEBPACK_IMPORTED_MODULE_2__Breadcrumbs__["a" /* default */]
    },
    initData() {
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
        mainClass() {
            const klass = [cx()];
            const withSidebar = this.data.get('withSidebar');
            if (withSidebar) {
                klass.push(cx('with-sidebar'));
            }

            return klass;
        }
    },
    hasSlot(name) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__components_util__["g" /* hasSlot */])(this, name);
    },
    attached() {
        const withToolbar = this.hasSlot('tb-left') || this.hasSlot('tb-right') || this.hasSlot('tb-filter');
        this.data.set('withToolbar', withToolbar);
    }
}));


/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_util__ = __webpack_require__(2);
/**
 * @file san-xui/x/biz/Breadcrumbs.es6
 * @author leeight
 */





const cx = Object(__WEBPACK_IMPORTED_MODULE_1__components_util__["f" /* create */])('ui-breadcrumbs');

/* eslint-disable */
const template = `<div class="${cx()}">
    <div class="${cx('item')}" san-for="item, index in items">
        <span class="${cx('divider')}" san-if="index > 0">/</span>
        <a href="{{item.href}}" s-if="item.href">{{item.text}}</a>
        <span s-else class="${cx('label')}">{{item.text}}</span>
    </div>
</div>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    initData() {
        return {
            items: []
        };
    }
}));


/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/**
 * @file biz/Ghost.es6
 * @author leeight
 */



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template: '<template><slot/></template>'
}));


/***/ })

},[480])});;