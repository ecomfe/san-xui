/**
 * @file Tree.js
 * @author zhangzhe(zhangzhe@baidu.com)
 */
import {DataTypes, defineComponent} from 'san';
import _ from 'lodash';

import TreeNode from './TreeNode';
import {create} from './util';

const cx = create('ui-tree');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <ui-tree-node s-if="datasource.value"
        value="{{datasource.value}}"
        text="{{datasource.text}}"
        level="{{0}}"
        children="{{datasource.children}}"
        expand-all="{{expandAll}}"
        multi="{{multi}}"
        edit="{=edit=}"
        tree-value="{{value}}"
        active-value="{{activeValue}}" />
</div>`;
/* eslint-enable */

function getParentKeyByNode(datasource, node) {
    let parentNodeKey = 'datasource';
    let tempNode = datasource;
    for (let i = 1; i < node.parents.length; i++) {
        const index =  _.findIndex(tempNode.children, n => n.value === node.parents[i]);
        tempNode = tempNode.children[index];
        parentNodeKey += `.children[${index}]`;
    }
    return parentNodeKey;
}

export default defineComponent({
    template,
    components: {
        'ui-tree-node': TreeNode
    },
    computed: {
        mainClass() {
            const skin = this.data.get('skin');
            const klass = [cx(), cx('x'), cx(`skin-${skin}`)];
            return klass;
        }
    },
    initData() {
        return {
            skin: 'arrow', // 皮肤 arrow|block|folder
            expandAll: false, // 完全展开所有节点，默认只展开根节点
            multi: false, // 是否支持多选
            value: [], // 如果multi等于true，表示选中的节点集合，否则表示最新点击的叶子节点
            activeValue: '', // 最新被点击的叶子节点value
            edit: false // 是否可以编辑
        };
    },
    messages: {
        expand(evt) {
            const node = evt.value;
            this.fire('expand', {node});
        },
        collapse(evt) {
            const node = evt.value;
            this.fire('collapse', {node});
        },
        select(evt) {
            const node = evt.value;
            this.data.push('value', node.value);
            this.fire('select', {
                node,
                value: this.data.get('value')
            });
        },
        unselect(evt) {
            const node = evt.value;
            this.data.remove('value', node.value);
            this.fire('unselect', {
                node,
                value: this.data.get('value')
            });
        },
        click(evt) {
            const node = evt.value;
            // 点击了某个叶子节点
            if (!this.data.get('multi')) {
                this.data.set('value', node.value);
            }
            this.data.set('activeValue', node.value);
            this.fire('click', {node});
        },
        creating(evt) {
            const parentNode = evt.value;
            this.createNode(parentNode);
        },
        delete(evt) {
            const node = evt.value;
            this.deleteNode(node);
            this.fire('delete', {node});
        },
        confirm(evt) {
            const node = evt.value;
            // 更新状态
            this.resetNode(node);
            const eventName = !node.value ? 'create' : 'update';
            // 注意：如果是新添加的节点，为避免一些未知错误，在后端实际创建好之后，需要再把实际的value赋到这个节点的value上
            this.fire(eventName, {node});
        },
        cancelEdit(evt) {
            // 取消创建或编辑
            const node = evt.value;
            // 如果是添加的取消，则还需要把这个节点删除
            if (!node.value) {
                this.deleteNode(node);
            }
        }
    },
    dataTypes: {
        /**
         * Tree 的数据源，每一项的格式如下：
         * <pre><code>{
         *   value: string, (所有节点的value MUST唯一)
         *   text: string,
         *   children?: array (如果有儿子，则有这个字段)
         * }</code></pre>
         */
        datasource: DataTypes.object,
        /**
         * Tree 的皮肤 arrow|block|folder
         *
         * @default 'arrow'
         */
        skin: DataTypes.string,
        /**
         * 是否完全展开所有节点，默认只展开根节点
         *
         * @default false
         */
        expandAll: DataTypes.bool,
        /**
         * 是否支持多选
         *
         * @default false
         */
        multi: DataTypes.bool,
        /**
         * 如果multi等于true，表示选中的节点集合
         * 如果multi等于false，则表示最近点击的叶子节点
         */
        value: DataTypes.any,
        /**
         * 是否支持编辑（增删改）
         *
         * @default false
         */
        edit: DataTypes.bool
    },
    deleteNode(node) {
        const datasource = this.data.get('datasource');
        if (node.level === 0) {
            // 整个树都删掉
            this.data.set('datasource', {});
        }
        else {
            let parentNodeKey = getParentKeyByNode(datasource, node);
            const tempNode = this.data.get(`${parentNodeKey}`);
            // 获取要删除的节点index
            const lastIndex = _.findIndex(tempNode.children, n => n.value === node.value);
            this.data.removeAt(`${parentNodeKey}.children`, lastIndex);
        }
    },
    createNode(parentNode) {
        const datasource = this.data.get('datasource');
        let parentNodeKey = getParentKeyByNode(datasource, parentNode);
        const tempNode = this.data.get(`${parentNodeKey}`);
        if (parentNode.level !== 0) {
            const lastIndex = _.findIndex(tempNode.children, n => n.value === parentNode.value);
            parentNodeKey += `.children[${lastIndex}]`;
        }
        // 添加新的子节点
        if (!this.data.get(`${parentNodeKey}.children`)) {
            this.data.set(`${parentNodeKey}.children`, []);
        }
        this.data.push(`${parentNodeKey}.children`, {value: '', text: '', isUpdating: true});
    },
    resetNode(node) {
        const datasource = this.data.get('datasource');
        let parentNodeKey = getParentKeyByNode(datasource, node);
        const tempNode = this.data.get(`${parentNodeKey}`);
        if (node.level !== 0) {
            const lastIndex = _.findIndex(tempNode.children, n => n.value === node.value);
            parentNodeKey += `.children[${lastIndex}]`;
        }
        if (this.data.get(`${parentNodeKey}`)) {
            this.data.set(`${parentNodeKey}.isUpdating`, false);
            this.data.set(`${parentNodeKey}.text`, node.text);
            if (!this.data.get(`${parentNodeKey}.value`)) {
                // 做个假的“value“
                const mockValue = node.parents[node.parents.length - 1] + '_child-' + tempNode.children.length;
                this.data.set(`${parentNodeKey}.value`, mockValue);
            }
        }
    }
});
