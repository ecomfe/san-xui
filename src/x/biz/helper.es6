/**
 * @file inf-ui/x/biz/helper.es6
 * @author leeight
 */

import u from 'lodash';
import Promise from 'promise';
import ConfirmDialog from 'inf-ui/x/components/ConfirmDialog';
import AlertDialog from 'inf-ui/x/components/AlertDialog';
import PlainDialog from 'inf-ui/x/components/PlainDialog';
import {asDialog} from 'inf-ui/x/components/asDialog';

import LegacyActionAdapter from './LegacyActionAdapter';
import _Page from './Page';
import _Ghost from './Ghost';

export const Page = _Page;
export const Ghost = _Ghost;

export function displayDialog(DialogComponent, data = {}) {
    if (typeof data === 'string') {
        data = {message: data};
    }
    return new Promise((resolve, reject) => {
        const dialog = new DialogComponent({data});
        dialog.attach(document.body);
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

export function buildDialog(Klass) {
    return asDialog(Klass);
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

export function waitActionDialog(dialogOptions, actionOptions) {
    const myOptions = u.extend({
        open: true,
        width: 'auto',
        height: 'auto',
        title: 'Dialog Title'
    }, dialogOptions);
    myOptions.options = actionOptions;

    const component = new LegacyActionAdapter({
        data: {
            dialog: true,
            actionOptions: myOptions
        }
    });
    component.attach(document.body);
    return component;
}


export function createPayload(payload, fields, extra) {
    // fields: ['a', 'b', 'c'] -> u.pick(payload, fields);
    // fields: ['a', ['id', 'userId'], 'c'] ->
    const requestPayload = fields ? {} : u.extend({}, payload);
    u.each(fields, key => {
        if (u.isArray(key)) {
            const [a, b] = key;
            requestPayload[b] = payload[a];
        }
        else if (u.isString(key)) {
            requestPayload[key] = payload[key];
        }
    });
    return u.extend(requestPayload, extra);
}

export function createToolbar(toolbar) {
    return u.map(toolbar, item => {
        if (item.type === 'button') {
            const btn = u.clone(item);
            if (btn.primary) {
                btn.skin = 'primary';
            }
            return btn;
        }
        else if (item.type === 'button-group') {
            const btnGroup = {
                type: item.type,
                value: item.$value || item.buttons[0].$value,
                datasource: u.map(item.buttons, btn => {
                    const {label, $value, ...props} = btn;
                    return u.extend({
                        text: label,
                        value: $value
                    }, props);
                })
            };
            return btnGroup;
        }
        return item;
    });
}


export function matchAll(compProxy, when) {
    const keys = u.keys(when);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = when[key];
        if (compProxy.data.get(key) !== value) {
            return false;
        }
    }
    return true;
}


