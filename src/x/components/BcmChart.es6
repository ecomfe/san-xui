/**
 * @file components/BcmChart.es6
 * @author leeight
 */

import _ from 'lodash';
import {DataTypes, defineComponent} from 'san';
import mtools from 'inf-ria/utils/mtools';

import {create} from './util';
import Chart from './Chart';
import Select from './Select';
import Tip from './Tip';
import Button from './Button';
import Loading from './Loading';
import {$post} from '../../mixins/ajax';
import {asDialog} from './asDialog';

const cx = create('ui-bcmchart');
const kMetricName = 'metricName';

/* eslint-disable */
const template = `<div class="{{mainClass}}" style="{{mainStyle}}">
<div class="${cx('box')}">
    <h1 s-if="title && !withFilter">
        {{title}}
        <div on-click="showBigView" class="${cx('showbig')}" s-if="!loading && showbigable"></div>
    </h1>
    <div class="${cx('filter')}" s-if="withFilter">
        统计项：<ui-select datasource="{{ds.statistics}}" value="{=statistics=}" on-change="loadMetrics" />
        采样周期：<ui-select datasource="{{ds.period}}" value="{=period=}" on-change="loadMetrics" />
        最近：<ui-select datasource="{{ds.timeRange}}" value="{=time=}" on-change="loadMetrics" />
        <ui-tip skin="warning" message="最多支持1440个数据点的查询显示，请选择合适的采样周期和聚合时间段。" />
        <ui-button icon="refresh" on-click="loadMetrics" />
    </div>
    <div class="${cx('chart')}" style="{{chartStyle}}">
        <ui-loading s-if="!chartOption && loading" />
        <div class="${cx('error')}" s-elif="error">{{error | raw}}</div>
        <div class="${cx('no-data')}" s-elif="isEmpty">{{noData | raw}}</div>
        <ui-chart s-else option="{{chartOption}}" loading="{{loading}}" width="{{width}}" height="{{height}}" not-merge />
    </div>
</div>
</div>`;
/* eslint-enable */

function parseMetrics(metrics) {
    if (_.isArray(metrics)) {
        return metrics;
    }
    else if (metrics) {
        return mtools.parseMetrics(metrics);
    }
    return [];
}

function getDefaultUrl(apiType) {
    return apiType === 'dimensions'
        ? '/api/bcm/metricdata/v2/datas/dimensions'
        : '/api/bcm/metricdata/v2/datas/metricname';
}

