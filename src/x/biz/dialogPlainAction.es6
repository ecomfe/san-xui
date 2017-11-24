/**
 * @file inf-ui/x/biz/dialogPlainAction.es6
 * @author leeight
 */

import _ from 'lodash';
import {asDialog} from 'inf-ui/x/components/asDialog';

import {displayDialog} from './helper';

export function dialogPlainAction(config, payload) {
    const {width, title, body, foot} = config.dialog;
    const $title = _.template(title)(payload);
    const content = body.content;
    if (typeof content === 'function') {
        // 重新构造一个动态的组件出来
        const DialogComponent = asDialog(content);
        const dialogData = {
            title: $title, width, foot, payload
        };
        return displayDialog(DialogComponent, dialogData).then(() => {
            if (foot && foot.okBtn && foot.okBtn.actionType) {
                const config = foot.okBtn;
                this.dispatchAction(config, payload);
                // FIXME(leeight) 可能不太合适
                this.refreshTable();
            }
        });
    }
    const plainMessage = _.template(content)(payload);
    return this.$plain({title: $title, width, foot, message: plainMessage}).then(() => {
        if (foot && foot.okBtn && foot.okBtn.actionType) {
            const config = foot.okBtn;
            this.dispatchAction(config, payload);
            // FIXME(leeight) 可能不太合适
            this.refreshTable();
        }
    });
}
