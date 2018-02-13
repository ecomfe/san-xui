define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([9],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 438:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _san = __webpack_require__(0);

var _Filter = __webpack_require__(439);

var _Filter2 = _interopRequireDefault(_Filter);

var _sanXui = __webpack_require__(3);

var _Row = __webpack_require__(4);

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
/**
 * @file demos/xui-filter.es6
 * @author leeight
 */

var template = '<template>\n<xui-toastlabel>\u901A\u8FC7JSON\u914D\u7F6E\uFF0C\u6765\u751F\u6210\u76F8\u5E94\u7684\u8FC7\u6EE4\u8868\u5355\u7EC4\u4EF6\u3002\u5F53\u524D\u652F\u6301\u7684\u7C7B\u578B\uFF1Aselect, rangecalendar, calendar, plain</xui-toastlabel>\n\n<x-row label="[default]">\n    <xui-filter\n        controls="{{controls}}"\n        on-submit="onFilter1"\n        />\n    <xui-hljs code="{=formData.f1=}" lang="json" />\n</x-row>\n\n<x-row label="title && submit-text">\n    <xui-filter\n        title="\u8FC7\u6EE4\u533A\u57DF"\n        submit-text="\u63D0\u4EA4"\n        controls="{{controls}}"\n        on-submit="onFilter2"\n        />\n    <xui-hljs code="{=formData.f2=}" lang="json" />\n</x-row>\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-hljs': _sanXui.SyntaxHighlighter,
        'xui-filter': _Filter2.default,
        'xui-toastlabel': _sanXui.ToastLabel
    },
    initData: function initData() {
        return {
            formData: {},
            controls: [{
                type: 'select',
                name: 'theSelect',
                value: 'foo',
                // multi: false,
                // filterCallback: null,
                filter: true,
                filterPlaceholder: '输入域名查询，多个搜索项以空格分隔',
                width: 300,
                options: [{ text: 'FOO', value: 'foo' }, { text: 'BAR', value: 'bar' }, { text: '123', value: '123' }]
            }, {
                type: 'rangecalendar',
                name: 'theRangecalendar',
                value: {
                    begin: new Date(),
                    end: new Date()
                },
                width: 500
            }, {
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
            }, {
                type: 'textbox',
                name: 'theText',
                value: 'eeeee',
                width: 200
            }, {
                type: 'plain',
                text: '<a href="https://www.baidu.com" target="_blank">Go to www.baidu.com</a>'
            }]
        };
    },
    onFilter1: function onFilter1(formData) {
        this.data.set('formData.f1', JSON.stringify(formData, null, 2));
    },
    onFilter2: function onFilter2(formData) {
        this.data.set('formData.f2', JSON.stringify(formData, null, 2));
    }
});

/***/ }),

/***/ 439:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(5);

var _lodash2 = _interopRequireDefault(_lodash);

var _san = __webpack_require__(0);

var _util = __webpack_require__(2);

var _Button = __webpack_require__(6);

var _Button2 = _interopRequireDefault(_Button);

var _Select = __webpack_require__(22);

var _Select2 = _interopRequireDefault(_Select);

var _RangeCalendar = __webpack_require__(54);

var _RangeCalendar2 = _interopRequireDefault(_RangeCalendar);

var _TextBox = __webpack_require__(15);

var _TextBox2 = _interopRequireDefault(_TextBox);

var _Calendar = __webpack_require__(48);

