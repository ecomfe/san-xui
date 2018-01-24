define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([28],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__asInput__ = __webpack_require__(3);
/**
 * @file Switch.es6
 * @author leeight
 */






const cx = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* create */])('ui-togglebutton');

/* eslint-disable */
const template = `<div on-click="toggleSwitch" class="{{mainClass}}">
    <span s-if="checked" class="${cx('part-on')}">ON</span>
    <span s-else class="${cx('part-off')}">OFF</span>
</div>`;
/* eslint-enable */

const Switch = Object(__WEBPACK_IMPORTED_MODULE_0_san__["defineComponent"])({    // eslint-disable-line
    template,
    initData() {
        return {
            checked: true
        };
    },
    dataTypes: {
        /**
         * 获取或者设置 Switch 组件选中的状态
         * @bindx
         * @default true
         */
        checked: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool,

        /**
         * Switch 组件的禁用状态
         */
        disabled: __WEBPACK_IMPORTED_MODULE_0_san__["DataTypes"].bool
    },
    computed: {
        value() {
            return this.data.get('checked');
        },
        mainClass() {
            const klass = cx.mainClass(this);
            const checked = this.data.get('checked');
            if (checked) {
                klass.push('state-checked');
                klass.push(cx('checked'));
            }
            return klass;
        }
    },
    inited() {
        this.watch('value', value => this.fire('change', {value}));
    },
    toggleSwitch() {
        const disabled = this.data.get('disabled');
        if (disabled) {
            return;
        }

        const checked = this.data.get('checked');
        this.data.set('checked', !checked);
    }
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2__asInput__["a" /* asInput */])(Switch));


/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = asInput;
/**
 * @file components/asInput.es6
 * @author leeight
 */

function asInput(Klass) {
    return class extends Klass {
        fire(name, event) {
            super.fire(name, event);

            if (name === 'change' && event.value != null
                || name === 'input') {
                this.nextTick(() => {
                    const value = this.data.get('value');
                    this.dispatch('input-comp-value-changed', {value});
                });
            }
        }
    };
}


/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_WebUploader__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_Switch__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_Toast__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_inf_ui_x_components_Button__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Row__ = __webpack_require__(5);
/**
 * @file demos/xui-webuploader.es6
 * @author leeight
 */









