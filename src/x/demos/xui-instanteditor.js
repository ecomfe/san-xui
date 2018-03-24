/**
 * @file demos/xui-instanteditor.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, InstantEditor, TextBox, Select} from 'san-xui';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <table border="1" cellpadding="5" class="bordered-table">
        <tbody>
            <tr>
                <th width="50px">名称</th>
                <td>
                    {{formData.name}}
                    <xui-instanteditor
                        active="{=active.name=}"
                        submiting="{=submiting.name=}"
                        error="{=error.name=}"
                        on-submit="onInstantEditSubmit($event, 'name')">
                        <xui-textbox value="{{formData.name}}" />
                    </xui-instanteditor>
                </td>
            </tr>
            <tr>
                <th>描述</th>
                <td>
                    {{formData.description}}
                    <xui-instanteditor
                        active="{=active.description=}"
                        submiting="{=submiting.description=}"
                        error="{=error.description=}"
                        on-submit="onInstantEditSubmit($event, 'description')">
                        <xui-select
                            datasource="{{ee.datasource}}"
                            value="{{formData.description}}" />
                    </xui-instanteditor>
                </td>
            </tr>
        </tbody>
    </table>
</x-row>
</template>`;
/* eslint-enable */

function doSubmit(key, value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() >= .8) {
                reject(new Error('RANDOM error happened!'));
            }
            else {
                resolve();
            }
        }, 1000);
    });
}

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-textbox': TextBox,
        'xui-select': Select,
        'xui-instanteditor': InstantEditor
    },
    initData() {
        return {
            ee: {
                datasource: [
                    {text: 'Option 1', value: 'foo'},
                    {text: 'Option 2', value: 'bar'}
                ]
            },
            formData: {
                name: 'i-5cSGjffb',
                description: '无'
            }
        };
    },
    onInstantEditSubmit({value}, key) {
        this.data.set(`submiting.${key}`, true);
        doSubmit(key, value)
            .then(() => {
                this.data.set(`submiting.${key}`, false);
                this.data.set(`active.${key}`, false);
                this.data.set(`formData.${key}`, value);
            })
            .catch(error => {
                this.data.set(`submiting.${key}`, false);
                this.data.set(`error.${key}`, error);
            });
    }
});
