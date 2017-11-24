/**
 * @file inf-ui/x/biz/dialogAlertAction.es6
 * @author leeight
 */

import _ from 'lodash';

export function dialogAlertAction(config, payload) {
    const {width, title, body, foot} = config.dialog;
    const $title = _.template(title)(payload);
    const alertMessage = _.template(body.content)(payload);
    this.$alert({title: $title, width, foot, message: alertMessage}).then(() => {
        if (foot && foot.okBtn && foot.okBtn.actionType) {
            const config = foot.okBtn;
            this.dispatchAction(config, payload);
            // FIXME(leeight) 可能不太合适
            this.refreshTable();
        }
    });
}
