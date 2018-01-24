define(["san"], function(__WEBPACK_EXTERNAL_MODULE_0__) { return webpackJsonp([32],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_BosUploader__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_Toast__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Row__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__uuid__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__uuid__);
/**
 * @file demos/xui-bosuploader.es6
 * @author leeight
 */








/* eslint-disable */
const template = `<template>
<x-row label="initialize error">
    <xui-bosuploader />
</x-row>

<x-row label="normal">
    <xui-bosuploader
        bos-endpoint="https://bce-bos-uploader.cdn.bcebos.com"
        uptoken-url="https://cloud.baidu.com/api/authorization" />
</x-row>

<x-row label="multiple,key-cb,ak,sk,bos-endpoint,on-complete">
    <xui-bosuploader
        multiple
        key-cb="{{keyCb}}"
        bos-endpoint="https://bce-bos-uploader.bj.bcebos.com"
        ak="ydFi9KR2YOrvHlmGD3oYKEWW"
        sk="KGCc1x4KEpSVmXUu1gOfutqMDmxf0Hvn"
        on-complete="onComplete"
    >
        <div slot="preview">
            <div s-for="f in files">
                <a s-if="f.url" href="{{f.url}}" target="_blank">{{f.name}}</a>
                <span s-else>{{f.name}} ({{f.progress}})</span>
            </div>
        </div>
    </xui-bosuploader>
</x-row>

<x-row label="auto-start=true">
    <xui-bosuploader
        auto-start
        bos-endpoint="https://bce-bos-uploader.cdn.bcebos.com"
        uptoken-url="https://cloud.baidu.com/api/authorization" />
</x-row>

<x-row label="disabled">
    <xui-bosuploader
        disabled
        bos-endpoint="https://bce-bos-uploader.cdn.bcebos.com"
        uptoken-url="https://cloud.baidu.com/api/authorization" />
</x-row>
</template>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_inf_ui_sanx__["b" /* defineComponent */])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_3__Row__["a" /* default */],
        'xui-bosuploader': __WEBPACK_IMPORTED_MODULE_1_inf_ui_x_components_BosUploader__["a" /* default */]
    },
    initData() {
        return {
            keyCb(file) {
                const uuid = __WEBPACK_IMPORTED_MODULE_4__uuid___default.a.generate();
                const extIndex = file.name.lastIndexOf('.');
                if (extIndex === -1) {
                    return uuid;
                }
                const ext = file.name.substr(extIndex);
                return uuid + ext;
            }
        };
    },
    onComplete({files}) {
        __WEBPACK_IMPORTED_MODULE_2_inf_ui_x_components_Toast__["a" /* default */].success('上传完毕，文件数量：' + files.length);
    }
}));


/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_humanize__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_humanize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_humanize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Button__ = __webpack_require__(9);
/**
 * @file components/BosUploader.es6
 * @author leeight
 */








const cx = Object(__WEBPACK_IMPORTED_MODULE_3__util__["f" /* create */])('ui-bos-uploader');
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
window.$ = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a;

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
        <div class="${cx('speed-info')}" s-if="withSpeedInfo && speedInfo">{{speedInfo | raw}}</div>

        <div class="${cx('list')}" s-if="files.length">
            <slot name="preview" var-files="files">
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
            </slot>
        </div>
    </div>
</div>`;
/* eslint-enable */

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_san__["defineComponent"])({
    template,
    components: {
        'ui-button': __WEBPACK_IMPORTED_MODULE_4__Button__["a" /* default */]
    },
    initData() {
        return {
            autoStart: false,
            finished: false,
            multiple: false,
            withSpeedInfo: true,
            speedInfo: null,
            error: null,
            files: []
        };
    },
    dataTypes: {
        /**
         * 是否自动上传
         * @default false
         */
        autoStart: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].bool,

        /**
         * 组件的禁用状态
         * @default false
         */
        disabled: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].bool,

        /**
         * 是否支持多选
         * @default false
         */
        multiple: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].bool,

        /**
         * 是否展示上传进度的信息
         * @default true
         */
        withSpeedInfo: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].bool,

        /**
         * 计算签名的地址，<strong style="color:red">线上环境</strong>建议设置这个参数<br>
         * uptoken_url 的后端实现逻辑，请参考:
         * <pre><code>https://github.com/leeight/bce-sdk-js-usage</code></pre>
         */
        uptokenUrl: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].string.isRequired,

        /**
         * 如果是 ak 和 sk 是 sts 服务获取的，需要通过这个参数设置对应的 stsToken。<br>
         * 更多信息请参考
         * <a target="_blank" href="https://cloud.baidu.com/doc/BOS/API/27.5CSTS.E6.9C.8D.E5.8A.A1.E6.8E.A5.E5.8F.A3.html">官方文档（临时授权访问）</a>
         */
        uptoken: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].string,

        /**
         * 测试环境，方便的话，可以设置 ak 参数
         */
        ak: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].string,

        /**
         * 测试环境，方便的话，可以设置 sk 参数
         */
        sk: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].string,

        /**
         * 计算上传的文件名
         * <pre><code>function(file:File): string | Promise.&lt;string&gt;</code></pre>
         */
        keyCb: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].func,

        /**
         * BOS的地址，需要设置成 https://&lt;bucket&gt;.&lt;region&gt;.bcebos.com，例如：
         * <pre><code>https://bce-bos-uploader.bj.bcebos.com</code></pre>
         */
        bosEndpoint: __WEBPACK_IMPORTED_MODULE_2_san__["DataTypes"].string.isRequired
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
            return __WEBPACK_IMPORTED_MODULE_1_humanize___default.a.filesize(size);
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
        const ak = this.data.get('ak');
        const sk = this.data.get('sk');
        const uptoken = this.data.get('uptoken');
        if (!bosEndpoint || !(uptokenUrl || (ak && sk))) {
            this.data.set('error', new Error('初始化失败，请设置 bos-endpoint 和 uptoken-url 或者 ak && sk 属性'));
            return;
        }

        // FIXME(leeight) 奇怪，为啥会没有这个元素呢?
        const btn = this.ref('btn');
        if (!btn) {
            return;
        }

        const multiple = this.data.get('multiple');
        this.uploader = new baidubce.bos.Uploader({
            browse_button: btn.el,
            auto_start: autoStart,
            multi_selection: multiple,
            bos_endpoint: bosEndpoint,
            bos_multipart_parallel: 5,
            bos_multipart_auto_continue: true,
            chunk_size: '8mb',

            uptoken_url: uptokenUrl,
            uptoken,
            bos_ak: ak,
            bos_sk: sk,

            max_retries: 2,
            max_file_size: '50Gb',
            init: {
                FilesFilter: (_, files) => {  // eslint-disable-line
                    if (!multiple) {
                        // 如果是单选的情况，每次选择文件之前，清空 files
                        this.data.set('files', []);
                    }
                },
                FilesAdded: (_, files) => {   // eslint-disable-line
                    for (let i = 0; i < files.length; i++) {
                        const item = files[i];
                        const uuid = Object(__WEBPACK_IMPORTED_MODULE_3__util__["j" /* nexUuid */])();
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
                    this.data.set(`files[${idx}].url`, info && info.body && info.body.location);
                },
                NetworkSpeed: (_, bytes, time, pendings) => {   // eslint-disable-line
                    const speed = bytes / (time / 1000);
                    let html = '上传速度：' + __WEBPACK_IMPORTED_MODULE_1_humanize___default.a.filesize(speed) + '/s';
                    const seconds = pendings / speed;
                    if (seconds > 1) {
                        const dhms = baidubce.utils.toDHMS(Math.ceil(seconds));
                        html += '，剩余时间：' + [
                            __WEBPACK_IMPORTED_MODULE_1_humanize___default.a.pad(dhms.HH, 2, '0'),
                            __WEBPACK_IMPORTED_MODULE_1_humanize___default.a.pad(dhms.MM, 2, '0'),
                            __WEBPACK_IMPORTED_MODULE_1_humanize___default.a.pad(dhms.SS, 2, '0')
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
                    const files = this.data.get('files');
                    this.fire('complete', {files});
                },
                Key: (_, file) => {   // eslint-disable-line
                    const keyCb = this.data.get('keyCb');
                    if (typeof keyCb === 'function') {
                        // string | Promise.<string>
                        return keyCb(file);
                    }

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
                    setTimeout(() => {
                        const key = year + '/' + month + '/' + day + '/' + file.name;
                        deferred.resolve(key);
                    }, 0);
                    return deferred.promise;
                }
            }
        });

        const disabled = this.data.get('disabled');
        if (disabled) {
            const browseBtn = this.uploader.options.browse_button;
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(browseBtn).attr('disabled', disabled);
        }
    },
    inited() {
        this.watch('disabled', disabled => {
            if (this.uploader) {
                const browseBtn = this.uploader.options.browse_button;
                __WEBPACK_IMPORTED_MODULE_0_jquery___default()(browseBtn).attr('disabled', disabled);
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
}));




/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {


(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `humanize` variable.
  var previousHumanize = root.humanize;

  var humanize = {};

  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = humanize;
    }
    exports.humanize = humanize;
  } else {
    if (typeof define === 'function' && define.amd) {
      define('humanize', function() {
        return humanize;
      });
    }
    root.humanize = humanize;
  }

  humanize.noConflict = function() {
    root.humanize = previousHumanize;
    return this;
  };

  humanize.pad = function(str, count, padChar, type) {
    str += '';
    if (!padChar) {
      padChar = ' ';
    } else if (padChar.length > 1) {
      padChar = padChar.charAt(0);
    }
    type = (type === undefined) ? 'left' : 'right';

    if (type === 'right') {
      while (str.length < count) {
        str = str + padChar;
      }
    } else {
      // default to left
      while (str.length < count) {
        str = padChar + str;
      }
    }

    return str;
  };

  // gets current unix time
  humanize.time = function() {
    return new Date().getTime() / 1000;
  };

  /**
   * PHP-inspired date
   */

                        /*  jan  feb  mar  apr  may  jun  jul  aug  sep  oct  nov  dec */
  var dayTableCommon = [ 0,   0,  31,  59,  90, 120, 151, 181, 212, 243, 273, 304, 334 ];
  var dayTableLeap   = [ 0,   0,  31,  60,  91, 121, 152, 182, 213, 244, 274, 305, 335 ];
  // var mtable_common[13] = {  0,  31,  28,  31,  30,  31,  30,  31,  31,  30,  31,  30,  31 };
  // static int ml_table_leap[13]   = {  0,  31,  29,  31,  30,  31,  30,  31,  31,  30,  31,  30,  31 };


  humanize.date = function(format, timestamp) {
    var jsdate = ((timestamp === undefined) ? new Date() : // Not provided
                  (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
                  new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
                 );

    var formatChr = /\\?([a-z])/gi;
    var formatChrCb = function (t, s) {
      return f[t] ? f[t]() : s;
    };

    var shortDayTxt = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var monthTxt = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var f = {
      /* Day */
      // Day of month w/leading 0; 01..31
      d: function () { return humanize.pad(f.j(), 2, '0'); },

      // Shorthand day name; Mon..Sun
      D: function () { return f.l().slice(0, 3); },

      // Day of month; 1..31
      j: function () { return jsdate.getDate(); },

      // Full day name; Monday..Sunday
      l: function () { return shortDayTxt[f.w()]; },

      // ISO-8601 day of week; 1[Mon]..7[Sun]
      N: function () { return f.w() || 7; },

      // Ordinal suffix for day of month; st, nd, rd, th
      S: function () {
        var j = f.j();
        return j > 4 && j < 21 ? 'th' : {1: 'st', 2: 'nd', 3: 'rd'}[j % 10] || 'th';
      },

      // Day of week; 0[Sun]..6[Sat]
      w: function () { return jsdate.getDay(); },

      // Day of year; 0..365
      z: function () {
        return (f.L() ? dayTableLeap[f.n()] : dayTableCommon[f.n()]) + f.j() - 1;
      },

      /* Week */
      // ISO-8601 week number
      W: function () {
        // days between midweek of this week and jan 4
        // (f.z() - f.N() + 1 + 3.5) - 3
        var midWeekDaysFromJan4 = f.z() - f.N() + 1.5;
        // 1 + number of weeks + rounded week
        return humanize.pad(1 + Math.floor(Math.abs(midWeekDaysFromJan4) / 7) + (midWeekDaysFromJan4 % 7 > 3.5 ? 1 : 0), 2, '0');
      },

      /* Month */
      // Full month name; January..December
      F: function () { return monthTxt[jsdate.getMonth()]; },

      // Month w/leading 0; 01..12
      m: function () { return humanize.pad(f.n(), 2, '0'); },

      // Shorthand month name; Jan..Dec
      M: function () { return f.F().slice(0, 3); },

      // Month; 1..12
      n: function () { return jsdate.getMonth() + 1; },

      // Days in month; 28..31
      t: function () { return (new Date(f.Y(), f.n(), 0)).getDate(); },

      /* Year */
      // Is leap year?; 0 or 1
      L: function () { return new Date(f.Y(), 1, 29).getMonth() === 1 ? 1 : 0; },

      // ISO-8601 year
      o: function () {
        var n = f.n();
        var W = f.W();
        return f.Y() + (n === 12 && W < 9 ? -1 : n === 1 && W > 9);
      },

      // Full year; e.g. 1980..2010
      Y: function () { return jsdate.getFullYear(); },

      // Last two digits of year; 00..99
      y: function () { return (String(f.Y())).slice(-2); },

      /* Time */
      // am or pm
      a: function () { return jsdate.getHours() > 11 ? 'pm' : 'am'; },

      // AM or PM
      A: function () { return f.a().toUpperCase(); },

      // Swatch Internet time; 000..999
      B: function () {
        var unixTime = jsdate.getTime() / 1000;
        var secondsPassedToday = unixTime % 86400 + 3600; // since it's based off of UTC+1
        if (secondsPassedToday < 0) { secondsPassedToday += 86400; }
        var beats = ((secondsPassedToday) / 86.4) % 1000;
        if (unixTime < 0) {
          return Math.ceil(beats);
        }
        return Math.floor(beats);
      },

      // 12-Hours; 1..12
      g: function () { return f.G() % 12 || 12; },

      // 24-Hours; 0..23
      G: function () { return jsdate.getHours(); },

      // 12-Hours w/leading 0; 01..12
      h: function () { return humanize.pad(f.g(), 2, '0'); },

      // 24-Hours w/leading 0; 00..23
      H: function () { return humanize.pad(f.G(), 2, '0'); },

      // Minutes w/leading 0; 00..59
      i: function () { return humanize.pad(jsdate.getMinutes(), 2, '0'); },

      // Seconds w/leading 0; 00..59
      s: function () { return humanize.pad(jsdate.getSeconds(), 2, '0'); },

      // Microseconds; 000000-999000
      u: function () { return humanize.pad(jsdate.getMilliseconds() * 1000, 6, '0'); },

      // Whether or not the date is in daylight savings time
      /*
      I: function () {
        // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
        // If they are not equal, then DST is observed.
        var Y = f.Y();
        return 0 + ((new Date(Y, 0) - Date.UTC(Y, 0)) !== (new Date(Y, 6) - Date.UTC(Y, 6)));
      },
      */

      // Difference to GMT in hour format; e.g. +0200
      O: function () {
        var tzo = jsdate.getTimezoneOffset();
        var tzoNum = Math.abs(tzo);
        return (tzo > 0 ? '-' : '+') + humanize.pad(Math.floor(tzoNum / 60) * 100 + tzoNum % 60, 4, '0');
      },

      // Difference to GMT w/colon; e.g. +02:00
      P: function () {
        var O = f.O();
        return (O.substr(0, 3) + ':' + O.substr(3, 2));
      },

      // Timezone offset in seconds (-43200..50400)
      Z: function () { return -jsdate.getTimezoneOffset() * 60; },

      // Full Date/Time, ISO-8601 date
      c: function () { return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb); },

      // RFC 2822
      r: function () { return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb); },

      // Seconds since UNIX epoch
      U: function () { return jsdate.getTime() / 1000 || 0; }
    };    

    return format.replace(formatChr, formatChrCb);
  };


  /**
   * format number by adding thousands separaters and significant digits while rounding
   */
  humanize.numberFormat = function(number, decimals, decPoint, thousandsSep) {
    decimals = isNaN(decimals) ? 2 : Math.abs(decimals);
    decPoint = (decPoint === undefined) ? '.' : decPoint;
    thousandsSep = (thousandsSep === undefined) ? ',' : thousandsSep;

    var sign = number < 0 ? '-' : '';
    number = Math.abs(+number || 0);

    var intPart = parseInt(number.toFixed(decimals), 10) + '';
    var j = intPart.length > 3 ? intPart.length % 3 : 0;

    return sign + (j ? intPart.substr(0, j) + thousandsSep : '') + intPart.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousandsSep) + (decimals ? decPoint + Math.abs(number - intPart).toFixed(decimals).slice(2) : '');
  };


  /**
   * For dates that are the current day or within one day, return 'today', 'tomorrow' or 'yesterday', as appropriate.
   * Otherwise, format the date using the passed in format string.
   *
   * Examples (when 'today' is 17 Feb 2007):
   * 16 Feb 2007 becomes yesterday.
   * 17 Feb 2007 becomes today.
   * 18 Feb 2007 becomes tomorrow.
   * Any other day is formatted according to given argument or the DATE_FORMAT setting if no argument is given.
   */
  humanize.naturalDay = function(timestamp, format) {
    timestamp = (timestamp === undefined) ? humanize.time() : timestamp;
    format = (format === undefined) ? 'Y-m-d' : format;

    var oneDay = 86400;
    var d = new Date();
    var today = (new Date(d.getFullYear(), d.getMonth(), d.getDate())).getTime() / 1000;

    if (timestamp < today && timestamp >= today - oneDay) {
      return 'yesterday';
    } else if (timestamp >= today && timestamp < today + oneDay) {
      return 'today';
    } else if (timestamp >= today + oneDay && timestamp < today + 2 * oneDay) {
      return 'tomorrow';
    }

    return humanize.date(format, timestamp);
  };

  /**
   * returns a string representing how many seconds, minutes or hours ago it was or will be in the future
   * Will always return a relative time, most granular of seconds to least granular of years. See unit tests for more details
   */
  humanize.relativeTime = function(timestamp) {
    timestamp = (timestamp === undefined) ? humanize.time() : timestamp;

    var currTime = humanize.time();
    var timeDiff = currTime - timestamp;

    // within 2 seconds
    if (timeDiff < 2 && timeDiff > -2) {
      return (timeDiff >= 0 ? 'just ' : '') + 'now';
    }

    // within a minute
    if (timeDiff < 60 && timeDiff > -60) {
      return (timeDiff >= 0 ? Math.floor(timeDiff) + ' seconds ago' : 'in ' + Math.floor(-timeDiff) + ' seconds');
    }

    // within 2 minutes
    if (timeDiff < 120 && timeDiff > -120) {
      return (timeDiff >= 0 ? 'about a minute ago' : 'in about a minute');
    }

    // within an hour
    if (timeDiff < 3600 && timeDiff > -3600) {
      return (timeDiff >= 0 ? Math.floor(timeDiff / 60) + ' minutes ago' : 'in ' + Math.floor(-timeDiff / 60) + ' minutes');
    }

    // within 2 hours
    if (timeDiff < 7200 && timeDiff > -7200) {
      return (timeDiff >= 0 ? 'about an hour ago' : 'in about an hour');
    }

    // within 24 hours
    if (timeDiff < 86400 && timeDiff > -86400) {
      return (timeDiff >= 0 ? Math.floor(timeDiff / 3600) + ' hours ago' : 'in ' + Math.floor(-timeDiff / 3600) + ' hours');
    }

    // within 2 days
    var days2 = 2 * 86400;
    if (timeDiff < days2 && timeDiff > -days2) {
      return (timeDiff >= 0 ? '1 day ago' : 'in 1 day');
    }

    // within 29 days
    var days29 = 29 * 86400;
    if (timeDiff < days29 && timeDiff > -days29) {
      return (timeDiff >= 0 ? Math.floor(timeDiff / 86400) + ' days ago' : 'in ' + Math.floor(-timeDiff / 86400) + ' days');
    }

    // within 60 days
    var days60 = 60 * 86400;
    if (timeDiff < days60 && timeDiff > -days60) {
      return (timeDiff >= 0 ? 'about a month ago' : 'in about a month');
    }

    var currTimeYears = parseInt(humanize.date('Y', currTime), 10);
    var timestampYears = parseInt(humanize.date('Y', timestamp), 10);
    var currTimeMonths = currTimeYears * 12 + parseInt(humanize.date('n', currTime), 10);
    var timestampMonths = timestampYears * 12 + parseInt(humanize.date('n', timestamp), 10);

    // within a year
    var monthDiff = currTimeMonths - timestampMonths;
    if (monthDiff < 12 && monthDiff > -12) {
      return (monthDiff >= 0 ? monthDiff + ' months ago' : 'in ' + (-monthDiff) + ' months');
    }

    var yearDiff = currTimeYears - timestampYears;
    if (yearDiff < 2 && yearDiff > -2) {
      return (yearDiff >= 0 ? 'a year ago' : 'in a year');
    }

    return (yearDiff >= 0 ? yearDiff + ' years ago' : 'in ' + (-yearDiff) + ' years');
  };

  /**
   * Converts an integer to its ordinal as a string.
   *
   * 1 becomes 1st
   * 2 becomes 2nd
   * 3 becomes 3rd etc
   */
  humanize.ordinal = function(number) {
    number = parseInt(number, 10);
    number = isNaN(number) ? 0 : number;
    var sign = number < 0 ? '-' : '';
    number = Math.abs(number);
    var tens = number % 100;

    return sign + number + (tens > 4 && tens < 21 ? 'th' : {1: 'st', 2: 'nd', 3: 'rd'}[number % 10] || 'th');
  };

  /**
   * Formats the value like a 'human-readable' file size (i.e. '13 KB', '4.1 MB', '102 bytes', etc).
   *
   * For example:
   * If value is 123456789, the output would be 117.7 MB.
   */
  humanize.filesize = function(filesize, kilo, decimals, decPoint, thousandsSep, suffixSep) {
    kilo = (kilo === undefined) ? 1024 : kilo;
    if (filesize <= 0) { return '0 bytes'; }
    if (filesize < kilo && decimals === undefined) { decimals = 0; }
    if (suffixSep === undefined) { suffixSep = ' '; }
    return humanize.intword(filesize, ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'], kilo, decimals, decPoint, thousandsSep, suffixSep);
  };

  /**
   * Formats the value like a 'human-readable' number (i.e. '13 K', '4.1 M', '102', etc).
   *
   * For example:
   * If value is 123456789, the output would be 117.7 M.
   */
  humanize.intword = function(number, units, kilo, decimals, decPoint, thousandsSep, suffixSep) {
    var humanized, unit;

    units = units || ['', 'K', 'M', 'B', 'T'],
    unit = units.length - 1,
    kilo = kilo || 1000,
    decimals = isNaN(decimals) ? 2 : Math.abs(decimals),
    decPoint = decPoint || '.',
    thousandsSep = thousandsSep || ',',
    suffixSep = suffixSep || '';

    for (var i=0; i < units.length; i++) {
      if (number < Math.pow(kilo, i+1)) {
        unit = i;
        break;
      }
    }
    humanized = number / Math.pow(kilo, unit);

    var suffix = units[unit] ? suffixSep + units[unit] : '';
    return humanize.numberFormat(humanized, decimals, decPoint, thousandsSep) + suffix;
  };

  /**
   * Replaces line breaks in plain text with appropriate HTML
   * A single newline becomes an HTML line break (<br />) and a new line followed by a blank line becomes a paragraph break (</p>).
   * 
   * For example:
   * If value is Joel\nis a\n\nslug, the output will be <p>Joel<br />is a</p><p>slug</p>
   */
  humanize.linebreaks = function(str) {
    // remove beginning and ending newlines
    str = str.replace(/^([\n|\r]*)/, '');
    str = str.replace(/([\n|\r]*)$/, '');

    // normalize all to \n
    str = str.replace(/(\r\n|\n|\r)/g, "\n");

    // any consecutive new lines more than 2 gets turned into p tags
    str = str.replace(/(\n{2,})/g, '</p><p>');

    // any that are singletons get turned into br
    str = str.replace(/\n/g, '<br />');
    return '<p>' + str + '</p>';
  };

  /**
   * Converts all newlines in a piece of plain text to HTML line breaks (<br />).
   */
  humanize.nl2br = function(str) {
    return str.replace(/(\r\n|\n|\r)/g, '<br />');
  };

  /**
   * Truncates a string if it is longer than the specified number of characters.
   * Truncated strings will end with a translatable ellipsis sequence ('…').
   */
  humanize.truncatechars = function(string, length) {
    if (string.length <= length) { return string; }
    return string.substr(0, length) + '…';
  };

  /**
   * Truncates a string after a certain number of words.
   * Newlines within the string will be removed.
   */
  humanize.truncatewords = function(string, numWords) {
    var words = string.split(' ');
    if (words.length < numWords) { return string; }
    return words.slice(0, numWords).join(' ') + '…';
  };

}).call(this);


