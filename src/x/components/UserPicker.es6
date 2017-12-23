/**
 * @file components/UserPicker.es6
 * @author leeight
 */

import _ from 'lodash';
import {defineComponent} from 'inf-ui/sanx';
import {DataTypes} from 'san';
import {hasUnit, create} from 'inf-ui/x/components/util';
import {asInput} from 'inf-ui/x/components/asInput';
import TextBox from 'inf-ui/x/components/TextBox';
import Loading from 'inf-ui/x/components/Loading';
import Layer from 'inf-ui/x/components/Layer';

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
const template = `<div class="{{mainClass}}" style="{{mainStyle}}" on-click="onClick">
<div class="${cx('preview')}">
    <div class="${cx('preview-item')}" s-for="item, i in value">
        {{item.username}}<i class="iconfont icon-close" on-click="removeItem($event, i)"></i>
    </div>
    <ui-textbox
        s-ref="input"
        value="{=keyword=}"
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
</div>`;
/* eslint-enable */

function kDefaultTransformer(result) {
    return _.map(result.items, item => {
        const accountId = item.email.replace(/@.*/, '');
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
            return klass;
        },
        mainStyle() {
            return cx.mainStyle(this);
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
        }
    },
    initData() {
        return {
            active: false,
            loading: false, // 是不是正在查询中
            keyword: '',
            keywordName: 'keyword',
            searchApi: '/api/product/center/uid/search',
            searchRequester: null,
            layerOpened: false,
            layerWidth: null,
            autoLayerWidth: null,
            value: [],
            selectedIndex: 0,
            itemsTransformer: kDefaultTransformer,
            items: [] // 预览数据
        };
    },
    dataTypes: {
        active: DataTypes.bool,
        loading: DataTypes.bool,
        keyword: DataTypes.string,
        keywordName: DataTypes.string,
        searchApi: DataTypes.string,
        searchRequester: DataTypes.func,
        layerOpened: DataTypes.bool,
        layerWidth: DataTypes.number,
        autoLayerWidth: DataTypes.number,
        value: DataTypes.array,
        selectedIndex: DataTypes.number,
        itemsTransformer: DataTypes.func,
        items: DataTypes.array
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
        return this.$post(searchApi, payload)
            .then(result => {
                if (this.data.get('keyword') !== keyword) {
                    return;
                }
                const itemsTransformer = this.data.get('itemsTransformer');
                this.data.set('loading', false);
                this.data.set('selectedIndex', 0);
                this.data.set('items', itemsTransformer(result));
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
