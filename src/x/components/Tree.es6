/**
 * @file Tree.es6
 * @author zhangzhe(zhangzhe@baidu.com)
 */
import {DataTypes, defineComponent} from 'san';

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
        tree-value="{{value}}"
        active-value="{{activeValue}}" />
</div>`;
/* eslint-enable */

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
            activeValue: '' // 最新被点击的叶子节点value
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
        value: DataTypes.any
    }
});
