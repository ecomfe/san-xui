define(["san","echarts"], function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_429__) { return webpackJsonp([1],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(5);

var _lodash2 = _interopRequireDefault(_lodash);

var _promise = __webpack_require__(10);

var _promise2 = _interopRequireDefault(_promise);

var _san = __webpack_require__(0);

var _BcmChart = __webpack_require__(427);

var _BcmChart2 = _interopRequireDefault(_BcmChart);

var _Row = __webpack_require__(4);

var _Row2 = _interopRequireDefault(_Row);

var _bcmData = __webpack_require__(431);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file demos/xui-bcmchart.js
 * @author leeight
 */

function delayRequester(data) {
    var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    return function () {
        return new _promise2.default(function (resolve, reject) {
            setTimeout(function () {
                return resolve(_lodash2.default.cloneDeep(data));
            }, ms);
        });
    };
}

/* eslint-disable */
var template = '<template>\n<!--x-row label="error">\n    <xui-bcmchart\n        title="CPU\u4F7F\u7528\u7387"\n        scope="BCE_BCC"\n        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"\n        metrics="vCPUUsagePercent(CPU\u4F7F\u7528\u7387)"\n        unit="\u767E\u5206\u6BD4"\n    />\n</x-row-->\n\n<x-row label="withFilter">\n    <xui-bcmchart\n        with-filter\n        width="{{800}}"\n        height="{{300}}"\n        title="CPU\u4F7F\u7528\u7387"\n        scope="BCE_BCC"\n        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"\n        metrics="vCPUUsagePercent(CPU\u4F7F\u7528\u7387)"\n        requester="{{requester1}}"\n        unit="\u767E\u5206\u6BD4"\n    />\n</x-row>\n\n<x-row label="default">\n    <xui-bcmchart\n        showbigable\n        title="CPU\u4F7F\u7528\u7387"\n        api-type="metricName"\n        scope="BCE_BCC"\n        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"\n        metrics="vCPUUsagePercent(CPU\u4F7F\u7528\u7387)"\n        requester="{{requester1}}"\n        unit="\u767E\u5206\u6BD4"\n    />\n\n    <xui-bcmchart\n        showbigable\n        title="\u6BCF\u79D2\u78C1\u76D8IO\u8BFB\u5199\u6B21\u6570"\n        api-type="metricName"\n        scope="BCE_BCC"\n        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"\n        metrics="vDiskReadOpCountPerSecond(\u6BCF\u79D2\u78C1\u76D8IO\u8BFB\u53D6\u6B21\u6570),vDiskWriteOpCountPerSecond(\u6BCF\u79D2\u78C1\u76D8IO\u5199\u5165\u6B21\u6570)"\n        requester="{{requester2}}"\n        unit="\u6B21/\u79D2"\n    />\n\n    <xui-bcmchart\n        showbigable\n        title="\u6BCF\u79D2\u78C1\u76D8IO\u8BFB\u5199\u91CF"\n        api-type="metricName"\n        scope="BCE_BCC"\n        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"\n        metrics="vDiskReadBytesPerSecond(\u6BCF\u79D2\u78C1\u76D8IO\u8BFB\u53D6\u91CF),vDiskWriteBytesPerSecond(\u6BCF\u79D2\u78C1\u76D8IO\u5199\u5165\u91CF)"\n        requester="{{requester3}}"\n        unit="\u5B57\u8282/\u79D2"\n    />\n\n    <xui-bcmchart\n        showbigable\n        title="\u7F51\u7EDC\u76D1\u63A7"\n        api-type="metricName"\n        scope="BCE_BCC"\n        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"\n        metrics="vNicInBytes(\u7F51\u5361\u8F93\u5165\u6D41\u91CF),vNicOutBytes(\u7F51\u5361\u8F93\u51FA\u6D41\u91CF),WebInBytes(\u4ECE\u5916\u7F51\u8FDB\u5165\u7684\u6D41\u91CF),WebOutBytes(\u6D41\u5411\u5916\u7F51\u7684\u6D41\u91CF)"\n        requester="{{requester4}}"\n        unit="\u5B57\u8282"\n    />\n\n    <xui-bcmchart\n        showbigable\n        title="\u51FA\u53E3\u5E26\u5BBD"\n        api-type="metricName"\n        scope="BCE_BCC"\n        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"\n        metrics="WebOutBitsPerSecond(\u51FA\u53E3\u5E26\u5BBD)"\n        requester="{{requester5}}"\n        unit="bps"\n    />\n\n    <xui-bcmchart\n        showbigable\n        title="\u5185\u5B58\u4F7F\u7528\u91CF"\n        api-type="metricName"\n        scope="BCE_BCC"\n        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"\n        metrics="MemUsedBytes(\u5185\u5B58\u4F7F\u7528\u91CF)"\n        requester="{{requester6}}"\n        unit="\u5B57\u8282"\n    />\n\n    <xui-bcmchart\n        showbigable\n        title="\u5185\u5B58\u4F7F\u7528\u7387"\n        api-type="metricName"\n        scope="BCE_BCC"\n        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"\n        metrics="MemUsedPercent(\u5185\u5B58\u4F7F\u7528\u7387)"\n        requester="{{requester7}}"\n        unit="\u767E\u5206\u6BD4"\n    />\n\n    <xui-bcmchart\n        showbigable\n        title="\u78C1\u76D8\u7A7A\u95F4\u4F7F\u7528\u91CF"\n        api-type="metricName"\n        scope="BCE_BCC"\n        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"\n        metrics="HomeUsedBytes(HOME\u78C1\u76D8\u7A7A\u95F4\u4F7F\u7528\u91CF),RootUsedBytes(\u6839\u78C1\u76D8\u7A7A\u95F4\u4F7F\u7528\u91CF)"\n        requester="{{requester8}}"\n        unit="\u5B57\u8282"\n    />\n</x-row>\n\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-bcmchart': _BcmChart2.default
    },
    initData: function initData() {
        return {
            requester1: delayRequester(_bcmData.Data1),
            requester2: delayRequester(_bcmData.Data2),
            requester3: delayRequester(_bcmData.Data3),
            requester4: delayRequester(_bcmData.Data4),
            requester5: delayRequester(_bcmData.Data5),
            requester6: delayRequester(_bcmData.Data6),
            requester7: delayRequester(_bcmData.Data7),
            requester8: delayRequester(_bcmData.Data8)
        };
    }
});

/***/ }),

/***/ 427:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(['\n<div class="{{mainClass}}" style="{{mainStyle}}">\n<div class="', '">\n    <h1 s-if="title && !withFilter">\n        {{title}}\n        <div on-click="showBigView" class="', '" s-if="!loading && showbigable"></div>\n    </h1>\n    <div class="', '" s-if="withFilter">\n        \u7EDF\u8BA1\u9879\uFF1A<ui-select datasource="{{ds.statistics}}" value="{=statistics=}" on-change="loadMetrics" />\n        \u91C7\u6837\u5468\u671F\uFF1A<ui-select datasource="{{ds.period}}" value="{=period=}" on-change="loadMetrics" />\n        \u6700\u8FD1\uFF1A<ui-select datasource="{{ds.timeRange}}" value="{=time=}" on-change="loadMetrics" />\n        <ui-tip skin="warning" message="\u6700\u591A\u652F\u63011440\u4E2A\u6570\u636E\u70B9\u7684\u67E5\u8BE2\u663E\u793A\uFF0C\u8BF7\u9009\u62E9\u5408\u9002\u7684\u91C7\u6837\u5468\u671F\u548C\u805A\u5408\u65F6\u95F4\u6BB5\u3002" />\n        <ui-button icon="refresh" on-click="loadMetrics" />\n    </div>\n    <div class="', '" style="{{chartStyle}}">\n        <ui-loading s-if="!chartOption && loading" />\n        <div class="', '" s-elif="error">{{error | raw}}</div>\n        <div class="', '" s-elif="isEmpty">{{noData | raw}}</div>\n        <ui-chart s-else option="{{chartOption}}" loading="{{loading}}" width="{{width}}" height="{{height}}" not-merge />\n    </div>\n</div>\n</div>'], ['\n<div class="{{mainClass}}" style="{{mainStyle}}">\n<div class="', '">\n    <h1 s-if="title && !withFilter">\n        {{title}}\n        <div on-click="showBigView" class="', '" s-if="!loading && showbigable"></div>\n    </h1>\n    <div class="', '" s-if="withFilter">\n        \u7EDF\u8BA1\u9879\uFF1A<ui-select datasource="{{ds.statistics}}" value="{=statistics=}" on-change="loadMetrics" />\n        \u91C7\u6837\u5468\u671F\uFF1A<ui-select datasource="{{ds.period}}" value="{=period=}" on-change="loadMetrics" />\n        \u6700\u8FD1\uFF1A<ui-select datasource="{{ds.timeRange}}" value="{=time=}" on-change="loadMetrics" />\n        <ui-tip skin="warning" message="\u6700\u591A\u652F\u63011440\u4E2A\u6570\u636E\u70B9\u7684\u67E5\u8BE2\u663E\u793A\uFF0C\u8BF7\u9009\u62E9\u5408\u9002\u7684\u91C7\u6837\u5468\u671F\u548C\u805A\u5408\u65F6\u95F4\u6BB5\u3002" />\n        <ui-button icon="refresh" on-click="loadMetrics" />\n    </div>\n    <div class="', '" style="{{chartStyle}}">\n        <ui-loading s-if="!chartOption && loading" />\n        <div class="', '" s-elif="error">{{error | raw}}</div>\n        <div class="', '" s-elif="isEmpty">{{noData | raw}}</div>\n        <ui-chart s-else option="{{chartOption}}" loading="{{loading}}" width="{{width}}" height="{{height}}" not-merge />\n    </div>\n</div>\n</div>']);

