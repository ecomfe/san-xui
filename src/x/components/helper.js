/**
 * @file san-xui/x/components/helper.js
 * @author leeight
 */

import ConfirmDialog from './ConfirmDialog';
import AlertDialog from './AlertDialog';
import PlainDialog from './PlainDialog';

export function asPromise(dialog) {
    return new Promise((resolve, reject) => {
        dialog.on('confirm', () => {
            resolve();
            dialog.dispose();
        });
        dialog.on('close', () => {
            reject();
            dialog.dispose();
        });
    });
}

export function displayDialog(DialogComponent, data = {}) {
    if (typeof data === 'string') {
        data = {message: data};
    }
    const dialog = new DialogComponent({data});
    dialog.attach(document.body);
    return asPromise(dialog);
}

export function plain(data) {
    return displayDialog(PlainDialog, data);
}

export function alert(data) {
    return displayDialog(AlertDialog, data);
}

export function confirm(data) {
    return displayDialog(ConfirmDialog, data);
}
