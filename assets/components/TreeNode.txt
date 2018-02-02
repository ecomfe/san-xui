/**
 * @file TreeNode.es6 Tree节点
 * @author zhangzhe(zhangzhe@baidu.com)
 */
import {DataTypes, defineComponent} from 'san';
import _ from 'lodash';

import CheckBox from './CheckBox';
import {create} from './util';

const cx = create('ui-tree');

/* eslint-disable */
const commonTemplate = `
<div class="${cx('content-wrapper')}" on-click="onNodeClick($event)">
    <span class="{{indicatorClass}}"></span>
    <div s-if="multi" class="${cx('item-content')}">
        <ui-checkbox
            checked="{=isSelected=}"
            title="{{text}}"
            on-change="onCheckboxChange($event)"
            on-click="onCheckboxClick" />
    </div>
    <div s-else class="${cx('item-content')}">{{text}}</div>
</div>
<ul s-if="hasChildren" class="${cx('sub-root')} ${cx('sub-root-{{expandedFlag}}')}">
    <ui-tree-node s-for="node in children"
        value="{{node.value}}"
        text="{{node.text}}"
        level="{{level + 1}}"
        children="{{node.children}}"
        expand-all="{{expandAll}}"
        multi="{{multi}}"
        tree-value="{{treeValue}}"
        active-value="{{activeValue}}" />
</ul>`;

const template = `<template>
<div s-if="isRoot" class="{{mainClass}}" data-value="{{value}}" data-level="{{level}}">${commonTemplate}</div>
<li s-else class="{{mainClass}}" data-value="{{value}}" data-level="{{level}}">${commonTemplate}</li>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-tree-node': 'self',
        'ui-checkbox': CheckBox
    },
    computed: {
        isRoot() {
            return this.data.get('level') === 0;
        },
        currentNode() {
            const node = {
                value: this.data.get('value'),
                text: this.data.get('text')
            };
            if (this.data.get('hasChildren')) {
                node.children = this.data.get('children');
            }
            return node;
        },
        hasChildren() {
            const children = this.data.get('children');
            return children && children.length > 0;
        },
        expandedFlag() {
            return this.data.get('isExpanded') ? 'expanded' : 'collapsed';
        },
        mainClass() {
            const level = this.data.get('level');
            const expandedStr = this.data.get('expandedFlag');
            const klass = [cx('node'), cx(`node-level-${level}`)];
            if (this.data.get('isRoot')) {
                // 根节点的样式
                klass.push(cx('root'));
                klass.push(cx(`root-${expandedStr}`));
            }
            // 如果没有儿子
            if (!this.data.get('hasChildren')) {
                klass.push(cx('root-empty'));
                if (this.data.get('activeValue') === this.data.get('value')) {
                    klass.push(cx('node-active'));
                }
            }
            else {
                klass.push(cx(`node-${expandedStr}`));
            }
            return klass;
        },
        indicatorClass() {
            const level = this.data.get('level');
            const expandedStr = this.data.get('expandedFlag');
            const klass = [cx('node-indicator'), cx(`node-indicator-level-${level}`)];
            // 如果没有儿子
            if (!this.data.get('hasChildren')) {
                klass.push(cx('node-indicator-empty'));
            }
            else {
                klass.push(cx(`node-indicator-${expandedStr}`));
            }
            return klass;
        },
        isSelected() {
            // checkbox是否被选中
            return this.data.get('multi')
                && _.includes(this.data.get('treeValue'), this.data.get('value'));
        }
    },
    initData() {
        return {
            value: '',
            level: 0, // level为0时，代表根节点
            text: '',
            children: [], // 儿子节点
            isExpanded: false // 是否打开，当children.length > 0时有意义
        };
    },
    inited() {
        // 默认打开机制,根节点默认第一次都是打开的
        if (this.data.get('expandAll') || this.data.get('isRoot')) {
            this.data.set('isExpanded', true);
        }
    },
    dataTypes: {
        /**
         * value
         */
        value: DataTypes.string,
        /**
         * 层级：0代表根节点，以此类推
         */
        level: DataTypes.number,
        /**
         * 名字
         */
        text: DataTypes.string,
        /**
         * 儿子节点们，当children.length === 0，代表是叶子节点
         */
        children: DataTypes.array,
        /**
         * 是否打开子节点
         */
        isExpanded: DataTypes.bool
    },
    // 打开关闭操作
    onNodeClick(evt) {
        const node = this.data.get('currentNode');
        // 如果没有儿子则只触发click事件
        if (!this.data.get('hasChildren')) {
            this.dispatch('click', node);
            return;
        }
        const isExpanded = this.data.get('isExpanded');
        // 设置反向状态
        this.data.set('isExpanded', !isExpanded);
        if (isExpanded) {
            this.dispatch('collapse', node);
        }
        else {
            this.dispatch('expand', node);
        }
    },
    onCheckboxClick(evt) {
        // 阻止事件冒泡
        evt.stopPropagation();
    },
    onCheckboxChange(evt) {
        const node = this.data.get('currentNode');
        if (evt.value) {
            this.dispatch('select', node);
        }
        else {
            this.dispatch('unselect', node);
        }
    }
});
