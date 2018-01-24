/**
 * @file components/Go.es6
 * @author leeight
 */
import $ from 'jquery';
import Promise from 'promise';
import {defineComponent} from 'san';

// import Service from 'common/service';
// import R from 'common/region';

// import {createClient, errorHandler} from './helper';

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

        /**
        const regionId = this.data.get('region');
        if (regionId) {
            // 切换之前先切 region
            return createClient()
                .then(client => client.setRegion({regionId}))
                .then(() => R.setCurrentRegion(regionId))
                .then(() => {
                    const rv = Service.current().switchTo(event);
                    if (!rv) {
                        // 因为之前组织的浏览器的默认行为，如果没有切换过去，就用暴力一些的方式。
                        // 比如 /iot2/viz|apollo 之类的路径
                        location.href = this.data.get('href');
                    }
                })
                .fail(error => {
                    errorHandler(this, error);
                    location.href = this.data.get('href');
                });
        }

        const rv = Service.current().switchTo(event);
        // 如果失败了，返回 null/undefined，链接正常跳转
        if (!rv) {
            location.href = this.data.get('href');
        }
        */
    }
});

// 默认情况下，点击没效果
Go.switchHandler = (event, comp) => Promise.resolve();

// 除非手工设置处理逻辑
Go.setSwitchHandler = handler => Go.switchHandler = handler;

export default Go;    // eslint-disable-line