var _lodash = __webpack_require__(5);

var _lodash2 = _interopRequireDefault(_lodash);

var _san = __webpack_require__(0);

var _mtools = __webpack_require__(428);

var _mtools2 = _interopRequireDefault(_mtools);

var _util = __webpack_require__(2);

var _Chart = __webpack_require__(202);

var _Chart2 = _interopRequireDefault(_Chart);

var _Select = __webpack_require__(22);

var _Select2 = _interopRequireDefault(_Select);

var _Tip = __webpack_require__(54);

var _Tip2 = _interopRequireDefault(_Tip);

var _Button = __webpack_require__(6);

var _Button2 = _interopRequireDefault(_Button);

var _Loading = __webpack_require__(11);

var _Loading2 = _interopRequireDefault(_Loading);

var _ajax = __webpack_require__(224);

var _asDialog = __webpack_require__(214);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /**
                                                                                                                                                   * @file components/BcmChart.js
                                                                                                                                                   * @author leeight
                                                                                                                                                   */

var cx = (0, _util.create)('ui-bcmchart');
var kMetricName = 'metricName';

/* eslint-disable */
var template = (0, _util.html)(_templateObject, cx('box'), cx('showbig'), cx('filter'), cx('chart'), cx('error'), cx('no-data'));
/* eslint-enable */

function parseMetrics(metrics) {
    if (_lodash2.default.isArray(metrics)) {
        return metrics;
    } else if (metrics) {
        return _mtools2.default.parseMetrics(metrics);
    }
    return [];
}

function getDefaultUrl(apiType) {
    return apiType === 'dimensions' ? '/api/bcm/metricdata/v2/datas/dimensions' : '/api/bcm/metricdata/v2/datas/metricname';
}

var BcmChart = (0, _san.defineComponent)({ // eslint-disable-line
    template: template,
    components: {
        'ui-select': _Select2.default,
        'ui-button': _Button2.default,
        'ui-tip': _Tip2.default,
        'ui-loading': _Loading2.default,
        'ui-chart': _Chart2.default
    },
    dataTypes: {
        /**
         * BcmChart 的标题
         */
        title: _san.DataTypes.string,

        /**
         * WTF??
         */
        lazy: _san.DataTypes.bool,

        /**
         * 是否展示过滤的功能，一般在对话框的里面才会设置这个值
         * @default false
         */
        withFilter: _san.DataTypes.bool,

        /**
         * 是否支持弹框放大的功能
         * @default false
         */
        showbigable: _san.DataTypes.bool,

        /**
         * 没有数据的时候，需要展示的文案
         */
        noData: _san.DataTypes.string,

        /**
         * 配合 noData 来用
         */
        isEmpty: _san.DataTypes.bool,

        /**
         * Chart的宽度
         * @default 550
         */
        width: _san.DataTypes.number,

        /**
         * Chart的高度
         * @default 200
         */
        height: _san.DataTypes.number,

        /**
         * 是否是加载中
         * @default true
         */
        loading: _san.DataTypes.bool,

        /**
         * 如果出错了，展示的错误信息
         */
        error: _san.DataTypes.any,

        /**
         * 获取监控数据回掉函数<br>
         * function(payload:object):Promise.&lt;{series: any[]}, Error&gt;
         */
        requester: _san.DataTypes.func,

        /**
         * 如BCE_BCC
         */
        scope: _san.DataTypes.string,

        /**
         * 趋势图维度类型：多维度|多指标，可以设置的值有 metricName, dimensions
         * @default metricName
         */
        apiType: _san.DataTypes.string,

        /**
         * 维度信息，可以是字符串或者数组
         * InstanceId:1;Node:2|3
         * ["InstanceId:1;Node:2", "InstanceId:1;Node:3"]
         */
        dimensions: _san.DataTypes.any,

        /**
         * 监控指标
         * 如：CPUUsagePercent(CPU使用率)
         * @default ''
         */
        metrics: _san.DataTypes.string,

        /**
         * 统计方式：
         *  average: '平均值'
         *  maximum: '最大值'
         *  minimum: '最小值'
         *  sum: '和值'
         *  sampleCount: '样本数'
         * @default average
         */
        statistics: _san.DataTypes.string,

        /**
         * 聚合周期，单位秒
         * @default 60
         */
        period: _san.DataTypes.number,

        /**
         * 聚合区间，目前只支持最近多长时间
         * 如：1h：最近1小时
         * @default 1h
         */
        time: _san.DataTypes.string,

        /**
         * 指标单位
         * @default ''
         */
        unit: _san.DataTypes.string
    },
    computed: {
        mainClass: function mainClass() {
            var klass = cx.mainClass(this);
            return klass;
        },
        mainStyle: function mainStyle() {
            var style = cx.mainStyle(this);
            // width 和 height 是给 chart 设置的
            return _lodash2.default.omit(style, 'width', 'height');
        },
        chartStyle: function chartStyle() {
            var style = cx.mainStyle(this);
            return _lodash2.default.pick(style, 'width', 'height');
        },
        metricConfig: function metricConfig() {
            var metrics = this.data.get('metrics');
            var unit = this.data.get('unit');
            var statistics = this.data.get('statistics');

            return {
                unit: unit,
                statistics: statistics,
                metrics: parseMetrics(metrics)
            };
        },
        conf: function conf() {
            // 这些参数实际上跟 https://cloud.baidu.com/doc/BCM/API.html#.E6.9F.A5.E8.AF.A2.E6.95.B0.E6.8D.AE.E6.8E.A5.E5.8F.A3 有关系
            // 保持跟之前的命名规则一致
            var conf = {};

            var statistics = this.data.get('statistics');
            var scope = this.data.get('scope');
            var time = this.data.get('time');
            var period = this.data.get('period');
            var apiType = this.data.get('apiType');
            var dimensions = this.data.get('dimensions');
            var metrics = this.data.get('metrics');

            var metricMap = parseMetrics(metrics);

            var _mtools$getUTCTimeRan = _mtools2.default.getUTCTimeRange(time, +period),
                startTime = _mtools$getUTCTimeRan.startTime,
                endTime = _mtools$getUTCTimeRan.endTime;

            if (apiType === kMetricName) {
                conf.dimensions = dimensions;
                conf.metricNames = _lodash2.default.map(metricMap, function (o) {
                    return o.value;
                });
            } else {
                // 是数组，表示已经解析好了，不需要再次解析
                if (_lodash2.default.isArray(dimensions)) {
                    conf.dimensions = dimensions;
                } else {
                    conf.dimensions = _mtools2.default.parseDimensions(dimensions);
                }
                conf.metricName = metricMap[0].value;
            }

            conf.statistics = statistics;
            conf.scope = scope;
            conf.periodInSecond = +period;
            conf.startTime = startTime;
            conf.endTime = endTime;

            /**
            if (scope === 'BCE_BOS' && 'x' === 'space') {
                delete conf.dimensions;
            }
            */

            return conf;
        }
    },
    initData: function initData() {
        return {
            lazy: true,
            withFilter: false,
            unit: '',
            metrics: '',
            width: 550,
            height: 200,
            apiType: kMetricName,
            period: 60,
            time: '1h',
            statistics: 'average',
            noData: '暂无数据<p style="font-size:12px;color:#aaa;">请检查是否安装了BCM客户端</p>',
            ds: {
                statistics: [{ text: '平均值', value: 'average' }, { text: '和值', value: 'sum' }, { text: '最大值', value: 'maximum' }, { text: '最小值', value: 'minimum' }, { text: '样本数', value: 'sampleCount' }],
                period: [{ text: '1分钟', value: 60 }, { text: '5分钟', value: 300 }, { text: '20分钟', value: 1200 }, { text: '1小时', value: 3600 }, { text: '6小时', value: 21600 }, { text: '12小时', value: 43200 }, { text: '1天', value: 86400 }],
                timeRange: [{ text: '1小时', value: '1h' }, { text: '6小时', value: '6h' }, { text: '1天', value: '1d' }, { text: '7天', value: '7d' }, { text: '14天', value: '14d' }, { text: '40天', value: '40d' }]
            }
        };
    },
    inited: function inited() {
        var requester = this.data.get('requester');
        if (typeof requester !== 'function') {
            var apiType = this.data.get('apiType');
            var url = requester && typeof requester === 'string' ? requester : getDefaultUrl(apiType);
            this.data.set('requester', function (payload) {
                return (0, _ajax.$post)(url, payload);
            });
        }
    },
    attached: function attached() {
        this.loadMetrics();
    },
    loadMetrics: function loadMetrics() {
        var _this = this;

        var requester = this.data.get('requester');
        if (typeof requester !== 'function') {
            this.data.set('error', '请设置 requester 参数');
            return;
        }

        var payload = this.data.get('conf');
        this.data.set('loading', true);
        this.data.set('error', null);
        return requester(payload).then(function (data) {
            _this.data.set('loading', false);
            _this.renderChart(data);
        }).catch(function (error) {
            _this.data.set('loading', false);
            _this.data.set('error', error && error.global ? error.global : error);
        });
    },
    renderChart: function renderChart(data) {
        var conf = this.data.get('conf');

        var isEmpty = _mtools2.default.isMonitorTrendEmpty(data.series, conf.statistics);
        this.data.set('isEmpty', isEmpty);
        if (isEmpty) {
            return;
        }

        _mtools2.default.adjustSeriesData(data, conf.statistics);
        var metricConfig = this.data.get('metricConfig');
        var chartOption = _mtools2.default.getChartOptions(data, metricConfig, { type: 'line' }, { period: conf.periodInSecond });
        this.data.set('chartOption', chartOption);
    },
    showBigView: function showBigView() {
        var _this2 = this;

        if (this.dialog) {
            this.dialog.dispose();
            this.dialog = null;
        }

        var DialogComponent = (0, _asDialog.asDialog)(BcmChart);
        var payload = _lodash2.default.defaults({ withFilter: true, width: 740, height: 350 }, this.data.get());
        var data = {
            title: payload.title,
            foot: false,
            width: 800,
            payload: payload
        };
        var dialog = this.dialog = new DialogComponent({ data: data });
        dialog.on('close', function () {
            return _this2.dialog = null;
        });
        dialog.attach(document.body);
    },
    disposed: function disposed() {
        if (this.dialog) {
            this.dialog.dispose();
        }
    }
});

