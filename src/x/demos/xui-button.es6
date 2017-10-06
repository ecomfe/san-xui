/**
 * @file demos/xui-button.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import Button from 'inf-ui/x/components/Button';

/* eslint-disable */
const template = `<template>
<xui-button>Hello xui-button</xui-button>
<xui-button skin="primary">primary skin</xui-button>
<xui-button skin="danger">danger skin</xui-button>
<xui-button disabled skin="primary">disabled button</xui-button>
<xui-button icon="refresh" />
<xui-button icon="refresh" disabled />
<xui-button icon="download" />
<xui-button icon="download" disabled />
<xui-button icon="sdk" />
<xui-button icon="sdk" disabled />
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'xui-button': Button
    }
});

