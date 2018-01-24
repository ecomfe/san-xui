define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([39],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__asInput__ = __webpack_require__(3);
/**
 * @file components/BoxGroup.es6
 * @author leeight
 */







const cx = Object(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* create */])('ui-boxgroup');

/* eslint-disable */
const template = `
<template>
<div class="{{mainClass}}">
    <div class="${cx('group')}" s-for="ds, i in groupedDatasource">
        <label class="${cx('radio', 'wrapper')}" style="{{itemStyle}}" san-for="item in ds">
            <input san-if="boxType == 'radio'"
                type="radio"
                on-change="onChange($event, item.__index)"
                name="{{name}}"
                disabled="{{item.disabled || disabled}}"
                checked="{{checkedStatus[item.__index]}}"
            />
            <input san-else
                type="checkbox"
                on-change="onChange($event, item.__index)"
                name="{{name}}"
                disabled="{{item.disabled || disabled}}"
                checked="{{checkedStatus[item.__index]}}"
            />
            <span>{{item | title}}</span>
        </label>
    </div>
</div>
</template>
`;
/* eslint-enable */

const BoxGroup = Object(__WEBPACK_IMPORTED_MODULE_1_san__["defineComponent"])({
    template,
    initData() {
        return {
            datasource: [], // Array.<{value: string, title: string}>
            disabled: false,
            orientation: 'horizontal', // 'vertical' | 'horizontal'
            value: null,
            colCount: 0, // 展示N列
            itemWidth: 0, // 每一列的宽度
            name: 'esui' + Object(__WEBPACK_IMPORTED_MODULE_2__util__["j" /* nexUuid */])(),
            boxType: 'radio' // 'radio' | 'checkbox'
        };
    },
    dataTypes: {
        /**
         * 组件的禁用状态
         * @default false
         */
        disabled: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 组件的数据源
         * <pre><code>{
         *   text: string,
         *   value: any,
         *   disabled?: bool
         * }</code></pre>
         * @default []
         */
        datasource: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].array,

        /**
         * 排列方式，横向还是纵向
         * @default horizontal
         */
        orientation: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,

        /**
         * 组件当前的值，如果是 checkbox 的话，值的类型是 any[]
         * @bindx
         */
        value: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].any,

        /**
         * 每行最多展示 col-count 列
         * @default 0
         */
        colCount: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * 每一项的宽度
         * @default 0
         */
        itemWidth: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * 类型 radio | checkbox
         */
        boxType: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string
    },
    computed: {
        checkedStatus() {
            const status = {};
            const datasource = this.data.get('datasource');
            const boxType = this.data.get('boxType');

            let value = this.data.get('value');
            if (value != null) {
                if (boxType === 'radio' && !__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isArray(value)) {
                    value = [value];
                }

                for (let i = 0; i < value.length; i++) {
                    for (let j = 0; j < datasource.length; j++) {
                        if (datasource[j].value === value[i]) {
                            status['' + j] = 1;
                            break;
                        }
                    }
                }
            }

            return status;
        },
        itemStyle() {
            const style = {};

            const itemWidth = this.data.get('itemWidth');
            if (itemWidth > 0) {
                style.width = `${itemWidth}px`;
            }

            return style;
        },
        groupedDatasource() {
            const datasource = this.data.get('datasource');
            const colCount = this.data.get('colCount');
            if (!colCount) {
                return [__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(datasource, (item, __index) => {
                    const {text, title, disabled} = item;
                    return {
                        text, title, disabled, __index
                    };
                })];
            }
            const itemsCount = datasource.length;
            const groups = [];
            const groupCount = Math.ceil(itemsCount / colCount);

            for (let i = 0; i < groupCount; i++) {
                const group = [];
                const startIndex = i * colCount;
                const endIndex = Math.min(itemsCount, (i + 1) * colCount);
                for (let j = startIndex; j < endIndex; j++) {
                    const {text, title, disabled} = datasource[j];
                    group.push({text, title, disabled, __index: j});
                }
                groups.push(group);
            }

            return groups;
        },
        mainClass() {
            const klass = cx.mainClass(this);
            const orientation = this.data.get('orientation');
            if (orientation) {
                klass.push(cx(orientation));
                klass.push('state-' + orientation);
            }
            return klass;
        }
    },
    filters: {
        title(item) {
            return item.text || item.title;
        }
    },
    inited() {
        const {boxType, value, disabled} = this.data.get();
        if (disabled === '') {
            this.data.set('disabled', true);
        }
        if (boxType === 'radio' && __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isArray(value)) {
            this.data.set('value', value[0]);
        }
        if (boxType === 'checkbox' && !value) {
            this.data.set('value', []);
        }
        this.watch('value', value => this.fire('change', {value}));
    },
    onChange(e, index) {
        const boxType = this.data.get('boxType');
        const datasource = this.data.get('datasource');

        const value = datasource[index].value;
        if (boxType === 'radio') {
            if (e.target.checked) {
                this.data.set('value', value);
            }
            else {
                // ??? 好像不太可能？
            }
        }
        else {
            if (e.target.checked) {
                this.data.push('value', value);
            }
            else {
                const valueIndex = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.findIndex(this.data.get('value'), o => o === value);
                if (valueIndex !== -1) {
                    this.data.removeAt('value', valueIndex);
                }
            }
        }
    }
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_3__asInput__["a" /* asInput */])(BoxGroup));


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

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_BoxGroup__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Row__ = __webpack_require__(5);
/**
 * @file demos/xui-boxgroup.es6
 * @author leeight
 */






/* eslint-disable */
const template = `<template>
<x-row label="radio">
    <xui-boxgroup
        box-type="radio"
        datasource="{{boxgroup.datasource}}"
        value="{=boxgroup.radio=}"
        />
    <strong class="large">
    Value is: {{boxgroup.radio | stringify}}
    </strong>
</x-row>

<x-row label="checkbox">
    <xui-boxgroup
        box-type="checkbox"
        datasource="{{boxgroup.datasource}}"
        value="{=boxgroup.checkbox=}"
        />
    <strong class="large">
    Value is: {{boxgroup.checkbox | stringify}}
    </strong>
</x-row>

<x-row label="checkbox,col-count=3,item-width=100">
    <xui-boxgroup
        box-type="checkbox"
        col-count="{{3}}"
        item-width="{{100}}"
        datasource="{{boxgroup.datasource}}"
        value="{=boxgroup.checkbox=}"
        />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_2__Row__["a" /* default */],
        'xui-boxgroup': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_BoxGroup__["a" /* default */]
    },
    filters: {
        stringify(value) {
            return JSON.stringify(value);
        }
    },
    initData() {
        return {
            boxgroup: {
                datasource: [
                    {text: 'foo', value: 'foo'},
                    {text: 'bar', value: 'bar'},
                    {text: '123', value: '123', disabled: true},
                    {text: 'number 1', value: 1},
                    {text: 'string \'1\'', value: '1'},
                    {text: 'number 2', value: 2},
                    {text: 'string \'2\'', value: '2'},
                    {text: 'bool true', value: true},
                    {text: 'bool false', value: false},
                    {text: 'object 1', value: {foo: 1}},
                    {text: 'object 2', value: {bar: 1}},
                    {text: 'abc9', value: 'abc9'},
                    {text: 'abc0', value: 'abc0'}
                ]
            }
        };
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



/***/ })

},[326])});;