define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([7],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(5);

var _lodash2 = _interopRequireDefault(_lodash);

var _san = __webpack_require__(0);

var _sanXui = __webpack_require__(3);

var _config = __webpack_require__(46);

var _Row = __webpack_require__(4);

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
var template = '<template>\n<x-row label="[default]">\n    <xui-chart\n        loading="{{chart.loading}}",\n        width="{{chart.width}}"\n        height="{{chart.height}}"\n        option="{{chart.metrics|gen_options_line}}"\n    />\n</x-row>\n<x-row label="auto-resize">\n    <xui-chart\n        auto-resize\n        loading="{{chart.loading}}",\n        width="{{chart.width}}"\n        height="{{chart.height}}"\n        option="{{chart.metrics|gen_options_line}}"\n    />\n</x-row>\n</template>';
/* eslint-enable */

/**
 * @file demos/xui-chart.es6
 * @author leeight
 */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-chart': _sanXui.Chart
    },
    filters: {
        gen_options_line: function gen_options_line(metrics) {
            // eslint-disable-line
            var xAxis = _lodash2.default.map(metrics, function (o) {
                return o.date;
            });
            var yAxisValue = _lodash2.default.map(metrics, function (item) {
                var value = _lodash2.default.reduce(item.metrics, function (prev, o) {
                    return prev + o.value;
                }, 0);
                return +value.toFixed(2);
            });

            var yAxis = [{
                color: 'rgb(21, 148, 242)',
                label: '消费趋势',
                value: yAxisValue
            }];
            var series = _lodash2.default.map(yAxis, function (item) {
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
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(185, 221, 251, 0.5)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(255, 255, 255, 0.5)'
                                }]
                            }
                        }
                    },
                    data: item.value
                };
            });

            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#108cee'
                        }
                    },
                    position: function position(pt) {
                        return [pt[0], '10%'];
                    },

                    backgroundColor: '#fff',
                    textStyle: {
                        color: '#333'
                    },
                    enterable: false,
                    extraCssText: 'border-radius:0;' + 'padding:0;' + 'background-color:rgba(255,255,255,.95);' + 'box-shadow:3px 3px 9px 3px rgba(16,140,238,.3);',
                    formatter: function formatter(params, ticket, callback) {
                        var _params$ = params[0],
                            axisValue = _params$.axisValue,
                            data = _params$.data;

                        var itemMetrics = [];
                        // TODO(leeight) 后期支持 现金，代金券，退款 之后再打开
                        // u.map(metrics[dataIndex].metrics,
                        //    o => `<div>${o.name}<span>￥${o.value.toFixed(2)}</span></div>`);
                        /* eslint-disable */
                        return '<dl class="x-c-t-tooltip">' + ('<dt>' + axisValue + ' \u6D88\u8D39\u8BE6\u60C5</dt>') + '<dd>' + ('<div><strong>\u603B\u989D<span>\uFFE5' + data + '</span></strong></div>') + itemMetrics.join('') + '</dd>' + '</dl>';
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
                series: series
            };

            return option;
        }
    },
    initData: function initData() {
        return {
            chart: {
                loading: true,
                width: 500,
                height: 300,
                metrics: _config.metrics
            }
        };
    }
});

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @file demos/config.es6
 * @author leeight
 */

