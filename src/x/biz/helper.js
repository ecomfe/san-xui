/**
 * @file san-xui/x/biz/helper.js
 * @author leeight
 */

import u from 'lodash';
import moment from 'moment';
import Promise from 'promise';

import ConfirmDialog from '../components/ConfirmDialog';
import AlertDialog from '../components/AlertDialog';
import PlainDialog from '../components/PlainDialog';
import {asDialog} from '../components/asDialog';
import LegacyActionAdapter from './LegacyActionAdapter';
import _Page from './Page';
import _Ghost from './Ghost';

export const Page = _Page;
export const Ghost = _Ghost;

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
                    const {label, $value} = btn;
                    const props = u.omit(btn, 'label', '$value');
                    return u.extend({text: label, value: $value}, props);
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

export function valueTransform(formData) {
    const transformedData = {};
    const keyMap = formData.__s_key || [];
    u.each(formData, (v, k) => {
        if (/^__key_(.*)$/.test(k)) {
            const config = keyMap[+RegExp.$1];
            if (!config) {
                return;
            }
            if (config.type === 'p') {
                // 没有对应的 key，把 v 直接合并到 transformedData 里面去
                u.extend(transformedData, v);
            }
            else if (config.type === 'j') {
                // 对应的 key 是 JSON，重新处理恢复一下
                //
                // 针对 type: rangecalendar 的特殊情况
                // name: {
                //   begin: 'beginTime',
                //   end: 'endTime'
                // },
                // value: {
                //   begin: ...,
                //   end: ...
                // }
                u.each(config.value, (name, valueKey) => {
                    const value = v[valueKey];
                    if (value != null) {
                        transformedData[name] = value;
                    }
                });
            }
        }
        else if (k !== '__s_key') {
            transformedData[k] = v;
        }
    });

    u.each(transformedData, (v, k) => {
        if (u.isDate(v)) {
            transformedData[k] = moment(v).utc().format('YYYY-MM-DDTHH:mm:ss') + 'Z';
        }
    });

    return transformedData;
}
