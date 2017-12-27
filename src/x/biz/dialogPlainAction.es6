/**
 * @file inf-ui/x/biz/dialogPlainAction.es6
 * @author leeight
 */

import _ from 'lodash';
import {asDialog} from 'inf-ui/x/components/asDialog';
import PlainDialog from 'inf-ui/x/components/PlainDialog';

import {asPromise} from './helper';

export function dialogPlainAction(config, payload) {
    const {width, title, body, foot} = config.dialog;
    const $title = _.template(title)(payload);
    const content = body.content;

    let DialogComponent = null;
    let dialogData = null;

    if (typeof content === 'function') {
        // 重新构造一个动态的组件出来
        DialogComponent = asDialog(content);
        dialogData = {title: $title, width, foot, payload};
    }
    else {
        DialogComponent = PlainDialog;
        dialogData = {
            title: $title,
            width,
            foot,
            message: _.template(content)(payload)
        };
    }
    // 如果没有定义foot，则不作为输入
    if (dialogData.foot === undefined) {
        delete dialogData.foot;
    }

    const dialog = new DialogComponent({data: dialogData});
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
