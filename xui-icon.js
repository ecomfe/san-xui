define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([36],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = asInput;
/**
 * @file components/asInput.es6
 * @author leeight
 */

function asInput(Klass) {
    return class extends Klass {
        fire(name, event) {
            super.fire(name, event);

            if (name === 'change' && event.value != null
                || name === 'input') {
                this.nextTick(() => {
                    const value = this.data.get('value');
                    this.dispatch('input-comp-value-changed', {value});
                });
            }
        }
    };
}


/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_Icon__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_Loading__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_inf_ui_x_components_TextBox__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Row__ = __webpack_require__(5);
/**
 * @file demos/xui-icon.es6
 * @author leeight
 */









/* eslint-disable */
const template = `<template>
<xui-loading s-if="loading" />
<div s-else>
    <xui-textbox value="{=keyword=}" placeholder="Find icon by name" />
    Total count: {{filteredIcons.length}}
    <br />
    <x-row label="{{g.name}} ({{g.icons.length}})" s-for="g in groupedIcons">
        <div class="icons">
            <div s-for="icon in g.icons" class="tooltipped tooltipped-n" aria-label="{{icon}}">
                <xui-icon name="{{icon}}" /><br />{{icon}}
            </div>
        </div>
    </x-row>
</div>
</template>`;
/* eslint-enable */

function getIcons() {
    return fetch('https://cdn.bdstatic.com/iconfont/iconfont.css')
        .then(response => response.text())
        .then(response => {
            // .icon-artec:before
            const pattern = /\.icon\-([^:]+):before/g;
            const icons = [];

            let match = null;
            while (match = pattern.exec(response)) {
                icons.push(match[1]);
            }

            icons.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

            return icons;
        });
}

function groupIcons(icons) {
    const groups = [];

    let group = null;
    __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(icons, icon => {
        const groupName = icon.substr(0, 1).toUpperCase();
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

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_5__Row__["a" /* default */],
        'xui-loading': __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_Loading__["a" /* default */],
        'xui-textbox': __WEBPACK_IMPORTED_MODULE_4_inf_ui_x_components_TextBox__["a" /* default */],
        'xui-icon': __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_Icon__["a" /* default */]
    },
    initData() {
        return {
            loading: true,
            keyword: '',
            groupedIcons: [],
            icons: []
        };
    },
    computed: {
        groupedIcons() {
            return groupIcons(this.data.get('filteredIcons'));
        },
        filteredIcons() {
            const keyword = this.data.get('keyword');
            const icons = this.data.get('icons');
            if (!keyword) {
                return icons;
            }
            return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.filter(icons, icon => icon.indexOf(keyword) !== -1);
        }
    },
    attached() {
        getIcons().then(icons => {
            this.data.set('icons', icons);
            this.data.set('loading', false);
        });
    }
}));


/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/**
 * @file demos/Row.es6
 * @author leeight
 */



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template: `<div class="x-row">
        <div class="label" s-if="label">{{label}}</div>
        <div class="content"><slot/></div>
    </div>`
}));



/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__asInput__ = __webpack_require__(3);
/**
 * @file TextBox.es6
 * @author leeight
 */






const cx = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-textbox');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <div s-if="addon && addonPosition === 'begin'" class="${cx('addon')}">{{addon}}</div>
    <textarea s-if="multiline"
        s-ref="inputEl"
        on-input="onInput"
        on-keyup="onKeyUp($event)"
        on-keydown="onKeyDown($event)"
        on-keypress="onKeyPress($event)"
        value="{=value=}"
        disabled="{{disabled}}"
        placeholder="{{placeholder}}"
        style="{{textboxStyle}}"></textarea>
    <input s-else
        s-ref="inputEl"
        on-input="onInput"
        on-keyup="onKeyUp($event)"
        on-keydown="onKeyDown($event)"
        on-keypress="onKeyPress($event)"
        on-focus="onFocus($event)"
        on-blur="onBlur($event)"
        value="{=value=}"
        min="{{min}}",
        max="{{max}}"
        step="{{step}}"
        type="{{type}}"
        disabled="{{disabled}}"
        placeholder="{{placeholder}}"
        style="{{textboxStyle}}" />
    <div s-if="addon && addonPosition === 'end'" class="${cx('addon', 'addon-end')}">{{addon}}</div>
</div>`;
/* eslint-enable */

const TextBox = Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({
    template,
    computed: {
        mainClass() {
            return cx.mainClass(this);
        },
        textboxStyle() {
            return cx.mainStyle(this);
        }
    },
    initData() {
        return {
            disabled: false,
            autofocus: false,
            type: 'text',
            multiline: false,
            skin: '',
            placeholder: '',
            addon: '',
            addonPosition: 'begin', // 'begin' | 'end'
            width: null,
            height: null
        };
    },
    dataTypes: {
        /**
         * 控件的禁用状态
         *
         * @default false
         */
        disabled: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,

        /**
         * 是否默认获取焦点
         *
         * @default false
         */
        autofocus: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,

        /**
         * 单行文本框的输入类型，可以控制输入 email, number, url 等格式
         *
         * @default text
         */
        type: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * 获取或者设置控件的值
         *
         * @bindx
         */
        value: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * 是否展示成多行输入的文本框(textarea)
         *
         * @default false
         */
        multiline: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,

        /**
         * 皮肤样式
         */
        skin: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * 设置 placeholder 的内容
         */
        placeholder: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * 输入框的前缀或者后缀文案
         */
        addon: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * addon 文案的位置，可以设置 begin 或者 end
         *
         * @default begin
         */
        addonPosition: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].string,

        /**
         * 输入框的宽度
         */
        width: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number,


        /**
         * 输入框的高度
         */
        height: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number,

        /**
         * 当 type 设置成 number 的时候，有效
         */
        min: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number,

        /**
         * 当 type 设置成 number 的时候，有效
         */
        max: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number,

        /**
         * 当 type 设置成 number 的时候，有效
         */
        step: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].number
    },
    attached() {
        const autofocus = this.data.get('autofocus');
        if (autofocus) {
            this.focus();
        }
    },
    focus() {
        const inputEl = this.ref('inputEl');
        if (inputEl) {
            if (document.activeElement === inputEl) {
                return;
            }
            inputEl.focus();
        }
    },
    onInput() {
        const value = this.data.get('value');
        this.fire('input', {value});
    },
    onFocus(e) {
        this.fire('focus', e);
    },
    onBlur(e) {
        this.fire('blur', e);
    },
    onKeyUp(e) {
        this.fire('keyup', e);
    },
    onKeyDown(e) {
        this.fire('keydown', e);
    },
    onKeyPress(e) {
        const keyCode = e.which || e.keyCode;
        if (keyCode === 13) {
            this.fire('enter');
        }
        this.fire('keypress', e);
    }
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2__asInput__["a" /* asInput */])(TextBox));


/***/ })

},[347])});;