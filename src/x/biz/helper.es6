/**
 * @file inf-ui/x/biz/helper.es6
 * @author leeight
 */

import _ from 'lodash';
import Promise from 'promise';
import {defineComponent} from 'san';
import Dialog from 'inf-ui/x/components/Dialog';
import Button from 'inf-ui/x/components/Button';
import {create} from 'inf-ui/x/components/util';

import {hasSlot} from '../components/util';
import Breadcrumbs from './Breadcrumbs';
import LegacyActionAdapter from './LegacyActionAdapter';

const PlainDialog = defineComponent({
    template: `<template>
    <ui-dialog
        open
        width="{{width}}"
        s-ref="dialog">
        <span slot="head">{{title}}</span>
        {{message | raw}}
        <div slot="foot">
            <ui-button on-click="onConfirmDialog" skin="primary">{{foot.okBtn.label || '确定'}}</ui-button>
        </div>
    </ui-dialog>
    </template>`,
    components: {
        'ui-button': Button,
        'ui-dialog': Dialog
    },
    initData() {
        return {
            title: '确认',
            foot: {
                okBtn: {
                    label: '确定'
                }
            }
        };
    },
    onConfirmDialog() {
        this.fire('confirm');
    }
});

const AlertDialog = defineComponent({
    template: `<template>
    <ui-dialog
        open
        skin="alert"
        width="{{width}}"
        s-ref="dialog">
        <span slot="head">{{title}}</span>
        <div class="ui-dialog-icon ui-dialog-icon-warning"></div>
        <div class="ui-dialog-text">{{message | raw}}</div>
        <div slot="foot">
            <ui-button on-click="onConfirmDialog" skin="primary">确定</ui-button>
        </div>
    </ui-dialog>
    </template>`,
    components: {
        'ui-button': Button,
        'ui-dialog': Dialog
    },
    initData() {
        return {
            title: '确认'
        };
    },
    onConfirmDialog() {
        this.fire('confirm');
    }
});

const ConfirmDialog = defineComponent({
    template: `<template>
    <ui-dialog
        open
        s-ref="dialog"
        skin="confirm"
        width="{{width}}"
        on-close="onCloseDialog"
        on-confirm="onConfirmDialog">
        <span slot="head">{{title}}</span>
        <div class="ui-dialog-icon ui-dialog-icon-confirm"></div>
        <div class="ui-dialog-text">{{message | raw}}</div>
    </ui-dialog>
    </template>`,
    components: {
        'ui-dialog': Dialog
    },
    initData() {
        return {
            title: '请确认'
        };
    },
    onCloseDialog() {
        this.fire('close');
    },
    onConfirmDialog() {
        this.fire('confirm');
    }
});

function displayDialog(DialogComponent, data = {}) {
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

const cx = create('list-page');

export const Ghost = defineComponent({     // eslint-disable-line
    template: '<template><slot/></template>'
});

export const Page = defineComponent({      // eslint-disable-line
    template: `<div class="{{mainClass}}">
        <breadcrumbs s-if="breadcrumbs" items="{{breadcrumbs}}" />

        <div class="${cx('body')}">
            <div class="${cx('title')}" s-if="title || navs">
                <h2 s-if="title">{{title}}<span s-if="remark">{{remark}}</span></h2>
                <div class="ui-tab ui-tab-x" s-elif="navs">
                    <ul class="ui-tab-navigator">
                        <li
                            s-for="item in navs"
                            class="{{item.active ? 'ui-tab-item ui-tab-item-active' : 'ui-tab-item'}}"
                        >
                            <a href="{{item.link}}" s-if="item.link">{{item.text}}</a>
                            <span s-else>{{item.text}}</span>
                        </li>
                    </ul>
                </div>
                <slot name="helps" />
            </div>
            <div class="${cx('content')}">
                <div class="${cx('tip')}" s-if="withTip">
                    <slot name="tip" />
                </div>

                <slot name="filter" />

                <div class="${cx('toolbar')}" s-if="withToolbar">
                    <div class="${cx('tb-left')}">
                        <slot name="tb-left" />
                        <slot name="tb-filter" />
                    </div>
                    <div class="${cx('tb-right')}">
                        <slot name="tb-right" />
                    </div>
                </div>
                <slot/>
            </div>
        </div>
    </div>`,
    components: {
        breadcrumbs: Breadcrumbs
    },
    initData() {
        return {
            withSidebar: false,
            withTip: false,
            withToolbar: true,
            title: null,
            navs: null,
            remark: null,
            breadcrumbs: null
        };
    },
    computed: {
        mainClass() {
            const klass = [cx()];
            const withSidebar = this.data.get('withSidebar');
            if (withSidebar) {
                klass.push(cx('with-sidebar'));
            }

            return klass;
        }
    },
    hasSlot(name) {
        return hasSlot(this, name);
    },
    attached() {
        const withToolbar = this.hasSlot('tb-left') || this.hasSlot('tb-right') || this.hasSlot('tb-filter');
        this.data.set('withToolbar', withToolbar);
    }
});

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
    const myOptions = _.extend({
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
    // fields: ['a', 'b', 'c'] -> _.pick(payload, fields);
    // fields: ['a', ['id', 'userId'], 'c'] ->
    const requestPayload = fields ? {} : _.extend({}, payload);
    _.each(fields, key => {
        if (_.isArray(key)) {
            const [a, b] = key;
            requestPayload[b] = payload[a];
        }
        else if (_.isString(key)) {
            requestPayload[key] = payload[key];
        }
    });
    return _.extend(requestPayload, extra);
}

export function createToolbar(toolbar) {
    return _.map(toolbar, item => {
        if (item.type === 'button') {
            const btn = _.clone(item);
            if (btn.primary) {
                btn.skin = 'primary';
            }
            return btn;
        }
        else if (item.type === 'button-group') {
            const btnGroup = {
                type: item.type,
                value: item.$value || item.buttons[0].$value,
                datasource: _.map(item.buttons, btn => {
                    const {label, $value, ...props} = btn;
                    return _.extend({
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
    const keys = _.keys(when);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = when[key];
        if (compProxy.data.get(key) !== value) {
            return false;
        }
    }
    return true;
}