var blocks = exports.blocks = [{
    title: '基础组件',
    items: [{
        text: 'xui-button'
    }, {
        text: 'xui-textbox'
    }, {
        text: 'xui-numbertextline'
    }, {
        text: 'xui-checkbox'
    }, {
        text: 'xui-dragger'
    }, {
        text: 'xui-select'
    }, {
        text: 'xui-multipicker'
    }, {
        text: 'xui-region'
    }, {
        text: 'xui-radioselect'
    }, {
        text: 'xui-boxgroup'
    }, {
        text: 'xui-icon'
    }, {
        text: 'xui-tip'
    }, {
        text: 'xui-table'
    }, {
        text: 'xui-as-table'
    }, {
        text: 'xui-as-drawer'
    }, {
        text: 'xui-subrow-table'
    }, {
        text: 'xui-pager'
    }, {
        text: 'xui-dialog'
    }, {
        text: 'xui-layer'
    }, {
        text: 'xui-switch'
    }, {
        text: 'xui-ss'
    }, {
        text: 'xui-tab'
    }, {
        text: 'xui-toast'
    }, {
        text: 'xui-toastlabel'
    }, {
        text: 'xui-tree'
    }, {
        text: 'xui-infinite-scroll'
    }, {
        text: 'xui-userpicker'
    }, {
        text: 'xui-sticky'
    }]
}, {
    title: '日期相关',
    items: [{
        text: 'xui-monthview'
    }, {
        text: 'xui-calendar'
    }, {
        text: 'xui-rangecalendar'
    }]
}, {
    title: '图表',
    items: [{
        text: 'xui-chart'
    }, {
        text: 'xui-bcmchart'
    }]
}, {
    title: '语音识别',
    items: [{ text: 'xui-voice' }]
}, {
    title: '编辑器相关',
    items: [{
        text: 'xui-richtexteditor'
    }, {
        text: 'xui-ckeditor'
    }, {
        text: 'xui-aceeditor'
    }]
}, {
    title: '表单',
    items: [{
        text: 'xui-form'
    }, {
        text: 'xui-as-form'
    }, {
        text: 'xui-register-form-item'
    }]
}, {
    title: '文件上传',
    items: [{
        text: 'xui-webuploader'
    }, {
        text: 'xui-bosuploader'
    }, {
        text: 'xui-uploader'
    }]
}, {
    title: '业务组件',
    items: [{
        text: 'xui-filter'
    }, {
        text: 'xui-toolbar'
    }, {
        text: 'xui-right-toolbar'
    }, {
        text: 'xui-bulk-actions',
        disabled: true
    }, {
        text: 'xui-clipboard'
    }, {
        text: 'xui-viewstep'
    }, {
        text: 'xui-loading'
    }, {
        text: 'xui-buybucket'
    }, {
        text: 'xui-progress'
    }, {
        text: 'xui-smscode'
    }, {
        text: 'xui-searchbox'
    }, {
        text: 'xui-hljs'
    }, {
        text: 'xui-go'
    }, {
        text: 'xui-actionloader'
    }, {
        text: 'xui-sidebar',
        disabled: true
    }, {
        text: 'xui-instanteditor'
    }]
}, {
    title: '非标组件',
    items: [{
        text: 'xui-button-menu'
    }]
}];

