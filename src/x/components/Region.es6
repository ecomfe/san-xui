/**
 * @file inf-ui/x/components/Region.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import MultiPicker from 'inf-ui/x/components/MultiPicker';

import {asInput} from './asInput';
import {create} from './util';
import kDs from './data/regions';

const cx = create('ui-region');

/* eslint-disable */
const template = `<template>
<div class="{{mainClass}}" style="{{mainStyle}}">
    <ui-multipicker
        disabled="{{disabled}}"
        datasource="{{datasource}}"
        value="{=value=}"
    />
</div>
</template>`;
/* eslint-enable */

const Region = defineComponent({
    template,
    components: {
        'ui-multipicker': MultiPicker
    },
    computed: {
        mainClass() {
            const klass = cx.mainClass(this);
            return klass;
        },
        mainStyle() {
            const style = cx.mainStyle(this);
            return style;
        }
    },
    initData() {
        return {
            datasource: kDs,
            disabled: false,
            value: []
        };
    }
});

export default asInput(Region);
