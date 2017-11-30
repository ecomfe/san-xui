/**
 * @file components/BosUploader.es6
 * @author leeight
 */

import $ from 'jquery';
import humanize from 'humanize';
import {defineComponent} from 'san';

import {nexUuid, create} from './util';
import Button from './Button';

const cx = create('ui-bos-uploader');
const kStatus = {
    PENDING: 'pending',
    UPLOADING: 'uploading',
    UPLOAD_SUCCESS: 'upload-success',
    UPLOAD_ERROR: 'upload-error'
};
const kStatusText = {
    [kStatus.PENDING]: '等待上传',
    [kStatus.UPLOADING]: '上传中',
    [kStatus.UPLOAD_SUCCESS]: '上传成功',
    [kStatus.UPLOAD_ERROR]: '上传失败'
};
window.$ = $;

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <div class="${cx('error')}" s-if="error">{{error}}</div>
    <div s-else>
        <ui-button disabled="{{disabled}}" s-ref="btn">选择文件</ui-button>
        <ui-button icon="paddle-upload"
            s-if="!autoStart"
            on-click="startUpload"
            disabled="{{startDisabled}}"
            skin="primary">开始上传</ui-button>
        <div class="${cx('speed-info')}" s-if="speedInfo">{{speedInfo | raw}}</div>

        <div class="${cx('list')}" s-if="files.length">
            <table border="1" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th class="${cx('col-no')}">序号</th>
                        <th class="${cx('col-name')}">名称</th>
                        <th class="${cx('col-status')}">状态</th>
                        <th class="${cx('col-progress')}">进度</th>
                        <th class="${cx('col-size')}">大小</th>
                        <th class="${cx('col-time')}">耗时</th>
                    </tr>
                </thead>
                <tbody>
                    <tr s-for="f, i in files">
                        <td>#{{i}}</td>
                        <td><div title="{{f.name}}">{{f.name}}</div></td>
                        <td>{{f.status | status}}</td>
                        <td>{{f.progress}}</td>
                        <td>{{f.size | filesize}}</td>
                        <td>{{f.time}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-button': Button
    },
    initData() {
        return {
            autoStart: false,
            finished: false,
            multiple: false,
            speedInfo: null,
            error: null,
            files: []
        };
    },
    computed: {
        startDisabled() {
            const files = this.data.get('files');
            const disabled = this.data.get('disabled');
            const finished = this.data.get('finished');
            if (disabled || finished || files.length <= 0) {
                return true;
            }
            return false;
        },
        mainClass() {
            return cx.mainClass(this);
        }
    },
    filters: {
        status(sv) {
            return `<i class="${cx('status', 'status-' + sv)}">${kStatusText[sv]}</i>`;
        },
        filesize(size) {
            return humanize.filesize(size);
        }
    },
    findById(uuid) {
        const files = this.data.get('files');
        for (let i = 0; i < files.length; i++) {
            if (uuid === files[i].uuid) {
                return i;
            }
        }
        return -1;
    },
    initializeUploader(baidubce) {
        const autoStart = this.data.get('autoStart');
        const bosEndpoint = this.data.get('bosEndpoint');
        const uptokenUrl = this.data.get('uptokenUrl');
        if (!bosEndpoint || !uptokenUrl) {
            this.data.set('error', new Error('初始化失败，请设置 bos-endpoint 和 uptoken-url 属性'));
            return;
        }

        const multiple = this.data.get('multiple');
        this.uploader = new baidubce.bos.Uploader({
            browse_button: this.ref('btn').el,
            auto_start: autoStart,
            multi_selection: multiple,
            bos_endpoint: bosEndpoint,
            bos_multipart_parallel: 5,
            bos_multipart_auto_continue: true,
            chunk_size: '8mb',
            uptoken_url: uptokenUrl,
            max_retries: 2,
            max_file_size: '50Gb',
            init: {
                FilesFilter: (_, files) => {  // eslint-disable-line
                },
                FilesAdded: (_, files) => {   // eslint-disable-line
                    for (let i = 0; i < files.length; i++) {
                        const item = files[i];
                        const uuid = nexUuid();
                        item.__id = uuid;
                        // Plain Object
                        const file = {
                            uuid,
                            name: item.name,
                            size: item.size,
                            status: kStatus.PENDING,
                            progress: '0.00%',
                            time: '-'
                        };
                        this.data.push('files', file);
                    }

                    if (files.length) {
                        this.data.set('finished', false);
                    }
                },
                BeforeUpload: (_, file) => {    // eslint-disable-line
                    const idx = this.findById(file.__id);
                    if (idx === -1) {
                        return;
                    }

                    this.data.set(`files[${idx}].__startTime`, new Date().getTime());
                    this.data.set(`files[${idx}].status`, kStatus.UPLOADING);
                },
                UploadProgress: (_, file, progress, event) => {   // eslint-disable-line
                    const idx = this.findById(file.__id);
                    if (idx === -1) {
                        return;
                    }
                    this.data.set(`files[${idx}].progress`, (progress * 100).toFixed(2) + '%');
                },
                FileUploaded: (_, file, info) => {    // eslint-disable-line
                    const idx = this.findById(file.__id);
                    if (idx === -1) {
                        return;
                    }
                    const f = this.data.get(`files[${idx}]`);
                    const time = ((new Date().getTime() - f.__startTime) / 1000).toFixed(2);
                    this.data.set(`files[${idx}].time`, time);
                    this.data.set(`files[${idx}].status`, kStatus.UPLOAD_SUCCESS);
                },
                NetworkSpeed: (_, bytes, time, pendings) => {   // eslint-disable-line
                    const speed = bytes / (time / 1000);
                    let html = '上传速度：' + humanize.filesize(speed) + '/s';
                    const seconds = pendings / speed;
                    if (seconds > 1) {
                        const dhms = baidubce.utils.toDHMS(Math.ceil(seconds));
                        html += '，剩余时间：' + [
                            humanize.pad(dhms.HH, 2, '0'),
                            humanize.pad(dhms.MM, 2, '0'),
                            humanize.pad(dhms.SS, 2, '0')
                        ].join(':');
                    }
                    this.data.set('speedInfo', html);
                },
                Aborted: (_, error, file) => {    // eslint-disable-line
                    const idx = this.findById(file.__id);
                    if (idx === -1) {
                        return;
                    }
                    this.data.set(`files[${idx}].status`, kStatus.UPLOAD_ERROR);
                },
                Error: (_, error, file) => {    // eslint-disable-line
                    const idx = this.findById(file.__id);
                    if (idx === -1) {
                        return;
                    }
                    this.data.set(`files[${idx}].status`, kStatus.UPLOAD_ERROR);
                },
                UploadComplete: () => {   // eslint-disable-line
                    this.data.set('speedInfo', null);
                    this.data.set('finished', true);
                },
                Key: (_, file) => {   // eslint-disable-line
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

                    const deferred = baidubce.sdk.Q.defer();
                    const delay = ~~(2 + Math.random() * 5); // (2, 7);
                    setTimeout(() => {
                        const key = year + '/' + month + '/' + day + '/' + file.name;
                        deferred.resolve(key);
                    }, delay * 100);
                    return deferred.promise;
                }
            }
        });

        const disabled = this.data.get('disabled');
        if (disabled) {
            const browseBtn = this.uploader.options.browse_button;
            $(browseBtn).attr('disabled', disabled);
        }
    },
    inited() {
        this.watch('disabled', disabled => {
            if (this.uploader) {
                const browseBtn = this.uploader.options.browse_button;
                $(browseBtn).attr('disabled', disabled);
            }
        });
    },
    attached() {
        window.require(['baidubce'], baidubce => this.initializeUploader(baidubce));
    },
    startUpload() {
        if (this.uploader) {
            this.uploader.start();
        }
    }
});