var _Calendar2 = _interopRequireDefault(_Calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var cx = (0, _util.create)('ui-biz-filter');

/* eslint-disable */

// import moment from 'moment';
var template = '<div class="{{mainClass}}">\n    <dl s-if="!loading">\n        <dt s-if="title">{{title}}</dt>\n        <dd>\n            <div class="' + cx('form', 'form-inline') + '">\n                <div class="' + cx('form-item') + '" s-for="item in controls">\n                    <label s-if="item.label" class="' + cx('label') + '">{{item.label}}</label>\n                    <ui-select\n                        s-if="item.type === \'select\'"\n                        value="{{formData[item.name]}}"\n\n                        width="{{item.width}}"\n                        filter="{{item.filter}}"\n                        filter-placeholder="{{item.filterPlaceholder}}"\n                        filter-callback="{{item.filterCallback}}"\n                        multi="{{item.multi}}"\n                        datasource="{{item.options}}"\n                        on-change="onItemChanged(item.name, $event)"\n                        />\n\n                    <ui-textbox\n                        s-if="item.type === \'textbox\'"\n                        value="{{formData[item.name]}}"\n                        width="{{item.width}}"\n                        placeholder="{{item.placeholder}}"\n                        on-input="onItemChanged(item.name, $event, true)"\n                        on-enter="doFilter"\n                    />\n\n                    <ui-rangecalendar\n                        s-if="item.type === \'rangecalendar\'"\n                        value="{{formData[item.name]}}"\n                        time="{{item.time}}"\n                        width="{{item.width}}"\n                        range="{{item.range}}"\n                        on-change="onItemChanged(item.name, $event)"\n                        />\n\n                    <ui-calendar\n                        s-if="item.type === \'calendar\'"\n                        value="{{formData[item.name]}}"\n\n                        width="{{item.width}}"\n                        prev="{{item.prev}}"\n                        next="{{item.next}}"\n                        range="{{item.range}}"\n                        on-change="onItemChanged(item.name, $event)"\n                        />\n                    <div\n                        s-if="item.type === \'plain\'"\n                        class="' + cx('form-item-plain') + '">{{item.text | raw}}</div>\n                </div>\n            </div>\n            <ui-button on-click="doFilter" skin="primary" s-if="submitText">{{submitText}}</ui-button>\n        </dd>\n    </dl>\n</div>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'ui-select': _Select2.default,
        'ui-calendar': _Calendar2.default,
        'ui-rangecalendar': _RangeCalendar2.default,
        'ui-button': _Button2.default,
        'ui-textbox': _TextBox2.default
    },
    dataTypes: {
        title: _san.DataTypes.string,
        loading: _san.DataTypes.bool,
        submitText: _san.DataTypes.string,
        controls: _san.DataTypes.array,
        formData: _san.DataTypes.object
    },
    computed: {
        mainClass: function mainClass() {
            return cx.mainClass(this);
        }
    },
    initData: function initData() {
        return {
            title: null,
            loading: true,
            submitText: null,
            formData: null,
            controls: []
        };
    },
    inited: function inited() {
        var keyMap = [];
        var formData = this.data.get('formData') || {};
        var controls = _lodash2.default.map(this.data.get('controls'), function (item, index) {
            var name = item.name;
            if (!name) {
                // 如果没有设置 name，就用默认值，这样子才能恢复 value
                // XXX(leeight) 如果有这种情况，为什么不直接在 $extraPayload 里面设置过滤参数呢？
                keyMap.push({ type: 'p', value: index });
                name = '__key_' + (keyMap.length - 1);
            } else if (_lodash2.default.isPlainObject(name)) {
                // 如果设置的是 JSON 格式，转成 string，方便后续使用
                keyMap.push({ type: 'j', value: name });
                name = '__key_' + (keyMap.length - 1);
            }

            if (formData[name] == null && item.value != null) {
                formData[name] = item.value;
            }

            return _lodash2.default.extend({}, item, { name: name });
        });
        if (keyMap.length) {
            formData.__s_key = keyMap; // eslint-disable-line
        }
        this.data.set('formData', formData);
        this.data.set('controls', controls);
        this.data.set('loading', false);
    },
    attached: function attached() {
        var formData = this.data.get('formData');
        if (!_lodash2.default.isEmpty(formData)) {
            // 如果有默认值，就自动过滤一下??
            this.doFilter();
        }
    },
    onItemChanged: function onItemChanged(name, _ref, preventFilterAction) {
        var value = _ref.value;

        this.data.set('formData.' + name, value);

        var submitText = this.data.get('submitText');
        if (!submitText && !preventFilterAction) {
            // 如果没有提交按钮，且不是输入框input事件，那么就自动过滤
            this.doFilter();
        }
    },
    doFilter: function doFilter() {
        if (!this.lifeCycle.attached) {
            return;
        }

        // 在一个渲染周期内，可能会被触发三次
        // RangeCalendar
        // Calendar
        // attached
        var formData = _lodash2.default.clone(this.data.get('formData'));
        this.fire('submit', formData);
    }
});

/***/ })

},[438])});;