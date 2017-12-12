/**
 * @file components/WebUploader.es6
 * @author leeight
 */
import u from 'lodash';
import $ from 'jquery';
import _ from 'inf-i18n';
import {defineComponent} from 'san';
import util from 'inf-ria/util';

import {create} from './util';
import Ghost from './Ghost';
import Button from './Button';
import Loading from './Loading';

const cx = create('ui-webuploader');

const kDefaultErrorMessages = {
    F_EXCEED_SIZE: _('文件大小超出限制！'),
    Q_EXCEED_NUM_LIMIT: _('队列文件数量超出限制！'),
    Q_EXCEED_SIZE_LIMIT: _('队列文件总量大小超出限制！'),
    Q_ZERO_SIZE_LIMIT: _('不支持0字节的文件上传'),
    Q_TYPE_DENIED: util.sprintf(_('不支持 “%s” 的文件类型：“%s”'), '${name}', '${ext}'),
    F_DUPLICATE: util.sprintf(_('文件 “%s” 已存在'), '${name}')
};

/* eslint-disable */
const template = `<div class="{{mainClass}}">
    <ui-ghost s-ref="ghost" class="${cx('pick')}" />
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
        'ui-button': Button,
        'ui-ghost': Ghost
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
            pick: {id: '#' + ghost.el.id, label, multiple},
            server: url,
            auto: autoStart,
            fileSingleSizeLimit: sizeLimit,

            swf: window.require.toUrl('webuploader/Uploader.swf'),
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
            'uploadProgress', 'uploadSuccess', 'uploadComplete', 'ready'
        ];
        u.each(events, eventType => uploader.on(eventType,
            (...args) => this.fire('uploader-event', {eventType, args})));
        uploader.on('ready', () => this.disabledWatcher(this.data.get('disabled')));
        uploader.on('uploadStart', file => this.data.set('error', null));
        uploader.on('uploadError', (file, error) => this.data.set('error', new Error('上传失败')));

        // 启用按钮
        uploader.on('filesQueued', files => this.data.set('finished', false));
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
        uploader.on('error', errorType => {
            const errorMessage = kDefaultErrorMessages[errorType] || errorType;
            this.data.set('error', errorMessage);
        });
    },

    inited() {
        this.disabledWatcher = disabled => {
            if (this.uploader) {
                const ghost = this.ref('ghost');
                if (ghost && ghost.el && ghost.el.lastChild) {
                    disabled
                        ? $(ghost.el.lastChild).hide()
                        : $(ghost.el.lastChild).show();
                }
            }
        };
        this.watch('label', label => {
            if (this.uploader) {
                const ghost = this.ref('ghost');
                if (ghost && ghost.el && ghost.el.firstChild) {
                    $(ghost.el.firstChild).html(label);
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
        window.require(['webuploader'], Uploader => this.initializeUploader(Uploader));
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

