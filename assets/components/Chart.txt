/**
 * @file components/Chart.js
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';

import ResizeObserver from './ResizeObserver';
import {create} from './util';
import {loadThirdParty} from './helper';

const cx = create('ui-chart');

const template = '<div class="{{mainClass}}" style="{{mainStyle}}"></div>';

export default defineComponent({
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
        loading: DataTypes.bool,
        autoResize: DataTypes.bool,
        width: DataTypes.number,
        height: DataTypes.number,
        option: DataTypes.object,
        notMerge: DataTypes.bool
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
        // 这里把 echarts 当做参数传递进来，是因为不想直接写 import echarts from 'inf-ria/echarts'
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

        const amdModules = [
            'echarts',
            'zrender/vml/vml',
            'echarts/chart/pie',
            'echarts/chart/bar',
            'echarts/chart/line',
            'echarts/chart/lines',
            'echarts/chart/map',
            'echarts/chart/scatter',
            'echarts/component/legendScroll',
            'echarts/component/legend',
            'echarts/component/dataZoom',
            'echarts/component/tooltip',
            'echarts/component/title',
            'echarts/component/grid',
            'echarts/component/toolbox',
            'echarts/component/markPoint',
            'echarts/component/markLine'
        ];
        loadThirdParty('echarts', amdModules, 300).then(echarts => {
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
            this.observer = new ResizeObserver(entries => {
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
});
