/**
 * @file san-xui/x/biz/ajaxAction.es6
 * @author leeight
 */

import _ from 'lodash';

import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';
import {asPromise, createPayload} from './helper';

export function ajaxAction(config, payload) {
    const {api, $payloadFields, $extraPayload} = config;

    const {confirmText, $toastMessage} = config;

    const {$onRequest, $before, $onResponse, $done, $onError, $error} = config;
    const onRequest = $onRequest || $before;
    const onResponse = $onResponse || $done;
    const onError = $onError || $error;

    const sendRequest = () => {
        const requestPayload = createPayload(payload, $payloadFields, $extraPayload);
        if (typeof onRequest === 'function') {
            onRequest.call(this, requestPayload);
        }
        return this.$post(api, requestPayload)
            .then(response => {
                if ($toastMessage) {
                    Toast.success($toastMessage, 3000);
                }
                if (typeof onResponse === 'function') {
                    return onResponse.call(this, response, requestPayload);
                }
                return this.refreshTable();
            })
            .fail(error => {
                if (typeof onError === 'function') {
                    onError.call(this, error, requestPayload);
                }

                if (error.global) {
                    Toast.error(error.global);
                }
                this.data.set('error', error);
            });
    };

    if (confirmText) {
        const message = _.template(confirmText)(payload);
        const dialog = new ConfirmDialog({data: {message}});
        dialog.attach(document.body);
        this.$childs.push(dialog);
        return asPromise(dialog).then(sendRequest);
    }
    return sendRequest();
}
