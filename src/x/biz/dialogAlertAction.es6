/**
 * @file inf-ui/x/biz/dialogAlertAction.es6
 * @author leeight
 */

import _ from 'lodash';
import AlertDialog from 'inf-ui/x/components/AlertDialog';

import {asPromise} from './helper';

export function dialogAlertAction(config, payload) {
    const {width, title, body, foot} = config.dialog;
    const $title = _.template(title)(payload);
    const alertMessage = _.template(body.content)(payload);

    const dialogData = {title: $title, width, foot, message: alertMessage};
    const dialog = new AlertDialog({data: dialogData});
    dialog.attach(document.body);
    this.$childs.push(dialog);

    return asPromise(dialog).then(() => {
        if (foot && foot.okBtn && foot.okBtn.actionType) {
            const config = foot.okBtn;
            this.dispatchAction(config, payload);
            // FIXME(leeight) 可能不太合适
            this.refreshTable();
        }
    });
}