/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* eslint-disable */
/**
 * UUID.js - RFC-compliant UUID Generator for JavaScript
 *
 * @file
 * @author  LiosK
 * @version v3.6.1
 * @license The MIT License: Copyright (c) 2010-2017 LiosK.
 */

!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

// create local namespace
function UUID() {}


// Core Component {{{

/**
 * Generates a version 4 UUID as a hexadecimal string.
 * @returns {string} Hexadecimal UUID string.
 */
UUID.generate = function() {
  var rand = UUID._getRandomInt, hex = UUID._hexAligner;
  return  hex(rand(32), 8)          // time_low
        + "-"
        + hex(rand(16), 4)          // time_mid
        + "-"
        + hex(0x4000 | rand(12), 4) // time_hi_and_version
        + "-"
        + hex(0x8000 | rand(14), 4) // clock_seq_hi_and_reserved clock_seq_low
        + "-"
        + hex(rand(48), 12);        // node
};

/**
 * Returns an unsigned x-bit random integer.
 * @private
 * @param {number} x Unsigned integer ranging from 0 to 53, inclusive.
 * @returns {number} Unsigned x-bit random integer (0 <= f(x) < 2^x).
 */
UUID._getRandomInt = function(x) {
  if (x < 0 || x > 53) { return NaN; }
  var n = 0 | Math.random() * 0x40000000; // 1 << 30
  return x > 30 ? n + (0 | Math.random() * (1 << x - 30)) * 0x40000000 : n >>> 30 - x;
};

