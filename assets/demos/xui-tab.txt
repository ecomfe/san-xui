/**
 * @file demos/xui-tab.js
 * @author leeight
 */

import {nextTick, defineComponent} from 'san';
import {Row, Tab, TabPanel, Button, MonthView} from 'san-xui';

/* eslint-disable */
const template = `<template>
<x-row label="[default]">
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
</x-row>

<x-row label="[skin=card]">
<xui-tab skin="card">
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
</x-row>

<x-row label="[skin=sub]">
<xui-tab skin="sub">
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
</x-row>

<x-row label="dynamic tabs">
<xui-button on-click="toggleTab" skin="primary">Toggle Tab</xui-button>
<br/>
<br/>
<xui-tab s-ref="tab">
    <xui-tab-panel title="图片处理">
        <xui-button>图片处理</xui-button>
    </xui-tab-panel>
    <xui-tab-panel title="图像审核">
        <xui-button>图像审核</xui-button>
    </xui-tab-panel>
    <xui-tab-panel title="音视频处理" s-if="show">
        <xui-button>音视频处理</xui-button>
    </xui-tab-panel>
    <xui-tab-panel title="Android批量打包">
        <xui-monthview />
    </xui-tab-panel>
</xui-tab>
</x-row>

</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-button': Button,
        'xui-monthview': MonthView,
        'xui-tab': Tab,
        'xui-tab-panel': TabPanel
    },
    initData() {
        return {
            show: false
        };
    },
    toggleTab() {
        const show = this.data.get('show');
        this.data.set('show', !show);
        nextTick(() => {
            const tab = this.ref('tab');
            if (tab) {
                // XXX(leeight) 临时解决方案
                tab.refreshTabs();
            }
        });
    }
});
