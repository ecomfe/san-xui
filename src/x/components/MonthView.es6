/**
 * @file MonthView.es6
 * @author leeight
 */
import {defineComponent} from 'san';

import {buildMonths, create} from './util';
import {asInput} from './asInput';
import Button from './Button';
import Select from './Select';
import TextBox from './TextBox';

const cx = create('ui-monthview');

/* eslint-disable */
const template = `<div on-click="onClick" class="{{mainClass}}">
    <div class="${cx('head')}">
        <table>
            <tbody>
                <tr>
                    <td width="30" align="left"><ui-button class="${cx('month-back')}" on-click="onMonthBack" /></td>
                    <td><ui-select datasource="{{yearDs.datasource}}" value="{=yearDs.value=}" on-change="onYearChange($event)"/></td>
                    <td><ui-select datasource="{{monthDs.datasource}}" value="{=monthDs.value=}" /></td>
                    <td width="30" align="right"><ui-button class="${cx('month-forward')}" on-click="onMonthForward" /></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="${cx('month')}">
        <table border="0" cellpadding="0" cellspacing="0" class="${cx('month-main')}">
            <thead>
                <tr>
                    <td class="${cx('month-title')}" s-for="title in titles">{{title}}</td>
                </tr>
            </thead>
            <tbody>
                <tr s-for="row in rows">
                    <td s-for="cell in row" class="{{cell | cellClass}}" on-click="onCellClick(cell)">{{cell.date}}</td>
                </tr>
                <tr s-if="{{false}}">
                    <td colspan="7" class="${cx('shortcut')}"><ui-button on-click="onTodayClick()">今天</ui-button></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="${cx('time')}" s-if="time">
        <ui-textbox type="number" value="{=hour=}" width="20" />
        :
        <ui-textbox type="number" value="{=minute=}" width="20" />
        :
        <ui-textbox type="number" value="{=second=}" width="20" />
    </div>
</div>`;
/* eslint-enable */

const MonthView = defineComponent({
    template,
    components: {
        'ui-textbox': TextBox,
        'ui-button': Button,
        'ui-select': Select
    },
    computed: {
        mainClass() {
            return cx.mainClass(this);
        },
        rows() {
            const year = this.data.get('yearDs.value');
            const month = this.data.get('monthDs.value');
            const range = this.data.get('range');
            return buildMonths(year, month, this.data.get('value'), range);
        }
    },
    filters: {
        cellClass(cell) {
            const klass = [cx('month-item')];
            if (cell.virtual) {
                klass.push(cx('month-item-virtual'));
            }
            if (cell.disabled) {
                klass.push(cx('month-item-disabled'));
            }
            if (cell.active) {
                klass.push(cx('month-item-today'));
                klass.push(cx('month-item-selected'));
            }

            return klass;
        }
    },
    initData() {
        return {
            disabled: false,
            skin: '',

            time: null,
            hour: null,
            minute: null,
            second: null,
            endOfDay: false, // 如果设置为 true 的时候，当没有 time 选型，选择日期的时候是 23:59:59 结束

            value: new Date(),
            titles: ['一', '二', '三', '四', '五', '六', '日'],
            range: {begin: new Date(1982, 10, 4), end: new Date(2046, 10, 4)},
            yearDs: {datasource: []},
            monthDs: {datasource: []}
        };
    },
    initYearOptions() {
        const value = this.data.get('value');
        const {begin, end} = this.data.get('range');
        const year = value.getFullYear();
        const datasource = [];

        const endYear = end.getFullYear();
        for (let year = begin.getFullYear(); year <= endYear; year++) {
            datasource.push({text: year, value: year});
        }

        this.data.set('yearDs.datasource', datasource);
        this.data.set('yearDs.value', year);
    },
    initMonthOptions(year) {
        const {value, yearDs, range} = this.data.get();
        const datasource = [];
        let month = value.getMonth();
        let end = 11;
        let start = 0;

        year = year || yearDs.value;

        if (year === range.begin.getFullYear()) {
            start = range.begin.getMonth();
            month < start && (month = start);
        }
        else if (year === range.end.getFullYear()) {
            end = range.end.getMonth();
            month > end && (month = end);
        }

        for (; start <= end; start++) {
            datasource.push({text: start + 1, value: start});
        }

        this.data.set('monthDs.datasource', datasource);
        this.data.set('monthDs.value', month);
    },
    inited() {
        const valueWatcher = value => {
            this.initYearOptions();
            this.initMonthOptions();
            const time = this.data.get('time');
            if (value && time) {
                this.data.set('hour', value.getHours());
                this.data.set('minute', value.getMinutes());
                this.data.set('second', value.getSeconds());
            }
            this.fire('change', {value});
        };
        this.watch('value', valueWatcher);
        valueWatcher(this.data.get('value'));

        this.watch('hour', hour => {
            const time = this.data.get('time');
            if (time) {
                if (!(hour >= 0 && hour <= 23)) {
                    hour = 0;
                }
                const value = this.data.get('value');
                value.setHours(+hour);
                this.data.set('value', new Date(value));
            }
        });
        this.watch('minute', minute => {
            const time = this.data.get('time');
            if (time) {
                if (!(minute >= 0 && minute <= 59)) {
                    minute = 0;
                }
                const value = this.data.get('value');
                value.setMinutes(+minute);
                this.data.set('value', new Date(value));
            }
        });
        this.watch('second', second => {
            const time = this.data.get('time');
            if (time) {
                if (!(second >= 0 && second <= 59)) {
                    second = 0;
                }
                const value = this.data.get('value');
                value.setSeconds(+second);
                this.data.set('value', new Date(value));
            }
        });
    },
    onTodayClick() {
        this.data.set('value', new Date());
    },
    onCellClick(item) {
        if (item.disabled || item.virtual) {
            return;
        }
        const {year, month, date} = item;
        const {value, time, endOfDay} = this.data.get();
        value.setFullYear(year);
        value.setMonth(month);
        value.setDate(date);
        if (endOfDay && !time) {
            value.setHours(23, 59, 59, 999);
        }
        this.data.set('value', new Date(value));
    },
    onYearChange(e) {
        this.initMonthOptions(e.value);
    },
    onMonthBack() {
        let month = this.data.get('monthDs.value');
        let year = this.data.get('yearDs.value');
        if (month === 0) {
            month = 11;
            year -= 1;
        }
        else {
            month -= 1;
        }
        this.data.set('monthDs.value', month);
        this.data.set('yearDs.value', year);
    },
    onMonthForward() {
        let month = this.data.get('monthDs.value');
        let year = this.data.get('yearDs.value');
        if (month === 11) {
            month = 0;
            year += 1;
        }
        else {
            month += 1;
        }
        this.data.set('monthDs.value', month);
        this.data.set('yearDs.value', year);
    }
});

export default asInput(MonthView);

