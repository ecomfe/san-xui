/**
 * @file Icon.js
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';

export default defineComponent({
    template: '<i tip="{{title}}" class="iconfont icon-{{name}}"></i>',
    dataTypes: {
        /**
         * ICON的名称
         */
        name: DataTypes.string.isRequired,

        /**
         * ICON的tip信息
         */
        title: DataTypes.string
    }
});

