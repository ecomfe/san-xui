/**
 * @file san-xui/x/biz/dialogXLoaderAction.js
 * @author leeight
 */

import _ from 'lodash';

import Toast from '../components/Toast';
import LegacyActionAdapter from './LegacyActionAdapter';
import {createPayload} from './helper';

export function dialogXLoaderAction(config, payload) {
    const {width, height, title, body, foot} = config.dialog;
    const {$payloadFields, $extraPayload, url, module} = body;
    const {actionLoaded, beforeOk, ok, beforeClose, close} = config.events || {};
    const $title = _.template(title)(payload);

    const parentAction = {
        reload: () => {
            // TODO 对于formAction的加载，不会有这个方法，只能手动增加处理
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

    const component = new LegacyActionAdapter({parent: this, data: compData});
    _.isFunction(actionLoaded) && component.on('actionloaded', actionLoaded);
    _.isFunction(beforeOk) && component.on('beforeok', beforeOk);
    _.isFunction(ok) && component.on('ok', ok);
    _.isFunction(beforeClose) && component.on('beforeclose', beforeClose);
    _.isFunction(close) && component.on('close', close);
    component.attach(document.body);
    this.$childs.push(component);
}
