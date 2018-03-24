/**
 * @file demos/xui-layer.js
 * @author chenbo09
 */

import {defineComponent} from 'san';
import {Row, Tip, Layer, Button, Select, TextBox, MultiPicker, Toast, BoxGroup} from 'san-xui';

/* eslint-disable */
const template = `
<template>
<x-row label="center-to-view=true width=700 auto-hide-except-parent=false">
<xui-button skin="primary" on-click="onShowLayer">Show Layer</xui-button>
<xui-layer class="demo-layer" center-to-view="{{true}}" auto-hide-except-parent="{{false}}" open="{=layer.showLayer=}">
    <x-row label="type=default">
        <xui-tip><xui-button>Button In Tip</xui-button></xui-tip>
        <xui-button on-click="closeTheLayer">关闭.</xui-button>
        <xui-button on-click="openNewLayer">打开一个新的Layer.</xui-button>
        <xui-select multi filter layer-width="300" datasource="{{select.datasource}}" value="{=select.value=}" />
    </x-row>

    <x-row label="type=text">
        <xui-textbox placeholder="This is placeholder" value="{=text.value=}" on-enter="onPressEnterOnTextBox" />
        <xui-textbox disabled placeholder="This is disabled textbox" />
        Value is: {{text.value}}
    </x-row>

    <x-row label="type=password">
        <xui-textbox width="{{100}}" type="password" placeholder="This is placeholder" value="{=password.value=}" />
        <xui-textbox disabled width="300px" type="password" placeholder="This is disabled textbox" />
        Password is: {{password.value}}
    </x-row>

    <x-row label="multiline">
        <xui-textbox multiline placeholder="This is placeholder" value="{=textarea.value=}" />
        <xui-textbox multiline disabled placeholder="This is disabled textbox" />
        Value is: {{textarea.value}}
    </x-row>
</xui-layer>

<xui-layer class="demo-layer" auto-hide-except-parent="{{false}}" open="{=layer.showLayer2=}">
    <xui-select datasource="{{select.datasource}}" value="{=select.value=}" />
    <xui-button on-click="closeTheLayer">关闭上一个Layer</xui-button>
</xui-layer>

</x-row>

<x-row label="follow-scroll=false offset-top=100 offset-left=100" class="layer-test-row">
<xui-button skin="primary" on-click="openThirdLayer">Show another Layer</xui-button>
<xui-layer class="demo-layer" follow-scroll="{{false}}" offset-top="{{100}}" offset-left="{{100}}" open="{=layer.showLayer3=}">
    <x-row label="radio">
        <xui-boxgroup
            box-type="radio"

            datasource="{{boxgroup.datasource}}"
            value="{=boxgroup.radio=}"/>
        <strong class="large">
            Value is: {{boxgroup.radio}}
        </strong>

    </x-row>

    <x-row label="checkbox">
        <xui-boxgroup
            box-type="checkbox"
            datasource="{{boxgroup.datasource}}"
            value="{=boxgroup.checkbox=}"/>
        <strong class="large">
            Value is: {{boxgroup.checkbox}}
        </strong>
    </x-row>

    <x-row label="checkbox,col-count=3">
        <xui-boxgroup
            box-type="checkbox"

            datasource="{{boxgroup.datasource}}"
            value="{=boxgroup.checkbox=}"/>
        <strong class="large">
            Value is: {{boxgroup.checkbox}}
        </strong>
    </x-row>

    <x-row label="操作系统">
        <xui-multipicker
            datasource="{{os.datasource}}"
            value="{=os.value=}"/>
        <strong class="large">
            操作系统: {{os.value}}
        </strong>
    </x-row>

</xui-layer>
</x-row>

<x-row label="width=300 height=500">
    <xui-button skin="primary" on-click="openFourthLayer">Show fourth Layer</xui-button>
    <xui-layer class="demo-layer" width="{{300}}" height="{{500}}" open="{=layer.showLayer4=}">
        <xui-select datasource="{{select.datasource}}" value="{=select.value=}" />
    </xui-layer>
</x-row>

</template>`;

/* eslint-enable */


