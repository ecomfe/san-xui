/**
 * @file demos/xui-region.es6
 * @author leeight
 */

import {defineComponent} from 'inf-ui/sanx';
import Region from 'inf-ui/x/components/Region';

import Row from './Row';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
    <xui-region value="{=value=}" />
    <strong class="large">
        Value is: {{value}}
    </strong>
</x-row>

<x-row label="value">
    <xui-region value="{=value2=}" />
    <strong class="large">
        Value is: {{value2}}
    </strong>
</x-row>

<x-row label="value;disabled">
    <xui-region disabled value="{=value2=}" />
    <strong class="large">
        Value is: {{value2}}
    </strong>
</x-row>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-region': Region
    },
    initData() {
        return {
            value: [],
            value2: [110000, 110100, 110104]
        };
    }
});
