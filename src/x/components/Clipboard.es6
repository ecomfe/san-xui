/**
 * @file Clipboard.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import XClipboard from 'clipboard/Clipboard';

import {create} from './util';

const cx = create('ui-clipboard');

/* eslint-disable */
const template = `<div class="{{mainClass}}"><slot/></div>`;
/* eslint-enable */

export default defineComponent({
    template,
    computed: {
        mainClass() {
            const klass = [cx(), cx('x')];
            return klass;
        }
    },
    initData() {
        return {
            text: null
        };
    },
    attached() {
        this.client = new XClipboard(this.el, {
            action: () => 'copy',                   // eslint-disable-line
            text: () => this.data.get('text')       // eslint-disable-line
        });
        this.client.on('beforecopy', () => this.fire('beforecopy'));
        this.client.on('success', () => this.fire('aftercopy'));
        this.client.on('error', () => this.fire('error'));
    }
});