exports.default = BcmChart;

/***/ }),

/***/ 428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_i18n__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_echarts__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_echarts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_echarts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__formatter__ = __webpack_require__(430);
/**
 * @file inf-ria/utils/mtools.es6
 * @author leeight
 */









const IS_V3 = /^3\./.test(__WEBPACK_IMPORTED_MODULE_4_echarts___default.a.version);

/**
 * 将utc时间转换为本地时间
 *
 * @param {number} time 时间戳
 * @param {string} pattern 格式化字符串
 * @return {string}
 */
function utc2local(time, pattern) {
    pattern = pattern || 'MM-DD HH:mm';
    return __WEBPACK_IMPORTED_MODULE_0_moment___default()(time).format(pattern);
}

/**
 * 将本地时间戳转换为utc时间字符串
 *
 * @param {number} time 时间戳
 * @param {string} pattern 格式化字符串
 * @return {string}
 */
function local2utc(time, pattern) {
    pattern = pattern || 'YYYY-MM-DDTHH:mm:ss';
    return __WEBPACK_IMPORTED_MODULE_0_moment___default()(time).utc().format(pattern) + 'Z';
}

/**
 * 获取当前的utc时间区间
 *
 * @param {string} timeRange 时间段标识
 * @param {number} period 时间区间
 * @return {Object}
 */
function getUTCTimeRange(timeRange, period) {
    let mt = timeRange.match(/(\d+)(\w+)/);
    let value = mt[1];
    let unit = mt[2];
    let m = __WEBPACK_IMPORTED_MODULE_0_moment___default()();

    let endTime = local2utc(m);
    let startTime = '';

    if (arguments.length === 1) {
        // 格式化时间：秒为0，起始时间加1分钟，解决时间区间超过范围问题
        startTime = local2utc(m.add('m', 1).subtract(unit, value), 'YYYY-MM-DDTHH:mm:00');
    }
    else {
        if (period < 60 * 60) {
            startTime = local2utc(__WEBPACK_IMPORTED_MODULE_0_moment___default()(m.add('m', 1).subtract(unit, value).format('YYYY-MM-DDTHH:mm:00')));
        }
        else if (period < 60 * 60 * 24) {
            startTime = local2utc(__WEBPACK_IMPORTED_MODULE_0_moment___default()(m.add('h', 1).subtract(unit, value).format('YYYY-MM-DDTHH:00:00')));
        }
        else {
            startTime = local2utc(__WEBPACK_IMPORTED_MODULE_0_moment___default()(m.add('d', 1).subtract(unit, value).format('YYYY-MM-DDT00:00:00')));
        }
    }
    return {
        endTime: endTime,
        startTime: startTime
    };
}

/**
 * 对目标字符串按gbk编码截取字节长度
 *
 * @param {string} source 目标字符串
 * @param {number} length 需要截取的字节长度
 * @param {string} [tail] 追加字符串,可选.
 * @return {string}
 */
function truncate(source, length, tail) {
    source = String(source);
    tail = tail || '';
    let byteLength = source.replace('/[^\x00-\xff]/g', '**').length;
    if (length < 0 || byteLength <= length) {
        return source;
    }

    length = length - 2;
    source = source.substr(0, length).replace(/([^\x00-\xff])/g, '\x241 ') // 双字节字符替换成两个
        .substr(0, length) // 截取长度
        .replace(/[^\x00-\xff]$/, '') // 去掉临界双字节字符
        .replace(/([^\x00-\xff]) /g, '\x241'); // 还原
    return source + tail;
}

let chartTheme = [
    '#4aaaff', '#f2605d', '#01B09B', '#E74684',
    '#6EC50F', '#FE863D',
    '#A45BFF', '#F6D622', '#0AC1D7', '#B569D4'
];

/**
 * 趋势图默认配置
 *
 * @type {Object}
 */
let defaultChartOptions = {
    color: chartTheme,
    calculable: false,
    animation: false,
    grid: {
        x: 65,
        x2: 35,
        y: 50,
        y2: IS_V3 ? 60 : 50
    }
};
let statisticsMap = {
    average: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["default"])('平均值'),
    maximum: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["default"])('最大值'),
    minimum: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["default"])('最小值'),
    sum: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["default"])('和值'),
    sampleCount: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["default"])('样本数')
};

/**
 * 与默认配置进行合并，得到最终的配置信息
 *
 * @param {Object} opt 扩充对象
 * @return {Object} 最终配置
 */
function mergeChartOptions(opt) {
    return __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.extend({}, defaultChartOptions, opt);
}

/**
 * 将后端返回的数据，转换为echarts可以使用的配置信息
 *
 * @param {Object} data
 *  {series:[{name:'监控项名称', data:[数据点]}], category:[]}
 * @param {Object} metric 监控项配置
 *  - metric.unit {String}
 *  - metric.statistics {String}
 *  - metric.names {Object}
 *  - metric.names[value] = name
 *  - metric.metrics {Array}
 *  - metric.src 针对枚举类型的数值
 * @param {Object} opt
 *  - opt.type 图表类型line, bar, pie ...
 *  - opt.chart 图表特殊配置
 * @param {Object} addition 附加条件
 * @return {Object}
 */
