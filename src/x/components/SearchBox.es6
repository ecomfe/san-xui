/**
 * @file SearchBox.es6
 * @author leeight
 */

import {defineComponent} from 'san';

import {create} from './util';
import Button from './Button';
import TextBox from './TextBox';

const cx = create('ui-searchbox');

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <ui-textbox
        on-enter="onSearch"
        placeholder="{{placeholder}}"
        value="{=value=}"
        disabled="{{disabled}}"
        width="{{width}}"
        />
    <ui-button on-click="onSearch" icon="magnifier" disabled="{{disabled}}" />
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-textbox': TextBox,
        'ui-button': Button
    },
    initData() {
        return {
            disabled: false,
            value: '',
            placeholder: '',
            width: null
        };
    },
    computed: {
        mainClass() {
            return cx.mainClass(this);
        }
    },
    onSearch() {
        this.fire('search');
    }
});
