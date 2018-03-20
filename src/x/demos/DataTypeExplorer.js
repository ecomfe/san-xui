/**
 * 展示组件的 DataTypes 定义的内容
 *
 * @file demos/DataTypeExplorer.js
 * @author leeight
 */

/* global _hmt, G_PREFIX, G_SOURCE_EXT */

import _ from 'lodash';
import {parse} from 'san-types';
import {defineComponent} from 'san';
import Icon from '../components/Icon';

/* eslint-disable */
const template = `<template>
<table s-if="typeDefs.length" border="1" cellpadding="0" cellspacing="0" class="typedefs">
    <tr><th>名称</th><th>类型</th><th>默认值</th><th>描述</th></tr>
    <tr s-for="typeDef in typeDefs">
        <td>
            {{typeDef.name}}
            <ui-icon name="bind" title="支持双绑" s-if="typeDef.bindx" />
            <ui-icon name="ok" title="必填" s-if="typeDef.required" />
        </td>
        <td>{{typeDef.type}}</td>
        <td>{{typeDef.defaultValue || '-'}}</td>
        <td>{{(typeDef.desc || '-') | raw}}</td>
    </tr>
</table>
<div s-else>暂无定义，请给组件添加 <code>dataTypes</code> 属性</div>
</template>`;

/* eslint-enable */

function hasF(x) {
    return x.bindx || x.required;
}

// 不是所有的组件都在components下面
const folderMap = {
    Form: 'forms',
    FormDialog: 'forms'
};

export default defineComponent({
    template,
    components: {
        'ui-icon': Icon
    },
    initData() {
        return {
            typeDefs: []
        };
    },
    inited() {
        this.watch('code', code => {
            const key = this.data.get('key');
            const pattern = new RegExp('\'' + _.escapeRegExp(key) + '\'\\s*:\\s*([\\.\\/\\w]+)', 'gm');
            const match = pattern.exec(code);
            if (!match) {
                this.noTypeDefs();
                return;
            }

            const compName = match[1];
            const ext = typeof G_SOURCE_EXT === 'string' ? G_SOURCE_EXT : '.js';
            let moduleId = typeof G_PREFIX === 'object'
                ? `${G_PREFIX.componentsCode}${compName}`
                : `\x69nf-ui/x/components/${compName}`;
            const folder = folderMap[compName];
            if (folder) {
                moduleId = moduleId.replace('components', folder);
            }

            const sourceUrl = window.require.toUrl(moduleId).replace(/\?.*/, '') + ext + '?raw';
            fetch(sourceUrl)
                .then(response => {
                    if (response.status === 200) {
                        return response.text();
                    }
                    throw new Error(response.url + ' failed');
                })
                .then(code => {
                    const typeDefs = parse(code) || [];
                    _.each(typeDefs, T => {
                        T.name = _.kebabCase(T.name);
                    });
                    typeDefs.sort((a, b) => {
                        if (hasF(a) && !hasF(b)) {
                            return -1;
                        }
                        else if (!hasF(a) && hasF(b)) {
                            return 1;
                        }
                        return a.name.localeCompare(b.name);
                    });
                    this.data.set('typeDefs', typeDefs);
                })
                .catch(() => this.noTypeDefs());
        });
    },
    noTypeDefs() {
        this.data.set('typeDefs', []);
    }
});

