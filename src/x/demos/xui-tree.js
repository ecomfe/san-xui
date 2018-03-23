/**
 * @file demos/xui-tree.js
 * @author zhangzhe(zhangzhe@baidu.com)
 */

import {defineComponent} from 'san';
import {Row, Tree} from 'san-xui';

/* eslint-disable */
const template = `<template>
<x-row label="基本功能">
    <xui-tree datasource="{{tree.datasource}}" on-expand="onExpand" on-collapse="onCollapse"/>
</x-row>
<x-row label="skin=block, expand-all=true 节点全部展开">
    <xui-tree datasource="{{tree.datasource}}" expand-all="{{true}}" skin="block"/>
</x-row>
<x-row label="skin=folder, expand-all=false">
    <xui-tree datasource="{{tree.datasource}}" expand-all="{{false}}" skin="folder" on-click="onNodeClick"/>
</x-row>
<x-row label="multi=true,支持多选">
    <xui-tree datasource="{{tree.datasource}}" multi="{{true}}" on-select="onSelect" on-unselect="onUnselect"/>
</x-row>
<x-row label="edit=true,支持编辑">
    <xui-tree datasource="{{tree.datasource}}" expand-all="{{true}}" edit="{{true}}"
        on-create="onCreate" on-update="onUpdate" on-delete="onDelete"/>
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-tree': Tree
    },
    computed: {
    },
    initData() {
        return {
            tree: {
                datasource: {
                    value: '00000',
                    text: '根节点名称',
                    children: [
                        {
                            value: '2',
                            text: '联盟研发部',
                            children: [
                                {value: '21', text: 'RD'},
                                {value: '22', text: 'FE'},
                                {value: '23', text: 'QA'},
                                {value: '24', text: 'PM'}
                            ]
                        },
                        {
                            value: '3',
                            text: '贴吧事业部',
                            children: [
                                {value: '31', text: 'RD'},
                                {value: '32', text: 'FE'},
                                {value: '33', text: 'QA'},
                                {value: '34', text: 'PM', children: [{value: '341', text: 'PM1'}]}
                            ]
                        },
                        {
                            value: '4',
                            text: '百度音乐'
                        }
                    ]
                }
            }
        };
    },
    onExpand(evt) {
        console.log(`打开了节点 ${evt.node.value}:"${evt.node.text}"`);
    },
    onCollapse(evt) {
        console.log(`收起了节点 ${evt.node.value}:"${evt.node.text}"`);
    },
    onSelect(evt) {
        console.log(`勾选了节点 ${evt.node.value}:"${evt.node.text}"`);
        console.log(`当前选中的节点是：${evt.value}`);
    },
    onUnselect(evt) {
        console.log(`取消勾选节点 ${evt.node.value}:"${evt.node.text}"`);
        console.log(`当前选中的节点是：${evt.value}`);
    },
    onNodeClick(evt) {
        console.log('当前选中的节点是：');
        console.log(evt.node);
    },
    onCreate(evt) {
        console.log('新增节点');
        console.log(evt.node);
    },
    onUpdate(evt) {
        console.log('更新节点');
        console.log(evt.node);
    },
    onDelete(evt) {
        console.log('删除节点');
        console.log(evt.node);
    }
});
