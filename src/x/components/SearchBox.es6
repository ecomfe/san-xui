/**
 * @file SearchBox.es6
 * @author leeight
 */

import u from 'lodash';
import {defineComponent} from 'san';

import {create} from './util';
import Button from './Button';
import TextBox from './TextBox';
import Select from './Select';

const cx = create('ui-searchbox');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <ui-select
        s-if="datasource.length"
        on-change="onKeywordTypeChanged($event)"
        datasource="{{datasource}}"
        layer-width="{{100}}"
        value="{=keywordType=}"
        />
    <ui-textbox
        on-enter="onSearch"
        on-focus="onFocus"
        on-blur="onBlur"
        placeholder="{{placeholder}}"
        value="{=value=}"
        disabled="{{disabled}}"
        width="{{width}}"
        />
    <ui-button on-click="onSearch" icon="magnifier" disabled="{{disabled}}" s-if="searchBtn" />
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-select': Select,
        'ui-textbox': TextBox,
        'ui-button': Button
    },
    initData() {
        return {
            disabled: false,
            active: false,
            value: '',
            searchBtn: true,
            placeholder: '',
            datasource: null,
            keywordType: null,
            width: null
        };
    },
    computed: {
        mainClass() {
            const klass = cx.mainClass(this);
            const searchBtn = this.data.get('searchBtn');
            if (!searchBtn) {
                klass.push(cx('nobtn'));
            }
            const active = this.data.get('active');
            if (active) {
                klass.push('state-active');
                klass.push(cx('active'));
                klass.push(cx('x-active'));
            }
            return klass;
        }
    },
    attached() {
        const datasource = this.data.get('datasource');
        const keywordType = this.data.get('keywordType');
        if (datasource && keywordType) {
            u.each(datasource, item => {
                if (item.value === keywordType) {
                    this.onKeywordTypeChanged(item);
                }
            });
        }
    },
    onKeywordTypeChanged({value, text}) {
        this.data.set('placeholder', `请输入${text}进行搜索`);
    },
    onSearch() {
        this.fire('search');
    },
    onFocus() {
        this.data.set('active', true);
    },
    onBlur() {
        this.data.set('active', false);
    }
});
