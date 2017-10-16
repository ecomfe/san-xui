/**
 * @file Clipboard.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import XClipboard from 'clipboard/Clipboard';

import {create} from './util';

const cx = create('ui-clipboard');

/* eslint-disable */
const template = `<div on-mouseleave="onMouseLeave" class="{{mainClass}}" aria-label="{{ariaLabel}}"><slot/></div>`;
/* eslint-enable */

export default defineComponent({
    template,
    computed: {
        mainClass() {
            const klass = [cx(), cx('x')];
            const ariaLabel = this.data.get('ariaLabel');
            if (ariaLabel) {
                klass.push('tooltipped', 'tooltipped-s');
            }
            return klass;
        }
    },
    initData() {
        return {
            ariaLabel: '复制到剪贴板',
            text: null
        };
    },
    attached() {
        this.client = new XClipboard(this.el, {
            action: () => 'copy',                   // eslint-disable-line
            text: () => this.data.get('text')       // eslint-disable-line
        });
        this.client.on('beforecopy', () => this.fire('beforecopy'));
        this.client.on('success', () => {
            this.data.set('ariaLabel', '复制成功');
            this.fire('aftercopy');
        });
        this.client.on('error', () => this.fire('error'));
    },
    onMouseLeave() {
        this.data.set('ariaLabel', '复制到剪贴板');
    }
});

