/**
 * @file Filter.es6
 * @author leeight
 */

import _ from 'lodash';
import {defineComponent} from 'san';

import {create} from 'inf-ui/x/components/util';
import Button from 'inf-ui/x/components/Button';
import Select from 'inf-ui/x/components/Select';

const cx = create('ui-biz-filter');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <dl>
        <dt s-if="title">{{title}}</dt>
        <dd>
            <div class="${cx('form', 'form-inline')}">
                <div class="${cx('form-item')}" s-for="item in controls">
                    <ui-select
                        s-if="item.type === 'select'"
                        datasource="{{item.options}}"
                        on-change="onItemChanged(item.name, $event)"
                        value="{{item.value}}"
                        />
                    <div class="${cx('form-item-plain')}" s-if="item.type === 'plain'">{{item.text}}</div>
                </div>
            </div>
            <ui-button on-click="doFilter" skin="primary" s-if="submitText">{{submitText}}</ui-button>
        </dd>
    </dl>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-select': Select,
        'ui-button': Button
    },
    computed: {
        mainClass() {
            return cx.mainClass(this);
        }
    },
    initData() {
        return {
            title: null,
            submitText: null,
            controls: []
        };
    },
    inited() {
        const controls = this.data.get('controls');
        const formData = {};
        _.each(controls, item => {
            if (item.name && item.value != null) {
                formData[item.name] = item.value;
            }
        });
        this.data.set('formData', formData);
    },
    onItemChanged(name, {value}) {
        this.data.set(`formData.${name}`, value);
        const submitText = this.data.get('submitText');
        if (!submitText) {
            // 如果没有提交按钮，那么就自动过滤
            this.doFilter();
        }
    },
    doFilter() {
        this.fire('submit', this.data.get('formData'));
    }
});
