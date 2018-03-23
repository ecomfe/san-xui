/**
 * @file san-xui/x/components/UserPicker.js
 * @author leeight
 */

import _ from 'lodash';
import axios from 'axios';
import {DataTypes, defineComponent} from 'san';

import {hasUnit, create} from './util';
import {asInput} from './asInput';
import TextBox from './TextBox';
import Loading from './Loading';
import Layer from './Layer';

const cx = create('ui-userpicker');

// /api/product/center/uid/search
// {keyword: string}
// {
//   success: true,
//   result: {
//     items: [
//       {
//         departmentName: string,
//         displayName: string,
//         email: string,
//         name: string,
//         username: string
//       }
//     }
//   }
// }

/* eslint-disable */
const template = `<div class="{{mainClass}}" style="{{mainStyle}}">
<div s-if="preview" class="${cx('preview')}">
    <slot name="preview" var-users="value">
        <div class="${cx('preview-item')}" s-for="user in users">
            {{user.username}}
        </div>
    </slot>
</div>
<div s-else on-click="onClick">
<div class="${cx('preview')}">
    <div class="${cx('preview-item')}" s-for="item, i in value">
        {{item.username}}<i s-if="!disabled" class="iconfont icon-close" on-click="removeItem($event, i)"></i>
    </div>
    <ui-textbox
        s-if="inputVisible"
        s-ref="input"
        value="{=keyword=}"
        placeholder="{{inputPlaceholder}}"
        width="{{userWidth}}"
        on-input="onInput"
        on-focus="onFoucs"
        on-blur="onBlur"
        on-enter="onEnter"
        on-keyup="onKeyUp($event)"
        on-keydown="onKeyDown($event)"
    />
</div>
<ui-layer open="{=layerOpened=}" follow-scroll="{{false}}">
    <div class="${cx('layer')} ${cx('layer-x')}" style="{{layerStyle}}">
        <div class="${cx('layer-main')}">
            <ui-loading s-if="loading" size="small" />
            <ul s-elif="!items.length"><li>暂无数据</li></ul>
            <ul s-else>
                <li class="{{selectedIndex === i ? '${cx('layer-item', 'layer-actived-item')}' : '${cx('layer-item')}'}}"
                    on-click="addItem(item)"
                    s-for="item, i in items">
                    <slot name="layer-item" var-item="{{item}}">{{item.displayName}}</slot>
                </li>
            </ul>
        </div>
    </div>
</ui-layer>
</div>
</div>
`;

/* eslint-enable */

function kDefaultTransformer(result) {
    return _.map(result.items, item => {
        const accountId = item.username || item.email.replace(/@.*/, '');
        const username = item.name;
        const displayName = item.displayName;
        return {
            accountId, username, displayName
        };
    });
}