/* eslint-disable */
const template = `<template>

<x-row label="initialize error">
    <xui-webuploader />
</x-row>

<x-row label="[default]">
    <xui-webuploader
        url="/api/null/upload"
        on-accept="onAccept($event)"
    />
</x-row>

<x-row label="hide & show">
    <xui-button on-click="toggleUploader">{{show ? 'Hide' : 'Show'}}</xui-button>
    <xui-webuploader
        url="/api/null/upload"
        on-accept="onAccept($event)"
        style="{{uploaderStyle}}"
    />
</x-row>

<x-row label="jpg,gif,png;auto-start=false;multiple=true;options=...">
    <xui-webuploader
        url="/api/null/upload"
        auto-start="{{false}}"
        multiple
        label="请选择图片"
        options="{{uploader.options}}"
    />
</x-row>

<x-row label="disabled">
    <xui-switch checked="{=uploader.disabled=}" />
    <xui-webuploader
        disabled="{=uploader.disabled=}"
        url="/api/null/upload"
    />
</x-row>

</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_5__Row__["a" /* default */],
        'xui-button': __WEBPACK_IMPORTED_MODULE_4_inf_ui_x_components_Button__["a" /* default */],
        'xui-switch': __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_Switch__["a" /* default */],
        'xui-webuploader': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_WebUploader__["a" /* default */]
    },
    computed: {
        uploaderStyle() {
            const show = this.data.get('show');
            const style = {
                display: show ? 'inline-block' : 'none'
            };
            return style;
        }
    },
    initData() {
        return {
            show: false,
            uploader: {
                disabled: true,
                options: {
                    accept: {
                        title: 'Files',
                        extensions: 'jpg,jpeg,gif,png',
                        mimeTypes: 'image/jpeg,image/gif,image/png'
                    }
                }
            }
        };
    },
    toggleUploader() {
        const show = this.data.get('show');
        this.data.set('show', !show);
    },
    onAccept(event) {
        const ret = event.ret;
        if (ret.success) {
            __WEBPACK_IMPORTED_MODULE_3_inf_ui_x_components_Toast__["a" /* default */].success('上传成功');
        }
    }
}));


/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_i18n__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Button__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Loading__ = __webpack_require__(15);
/**
 * @file components/WebUploader.es6
 * @author leeight
 */









const cx = Object(__WEBPACK_IMPORTED_MODULE_4__util__["f" /* create */])('ui-webuploader');

const kDefaultErrorMessages = {
    F_EXCEED_SIZE: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('文件大小超出限制！'),
    Q_EXCEED_NUM_LIMIT: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('队列文件数量超出限制！'),
    Q_EXCEED_SIZE_LIMIT: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('队列文件总量大小超出限制！'),
    Q_ZERO_SIZE_LIMIT: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('不支持0字节的文件上传'),
    Q_TYPE_DENIED: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('不支持 “${name}” 的文件类型：“${ext}”'),
    F_DUPLICATE: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('文件 “${name}” 已存在')
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

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_3_san__["defineComponent"])({
    template,
    components: {
        'ui-loading': __WEBPACK_IMPORTED_MODULE_6__Loading__["a" /* default */],
        'ui-button': __WEBPACK_IMPORTED_MODULE_5__Button__["a" /* default */]
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
        disabled: __WEBPACK_IMPORTED_MODULE_3_san__["DataTypes"].bool,

        /**
         * 按钮上的文案
         * @default 选择文件
         */
        label: __WEBPACK_IMPORTED_MODULE_3_san__["DataTypes"].string,

        /**
         * 上传的文件地址
         */
        url: __WEBPACK_IMPORTED_MODULE_3_san__["DataTypes"].string.isRequired,

        /**
         * 可以选择的最大文件体积
         * @default 2 * 1024 * 1024
         */
        sizeLimit: __WEBPACK_IMPORTED_MODULE_3_san__["DataTypes"].number,

        /**
         * 是否支持多选
         * @default false
         */
        multiple: __WEBPACK_IMPORTED_MODULE_3_san__["DataTypes"].bool,

        /**
         * 是否自动上传
         */
        autoStart: __WEBPACK_IMPORTED_MODULE_3_san__["DataTypes"].bool,

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
        options: __WEBPACK_IMPORTED_MODULE_3_san__["DataTypes"].object
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

            swf: window.require.toUrl('webuploader/Uploader.swf'),
            disableWidgets: 'log', // 禁用log统计
            chunked: false,
            threads: 1,
            duplicate: false,
            disableGlobalDnd: true,
            sendAsBinary: true
        };
        const uploaderOptions = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(pickOptions, options);
        const uploader = this.uploader = Uploader.create(uploaderOptions);

        const events = [
            'dndAccept', 'beforeFileQueued', 'fileQueued', 'fileDequeued',
            'reset', 'startUpload', 'stopUpload', 'uploadFinished',
            'uploadProgress', 'uploadSuccess', 'uploadComplete', 'ready'
        ];
        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(events, eventType => uploader.on(eventType,
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
                if (ghost && ghost.lastChild) {
                    disabled
                        ? __WEBPACK_IMPORTED_MODULE_1_jquery___default()(ghost.lastChild).hide()
                        : __WEBPACK_IMPORTED_MODULE_1_jquery___default()(ghost.lastChild).show();
                }
            }
        };
        this.watch('label', label => {
            if (this.uploader) {
                const ghost = this.ref('ghost');
                if (ghost && ghost.firstChild) {
                    __WEBPACK_IMPORTED_MODULE_1_jquery___default()(ghost.firstChild).html(label);
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
}));



/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/**
 * @file demos/Row.es6
 * @author leeight
 */



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template: `<div class="x-row">
        <div class="label" s-if="label">{{label}}</div>
        <div class="content"><slot/></div>
    </div>`
}));



/***/ })

},[391])});;