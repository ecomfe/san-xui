/**
 * @file util.es6
 * @author leeight
 */

import _ from 'lodash';
import moment from 'moment';
import {defineComponent} from 'san';

export function hasUnit(value) {
    return /%|px|auto/.test(value);
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
    return node && node._type === 'san-cmpt';
}

export function isComponentBuilder(x) {
    return x && x.uuid && x.ComponentClass && x.context;
}

let zindex = 0x5942b;
export function nextZindex() {
    return zindex++;
}

export function nexUuid() {
    return nextZindex();
}

export function findAllEvents(aNode, events) {
    _.each(aNode.childs, child => {
        _.each(child.events, event => {
            events.push(event.expr.name);
        });
        findAllEvents(child, events);
    });
}

export function P(template, options) {  // eslint-disable-line
    const owner = options.owner;
    const OwnerComponentClass = owner.constructor;
    const components = OwnerComponentClass.components || OwnerComponentClass.prototype.components || {};
    const ComponentClass = defineComponent({
        template,
        components,
        inited() {
            const delegateEvents = [];
            findAllEvents(this.aNode, delegateEvents);
            _.each(delegateEvents, eventName => {
                if (typeof owner[eventName] === 'function') {
                    this[eventName] = _.bind(owner[eventName], owner);
                }
            });
        }
    });

    const uuid = `i${nextZindex()}`;
    owner.temporaryChilds[uuid] = new ComponentClass(options);
    return `<div id="${uuid}"></div>`;
}

export function buildMonths(year, month, date) {
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
        const disabled = false;
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

export function arrayTreeFilter(children, filterFn, options = {}) {
    const childrenKeyName = options.childrenKeyName || 'children';
    const result = [];

    let level = 0;
    let filterCallback = item => filterFn(item, level);
    do {
        const foundItem = _.filter(children, filterCallback)[0];
        if (!foundItem) {
            break;
        }
        result.push(foundItem);
        children = foundItem[childrenKeyName] || [];
        level += 1;
    }
    while (children.length);

    return result;
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
