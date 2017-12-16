/**
 * 展示组件的 DataTypes 定义的内容
 *
 * @file inf-ui/x/demos/DataTypeExplorer.es6
 * @author leeight
 */
import _ from 'lodash';
import {DataTypes} from 'san';
import {defineComponent} from 'inf-ui/sanx';

/* eslint-disable */
const template = `<template>
<table s-if="typeDefs.length" border="1" cellpadding="0" cellspacing="0" class="typedefs">
    <tr><th>名称</th><th>类型</th><th>描述</th></tr>
    <tr s-for="typeDef in typeDefs">
        <td>{{typeDef.name}}</td>
        <td>{{typeDef.type}}</td>
        <td>{{typeDef.description}}</td>
    </tr>
</table>
<div s-else>暂无定义，请给组件添加 <code>dataTypes</code> 属性</div>
</template>`;
/* eslint-enable */

const kAllTypes = [
    'any',

    // 基本类型
    'array', 'object', 'func', 'string', 'number', 'bool', 'symbol',

    // 复合类型
    'arrayOf', 'instanceOf', 'shape', 'oneOf', 'oneOfType', 'objectOf', 'exact'
];

function getTypeString(type) {
    for (let i = 0; i < kAllTypes.length; i++) {
        if (type === DataTypes[kAllTypes[i]]) {
            return kAllTypes[i];
        }
    }

    // FIXME(leeight) 如何检测是复合类型呢?
    return 'unknown';
}

export default defineComponent({
    template,
    components: {},
    initData() {
        return {
            key: '',
            comp: null,
            typeDefs: []
        };
    },
    inited() {
        this.watch('comp', comp => {
            if (!comp) {
                this.noDataTypes();
                return;
            }
            const key = this.data.get('key');
            const components = comp.components;
            const Ctor = components[key];
            if (!Ctor) {
                this.noDataTypes();
                return;
            }
            const dataTypes = Ctor.prototype.dataTypes;
            if (!dataTypes) {
                this.noDataTypes();
                return;
            }

            this.parseDataTypes(dataTypes);
        });
    },

    noDataTypes() {
        this.data.set('typeDefs', []);
    },

    parseDataTypes(dataTypes) {
        const typeDefs = [];
        _.each(dataTypes, (type, name) => {
            typeDefs.push({
                name: _.kebabCase(name),
                type: getTypeString(type),
                // FIXME(chenbo09) 注释怎么导入呢？ 从代码中读取？
                description: '-'
            });
        });
        this.data.set('typeDefs', typeDefs);
    }
});

