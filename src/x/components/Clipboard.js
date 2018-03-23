/**
 * @file Clipboard.js
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';
import XClipboard from 'clipboard';

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
            const tipPosition = this.data.get('tipPosition');
            if (ariaLabel) {
                klass.push('tooltipped', 'tooltipped-' + tipPosition);
            }
            return klass;
        }
    },
    initData() {
        return {
            ariaLabel: '复制到剪贴板',
            tipPosition: 's', // 'n', 'e', 's', 'w'
            text: null
        };
    },
    dataTypes: {
        /**
         * Tip的文案
         * @default 复制到剪贴板
         */
        ariaLabel: DataTypes.string,

        /**
         * Tip展示的位置
         * @default s
         */
        tipPosition: DataTypes.oneOf(['n', 'e', 's', 'w']),

        /**
         * 需要复制的内容
         */
        text: DataTypes.string.isRequired
    },
    detached() {
        this.client.destroy();
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

