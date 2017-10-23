/**
 * 实现方案是两个 Table 重叠起来
 * @file components/FrozenColumnTable.es6
 * @author leeight
 */
import _ from 'lodash';
import $ from 'jquery';
import {defineComponent} from 'san';

import {hasUnit, create} from './util';
import Table from './Table';
import Loading from './Loading';
import ResizeObserver from './ResizeObserver';

const cx = create('ui-frozen-column-table');
const kDefaultRightCellWidth = 500;

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <div class="${cx('loading')}" s-if="loading">
        <slot name="loading"><ui-loading /></slot>
    </div>
    <div class="${cx('error')}" s-if="error">
        <slot name="error">{{error}}</slot>
    </div>
    <div class="${cx('body')}" s-if="!loading && !error">
        <table width="100%" cellspacing="0" cellpadding="0">
            <tr>
                <td class="${cx('cell', 'cell-left')}" style="{{leftCellStyle}}">
                    <ui-table
                        s-ref="left"
                        empty-text="{{emptyText}}"
                        disabled-select-all="{{disabledSelectAll}}"
                        select="{{select}}"
                        cell-builder="{{cellBuilder}}"
                        selected-index="{=selectedIndex=}"
                        datasource="{{datasource}}"
                        schema="{{leftSchema}}"

                        on-selected-change="onSelectedChange($event)"
                        on-filter="onFilter($event)"
                        on-command="onCommand($event)"
                        />
                </td>
                <td class="${cx('cell', 'cell-right')}">
                    <ui-table
                        s-ref="right"
                        empty-text="{{emptyText}}"
                        cell-builder="{{cellBuilder}}"
                        datasource="{{datasource}}"
                        schema="{{rightSchema}}"

                        on-selected-change="onSelectedChange($event)"
                        on-filter="onFilter($event)"
                        on-command="onCommand($event)"
                        />
                </td>
            </tr>
        </table>
    </div>
    </div>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-table': Table,
        'ui-loading': Loading
    },
    initData() {
        return {
            rightCellWidth: kDefaultRightCellWidth
        };
    },
    computed: {
        mainClass() {
            return cx.mainClass(this);
        },
        leftCellWidth() {
            const leftSchema = this.data.get('leftSchema');
            const select = this.data.get('select');
            const initialValue = (select === 'multi' || select === 'single') ? 46 : 0;
            const width = _.reduce(leftSchema, (sum, col) => sum + col.width, initialValue);
            return width;
        },
        leftCellStyle() {
            const style = {};
            const width = this.data.get('leftCellWidth');
            style.width = `${width}px`;
            return style;
        },
        leftSchema() {
            const schema = this.data.get('schema');
            const leftSchema = [];
            for (let i = 0; i < schema.length; i++) {
                const col = schema[i];
                if (col.freezed) {
                    if (col.width == null || hasUnit(col.width)) {
                        // 必须要有宽度，如果没有设置，添加一个默认值
                        // 不能设置 xx%, 40px 之类的，必须是一个 number 类型
                        col.width = 100;
                    }
                    leftSchema.push(col);
                }
            }
            return leftSchema;
        },
        rightSchema() {
            const schema = this.data.get('schema');
            const rightSchema = [];
            for (let i = schema.length - 1; i >= 0; i--) {
                const col = schema[i];
                if (col.freezed) {
                    break;
                }
                rightSchema.unshift(col);
            }
            return rightSchema;
        }
    },
    __syncHeight() {
        const left = this.ref('left');
        const right = this.ref('right');
        if (left.el && right.el) {
            const leftRows = $(left.el).find('tbody tr');
            const rightRows = $(right.el).find('tbody tr');

            for (let i = 0; i < leftRows.length; i++) {
                const leftRow = leftRows[i];
                const rightRow = rightRows[i];
                let leftRowHeight = $(leftRow).height();
                let rightRowHeight = $(rightRow).height();
                if (leftRowHeight !== rightRowHeight) {
                    $(leftRow).css({height: 'auto'});
                    $(rightRow).css({height: 'auto'});
                    leftRowHeight = $(leftRow).height();
                    rightRowHeight = $(rightRow).height();
                    const maxRowHeight = Math.max(leftRowHeight, rightRowHeight);
                    if (leftRowHeight < maxRowHeight) {
                        $(leftRow).css({height: maxRowHeight + 1});
                    }
                    else if (rightRowHeight < maxRowHeight) {
                        $(rightRow).css({height: maxRowHeight + 1});
                    }
                }
            }
        }
    },
    onSelectedChange(event) {
        this.fire('on-selected-change', event);
    },
    onFilter(event) {
        this.fire('filter', event);
    },
    onCommand(event) {
        this.fire('command', event);
    },
    inited() {
    },
    attached() {
        this.observer = new ResizeObserver(entries => this.__syncHeight());
        this.observer.observe(this.el.parentNode);
        this.__syncHeight();
    },
    updated() {
        this.__syncHeight();
    },
    disposed() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
});

