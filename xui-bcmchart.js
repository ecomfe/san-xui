define(["san","echarts"], function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_408__) { return webpackJsonp([0],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(245);
var isBuffer = __webpack_require__(413);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(13);
var settle = __webpack_require__(416);
var buildURL = __webpack_require__(418);
var parseHeaders = __webpack_require__(419);
var isURLSameOrigin = __webpack_require__(420);
var createError = __webpack_require__(247);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(421);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(422);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41)))

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(417);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_promise__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_san_xui_x_components_BcmChart__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Row__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__examples_bcmData__ = __webpack_require__(430);
/**
 * @file demos/xui-bcmchart.es6
 * @author leeight
 */









function delayRequester(data, ms = 500) {
    return function () {
        return new __WEBPACK_IMPORTED_MODULE_1_promise___default.a((resolve, reject) => {
            setTimeout(() => resolve(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.cloneDeep(data)), ms);
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

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_2_san__["defineComponent"])({
    template,
    components: {
        'x-row': __WEBPACK_IMPORTED_MODULE_4__Row__["a" /* default */],
        'xui-bcmchart': __WEBPACK_IMPORTED_MODULE_3_san_xui_x_components_BcmChart__["a" /* default */]
    },
    initData() {
        return {
            requester1: delayRequester(__WEBPACK_IMPORTED_MODULE_5__examples_bcmData__["a" /* Data1 */]),
            requester2: delayRequester(__WEBPACK_IMPORTED_MODULE_5__examples_bcmData__["b" /* Data2 */]),
            requester3: delayRequester(__WEBPACK_IMPORTED_MODULE_5__examples_bcmData__["c" /* Data3 */]),
            requester4: delayRequester(__WEBPACK_IMPORTED_MODULE_5__examples_bcmData__["d" /* Data4 */]),
            requester5: delayRequester(__WEBPACK_IMPORTED_MODULE_5__examples_bcmData__["e" /* Data5 */]),
            requester6: delayRequester(__WEBPACK_IMPORTED_MODULE_5__examples_bcmData__["f" /* Data6 */]),
            requester7: delayRequester(__WEBPACK_IMPORTED_MODULE_5__examples_bcmData__["g" /* Data7 */]),
            requester8: delayRequester(__WEBPACK_IMPORTED_MODULE_5__examples_bcmData__["h" /* Data8 */])
        };
    }
}));



/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_san___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_san__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_ria_utils_mtools__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Chart__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Select__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Tip__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Button__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Loading__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__mixins_ajax__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__asDialog__ = __webpack_require__(76);
/**
 * @file components/BcmChart.es6
 * @author leeight
 */














const cx = Object(__WEBPACK_IMPORTED_MODULE_3__util__["f" /* create */])('ui-bcmchart');
const kMetricName = 'metricName';

/* eslint-disable */
const template = `<div class="{{mainClass}}" style="{{mainStyle}}">
<div class="${cx('box')}">
    <h1 s-if="title && !withFilter">
        {{title}}
        <div on-click="showBigView" class="${cx('showbig')}" s-if="!loading && showbigable"></div>
    </h1>
    <div class="${cx('filter')}" s-if="withFilter">
        统计项：<ui-select datasource="{{ds.statistics}}" value="{=statistics=}" on-change="loadMetrics" />
        采样周期：<ui-select datasource="{{ds.period}}" value="{=period=}" on-change="loadMetrics" />
        最近：<ui-select datasource="{{ds.timeRange}}" value="{=time=}" on-change="loadMetrics" />
        <ui-tip skin="warning" message="最多支持1440个数据点的查询显示，请选择合适的采样周期和聚合时间段。" />
        <ui-button icon="refresh" on-click="loadMetrics" />
    </div>
    <div class="${cx('chart')}" style="{{chartStyle}}">
        <ui-loading s-if="!chartOption && loading" />
        <div class="${cx('error')}" s-elif="error">{{error | raw}}</div>
        <div class="${cx('no-data')}" s-elif="isEmpty">{{noData | raw}}</div>
        <ui-chart s-else option="{{chartOption}}" loading="{{loading}}" width="{{width}}" height="{{height}}" not-merge />
    </div>
</div>
</div>`;
/* eslint-enable */

function parseMetrics(metrics) {
    if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isArray(metrics)) {
        return metrics;
    }
    else if (metrics) {
        return __WEBPACK_IMPORTED_MODULE_2_inf_ria_utils_mtools__["a" /* default */].parseMetrics(metrics);
    }
    return [];
}

function getDefaultUrl(apiType) {
    return apiType === 'dimensions'
        ? '/api/bcm/metricdata/v2/datas/dimensions'
        : '/api/bcm/metricdata/v2/datas/metricname';
}

const BcmChart = Object(__WEBPACK_IMPORTED_MODULE_1_san__["defineComponent"])({ // eslint-disable-line
    template,
    components: {
        'ui-select': __WEBPACK_IMPORTED_MODULE_5__Select__["a" /* default */],
        'ui-button': __WEBPACK_IMPORTED_MODULE_7__Button__["a" /* default */],
        'ui-tip': __WEBPACK_IMPORTED_MODULE_6__Tip__["a" /* default */],
        'ui-loading': __WEBPACK_IMPORTED_MODULE_8__Loading__["a" /* default */],
        'ui-chart': __WEBPACK_IMPORTED_MODULE_4__Chart__["a" /* default */]
    },
    dataTypes: {
        /**
         * BcmChart 的标题
         */
        title: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,

        /**
         * WTF??
         */
        lazy: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 是否展示过滤的功能，一般在对话框的里面才会设置这个值
         * @default false
         */
        withFilter: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 是否支持弹框放大的功能
         * @default false
         */
        showbigable: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 没有数据的时候，需要展示的文案
         */
        noData: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,

        /**
         * 配合 noData 来用
         */
        isEmpty: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * Chart的宽度
         * @default 550
         */
        width: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * Chart的高度
         * @default 200
         */
        height: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * 是否是加载中
         * @default true
         */
        loading: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].bool,

        /**
         * 如果出错了，展示的错误信息
         */
        error: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].any,

        /**
         * 获取监控数据回掉函数<br>
         * function(payload:object):Promise.&lt;{series: any[]}, Error&gt;
         */
        requester: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].func,

        /**
         * 如BCE_BCC
         */
        scope: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,

        /**
         * 趋势图维度类型：多维度|多指标，可以设置的值有 metricName, dimensions
         * @default metricName
         */
        apiType: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,

        /**
         * 维度信息，可以是字符串或者数组
         * InstanceId:1;Node:2|3
         * ["InstanceId:1;Node:2", "InstanceId:1;Node:3"]
         */
        dimensions: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].any,

        /**
         * 监控指标
         * 如：CPUUsagePercent(CPU使用率)
         * @default ''
         */
        metrics: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,

        /**
         * 统计方式：
         *  average: '平均值'
         *  maximum: '最大值'
         *  minimum: '最小值'
         *  sum: '和值'
         *  sampleCount: '样本数'
         * @default average
         */
        statistics: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,

        /**
         * 聚合周期，单位秒
         * @default 60
         */
        period: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].number,

        /**
         * 聚合区间，目前只支持最近多长时间
         * 如：1h：最近1小时
         * @default 1h
         */
        time: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string,

        /**
         * 指标单位
         * @default ''
         */
        unit: __WEBPACK_IMPORTED_MODULE_1_san__["DataTypes"].string
    },
    computed: {
        mainClass() {
            const klass = cx.mainClass(this);
            return klass;
        },
        mainStyle() {
            const style = cx.mainStyle(this);
            // width 和 height 是给 chart 设置的
            return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.omit(style, 'width', 'height');
        },
        chartStyle() {
            const style = cx.mainStyle(this);
            return __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.pick(style, 'width', 'height');
        },
        metricConfig() {
            const metrics = this.data.get('metrics');
            const unit = this.data.get('unit');
            const statistics = this.data.get('statistics');

            return {
                unit,
                statistics,
                metrics: parseMetrics(metrics)
            };
        },
        conf() {
            // 这些参数实际上跟 https://cloud.baidu.com/doc/BCM/API.html#.E6.9F.A5.E8.AF.A2.E6.95.B0.E6.8D.AE.E6.8E.A5.E5.8F.A3 有关系
            // 保持跟之前的命名规则一致
            const conf = {};

            const statistics = this.data.get('statistics');
            const scope = this.data.get('scope');
            const time = this.data.get('time');
            const period = this.data.get('period');
            const apiType = this.data.get('apiType');
            const dimensions = this.data.get('dimensions');
            const metrics = this.data.get('metrics');

            const metricMap = parseMetrics(metrics);
            const {startTime, endTime} = __WEBPACK_IMPORTED_MODULE_2_inf_ria_utils_mtools__["a" /* default */].getUTCTimeRange(time, +period);

            if (apiType === kMetricName) {
                conf.dimensions = dimensions;
                conf.metricNames = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(metricMap, o => o.value);
            }
            else {
                // 是数组，表示已经解析好了，不需要再次解析
                if (__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.isArray(dimensions)) {
                    conf.dimensions = dimensions;
                }
                else {
                    conf.dimensions = __WEBPACK_IMPORTED_MODULE_2_inf_ria_utils_mtools__["a" /* default */].parseDimensions(dimensions);
                }
                conf.metricName = metricMap[0].value;
            }

            conf.statistics = statistics;
            conf.scope = scope;
            conf.periodInSecond = +period;
            conf.startTime = startTime;
            conf.endTime = endTime;

            /**
            if (scope === 'BCE_BOS' && 'x' === 'space') {
                delete conf.dimensions;
            }
            */

            return conf;
        }
    },
    initData() {
        return {
            lazy: true,
            withFilter: false,
            unit: '',
            metrics: '',
            width: 550,
            height: 200,
            apiType: kMetricName,
            period: 60,
            time: '1h',
            statistics: 'average',
            noData: '暂无数据<p style="font-size:12px;color:#aaa;">请检查是否安装了BCM客户端</p>',
            ds: {
                statistics: [
                    {text: '平均值', value: 'average'},
                    {text: '和值', value: 'sum'},
                    {text: '最大值', value: 'maximum'},
                    {text: '最小值', value: 'minimum'},
                    {text: '样本数', value: 'sampleCount'}
                ],
                period: [
                    {text: '1分钟', value: 60},
                    {text: '5分钟', value: 300},
                    {text: '20分钟', value: 1200},
                    {text: '1小时', value: 3600},
                    {text: '6小时', value: 21600},
                    {text: '12小时', value: 43200},
                    {text: '1天', value: 86400}
                ],
                timeRange: [
                    {text: '1小时', value: '1h'},
                    {text: '6小时', value: '6h'},
                    {text: '1天', value: '1d'},
                    {text: '7天', value: '7d'},
                    {text: '14天', value: '14d'},
                    {text: '40天', value: '40d'}
                ]
            }
        };
    },
    inited() {
        const requester = this.data.get('requester');
        if (typeof requester !== 'function') {
            const apiType = this.data.get('apiType');
            const url = requester && typeof requester === 'string' ? requester : getDefaultUrl(apiType);
            this.data.set('requester', payload => Object(__WEBPACK_IMPORTED_MODULE_9__mixins_ajax__["a" /* $post */])(url, payload));
        }
    },
    attached() {
        this.loadMetrics();
    },

    loadMetrics() {
        const requester = this.data.get('requester');
        if (typeof requester !== 'function') {
            this.data.set('error', '请设置 requester 参数');
            return;
        }

        const payload = this.data.get('conf');
        this.data.set('loading', true);
        this.data.set('error', null);
        return requester(payload)
            .then(data => {
                this.data.set('loading', false);
                this.renderChart(data);
            })
            .catch(error => {
                this.data.set('loading', false);
                this.data.set('error', error && error.global ? error.global : error);
            });
    },

    renderChart(data) {
        const conf = this.data.get('conf');

        const isEmpty = __WEBPACK_IMPORTED_MODULE_2_inf_ria_utils_mtools__["a" /* default */].isMonitorTrendEmpty(data.series, conf.statistics);
        this.data.set('isEmpty', isEmpty);
        if (isEmpty) {
            return;
        }

        __WEBPACK_IMPORTED_MODULE_2_inf_ria_utils_mtools__["a" /* default */].adjustSeriesData(data, conf.statistics);
        const metricConfig = this.data.get('metricConfig');
        const chartOption = __WEBPACK_IMPORTED_MODULE_2_inf_ria_utils_mtools__["a" /* default */].getChartOptions(data, metricConfig, {type: 'line'}, {period: conf.periodInSecond});
        this.data.set('chartOption', chartOption);
    },

    showBigView() {
        if (this.dialog) {
            this.dialog.dispose();
            this.dialog = null;
        }

        const DialogComponent = Object(__WEBPACK_IMPORTED_MODULE_10__asDialog__["a" /* asDialog */])(BcmChart);
        const payload = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.defaults({withFilter: true, width: 740, height: 350}, this.data.get());
        const data = {
            title: payload.title,
            foot: false,
            width: 800,
            payload
        };
        const dialog = this.dialog = new DialogComponent({data});
        dialog.on('close', () => this.dialog = null);
        dialog.attach(document.body);
    },

    disposed() {
        if (this.dialog) {
            this.dialog.dispose();
        }
    }
});