/**
 * Converts an integer to a zero-filled hexadecimal string.
 * @private
 * @param {number} num
 * @param {number} length
 * @returns {string}
 */
UUID._hexAligner = function(num, length) {
  var str = num.toString(16), i = length - str.length, z = "0";
  for (; i > 0; i >>>= 1, z += z) { if (i & 1) { str = z + str; } }
  return str;
};

// }}}

// UUID Object Component {{{

/**
 * Names of UUID internal fields.
 * @type {string[]}
 * @constant
 * @since 3.0
 */
UUID.FIELD_NAMES = ["timeLow", "timeMid", "timeHiAndVersion",
                    "clockSeqHiAndReserved", "clockSeqLow", "node"];

/**
 * Sizes of UUID internal fields.
 * @type {number[]}
 * @constant
 * @since 3.0
 */
UUID.FIELD_SIZES = [32, 16, 16, 8, 8, 48];

/**
 * Creates a version 4 {@link UUID} object.
 * @returns {UUID} Version 4 {@link UUID} object.
 * @since 3.0
 */
UUID.genV4 = function() {
  var rand = UUID._getRandomInt;
  return new UUID()._init(rand(32), rand(16), // time_low time_mid
                          0x4000 | rand(12),  // time_hi_and_version
                          0x80   | rand(6),   // clock_seq_hi_and_reserved
                          rand(8), rand(48)); // clock_seq_low node
};

