/**
 * 需要动态的创建子组件
 *
 * @file mixins/toast.js
 * @author leeight
 */

import Toast from '../x/components/Toast';

export default {
    $toast(options, toastOptions) {
        if (typeof options === 'string') {
            const messageType = toastOptions && toastOptions.messageType || 'success';
            Toast[messageType](options);
        }
    },

    $infoToast(options) {
        return this.$toast(options, {messageType: 'info'});
    },

    $errorToast(options) {
        return this.$toast(options, {messageType: 'error'});
    }
};
