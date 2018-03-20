/**
 * @file demos/xui-as-drawer.js
 * @author zhanghao25
 */

import {asDrawer} from 'san-xui';
import {Component, defineComponent} from 'san';

class BizComponent extends Component {
    get template() {
        return `
            <template>
                <div>
                    <label>异步数据</label>
                    <span>{{data}}</span>
                </div>
            </template>
        `;
    }

    inited() {
        this.watch('payload.id', id => this._fetchData(id));
    }

    _fetchData(id) {
        this.dispatch('loading', true);

        setTimeout(() => {
            this.data.set('data', 'asdfasfasdf');
            this.dispatch('loading', false);
        }, 1000);
    }
}

export default defineComponent({
    trimWhitespace: 'blank',
    template: `
        <template>
            <xui-as-drawer expand="{= expand =}" payload="{{payload}}" expandTo="{{expandTo}}">
                <div slot="header">线索ID：{{payload.id}}</div>
            </xui-as-drawer>

            <button on-click="expandToLeft">left</button>
            <button on-click="expandToRight">right</button>
            <button on-click="expandToTop">top</button>
            <button on-click="expandToBottom">bottom</button>
        </template>
    `,
    components: {
        'xui-as-drawer': asDrawer(BizComponent)
    },
    initData() {
        return {
            expand: true,
            expandTo: 'right',
            payload: {id: 123123}
        };
    },
    expandToLeft() {
        // 先隐藏，再显示
        setTimeout(() => {
            this.data.set('payload', {id: 1});
            this.data.set('expandTo', 'left');
            this.data.set('expand', true);
        }, 100);
    },
    expandToRight() {
        // 先隐藏，再显示
        setTimeout(() => {
            this.data.set('payload', {id: 2});
            this.data.set('expandTo', 'right');
            this.data.set('expand', true);
        }, 100);
    },
    expandToTop() {
        // 先隐藏，再显示
        setTimeout(() => {
            this.data.set('payload', {id: 3});
            this.data.set('expandTo', 'top');
            this.data.set('expand', true);
        }, 100);
    },
    expandToBottom() {
        // 先隐藏，再显示
        setTimeout(() => {
            this.data.set('payload', {id: 4});
            this.data.set('expandTo', 'bottom');
            this.data.set('expand', true);
        }, 100);
    }
});
