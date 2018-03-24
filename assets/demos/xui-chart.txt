/**
 * @file demos/xui-chart.js
 * @author leeight
 */

import u from 'lodash';
import {defineComponent} from 'san';
import {Row, Chart, ToastLabel} from 'san-xui';

import {metrics} from './config';

/* eslint-disable */
const template = `<template>
<xui-toastlabel>
需要在页面中引入 echarts 的代码，有两种方式：<pre>
1. 手工引入
<code>&lt;script src="http://echarts.baidu.com/dist/echarts.min.js"&gt;&lt;/script&gt;</code>

2. AMD Loader自动引入 <strong style="color:red"> esl 的版本需要是2.2.0+ 才可以在 bundles 里面支持正则表达式的配置 </strong>
<code>require.config({
  bundles: {
    echarts: [/^(echarts|zrender)/]
  },
  paths: {
    'echarts': 'https://cdn.bdstatic.com/console/dist/affaebd/dep/echarts/3.7.0/echarts+zrender.min'
  }
});</code>
</pre>
</xui-toastlabel>

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

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-toastlabel': ToastLabel,
        'xui-chart': Chart
    },
    filters: {
        gen_options_line(metrics) {  // eslint-disable-line
            const xAxis = u.map(metrics, o => o.date);
            const yAxisValue = u.map(metrics, item => {
                const value = u.reduce(item.metrics, (prev, o) => prev + o.value, 0);
                return +(value.toFixed(2));
            });

            const yAxis = [
                {
                    color: 'rgb(21, 148, 242)',
                    label: '消费趋势',
                    value: yAxisValue
                }
            ];
            const series = u.map(yAxis, item => {
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
                metrics
            }
        };
    }
});
