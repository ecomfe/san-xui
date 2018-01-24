define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([31],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_Chart__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Row__ = __webpack_require__(5);
/**
 * @file demos/xui-chart.es6
 * @author leeight
 */








/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-chart
        loading="{{chart.loading}}",
        width="{{chart.width}}"
        height="{{chart.height}}"
        option="{{chart.metrics|gen_options_line}}"
    />
</x-row>
<x-row label="auto-resize">
    <xui-chart
        auto-resize
        loading="{{chart.loading}}",
        width="{{chart.width}}"
        height="{{chart.height}}"
        option="{{chart.metrics|gen_options_line}}"
    />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_4__Row__["a" /* default */],
        'xui-chart': __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_Chart__["a" /* default */]
    },
    filters: {
        gen_options_line(metrics) {  // eslint-disable-line
            const xAxis = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(metrics, o => o.date);
            const yAxisValue = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(metrics, item => {
                const value = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.reduce(item.metrics, (prev, o) => prev + o.value, 0);
                return +(value.toFixed(2));
            });

            const yAxis = [
                {
                    color: 'rgb(21, 148, 242)',
                    label: '消费趋势',
                    value: yAxisValue
                }
            ];
            const series = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(yAxis, item => {
                return {
                    name: item.label,
                    type: 'line',
                    smooth: !!item.smooth,
                    itemStyle: {
                        normal: {
                            color: item.color
                        }
                    },
                    areaStyle: {
                        normal: {
                            opacity: 1,
                            color: {
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                type: 'linear',
                                global: false,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: 'rgba(185, 221, 251, 0.5)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(255, 255, 255, 0.5)'
                                    }
                                ]
                            }
                        }
                    },
                    data: item.value
                };
            });

            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#108cee'
                        }
                    },
                    position(pt) {
                        return [pt[0], '10%'];
                    },
                    backgroundColor: '#fff',
                    textStyle: {
                        color: '#333'
                    },
                    enterable: false,
                    extraCssText: 'border-radius:0;'
                        + 'padding:0;'
                        + 'background-color:rgba(255,255,255,.95);'
                        + 'box-shadow:3px 3px 9px 3px rgba(16,140,238,.3);',
                    formatter(params, ticket, callback) {
                        const {axisValue, data} = params[0];
                        const itemMetrics = [];
                        // TODO(leeight) 后期支持 现金，代金券，退款 之后再打开
                        // u.map(metrics[dataIndex].metrics,
                        //    o => `<div>${o.name}<span>￥${o.value.toFixed(2)}</span></div>`);
                        /* eslint-disable */
                        return '<dl class="x-c-t-tooltip">'
                            + `<dt>${axisValue} 消费详情</dt>`
                            + '<dd>'
                            + `<div><strong>总额<span>￥${data}</span></strong></div>`
                            + itemMetrics.join('')
                            + '</dd>'
                            + '</dl>';
                        /* eslint-enable */
                    }
                },
                grid: {
                    show: true,
                    top: 0,
                    left: 0,
                    bottom: 20,
                    right: 0
                },
                xAxis: {
                    type: 'category',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            align: 'left',
                            color: 'rgb(153, 153, 153)'
                        }
                    },
                    data: xAxis
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['rgb(240, 240, 240)']
                        }
                    }
                },
                series
            };

            return option;
        }
    },
    initData() {
        return {
            chart: {
                loading: true,
                width: 500,
                height: 300,
                metrics: __WEBPACK_IMPORTED_MODULE_3__config__["b" /* metrics */]
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



/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @file demos/config.es6
 * @author leeight
 */

const blocks = [
    {
        title: '基础组件',
        items: [
            {
                text: 'xui-button'
            },
            {
                text: 'xui-textbox'
            },
            {
                text: 'xui-numbertextline'
            },
            {
                text: 'xui-checkbox'
            },
            {
                text: 'xui-dragger'
            },
            {
                text: 'xui-select'
            },
            {
                text: 'xui-multipicker'
            },
            {
                text: 'xui-region'
            },
            {
                text: 'xui-radioselect'
            },
            {
                text: 'xui-boxgroup'
            },
            {
                text: 'xui-icon'
            },
            {
                text: 'xui-tip'
            },
            {
                text: 'xui-table'
            },
            {
                text: 'xui-as-table'
            },
            {
                text: 'xui-subrow-table'
            },
            {
                text: 'xui-pager'
            },
            {
                text: 'xui-dialog'
            },
            {
                text: 'xui-layer'
            },
            {
                text: 'xui-switch'
            },
            {
                text: 'xui-ss'
            },
            {
                text: 'xui-tab'
            },
            {
                text: 'xui-toast'
            },
            {
                text: 'xui-toastlabel'
            },
            {
                text: 'xui-tree',
                disabled: true
            },
            {
                text: 'xui-infinite-scroll'
            },
            {
                text: 'xui-userpicker'
            }
        ]
    },
    {
        title: '日期相关',
        items: [
            {
                text: 'xui-monthview'
            },
            {
                text: 'xui-calendar'
            },
            {
                text: 'xui-rangecalendar'
            }
        ]
    },
    {
        title: '图表',
        items: [
            {
                text: 'xui-chart'
            },
            {
                text: 'xui-bcmchart'
            }
        ]
    },
    {
        title: '语音识别',
        items: [
            {text: 'xui-voice'}
        ]
    },
    {
        title: '编辑器相关',
        items: [
            {
                text: 'xui-richtexteditor'
            },
            {
                text: 'xui-ckeditor'
            },
            {
                text: 'xui-aceeditor'
            }
        ]
    },
    {
        title: '表单',
        items: [
            {
                text: 'xui-form'
            },
            {
                text: 'xui-as-form'
            },
            {
                text: 'xui-register-form-item'
            }
        ]
    },
    {
        title: '文件上传',
        items: [
            {
                text: 'xui-webuploader'
            },
            {
                text: 'xui-bosuploader'
            },
            {
                text: 'xui-uploader'
            }
        ]
    },
    {
        title: '业务组件',
        items: [
            {
                text: 'xui-filter'
            },
            {
                text: 'xui-toolbar'
            },
            {
                text: 'xui-right-toolbar'
            },
            {
                text: 'xui-bulk-actions',
                disabled: true
            },
            {
                text: 'xui-clipboard'
            },
            {
                text: 'xui-viewstep'
            },
            {
                text: 'xui-loading'
            },
            {
                text: 'xui-buybucket'
            },
            {
                text: 'xui-progress'
            },
            {
                text: 'xui-smscode'
            },
            {
                text: 'xui-searchbox'
            },
            {
                text: 'xui-hljs'
            },
            {
                text: 'xui-go'
            },
            {
                text: 'xui-actionloader'
            },
            {
                text: 'xui-sidebar',
                disabled: true
            },
            {
                text: 'xui-instanteditor'
            }
        ]
    },
    {
        title: '非标组件',
        items: [
            {
                text: 'xui-button-menu'
            }
        ]
    }
];
/* harmony export (immutable) */ __webpack_exports__["a"] = blocks;


const metrics = [
    {
        date: '2017-04-07',
        metrics: []
    },
    {
        date: '2017-04-08',
        metrics: []
    },
    {
        date: '2017-04-09',
        metrics: []
    },
    {
        date: '2017-04-10',
        metrics: []
    },
    {
        date: '2017-04-11',
        metrics: []
    },
    {
        date: '2017-04-12',
        metrics: []
    },
    {
        date: '2017-04-13',
        metrics: []
    },
    {
        date: '2017-04-14',
        metrics: []
    },
    {
        date: '2017-04-15',
        metrics: []
    },
    {
        date: '2017-04-16',
        metrics: [
            {
                name: '现金支付',
                value: 120
            }
        ]
    },
    {
        date: '2017-04-17',
        metrics: []
    },
    {
        date: '2017-04-18',
        metrics: []
    },
    {
        date: '2017-04-19',
        metrics: []
    },
    {
        date: '2017-04-20',
        metrics: []
    },
    {
        date: '2017-04-21',
        metrics: []
    },
    {
        date: '2017-04-22',
        metrics: []
    },
    {
        date: '2017-04-23',
        metrics: []
    },
    {
        date: '2017-04-24',
        metrics: []
    },
    {
        date: '2017-04-25',
        metrics: []
    },
    {
        date: '2017-04-26',
        metrics: []
    },
    {
        date: '2017-04-27',
        metrics: []
    },
    {
        date: '2017-04-28',
        metrics: []
    },
    {
        date: '2017-04-29',
        metrics: []
    },
    {
        date: '2017-04-30',
        metrics: []
    },
    {
        date: '2017-05-01',
        metrics: []
    },
    {
        date: '2017-05-02',
        metrics: []
    },
    {
        date: '2017-05-03',
        metrics: []
    },
    {
        date: '2017-05-04',
        metrics: []
    },
    {
        date: '2017-05-05',
        metrics: []
    },
    {
        date: '2017-05-06',
        metrics: []
    },
    {
        date: '2017-05-07',
        metrics: []
    },
    {
        date: '2017-05-08',
        metrics: []
    },
    {
        date: '2017-05-09',
        metrics: []
    },
    {
        date: '2017-05-10',
        metrics: []
    },
    {
        date: '2017-05-11',
        metrics: []
    },
    {
        date: '2017-05-12',
        metrics: []
    },
    {
        date: '2017-05-13',
        metrics: []
    },
    {
        date: '2017-05-14',
        metrics: []
    },
    {
        date: '2017-05-15',
        metrics: []
    },
    {
        date: '2017-05-16',
        metrics: []
    },
    {
        date: '2017-05-17',
        metrics: []
    },
    {
        date: '2017-05-18',
        metrics: []
    },
    {
        date: '2017-05-19',
        metrics: []
    },
    {
        date: '2017-05-20',
        metrics: []
    },
    {
        date: '2017-05-21',
        metrics: []
    },
    {
        date: '2017-05-22',
        metrics: [
            {
                name: '现金支付',
                value: 300
            }
        ]
    },
    {
        date: '2017-05-23',
        metrics: []
    },
    {
        date: '2017-05-24',
        metrics: []
    },
    {
        date: '2017-05-25',
        metrics: []
    },
    {
        date: '2017-05-26',
        metrics: []
    },
    {
        date: '2017-05-27',
        metrics: []
    },
    {
        date: '2017-05-28',
        metrics: []
    },
    {
        date: '2017-05-29',
        metrics: []
    },
    {
        date: '2017-05-30',
        metrics: []
    },
    {
        date: '2017-05-31',
        metrics: [
            {
                name: '现金支付',
                value: 100
            }
        ]
    },
    {
        date: '2017-06-01',
        metrics: []
    },
    {
        date: '2017-06-02',
        metrics: []
    },
    {
        date: '2017-06-03',
        metrics: []
    },
    {
        date: '2017-06-04',
        metrics: []
    },
    {
        date: '2017-06-05',
        metrics: []
    },
    {
        date: '2017-06-06',
        metrics: []
    },
    {
        date: '2017-06-07',
        metrics: [
            {
                name: '现金支付',
                value: 122.4
            }
        ]
    },
    {
        date: '2017-06-08',
        metrics: []
    },
    {
        date: '2017-06-09',
        metrics: []
    },
    {
        date: '2017-06-10',
        metrics: []
    },
    {
        date: '2017-06-11',
        metrics: []
    },
    {
        date: '2017-06-12',
        metrics: []
    },
    {
        date: '2017-06-13',
        metrics: [
            {
                name: '现金支付',
                value: 10
            }
        ]
    },
    {
        date: '2017-06-14',
        metrics: []
    },
    {
        date: '2017-06-15',
        metrics: []
    },
    {
        date: '2017-06-16',
        metrics: []
    },
    {
        date: '2017-06-17',
        metrics: []
    },
    {
        date: '2017-06-18',
        metrics: []
    },
    {
        date: '2017-06-19',
        metrics: []
    },
    {
        date: '2017-06-20',
        metrics: []
    },
    {
        date: '2017-06-21',
        metrics: [
            {
                name: '现金支付',
                value: 176
            }
        ]
    },
    {
        date: '2017-06-22',
        metrics: []
    },
    {
        date: '2017-06-23',
        metrics: [
            {
                name: '现金支付',
                value: 76
            }
        ]
    },
    {
        date: '2017-06-24',
        metrics: []
    },
    {
        date: '2017-06-25',
        metrics: []
    },
    {
        date: '2017-06-26',
        metrics: []
    },
    {
        date: '2017-06-27',
        metrics: []
    },
    {
        date: '2017-06-28',
        metrics: []
    },
    {
        date: '2017-06-29',
        metrics: []
    },
    {
        date: '2017-06-30',
        metrics: []
    },
    {
        date: '2017-07-01',
        metrics: []
    },
    {
        date: '2017-07-02',
        metrics: []
    },
    {
        date: '2017-07-03',
        metrics: []
    },
    {
        date: '2017-07-04',
        metrics: []
    },
    {
        date: '2017-07-05',
        metrics: []
    },
    {
        date: '2017-07-06',
        metrics: []
    },
    {
        date: '2017-07-07',
        metrics: []
    },
    {
        date: '2017-07-08',
        metrics: []
    },
    {
        date: '2017-07-09',
        metrics: []
    },
    {
        date: '2017-07-10',
        metrics: []
    },
    {
        date: '2017-07-11',
        metrics: []
    },
    {
        date: '2017-07-12',
        metrics: []
    },
    {
        date: '2017-07-13',
        metrics: []
    },
    {
        date: '2017-07-14',
        metrics: []
    },
    {
        date: '2017-07-15',
        metrics: []
    },
    {
        date: '2017-07-16',
        metrics: []
    },
    {
        date: '2017-07-17',
        metrics: []
    },
    {
        date: '2017-07-18',
        metrics: [
            {
                name: '现金支付',
                value: 100
            }
        ]
    },
    {
        date: '2017-07-19',
        metrics: []
    },
    {
        date: '2017-07-20',
        metrics: []
    },
    {
        date: '2017-07-21',
        metrics: []
    },
    {
        date: '2017-07-22',
        metrics: []
    },
    {
        date: '2017-07-23',
        metrics: []
    },
    {
        date: '2017-07-24',
        metrics: []
    },
    {
        date: '2017-07-25',
        metrics: []
    },
    {
        date: '2017-07-26',
        metrics: []
    },
    {
        date: '2017-07-27',
        metrics: []
    },
    {
        date: '2017-07-28',
        metrics: []
    },
    {
        date: '2017-07-29',
        metrics: []
    },
    {
        date: '2017-07-30',
        metrics: []
    },
    {
        date: '2017-07-31',
        metrics: []
    },
    {
        date: '2017-08-01',
        metrics: []
    },
    {
        date: '2017-08-02',
        metrics: []
    },
    {
        date: '2017-08-03',
        metrics: []
    },
    {
        date: '2017-08-04',
        metrics: []
    },
    {
        date: '2017-08-05',
        metrics: []
    },
    {
        date: '2017-08-06',
        metrics: []
    },
    {
        date: '2017-08-07',
        metrics: []
    },
    {
        date: '2017-08-08',
        metrics: []
    },
    {
        date: '2017-08-09',
        metrics: []
    },
    {
        date: '2017-08-10',
        metrics: []
    },
    {
        date: '2017-08-11',
        metrics: []
    },
    {
        date: '2017-08-12',
        metrics: []
    },
    {
        date: '2017-08-13',
        metrics: []
    },
    {
        date: '2017-08-14',
        metrics: []
    },
    {
        date: '2017-08-15',
        metrics: []
    },
    {
        date: '2017-08-16',
        metrics: []
    },
    {
        date: '2017-08-17',
        metrics: []
    },
    {
        date: '2017-08-18',
        metrics: [
            {
                name: '现金支付',
                value: 22.4
            }
        ]
    },
    {
        date: '2017-08-19',
        metrics: []
    },
    {
        date: '2017-08-20',
        metrics: []
    },
    {
        date: '2017-08-21',
        metrics: []
    },
    {
        date: '2017-08-22',
        metrics: []
    },
    {
        date: '2017-08-23',
        metrics: []
    },
    {
        date: '2017-08-24',
        metrics: []
    },
    {
        date: '2017-08-25',
        metrics: []
    },
    {
        date: '2017-08-26',
        metrics: []
    },
    {
        date: '2017-08-27',
        metrics: []
    },
    {
        date: '2017-08-28',
        metrics: [
            {
                name: '现金支付',
                value: 150
            }
        ]
    },
    {
        date: '2017-08-29',
        metrics: []
    },
    {
        date: '2017-08-30',
        metrics: []
    },
    {
        date: '2017-08-31',
        metrics: []
    },
    {
        date: '2017-09-01',
        metrics: []
    },
    {
        date: '2017-09-02',
        metrics: []
    },
    {
        date: '2017-09-03',
        metrics: []
    },
    {
        date: '2017-09-04',
        metrics: []
    },
    {
        date: '2017-09-05',
        metrics: []
    },
    {
        date: '2017-09-06',
        metrics: [
            {
                name: '现金支付',
                value: 200
            }
        ]
    },
    {
        date: '2017-09-07',
        metrics: []
    },
    {
        date: '2017-09-08',
        metrics: []
    },
    {
        date: '2017-09-09',
        metrics: []
    },
    {
        date: '2017-09-10',
        metrics: []
    },
    {
        date: '2017-09-11',
        metrics: [
            {
                name: '现金支付',
                value: 10
            }
        ]
    },
    {
        date: '2017-09-12',
        metrics: []
    },
    {
        date: '2017-09-13',
        metrics: []
    },
    {
        date: '2017-09-14',
        metrics: []
    },
    {
        date: '2017-09-15',
        metrics: []
    },
    {
        date: '2017-09-16',
        metrics: []
    },
    {
        date: '2017-09-17',
        metrics: []
    },
    {
        date: '2017-09-18',
        metrics: []
    },
    {
        date: '2017-09-19',
        metrics: []
    },
    {
        date: '2017-09-20',
        metrics: []
    },
    {
        date: '2017-09-21',
        metrics: []
    },
    {
        date: '2017-09-22',
        metrics: []
    },
    {
        date: '2017-09-23',
        metrics: []
    },
    {
        date: '2017-09-24',
        metrics: []
    },
    {
        date: '2017-09-25',
        metrics: []
    },
    {
        date: '2017-09-26',
        metrics: []
    },
    {
        date: '2017-09-27',
        metrics: []
    },
    {
        date: '2017-09-28',
        metrics: []
    },
    {
        date: '2017-09-29',
        metrics: []
    },
    {
        date: '2017-09-30',
        metrics: []
    },
    {
        date: '2017-10-01',
        metrics: []
    },
    {
        date: '2017-10-02',
        metrics: []
    },
    {
        date: '2017-10-03',
        metrics: []
    },
    {
        date: '2017-10-04',
        metrics: []
    },
    {
        date: '2017-10-05',
        metrics: []
    },
    {
        date: '2017-10-06',
        metrics: []
    },
    {
        date: '2017-10-07',
        metrics: []
    }
];
/* harmony export (immutable) */ __webpack_exports__["b"] = metrics;



/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_promise__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResizeObserver__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResizeObserver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ResizeObserver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(1);
/**
 * @file components/Chart.es6
 * @author leeight
 */







const cx = Object(__WEBPACK_IMPORTED_MODULE_3__util__["f" /* create */])('ui-chart');

const template = '<div class="{{mainClass}}" style="{{mainStyle}}"></div>';

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_san__["defineComponent"])({
    template,
    computed: {
        mainStyle() {
            const width = this.data.get('width');
            const height = this.data.get('height');
            return {
                'width': `${width}px`,
                'height': `${height}px`,
                'line-height': `${height}px`
            };
        },
        mainClass() {
            return cx.mainClass(this);
        }
    },
    initData() {
        return {
            loading: true,
            autoResize: false,
            width: 300,
            height: 300,
            option: {},
            notMerge: false
        };
    },
    dataTypes: {
        loading: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,
        autoResize: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,
        width: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,
        height: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,
        option: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].object,
        notMerge: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool
    },
    getChart() {
        return this.chart;
    },

    clearEmptyRing() {
        if (this.chart && this.ring) {
            this.chart.getZr().remove(this.ring);
            this.ring = null;
        }
    },

    __drawEmptyRing(echarts) {
        // 这里把 echarts 当做参数传递进来，是因为不想直接写 imports echarts from 'inf-ria/echarts'
        // 这样子导致初始化 echarts+zrender 的时候有 300ms ~ 500ms 的延迟
        // 所以改成了异步的加载 echarts
        return () => {
            const chart = this.chart;
            const width = chart.getWidth();
            const height = chart.getHeight();
            const size = Math.min(width, height) / 2;
            const minRadius = echarts.number.parsePercent('50%', size);
            const maxRadius = echarts.number.parsePercent('80%', size);
            this.ring = new echarts.graphic.Ring({
                shape: {
                    r0: minRadius,
                    r: maxRadius,
                    cx: width / 2,
                    cy: height / 2
                },
                style: {
                    stroke: '#ccc',
                    fill: 'none'
                }
            });
            chart.getZr().add(this.ring);
        };
    },

    __loadEcharts(delay = 300) {
        return new __WEBPACK_IMPORTED_MODULE_0_promise___default.a((resolve, reject) => {
            setTimeout(() => window.require(['inf-ria/echarts', 'zrender/vml/vml'], resolve), delay);
        });
    },

    attached() {
        this.watch('loading', loading => {
            if (this.chart) {
                loading ? this.chart.showLoading() : this.chart.hideLoading();
            }
        });

        this.watch('option', option => {
            if (this.chart && option) {
                this.chart.setOption(option, !!this.data.get('notMerge'));
                this.chart.hideLoading();
            }
        });

        this.__loadEcharts().then(echarts => {
            this.drawEmptyRing = this.__drawEmptyRing(echarts);

            this.data.set('loading', false);
            this.chart = echarts.init(this.el);
            this.chart.showLoading();
            const option = this.data.get('option');
            if (option) {
                this.chart.setOption(option);
                this.chart.hideLoading();
            }

            if (this.data.get('autoResize')) {
                const {clientWidth, clientHeight} = this.el.parentNode;
                this.chart.resize({
                    width: clientWidth,
                    height: clientHeight
                });
            }

            this.fire('chart-initialized');
        });

        if (this.data.get('autoResize')) {
            this.observer = new __WEBPACK_IMPORTED_MODULE_2__ResizeObserver___default.a(entries => {
                if (this.chart && this.chart.resize) {
                    const entry = entries[0];
                    this.chart.resize({
                        width: entry.clientWidth(),
                        height: entry.clientHeight()
                    });
                }
            }).observe(this.el.parentNode);
        }
    },

    disposed() {
        if (this.observer) {
            this.observer.disconnect();
        }

        if (this.chart) {
            this.chart.dispose();
            this.chart = null;
        }
    }
}));


