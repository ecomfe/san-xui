/**
 * @file SwitchLan.es6
 * @author chenbo09
 */

import {defineComponent} from 'san';
import Button from 'inf-ui/x/components/Button';

/* eslint-disable */
const template = `<div class="switch-lan">
        <xui-button icon="saml" skin="primary" size="small"  lable="{{label}}" on-click="onClick">{{label | i18n}}</xui-button>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'xui-button': Button
    },
    computed: {
        label() {
            const lan = this.data.get('lan');
            return lan === 'en' ? '切换至中文' : '切换至英文';
        }
    },
    attached() {
        const locale = /locale=([a-zA-Z\-]+)/g.exec(location.search);
        const toSet = (locale || [])[1];
        const lan = toSet === 'en-us' ? 'en' : 'zh';
        this.data.set('lan', lan);
    },
    onClick() {
        const lan = this.data.get('lan');
        const searchLocation = lan === 'en' ? 'locale=zh-cn' : 'locale=en-us';

        if (!location.search) {
            location.search = searchLocation;
            return;
        }

        let locale = /locale=([a-zA-Z\-]+)/g.exec(location.search);
        // 有locale参数，替换，没有locale参数，追加
        location.search = locale
            ? location.search.replace(locale[0], searchLocation)
            : location.search + '&' + searchLocation;
    }
});
