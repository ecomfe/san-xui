/**
 * @file demos/xui-multipicker.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, MultiPicker} from 'san-xui';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-multipicker
        datasource="{{mp.datasource}}"
        value="{=mp.value=}"
        />
    <strong class="large">
        Value is: {{mp.value}}
    </strong>
</x-row>

<x-row label="操作系统">
    <xui-multipicker
        datasource="{{os.datasource}}"
        value="{=os.value=}"
        />
    <strong class="large">
        操作系统: {{os.value}}
    </strong>
</x-row>

<x-row label="lazy-loading,loader">
    <xui-multipicker
        datasource="{{lazy.datasource}}"
        loader="{{lazy.loader}}"
        value="{=lazy.value=}"
        />
    <strong class="large">
        操作系统: {{lazy.value}}
    </strong>
</x-row>

<x-row label="disabled">
    <xui-multipicker
        disabled
        datasource="{{mp.datasource}}"
        value="{=mp.value=}"
        />
    <strong class="large">
        Value is: {{mp.value}}
    </strong>
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
        'xui-multipicker': MultiPicker
    },
    initData() {
        return {
            lazy: {
                value: [],
                loader: values => {   // eslint-disable-line
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            if (values.length === 1) {
                                const osType = values[0];
                                if (Math.random() > .8) {
                                    reject(new Error('RANDOM error happened'));
                                    return;
                                }

                                const children = getImages(osType);
                                if (osType === 'CentOS') {
                                    children[0].expandable = true;
                                }

                                resolve(children);
                            }
                            else if (values.length === 2) {
                                const imageId = values[1];
                                if (imageId === 'da93d591-4130-4870-81a9-d84daf9a8c4c') {
                                    resolve([
                                        {text: 'xxx', value: 'xxx'},
                                        {text: 'yyy', value: 'yyy'},
                                        {text: 'zzz', value: 'zzz'}
                                    ]);
                                }
                                else {
                                    resolve([]);
                                }
                            }
                        }, 500);
                    });
                },
                datasource: [
                    {
                        text: 'CentOS',
                        value: 'CentOS',
                        expandable: true
                    },
                    {
                        text: 'Debian',
                        value: 'Debian',
                        expandable: true
                    },
                    {
                        text: 'Ubuntu',
                        value: 'Ubuntu',
                        expandable: true,
                        disabled: true
                    },
                    {
                        text: 'Windows Server',
                        value: 'Windows Server',
                        expandable: true
                    }
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
            mp: {
                value: ['xyz', 'xyz1', 'xyz1_1'],
                datasource: [
                    {
                        text: 'foo',
                        value: 'foo',
                        children: [
                            {text: 'foo1', value: 'foo1'},
                            {text: 'foo2', value: 'foo2'},
                            {text: 'foo3', value: 'foo3'},
                            {text: 'foo4', value: 'foo4'},
                            {text: 'foo5', value: 'foo5'}
                        ]
                    },
                    {
                        text: 'bar',
                        value: 'bar',
                        children: [
                            {text: 'bar1', value: 'bar1'},
                            {text: 'bar2', value: 'bar2'},
                            {text: 'bar3', value: 'bar3'},
                            {text: 'bar4', value: 'bar4'},
                            {text: 'bar5', value: 'bar5'}
                        ]
                    },
                    {
                        text: 'xyz',
                        value: 'xyz',
                        children: [
                            {
                                text: 'xyz1',
                                value: 'xyz1',
                                children: [
                                    {text: 'xyz1_1', value: 'xyz1_1'},
                                    {
                                        text: 'xyz1_2',
                                        value: 'xyz1_2',
                                        children: [
                                            {text: 'xyz1_2_1', value: 'xyz1_2_1'},
                                            {text: 'xyz1_2_2', value: 'xyz1_2_2'},
                                            {text: 'xyz1_2_3', value: 'xyz1_2_3'},
                                            {text: 'xyz1_2_4', value: 'xyz1_2_4'},
                                            {text: 'xyz1_2_5', value: 'xyz1_2_5'}
                                        ]
                                    },
                                    {text: 'xyz1_3', value: 'xyz1_3'},
                                    {text: 'xyz1_4', value: 'xyz1_4'},
                                    {text: 'xyz1_5', value: 'xyz1_5'},
                                    {text: 'xyz1_6', value: 'xyz1_6'}
                                ]
                            },
                            {text: 'xyz2', value: 'xyz2'},
                            {text: 'xyz3', value: 'xyz3'},
                            {text: 'xyz4', value: 'xyz4'},
                            {text: 'xyz5', value: 'xyz5'}
                        ]
                    }
                ]
            }
        };
    }
});