function getChartOptions(data, metric, opt, addition) {
    let category = [];
    let unit = metric.unit;
    let zoomStart = 0;
    let legend = [];
    let tmpData = {};
    let seriesOpt = {};
    let seriesData = [];
    opt = opt || {
        type: 'line'
    };
    if (opt.type === 'line') {
        seriesOpt = {
            type: 'line',
            smooth: true,
            symbol: 'none',
            symbolSize: 2,
            showAllSymbol: true,
            itemStyle: {
                borderWidth: 1,
                normal: {
                    // areaStyle: {
                    //     type: 'default'
                    // },
                    lineStyle: {
                        width: 1
                    }
                }
            }
        };
    }
    else if (opt.type === 'bar') {
        seriesOpt = {
            type: 'bar'
        };
    }

    seriesOpt = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.extend(seriesOpt, opt.chart || {});

    let spliteNumber = 5;
    let yAxisFormatter;
    let yAxisMax;
    let tooltipFormatter = function (params) {
        let arr = [];
        if (params.length > 0) {
            arr.push(params[0].name + ' (' + statisticsMap[metric.statistics] + ')');
        }

        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(params, function (item) {
            let label = truncate(item.seriesName, 22, '…');
            arr.push(label + '：' + item.value);
        });
        return arr.join('<br/>');
    };
    if (data.category.length === 0) {
        category.push(utc2local(__WEBPACK_IMPORTED_MODULE_0_moment___default()().utc()).replace(' ', '\n'));
        category.push(utc2local()); // .replace(' ', '\n'));
        category.push(utc2local()); // .replace(' ', '\n'));
    }
    else {
        let pattern = 'MM-DD HH:mm';
        if (addition && addition.period) {
            if (addition.period >= 60 * 60 * 24) {
                pattern = 'MM-DD';
            }

            // 精确到毫秒的格式
            if (addition.period < 1) {
                pattern = 'MM-DD HH:mm:ss.SSS';
            }
        }

        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(data.category, function (item) {
            category.push(utc2local(item, pattern));
        });
    }
    if (metric.nullPointMode === 0) {
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(data.series, function (item) {
            let values = [];

            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(item.data, function (value) {
                if (typeof value === 'undefined') {
                    value = 0;
                }

                values.push(value);
            });
            if (values.length === 0) {
                for (let i = 0, len = category.length; i < len; i++) {
                    values[i] = 0;
                }
            }

            tmpData[item.name] = values;
        });
    }
    else {
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(data.series, function (item) {
            let values = [];
            let tmpvalue = '';

            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(item.data, function (value) {
                if (typeof value === 'undefined') {
                    value = '-';
                }

                // 对于孤立数据点，以圆点的方式展示
                if (tmpvalue === '-' && value !== '-') {
                    values.push({
                        value: value,
                        symbol: 'emptyCircle'
                    });
                }
                else {
                    values.push(value);
                    if (value !== '-' && values.length > 1) {
                        values[values.length - 2] = tmpvalue;
                    }
                }
                tmpvalue = value;
            });
            if (values.length === 0) {
                for (let i = 0, len = category.length; i < len; i++) {
                    values[i] = '-';
                }
            }

            tmpData[item.name] = values;
        });
    }

    if (addition && addition.dataZoom) {
        zoomStart = addition.dataZoom.start;
    }
    else {
        zoomStart = Math.max((1 - 100 / category.length) * 100, 0);
    }

    let metricNames = {};
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(metric.metrics, function (item, key) {
        metricNames[item.value] = item.name;
    });
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(tmpData, function (item, key) {
        let name = metricNames[key] || key;
        let obj = __WEBPACK_IMPORTED_MODULE_3_jquery___default.a.extend(true, {}, seriesOpt, {
            name: name,
            data: item
        });
        legend.push(name);
        seriesData.push(obj);
    });
    if (metric.statistics === 'sampleCount') {
        unit = '个';
        tooltipFormatter = function (params) {
            let str = '';
            if (params.length > 0) {
                str += params[0].name + ' (' + statisticsMap[metric.statistics] + ')<br/>';
            }

            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(params, function (item, index) {
                str += truncate(item.seriesName, 22, '…') + '：';
                let value = item.value;
                if (isNaN(value)) {
                    value = 0;
                }

                str += value + '<br/>';
            });
            return str;
        };
    }
    // 状态的监控项需对返回值映射成文本
    else if (unit === 'enum') {
        unit = '';
        let enums = metric.src || {};
        let count = __WEBPACK_IMPORTED_MODULE_1_lodash___default()(enums).value().length;
        if (count < 6) {
            spliteNumber = count - 1;
        }

        tooltipFormatter = function (params) {
            let str = '';
            if (params.length > 0) {
                str += params[0].name;
            }

            str += ' (' + statisticsMap[metric.statistics] + ')';
            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(params, function (item, index) {
                let value = item.value;
                str += '<br/>' + truncate(item.seriesName, 22, '…') + '：' + value;
                if (value !== '-') {
                    str += '（' + (enums[value] || value) + '）';
                }

            });
            return str;
        };
    }
    else if (unit === Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["default"])('字节') || unit === Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["default"])('字节/秒')) {
        let suffix = (unit === Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["default"])('字节') ? '' : '/s');
        tooltipFormatter = function (params) {
            let str = '';
            if (params.length > 0) {
                str += params[0].name + ' (' + statisticsMap[metric.statistics] + ')<br/>';
            }

            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(params, function (item, index) {
                str += truncate(item.seriesName, 22, '…') + '：';
                let value = item.value;
                let prefix;
                let valueStr = '';
                if (isNaN(value)) {
                    valueStr = '-';
                }
                else {
                    prefix = value < 0 ? '-' : '';
                    value = Math.abs(value);

                    value = __WEBPACK_IMPORTED_MODULE_5__formatter__["a" /* default */].bytes(value, 2, metric.byteUnit);
                    valueStr = prefix + value + suffix;
                }
                str += valueStr + '<br/>';
            });
            return str;
        };

        yAxisFormatter = function (value) {
            let prefix = value < 0 ? '-' : '';
            value = Math.abs(value);
            value = __WEBPACK_IMPORTED_MODULE_5__formatter__["a" /* default */].bytes(value, 1, metric.byteUnit);
            return prefix + value + suffix;
        };
    }
    else if (unit === 'bps') {
        tooltipFormatter = function (params) {
            let str = '';
            if (params.length > 0) {
                str += params[0].name + ' (' + statisticsMap[metric.statistics] + ')<br/>';
            }

            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(params, function (item, index) {
                str += truncate(item.seriesName, 22, '…') + '：';
                let value = item.value;
                let prefix;
                let valueStr = '';
                if (isNaN(value)) {
                    valueStr = '-';
                }
                else {
                    prefix = value < 0 ? '-' : '';
                    value = Math.abs(value);

                    value = __WEBPACK_IMPORTED_MODULE_5__formatter__["a" /* default */].bits(value, 2, metric.bitUnit).toUpperCase();
                    valueStr = prefix + value + unit;
                }
                str += valueStr + '<br/>';
            });
            return str;
        };

        yAxisFormatter = function (value) {
            let prefix = value < 0 ? '-' : '';
            value = Math.abs(value);
            // 保留1位小数的话
            // 当纵坐标是0 0.125 0.15 0.175 0.2的时候
            // 就会出现三个0.1
            value = __WEBPACK_IMPORTED_MODULE_5__formatter__["a" /* default */].bits(value, 2, metric.bitUnit).toUpperCase();
            return prefix + value;
        };
    }
    else if (unit === Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["default"])('百分比')) {
        tooltipFormatter = function (params) {
            let str = '';
            if (params.length > 0) {
                str += params[0].name + ' (' + statisticsMap[metric.statistics] + ')<br/>';
            }

            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(params, function (item, index) {
                str += truncate(item.seriesName, 22, '…')
                    + '：' + item.value + (item.value === '-' ? '' : '%') + '<br/>';
            });
            return str;
        };
        yAxisFormatter = '{value}%';
        yAxisMax = 100;
    }
    else {
        tooltipFormatter = function (params) {
            let str = '';
            if (params.length > 0) {
                str = params[0].name + ' (' + statisticsMap[metric.statistics] + ')<br/>';
            }

            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(params, function (item) {
                str += truncate(item.seriesName, 22, '…') + '：';
                let value = item.value;
                let valueStr = '';
                if (isNaN(value)) {
                    valueStr = '-';
                }
                else {
                    valueStr = item.value;
                }
                str += valueStr + '<br/>';
            });
            return str;
        };

        yAxisFormatter = function (value) {
            return __WEBPACK_IMPORTED_MODULE_5__formatter__["a" /* default */].number(value, 0);
        };
    }

    let opts = {
        legend: {
            data: legend,
            x: 'center',
            padding: 2,
            itemGap: 2
        },
        tooltip: {
            trigger: 'axis',
            formatter: tooltipFormatter,
            textStyle: {
                fontSize: 12
            }
        },
        dataZoom: {
            start: zoomStart,
            show: true,
            height: 20,
            filterColor: 'rgba(74,170,255, 0.3)'
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: opt.type === 'bar',
                data: category,
                splitLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: unit || '',
                max: yAxisMax,
                splitNumber: spliteNumber,
                axisLabel: {
                    formatter: yAxisFormatter
                },
                splitLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                }
            }
        ],
        series: seriesData
    };
    let forceOpt = opt.chartOptions || {};
    deepExtend(opts, forceOpt);
    return mergeChartOptions(opts);
}

function getPieChartOptions(config) {
    let options = {
        tooltip: {
            trigger: 'item',
            formatter: '{b} <br/> {c} ({d}%)'
        },
        color: [
            '#4aaaff', '#f2605d', '#F6D622',
            '#6EC50F', '#FE863D', '#B569D4',
            '#A45BFF', '#01B09B', '#E74684', '#0AC1D7'
        ],
        legend: {
            orient: 'vertical',
            x: 'right',
            y: 'center',
            data: config.legend
        },
        series: [
            {
                type: 'pie',
                radius: '65%',
                center: ['30%', '50%'],
                minAngle: 1,
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                data: config.series
            }
        ]
    };
    return options;
}

/**
 * 深度扩展
 *
 * @param {Object} src 目标对象
 * @param {Object} opt 扩充对象
 */
function deepExtend(src, opt) {
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(opt, function (item, key) {
        if (__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isArray(item)) {
            deepExtend(src[key] = src[key] || [], item);
        }
        else if (__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isObject(item)) {
            deepExtend(src[key] = src[key] || {}, item);
        }
        else {
            src[key] = item;
        }
    });
}

/**
 * 判断给定的数据点是否为空（空即表示没有数据）
 *
 * @param {Array} series 数据点
 * @return {boolean}
 */
function isSeriesEmpty(series) {
    let empty = true;
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(series, function (item, i) {
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(item.data, function (value) {
            if (typeof value !== 'undefined') {
                empty = false;
                return false;
            }

        });
        return empty;
    });
    return empty;
}

/**
 * 转换数据为按图分组
 *
 * @param {Array} metrics 监控项列表
 * @return {Object}
 */
function adjustToChartMetric(metrics) {
    let chartMetric = {};
    let defaultStatistics = 'average';
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(metrics, function (item, key) {
        chartMetric[key] = {
            metrics: [],
            unit: item.unit,
            names: {},
            nullPointMode: item.nullPointMode || null, // 可选值： 0， null(显示为 '-')
            statistics: item.statistics || defaultStatistics
        };
        item.chartType && (chartMetric[key].type = item.chartType);
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(item.metrics, function (metric, i) {
            let value = metric.value;
            chartMetric[key].metrics.push(value);
            chartMetric[key].names[value] = metric.name;
        });

    });
    return chartMetric;
}

/**
 * 数据转换，只获取data中属性为key的数值
 *
 * @param {Object} result 目标对象
 * @param {string} key 过滤值
 * @return {*}
 */
function adjustSeriesData(result, key) {
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(result.series, function (item) {
        item.data = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.map(item.data, key);
    });
    return result;
}

/**
 * 翻译事件状态变化
 *
 * @param {string} eventType 事件类型
 * @param {string} eventData 事件对象
 * @return {string}
 */
