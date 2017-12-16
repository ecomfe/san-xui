/**
 * @file inf-ui/x/forms/Uploader.es6
 * @author leeight
 */

import {defineComponent} from 'inf-ui/sanx';
import BosUploader from 'inf-ui/x/components/BosUploader';
import UUID from 'inf-ui/x/demos/uuid';

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

export default defineComponent({
    template,
    components: {
        'xui-bosuploader': BosUploader
    },
    initData() {
        return {
            value: null,
            files: [],
            keyCb(file) {
                const uuid = UUID.generate();
                return uuid + '/' + file.name;
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
            this.data.set('value', files[0].url);
        }
    }
});
