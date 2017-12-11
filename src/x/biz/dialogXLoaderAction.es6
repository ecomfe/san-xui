/**
 * @file inf-ui/x/biz/dialogXLoaderAction.es6
 * @author leeight
 */

import _ from 'lodash';
import Toast from 'inf-ui/x/components/Toast';

import LegacyActionAdapter from './LegacyActionAdapter';
import {createPayload} from './helper';

export function dialogXLoaderAction(config, payload) {
    const {width, height, title, body, foot, confirm} = config.dialog;
    const {$payloadFields, $extraPayload, url, module} = body;
    const $title = _.template(title)(payload);

    const parentAction = {
        reload: () => {
            this.refreshTable();
        },
        view: {
            showToast(message, options) {
                Toast[options.messageType || 'success'](message);
            }
        },
        // TODO(leeight) 貌似不是一个好的设计
        dispatchCommand: (type, id) => this.dispatchCommand(type, id)
    };
    const actionOptions = {
        open: true,
        width: width || 'auto',
        height: height || 'auto',
        title: $title, url,
        module,
        options: _.extend(
            {parentAction},
            createPayload(payload, $payloadFields, $extraPayload)
        )
    };
    const compData = {dialog: true, actionOptions};
    if (foot != null) {
        compData.foot = foot;
    }
    if (confirm && _.isObject(confirm)) {
        // 想配置确认按钮的文案和状态
        compData.confirm = confirm;
    }
    const component = new LegacyActionAdapter({parent: this, data: compData});
    component.attach(document.body);
    this.$childs.push(component);
}