/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * https://wicg.github.io/ResizeObserver/
 *
 * @file ResizeObserver.js
 * @author devrelm
 */

/* eslint-disable */
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
    var resizeObservers = [];

    function ResizeObserver(callback) {
        resizeObservers.push(this);
        this.__callback = callback;
        this.__observationTargets = [];
        this.__activeTargets = [];
    }

    ResizeObserver.prototype.observe = function(target) {
        var resizeObservationIndex = findTargetIndex(this.__observationTargets, target);
        if (resizeObservationIndex >= 0) {
            return;
        }

        var resizeObservation = new ResizeObservation(target);
        this.__observationTargets.push(resizeObservation);
    };

    ResizeObserver.prototype.unobserve = function(target) {
        var resizeObservationIndex = findTargetIndex(this.__observationTargets, target);
        if (resizeObservationIndex === -1) {
            return;
        }

        this.__observationTargets.splice(resizeObservationIndex, 1);
    };

    ResizeObserver.prototype.disconnect = function() {
        this.__observationTargets = [];
        this.__activeTargets = [];
    };

    ResizeObserver.prototype.__populateActiveTargets = function() {
        this.__activeTargets = [];
        for (var key in this.__observationTargets) {
            var resizeObservation = this.__observationTargets[key];
            if (resizeObservation.isActive()) {
                this.__activeTargets.push(resizeObservation);
            }
        }
    };

    function ResizeObserverEntry(target) {
        this.__target = target;
        this.__clientWidth = getWidth(target);
        this.__clientHeight = getHeight(target);
    }

    ResizeObserverEntry.prototype.target = function() {
        return this.__target;
    };

    ResizeObserverEntry.prototype.clientWidth = function() {
        return this.__clientWidth;
    };

    ResizeObserverEntry.prototype.clientHeight = function() {
        return this.__clientHeight;
    };

    function ResizeObservation(target) {
        this.__target = target;
        this.__lastBroadcastWidth = getWidth(target);
        this.__lastBroadcastHeight = getHeight(target);
    }

    ResizeObservation.prototype.target = function() {
        return this.__target;
    };

    ResizeObservation.prototype.lastBroadcastWidth = function() {
        return this.__lastBroadcastWidth;
    };

    ResizeObservation.prototype.lastBroadcastHeight = function() {
        return this.__lastBroadcastHeight;
    };

    ResizeObservation.prototype.isActive = function() {
        if (getWidth(this.__target) !== this.lastBroadcastWidth() ||
            getHeight(this.__target) !== this.lastBroadcastHeight()) {
            return true;
        }
        return false;
    };

    function findTargetIndex(collection, target) {
        for (var index = 0; index < collection.length; index += 1) {
            if (collection[index].target() === target) {
                return index;
            }
        }
    }

    function getWidth(target) {
        return target.getBoundingClientRect().width;
    }

    function getHeight(target) {
        return target.getBoundingClientRect().height;
    }

    function gatherActiveObservers() {
        for (var index = 0; index < resizeObservers.length; index += 1) {
            resizeObservers[index].__populateActiveTargets();
        }
    }

    function broadcastActiveObservations() {
        for (var roIndex = 0; roIndex < resizeObservers.length; roIndex++) {
            var resizeObserver = resizeObservers[roIndex];
            if (resizeObserver.__activeTargets.length === 0) {
                continue;
            }

            var entries = [];

            for (var atIndex = 0; atIndex < resizeObserver.__activeTargets.length; atIndex += 1) {
                var resizeObservation = resizeObserver.__activeTargets[atIndex];
                var entry = new ResizeObserverEntry(resizeObservation.target());
                entries.push(entry);
                resizeObservation.__lastBroadcastWidth = getWidth(resizeObservation.target());
                resizeObservation.__lastBroadcastHeight = getHeight(resizeObservation.target());
            }

            resizeObserver.__callback(entries);
            resizeObserver.__activeTargets = [];
        }
    }

    function frameHandler() {
        gatherActiveObservers();
        broadcastActiveObservations();

        setFrameWait(frameHandler);
    }

    function setFrameWait(callback) {
        if (typeof window.requestAnimationFrame === 'undefined') {
            window.setTimeout(callback, 1000 / 60);
        } else {
            window.requestAnimationFrame(callback);
        }
    }

    setFrameWait(frameHandler);

    return ResizeObserver;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* eslint-enable */


/***/ })

},[333])});;