/**
 * @file san-xui/x/components/Go.js
 * @author leeight
 */
import $ from 'jquery';
import {defineComponent} from 'san';

const template = `<a on-click="switchTo($event)"
    target="{{target}}"
    title="{{title}}"
    href="{{href}}"><slot/></a>`;

const Go = defineComponent({    // eslint-disable-line
    template,
    initData() {
        return {
            target: '_self',
            region: null
        };
    },

    switchTo(nativeEvent) {
        const event = $.event.fix(nativeEvent);
        event.preventDefault();
        event.stopPropagation();

        Go.switchHandler(event, this)
            .catch(() => location.href = this.data.get('href'));
    }
});

// 默认情况下，点击没效果
Go.switchHandler = (event, comp) => Promise.resolve();

// 除非手工设置处理逻辑
Go.setSwitchHandler = handler => Go.switchHandler = handler;

export default Go;    // eslint-disable-line

