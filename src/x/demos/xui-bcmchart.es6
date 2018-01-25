/**
 * @file demos/xui-bcmchart.es6
 * @author leeight
 */

import _ from 'lodash';
import Promise from 'promise';
import {defineComponent} from 'san';
import {BcmChart} from 'san-xui';

import Row from './Row';
import {Data1, Data2, Data3, Data4, Data5, Data6, Data7, Data8} from './examples/bcmData';

function delayRequester(data, ms = 500) {
    return function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(_.cloneDeep(data)), ms);
        });
    };
}

/* eslint-disable */
const template = `<template>
<!--x-row label="error">
    <xui-bcmchart
        title="CPU使用率"
        scope="BCE_BCC"
        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"
        metrics="vCPUUsagePercent(CPU使用率)"
        unit="百分比"
    />
</x-row-->

<x-row label="withFilter">
    <xui-bcmchart
        with-filter
        width="{{800}}"
        height="{{300}}"
        title="CPU使用率"
        scope="BCE_BCC"
        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"
        metrics="vCPUUsagePercent(CPU使用率)"
        requester="{{requester1}}"
        unit="百分比"
    />
</x-row>

<x-row label="default">
    <xui-bcmchart
        showbigable
        title="CPU使用率"
        api-type="metricName"
        scope="BCE_BCC"
        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"
        metrics="vCPUUsagePercent(CPU使用率)"
        requester="{{requester1}}"
        unit="百分比"
    />

    <xui-bcmchart
        showbigable
        title="每秒磁盘IO读写次数"
        api-type="metricName"
        scope="BCE_BCC"
        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"
        metrics="vDiskReadOpCountPerSecond(每秒磁盘IO读取次数),vDiskWriteOpCountPerSecond(每秒磁盘IO写入次数)"
        requester="{{requester2}}"
        unit="次/秒"
    />

    <xui-bcmchart
        showbigable
        title="每秒磁盘IO读写量"
        api-type="metricName"
        scope="BCE_BCC"
        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"
        metrics="vDiskReadBytesPerSecond(每秒磁盘IO读取量),vDiskWriteBytesPerSecond(每秒磁盘IO写入量)"
        requester="{{requester3}}"
        unit="字节/秒"
    />

    <xui-bcmchart
        showbigable
        title="网络监控"
        api-type="metricName"
        scope="BCE_BCC"
        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"
        metrics="vNicInBytes(网卡输入流量),vNicOutBytes(网卡输出流量),WebInBytes(从外网进入的流量),WebOutBytes(流向外网的流量)"
        requester="{{requester4}}"
        unit="字节"
    />

    <xui-bcmchart
        showbigable
        title="出口带宽"
        api-type="metricName"
        scope="BCE_BCC"
        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"
        metrics="WebOutBitsPerSecond(出口带宽)"
        requester="{{requester5}}"
        unit="bps"
    />

    <xui-bcmchart
        showbigable
        title="内存使用量"
        api-type="metricName"
        scope="BCE_BCC"
        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"
        metrics="MemUsedBytes(内存使用量)"
        requester="{{requester6}}"
        unit="字节"
    />

    <xui-bcmchart
        showbigable
        title="内存使用率"
        api-type="metricName"
        scope="BCE_BCC"
        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"
        metrics="MemUsedPercent(内存使用率)"
        requester="{{requester7}}"
        unit="百分比"
    />

    <xui-bcmchart
        showbigable
        title="磁盘空间使用量"
        api-type="metricName"
        scope="BCE_BCC"
        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"
        metrics="HomeUsedBytes(HOME磁盘空间使用量),RootUsedBytes(根磁盘空间使用量)"
        requester="{{requester8}}"
        unit="字节"
    />
</x-row>

</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-bcmchart': BcmChart
    },
    initData() {
        return {
            requester1: delayRequester(Data1),
            requester2: delayRequester(Data2),
            requester3: delayRequester(Data3),
            requester4: delayRequester(Data4),
            requester5: delayRequester(Data5),
            requester6: delayRequester(Data6),
            requester7: delayRequester(Data7),
            requester8: delayRequester(Data8)
        };
    }
});