function transferAlarmEventType(eventType, eventData) {
    let EVENT_TYPE = {
        ConfigurationUpdate: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["default"])('配置变更'),
        StateUpdate: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["default"])('状态变化'),
        Action: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["default"])('触发报警')
    };
    let type = EVENT_TYPE[eventType] || eventType;
    let ico = '';
    if (eventData) {
        let data = {};
        try {
            data = new Function('return ' + eventData)();
        }
        catch (e) {}

        switch (data.curAlarmStatus) {
            case 'NORMAL':
                ico = 'normal';
                break;
            case 'ABNORMAL':
                ico = 'abnormal';
                break;
            case 'INSUFFICIENT_DATA':
                ico = 'insufficient';
                break;
        }
    }

    return '<span class="alarmStateUpdate"><span class="' + ico + '">' + type + '</span></span>';
}

/**
 * 过滤metrics配置
 *
 * @param {Array} metrics 监控项列表
 * @param {string} filterName 过滤字段名
 * @param {string} value 过滤字段值
 */
function filterMetrics(metrics, filterName, value) {
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(metrics, function (item, k) {
        if (item.filter === filterName) {
            for (let i = item.metrics.length - 1; i >= 0; i--) {
                if (item.metrics[i].filter === filterName && item.metrics[i].filterValue !== value) {
                    item.metrics.splice(i, 1);
                }

            }
            if (item.metrics.length === 0) {
                delete metrics[k];
            }
        }

    });
}

/**
 * 判断一个趋势图是否为空
 *
 * @param {Array} series 数据点
 * @param {string} statistics 统计类型
 * @return {boolean}
 */
function isMonitorTrendEmpty(series, statistics) {
    let empty = true;
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(series, function (item, i) {
        let itemData = [];
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(item.data, function (v, k) {
            let value = v[statistics];
            if (typeof value !== 'undefined') {
                itemData.push(value);
            }

        });
        if (itemData.length > 0) {
            empty = false;
        }

    });
    return empty;
}

/**
  * 解析metric
  *  格式: 指标名称(中文名称)，多个之间用逗号分割
  *  如：CPUUsagePercent(CPU使用率),DiskUsageCount(磁盘使用量)
  *
  * @param {string} str 目标字符串
  * @return {Array} 指标对象数组
  */
function parseMetrics(str) {
    let reg = /([^\(]+)(?:\((.+)\))*/;
    let ret = [];
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(str.split(','), function (item) {
        if (item) {
            let tmp = item.match(reg);
            ret.push({
                name: tmp[2] || tmp[1],
                value: tmp[1]
            });
        }

    });
    return ret;
}

/**
 * 解析Dimension
 *  格式: 维度key1:维度值1|维度值2;维度key2:维度值3
 *  如：TaskId:1;Idc:jx|nj
 *
 * @param {string} str 目标字符串
 * @return {Array} 维度列表 ["TaskId:1;Idc:jx", "TaskId:1;Idc:nj"]
 */
function parseDimensions(str) {
    let darr = [];
    let arr = str.split(';');
    function xc(src, dist) {
        let ret = [];
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(dist.value, function (item) {
            if (src.length === 0) {
                ret.push([dist.key + ':' + item]);
            }
            else {
                __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(src, function (it) {
                    let tmp = [];
                    [].push.apply(tmp, it);
                    tmp.push(dist.key + ':' + item);
                    ret.push(tmp);
                });
            }
        });
        return ret;
    }
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(arr, function (item) {
        if (item) {
            let it = item.split(':');
            if (it[1]) {
                let key = it[0];
                let value = it[1].split('|');
                darr.push({
                    key: key,
                    value: value
                });
            }
        }

    });
    let src = [];
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(darr, function (item) {
        src = xc(src, item);
    });
    src = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.map(src, function (item) {
        return item.join(';');
    });
    return src;
}

/* eslint-disable */
/* harmony default export */ __webpack_exports__["default"] = ({
    utc2local: utc2local,
    local2utc: local2utc,
    getUTCTimeRange: getUTCTimeRange,
    getChartOptions: getChartOptions,
    getPieChartOptions: getPieChartOptions,
    isSeriesEmpty: isSeriesEmpty,
    adjustToChartMetric: adjustToChartMetric,
    adjustSeriesData: adjustSeriesData,
    formatBytes: __WEBPACK_IMPORTED_MODULE_5__formatter__["a" /* default */].bytes,
    transferAlarmEventType: transferAlarmEventType,
    filterMetrics: filterMetrics,
    parseMetrics: parseMetrics,
    parseDimensions: parseDimensions,
    isMonitorTrendEmpty: isMonitorTrendEmpty
});


/***/ }),

/***/ 429:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_429__;

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_i18n__ = __webpack_require__(15);
/**
 * @file inf-ria/utils/formatter.es6
 * @author leeight
 */



const kByteUnit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];
const kBitUnit = ['', 'k', 'm', 'g', 't', 'p', 'e', 'z', 'y', 'b'];

/* harmony default export */ __webpack_exports__["a"] = ({
    percent(value) {
        return value + '%';
    },
    bytes(value, number = 2, byteUnit = 1024) {
        let idx = 0;
        let len = kByteUnit.length - 1;
        while (value >= byteUnit && idx < len) {
            value = value / byteUnit;
            idx++;
        }
        return value.toFixed(number) + kByteUnit[idx];
    },
    bits(value, number = 2, bitUnit = 1024) {
        let idx = 0;
        let len = kBitUnit.length - 1;
        while (value >= bitUnit && idx < len) {
            value = value / bitUnit;
            idx++;
        }
        return value.toFixed(number) + kBitUnit[idx];
    },
    number(value, number = 1) {
        if (value < 10000) {
            return value;
        }
        // 15000、20000，当number为0的时候，都是2万
        // 所以需要判断一下value是否能整除，不能整除的至少保留一位小数
        else if (value < 1000000) {
            return (value / 10000).toFixed((value % 10000) === 0 ? number : Math.max(1, number)) + Object(__WEBPACK_IMPORTED_MODULE_0_inf_i18n__["default"])('万');
        }
        else if (value < 10000000) {
            return (value / 1000000).toFixed((value % 1000000) === 0 ? number : Math.max(1, number)) + Object(__WEBPACK_IMPORTED_MODULE_0_inf_i18n__["default"])('百万');
        }

        return (value / 10000000.0).toFixed((value % 10000000) === 0 ? number : Math.max(1, number)) + Object(__WEBPACK_IMPORTED_MODULE_0_inf_i18n__["default"])('千万');
    }
});


/***/ }),

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @file examples/bcmData.js
 * @author leeight
 */

/* eslint-disable */

var Data1 = exports.Data1 = {
    "category": ["2014-05-26T07:10:00Z", "2014-05-26T07:11:00Z", "2014-05-26T07:12:00Z", "2014-05-26T07:13:00Z", "2014-05-26T07:14:00Z", "2014-05-26T07:15:00Z", "2014-05-26T07:16:00Z", "2014-05-26T07:17:00Z", "2014-05-26T07:18:00Z", "2014-05-26T07:19:00Z", "2014-05-26T07:20:00Z", "2014-05-26T07:21:00Z", "2014-05-26T07:22:00Z", "2014-05-26T07:23:00Z", "2014-05-26T07:24:00Z", "2014-05-26T07:25:00Z", "2014-05-26T07:26:00Z", "2014-05-26T07:27:00Z", "2014-05-26T07:28:00Z", "2014-05-26T07:29:00Z", "2014-05-26T07:30:00Z", "2014-05-26T07:31:00Z", "2014-05-26T07:32:00Z", "2014-05-26T07:33:00Z", "2014-05-26T07:34:00Z", "2014-05-26T07:35:00Z", "2014-05-26T07:36:00Z", "2014-05-26T07:37:00Z", "2014-05-26T07:38:00Z", "2014-05-26T07:39:00Z", "2014-05-26T07:40:00Z", "2014-05-26T07:41:00Z", "2014-05-26T07:42:00Z", "2014-05-26T07:43:00Z", "2014-05-26T07:44:00Z", "2014-05-26T07:45:00Z", "2014-05-26T07:46:00Z", "2014-05-26T07:47:00Z", "2014-05-26T07:48:00Z", "2014-05-26T07:49:00Z", "2014-05-26T07:50:00Z", "2014-05-26T07:51:00Z", "2014-05-26T07:52:00Z", "2014-05-26T07:53:00Z", "2014-05-26T07:54:00Z", "2014-05-26T07:55:00Z", "2014-05-26T07:56:00Z", "2014-05-26T07:57:00Z", "2014-05-26T07:58:00Z", "2014-05-26T07:59:00Z"],
    "series": [{
        "name": "vCPUUsagePercent",
        "data": [{
            "average": "41"
        }, {
            "average": "18"
        }, {
            "average": "27"
        }, {
            "average": "24"
        }, {
            "average": "44"
        }, {
            "average": "23"
        }, {
            "average": "26"
        }, {
            "average": "26"
        }, {
            "average": "29"
        }, {
            "average": "40"
        }, {
            "average": "43"
        }, {
            "average": "26"
        }, {
            "average": "36"
        }, {
            "average": "25"
        }, {
            "average": "29"
        }, {
            "average": "28"
        }, {
            "average": "23"
        }, {
            "average": "23"
        }, {
            "average": "20"
        }, {
            "average": "19"
        }, {
            "average": "45"
        }, {
            "average": "23"
        }, {
            "average": "21"
        }, {
            "average": "17"
        }, {
            "average": "20"
        }, {
            "average": "40"
        }, {
            "average": "32"
        }, {
            "average": "30"
        }, {
            "average": "29"
        }, {
            "average": "28"
        }, {
            "average": "24"
        }, {
            "average": "37"
        }, {
            "average": "36"
        }, {
            "average": "42"
        }, {
            "average": "43"
        }, {
            "average": "37"
        }, {
            "average": "41"
        }, {
            "average": "19"
        }, {
            "average": "33"
        }, {
            "average": "43"
        }, {
            "average": "18"
        }, {
            "average": "35"
        }, {
            "average": "41"
        }, {
            "average": "34"
        }, {
            "average": "37"
        }, {
            "average": "38"
        }, {
            "average": "29"
        }, {
            "average": "37"
        }, {
            "average": "42"
        }, {
            "average": "29"
        }]
    }]
};