function getImages(osType) {
    switch (osType) {
        case 'CentOS':
            return [
                {text: '7.1 x86_64 (64bit)', value: 'da93d591-4130-4870-81a9-d84daf9a8c4c'},
                {text: '6.8 x86_64 (64bit)', value: 'b8639e78-b3e9-4fa5-b69e-32294b9f4b4b'},
                {text: '6.5 x86_64 (64bit)', value: '2b366fe9-63ac-4c63-8c78-516bc5acb950'},
                {text: '7.2 x86_64 (64bit)', value: 'bad85757-b6c6-4026-b34c-e7677435c149'},
                {text: '6.5 i386 (32bit)', value: '60422670-4389-4026-ae22-b77f2be48210'}
            ];
        case 'Debian':
            return [
                {text: '8.1.0 amd64 (64bit)', value: '166df269-54b6-4841-a2c2-4672e0505b82'},
                {text: '7.5.0 amd64 (64bit)', value: 'f7369fc5-9419-41c5-833f-28401d87dda3'}
            ];
        case 'Ubuntu':
            return [
                {text: '12.04.4 LTS amd64 (64bit)', value: 'ed97a9ef-7b1e-48ec-96ee-c8a01a13e1e5'},
                {text: '14.04.1 LTS amd64 (64bit)', value: '3fa6fedb-c62a-4acb-b198-373b0d00e069'},
                {text: '16.04 LTS amd64 (64bit)', value: '3c9832ea-3277-4716-926c-925489aa165d'},
                {text: '16.04 LTS i386 (32bit)', value: '0cbe2924-1325-4d94-8e96-2989dd0a0aad'},
                {text: '14.04.1 LTS i386 (32bit)', value: '1cce752d-fa3c-4af7-8e5d-9e7d3b603c9d'},
                {text: '12.04.4 LTS i386 (32bit)', value: '37fcf765-f6fb-43b7-94c9-ee4153b58953'}
            ];
        case 'Windows Server':
            return [
                {text: '2008 R2 x86_64 (64bit) 中文版', value: '7beb02e6-5daf-4b5c-b7a0-e68f4bbcc916', disabled: true},
                {text: '2012 R2 x86_64 (64bit) 中文版', value: '4af300d1-5dca-4fce-a919-5e25e96ec887'},
                {text: '2016 x86_64 (64bit) 中文版', value: 'f30c74f2-07dc-4e1d-a5e6-2d5f03f737cf'}
            ];
        default:
            return [];
    }
}


export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-tip': Tip,
        'xui-select': Select,
        'xui-layer': Layer,
        'xui-button': Button,
        'xui-textbox': TextBox,
        'xui-multipicker': MultiPicker,
        'xui-boxgroup': BoxGroup
    },
    initData() {
        return {
            select: {
                value: 'abc7',
                multi: {
                    value: ['foo', 'bar', 'abc1', 'abc2']
                },
                datasource: [
                    {text: 'foo', value: 'foo'},
                    {text: 'bar', value: 'bar'},
                    {text: '123', value: '123', disabled: true},
                    {text: 'abc1', value: 'abc1'},
                    {text: 'abc2', value: 'abc2'},
                    {text: 'abc3', value: 'abc3'},
                    {text: 'abc4', value: 'abc4'},
                    {text: 'abc5', value: 'abc5'},
                    {text: 'abc6', value: 'abc6'},
                    {text: 'abc7', value: 'abc7'},
                    {text: 'abc8', value: 'abc8'},
                    {text: 'abc9', value: 'abc9'},
                    {text: 'abc0', value: 'abc0'}
                ]
            },
            os: {
                value: ['Windows Server', 'f30c74f2-07dc-4e1d-a5e6-2d5f03f737cf'],
                datasource: [
                    {
                        text: 'CentOS',
                        value: 'CentOS',
                        children: getImages('CentOS')
                    },
                    {
                        text: 'Debian',
                        value: 'Debian',
                        children: getImages('Debian')
                    },
                    {
                        text: 'Ubuntu',
                        value: 'Ubuntu',
                        disabled: true,
                        children: getImages('Ubuntu')
                    },
                    {
                        text: 'Windows Server',
                        value: 'Windows Server',
                        children: getImages('Windows Server')
                    }
                ]
            },
            boxgroup: {
                datasource: [
                    {text: 'foo', value: 'foo'},
                    {text: 'bar', value: 'bar'},
                    {text: '123', value: '123', disabled: true},
                    {text: 'abc1', value: 'abc1'},
                    {text: 'abc2', value: 'abc2'},
                    {text: 'abc3', value: 'abc3'},
                    {text: 'abc4', value: 'abc4'},
                    {text: 'abc5', value: 'abc5'},
                    {text: 'abc6', value: 'abc6'},
                    {text: 'abc7', value: 'abc7'},
                    {text: 'abc8', value: 'abc8'},
                    {text: 'abc9', value: 'abc9'},
                    {text: 'abc0', value: 'abc0'}
                ]
            }
        };
    },
    onShowLayer() {
        this.data.set('layer.showLayer', true);
    },
    openNewLayer() {
        this.data.set('layer.showLayer2', true);
    },
    openThirdLayer() {
        this.data.set('layer.showLayer3', true);
    },
    openFourthLayer() {
        this.data.set('layer.showLayer4', true);
    },
    closeTheLayer() {
        this.data.set('layer.showLayer', false);
    },
    onPressEnterOnTextBox() {
        Toast.info('Enter pressed');
    }
});
