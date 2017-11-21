/**
 * @file biz/Page.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import {create} from 'inf-ui/x/components/util';

import Breadcrumbs from './Breadcrumbs';
import {hasSlot} from '../components/util';

const cx = create('list-page');

export const Page = defineComponent({      // eslint-disable-line
    template: `<div class="{{mainClass}}">
        <breadcrumbs s-if="breadcrumbs" items="{{breadcrumbs}}" />

        <div class="${cx('body')}">
            <div class="${cx('title')}" s-if="title || navs">
                <h2 s-if="title">{{title}}<span s-if="remark">{{remark}}</span></h2>
                <div class="ui-tab ui-tab-x" s-elif="navs">
                    <ul class="ui-tab-navigator">
                        <li
                            s-for="item in navs"
                            class="{{item.active ? 'ui-tab-item ui-tab-item-active' : 'ui-tab-item'}}"
                        >
                            <a href="{{item.link}}" s-if="item.link">{{item.text}}</a>
                            <span s-else>{{item.text}}</span>
                        </li>
                    </ul>
                </div>
                <slot name="helps" />
            </div>
            <div class="${cx('content')}">
                <div class="${cx('tip')}" s-if="withTip">
                    <slot name="tip" />
                </div>

                <slot name="filter" />

                <div class="${cx('toolbar')}" s-if="withToolbar">
                    <div class="${cx('tb-left')}">
                        <slot name="tb-left" />
                        <slot name="tb-filter" />
                    </div>
                    <div class="${cx('tb-right')}">
                        <slot name="tb-right" />
                    </div>
                </div>
                <slot/>
            </div>
        </div>
    </div>`,
    components: {
        breadcrumbs: Breadcrumbs
    },
    initData() {
        return {
            withSidebar: false,
            withTip: false,
            withToolbar: true,
            title: null,
            navs: null,
            remark: null,
            breadcrumbs: null
        };
    },
    computed: {
        mainClass() {
            const klass = [cx()];
            const withSidebar = this.data.get('withSidebar');
            if (withSidebar) {
                klass.push(cx('with-sidebar'));
            }

            return klass;
        }
    },
    hasSlot(name) {
        return hasSlot(this, name);
    },
    attached() {
        const withToolbar = this.hasSlot('tb-left') || this.hasSlot('tb-right') || this.hasSlot('tb-filter');
        this.data.set('withToolbar', withToolbar);
    }
});