var Data2 = exports.Data2 = {
    "category": ["2014-05-26T07:10:00Z", "2014-05-26T07:11:00Z", "2014-05-26T07:12:00Z", "2014-05-26T07:13:00Z", "2014-05-26T07:14:00Z", "2014-05-26T07:15:00Z", "2014-05-26T07:16:00Z", "2014-05-26T07:17:00Z", "2014-05-26T07:18:00Z", "2014-05-26T07:19:00Z", "2014-05-26T07:20:00Z", "2014-05-26T07:21:00Z", "2014-05-26T07:22:00Z", "2014-05-26T07:23:00Z", "2014-05-26T07:24:00Z", "2014-05-26T07:25:00Z", "2014-05-26T07:26:00Z", "2014-05-26T07:27:00Z", "2014-05-26T07:28:00Z", "2014-05-26T07:29:00Z", "2014-05-26T07:30:00Z", "2014-05-26T07:31:00Z", "2014-05-26T07:32:00Z", "2014-05-26T07:33:00Z", "2014-05-26T07:34:00Z", "2014-05-26T07:35:00Z", "2014-05-26T07:36:00Z", "2014-05-26T07:37:00Z", "2014-05-26T07:38:00Z", "2014-05-26T07:39:00Z", "2014-05-26T07:40:00Z", "2014-05-26T07:41:00Z", "2014-05-26T07:42:00Z", "2014-05-26T07:43:00Z", "2014-05-26T07:44:00Z", "2014-05-26T07:45:00Z", "2014-05-26T07:46:00Z", "2014-05-26T07:47:00Z", "2014-05-26T07:48:00Z", "2014-05-26T07:49:00Z", "2014-05-26T07:50:00Z", "2014-05-26T07:51:00Z", "2014-05-26T07:52:00Z", "2014-05-26T07:53:00Z", "2014-05-26T07:54:00Z", "2014-05-26T07:55:00Z", "2014-05-26T07:56:00Z", "2014-05-26T07:57:00Z", "2014-05-26T07:58:00Z", "2014-05-26T07:59:00Z"],
    "series": [{
        "name": "vDiskReadOpCountPerSecond",
        "data": [{
            "average": "89"
        }, {
            "average": "105"
        }, {
            "average": "95"
        }, {
            "average": "91"
        }, {
            "average": "106"
        }, {
            "average": "87"
        }, {
            "average": "93"
        }, {
            "average": "96"
        }, {
            "average": "77"
        }, {
            "average": "84"
        }, {
            "average": "89"
        }, {
            "average": "88"
        }, {
            "average": "79"
        }, {
            "average": "93"
        }, {
            "average": "91"
        }, {
            "average": "97"
        }, {
            "average": "96"
        }, {
            "average": "92"
        }, {
            "average": "82"
        }, {
            "average": "94"
        }, {
            "average": "83"
        }, {
            "average": "88"
        }, {
            "average": "89"
        }, {
            "average": "98"
        }, {
            "average": "98"
        }, {
            "average": "98"
        }, {
            "average": "95"
        }, {
            "average": "80"
        }, {
            "average": "94"
        }, {
            "average": "94"
        }, {
            "average": "77"
        }, {
            "average": "100"
        }, {
            "average": "95"
        }, {
            "average": "92"
        }, {
            "average": "85"
        }, {
            "average": "88"
        }, {
            "average": "98"
        }, {
            "average": "94"
        }, {
            "average": "98"
        }, {
            "average": "105"
        }, {
            "average": "95"
        }, {
            "average": "85"
        }, {
            "average": "90"
        }, {
            "average": "97"
        }, {
            "average": "88"
        }, {
            "average": "102"
        }, {
            "average": "83"
        }, {
            "average": "89"
        }, {
            "average": "93"
        }, {
            "average": "104"
        }]
    }, {
        "name": "vDiskWriteOpCountPerSecond",
        "data": [{
            "average": "37"
        }, {
            "average": "57"
        }, {
            "average": "49"
        }, {
            "average": "31"
        }, {
            "average": "33"
        }, {
            "average": "29"
        }, {
            "average": "43"
        }, {
            "average": "37"
        }, {
            "average": "33"
        }, {
            "average": "54"
        }, {
            "average": "49"
        }, {
            "average": "31"
        }, {
            "average": "46"
        }, {
            "average": "43"
        }, {
            "average": "36"
        }, {
            "average": "58"
        }, {
            "average": "35"
        }, {
            "average": "29"
        }, {
            "average": "55"
        }, {
            "average": "51"
        }, {
            "average": "55"
        }, {
            "average": "44"
        }, {
            "average": "38"
        }, {
            "average": "33"
        }, {
            "average": "55"
        }, {
            "average": "29"
        }, {
            "average": "38"
        }, {
            "average": "58"
        }, {
            "average": "51"
        }, {
            "average": "38"
        }, {
            "average": "38"
        }, {
            "average": "46"
        }, {
            "average": "31"
        }, {
            "average": "47"
        }, {
            "average": "35"
        }, {
            "average": "54"
        }, {
            "average": "49"
        }, {
            "average": "40"
        }, {
            "average": "39"
        }, {
            "average": "34"
        }, {
            "average": "39"
        }, {
            "average": "34"
        }, {
            "average": "51"
        }, {
            "average": "50"
        }, {
            "average": "44"
        }, {
            "average": "47"
        }, {
            "average": "47"
        }, {
            "average": "52"
        }, {
            "average": "31"
        }, {
            "average": "29"
        }]
    }]
};

var Data3 = exports.Data3 = {
    "category": ["2014-05-26T07:10:00Z", "2014-05-26T07:11:00Z", "2014-05-26T07:12:00Z", "2014-05-26T07:13:00Z", "2014-05-26T07:14:00Z", "2014-05-26T07:15:00Z", "2014-05-26T07:16:00Z", "2014-05-26T07:17:00Z", "2014-05-26T07:18:00Z", "2014-05-26T07:19:00Z", "2014-05-26T07:20:00Z", "2014-05-26T07:21:00Z", "2014-05-26T07:22:00Z", "2014-05-26T07:23:00Z", "2014-05-26T07:24:00Z", "2014-05-26T07:25:00Z", "2014-05-26T07:26:00Z", "2014-05-26T07:27:00Z", "2014-05-26T07:28:00Z", "2014-05-26T07:29:00Z", "2014-05-26T07:30:00Z", "2014-05-26T07:31:00Z", "2014-05-26T07:32:00Z", "2014-05-26T07:33:00Z", "2014-05-26T07:34:00Z", "2014-05-26T07:35:00Z", "2014-05-26T07:36:00Z", "2014-05-26T07:37:00Z", "2014-05-26T07:38:00Z", "2014-05-26T07:39:00Z", "2014-05-26T07:40:00Z", "2014-05-26T07:41:00Z", "2014-05-26T07:42:00Z", "2014-05-26T07:43:00Z", "2014-05-26T07:44:00Z", "2014-05-26T07:45:00Z", "2014-05-26T07:46:00Z", "2014-05-26T07:47:00Z", "2014-05-26T07:48:00Z", "2014-05-26T07:49:00Z", "2014-05-26T07:50:00Z", "2014-05-26T07:51:00Z", "2014-05-26T07:52:00Z", "2014-05-26T07:53:00Z", "2014-05-26T07:54:00Z", "2014-05-26T07:55:00Z", "2014-05-26T07:56:00Z", "2014-05-26T07:57:00Z", "2014-05-26T07:58:00Z", "2014-05-26T07:59:00Z"],
    "series": [{
        "name": "vDiskReadBytesPerSecond",
        "data": [{
            "average": "56"
        }, {
            "average": "45"
        }, {
            "average": "52"
        }, {
            "average": "67"
        }, {
            "average": "49"
        }, {
            "average": "67"
        }, {
            "average": "41"
        }, {
            "average": "49"
        }, {
            "average": "52"
        }, {
            "average": "45"
        }, {
            "average": "53"
        }, {
            "average": "48"
        }, {
            "average": "52"
        }, {
            "average": "67"
        }, {
            "average": "49"
        }, {
            "average": "68"
        }, {
            "average": "44"
        }, {
            "average": "59"
        }, {
            "average": "50"
        }, {
            "average": "61"
        }, {
            "average": "55"
        }, {
            "average": "66"
        }, {
            "average": "66"
        }, {
            "average": "59"
        }, {
            "average": "63"
        }, {
            "average": "49"
        }, {
            "average": "66"
        }, {
            "average": "60"
        }, {
            "average": "53"
        }, {
            "average": "65"
        }, {
            "average": "52"
        }, {
            "average": "55"
        }, {
            "average": "46"
        }, {
            "average": "57"
        }, {
            "average": "65"
        }, {
            "average": "51"
        }, {
            "average": "70"
        }, {
            "average": "51"
        }, {
            "average": "59"
        }, {
            "average": "56"
        }, {
            "average": "61"
        }, {
            "average": "42"
        }, {
            "average": "47"
        }, {
            "average": "67"
        }, {
            "average": "53"
        }, {
            "average": "69"
        }, {
            "average": "54"
        }, {
            "average": "53"
        }, {
            "average": "63"
        }, {
            "average": "52"
        }]
    }, {
        "name": "vDiskWriteBytesPerSecond",
        "data": [{
            "average": "88"
        }, {
            "average": "101"
        }, {
            "average": "89"
        }, {
            "average": "85"
        }, {
            "average": "99"
        }, {
            "average": "93"
        }, {
            "average": "109"
        }, {
            "average": "94"
        }, {
            "average": "97"
        }, {
            "average": "111"
        }, {
            "average": "104"
        }, {
            "average": "97"
        }, {
            "average": "95"
        }, {
            "average": "112"
        }, {
            "average": "103"
        }, {
            "average": "103"
        }, {
            "average": "105"
        }, {
            "average": "109"
        }, {
            "average": "93"
        }, {
            "average": "97"
        }, {
            "average": "94"
        }, {
            "average": "92"
        }, {
            "average": "107"
        }, {
            "average": "113"
        }, {
            "average": "99"
        }, {
            "average": "84"
        }, {
            "average": "93"
        }, {
            "average": "85"
        }, {
            "average": "87"
        }, {
            "average": "108"
        }, {
            "average": "89"
        }, {
            "average": "89"
        }, {
            "average": "101"
        }, {
            "average": "103"
        }, {
            "average": "111"
        }, {
            "average": "90"
        }, {
            "average": "93"
        }, {
            "average": "110"
        }, {
            "average": "88"
        }, {
            "average": "111"
        }, {
            "average": "90"
        }, {
            "average": "112"
        }, {
            "average": "109"
        }, {
            "average": "105"
        }, {
            "average": "103"
        }, {
            "average": "91"
        }, {
            "average": "87"
        }, {
            "average": "94"
        }, {
            "average": "110"
        }, {
            "average": "93"
        }]
    }]
};