/* harmony default export */ __webpack_exports__["a"] = (BcmChart);



/***/ }),

/***/ 407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_inf_i18n__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_echarts__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_echarts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_echarts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__formatter__ = __webpack_require__(409);
/**
 * @file inf-ria/utils/mtools.es6
 * @author leeight
 */









const IS_V3 = /^3\./.test(__WEBPACK_IMPORTED_MODULE_4_echarts___default.a.version);

/**
 * 将utc时间转换为本地时间
 *
 * @param {number} time 时间戳
 * @param {string} pattern 格式化字符串
 * @return {string}
 */
function utc2local(time, pattern) {
    pattern = pattern || 'MM-DD HH:mm';
    return __WEBPACK_IMPORTED_MODULE_0_moment___default()(time).format(pattern);
}

/**
 * 将本地时间戳转换为utc时间字符串
 *
 * @param {number} time 时间戳
 * @param {string} pattern 格式化字符串
 * @return {string}
 */
function local2utc(time, pattern) {
    pattern = pattern || 'YYYY-MM-DDTHH:mm:ss';
    return __WEBPACK_IMPORTED_MODULE_0_moment___default()(time).utc().format(pattern) + 'Z';
}

/**
 * 获取当前的utc时间区间
 *
 * @param {string} timeRange 时间段标识
 * @param {number} period 时间区间
 * @return {Object}
 */
function getUTCTimeRange(timeRange, period) {
    let mt = timeRange.match(/(\d+)(\w+)/);
    let value = mt[1];
    let unit = mt[2];
    let m = __WEBPACK_IMPORTED_MODULE_0_moment___default()();

    let endTime = local2utc(m);
    let startTime = '';

    if (arguments.length === 1) {
        // 格式化时间：秒为0，起始时间加1分钟，解决时间区间超过范围问题
        startTime = local2utc(m.add('m', 1).subtract(unit, value), 'YYYY-MM-DDTHH:mm:00');
    }
    else {
        if (period < 60 * 60) {
            startTime = local2utc(__WEBPACK_IMPORTED_MODULE_0_moment___default()(m.add('m', 1).subtract(unit, value).format('YYYY-MM-DDTHH:mm:00')));
        }
        else if (period < 60 * 60 * 24) {
            startTime = local2utc(__WEBPACK_IMPORTED_MODULE_0_moment___default()(m.add('h', 1).subtract(unit, value).format('YYYY-MM-DDTHH:00:00')));
        }
        else {
            startTime = local2utc(__WEBPACK_IMPORTED_MODULE_0_moment___default()(m.add('d', 1).subtract(unit, value).format('YYYY-MM-DDT00:00:00')));
        }
    }
    return {
        endTime: endTime,
        startTime: startTime
    };
}

/**
 * 对目标字符串按gbk编码截取字节长度
 *
 * @param {string} source 目标字符串
 * @param {number} length 需要截取的字节长度
 * @param {string} [tail] 追加字符串,可选.
 * @return {string}
 */
function truncate(source, length, tail) {
    source = String(source);
    tail = tail || '';
    let byteLength = source.replace('/[^\x00-\xff]/g', '**').length;
    if (length < 0 || byteLength <= length) {
        return source;
    }

    length = length - 2;
    source = source.substr(0, length).replace(/([^\x00-\xff])/g, '\x241 ') // 双字节字符替换成两个
        .substr(0, length) // 截取长度
        .replace(/[^\x00-\xff]$/, '') // 去掉临界双字节字符
        .replace(/([^\x00-\xff]) /g, '\x241'); // 还原
    return source + tail;
}

let chartTheme = [
    '#4aaaff', '#f2605d', '#01B09B', '#E74684',
    '#6EC50F', '#FE863D',
    '#A45BFF', '#F6D622', '#0AC1D7', '#B569D4'
];

/**
 * 趋势图默认配置
 *
 * @type {Object}
 */
let defaultChartOptions = {
    color: chartTheme,
    calculable: false,
    animation: false,
    grid: {
        x: 65,
        x2: 35,
        y: 50,
        y2: IS_V3 ? 60 : 50
    }
};
let statisticsMap = {
    average: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('平均值'),
    maximum: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('最大值'),
    minimum: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('最小值'),
    sum: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('和值'),
    sampleCount: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('样本数')
};

/**
 * 与默认配置进行合并，得到最终的配置信息
 *
 * @param {Object} opt 扩充对象
 * @return {Object} 最终配置
 */
function mergeChartOptions(opt) {
    return __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.extend({}, defaultChartOptions, opt);
}

/**
 * 将后端返回的数据，转换为echarts可以使用的配置信息
 *
 * @param {Object} data
 *  {series:[{name:'监控项名称', data:[数据点]}], category:[]}
 * @param {Object} metric 监控项配置
 *  - metric.unit {String}
 *  - metric.statistics {String}
 *  - metric.names {Object}
 *  - metric.names[value] = name
 *  - metric.metrics {Array}
 *  - metric.src 针对枚举类型的数值
 * @param {Object} opt
 *  - opt.type 图表类型line, bar, pie ...
 *  - opt.chart 图表特殊配置
 * @param {Object} addition 附加条件
 * @return {Object}
 */
