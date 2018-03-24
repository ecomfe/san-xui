/**
 * @file components/WebUploader.js
 * @author leeight
 */
import u from 'lodash';
import $ from 'jquery';
import {DataTypes, defineComponent} from 'san';

import {create} from './util';
import {loadThirdParty, css} from './helper';
import Button from './Button';
import Loading from './Loading';

const cx = create('ui-webuploader');

const kDefaultErrorMessages = {
    F_EXCEED_SIZE: '文件大小超出限制！',
    Q_EXCEED_SIZE_LIMIT: '队列文件总量大小超出限制！',
    Q_ZERO_SIZE_LIMIT: '不支持0字节的文件上传'
};

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <div s-ref="ghost" class="${cx('pick')}"></div>
    <ui-button icon="paddle-upload"
        s-if="!autoStart"
        on-click="startUpload"
        disabled="{{startDisabled}}"
        skin="primary">开始上传</ui-button>
    <ui-loading size="small" s-if="uploading" />
    <div class="${cx('error')}" s-if="error">{{error}}</div>
</div>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'ui-loading': Loading,
        'ui-button': Button
    },

    computed: {
        startDisabled() {
            const disabled = this.data.get('disabled');
            const finished = this.data.get('finished');
            if (disabled || finished) {
                return true;
            }
            return false;
        },
        mainClass() {
            return cx.mainClass(this);
        }
    },

    initData() {
        return {
            label: '选择文件',
            url: null,
            sizeLimit: 2 * 1024 * 1024,
            multiple: false,
            autoStart: true,
            finished: true,
            uploading: false,
            error: null
        };
    },

    dataTypes: {
        /**
         * 禁用的状态
         * @default false
         */
        disabled: DataTypes.bool,

        /**
         * 按钮上的文案
         * @default 选择文件
         */
        label: DataTypes.string,

        /**
         * 上传的文件地址
         */
        url: DataTypes.string.isRequired,

        /**
         * 可以选择的最大文件体积
         * @default 2 * 1024 * 1024
         */
        sizeLimit: DataTypes.number,

        /**
         * 是否支持多选
         * @default false
         */
        multiple: DataTypes.bool,

        /**
         * 是否自动上传
         */
        autoStart: DataTypes.bool,

        /**
         * WebUploader 的其它设置项，默认值如下：
         * <pre><code>{
         *   server: url,
         *   auto: auto-start,
         *   fileSingleSizeLimit: size-limit,
         *   swf: ...swf,
         *   disableWidgets: 'log',
         *   chunked: false,
         *   threads: 1,
         *   duplicate: false,
         *   disableGlobalDnd: true,
         *   sendAsBinary: true
         * }</code></pre>
         */
        options: DataTypes.object
    },

    initializeUploader(Uploader) {
        const url = this.data.get('url');
        if (!url) {
            this.data.set('error', new Error('初始化失败，请设置 url 属性'));
            return;
        }

        const label = this.data.get('label');
        const multiple = this.data.get('multiple');
        const options = this.data.get('options');
        const autoStart = this.data.get('autoStart');
        const sizeLimit = this.data.get('sizeLimit');
        const ghost = this.ref('ghost');
        const pickOptions = {
            pick: {id: '#' + ghost.id, label, multiple},
            server: url,
            auto: autoStart,
            fileSingleSizeLimit: sizeLimit,
            swf: 'https://cdn.bdstatic.com/console/dep/05cfee93/webuploader/Uploader.swf',
            disableWidgets: 'log', // 禁用log统计
            chunked: false,
            threads: 1,
            duplicate: false,
            disableGlobalDnd: true,
            sendAsBinary: true
        };
        const uploaderOptions = u.extend(pickOptions, options);
        const uploader = this.uploader = Uploader.create(uploaderOptions);

        const events = [
            'dndAccept', 'beforeFileQueued', 'fileQueued', 'fileDequeued',
            'reset', 'startUpload', 'stopUpload', 'uploadFinished',
            'uploadProgress', 'uploadSuccess', 'uploadComplete', 'ready',
            'uploadBeforeSend'
        ];
        u.each(events, eventType => uploader.on(eventType,
            (...args) => this.fire('uploader-event', {eventType, args})));
        uploader.on('ready', () => this.disabledWatcher(this.data.get('disabled')));
        uploader.on('uploadStart', file => this.data.set('error', null));
        uploader.on('uploadError', (file, error) => this.data.set('error', new Error('上传失败')));

        // 启用按钮
        uploader.on('filesQueued', files => this.data.set('finished', false));
        // 从队列中删除文件
        uploader.on('fileDequeued', () => {
            // 出列时要判断是否还有文件在队列中,如果一个没有finished变成true的初始状态
            const activeFiles = u.filter(uploader.getFiles(), file => file.getStatus() !== 'cancelled');
            if (activeFiles.length === 0) {
                this.data.set('finished', true);
            }
        });
        // 显示loading
        uploader.on('startUpload', () => this.data.set('uploading', true));
        // 结束处理
        uploader.on('uploadFinished', () => {
            this.data.set('finished', true);
            this.data.set('uploading', false);
            uploader.reset();
        });

        uploader.on('uploadBeforeSend', (object, data, headers) => {
            headers['File-Name'] = encodeURIComponent(object.file.name);
            headers['X-Request-By'] = 'ERApplication';
            headers['Content-Type'] = object.file.type;
        });
        uploader.on('uploadAccept', (object, ret, fn, xhr) => {
            this.fire('accept', {object, ret, fn, xhr});
        });
        uploader.on('error', (errorType, evt) => {
            let errorMessage = kDefaultErrorMessages[errorType] || errorType;
            if (errorType === 'Q_TYPE_DENIED') {
                errorMessage = `不支持 “${evt.name}” 的文件类型：“${evt.ext}”`;
            }
            else if (errorType === 'F_DUPLICATE') {
                errorMessage = `文件 “${evt.name}” 已存在`;
            }
            else if (errorType === 'Q_EXCEED_NUM_LIMIT') {
                errorMessage = `队列文件数量超出限制！当前最多上传${evt}个文件`;
            }
            this.data.set('error', errorMessage);
            this.fire('error', {type: errorType, evt, errorMessage});
        });
    },

    inited() {
        this.disabledWatcher = disabled => {
            if (this.uploader) {
                const ghost = this.ref('ghost');
                if (ghost && ghost.lastChild) {
                    disabled
                        ? $(ghost.lastChild).hide()
                        : $(ghost.lastChild).show();
                }
            }
        };
        this.watch('label', label => {
            if (this.uploader) {
                const ghost = this.ref('ghost');
                if (ghost && ghost.firstChild) {
                    $(ghost.firstChild).html(label);
                }
            }
        });
        this.watch('disabled', this.disabledWatcher);
    },

    updated() {
        // FIXME(leeight) 是否存在潜在的性能问题呢？
        // SEE baidu-bce-console-fe-base-45
        if (this.uploader && typeof this.uploader.refresh === 'function') {
            this.uploader.refresh();
        }
    },

    startUpload() {
        if (this.uploader) {
            this.uploader.upload();
        }
    },

    attached() {
        loadThirdParty('WebUploader', ['webuploader', css('webuploader/webuploader.css')])
            .then(WebUploader => this.initializeUploader(WebUploader));
    },
    disposed() {
        if (this.uploader) {
            try {
                this.uploader.destroy();
                this.uploader = null;
            }
            catch (ex) {
            }
        }
    }
});