var Data4 = exports.Data4 = {
    "category": ["2014-05-26T07:10:00Z", "2014-05-26T07:11:00Z", "2014-05-26T07:12:00Z", "2014-05-26T07:13:00Z", "2014-05-26T07:14:00Z", "2014-05-26T07:15:00Z", "2014-05-26T07:16:00Z", "2014-05-26T07:17:00Z", "2014-05-26T07:18:00Z", "2014-05-26T07:19:00Z", "2014-05-26T07:20:00Z", "2014-05-26T07:21:00Z", "2014-05-26T07:22:00Z", "2014-05-26T07:23:00Z", "2014-05-26T07:24:00Z", "2014-05-26T07:25:00Z", "2014-05-26T07:26:00Z", "2014-05-26T07:27:00Z", "2014-05-26T07:28:00Z", "2014-05-26T07:29:00Z", "2014-05-26T07:30:00Z", "2014-05-26T07:31:00Z", "2014-05-26T07:32:00Z", "2014-05-26T07:33:00Z", "2014-05-26T07:34:00Z", "2014-05-26T07:35:00Z", "2014-05-26T07:36:00Z", "2014-05-26T07:37:00Z", "2014-05-26T07:38:00Z", "2014-05-26T07:39:00Z", "2014-05-26T07:40:00Z", "2014-05-26T07:41:00Z", "2014-05-26T07:42:00Z", "2014-05-26T07:43:00Z", "2014-05-26T07:44:00Z", "2014-05-26T07:45:00Z", "2014-05-26T07:46:00Z", "2014-05-26T07:47:00Z", "2014-05-26T07:48:00Z", "2014-05-26T07:49:00Z", "2014-05-26T07:50:00Z", "2014-05-26T07:51:00Z", "2014-05-26T07:52:00Z", "2014-05-26T07:53:00Z", "2014-05-26T07:54:00Z", "2014-05-26T07:55:00Z", "2014-05-26T07:56:00Z", "2014-05-26T07:57:00Z", "2014-05-26T07:58:00Z", "2014-05-26T07:59:00Z"],
    "series": [{
        "name": "vNicInBytes",
        "data": [{
            "average": "89"
        }, {
            "average": "99"
        }, {
            "average": "97"
        }, {
            "average": "105"
        }, {
            "average": "96"
        }, {
            "average": "81"
        }, {
            "average": "78"
        }, {
            "average": "85"
        }, {
            "average": "94"
        }, {
            "average": "98"
        }, {
            "average": "80"
        }, {
            "average": "77"
        }, {
            "average": "95"
        }, {
            "average": "79"
        }, {
            "average": "83"
        }, {
            "average": "88"
        }, {
            "average": "100"
        }, {
            "average": "97"
        }, {
            "average": "88"
        }, {
            "average": "102"
        }, {
            "average": "103"
        }, {
            "average": "81"
        }, {
            "average": "106"
        }, {
            "average": "81"
        }, {
            "average": "81"
        }, {
            "average": "100"
        }, {
            "average": "81"
        }, {
            "average": "94"
        }, {
            "average": "80"
        }, {
            "average": "101"
        }, {
            "average": "88"
        }, {
            "average": "86"
        }, {
            "average": "78"
        }, {
            "average": "89"
        }, {
            "average": "84"
        }, {
            "average": "87"
        }, {
            "average": "98"
        }, {
            "average": "99"
        }, {
            "average": "96"
        }, {
            "average": "103"
        }, {
            "average": "104"
        }, {
            "average": "88"
        }, {
            "average": "83"
        }, {
            "average": "79"
        }, {
            "average": "104"
        }, {
            "average": "100"
        }, {
            "average": "81"
        }, {
            "average": "94"
        }, {
            "average": "85"
        }, {
            "average": "85"
        }]
    }, {
        "name": "vNicOutBytes",
        "data": [{
            "average": "84"
        }, {
            "average": "93"
        }, {
            "average": "76"
        }, {
            "average": "90"
        }, {
            "average": "99"
        }, {
            "average": "100"
        }, {
            "average": "98"
        }, {
            "average": "102"
        }, {
            "average": "87"
        }, {
            "average": "83"
        }, {
            "average": "88"
        }, {
            "average": "102"
        }, {
            "average": "74"
        }, {
            "average": "86"
        }, {
            "average": "97"
        }, {
            "average": "101"
        }, {
            "average": "96"
        }, {
            "average": "75"
        }, {
            "average": "76"
        }, {
            "average": "83"
        }, {
            "average": "75"
        }, {
            "average": "91"
        }, {
            "average": "92"
        }, {
            "average": "81"
        }, {
            "average": "86"
        }, {
            "average": "90"
        }, {
            "average": "89"
        }, {
            "average": "76"
        }, {
            "average": "92"
        }, {
            "average": "102"
        }, {
            "average": "91"
        }, {
            "average": "89"
        }, {
            "average": "76"
        }, {
            "average": "91"
        }, {
            "average": "96"
        }, {
            "average": "88"
        }, {
            "average": "87"
        }, {
            "average": "88"
        }, {
            "average": "90"
        }, {
            "average": "96"
        }, {
            "average": "80"
        }, {
            "average": "92"
        }, {
            "average": "89"
        }, {
            "average": "80"
        }, {
            "average": "75"
        }, {
            "average": "81"
        }, {
            "average": "93"
        }, {
            "average": "97"
        }, {
            "average": "94"
        }, {
            "average": "95"
        }]
    }, {
        "name": "WebInBytes",
        "data": [{
            "average": "6"
        }, {
            "average": "2"
        }, {
            "average": "3"
        }, {
            "average": "24"
        }, {
            "average": "12"
        }, {
            "average": "21"
        }, {
            "average": "4"
        }, {
            "average": "17"
        }, {
            "average": "22"
        }, {
            "average": "27"
        }, {
            "average": "1"
        }, {
            "average": "26"
        }, {
            "average": "11"
        }, {
            "average": "16"
        }, {
            "average": "12"
        }, {
            "average": "22"
        }, {
            "average": "12"
        }, {
            "average": "30"
        }, {
            "average": "14"
        }, {
            "average": "26"
        }, {
            "average": "29"
        }, {
            "average": "29"
        }, {
            "average": "20"
        }, {
            "average": "24"
        }, {
            "average": "14"
        }, {
            "average": "6"
        }, {
            "average": "19"
        }, {
            "average": "29"
        }, {
            "average": "30"
        }, {
            "average": "27"
        }, {
            "average": "20"
        }, {
            "average": "24"
        }, {
            "average": "19"
        }, {
            "average": "23"
        }, {
            "average": "4"
        }, {
            "average": "30"
        }, {
            "average": "7"
        }, {
            "average": "7"
        }, {
            "average": "22"
        }, {
            "average": "22"
        }, {
            "average": "22"
        }, {
            "average": "28"
        }, {
            "average": "17"
        }, {
            "average": "24"
        }, {
            "average": "3"
        }, {
            "average": "20"
        }, {
            "average": "3"
        }, {
            "average": "4"
        }, {
            "average": "20"
        }, {
            "average": "28"
        }]
    }, {
        "name": "WebOutBytes",
        "data": [{
            "average": "25"
        }, {
            "average": "39"
        }, {
            "average": "39"
        }, {
            "average": "24"
        }, {
            "average": "24"
        }, {
            "average": "27"
        }, {
            "average": "28"
        }, {
            "average": "24"
        }, {
            "average": "21"
        }, {
            "average": "23"
        }, {
            "average": "33"
        }, {
            "average": "32"
        }, {
            "average": "24"
        }, {
            "average": "14"
        }, {
            "average": "37"
        }, {
            "average": "23"
        }, {
            "average": "36"
        }, {
            "average": "16"
        }, {
            "average": "34"
        }, {
            "average": "28"
        }, {
            "average": "34"
        }, {
            "average": "42"
        }, {
            "average": "18"
        }, {
            "average": "24"
        }, {
            "average": "26"
        }, {
            "average": "23"
        }, {
            "average": "37"
        }, {
            "average": "33"
        }, {
            "average": "32"
        }, {
            "average": "35"
        }, {
            "average": "18"
        }, {
            "average": "33"
        }, {
            "average": "38"
        }, {
            "average": "33"
        }, {
            "average": "40"
        }, {
            "average": "19"
        }, {
            "average": "21"
        }, {
            "average": "27"
        }, {
            "average": "42"
        }, {
            "average": "31"
        }, {
            "average": "24"
        }, {
            "average": "19"
        }, {
            "average": "35"
        }, {
            "average": "17"
        }, {
            "average": "42"
        }, {
            "average": "27"
        }, {
            "average": "21"
        }, {
            "average": "34"
        }, {
            "average": "28"
        }, {
            "average": "15"
        }]
    }]
};

