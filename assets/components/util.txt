/**
 * @file san-xui/x/components/util.js
 * @author leeight
 */

import _ from 'lodash';
import moment from 'moment';
import {NodeType, Component} from 'san';

export function hasUnit(value) {
    return /%|px|auto/.test(value);
}

export function html(strings, ...values) {
    return values.reduce((s, v, i) => s + String(v) + strings[i + 1], strings[0]);
}

export function create(prefix) {
    const type = prefix.replace(/^ui\-/, '');
    const cx = (...args) => {
        if (args.length) {
            return _(args)
                .map(value => value ? `${prefix}-${value}` : '')        // eslint-disable-line
                .compact()
                .value()
                .join(' ');
        }
        return prefix;
    };
    cx.mainStyle = self => {
        const style = {};

        const width = self.data.get('width');
        const height = self.data.get('height');

        if (width != null) {
            style.width = hasUnit(width) ? width : `${width}px`;
        }
        if (height != null) {
            style.height = hasUnit(height) ? height : `${height}px`;
        }

        return style;
    };
    cx.mainClass = self => {
        const skin = self.data.get('skin');
        const disabled = self.data.get('disabled');
        const klass = [cx(), cx('x')];
        if (skin) {
            klass.push('skin-' + skin);
            klass.push('skin-' + skin + '-' + type);
        }
        if (disabled) {
            klass.push('state-disabled');
            klass.push(cx('disabled'));
            klass.push(cx('x-disabled'));
        }
        return klass;
    };

    return cx;
}

export function isComponent(node) {
    return node instanceof Component;
}

let zindex = 0x5942b;
export function nextZindex() {
    return zindex++;
}

export function nexUuid() {
    return nextZindex();
}

export function hasSlot(comp, name) {
    let isInsertContent = false;

    function childrenTraversal(children) {
        for (let i = 0; !isInsertContent && i < children.length; i++) {
            const child = children[i];
            if (child.nodeType === NodeType.IF || child.nodeType === NodeType.FOR) {
                childrenTraversal(child.children);
                break;
            }
            else {
                isInsertContent = true;
                return;
            }
        }
    }

    const slots = comp.slot(name);
    for (let i = 0; i < slots.length; i++) {
        if (isInsertContent) {
            break;
        }
        childrenTraversal(slots[i].children);
    }

    return isInsertContent;
}

export function buildMonths(year, month, date, range) {
    let repeater = new Date(year, month, 1);
    let nextMonth = new Date(year, month + 1, 1);
    let begin = 1 - (repeater.getDay() + 6) % 7;
    repeater.setDate(begin);

    let index = 0;
    let rows = [];
    let cells = [];
    rows.push(cells);
    while (nextMonth - repeater > 0 || index % 7 !== 0) {
        if (begin > 1 && index % 7 === 0) {
            cells = [];
            rows.push(cells);
        }
        const virtual = repeater.getMonth() !== month;
        const active = moment(date).isSame(repeater, 'day');
        // range定义的begin之前end之后的日期不可选,
        const disabled = range && ((repeater < range.begin) || (repeater > range.end));
        cells.push({
            year: repeater.getFullYear(),
            month: repeater.getMonth(),
            date: repeater.getDate(),
            virtual, active, disabled
        });
        repeater = new Date(year, month, ++begin);
        index++;
    }

    return rows;
}

export function buildPagerItems({size, page, count, backCount, backText, forwardCount, forwardText, cx}) {
    const items = [];

    const totalPage = Math.ceil(count / size);

    // 上一页
    const prevPage = {
        value: page - 1,
        label: backText,
        className: page > 1 ? cx('item-extend') : cx('item-extend-disabled'),
        disabled: page <= 1
    };
    items.push(prevPage);

    // 前缀页码
    if (page > backCount + 1) {
        items.push({value: 1, label: 1});
        if (page > backCount + 2) {
            items.push({label: '…', disabled: true});
        }
    }

    // 中间页码
    let length = 0;

    length = page > backCount ? backCount : page - 1;
    for (let i = page - length; i < page; i++) {
        items.push({value: i, label: i});
    }

    // 当前页码
    items.push({value: page, label: page, className: cx('item-current'), disabled: true});

    // 后置页码
    length = totalPage - page > forwardCount
        ? forwardCount
        : totalPage - page;
    for (let i = page + 1; i < page + length + 1; i++) {
        items.push({value: i, label: i});
    }

    // 后缀页码
    if (page < totalPage - forwardCount) {
        if (page < totalPage - forwardCount - 1) {
            items.push({label: '…', disabled: true});
        }
        items.push({value: totalPage, label: totalPage});
    }

    // 下一页
    const nextPage = {
        value: page + 1,
        label: forwardText,
        className: page < totalPage ? cx('item-extend') : cx('item-extend-disabled'),
        disabled: page >= totalPage
    };
    items.push(nextPage);

    return items;
}

export function arrayTreeFilterIndex(children, filterFn, options = {}) {
    const childrenKeyName = options.childrenKeyName || 'children';
    const indexes = [];

    let level = 0;
    let filterCallback = item => filterFn(item, level);
    do {
        const index = _.findIndex(children, filterCallback);
        if (index === -1) {
            break;
        }
        indexes.push(index);
        children = children[index][childrenKeyName] || [];
        level += 1;
    }
    while (children.length);

    return indexes;
}

export function arrayTreeFilter(children, filterFn, options = {}) {
    const childrenKeyName = options.childrenKeyName || 'children';
    const indexes = arrayTreeFilterIndex(children, filterFn, options);
    const nodes = [];
    for (let i = 0; children.length && i < indexes.length; i++) {
        const index = indexes[i];
        const node = children[index];
        nodes.push(node);
        children = node[childrenKeyName] || [];
    }
    return nodes;
}

export function arrayTreeCompact(values, root) {
    const compactedTree = [];
    const stack = [root];
    let level = 0;

    while (stack.length) {
        const children = stack.shift();
        const value = values[level++];
        if (!children) {
            break;
        }

        const datasource = [];
        for (let i = 0; i < children.length; i++) {
            const item = children[i];
            const active = item.value === value;
            const {text, disabled, error, loading} = item;
            // 如果数据源里面有过相关的标记，那么就用这个标记就好了
            const expandable = item.expandable || (item.children && item.children.length > 0);
            const clonedItem = {
                text, disabled, active, error,
                loading, expandable, value: item.value
            };
            datasource.push(clonedItem);
            if (active) {
                stack.push(item.children);
            }
        }
        compactedTree.push(datasource);
    }

    return compactedTree;
}
