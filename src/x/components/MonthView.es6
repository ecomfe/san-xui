/**
 * @file MonthView.es6
 * @author leeight
 */
import {defineComponent} from 'san';

import {buildMonths, create} from './util';
import Button from './Button';
import Select from './Select';

const cx = create('ui-monthview');

/* eslint-disable */
const template = `<div on-click="onClick" class="{{mainClass}}">
    <div class="${cx('head')}">
        <table>
            <tbody>
                <tr>
                    <td width="30" align="left"><ui-button class="${cx('month-back')}" on-click="onMonthBack" /></td>
                    <td><ui-select datasource="{{yearDs.datasource}}" value="{=yearDs.value=}" /></td>
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
                <tr>
                    <td colspan="7" class="${cx('shortcut')}"><ui-button on-click="onTodayClick()">今天</ui-button></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-button': Button,
        'ui-select': Select
    },
    computed: {
        mainClass() {
            const skin = this.data.get('skin');
            const disabled = this.data.get('disabled');
            const klass = [cx(), cx('x')];
            if (skin) {
                klass.push('skin-' + skin);
                klass.push('skin-' + skin + '-button');
            }
            if (disabled) {
                klass.push('state-disabled');
                klass.push(cx('disabled'));
            }
            return klass;
        },
        rows() {
            const year = this.data.get('yearDs.value');
            const month = this.data.get('monthDs.value');
            return buildMonths(year, month, this.data.get('value'));
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
    initMonthOptions() {
        const value = this.data.get('value');
        const month = value.getMonth();

        const datasource = [];
        for (let month = 0; month <= 11; month++) {
            datasource.push({text: month + 1, value: month});
        }

        this.data.set('monthDs.datasource', datasource);
        this.data.set('monthDs.value', month);
    },
    inited() {
        this.initYearOptions();
        this.initMonthOptions();
    },
    onTodayClick() {
        const now = new Date();
        this.data.set('value', now);
        this.data.set('monthDs.value', now.getMonth());
        this.data.set('yearDs.value', now.getFullYear());
    },
    onCellClick(item) {
        if (item.disabled || item.virtual) {
            return;
        }
        const {year, month, date} = item;
        const value = this.data.get('value');
        value.setFullYear(year);
        value.setMonth(month);
        value.setDate(date);
        this.data.set('value', new Date(value));
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
