/**
 * @file demos/xui-tab.es6
 * @author leeight
 */

import {defineComponent} from 'san';
import Tab from 'inf-ui/x/components/Tab';
import TabPanel from 'inf-ui/x/components/TabPanel';
import Button from 'inf-ui/x/components/Button';
import MonthView from 'inf-ui/x/components/MonthView';

/* eslint-disable */
const template = `<template>
<xui-tab>
    <xui-tab-panel title="图片处理">
        <xui-button>图片处理</xui-button>
    </xui-tab-panel>
    <xui-tab-panel title="图像审核">
        <xui-button>图像审核</xui-button>
    </xui-tab-panel>
    <xui-tab-panel title="音视频处理">
        <xui-button>音视频处理</xui-button>
    </xui-tab-panel>
    <xui-tab-panel title="Android批量打包">
        <xui-monthview />
    </xui-tab-panel>
</xui-tab>
</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'xui-button': Button,
        'xui-monthview': MonthView,
        'xui-tab': Tab,
        'xui-tab-panel': TabPanel
    },
    initData() {
        return {
        };
    }
});