function getChartOptions(data, metric, opt, addition) {
    let category = [];
    let unit = metric.unit;
    let zoomStart = 0;
    let legend = [];
    let tmpData = {};
    let seriesOpt = {};
    let seriesData = [];
    opt = opt || {
        type: 'line'
    };
    if (opt.type === 'line') {
        seriesOpt = {
            type: 'line',
            smooth: true,
            symbol: 'none',
            symbolSize: 2,
            showAllSymbol: true,
            itemStyle: {
                borderWidth: 1,
                normal: {
                    // areaStyle: {
                    //     type: 'default'
                    // },
                    lineStyle: {
                        width: 1
                    }
                }
            }
        };
    }
    else if (opt.type === 'bar') {
        seriesOpt = {
            type: 'bar'
        };
    }

    seriesOpt = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.extend(seriesOpt, opt.chart || {});

    let spliteNumber = 5;
    let yAxisFormatter;
    let yAxisMax;
    let tooltipFormatter = function (params) {
        let arr = [];
        if (params.length > 0) {
            arr.push(params[0].name + ' (' + statisticsMap[metric.statistics] + ')');
        }

        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(params, function (item) {
            let label = truncate(item.seriesName, 22, '…');
            arr.push(label + '：' + item.value);
        });
        return arr.join('<br/>');
    };
    if (data.category.length === 0) {
        category.push(utc2local(__WEBPACK_IMPORTED_MODULE_0_moment___default()().utc()).replace(' ', '\n'));
        category.push(utc2local()); // .replace(' ', '\n'));
        category.push(utc2local()); // .replace(' ', '\n'));
    }
    else {
        let pattern = 'MM-DD HH:mm';
        if (addition && addition.period) {
            if (addition.period >= 60 * 60 * 24) {
                pattern = 'MM-DD';
            }

            // 精确到毫秒的格式
            if (addition.period < 1) {
                pattern = 'MM-DD HH:mm:ss.SSS';
            }
        }

        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(data.category, function (item) {
            category.push(utc2local(item, pattern));
        });
    }
    if (metric.nullPointMode === 0) {
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(data.series, function (item) {
            let values = [];

            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(item.data, function (value) {
                if (typeof value === 'undefined') {
                    value = 0;
                }

                values.push(value);
            });
            if (values.length === 0) {
                for (let i = 0, len = category.length; i < len; i++) {
                    values[i] = 0;
                }
            }

            tmpData[item.name] = values;
        });
    }
    else {
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(data.series, function (item) {
            let values = [];
            let tmpvalue = '';

            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(item.data, function (value) {
                if (typeof value === 'undefined') {
                    value = '-';
                }

                // 对于孤立数据点，以圆点的方式展示
                if (tmpvalue === '-' && value !== '-') {
                    values.push({
                        value: value,
                        symbol: 'emptyCircle'
                    });
                }
                else {
                    values.push(value);
                    if (value !== '-' && values.length > 1) {
                        values[values.length - 2] = tmpvalue;
                    }
                }
                tmpvalue = value;
            });
            if (values.length === 0) {
                for (let i = 0, len = category.length; i < len; i++) {
                    values[i] = '-';
                }
            }

            tmpData[item.name] = values;
        });
    }

    if (addition && addition.dataZoom) {
        zoomStart = addition.dataZoom.start;
    }
    else {
        zoomStart = Math.max((1 - 100 / category.length) * 100, 0);
    }

    let metricNames = {};
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(metric.metrics, function (item, key) {
        metricNames[item.value] = item.name;
    });
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(tmpData, function (item, key) {
        let name = metricNames[key] || key;
        let obj = __WEBPACK_IMPORTED_MODULE_3_jquery___default.a.extend(true, {}, seriesOpt, {
            name: name,
            data: item
        });
        legend.push(name);
        seriesData.push(obj);
    });
    if (metric.statistics === 'sampleCount') {
        unit = '个';
        tooltipFormatter = function (params) {
            let str = '';
            if (params.length > 0) {
                str += params[0].name + ' (' + statisticsMap[metric.statistics] + ')<br/>';
            }

            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(params, function (item, index) {
                str += truncate(item.seriesName, 22, '…') + '：';
                let value = item.value;
                if (isNaN(value)) {
                    value = 0;
                }

                str += value + '<br/>';
            });
            return str;
        };
    }
    // 状态的监控项需对返回值映射成文本
    else if (unit === 'enum') {
        unit = '';
        let enums = metric.src || {};
        let count = __WEBPACK_IMPORTED_MODULE_1_lodash___default()(enums).value().length;
        if (count < 6) {
            spliteNumber = count - 1;
        }

        tooltipFormatter = function (params) {
            let str = '';
            if (params.length > 0) {
                str += params[0].name;
            }

            str += ' (' + statisticsMap[metric.statistics] + ')';
            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(params, function (item, index) {
                let value = item.value;
                str += '<br/>' + truncate(item.seriesName, 22, '…') + '：' + value;
                if (value !== '-') {
                    str += '（' + (enums[value] || value) + '）';
                }

            });
            return str;
        };
    }
    else if (unit === Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('字节') || unit === Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('字节/秒')) {
        let suffix = (unit === Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('字节') ? '' : '/s');
        tooltipFormatter = function (params) {
            let str = '';
            if (params.length > 0) {
                str += params[0].name + ' (' + statisticsMap[metric.statistics] + ')<br/>';
            }

            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(params, function (item, index) {
                str += truncate(item.seriesName, 22, '…') + '：';
                let value = item.value;
                let prefix;
                let valueStr = '';
                if (isNaN(value)) {
                    valueStr = '-';
                }
                else {
                    prefix = value < 0 ? '-' : '';
                    value = Math.abs(value);

                    value = __WEBPACK_IMPORTED_MODULE_5__formatter__["a" /* default */].bytes(value, 2, metric.byteUnit);
                    valueStr = prefix + value + suffix;
                }
                str += valueStr + '<br/>';
            });
            return str;
        };

        yAxisFormatter = function (value) {
            let prefix = value < 0 ? '-' : '';
            value = Math.abs(value);
            value = __WEBPACK_IMPORTED_MODULE_5__formatter__["a" /* default */].bytes(value, 1, metric.byteUnit);
            return prefix + value + suffix;
        };
    }
    else if (unit === 'bps') {
        tooltipFormatter = function (params) {
            let str = '';
            if (params.length > 0) {
                str += params[0].name + ' (' + statisticsMap[metric.statistics] + ')<br/>';
            }

            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(params, function (item, index) {
                str += truncate(item.seriesName, 22, '…') + '：';
                let value = item.value;
                let prefix;
                let valueStr = '';
                if (isNaN(value)) {
                    valueStr = '-';
                }
                else {
                    prefix = value < 0 ? '-' : '';
                    value = Math.abs(value);

                    value = __WEBPACK_IMPORTED_MODULE_5__formatter__["a" /* default */].bits(value, 2, metric.bitUnit).toUpperCase();
                    valueStr = prefix + value + unit;
                }
                str += valueStr + '<br/>';
            });
            return str;
        };

        yAxisFormatter = function (value) {
            let prefix = value < 0 ? '-' : '';
            value = Math.abs(value);
            // 保留1位小数的话
            // 当纵坐标是0 0.125 0.15 0.175 0.2的时候
            // 就会出现三个0.1
            value = __WEBPACK_IMPORTED_MODULE_5__formatter__["a" /* default */].bits(value, 2, metric.bitUnit).toUpperCase();
            return prefix + value;
        };
    }
    else if (unit === Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('百分比')) {
        tooltipFormatter = function (params) {
            let str = '';
            if (params.length > 0) {
                str += params[0].name + ' (' + statisticsMap[metric.statistics] + ')<br/>';
            }

            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(params, function (item, index) {
                str += truncate(item.seriesName, 22, '…')
                    + '：' + item.value + (item.value === '-' ? '' : '%') + '<br/>';
            });
            return str;
        };
        yAxisFormatter = '{value}%';
        yAxisMax = 100;
    }
    else {
        tooltipFormatter = function (params) {
            let str = '';
            if (params.length > 0) {
                str = params[0].name + ' (' + statisticsMap[metric.statistics] + ')<br/>';
            }

            __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(params, function (item) {
                str += truncate(item.seriesName, 22, '…') + '：';
                let value = item.value;
                let valueStr = '';
                if (isNaN(value)) {
                    valueStr = '-';
                }
                else {
                    valueStr = item.value;
                }
                str += valueStr + '<br/>';
            });
            return str;
        };

        yAxisFormatter = function (value) {
            return __WEBPACK_IMPORTED_MODULE_5__formatter__["a" /* default */].number(value, 0);
        };
    }

    let opts = {
        legend: {
            data: legend,
            x: 'center',
            padding: 2,
            itemGap: 2
        },
        tooltip: {
            trigger: 'axis',
            formatter: tooltipFormatter,
            textStyle: {
                fontSize: 12
            }
        },
        dataZoom: {
            start: zoomStart,
            show: true,
            height: 20,
            filterColor: 'rgba(74,170,255, 0.3)'
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: opt.type === 'bar',
                data: category,
                splitLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: unit || '',
                max: yAxisMax,
                splitNumber: spliteNumber,
                axisLabel: {
                    formatter: yAxisFormatter
                },
                splitLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                }
            }
        ],
        series: seriesData
    };
    let forceOpt = opt.chartOptions || {};
    deepExtend(opts, forceOpt);
    return mergeChartOptions(opts);
}

