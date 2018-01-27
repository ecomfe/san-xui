define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([9],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san_xui_x_biz_Filter__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san_xui__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Row__ = __webpack_require__(4);
/**
 * @file demos/xui-filter.es6
 * @author leeight
 */







/* eslint-disable */
const template = `<template>
<xui-toastlabel>通过JSON配置，来生成相应的过滤表单组件。当前支持的类型：select, rangecalendar, calendar, plain</xui-toastlabel>

<x-row label="[default]">
    <xui-filter
        controls="{{controls}}"
        on-submit="onFilter1"
        />
    <xui-hljs code="{=formData.f1=}" lang="json" />
</x-row>

<x-row label="title && submit-text">
    <xui-filter
        title="过滤区域"
        submit-text="提交"
        controls="{{controls}}"
        on-submit="onFilter2"
        />
    <xui-hljs code="{=formData.f2=}" lang="json" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_3__Row__["a" /* default */],
        'xui-hljs': __WEBPACK_IMPORTED_MODULE_2_san_xui__["I" /* SyntaxHighlighter */],
        'xui-filter': __WEBPACK_IMPORTED_MODULE_1_san_xui_x_biz_Filter__["a" /* default */],
        'xui-toastlabel': __WEBPACK_IMPORTED_MODULE_2_san_xui__["Q" /* ToastLabel */]
    },
    initData() {
        return {
            formData: {},
            controls: [
                {
                    type: 'select',
                    name: 'theSelect',
                    value: 'foo',
                    // multi: false,
                    // filterCallback: null,
                    filter: true,
                    filterPlaceholder: '输入域名查询，多个搜索项以空格分隔',
                    width: 300,
                    options: [
                        {text: 'FOO', value: 'foo'},
                        {text: 'BAR', value: 'bar'},
                        {text: '123', value: '123'}
                    ]
                },
                {
                    type: 'rangecalendar',
                    name: 'theRangecalendar',
                    value: {
                        begin: new Date(),
                        end: new Date()
                    },
                    width: 500
                },
                {
                    type: 'calendar',
                    name: 'theCalendar',
                    value: new Date(),
                    width: 200,
                    prev: true,
                    next: true,
                    range: {
                        begin: new Date(2014, 4, 1),
                        end: new Date()
                    }
                },
                {
                    type: 'textbox',
                    name: 'theText',
                    value: 'eeeee',
                    width: 200
                },
                {
                    type: 'plain',
                    text: '<a href="https://www.baidu.com" target="_blank">Go to www.baidu.com</a>'
                }
            ]
        };
    },
    onFilter1(formData) {
        this.data.set('formData.f1', JSON.stringify(formData, null, 2));
    },
    onFilter2(formData) {
        this.data.set('formData.f2', JSON.stringify(formData, null, 2));
    }
}));


/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Button__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Select__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_RangeCalendar__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_TextBox__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Calendar__ = __webpack_require__(46);
/**
 * 内容过滤区域，组件包括
 *
 *   ui-select
 *   ui-textbox
 *   ui-rangecalendar
 *   ui-calendar
 *   plain-text
 *
 * @file san-xui/x/biz/Filter.es6
 * @author leeight
 */


// import moment from 'moment';









const cx = Object(__WEBPACK_IMPORTED_MODULE_2__components_util__["f" /* create */])('ui-biz-filter');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <dl s-if="!loading">
        <dt s-if="title">{{title}}</dt>
        <dd>
            <div class="${cx('form', 'form-inline')}">
                <div class="${cx('form-item')}" s-for="item in controls">
                    <label s-if="item.label" class="${cx('label')}">{{item.label}}</label>
                    <ui-select
                        s-if="item.type === 'select'"
                        value="{{formData[item.name]}}"

                        width="{{item.width}}"
                        filter="{{item.filter}}"
                        filter-placeholder="{{item.filterPlaceholder}}"
                        filter-callback="{{item.filterCallback}}"
                        multi="{{item.multi}}"
                        datasource="{{item.options}}"
                        on-change="onItemChanged(item.name, $event)"
                        />

                    <ui-textbox
                        s-if="item.type === 'textbox'"
                        value="{{formData[item.name]}}"
                        width="{{item.width}}"
                        placeholder="{{item.placeholder}}"
                        on-input="onItemChanged(item.name, $event, true)"
                        on-enter="doFilter"
                    />

                    <ui-rangecalendar
                        s-if="item.type === 'rangecalendar'"
                        value="{{formData[item.name]}}"
                        time="{{item.time}}"
                        width="{{item.width}}"
                        range="{{item.range}}"
                        on-change="onItemChanged(item.name, $event)"
                        />

                    <ui-calendar
                        s-if="item.type === 'calendar'"
                        value="{{formData[item.name]}}"

                        width="{{item.width}}"
                        prev="{{item.prev}}"
                        next="{{item.next}}"
                        range="{{item.range}}"
                        on-change="onItemChanged(item.name, $event)"
                        />
                    <div
                        s-if="item.type === 'plain'"
                        class="${cx('form-item-plain')}">{{item.text | raw}}</div>
                </div>
            </div>
            <ui-button on-click="doFilter" skin="primary" s-if="submitText">{{submitText}}</ui-button>
        </dd>
    </dl>
</div>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_san__["defineComponent"])({
    template,
    components: {
        'ui-select': __WEBPACK_IMPORTED_MODULE_4__components_Select__["a" /* default */],
        'ui-calendar': __WEBPACK_IMPORTED_MODULE_7__components_Calendar__["a" /* default */],
        'ui-rangecalendar': __WEBPACK_IMPORTED_MODULE_5__components_RangeCalendar__["a" /* default */],
        'ui-button': __WEBPACK_IMPORTED_MODULE_3__components_Button__["a" /* default */],
        'ui-textbox': __WEBPACK_IMPORTED_MODULE_6__components_TextBox__["a" /* default */]
    },
    dataTypes: {
        title: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,
        loading: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,
        submitText: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,
        controls: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].array,
        formData: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].object
    },
    computed: {
        mainClass() {
            return cx.mainClass(this);
        }
    },
    initData() {
        return {
            title: null,
            loading: true,
            submitText: null,
            formData: null,
            controls: []
        };
    },
    inited() {
        const keyMap = [];
        const formData = this.data.get('formData') || {};
        const controls = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(this.data.get('controls'), (item, index) => {
            let name = item.name;
            if (!name) {
                // 如果没有设置 name，就用默认值，这样子才能恢复 value
                // XXX(leeight) 如果有这种情况，为什么不直接在 $extraPayload 里面设置过滤参数呢？
                keyMap.push({type: 'p', value: index});
                name = `__key_${keyMap.length - 1}`;
            }
            else if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isPlainObject(name)) {
                // 如果设置的是 JSON 格式，转成 string，方便后续使用
                keyMap.push({type: 'j', value: name});
                name = `__key_${keyMap.length - 1}`;
            }

            if (formData[name] == null && item.value != null) {
                formData[name] = item.value;
            }

            return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend({}, item, {name});
        });
        if (keyMap.length) {
            formData.__s_key = keyMap; // eslint-disable-line
        }
        this.data.set('formData', formData);
        this.data.set('controls', controls);
        this.data.set('loading', false);
    },
    attached() {
        const formData = this.data.get('formData');
        if (!__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isEmpty(formData)) {
            // 如果有默认值，就自动过滤一下??
            this.doFilter();
        }
    },
    onItemChanged(name, {value}, preventFilterAction) {
        this.data.set(`formData.${name}`, value);

        const submitText = this.data.get('submitText');
        if (!submitText && !preventFilterAction) {
            // 如果没有提交按钮，且不是输入框input事件，那么就自动过滤
            this.doFilter();
        }
    },
    doFilter() {
        if (!this.lifeCycle.attached) {
            return;
        }

        // 在一个渲染周期内，可能会被触发三次
        // RangeCalendar
        // Calendar
        // attached
        const formData = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.clone(this.data.get('formData'));
        this.fire('submit', formData);
    }
}));


/***/ })

},[431])});;