const UUAP = defineComponent({
    template,
    components: {
        'ui-loading': Loading,
        'ui-layer': Layer,
        'ui-textbox': TextBox
    },
    messages: {
        'input-comp-value-changed'() {
            // 忽略子控件的消息
        }
    },
    computed: {
        mainClass() {
            const klass = cx.mainClass(this);
            const active = this.data.get('active');
            if (active) {
                klass.push('state-active');
                klass.push(cx('active'));
                klass.push(cx('x-active'));
            }
            const preview = this.data.get('preview');
            if (preview) {
                klass.push(cx('x-preview'));
            }
            return klass;
        },
        mainStyle() {
            return cx.mainStyle(this);
        },
        inputVisible() {
            const disabled = this.data.get('disabled');
            if (disabled) {
                return false;
            }
            const max = this.data.get('max');
            const size = this.data.get('value.length');
            return size < max;
        },
        realLayerWidth() {
            const layerWidth = this.data.get('layerWidth');
            const autoLayerWidth = this.data.get('autoLayerWidth');
            return layerWidth || autoLayerWidth;
        },
        layerStyle() {
            const style = {};
            const realLayerWidth = this.data.get('realLayerWidth');
            if (realLayerWidth != null) {
                style.width = hasUnit(realLayerWidth) ? realLayerWidth : `${realLayerWidth}px`;
            }
            return style;
        },
        inputPlaceholder() {
            const size = this.data.get('value.length');
            if (size < 1) {
                return this.data.get('placeholder');
            }
            return null;
        }
    },
    initData() {
        return {
            active: false,
            loading: false, // 是不是正在查询中
            disabled: false,
            preview: false,
            keyword: '',
            keywordName: 'keyword',
            placeholder: '',
            searchApi: '/api/product/center/uid/search',
            searchRequester: null,
            layerOpened: false,
            layerWidth: null,
            autoLayerWidth: null,
            value: [],
            selectedIndex: 0,
            max: Infinity,
            itemsTransformer: kDefaultTransformer,
            items: [] // 预览数据
        };
    },
    dataTypes: {
        /**
         * 是否是聚焦的状态，当点击内容可输入区域的时候，自动设置未 true
         * @default false
         */
        active: DataTypes.bool,

        /**
         * 是否是预览模式
         * @default false
         */
        preview: DataTypes.bool,

        /**
         * 组件的禁用状态
         * @default false
         */
        disabled: DataTypes.bool,

        /**
         * 最多允许输入的数量
         * @default Infinity
         */
        max: DataTypes.number,

        /**
         * 数据是否正在加载
         * @default false
         */
        loading: DataTypes.bool,

        /**
         * 用户输入的关键词
         */
        keyword: DataTypes.string,

        /**
         * 搜索的时候，关键词的名字
         * @default keyword
         */
        keywordName: DataTypes.string,

        /**
         * 搜索 API 的地址
         * @default /api/product/center/uid/search
         */
        searchApi: DataTypes.string,

        /**
         * 自定义的请求函数，如果设置了 search-requester，那么会忽略 search-api 的配置<br>
         * function({[keywordName]: keyword}): Promise&lt;{items: object[]}, Error&gt;
         */
        searchRequester: DataTypes.func,

        /**
         * 浮层是否打开
         * @bindx
         * @default false
         */
        layerOpened: DataTypes.bool,

        /**
         * 手工设置浮层的宽度，如果没有设置的话，会在展开的时候动态计算
         */
        layerWidth: DataTypes.number,

        /**
         * UserPicker 的内容
         * <pre><code>{
         *   username: string,
         *   accountId: string
         * }</code></pre>
         * @bindx
         * @default []
         */
        value: DataTypes.array,

        /**
         * 转化后端返回的数据格式<br>
         * function({items: object[]}): object[]
         */
        itemsTransformer: DataTypes.func,

        /**
         * 浮层里面所展示的数据源
         * <pre><code>{
         *   username: string,
         *   accountId: string,
         *   displayName: string
         * }</code></pre>
         * 每一项的格式需要符合下面的约束，如果后端API返回的数据格式不同<br>
         * 那么可以通过设置 items-transformer 来调整数据格式
         * @default []
         */
        items: DataTypes.array,

        /**
         * placeholder
         * @default 请填写用户
         */
        placeholder: DataTypes.string,

        /**
         * 单个用户所占的宽度
         */
        width: DataTypes.number
    },
    inited() {
        this.searchByKeyword = _.debounce((...args) => this.doSearch(...args), 300);
        const value = this.data.get('value');
        if (!value || !_.isArray(value)) {
            this.data.set('value', []);
        }
        this.watch('value', value => this.fire('change', {value}));
    },
    attached() {
        this.__setLayerWidth();
    },
    onClick() {
        // focus the input area
        this.focusInput();
    },
    focusInput() {
        const input = this.ref('input');
        if (input) {
            input.focus();
        }
    },
    doSearch(keyword) {
        const {searchRequester, searchApi, keywordName} = this.data.get();
        if (typeof searchRequester === 'function') {
            return searchRequester(keyword)
            .then(items => {
                if (this.data.get('keyword') !== keyword) {
                    return;
                }
                this.data.set('loading', false);
                this.data.set('selectedIndex', 0);
                this.data.set('items', items);
            })
            .catch(error => {
                if (this.data.get('keyword') !== keyword) {
                    return;
                }
                this.data.set('loading', false);
                this.data.set('items', []);
            });
        }

        const payload = {[keywordName]: keyword};
        return axios.post(searchApi, payload)
        .then(result => {
            if (this.data.get('keyword') !== keyword) {
                return;
            }
            const itemsTransformer = this.data.get('itemsTransformer');
            this.data.set('loading', false);
            this.data.set('selectedIndex', 0);
            if (typeof itemsTransformer === 'function') {
                this.data.set('items', itemsTransformer(result));
            }
            else {
                this.data.set('items', result.items);
            }
        })
        .catch(error => {
            if (this.data.get('keyword') !== keyword) {
                return;
            }
            this.data.set('loading', false);
            this.data.set('items', []);
        });
    },
    onInput() {
        this.nextTick(() => {
            const keyword = this.data.get('keyword');
            if (!keyword) {
                this.data.set('layerOpened', false);
                this.data.set('loading', false);
            }
            else {
                // 虽然还没有真正的发起请求，不过先展示一个 loading 的提示再说
                this.data.set('layerOpened', true);
                this.data.set('loading', true);
                this.searchByKeyword(keyword);
            }
        });
    },
    onFoucs() {
        this.data.set('active', true);
    },
    onBlur() {
        this.data.set('active', false);
    },
    onKeyDown(e) {
        const keyCode = e.which || e.keyCode;
        if (keyCode === 8 && !e.target.value) {
            this.__shouldRemovePreviousItem = true;
        }
        else {
            this.__shouldRemovePreviousItem = false;
        }
    },
    onKeyUp(e) {
        const keyCode = e.which || e.keyCode;
        if (keyCode === 8 && this.__shouldRemovePreviousItem) {
            const length = this.data.get('value.length');
            if (length > 0) {
                this.data.removeAt('value', length - 1);
                this.focusInput();
            }
        }
        else if (keyCode === 40) {
            // down arrow
            this.data.set('selectedIndex', this.getNextIndex());
        }
        else if (keyCode === 38) {
            // up arrow
            this.data.set('selectedIndex', this.getPrevIndex());
        }
        this.__shouldRemovePreviousItem = false;
    },
    onEnter() {
        const i = this.data.get('selectedIndex');
        const item = this.data.get(`items[${i}]`);
        if (item) {
            this.addItem(item);
        }
    },
    getNextIndex() {
        const itemSize = this.data.get('items.length');
        const selectedIndex = this.data.get('selectedIndex');
        if (itemSize > 0) {
            if (selectedIndex + 1 >= itemSize) {
                return 0;
            }
            return selectedIndex + 1;
        }
        return 0;
    },
    getPrevIndex() {
        const itemSize = this.data.get('items.length');
        const selectedIndex = this.data.get('selectedIndex');
        if (itemSize > 0) {
            if (selectedIndex <= 0) {
                return itemSize - 1;
            }
            return selectedIndex - 1;
        }
        return 0;
    },
    addItem(item) {
        const value = this.data.get('value');
        // 检查有没有重复的
        const found = _.find(value, o => o.accountId === item.accountId);
        if (!found) {
            this.data.push('value', _.pick(item, 'accountId', 'username'));
        }
        this.data.set('layerOpened', false);
        this.data.set('keyword', '');
        this.focusInput();
    },
    removeItem(nativeEvent, index) {
        nativeEvent.stopPropagation();
        this.data.removeAt('value', index);
    },
    __setLayerWidth() {
        const layerWidth = this.data.get('layerWidth');
        if (layerWidth == null) {
            this.data.set('autoLayerWidth', this.el.clientWidth + 2);
        }
    }
});


export default asInput(UUAP);