var metrics = exports.metrics = [{
    date: '2017-04-07',
    metrics: []
}, {
    date: '2017-04-08',
    metrics: []
}, {
    date: '2017-04-09',
    metrics: []
}, {
    date: '2017-04-10',
    metrics: []
}, {
    date: '2017-04-11',
    metrics: []
}, {
    date: '2017-04-12',
    metrics: []
}, {
    date: '2017-04-13',
    metrics: []
}, {
    date: '2017-04-14',
    metrics: []
}, {
    date: '2017-04-15',
    metrics: []
}, {
    date: '2017-04-16',
    metrics: [{
        name: '现金支付',
        value: 120
    }]
}, {
    date: '2017-04-17',
    metrics: []
}, {
    date: '2017-04-18',
    metrics: []
}, {
    date: '2017-04-19',
    metrics: []
}, {
    date: '2017-04-20',
    metrics: []
}, {
    date: '2017-04-21',
    metrics: []
}, {
    date: '2017-04-22',
    metrics: []
}, {
    date: '2017-04-23',
    metrics: []
}, {
    date: '2017-04-24',
    metrics: []
}, {
    date: '2017-04-25',
    metrics: []
}, {
    date: '2017-04-26',
    metrics: []
}, {
    date: '2017-04-27',
    metrics: []
}, {
    date: '2017-04-28',
    metrics: []
}, {
    date: '2017-04-29',
    metrics: []
}, {
    date: '2017-04-30',
    metrics: []
}, {
    date: '2017-05-01',
    metrics: []
}, {
    date: '2017-05-02',
    metrics: []
}, {
    date: '2017-05-03',
    metrics: []
}, {
    date: '2017-05-04',
    metrics: []
}, {
    date: '2017-05-05',
    metrics: []
}, {
    date: '2017-05-06',
    metrics: []
}, {
    date: '2017-05-07',
    metrics: []
}, {
    date: '2017-05-08',
    metrics: []
}, {
    date: '2017-05-09',
    metrics: []
}, {
    date: '2017-05-10',
    metrics: []
}, {
    date: '2017-05-11',
    metrics: []
}, {
    date: '2017-05-12',
    metrics: []
}, {
    date: '2017-05-13',
    metrics: []
}, {
    date: '2017-05-14',
    metrics: []
}, {
    date: '2017-05-15',
    metrics: []
}, {
    date: '2017-05-16',
    metrics: []
}, {
    date: '2017-05-17',
    metrics: []
}, {
    date: '2017-05-18',
    metrics: []
}, {
    date: '2017-05-19',
    metrics: []
}, {
    date: '2017-05-20',
    metrics: []
}, {
    date: '2017-05-21',
    metrics: []
}, {
    date: '2017-05-22',
    metrics: [{
        name: '现金支付',
        value: 300
    }]
}, {
    date: '2017-05-23',
    metrics: []
}, {
    date: '2017-05-24',
    metrics: []
}, {
    date: '2017-05-25',
    metrics: []
}, {
    date: '2017-05-26',
    metrics: []
}, {
    date: '2017-05-27',
    metrics: []
}, {
    date: '2017-05-28',
    metrics: []
}, {
    date: '2017-05-29',
    metrics: []
}, {
    date: '2017-05-30',
    metrics: []
}, {
    date: '2017-05-31',
    metrics: [{
        name: '现金支付',
        value: 100
    }]
}, {
    date: '2017-06-01',
    metrics: []
}, {
    date: '2017-06-02',
    metrics: []
}, {
    date: '2017-06-03',
    metrics: []
}, {
    date: '2017-06-04',
    metrics: []
}, {
    date: '2017-06-05',
    metrics: []
}, {
    date: '2017-06-06',
    metrics: []
}, {
    date: '2017-06-07',
    metrics: [{
        name: '现金支付',
        value: 122.4
    }]
}, {
    date: '2017-06-08',
    metrics: []
}, {
    date: '2017-06-09',
    metrics: []
}, {
    date: '2017-06-10',
    metrics: []
}, {
    date: '2017-06-11',
    metrics: []
}, {
    date: '2017-06-12',
    metrics: []
}, {
    date: '2017-06-13',
    metrics: [{
        name: '现金支付',
        value: 10
    }]
}, {
    date: '2017-06-14',
    metrics: []
}, {
    date: '2017-06-15',
    metrics: []
}, {
    date: '2017-06-16',
    metrics: []
}, {
    date: '2017-06-17',
    metrics: []
}, {
    date: '2017-06-18',
    metrics: []
}, {
    date: '2017-06-19',
    metrics: []
}, {
    date: '2017-06-20',
    metrics: []
}, {
    date: '2017-06-21',
    metrics: [{
        name: '现金支付',
        value: 176
    }]
}, {
    date: '2017-06-22',
    metrics: []
}, {
    date: '2017-06-23',
    metrics: [{
        name: '现金支付',
        value: 76
    }]
}, {
    date: '2017-06-24',
    metrics: []
}, {
    date: '2017-06-25',
    metrics: []
}, {
    date: '2017-06-26',
    metrics: []
}, {
    date: '2017-06-27',
    metrics: []
}, {
    date: '2017-06-28',
    metrics: []
}, {
    date: '2017-06-29',
    metrics: []
}, {
    date: '2017-06-30',
    metrics: []
}, {
    date: '2017-07-01',
    metrics: []
}, {
    date: '2017-07-02',
    metrics: []
}, {
    date: '2017-07-03',
    metrics: []
}, {
    date: '2017-07-04',
    metrics: []
}, {
    date: '2017-07-05',
    metrics: []
}, {
    date: '2017-07-06',
    metrics: []
}, {
    date: '2017-07-07',
    metrics: []
}, {
    date: '2017-07-08',
    metrics: []
}, {
    date: '2017-07-09',
    metrics: []
}, {
    date: '2017-07-10',
    metrics: []
}, {
    date: '2017-07-11',
    metrics: []
}, {
    date: '2017-07-12',
    metrics: []
}, {
    date: '2017-07-13',
    metrics: []
}, {
    date: '2017-07-14',
    metrics: []
}, {
    date: '2017-07-15',
    metrics: []
}, {
    date: '2017-07-16',
    metrics: []
}, {
    date: '2017-07-17',
    metrics: []
}, {
    date: '2017-07-18',
    metrics: [{
        name: '现金支付',
        value: 100
    }]
}, {
    date: '2017-07-19',
    metrics: []
}, {
    date: '2017-07-20',
    metrics: []
}, {
    date: '2017-07-21',
    metrics: []
}, {
    date: '2017-07-22',
    metrics: []
}, {
    date: '2017-07-23',
    metrics: []
}, {
    date: '2017-07-24',
    metrics: []
}, {
    date: '2017-07-25',
    metrics: []
}, {
    date: '2017-07-26',
    metrics: []
}, {
    date: '2017-07-27',
    metrics: []
}, {
    date: '2017-07-28',
    metrics: []
}, {
    date: '2017-07-29',
    metrics: []
}, {
    date: '2017-07-30',
    metrics: []
}, {
    date: '2017-07-31',
    metrics: []
}, {
    date: '2017-08-01',
    metrics: []
}, {
    date: '2017-08-02',
    metrics: []
}, {
    date: '2017-08-03',
    metrics: []
}, {
    date: '2017-08-04',
    metrics: []
}, {
    date: '2017-08-05',
    metrics: []
}, {
    date: '2017-08-06',
    metrics: []
}, {
    date: '2017-08-07',
    metrics: []
}, {
    date: '2017-08-08',
    metrics: []
}, {
    date: '2017-08-09',
    metrics: []
}, {
    date: '2017-08-10',
    metrics: []
}, {
    date: '2017-08-11',
    metrics: []
}, {
    date: '2017-08-12',
    metrics: []
}, {
    date: '2017-08-13',
    metrics: []
}, {
    date: '2017-08-14',
    metrics: []
}, {
    date: '2017-08-15',
    metrics: []
}, {
    date: '2017-08-16',
    metrics: []
}, {
    date: '2017-08-17',
    metrics: []
}, {
    date: '2017-08-18',
    metrics: [{
        name: '现金支付',
        value: 22.4
    }]
}, {
    date: '2017-08-19',
    metrics: []
}, {
    date: '2017-08-20',
    metrics: []
}, {
    date: '2017-08-21',
    metrics: []
}, {
    date: '2017-08-22',
    metrics: []
}, {
    date: '2017-08-23',
    metrics: []
}, {
    date: '2017-08-24',
    metrics: []
}, {
    date: '2017-08-25',
    metrics: []
}, {
    date: '2017-08-26',
    metrics: []
}, {
    date: '2017-08-27',
    metrics: []
}, {
    date: '2017-08-28',
    metrics: [{
        name: '现金支付',
        value: 150
    }]
}, {
    date: '2017-08-29',
    metrics: []
}, {
    date: '2017-08-30',
    metrics: []
}, {
    date: '2017-08-31',
    metrics: []
}, {
    date: '2017-09-01',
    metrics: []
}, {
    date: '2017-09-02',
    metrics: []
}, {
    date: '2017-09-03',
    metrics: []
}, {
    date: '2017-09-04',
    metrics: []
}, {
    date: '2017-09-05',
    metrics: []
}, {
    date: '2017-09-06',
    metrics: [{
        name: '现金支付',
        value: 200
    }]
}, {
    date: '2017-09-07',
    metrics: []
}, {
    date: '2017-09-08',
    metrics: []
}, {
    date: '2017-09-09',
    metrics: []
}, {
    date: '2017-09-10',
    metrics: []
}, {
    date: '2017-09-11',
    metrics: [{
        name: '现金支付',
        value: 10
    }]
}, {
    date: '2017-09-12',
    metrics: []
}, {
    date: '2017-09-13',
    metrics: []
}, {
    date: '2017-09-14',
    metrics: []
}, {
    date: '2017-09-15',
    metrics: []
}, {
    date: '2017-09-16',
    metrics: []
}, {
    date: '2017-09-17',
    metrics: []
}, {
    date: '2017-09-18',
    metrics: []
}, {
    date: '2017-09-19',
    metrics: []
}, {
    date: '2017-09-20',
    metrics: []
}, {
    date: '2017-09-21',
    metrics: []
}, {
    date: '2017-09-22',
    metrics: []
}, {
    date: '2017-09-23',
    metrics: []
}, {
    date: '2017-09-24',
    metrics: []
}, {
    date: '2017-09-25',
    metrics: []
}, {
    date: '2017-09-26',
    metrics: []
}, {
    date: '2017-09-27',
    metrics: []
}, {
    date: '2017-09-28',
    metrics: []
}, {
    date: '2017-09-29',
    metrics: []
}, {
    date: '2017-09-30',
    metrics: []
}, {
    date: '2017-10-01',
    metrics: []
}, {
    date: '2017-10-02',
    metrics: []
}, {
    date: '2017-10-03',
    metrics: []
}, {
    date: '2017-10-04',
    metrics: []
}, {
    date: '2017-10-05',
    metrics: []
}, {
    date: '2017-10-06',
    metrics: []
}, {
    date: '2017-10-07',
    metrics: []
}];

/***/ })

},[430])});;