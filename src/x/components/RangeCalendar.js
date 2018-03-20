/**
 * @file RangeCalendar.js
 * @author leeight
 */
import moment from 'moment';
import {DataTypes, defineComponent} from 'san';

import {create} from './util';
import Button from './Button';
import Layer from './Layer';
import MonthView from './MonthView';
import {asInput} from './asInput';

const cx = create('ui-rangecalendar');

function getDayValue(bd = 1, ed = 2) {
    return function () {
        const begin = moment().subtract(bd, 'day').toDate();
        const end = moment().subtract(ed, 'day').endOf('day').toDate();
        return {begin, end};
    };
}

function getLastWeekValue() {
    return function () {
        const now = new Date();
        const begin = new Date(now);
        const end = new Date(now);

        const startOfWeek = 1; // 周一为第一天;

        if (begin.getDay() < startOfWeek % 7) {
            begin.setDate(
                begin.getDate() - 14 + startOfWeek - begin.getDay()
            );
        }
        else {
            begin.setDate(
                begin.getDate() - 7 - begin.getDay() + startOfWeek % 7
            );
        }
        begin.setHours(0, 0, 0, 0);

        end.setFullYear(
            begin.getFullYear(),
            begin.getMonth(),
            begin.getDate() + 6
        );
        end.setHours(23, 59, 59, 999);

        return {begin, end};
    };
}

function getMonthValue() {
    return function () {
        const begin = moment().startOf('month').toDate();
        const end = moment().endOf('day').toDate();
        return {begin, end};
    };
}

function getLastMonthValue() {
    return function () {
        const begin = moment().subtract('month', 1).startOf('month').toDate();
        const end = moment().startOf('month').subtract('day', 1).endOf('day').toDate();
        return {begin, end};
    };
}

function getLastQuarterValue() {
    return function () {
        const now = new Date();
        const begin = moment()
            .subtract('month', now.getMonth() % 3 + 3)
            .startOf('month').toDate();
        const end = moment()
            .subtract('month', now.getMonth() % 3)
            .startOf('month').subtract('day', 1).endOf('day').toDate();
        return {begin, end};
    };
}

/* eslint-disable */
const template = `<div on-click="toggleLayer" class="{{mainClass}}">
    <div class="${cx('text')}">{{text}}</div>
    <div class="${cx('arrow')}"></div>
    <ui-layer open="{=active=}" s-ref="layer" follow-scroll="{{false}}">
        <div class="${cx('layer')}">
            <div class="${cx('shortcut')}" s-if="shortcut">
                <span on-click="onShortcutSelect(item)"
                    class="${cx('shortcut-item')}"
                    s-for="item in shortcutItems">{{item.text}}</span>
            </div>
            <div class="${cx('body')}">
                <div class="${cx('begin')}">
                    <div class="${cx('label')}"><h3>开始日期</h3></div>
                    <div class="${cx('begin-cal')}">
                        <ui-monthview value="{=begin.value=}" range="{{range}}" time="{{time}}" />
                    </div>
                </div>
                <div class="${cx('end')}">
                    <div class="${cx('label')}"><h3>结束日期</h3></div>
                    <div class="${cx('end-cal')}">
                        <ui-monthview value="{=end.value=}" range="{{range}}" time="{{time}}" end-of-day />
                    </div>
                </div>
            </div>
            <div class="${cx('foot')}">
                <ui-button on-click="onSelect" skin="ok" class="${cx('okBtn')}">确定</ui-button>
                <ui-button on-click="closeLayer" skin="cancel" class="${cx('cancelBtn')}">取消</ui-button>
            </div>
        </div>
    </ui-layer>
</div>`;
/* eslint-enable */

const RangeCalendar = defineComponent({
    template,
    components: {
        'ui-layer': Layer,
        'ui-monthview': MonthView,
        'ui-button': Button
    },
    computed: {
        text() {
            const value = this.data.get('value');
            if (!value) {
                return '-';
            }
            const {begin, end} = value;
            const format = this.data.get('time') ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
            const beginText = moment(begin).format(format);
            const endText = moment(end).format(format);
            return `${beginText} - ${endText}`;
        },
        mainClass() {
            return cx.mainClass(this);
        }
    },
    initData() {
        return {
            value: {
                begin: new Date(),
                end: new Date()
            },
            time: null,
            range: {begin: new Date(2014, 1, 1), end: new Date(2046, 10, 4)},
            // BEGIN 临时的数据
            begin: {
                value: null
            },
            end: {
                value: null
            },
            // E N D 临时的数据
            active: false,
            shortcut: true,
            shortcutItems: [
                {text: '昨天', value: getDayValue(1, 1)},
                {text: '最近7天', value: getDayValue(6, 0)},
                {text: '上周', value: getLastWeekValue()},
                {text: '本月', value: getMonthValue()},
                {text: '上个月', value: getLastMonthValue()},
                {text: '上个季度', value: getLastQuarterValue()}
            ]
        };
    },
    dataTypes: {
        /**
         * 获取或者设置组件的值
         * @bindx
         * @default {begin: new Date(), end: new Date()}
         */
        value: DataTypes.object,

        /**
         * 日期可以选择的范围
         * @default {begin: new Date(2014, 1, 1), end: new Date(2046, 10, 4)}
         */
        range: DataTypes.object,

        /**
         * 组件的禁用状态
         * @default false
         */
        disabled: DataTypes.bool,

        /**
         * 是否启用选择日期的快捷方式
         * @default true
         */
        shortcut: DataTypes.bool,

        /**
         * 浮层的打开状态
         * @bindx
         * @default false
         */
        active: DataTypes.bool,

        /**
         * 是否可以编辑 HH:mm:ss
         * @default false
         */
        time: DataTypes.bool
    },
    inited() {
        let {begin, end} = this.data.get('value');
        if (!begin) {
            begin = new Date();
        }
        else if (typeof begin === 'string') {
            // utc to date
            begin = new Date(begin);
        }

        if (!end) {
            end = new Date();
        }
        else if (typeof end === 'string') {
            // utc to date
            end = new Date(end);
        }

        this.data.set('value', {begin, end});
        this.watch('value', value => this.fire('change', {value}));
    },
    onShortcutSelect(item) {
        const {begin, end} = typeof item.value === 'function'
            ? item.value()
            : item.value;
        this.data.set('begin.value', begin);
        this.data.set('end.value', end);
    },
    onSelect() {
        const begin = this.data.get('begin.value');
        const end = this.data.get('end.value');
        this.data.set('value', begin > end ? {begin: end, end: begin} : {begin, end});
        this.closeLayer();
    },
    closeLayer() {
        this.data.set('active', false);
    },
    toggleLayer() {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }
        const active = this.data.get('active');
        if (!active) {
            const {begin, end} = this.data.get('value');
            this.data.set('begin.value', new Date(begin));
            this.data.set('end.value', new Date(end));
        }
        this.data.set('active', !active);
    }
});

export default asInput(RangeCalendar);
