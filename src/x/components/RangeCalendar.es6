/**
 * @file RangeCalendar.es6
 * @author leeight
 */
import moment from 'moment';
import {defineComponent} from 'san';

import {create} from './util';
import Button from './Button';
import Layer from './Layer';
import MonthView from './MonthView';

const cx = create('ui-rangecalendar');

function getDayValue(bd = 1, ed = 2) {
    return function () {
        const begin = moment().subtract(bd, 'day').toDate();
        const end = moment().subtract(ed, 'day').toDate();
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
        // begin.setHours(0, 0, 0, 0);
        end.setFullYear(
            begin.getFullYear(),
            begin.getMonth(),
            begin.getDate() + 6
        );
        // end.setHours(0, 0, 0, 0);

        return {begin, end};
    };
}

function getMonthValue() {
    return function () {
        const begin = moment().startOf('month').toDate();
        const end = moment().toDate();
        return {begin, end};
    };
}

function getLastMonthValue() {
    return function () {
        const begin = moment().subtract('month', 1).startOf('month').toDate();
        const end = moment().startOf('month').subtract('day', 1).toDate();
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
            .startOf('month').subtract('day', 1).toDate();
        return {begin, end};
    };
}

/* eslint-disable */
const template = `<div on-click="toggleLayer" class="{{mainClass}}">
    <div class="${cx('text')}">{{text}}</div>
    <div class="${cx('arrow')}"></div>
    <ui-layer open="{=active=}" ref="layer">
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
                        <ui-monthview value="{=begin.value=}" time="{{time}}" />
                    </div>
                </div>
                <div class="${cx('end')}">
                    <div class="${cx('label')}"><h3>结束日期</h3></div>
                    <div class="${cx('end-cal')}">
                        <ui-monthview value="{=end.value=}" time="{{time}}" />
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

export default defineComponent({
    template,
    components: {
        'ui-layer': Layer,
        'ui-monthview': MonthView,
        'ui-button': Button
    },
    computed: {
        text() {
            const {begin, end} = this.data.get('value');
            const beginText = moment(begin).format('YYYY-MM-DD');
            const endText = moment(end).format('YYYY-MM-DD');
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
    inited() {
        let {begin, end} = this.data.get('value');
        if (!begin) {
            begin = new Date();
        }
        if (!end) {
            end = new Date();
        }
        this.data.set('value', {begin, end});
        this.data.set('begin.value', new Date(begin));
        this.data.set('end.value', new Date(end));
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
        this.data.set('value', {begin, end});
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
        this.data.set('active', !active);
    }
});
