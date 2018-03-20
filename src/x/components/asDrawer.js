/**
 * Drawer
 *
 * @file components/asDrawer.js
 * @author zhanghao25
 */

import _ from 'lodash';
import $ from 'jquery';
import {DataTypes, defineComponent} from 'san';

import {create, nextZindex} from './util';

const cx = create('ui-drawer');

export default (Klass, data = {}) => {
    if (Klass.__drawerComponent) {
        return Klass.__drawerComponent;
    }

    const Drawer = defineComponent({
        // 压制窗口隐藏
        _isSuppressing: false,
        _suppressHandler: _.debounce(function () {this._isSuppressing = false;}, 10),

        template: `
            <div class="{{mainClass}}" style="{{mainStyle}}" on-click="suppressHide">
                <div class="${cx('header')}" s-if="hasHeader">
                    <slot name="header">{{title}}</slot>
                </div>
                <div class="${cx('body')}">
                    <slot>
                        <x-biz payload="{{payload}}" />
                    </slot>
                </div>
                <div class="iconfont icon-close ${cx('close')}" on-click="hide"></div>
            </div>
        `,

        dataTypes: {
            /**
             * Drawer top 距离
             * @default 0px
             */
            top: DataTypes.string,
            /**
             * 宽度，`expandTo`为 `left|right` 时候有效
             * @default 400px
             */
            width: DataTypes.string,
            /**
             * 高度，`expandTo`为 `top|bottom` 时候有效
             * @default 400px
             */
            height: DataTypes.string,
            /**
             * 传递给业务组件的参数
             * @default {}
             */
            payload: DataTypes.any,
            /**
             * 是否打开
             * @default false
             */
            expand: DataTypes.bool,
            /**
             * 展开方式 top|bottom|left|right
             * @default right
             */
            expandTo: DataTypes.string,
            /**
             * 文本标题
             * @default ''
             */
            title: DataTypes.string
        },

        components: {
            'x-biz': Klass
        },

        computed: {
            mainClass() {
                const loading = this.data.get('loading');
                const klass = cx.mainClass(this);

                if (loading) {
                    klass.push(cx('loading'));
                }

                return klass;
            },
            mainStyle() {
                const active = this.data.get('expand');
                const top = this.data.get('top');
                const width = this.data.get('width');
                const height = this.data.get('height');
                const expandTo = this.data.get('expandTo');

                const style = {
                    [expandTo]: active ? 0 : '-' + width,
                    'transition': expandTo + ' 0.5s',
                    'z-index': nextZindex()
                };

                if (expandTo === 'left' || expandTo === 'right') {
                    style.top = top;
                    style.height = '100%';
                    style.width = width;
                }
                else {
                    style.width = '100%';
                    style.height = height;
                }

                return style;
            }
        },

        messages: {
            loading(state) {
                this.data.set('loading', state.value);
            },
            show(state) {
                this.show(state.value);
            },
            hide() {
                this.hide();
            }
        },

        initData() {
            return _.defaults(data, {
                top: '0',
                width: '400px',
                height: '400px',
                expand: false,
                expandTo: 'right' // left | right | top | bottom
            });
        },

        suppressHide() {
            this._isSuppressing = true;
            this._suppressHandler();
        },

        hide(force = false) {
            if (force) {
                this.data.set('expand', false);
                return;
            }

            this.nextTick(() => {
                if (!this._isSuppressing) {
                    this.data.set('expand', false);
                }
            });
        },

        show(payload) {
            this.data.set('expand', true);
            this.data.set('payload', payload);
        },

        updated() {
            this.suppressHide();
        },

        inited() {
            const title = this.data.get('title');
            // FIXME(zhanghao25) 检查是否设置了对应命名的插槽，目前没有找到官方检查方法
            const hasHeader = 'header' in this.givenSlots.named || !!title;

            this.data.set('hasHeader', hasHeader);
        },

        attached() {
            $('body').bind('click.closeDrawer', () => this.hide());
        },

        disposed() {
            $('body').unbind('click.closeDrawer');
        }
    });

    Klass.__drawerComponent = Drawer;

    return Drawer;
};