function getPieChartOptions(config) {
    let options = {
        tooltip: {
            trigger: 'item',
            formatter: '{b} <br/> {c} ({d}%)'
        },
        color: [
            '#4aaaff', '#f2605d', '#F6D622',
            '#6EC50F', '#FE863D', '#B569D4',
            '#A45BFF', '#01B09B', '#E74684', '#0AC1D7'
        ],
        legend: {
            orient: 'vertical',
            x: 'right',
            y: 'center',
            data: config.legend
        },
        series: [
            {
                type: 'pie',
                radius: '65%',
                center: ['30%', '50%'],
                minAngle: 1,
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                data: config.series
            }
        ]
    };
    return options;
}

/**
 * 深度扩展
 *
 * @param {Object} src 目标对象
 * @param {Object} opt 扩充对象
 */
function deepExtend(src, opt) {
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(opt, function (item, key) {
        if (__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isArray(item)) {
            deepExtend(src[key] = src[key] || [], item);
        }
        else if (__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.isObject(item)) {
            deepExtend(src[key] = src[key] || {}, item);
        }
        else {
            src[key] = item;
        }
    });
}

/**
 * 判断给定的数据点是否为空（空即表示没有数据）
 *
 * @param {Array} series 数据点
 * @return {boolean}
 */
function isSeriesEmpty(series) {
    let empty = true;
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(series, function (item, i) {
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(item.data, function (value) {
            if (typeof value !== 'undefined') {
                empty = false;
                return false;
            }

        });
        return empty;
    });
    return empty;
}

/**
 * 转换数据为按图分组
 *
 * @param {Array} metrics 监控项列表
 * @return {Object}
 */
function adjustToChartMetric(metrics) {
    let chartMetric = {};
    let defaultStatistics = 'average';
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(metrics, function (item, key) {
        chartMetric[key] = {
            metrics: [],
            unit: item.unit,
            names: {},
            nullPointMode: item.nullPointMode || null, // 可选值： 0， null(显示为 '-')
            statistics: item.statistics || defaultStatistics
        };
        item.chartType && (chartMetric[key].type = item.chartType);
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(item.metrics, function (metric, i) {
            let value = metric.value;
            chartMetric[key].metrics.push(value);
            chartMetric[key].names[value] = metric.name;
        });

    });
    return chartMetric;
}

/**
 * 数据转换，只获取data中属性为key的数值
 *
 * @param {Object} result 目标对象
 * @param {string} key 过滤值
 * @return {*}
 */
function adjustSeriesData(result, key) {
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(result.series, function (item) {
        item.data = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.map(item.data, key);
    });
    return result;
}

/**
 * 翻译事件状态变化
 *
 * @param {string} eventType 事件类型
 * @param {string} eventData 事件对象
 * @return {string}
 */
function transferAlarmEventType(eventType, eventData) {
    let EVENT_TYPE = {
        ConfigurationUpdate: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('配置变更'),
        StateUpdate: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('状态变化'),
        Action: Object(__WEBPACK_IMPORTED_MODULE_2_inf_i18n__["a" /* default */])('触发报警')
    };
    let type = EVENT_TYPE[eventType] || eventType;
    let ico = '';
    if (eventData) {
        let data = {};
        try {
            data = new Function('return ' + eventData)();
        }
        catch (e) {}

        switch (data.curAlarmStatus) {
            case 'NORMAL':
                ico = 'normal';
                break;
            case 'ABNORMAL':
                ico = 'abnormal';
                break;
            case 'INSUFFICIENT_DATA':
                ico = 'insufficient';
                break;
        }
    }

    return '<span class="alarmStateUpdate"><span class="' + ico + '">' + type + '</span></span>';
}

/**
 * 过滤metrics配置
 *
 * @param {Array} metrics 监控项列表
 * @param {string} filterName 过滤字段名
 * @param {string} value 过滤字段值
 */
function filterMetrics(metrics, filterName, value) {
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(metrics, function (item, k) {
        if (item.filter === filterName) {
            for (let i = item.metrics.length - 1; i >= 0; i--) {
                if (item.metrics[i].filter === filterName && item.metrics[i].filterValue !== value) {
                    item.metrics.splice(i, 1);
                }

            }
            if (item.metrics.length === 0) {
                delete metrics[k];
            }
        }

    });
}

/**
 * 判断一个趋势图是否为空
 *
 * @param {Array} series 数据点
 * @param {string} statistics 统计类型
 * @return {boolean}
 */
function isMonitorTrendEmpty(series, statistics) {
    let empty = true;
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(series, function (item, i) {
        let itemData = [];
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(item.data, function (v, k) {
            let value = v[statistics];
            if (typeof value !== 'undefined') {
                itemData.push(value);
            }

        });
        if (itemData.length > 0) {
            empty = false;
        }

    });
    return empty;
}

/**
  * 解析metric
  *  格式: 指标名称(中文名称)，多个之间用逗号分割
  *  如：CPUUsagePercent(CPU使用率),DiskUsageCount(磁盘使用量)
  *
  * @param {string} str 目标字符串
  * @return {Array} 指标对象数组
  */
function parseMetrics(str) {
    let reg = /([^\(]+)(?:\((.+)\))*/;
    let ret = [];
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(str.split(','), function (item) {
        if (item) {
            let tmp = item.match(reg);
            ret.push({
                name: tmp[2] || tmp[1],
                value: tmp[1]
            });
        }

    });
    return ret;
}

/**
 * 解析Dimension
 *  格式: 维度key1:维度值1|维度值2;维度key2:维度值3
 *  如：TaskId:1;Idc:jx|nj
 *
 * @param {string} str 目标字符串
 * @return {Array} 维度列表 ["TaskId:1;Idc:jx", "TaskId:1;Idc:nj"]
 */
function parseDimensions(str) {
    let darr = [];
    let arr = str.split(';');
    function xc(src, dist) {
        let ret = [];
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(dist.value, function (item) {
            if (src.length === 0) {
                ret.push([dist.key + ':' + item]);
            }
            else {
                __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(src, function (it) {
                    let tmp = [];
                    [].push.apply(tmp, it);
                    tmp.push(dist.key + ':' + item);
                    ret.push(tmp);
                });
            }
        });
        return ret;
    }
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(arr, function (item) {
        if (item) {
            let it = item.split(':');
            if (it[1]) {
                let key = it[0];
                let value = it[1].split('|');
                darr.push({
                    key: key,
                    value: value
                });
            }
        }

    });
    let src = [];
    __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.each(darr, function (item) {
        src = xc(src, item);
    });
    src = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.map(src, function (item) {
        return item.join(';');
    });
    return src;
}

/* eslint-disable */
/* harmony default export */ __webpack_exports__["a"] = ({
    utc2local: utc2local,
    local2utc: local2utc,
    getUTCTimeRange: getUTCTimeRange,
    getChartOptions: getChartOptions,
    getPieChartOptions: getPieChartOptions,
    isSeriesEmpty: isSeriesEmpty,
    adjustToChartMetric: adjustToChartMetric,
    adjustSeriesData: adjustSeriesData,
    formatBytes: __WEBPACK_IMPORTED_MODULE_5__formatter__["a" /* default */].bytes,
    transferAlarmEventType: transferAlarmEventType,
    filterMetrics: filterMetrics,
    parseMetrics: parseMetrics,
    parseDimensions: parseDimensions,
    isMonitorTrendEmpty: isMonitorTrendEmpty
});


/***/ }),

/***/ 408:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_408__;

/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inf_i18n__ = __webpack_require__(14);
/**
 * @file inf-ria/utils/formatter.es6
 * @author leeight
 */



const kByteUnit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];
const kBitUnit = ['', 'k', 'm', 'g', 't', 'p', 'e', 'z', 'y', 'b'];

/* harmony default export */ __webpack_exports__["a"] = ({
    percent(value) {
        return value + '%';
    },
    bytes(value, number = 2, byteUnit = 1024) {
        let idx = 0;
        let len = kByteUnit.length - 1;
        while (value >= byteUnit && idx < len) {
            value = value / byteUnit;
            idx++;
        }
        return value.toFixed(number) + kByteUnit[idx];
    },
    bits(value, number = 2, bitUnit = 1024) {
        let idx = 0;
        let len = kBitUnit.length - 1;
        while (value >= bitUnit && idx < len) {
            value = value / bitUnit;
            idx++;
        }
        return value.toFixed(number) + kBitUnit[idx];
    },
    number(value, number = 1) {
        if (value < 10000) {
            return value;
        }
        // 15000、20000，当number为0的时候，都是2万
        // 所以需要判断一下value是否能整除，不能整除的至少保留一位小数
        else if (value < 1000000) {
            return (value / 10000).toFixed((value % 10000) === 0 ? number : Math.max(1, number)) + Object(__WEBPACK_IMPORTED_MODULE_0_inf_i18n__["a" /* default */])('万');
        }
        else if (value < 10000000) {
            return (value / 1000000).toFixed((value % 1000000) === 0 ? number : Math.max(1, number)) + Object(__WEBPACK_IMPORTED_MODULE_0_inf_i18n__["a" /* default */])('百万');
        }

        return (value / 10000000.0).toFixed((value % 10000000) === 0 ? number : Math.max(1, number)) + Object(__WEBPACK_IMPORTED_MODULE_0_inf_i18n__["a" /* default */])('千万');
    }
});


