/**
 * @file san-xui/x/forms/StaticItem.es6
 * @author leeight
 */

import _ from 'lodash';
import {defineComponent, DataTypes} from 'san';

import {create} from '../components/util';

const cx = create('ui-static');

/* eslint-disable */
const template = `<div class="{{mainClass}}">{{label | raw}}</div>`;
/* eslint-enable */
export default defineComponent({
    template,
    computed: {
        mainClass() {
            const klass = cx.mainClass(this);
            const value = this.data.get('value');
            const mapper = this.data.get('mapper');
            if (_.isFunction(mapper)) {
                const mappedValue = mapper(value);
                if (mappedValue && mappedValue.klass) {
                    klass.push(mappedValue.klass);
                }
            }
            return klass;
        },
        label() {
            const value = this.data.get('value');
            const mapper = this.data.get('mapper');
            if (_.isFunction(mapper)) {
                const mappedValue = mapper(value);
                if (mappedValue && mappedValue.text) {
                    return mappedValue.text;
                }
                return mappedValue;
            }
            return value;
        }
    },
    dataTypes: {
        /**
         * 需要展示的数据
         */
        value: DataTypes.any,

        /**
         * 数据源
         */
        datasource: DataTypes.array,

        /**
         * value 到 label 的转换函数
         * <pre><code>function(v:any): any</code></pre>
         */
        mapper: DataTypes.func
    },
    inited() {
        const mapper = this.data.get('mapper');
        if (_.isFunction(mapper)) {
            return;
        }
        this.data.set('mapper', v => {
            const datasource = this.data.get('datasource');
            if (_.isArray(datasource)) {
                for (let i = 0, item; item = datasource[i]; i++) {
                    if (item.value === v) {
                        return item;
                    }
                }
            }
            return v;
        });
    }
});
