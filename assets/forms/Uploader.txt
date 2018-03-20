/**
 * @file san-xui/x/forms/Uploader.js
 * @author leeight
 */

import {DataTypes, defineComponent} from 'san';

import BosUploader from '../components/BosUploader';
import {asInput} from '../components/asInput';
import UUID from '../demos/uuid';

/* eslint-disable */
const template = `<template>
    <xui-bosuploader
        auto-start
        files="{{files}}"
        with-speed-info="{{false}}"
        key-cb="{{keyCb}}"
        bos-endpoint="https://bce-bos-uploader.bj.bcebos.com"
        uptoken-url="https://cloud.baidu.com/api/authorization"
        on-complete="onComplete"
    >
        <div slot="preview">
            <div s-for="f in files">
                <a s-if="f.url" href="{{f.url}}" target="_blank">{{f.name}}</a>
                <span s-else>{{f.name}} ({{f.progress}})</span>
            </div>
        </div>
    </xui-bosuploader>
</template>`;
/* eslint-enable */

const Uploader = defineComponent({ // eslint-disable-line
    template,
    components: {
        'xui-bosuploader': BosUploader
    },
    dataTypes: {
        /**
         * 获取或者设置当前上传组件的文件地址
         * @bindx
         */
        value: DataTypes.string,

        /**
         * 需要上传的文件列表<br>
         * 上传成功之后，可以通过访问数组中元素的 url 属性获取文件地址
         */
        files: DataTypes.array,

        /**
         * 计算文件的地址，默认的文件路径是如下的格式"YYYY/MM/dd/[uuid]/[name].[ext]"
         * <pre><code>function(file:File): string</code></pre>
         */
        keyCb: DataTypes.func
    },
    initData() {
        return {
            value: null,
            files: [],
            keyCb(file) {
                const date = new Date();
                const year = date.getFullYear();

                let month = date.getMonth() + 1;
                if (month < 10) {
                    month = '0' + month;
                }

                let day = date.getDate();
                if (day < 10) {
                    day = '0' + day;
                }

                const uuid = UUID.generate();
                const key = year + '/' + month + '/' + day + '/' + uuid + '/' + file.name;
                return key;
            }
        };
    },
    inited() {
        const value = this.data.get('value');
        if (value) {
            const lastSlashIndex = value.lastIndexOf('/');
            let name = value.substr(lastSlashIndex + 1);
            try {
                name = decodeURIComponent(name);
            }
            catch (ex) {
            }
            this.data.set('files', [{name, url: value}]);
        }
    },
    onComplete({files}) {
        if (files && files.length) {
            const value = files[0].url;
            this.data.set('value', value);
            this.fire('change', {value});
        }
    }
});

export default asInput(Uploader);