/***/ }),

/***/ 410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = $post;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/**
 * @file mixins/ajax.es6
 * @author leeight
 */



function $post(url, data, options) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(url, data, options);
}



/***/ }),

/***/ 411:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(412);

/***/ }),

/***/ 412:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(13);
var bind = __webpack_require__(245);
var Axios = __webpack_require__(414);
var defaults = __webpack_require__(75);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(249);
axios.CancelToken = __webpack_require__(428);
axios.isCancel = __webpack_require__(248);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(429);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ 413:
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ 414:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(75);
var utils = __webpack_require__(13);
var InterceptorManager = __webpack_require__(423);
var dispatchRequest = __webpack_require__(424);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ 415:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(13);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ 416:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(247);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ 417:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(13);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ 419:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(13);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ 420:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(13);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ 421:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ 422:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(13);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ 423:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(13);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ 424:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(13);
var transformData = __webpack_require__(425);
var isCancel = __webpack_require__(248);
var defaults = __webpack_require__(75);
var isAbsoluteURL = __webpack_require__(426);
var combineURLs = __webpack_require__(427);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ 425:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(13);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ 427:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ 428:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(249);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ 429:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @file examples/bcmData.es6
 * @author leeight
 */

/* eslint-disable */

const Data1 = {
    "category": [
        "2014-05-26T07:10:00Z",
        "2014-05-26T07:11:00Z",
        "2014-05-26T07:12:00Z",
        "2014-05-26T07:13:00Z",
        "2014-05-26T07:14:00Z",
        "2014-05-26T07:15:00Z",
        "2014-05-26T07:16:00Z",
        "2014-05-26T07:17:00Z",
        "2014-05-26T07:18:00Z",
        "2014-05-26T07:19:00Z",
        "2014-05-26T07:20:00Z",
        "2014-05-26T07:21:00Z",
        "2014-05-26T07:22:00Z",
        "2014-05-26T07:23:00Z",
        "2014-05-26T07:24:00Z",
        "2014-05-26T07:25:00Z",
        "2014-05-26T07:26:00Z",
        "2014-05-26T07:27:00Z",
        "2014-05-26T07:28:00Z",
        "2014-05-26T07:29:00Z",
        "2014-05-26T07:30:00Z",
        "2014-05-26T07:31:00Z",
        "2014-05-26T07:32:00Z",
        "2014-05-26T07:33:00Z",
        "2014-05-26T07:34:00Z",
        "2014-05-26T07:35:00Z",
        "2014-05-26T07:36:00Z",
        "2014-05-26T07:37:00Z",
        "2014-05-26T07:38:00Z",
        "2014-05-26T07:39:00Z",
        "2014-05-26T07:40:00Z",
        "2014-05-26T07:41:00Z",
        "2014-05-26T07:42:00Z",
        "2014-05-26T07:43:00Z",
        "2014-05-26T07:44:00Z",
        "2014-05-26T07:45:00Z",
        "2014-05-26T07:46:00Z",
        "2014-05-26T07:47:00Z",
        "2014-05-26T07:48:00Z",
        "2014-05-26T07:49:00Z",
        "2014-05-26T07:50:00Z",
        "2014-05-26T07:51:00Z",
        "2014-05-26T07:52:00Z",
        "2014-05-26T07:53:00Z",
        "2014-05-26T07:54:00Z",
        "2014-05-26T07:55:00Z",
        "2014-05-26T07:56:00Z",
        "2014-05-26T07:57:00Z",
        "2014-05-26T07:58:00Z",
        "2014-05-26T07:59:00Z"
    ],
    "series": [
        {
            "name": "vCPUUsagePercent",
            "data": [
                {
                    "average": "41"
                }, {
                    "average": "18"
                }, {
                    "average": "27"
                }, {
                    "average": "24"
                }, {
                    "average": "44"
                }, {
                    "average": "23"
                }, {
                    "average": "26"
                }, {
                    "average": "26"
                }, {
                    "average": "29"
                }, {
                    "average": "40"
                }, {
                    "average": "43"
                }, {
                    "average": "26"
                }, {
                    "average": "36"
                }, {
                    "average": "25"
                }, {
                    "average": "29"
                }, {
                    "average": "28"
                }, {
                    "average": "23"
                }, {
                    "average": "23"
                }, {
                    "average": "20"
                }, {
                    "average": "19"
                }, {
                    "average": "45"
                }, {
                    "average": "23"
                }, {
                    "average": "21"
                }, {
                    "average": "17"
                }, {
                    "average": "20"
                }, {
                    "average": "40"
                }, {
                    "average": "32"
                }, {
                    "average": "30"
                }, {
                    "average": "29"
                }, {
                    "average": "28"
                }, {
                    "average": "24"
                }, {
                    "average": "37"
                }, {
                    "average": "36"
                }, {
                    "average": "42"
                }, {
                    "average": "43"
                }, {
                    "average": "37"
                }, {
                    "average": "41"
                }, {
                    "average": "19"
                }, {
                    "average": "33"
                }, {
                    "average": "43"
                }, {
                    "average": "18"
                }, {
                    "average": "35"
                }, {
                    "average": "41"
                }, {
                    "average": "34"
                }, {
                    "average": "37"
                }, {
                    "average": "38"
                }, {
                    "average": "29"
                }, {
                    "average": "37"
                }, {
                    "average": "42"
                }, {
                    "average": "29"
                }
            ]
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["a"] = Data1;


const Data2 = {
    "category": [
        "2014-05-26T07:10:00Z",
        "2014-05-26T07:11:00Z",
        "2014-05-26T07:12:00Z",
        "2014-05-26T07:13:00Z",
        "2014-05-26T07:14:00Z",
        "2014-05-26T07:15:00Z",
        "2014-05-26T07:16:00Z",
        "2014-05-26T07:17:00Z",
        "2014-05-26T07:18:00Z",
        "2014-05-26T07:19:00Z",
        "2014-05-26T07:20:00Z",
        "2014-05-26T07:21:00Z",
        "2014-05-26T07:22:00Z",
        "2014-05-26T07:23:00Z",
        "2014-05-26T07:24:00Z",
        "2014-05-26T07:25:00Z",
        "2014-05-26T07:26:00Z",
        "2014-05-26T07:27:00Z",
        "2014-05-26T07:28:00Z",
        "2014-05-26T07:29:00Z",
        "2014-05-26T07:30:00Z",
        "2014-05-26T07:31:00Z",
        "2014-05-26T07:32:00Z",
        "2014-05-26T07:33:00Z",
        "2014-05-26T07:34:00Z",
        "2014-05-26T07:35:00Z",
        "2014-05-26T07:36:00Z",
        "2014-05-26T07:37:00Z",
        "2014-05-26T07:38:00Z",
        "2014-05-26T07:39:00Z",
        "2014-05-26T07:40:00Z",
        "2014-05-26T07:41:00Z",
        "2014-05-26T07:42:00Z",
        "2014-05-26T07:43:00Z",
        "2014-05-26T07:44:00Z",
        "2014-05-26T07:45:00Z",
        "2014-05-26T07:46:00Z",
        "2014-05-26T07:47:00Z",
        "2014-05-26T07:48:00Z",
        "2014-05-26T07:49:00Z",
        "2014-05-26T07:50:00Z",
        "2014-05-26T07:51:00Z",
        "2014-05-26T07:52:00Z",
        "2014-05-26T07:53:00Z",
        "2014-05-26T07:54:00Z",
        "2014-05-26T07:55:00Z",
        "2014-05-26T07:56:00Z",
        "2014-05-26T07:57:00Z",
        "2014-05-26T07:58:00Z",
        "2014-05-26T07:59:00Z"
    ],
    "series": [
        {
            "name": "vDiskReadOpCountPerSecond",
            "data": [
                {
                    "average": "89"
                }, {
                    "average": "105"
                }, {
                    "average": "95"
                }, {
                    "average": "91"
                }, {
                    "average": "106"
                }, {
                    "average": "87"
                }, {
                    "average": "93"
                }, {
                    "average": "96"
                }, {
                    "average": "77"
                }, {
                    "average": "84"
                }, {
                    "average": "89"
                }, {
                    "average": "88"
                }, {
                    "average": "79"
                }, {
                    "average": "93"
                }, {
                    "average": "91"
                }, {
                    "average": "97"
                }, {
                    "average": "96"
                }, {
                    "average": "92"
                }, {
                    "average": "82"
                }, {
                    "average": "94"
                }, {
                    "average": "83"
                }, {
                    "average": "88"
                }, {
                    "average": "89"
                }, {
                    "average": "98"
                }, {
                    "average": "98"
                }, {
                    "average": "98"
                }, {
                    "average": "95"
                }, {
                    "average": "80"
                }, {
                    "average": "94"
                }, {
                    "average": "94"
                }, {
                    "average": "77"
                }, {
                    "average": "100"
                }, {
                    "average": "95"
                }, {
                    "average": "92"
                }, {
                    "average": "85"
                }, {
                    "average": "88"
                }, {
                    "average": "98"
                }, {
                    "average": "94"
                }, {
                    "average": "98"
                }, {
                    "average": "105"
                }, {
                    "average": "95"
                }, {
                    "average": "85"
                }, {
                    "average": "90"
                }, {
                    "average": "97"
                }, {
                    "average": "88"
                }, {
                    "average": "102"
                }, {
                    "average": "83"
                }, {
                    "average": "89"
                }, {
                    "average": "93"
                }, {
                    "average": "104"
                }
            ]
        }, {
            "name": "vDiskWriteOpCountPerSecond",
            "data": [
                {
                    "average": "37"
                }, {
                    "average": "57"
                }, {
                    "average": "49"
                }, {
                    "average": "31"
                }, {
                    "average": "33"
                }, {
                    "average": "29"
                }, {
                    "average": "43"
                }, {
                    "average": "37"
                }, {
                    "average": "33"
                }, {
                    "average": "54"
                }, {
                    "average": "49"
                }, {
                    "average": "31"
                }, {
                    "average": "46"
                }, {
                    "average": "43"
                }, {
                    "average": "36"
                }, {
                    "average": "58"
                }, {
                    "average": "35"
                }, {
                    "average": "29"
                }, {
                    "average": "55"
                }, {
                    "average": "51"
                }, {
                    "average": "55"
                }, {
                    "average": "44"
                }, {
                    "average": "38"
                }, {
                    "average": "33"
                }, {
                    "average": "55"
                }, {
                    "average": "29"
                }, {
                    "average": "38"
                }, {
                    "average": "58"
                }, {
                    "average": "51"
                }, {
                    "average": "38"
                }, {
                    "average": "38"
                }, {
                    "average": "46"
                }, {
                    "average": "31"
                }, {
                    "average": "47"
                }, {
                    "average": "35"
                }, {
                    "average": "54"
                }, {
                    "average": "49"
                }, {
                    "average": "40"
                }, {
                    "average": "39"
                }, {
                    "average": "34"
                }, {
                    "average": "39"
                }, {
                    "average": "34"
                }, {
                    "average": "51"
                }, {
                    "average": "50"
                }, {
                    "average": "44"
                }, {
                    "average": "47"
                }, {
                    "average": "47"
                }, {
                    "average": "52"
                }, {
                    "average": "31"
                }, {
                    "average": "29"
                }
            ]
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["b"] = Data2;


const Data3 = {
    "category": [
        "2014-05-26T07:10:00Z",
        "2014-05-26T07:11:00Z",
        "2014-05-26T07:12:00Z",
        "2014-05-26T07:13:00Z",
        "2014-05-26T07:14:00Z",
        "2014-05-26T07:15:00Z",
        "2014-05-26T07:16:00Z",
        "2014-05-26T07:17:00Z",
        "2014-05-26T07:18:00Z",
        "2014-05-26T07:19:00Z",
        "2014-05-26T07:20:00Z",
        "2014-05-26T07:21:00Z",
        "2014-05-26T07:22:00Z",
        "2014-05-26T07:23:00Z",
        "2014-05-26T07:24:00Z",
        "2014-05-26T07:25:00Z",
        "2014-05-26T07:26:00Z",
        "2014-05-26T07:27:00Z",
        "2014-05-26T07:28:00Z",
        "2014-05-26T07:29:00Z",
        "2014-05-26T07:30:00Z",
        "2014-05-26T07:31:00Z",
        "2014-05-26T07:32:00Z",
        "2014-05-26T07:33:00Z",
        "2014-05-26T07:34:00Z",
        "2014-05-26T07:35:00Z",
        "2014-05-26T07:36:00Z",
        "2014-05-26T07:37:00Z",
        "2014-05-26T07:38:00Z",
        "2014-05-26T07:39:00Z",
        "2014-05-26T07:40:00Z",
        "2014-05-26T07:41:00Z",
        "2014-05-26T07:42:00Z",
        "2014-05-26T07:43:00Z",
        "2014-05-26T07:44:00Z",
        "2014-05-26T07:45:00Z",
        "2014-05-26T07:46:00Z",
        "2014-05-26T07:47:00Z",
        "2014-05-26T07:48:00Z",
        "2014-05-26T07:49:00Z",
        "2014-05-26T07:50:00Z",
        "2014-05-26T07:51:00Z",
        "2014-05-26T07:52:00Z",
        "2014-05-26T07:53:00Z",
        "2014-05-26T07:54:00Z",
        "2014-05-26T07:55:00Z",
        "2014-05-26T07:56:00Z",
        "2014-05-26T07:57:00Z",
        "2014-05-26T07:58:00Z",
        "2014-05-26T07:59:00Z"
    ],
    "series": [
        {
            "name": "vDiskReadBytesPerSecond",
            "data": [
                {
                    "average": "56"
                }, {
                    "average": "45"
                }, {
                    "average": "52"
                }, {
                    "average": "67"
                }, {
                    "average": "49"
                }, {
                    "average": "67"
                }, {
                    "average": "41"
                }, {
                    "average": "49"
                }, {
                    "average": "52"
                }, {
                    "average": "45"
                }, {
                    "average": "53"
                }, {
                    "average": "48"
                }, {
                    "average": "52"
                }, {
                    "average": "67"
                }, {
                    "average": "49"
                }, {
                    "average": "68"
                }, {
                    "average": "44"
                }, {
                    "average": "59"
                }, {
                    "average": "50"
                }, {
                    "average": "61"
                }, {
                    "average": "55"
                }, {
                    "average": "66"
                }, {
                    "average": "66"
                }, {
                    "average": "59"
                }, {
                    "average": "63"
                }, {
                    "average": "49"
                }, {
                    "average": "66"
                }, {
                    "average": "60"
                }, {
                    "average": "53"
                }, {
                    "average": "65"
                }, {
                    "average": "52"
                }, {
                    "average": "55"
                }, {
                    "average": "46"
                }, {
                    "average": "57"
                }, {
                    "average": "65"
                }, {
                    "average": "51"
                }, {
                    "average": "70"
                }, {
                    "average": "51"
                }, {
                    "average": "59"
                }, {
                    "average": "56"
                }, {
                    "average": "61"
                }, {
                    "average": "42"
                }, {
                    "average": "47"
                }, {
                    "average": "67"
                }, {
                    "average": "53"
                }, {
                    "average": "69"
                }, {
                    "average": "54"
                }, {
                    "average": "53"
                }, {
                    "average": "63"
                }, {
                    "average": "52"
                }
            ]
        }, {
            "name": "vDiskWriteBytesPerSecond",
            "data": [
                {
                    "average": "88"
                }, {
                    "average": "101"
                }, {
                    "average": "89"
                }, {
                    "average": "85"
                }, {
                    "average": "99"
                }, {
                    "average": "93"
                }, {
                    "average": "109"
                }, {
                    "average": "94"
                }, {
                    "average": "97"
                }, {
                    "average": "111"
                }, {
                    "average": "104"
                }, {
                    "average": "97"
                }, {
                    "average": "95"
                }, {
                    "average": "112"
                }, {
                    "average": "103"
                }, {
                    "average": "103"
                }, {
                    "average": "105"
                }, {
                    "average": "109"
                }, {
                    "average": "93"
                }, {
                    "average": "97"
                }, {
                    "average": "94"
                }, {
                    "average": "92"
                }, {
                    "average": "107"
                }, {
                    "average": "113"
                }, {
                    "average": "99"
                }, {
                    "average": "84"
                }, {
                    "average": "93"
                }, {
                    "average": "85"
                }, {
                    "average": "87"
                }, {
                    "average": "108"
                }, {
                    "average": "89"
                }, {
                    "average": "89"
                }, {
                    "average": "101"
                }, {
                    "average": "103"
                }, {
                    "average": "111"
                }, {
                    "average": "90"
                }, {
                    "average": "93"
                }, {
                    "average": "110"
                }, {
                    "average": "88"
                }, {
                    "average": "111"
                }, {
                    "average": "90"
                }, {
                    "average": "112"
                }, {
                    "average": "109"
                }, {
                    "average": "105"
                }, {
                    "average": "103"
                }, {
                    "average": "91"
                }, {
                    "average": "87"
                }, {
                    "average": "94"
                }, {
                    "average": "110"
                }, {
                    "average": "93"
                }
            ]
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["c"] = Data3;


const Data4 = {
    "category": [
        "2014-05-26T07:10:00Z",
        "2014-05-26T07:11:00Z",
        "2014-05-26T07:12:00Z",
        "2014-05-26T07:13:00Z",
        "2014-05-26T07:14:00Z",
        "2014-05-26T07:15:00Z",
        "2014-05-26T07:16:00Z",
        "2014-05-26T07:17:00Z",
        "2014-05-26T07:18:00Z",
        "2014-05-26T07:19:00Z",
        "2014-05-26T07:20:00Z",
        "2014-05-26T07:21:00Z",
        "2014-05-26T07:22:00Z",
        "2014-05-26T07:23:00Z",
        "2014-05-26T07:24:00Z",
        "2014-05-26T07:25:00Z",
        "2014-05-26T07:26:00Z",
        "2014-05-26T07:27:00Z",
        "2014-05-26T07:28:00Z",
        "2014-05-26T07:29:00Z",
        "2014-05-26T07:30:00Z",
        "2014-05-26T07:31:00Z",
        "2014-05-26T07:32:00Z",
        "2014-05-26T07:33:00Z",
        "2014-05-26T07:34:00Z",
        "2014-05-26T07:35:00Z",
        "2014-05-26T07:36:00Z",
        "2014-05-26T07:37:00Z",
        "2014-05-26T07:38:00Z",
        "2014-05-26T07:39:00Z",
        "2014-05-26T07:40:00Z",
        "2014-05-26T07:41:00Z",
        "2014-05-26T07:42:00Z",
        "2014-05-26T07:43:00Z",
        "2014-05-26T07:44:00Z",
        "2014-05-26T07:45:00Z",
        "2014-05-26T07:46:00Z",
        "2014-05-26T07:47:00Z",
        "2014-05-26T07:48:00Z",
        "2014-05-26T07:49:00Z",
        "2014-05-26T07:50:00Z",
        "2014-05-26T07:51:00Z",
        "2014-05-26T07:52:00Z",
        "2014-05-26T07:53:00Z",
        "2014-05-26T07:54:00Z",
        "2014-05-26T07:55:00Z",
        "2014-05-26T07:56:00Z",
        "2014-05-26T07:57:00Z",
        "2014-05-26T07:58:00Z",
        "2014-05-26T07:59:00Z"
    ],
    "series": [
        {
            "name": "vNicInBytes",
            "data": [
                {
                    "average": "89"
                }, {
                    "average": "99"
                }, {
                    "average": "97"
                }, {
                    "average": "105"
                }, {
                    "average": "96"
                }, {
                    "average": "81"
                }, {
                    "average": "78"
                }, {
                    "average": "85"
                }, {
                    "average": "94"
                }, {
                    "average": "98"
                }, {
                    "average": "80"
                }, {
                    "average": "77"
                }, {
                    "average": "95"
                }, {
                    "average": "79"
                }, {
                    "average": "83"
                }, {
                    "average": "88"
                }, {
                    "average": "100"
                }, {
                    "average": "97"
                }, {
                    "average": "88"
                }, {
                    "average": "102"
                }, {
                    "average": "103"
                }, {
                    "average": "81"
                }, {
                    "average": "106"
                }, {
                    "average": "81"
                }, {
                    "average": "81"
                }, {
                    "average": "100"
                }, {
                    "average": "81"
                }, {
                    "average": "94"
                }, {
                    "average": "80"
                }, {
                    "average": "101"
                }, {
                    "average": "88"
                }, {
                    "average": "86"
                }, {
                    "average": "78"
                }, {
                    "average": "89"
                }, {
                    "average": "84"
                }, {
                    "average": "87"
                }, {
                    "average": "98"
                }, {
                    "average": "99"
                }, {
                    "average": "96"
                }, {
                    "average": "103"
                }, {
                    "average": "104"
                }, {
                    "average": "88"
                }, {
                    "average": "83"
                }, {
                    "average": "79"
                }, {
                    "average": "104"
                }, {
                    "average": "100"
                }, {
                    "average": "81"
                }, {
                    "average": "94"
                }, {
                    "average": "85"
                }, {
                    "average": "85"
                }
            ]
        }, {
            "name": "vNicOutBytes",
            "data": [
                {
                    "average": "84"
                }, {
                    "average": "93"
                }, {
                    "average": "76"
                }, {
                    "average": "90"
                }, {
                    "average": "99"
                }, {
                    "average": "100"
                }, {
                    "average": "98"
                }, {
                    "average": "102"
                }, {
                    "average": "87"
                }, {
                    "average": "83"
                }, {
                    "average": "88"
                }, {
                    "average": "102"
                }, {
                    "average": "74"
                }, {
                    "average": "86"
                }, {
                    "average": "97"
                }, {
                    "average": "101"
                }, {
                    "average": "96"
                }, {
                    "average": "75"
                }, {
                    "average": "76"
                }, {
                    "average": "83"
                }, {
                    "average": "75"
                }, {
                    "average": "91"
                }, {
                    "average": "92"
                }, {
                    "average": "81"
                }, {
                    "average": "86"
                }, {
                    "average": "90"
                }, {
                    "average": "89"
                }, {
                    "average": "76"
                }, {
                    "average": "92"
                }, {
                    "average": "102"
                }, {
                    "average": "91"
                }, {
                    "average": "89"
                }, {
                    "average": "76"
                }, {
                    "average": "91"
                }, {
                    "average": "96"
                }, {
                    "average": "88"
                }, {
                    "average": "87"
                }, {
                    "average": "88"
                }, {
                    "average": "90"
                }, {
                    "average": "96"
                }, {
                    "average": "80"
                }, {
                    "average": "92"
                }, {
                    "average": "89"
                }, {
                    "average": "80"
                }, {
                    "average": "75"
                }, {
                    "average": "81"
                }, {
                    "average": "93"
                }, {
                    "average": "97"
                }, {
                    "average": "94"
                }, {
                    "average": "95"
                }
            ]
        }, {
            "name": "WebInBytes",
            "data": [
                {
                    "average": "6"
                }, {
                    "average": "2"
                }, {
                    "average": "3"
                }, {
                    "average": "24"
                }, {
                    "average": "12"
                }, {
                    "average": "21"
                }, {
                    "average": "4"
                }, {
                    "average": "17"
                }, {
                    "average": "22"
                }, {
                    "average": "27"
                }, {
                    "average": "1"
                }, {
                    "average": "26"
                }, {
                    "average": "11"
                }, {
                    "average": "16"
                }, {
                    "average": "12"
                }, {
                    "average": "22"
                }, {
                    "average": "12"
                }, {
                    "average": "30"
                }, {
                    "average": "14"
                }, {
                    "average": "26"
                }, {
                    "average": "29"
                }, {
                    "average": "29"
                }, {
                    "average": "20"
                }, {
                    "average": "24"
                }, {
                    "average": "14"
                }, {
                    "average": "6"
                }, {
                    "average": "19"
                }, {
                    "average": "29"
                }, {
                    "average": "30"
                }, {
                    "average": "27"
                }, {
                    "average": "20"
                }, {
                    "average": "24"
                }, {
                    "average": "19"
                }, {
                    "average": "23"
                }, {
                    "average": "4"
                }, {
                    "average": "30"
                }, {
                    "average": "7"
                }, {
                    "average": "7"
                }, {
                    "average": "22"
                }, {
                    "average": "22"
                }, {
                    "average": "22"
                }, {
                    "average": "28"
                }, {
                    "average": "17"
                }, {
                    "average": "24"
                }, {
                    "average": "3"
                }, {
                    "average": "20"
                }, {
                    "average": "3"
                }, {
                    "average": "4"
                }, {
                    "average": "20"
                }, {
                    "average": "28"
                }
            ]
        }, {
            "name": "WebOutBytes",
            "data": [
                {
                    "average": "25"
                }, {
                    "average": "39"
                }, {
                    "average": "39"
                }, {
                    "average": "24"
                }, {
                    "average": "24"
                }, {
                    "average": "27"
                }, {
                    "average": "28"
                }, {
                    "average": "24"
                }, {
                    "average": "21"
                }, {
                    "average": "23"
                }, {
                    "average": "33"
                }, {
                    "average": "32"
                }, {
                    "average": "24"
                }, {
                    "average": "14"
                }, {
                    "average": "37"
                }, {
                    "average": "23"
                }, {
                    "average": "36"
                }, {
                    "average": "16"
                }, {
                    "average": "34"
                }, {
                    "average": "28"
                }, {
                    "average": "34"
                }, {
                    "average": "42"
                }, {
                    "average": "18"
                }, {
                    "average": "24"
                }, {
                    "average": "26"
                }, {
                    "average": "23"
                }, {
                    "average": "37"
                }, {
                    "average": "33"
                }, {
                    "average": "32"
                }, {
                    "average": "35"
                }, {
                    "average": "18"
                }, {
                    "average": "33"
                }, {
                    "average": "38"
                }, {
                    "average": "33"
                }, {
                    "average": "40"
                }, {
                    "average": "19"
                }, {
                    "average": "21"
                }, {
                    "average": "27"
                }, {
                    "average": "42"
                }, {
                    "average": "31"
                }, {
                    "average": "24"
                }, {
                    "average": "19"
                }, {
                    "average": "35"
                }, {
                    "average": "17"
                }, {
                    "average": "42"
                }, {
                    "average": "27"
                }, {
                    "average": "21"
                }, {
                    "average": "34"
                }, {
                    "average": "28"
                }, {
                    "average": "15"
                }
            ]
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["d"] = Data4;


const Data5 = {
    "category": [
        "2014-05-26T07:10:00Z",
        "2014-05-26T07:11:00Z",
        "2014-05-26T07:12:00Z",
        "2014-05-26T07:13:00Z",
        "2014-05-26T07:14:00Z",
        "2014-05-26T07:15:00Z",
        "2014-05-26T07:16:00Z",
        "2014-05-26T07:17:00Z",
        "2014-05-26T07:18:00Z",
        "2014-05-26T07:19:00Z",
        "2014-05-26T07:20:00Z",
        "2014-05-26T07:21:00Z",
        "2014-05-26T07:22:00Z",
        "2014-05-26T07:23:00Z",
        "2014-05-26T07:24:00Z",
        "2014-05-26T07:25:00Z",
        "2014-05-26T07:26:00Z",
        "2014-05-26T07:27:00Z",
        "2014-05-26T07:28:00Z",
        "2014-05-26T07:29:00Z",
        "2014-05-26T07:30:00Z",
        "2014-05-26T07:31:00Z",
        "2014-05-26T07:32:00Z",
        "2014-05-26T07:33:00Z",
        "2014-05-26T07:34:00Z",
        "2014-05-26T07:35:00Z",
        "2014-05-26T07:36:00Z",
        "2014-05-26T07:37:00Z",
        "2014-05-26T07:38:00Z",
        "2014-05-26T07:39:00Z",
        "2014-05-26T07:40:00Z",
        "2014-05-26T07:41:00Z",
        "2014-05-26T07:42:00Z",
        "2014-05-26T07:43:00Z",
        "2014-05-26T07:44:00Z",
        "2014-05-26T07:45:00Z",
        "2014-05-26T07:46:00Z",
        "2014-05-26T07:47:00Z",
        "2014-05-26T07:48:00Z",
        "2014-05-26T07:49:00Z",
        "2014-05-26T07:50:00Z",
        "2014-05-26T07:51:00Z",
        "2014-05-26T07:52:00Z",
        "2014-05-26T07:53:00Z",
        "2014-05-26T07:54:00Z",
        "2014-05-26T07:55:00Z",
        "2014-05-26T07:56:00Z",
        "2014-05-26T07:57:00Z",
        "2014-05-26T07:58:00Z",
        "2014-05-26T07:59:00Z"
    ],
    "series": [
        {
            "name": "WebOutBitsPerSecond",
            "data": [
                {
                    "average": "77"
                }, {
                    "average": "80"
                }, {
                    "average": "84"
                }, {
                    "average": "67"
                }, {
                    "average": "73"
                }, {
                    "average": "81"
                }, {
                    "average": "70"
                }, {
                    "average": "63"
                }, {
                    "average": "67"
                }, {
                    "average": "67"
                }, {
                    "average": "65"
                }, {
                    "average": "69"
                }, {
                    "average": "63"
                }, {
                    "average": "65"
                }, {
                    "average": "72"
                }, {
                    "average": "89"
                }, {
                    "average": "78"
                }, {
                    "average": "78"
                }, {
                    "average": "63"
                }, {
                    "average": "69"
                }, {
                    "average": "76"
                }, {
                    "average": "88"
                }, {
                    "average": "82"
                }, {
                    "average": "86"
                }, {
                    "average": "84"
                }, {
                    "average": "78"
                }, {
                    "average": "65"
                }, {
                    "average": "70"
                }, {
                    "average": "74"
                }, {
                    "average": "60"
                }, {
                    "average": "78"
                }, {
                    "average": "70"
                }, {
                    "average": "63"
                }, {
                    "average": "80"
                }, {
                    "average": "68"
                }, {
                    "average": "66"
                }, {
                    "average": "65"
                }, {
                    "average": "78"
                }, {
                    "average": "87"
                }, {
                    "average": "65"
                }, {
                    "average": "75"
                }, {
                    "average": "71"
                }, {
                    "average": "68"
                }, {
                    "average": "65"
                }, {
                    "average": "82"
                }, {
                    "average": "60"
                }, {
                    "average": "75"
                }, {
                    "average": "72"
                }, {
                    "average": "75"
                }, {
                    "average": "87"
                }
            ]
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["e"] = Data5;


const Data6 = {
    "category": [],
    "series": [
        {
            "name": "MemUsedBytes",
            "data": []
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["f"] = Data6;


const Data7 = {
    "category": [
        "2014-05-26T07:10:00Z",
        "2014-05-26T07:11:00Z",
        "2014-05-26T07:12:00Z",
        "2014-05-26T07:13:00Z",
        "2014-05-26T07:14:00Z",
        "2014-05-26T07:15:00Z",
        "2014-05-26T07:16:00Z",
        "2014-05-26T07:17:00Z",
        "2014-05-26T07:18:00Z",
        "2014-05-26T07:19:00Z",
        "2014-05-26T07:20:00Z",
        "2014-05-26T07:21:00Z",
        "2014-05-26T07:22:00Z",
        "2014-05-26T07:23:00Z",
        "2014-05-26T07:24:00Z",
        "2014-05-26T07:25:00Z",
        "2014-05-26T07:26:00Z",
        "2014-05-26T07:27:00Z",
        "2014-05-26T07:28:00Z",
        "2014-05-26T07:29:00Z",
        "2014-05-26T07:30:00Z",
        "2014-05-26T07:31:00Z",
        "2014-05-26T07:32:00Z",
        "2014-05-26T07:33:00Z",
        "2014-05-26T07:34:00Z",
        "2014-05-26T07:35:00Z",
        "2014-05-26T07:36:00Z",
        "2014-05-26T07:37:00Z",
        "2014-05-26T07:38:00Z",
        "2014-05-26T07:39:00Z",
        "2014-05-26T07:40:00Z",
        "2014-05-26T07:41:00Z",
        "2014-05-26T07:42:00Z",
        "2014-05-26T07:43:00Z",
        "2014-05-26T07:44:00Z",
        "2014-05-26T07:45:00Z",
        "2014-05-26T07:46:00Z",
        "2014-05-26T07:47:00Z",
        "2014-05-26T07:48:00Z",
        "2014-05-26T07:49:00Z",
        "2014-05-26T07:50:00Z",
        "2014-05-26T07:51:00Z",
        "2014-05-26T07:52:00Z",
        "2014-05-26T07:53:00Z",
        "2014-05-26T07:54:00Z",
        "2014-05-26T07:55:00Z",
        "2014-05-26T07:56:00Z",
        "2014-05-26T07:57:00Z",
        "2014-05-26T07:58:00Z",
        "2014-05-26T07:59:00Z"
    ],
    "series": [
        {
            "name": "MemUsedPercent",
            "data": [
                {
                    "average": "106"
                }, {
                    "average": "123"
                }, {
                    "average": "96"
                }, {
                    "average": "99"
                }, {
                    "average": "102"
                }, {
                    "average": "98"
                }, {
                    "average": "103"
                }, {
                    "average": "120"
                }, {
                    "average": "100"
                }, {
                    "average": "114"
                }, {
                    "average": "114"
                }, {
                    "average": "122"
                }, {
                    "average": "113"
                }, {
                    "average": "114"
                }, {
                    "average": "102"
                }, {
                    "average": "107"
                }, {
                    "average": "119"
                }, {
                    "average": "99"
                }, {
                    "average": "94"
                }, {
                    "average": "107"
                }, {
                    "average": "122"
                }, {
                    "average": "101"
                }, {
                    "average": "101"
                }, {
                    "average": "105"
                }, {
                    "average": "115"
                }, {
                    "average": "93"
                }, {
                    "average": "104"
                }, {
                    "average": "120"
                }, {
                    "average": "99"
                }, {
                    "average": "103"
                }, {
                    "average": "121"
                }, {
                    "average": "97"
                }, {
                    "average": "123"
                }, {
                    "average": "107"
                }, {
                    "average": "123"
                }, {
                    "average": "94"
                }, {
                    "average": "106"
                }, {
                    "average": "106"
                }, {
                    "average": "104"
                }, {
                    "average": "103"
                }, {
                    "average": "98"
                }, {
                    "average": "110"
                }, {
                    "average": "107"
                }, {
                    "average": "113"
                }, {
                    "average": "121"
                }, {
                    "average": "98"
                }, {
                    "average": "105"
                }, {
                    "average": "103"
                }, {
                    "average": "103"
                }, {
                    "average": "98"
                }
            ]
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["g"] = Data7;


const Data8 = {
    "category": [],
    "series": [
        {
            "name": "HomeUsedBytes",
            "data": []
        }, {
            "name": "RootUsedBytes",
            "data": [
                {},
                {},
                {},
                {},
                {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
            ]
        }
    ]
};
/* harmony export (immutable) */ __webpack_exports__["h"] = Data8;



/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(13);
var normalizeHeaderName = __webpack_require__(415);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(246);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(246);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41)))

/***/ })

},[405])});;