const BcmChart = defineComponent({ // eslint-disable-line
    template,
    components: {
        'ui-select': Select,
        'ui-button': Button,
        'ui-tip': Tip,
        'ui-loading': Loading,
        'ui-chart': Chart
    },
    dataTypes: {
        title: DataTypes.string,

        /**
         * WTF??
         */
        lazy: DataTypes.bool,
        withFilter: DataTypes.bool,

        /**
         * 是否支持弹框放大的功能
         */
        showbigable: DataTypes.bool,

        /**
         * 没有数据的时候，需要展示的文案
         */
        noData: DataTypes.string,

        /**
         * 配合 noData 来用
         */
        isEmpty: DataTypes.bool,

        /**
         * Chart的宽度
         */
        width: DataTypes.number,

        /**
         * Chart的高度
         */
        height: DataTypes.number,

        /**
         * Chart的配置信息
         */
        chartOption: DataTypes.object,

        /**
         * 是否是加载中
         */
        loading: DataTypes.bool,

        /**
         * 如果出错了，展示的错误信息
         */
        error: DataTypes.any,

        /**
         * 获取监控数据回掉函数
         */
        requester: DataTypes.func,

        /**
         * 如BCE_BCC
         */
        scope: DataTypes.string,

        /**
         * 趋势图维度类型：多维度|多指标
         */
        apiType: DataTypes.string,

        /**
         * 维度信息，可以是字符串或者数组
         * InstanceId:1;Node:2|3
         * ["InstanceId:1;Node:2", "InstanceId:1;Node:3"]
         */
        dimensions: DataTypes.any,

        /**
         * 监控指标
         * 如：CPUUsagePercent(CPU使用率)
         */
        metrics: DataTypes.string,

        /**
         * 统计方式：
         *  average: '平均值'
         *  maximum: '最大值'
         *  minimum: '最小值'
         *  sum: '和值'
         *  sampleCount: '样本数'
         */
        statistics: DataTypes.string,

        /**
         * 聚合周期，单位秒
         */
        period: DataTypes.number,

        /**
         * 聚合区间，目前只支持最近多长时间
         * 如：1h：最近1小时
         */
        time: DataTypes.string,

        /**
         * 指标单位
         */
        unit: DataTypes.string
    },
    computed: {
        mainClass() {
            const klass = cx.mainClass(this);
            return klass;
        },
        mainStyle() {
            const style = cx.mainStyle(this);
            // width 和 height 是给 chart 设置的
            return _.omit(style, 'width', 'height');
        },
        chartStyle() {
            const style = cx.mainStyle(this);
            return _.pick(style, 'width', 'height');
        },
        metricConfig() {
            const metrics = this.data.get('metrics');
            const unit = this.data.get('unit');
            const statistics = this.data.get('statistics');

            return {
                unit,
                statistics,
                metrics: parseMetrics(metrics)
            };
        },
        conf() {
            // 这些参数实际上跟 https://cloud.baidu.com/doc/BCM/API.html#.E6.9F.A5.E8.AF.A2.E6.95.B0.E6.8D.AE.E6.8E.A5.E5.8F.A3 有关系
            // 保持跟之前的命名规则一致
            const conf = {};

            const statistics = this.data.get('statistics');
            const scope = this.data.get('scope');
            const time = this.data.get('time');
            const period = this.data.get('period');
            const apiType = this.data.get('apiType');
            const dimensions = this.data.get('dimensions');
            const metrics = this.data.get('metrics');

            const metricMap = parseMetrics(metrics);
            const {startTime, endTime} = mtools.getUTCTimeRange(time, +period);

            if (apiType === kMetricName) {
                conf.dimensions = dimensions;
                conf.metricNames = _.map(metricMap, o => o.value);
            }
            else {
                // 是数组，表示已经解析好了，不需要再次解析
                if (_.isArray(dimensions)) {
                    conf.dimensions = dimensions;
                }
                else {
                    conf.dimensions = mtools.parseDimensions(dimensions);
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
    initData() {
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
                statistics: [
                    {text: '平均值', value: 'average'},
                    {text: '和值', value: 'sum'},
                    {text: '最大值', value: 'maximum'},
                    {text: '最小值', value: 'minimum'},
                    {text: '样本数', value: 'sampleCount'}
                ],
                period: [
                    {text: '1分钟', value: 60},
                    {text: '5分钟', value: 300},
                    {text: '20分钟', value: 1200},
                    {text: '1小时', value: 3600},
                    {text: '6小时', value: 21600},
                    {text: '12小时', value: 43200},
                    {text: '1天', value: 86400}
                ],
                timeRange: [
                    {text: '1小时', value: '1h'},
                    {text: '6小时', value: '6h'},
                    {text: '1天', value: '1d'},
                    {text: '7天', value: '7d'},
                    {text: '14天', value: '14d'},
                    {text: '40天', value: '40d'}
                ]
            }
        };
    },
    inited() {
        const requester = this.data.get('requester');
        if (typeof requester !== 'function') {
            const apiType = this.data.get('apiType');
            const url = requester && typeof requester === 'string' ? requester : getDefaultUrl(apiType);
            this.data.set('requester', payload => $post(url, payload));
        }
    },
    attached() {
        this.loadMetrics();
    },

    loadMetrics() {
        const requester = this.data.get('requester');
        if (typeof requester !== 'function') {
            this.data.set('error', '请设置 requester 参数');
            return;
        }

        const payload = this.data.get('conf');
        this.data.set('loading', true);
        this.data.set('error', null);
        return requester(payload)
            .then(data => {
                this.data.set('loading', false);
                this.renderChart(data);
            })
            .catch(error => {
                this.data.set('loading', false);
                this.data.set('error', error && error.global ? error.global : error);
            });
    },

    renderChart(data) {
        const conf = this.data.get('conf');

        const isEmpty = mtools.isMonitorTrendEmpty(data.series, conf.statistics);
        this.data.set('isEmpty', isEmpty);
        if (isEmpty) {
            return;
        }

        mtools.adjustSeriesData(data, conf.statistics);
        const metricConfig = this.data.get('metricConfig');
        const chartOption = mtools.getChartOptions(data, metricConfig, {type: 'line'}, {period: conf.periodInSecond});
        this.data.set('chartOption', chartOption);
    },

    showBigView() {
        if (this.dialog) {
            this.dialog.dispose();
            this.dialog = null;
        }

        const DialogComponent = asDialog(BcmChart);
        const payload = _.defaults({withFilter: true, width: 740, height: 350}, this.data.get());
        const data = {
            title: payload.title,
            foot: false,
            width: 800,
            payload
        };
        const dialog = this.dialog = new DialogComponent({data});
        dialog.on('close', () => this.dialog = null);
        dialog.attach(document.body);
    },

    disposed() {
        if (this.dialog) {
            this.dialog.dispose();
        }
    }
});

export default BcmChart;