/**
 * Converts a hexadecimal UUID string to a {@link UUID} object.
 * @param {string} strId Hexadecimal UUID string ("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").
 * @returns {UUID} {@link UUID} object or null.
 * @since 3.0
 */
UUID.parse = function(strId) {
  var r, p = /^\s*(urn:uuid:|\{)?([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{2})([0-9a-f]{2})-([0-9a-f]{12})(\})?\s*$/i;
  if (r = p.exec(strId)) {
    var l = r[1] || "", t = r[8] || "";
    if (((l + t) === "") ||
        (l === "{" && t === "}") ||
        (l.toLowerCase() === "urn:uuid:" && t === "")) {
      return new UUID()._init(parseInt(r[2], 16), parseInt(r[3], 16),
                              parseInt(r[4], 16), parseInt(r[5], 16),
                              parseInt(r[6], 16), parseInt(r[7], 16));
    }
  }
  return null;
};

/**
 * Initializes a {@link UUID} object.
 * @private
 * @constructs UUID
 * @param {number} [timeLow=0] time_low field (octet 0-3, uint32).
 * @param {number} [timeMid=0] time_mid field (octet 4-5, uint16).
 * @param {number} [timeHiAndVersion=0] time_hi_and_version field (octet 6-7, uint16).
 * @param {number} [clockSeqHiAndReserved=0] clock_seq_hi_and_reserved field (octet 8, uint8).
 * @param {number} [clockSeqLow=0] clock_seq_low field (octet 9, uint8).
 * @param {number} [node=0] node field (octet 10-15, uint48).
 * @returns {UUID} this.
 */
UUID.prototype._init = function() {
  var names = UUID.FIELD_NAMES, sizes = UUID.FIELD_SIZES;
  var bin = UUID._binAligner, hex = UUID._hexAligner;

  /**
   * UUID internal field values as an array of integers.
   * @type {number[]}
   */
  this.intFields = new Array(6);

  /**
   * UUID internal field values as an array of binary strings.
   * @type {string[]}
   */
  this.bitFields = new Array(6);

  /**
   * UUID internal field values as an array of hexadecimal strings.
   * @type {string[]}
   */
  this.hexFields = new Array(6);

  for (var i = 0; i < 6; i++) {
    var intValue = parseInt(arguments[i] || 0);
    this.intFields[i] = this.intFields[names[i]] = intValue;
    this.bitFields[i] = this.bitFields[names[i]] = bin(intValue, sizes[i]);
    this.hexFields[i] = this.hexFields[names[i]] = hex(intValue, sizes[i] >>> 2);
  }

  /**
   * UUID version number.
   * @type {number}
   */
  this.version = (this.intFields.timeHiAndVersion >>> 12) & 0xF;

  /**
   * 128-bit binary string representation.
   * @type {string}
   */
  this.bitString = this.bitFields.join("");

  /**
   * Non-delimited hexadecimal string representation ("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx").
   * @type {string}
   * @since v3.3.0
   */
  this.hexNoDelim = this.hexFields.join("");

  /**
   * Hexadecimal string representation ("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").
   * @type {string}
   */
  this.hexString = this.hexFields[0] + "-" + this.hexFields[1] + "-" + this.hexFields[2]
                 + "-" + this.hexFields[3] + this.hexFields[4] + "-" + this.hexFields[5];

  /**
   * URN string representation ("urn:uuid:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").
   * @type {string}
   */
  this.urn = "urn:uuid:" + this.hexString;

  return this;
};

/**
 * Converts an integer to a zero-filled binary string.
 * @private
 * @param {number} num
 * @param {number} length
 * @returns {string}
 */
UUID._binAligner = function(num, length) {
  var str = num.toString(2), i = length - str.length, z = "0";
  for (; i > 0; i >>>= 1, z += z) { if (i & 1) { str = z + str; } }
  return str;
};

/**
 * Returns the hexadecimal string representation.
 * @returns {string} {@link UUID#hexString}.
 */
UUID.prototype.toString = function() { return this.hexString; };

/**
 * Tests if two {@link UUID} objects are equal.
 * @param {UUID} uuid
 * @returns {boolean} True if two {@link UUID} objects are equal.
 */
UUID.prototype.equals = function(uuid) {
  if (!(uuid instanceof UUID)) { return false; }
  for (var i = 0; i < 6; i++) {
    if (this.intFields[i] !== uuid.intFields[i]) { return false; }
  }
  return true;
};

/**
 * Nil UUID object.
 * @type {UUID}
 * @constant
 * @since v3.4.0
 */
UUID.NIL = new UUID()._init(0, 0, 0, 0, 0, 0);

// }}}

// UUID Version 1 Component {{{

/**
 * Creates a version 1 {@link UUID} object.
 * @returns {UUID} Version 1 {@link UUID} object.
 * @since 3.0
 */
UUID.genV1 = function() {
  if (UUID._state == null) { UUID.resetState(); }
  var now = new Date().getTime(), st = UUID._state;
  if (now != st.timestamp) {
    if (now < st.timestamp) { st.sequence++; }
    st.timestamp = now;
    st.tick = UUID._getRandomInt(4);
  } else if (Math.random() < UUID._tsRatio && st.tick < 9984) {
    // advance the timestamp fraction at a probability
    // to compensate for the low timestamp resolution
    st.tick += 1 + UUID._getRandomInt(4);
  } else {
    st.sequence++;
  }

  // format time fields
  var tf = UUID._getTimeFieldValues(st.timestamp);
  var tl = tf.low + st.tick;
  var thav = (tf.hi & 0xFFF) | 0x1000;  // set version '0001'

  // format clock sequence
  st.sequence &= 0x3FFF;
  var cshar = (st.sequence >>> 8) | 0x80; // set variant '10'
  var csl = st.sequence & 0xFF;

  return new UUID()._init(tl, tf.mid, thav, cshar, csl, st.node);
};

/**
 * Re-initializes the internal state for version 1 UUID creation.
 * @since 3.0
 */
UUID.resetState = function() {
  UUID._state = new UUIDState();
};

function UUIDState() {
  var rand = UUID._getRandomInt;
  this.timestamp = 0;
  this.sequence = rand(14);
  this.node = (rand(8) | 1) * 0x10000000000 + rand(40); // set multicast bit '1'
  this.tick = rand(4);  // timestamp fraction smaller than a millisecond
}

/**
 * Probability to advance the timestamp fraction: the ratio of tick movements to sequence increments.
 * @private
 * @type {number}
 */
UUID._tsRatio = 1 / 4;

/**
 * Persistent internal state for version 1 UUID creation.
 * @private
 * @type {UUIDState}
 */
UUID._state = null;

/**
 * @private
 * @param {Date|number} time ECMAScript Date Object or milliseconds from 1970-01-01.
 * @returns {any}
 */
UUID._getTimeFieldValues = function(time) {
  var ts = time - Date.UTC(1582, 9, 15);
  var hm = ((ts / 0x100000000) * 10000) & 0xFFFFFFF;
  return  { low: ((ts & 0xFFFFFFF) * 10000) % 0x100000000,
            mid: hm & 0xFFFF, hi: hm >>> 16, timestamp: ts };
};

// }}}

// Backward Compatibility Component {{{

/**
 * Reinstalls {@link UUID.generate} method to emulate the interface of UUID.js version 2.x.
 * @since 3.1
 * @deprecated Version 2.x compatible interface is not recommended.
 */
UUID.makeBackwardCompatible = function() {
  var f = UUID.generate;
  UUID.generate = function(o) {
    return (o && o.version == 1) ? UUID.genV1().hexString : f.call(UUID);
  };
  UUID.makeBackwardCompatible = function() {};
};

// }}}

return UUID;

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


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

},[325])});;