var Data5 = exports.Data5 = {
    "category": ["2014-05-26T07:10:00Z", "2014-05-26T07:11:00Z", "2014-05-26T07:12:00Z", "2014-05-26T07:13:00Z", "2014-05-26T07:14:00Z", "2014-05-26T07:15:00Z", "2014-05-26T07:16:00Z", "2014-05-26T07:17:00Z", "2014-05-26T07:18:00Z", "2014-05-26T07:19:00Z", "2014-05-26T07:20:00Z", "2014-05-26T07:21:00Z", "2014-05-26T07:22:00Z", "2014-05-26T07:23:00Z", "2014-05-26T07:24:00Z", "2014-05-26T07:25:00Z", "2014-05-26T07:26:00Z", "2014-05-26T07:27:00Z", "2014-05-26T07:28:00Z", "2014-05-26T07:29:00Z", "2014-05-26T07:30:00Z", "2014-05-26T07:31:00Z", "2014-05-26T07:32:00Z", "2014-05-26T07:33:00Z", "2014-05-26T07:34:00Z", "2014-05-26T07:35:00Z", "2014-05-26T07:36:00Z", "2014-05-26T07:37:00Z", "2014-05-26T07:38:00Z", "2014-05-26T07:39:00Z", "2014-05-26T07:40:00Z", "2014-05-26T07:41:00Z", "2014-05-26T07:42:00Z", "2014-05-26T07:43:00Z", "2014-05-26T07:44:00Z", "2014-05-26T07:45:00Z", "2014-05-26T07:46:00Z", "2014-05-26T07:47:00Z", "2014-05-26T07:48:00Z", "2014-05-26T07:49:00Z", "2014-05-26T07:50:00Z", "2014-05-26T07:51:00Z", "2014-05-26T07:52:00Z", "2014-05-26T07:53:00Z", "2014-05-26T07:54:00Z", "2014-05-26T07:55:00Z", "2014-05-26T07:56:00Z", "2014-05-26T07:57:00Z", "2014-05-26T07:58:00Z", "2014-05-26T07:59:00Z"],
    "series": [{
        "name": "WebOutBitsPerSecond",
        "data": [{
            "average": "77"
        }, {
            "average": "80"
        }, {
            "average": "84"
        }, {
            "average": "67"
        }, {
            "average": "73"
        }, {
            "average": "81"
        }, {
            "average": "70"
        }, {
            "average": "63"
        }, {
            "average": "67"
        }, {
            "average": "67"
        }, {
            "average": "65"
        }, {
            "average": "69"
        }, {
            "average": "63"
        }, {
            "average": "65"
        }, {
            "average": "72"
        }, {
            "average": "89"
        }, {
            "average": "78"
        }, {
            "average": "78"
        }, {
            "average": "63"
        }, {
            "average": "69"
        }, {
            "average": "76"
        }, {
            "average": "88"
        }, {
            "average": "82"
        }, {
            "average": "86"
        }, {
            "average": "84"
        }, {
            "average": "78"
        }, {
            "average": "65"
        }, {
            "average": "70"
        }, {
            "average": "74"
        }, {
            "average": "60"
        }, {
            "average": "78"
        }, {
            "average": "70"
        }, {
            "average": "63"
        }, {
            "average": "80"
        }, {
            "average": "68"
        }, {
            "average": "66"
        }, {
            "average": "65"
        }, {
            "average": "78"
        }, {
            "average": "87"
        }, {
            "average": "65"
        }, {
            "average": "75"
        }, {
            "average": "71"
        }, {
            "average": "68"
        }, {
            "average": "65"
        }, {
            "average": "82"
        }, {
            "average": "60"
        }, {
            "average": "75"
        }, {
            "average": "72"
        }, {
            "average": "75"
        }, {
            "average": "87"
        }]
    }]
};

var Data6 = exports.Data6 = {
    "category": [],
    "series": [{
        "name": "MemUsedBytes",
        "data": []
    }]
};

var Data7 = exports.Data7 = {
    "category": ["2014-05-26T07:10:00Z", "2014-05-26T07:11:00Z", "2014-05-26T07:12:00Z", "2014-05-26T07:13:00Z", "2014-05-26T07:14:00Z", "2014-05-26T07:15:00Z", "2014-05-26T07:16:00Z", "2014-05-26T07:17:00Z", "2014-05-26T07:18:00Z", "2014-05-26T07:19:00Z", "2014-05-26T07:20:00Z", "2014-05-26T07:21:00Z", "2014-05-26T07:22:00Z", "2014-05-26T07:23:00Z", "2014-05-26T07:24:00Z", "2014-05-26T07:25:00Z", "2014-05-26T07:26:00Z", "2014-05-26T07:27:00Z", "2014-05-26T07:28:00Z", "2014-05-26T07:29:00Z", "2014-05-26T07:30:00Z", "2014-05-26T07:31:00Z", "2014-05-26T07:32:00Z", "2014-05-26T07:33:00Z", "2014-05-26T07:34:00Z", "2014-05-26T07:35:00Z", "2014-05-26T07:36:00Z", "2014-05-26T07:37:00Z", "2014-05-26T07:38:00Z", "2014-05-26T07:39:00Z", "2014-05-26T07:40:00Z", "2014-05-26T07:41:00Z", "2014-05-26T07:42:00Z", "2014-05-26T07:43:00Z", "2014-05-26T07:44:00Z", "2014-05-26T07:45:00Z", "2014-05-26T07:46:00Z", "2014-05-26T07:47:00Z", "2014-05-26T07:48:00Z", "2014-05-26T07:49:00Z", "2014-05-26T07:50:00Z", "2014-05-26T07:51:00Z", "2014-05-26T07:52:00Z", "2014-05-26T07:53:00Z", "2014-05-26T07:54:00Z", "2014-05-26T07:55:00Z", "2014-05-26T07:56:00Z", "2014-05-26T07:57:00Z", "2014-05-26T07:58:00Z", "2014-05-26T07:59:00Z"],
    "series": [{
        "name": "MemUsedPercent",
        "data": [{
            "average": "106"
        }, {
            "average": "123"
        }, {
            "average": "96"
        }, {
            "average": "99"
        }, {
            "average": "102"
        }, {
            "average": "98"
        }, {
            "average": "103"
        }, {
            "average": "120"
        }, {
            "average": "100"
        }, {
            "average": "114"
        }, {
            "average": "114"
        }, {
            "average": "122"
        }, {
            "average": "113"
        }, {
            "average": "114"
        }, {
            "average": "102"
        }, {
            "average": "107"
        }, {
            "average": "119"
        }, {
            "average": "99"
        }, {
            "average": "94"
        }, {
            "average": "107"
        }, {
            "average": "122"
        }, {
            "average": "101"
        }, {
            "average": "101"
        }, {
            "average": "105"
        }, {
            "average": "115"
        }, {
            "average": "93"
        }, {
            "average": "104"
        }, {
            "average": "120"
        }, {
            "average": "99"
        }, {
            "average": "103"
        }, {
            "average": "121"
        }, {
            "average": "97"
        }, {
            "average": "123"
        }, {
            "average": "107"
        }, {
            "average": "123"
        }, {
            "average": "94"
        }, {
            "average": "106"
        }, {
            "average": "106"
        }, {
            "average": "104"
        }, {
            "average": "103"
        }, {
            "average": "98"
        }, {
            "average": "110"
        }, {
            "average": "107"
        }, {
            "average": "113"
        }, {
            "average": "121"
        }, {
            "average": "98"
        }, {
            "average": "105"
        }, {
            "average": "103"
        }, {
            "average": "103"
        }, {
            "average": "98"
        }]
    }]
};

var Data8 = exports.Data8 = {
    "category": [],
    "series": [{
        "name": "HomeUsedBytes",
        "data": []
    }, {
        "name": "RootUsedBytes",
        "data": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }]
};

/***/ })

},[426])});;