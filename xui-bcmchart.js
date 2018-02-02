define(["san","echarts"], function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_401__) { return webpackJsonp([0],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(243);
var isBuffer = __webpack_require__(406);

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

/***/ 243:
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

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(13);
var settle = __webpack_require__(409);
var buildURL = __webpack_require__(411);
var parseHeaders = __webpack_require__(412);
var isURLSameOrigin = __webpack_require__(413);
var createError = __webpack_require__(245);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(414);

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
      var cookies = __webpack_require__(415);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(39)))

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(410);

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

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ 247:
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

/***/ 398:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(5);

var _lodash2 = _interopRequireDefault(_lodash);

var _promise = __webpack_require__(9);

var _promise2 = _interopRequireDefault(_promise);

var _san = __webpack_require__(0);

var _BcmChart = __webpack_require__(399);

var _BcmChart2 = _interopRequireDefault(_BcmChart);

var _Row = __webpack_require__(4);

var _Row2 = _interopRequireDefault(_Row);

var _bcmData = __webpack_require__(423);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file demos/xui-bcmchart.es6
 * @author leeight
 */

function delayRequester(data) {
    var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    return function () {
        return new _promise2.default(function (resolve, reject) {
            setTimeout(function () {
                return resolve(_lodash2.default.cloneDeep(data));
            }, ms);
        });
    };
}

/* eslint-disable */
var template = '<template>\n<!--x-row label="error">\n    <xui-bcmchart\n        title="CPU\u4F7F\u7528\u7387"\n        scope="BCE_BCC"\n        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"\n        metrics="vCPUUsagePercent(CPU\u4F7F\u7528\u7387)"\n        unit="\u767E\u5206\u6BD4"\n    />\n</x-row-->\n\n<x-row label="withFilter">\n    <xui-bcmchart\n        with-filter\n        width="{{800}}"\n        height="{{300}}"\n        title="CPU\u4F7F\u7528\u7387"\n        scope="BCE_BCC"\n        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"\n        metrics="vCPUUsagePercent(CPU\u4F7F\u7528\u7387)"\n        requester="{{requester1}}"\n        unit="\u767E\u5206\u6BD4"\n    />\n</x-row>\n\n<x-row label="default">\n    <xui-bcmchart\n        showbigable\n        title="CPU\u4F7F\u7528\u7387"\n        api-type="metricName"\n        scope="BCE_BCC"\n        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"\n        metrics="vCPUUsagePercent(CPU\u4F7F\u7528\u7387)"\n        requester="{{requester1}}"\n        unit="\u767E\u5206\u6BD4"\n    />\n\n    <xui-bcmchart\n        showbigable\n        title="\u6BCF\u79D2\u78C1\u76D8IO\u8BFB\u5199\u6B21\u6570"\n        api-type="metricName"\n        scope="BCE_BCC"\n        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"\n        metrics="vDiskReadOpCountPerSecond(\u6BCF\u79D2\u78C1\u76D8IO\u8BFB\u53D6\u6B21\u6570),vDiskWriteOpCountPerSecond(\u6BCF\u79D2\u78C1\u76D8IO\u5199\u5165\u6B21\u6570)"\n        requester="{{requester2}}"\n        unit="\u6B21/\u79D2"\n    />\n\n    <xui-bcmchart\n        showbigable\n        title="\u6BCF\u79D2\u78C1\u76D8IO\u8BFB\u5199\u91CF"\n        api-type="metricName"\n        scope="BCE_BCC"\n        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"\n        metrics="vDiskReadBytesPerSecond(\u6BCF\u79D2\u78C1\u76D8IO\u8BFB\u53D6\u91CF),vDiskWriteBytesPerSecond(\u6BCF\u79D2\u78C1\u76D8IO\u5199\u5165\u91CF)"\n        requester="{{requester3}}"\n        unit="\u5B57\u8282/\u79D2"\n    />\n\n    <xui-bcmchart\n        showbigable\n        title="\u7F51\u7EDC\u76D1\u63A7"\n        api-type="metricName"\n        scope="BCE_BCC"\n        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"\n        metrics="vNicInBytes(\u7F51\u5361\u8F93\u5165\u6D41\u91CF),vNicOutBytes(\u7F51\u5361\u8F93\u51FA\u6D41\u91CF),WebInBytes(\u4ECE\u5916\u7F51\u8FDB\u5165\u7684\u6D41\u91CF),WebOutBytes(\u6D41\u5411\u5916\u7F51\u7684\u6D41\u91CF)"\n        requester="{{requester4}}"\n        unit="\u5B57\u8282"\n    />\n\n    <xui-bcmchart\n        showbigable\n        title="\u51FA\u53E3\u5E26\u5BBD"\n        api-type="metricName"\n        scope="BCE_BCC"\n        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"\n        metrics="WebOutBitsPerSecond(\u51FA\u53E3\u5E26\u5BBD)"\n        requester="{{requester5}}"\n        unit="bps"\n    />\n\n    <xui-bcmchart\n        showbigable\n        title="\u5185\u5B58\u4F7F\u7528\u91CF"\n        api-type="metricName"\n        scope="BCE_BCC"\n        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"\n        metrics="MemUsedBytes(\u5185\u5B58\u4F7F\u7528\u91CF)"\n        requester="{{requester6}}"\n        unit="\u5B57\u8282"\n    />\n\n    <xui-bcmchart\n        showbigable\n        title="\u5185\u5B58\u4F7F\u7528\u7387"\n        api-type="metricName"\n        scope="BCE_BCC"\n        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"\n        metrics="MemUsedPercent(\u5185\u5B58\u4F7F\u7528\u7387)"\n        requester="{{requester7}}"\n        unit="\u767E\u5206\u6BD4"\n    />\n\n    <xui-bcmchart\n        showbigable\n        title="\u78C1\u76D8\u7A7A\u95F4\u4F7F\u7528\u91CF"\n        api-type="metricName"\n        scope="BCE_BCC"\n        dimensions="InstanceId:46d8db3c-ff08-4e92-8d4c-dacd3ae5c47c0"\n        metrics="HomeUsedBytes(HOME\u78C1\u76D8\u7A7A\u95F4\u4F7F\u7528\u91CF),RootUsedBytes(\u6839\u78C1\u76D8\u7A7A\u95F4\u4F7F\u7528\u91CF)"\n        requester="{{requester8}}"\n        unit="\u5B57\u8282"\n    />\n</x-row>\n\n</template>';
/* eslint-enable */

exports.default = (0, _san.defineComponent)({
    template: template,
    components: {
        'x-row': _Row2.default,
        'xui-bcmchart': _BcmChart2.default
    },
    initData: function initData() {
        return {
            requester1: delayRequester(_bcmData.Data1),
            requester2: delayRequester(_bcmData.Data2),
            requester3: delayRequester(_bcmData.Data3),
            requester4: delayRequester(_bcmData.Data4),
            requester5: delayRequester(_bcmData.Data5),
            requester6: delayRequester(_bcmData.Data6),
            requester7: delayRequester(_bcmData.Data7),
            requester8: delayRequester(_bcmData.Data8)
        };
    }
});

/***/ }),

/***/ 399:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(5);

var _lodash2 = _interopRequireDefault(_lodash);

var _san = __webpack_require__(0);

var _mtools = __webpack_require__(400);

var _mtools2 = _interopRequireDefault(_mtools);

var _util = __webpack_require__(2);

var _Chart = __webpack_require__(209);

var _Chart2 = _interopRequireDefault(_Chart);

var _Select = __webpack_require__(22);

var _Select2 = _interopRequireDefault(_Select);

var _Tip = __webpack_require__(55);

var _Tip2 = _interopRequireDefault(_Tip);

var _Button = __webpack_require__(6);

var _Button2 = _interopRequireDefault(_Button);

var _Loading = __webpack_require__(11);

var _Loading2 = _interopRequireDefault(_Loading);

var _ajax = __webpack_require__(403);

var _asDialog = __webpack_require__(74);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cx = (0, _util.create)('ui-bcmchart'); /**
                                            * @file components/BcmChart.es6
                                            * @author leeight
                                            */

var kMetricName = 'metricName';

/* eslint-disable */
var template = '<div class="{{mainClass}}" style="{{mainStyle}}">\n<div class="' + cx('box') + '">\n    <h1 s-if="title && !withFilter">\n        {{title}}\n        <div on-click="showBigView" class="' + cx('showbig') + '" s-if="!loading && showbigable"></div>\n    </h1>\n    <div class="' + cx('filter') + '" s-if="withFilter">\n        \u7EDF\u8BA1\u9879\uFF1A<ui-select datasource="{{ds.statistics}}" value="{=statistics=}" on-change="loadMetrics" />\n        \u91C7\u6837\u5468\u671F\uFF1A<ui-select datasource="{{ds.period}}" value="{=period=}" on-change="loadMetrics" />\n        \u6700\u8FD1\uFF1A<ui-select datasource="{{ds.timeRange}}" value="{=time=}" on-change="loadMetrics" />\n        <ui-tip skin="warning" message="\u6700\u591A\u652F\u63011440\u4E2A\u6570\u636E\u70B9\u7684\u67E5\u8BE2\u663E\u793A\uFF0C\u8BF7\u9009\u62E9\u5408\u9002\u7684\u91C7\u6837\u5468\u671F\u548C\u805A\u5408\u65F6\u95F4\u6BB5\u3002" />\n        <ui-button icon="refresh" on-click="loadMetrics" />\n    </div>\n    <div class="' + cx('chart') + '" style="{{chartStyle}}">\n        <ui-loading s-if="!chartOption && loading" />\n        <div class="' + cx('error') + '" s-elif="error">{{error | raw}}</div>\n        <div class="' + cx('no-data') + '" s-elif="isEmpty">{{noData | raw}}</div>\n        <ui-chart s-else option="{{chartOption}}" loading="{{loading}}" width="{{width}}" height="{{height}}" not-merge />\n    </div>\n</div>\n</div>';
/* eslint-enable */

function parseMetrics(metrics) {
    if (_lodash2.default.isArray(metrics)) {
        return metrics;
    } else if (metrics) {
        return _mtools2.default.parseMetrics(metrics);
    }
    return [];
}

function getDefaultUrl(apiType) {
    return apiType === 'dimensions' ? '/api/bcm/metricdata/v2/datas/dimensions' : '/api/bcm/metricdata/v2/datas/metricname';
}

var BcmChart = (0, _san.defineComponent)({ // eslint-disable-line
    template: template,
    components: {
        'ui-select': _Select2.default,
        'ui-button': _Button2.default,
        'ui-tip': _Tip2.default,
        'ui-loading': _Loading2.default,
        'ui-chart': _Chart2.default
    },
    dataTypes: {
        /**
         * BcmChart 的标题
         */
        title: _san.DataTypes.string,

        /**
         * WTF??
         */
        lazy: _san.DataTypes.bool,

        /**
         * 是否展示过滤的功能，一般在对话框的里面才会设置这个值
         * @default false
         */
        withFilter: _san.DataTypes.bool,

        /**
         * 是否支持弹框放大的功能
         * @default false
         */
        showbigable: _san.DataTypes.bool,

        /**
         * 没有数据的时候，需要展示的文案
         */
        noData: _san.DataTypes.string,

        /**
         * 配合 noData 来用
         */
        isEmpty: _san.DataTypes.bool,

        /**
         * Chart的宽度
         * @default 550
         */
        width: _san.DataTypes.number,

        /**
         * Chart的高度
         * @default 200
         */
        height: _san.DataTypes.number,

        /**
         * 是否是加载中
         * @default true
         */
        loading: _san.DataTypes.bool,

        /**
         * 如果出错了，展示的错误信息
         */
        error: _san.DataTypes.any,

        /**
         * 获取监控数据回掉函数<br>
         * function(payload:object):Promise.&lt;{series: any[]}, Error&gt;
         */
        requester: _san.DataTypes.func,

        /**
         * 如BCE_BCC
         */
        scope: _san.DataTypes.string,

        /**
         * 趋势图维度类型：多维度|多指标，可以设置的值有 metricName, dimensions
         * @default metricName
         */
        apiType: _san.DataTypes.string,

        /**
         * 维度信息，可以是字符串或者数组
         * InstanceId:1;Node:2|3
         * ["InstanceId:1;Node:2", "InstanceId:1;Node:3"]
         */
        dimensions: _san.DataTypes.any,

        /**
         * 监控指标
         * 如：CPUUsagePercent(CPU使用率)
         * @default ''
         */
        metrics: _san.DataTypes.string,

        /**
         * 统计方式：
         *  average: '平均值'
         *  maximum: '最大值'
         *  minimum: '最小值'
         *  sum: '和值'
         *  sampleCount: '样本数'
         * @default average
         */
        statistics: _san.DataTypes.string,

        /**
         * 聚合周期，单位秒
         * @default 60
         */
        period: _san.DataTypes.number,

        /**
         * 聚合区间，目前只支持最近多长时间
         * 如：1h：最近1小时
         * @default 1h
         */
        time: _san.DataTypes.string,

        /**
         * 指标单位
         * @default ''
         */
        unit: _san.DataTypes.string
    },
    computed: {
        mainClass: function mainClass() {
            var klass = cx.mainClass(this);
            return klass;
        },
        mainStyle: function mainStyle() {
            var style = cx.mainStyle(this);
            // width 和 height 是给 chart 设置的
            return _lodash2.default.omit(style, 'width', 'height');
        },
        chartStyle: function chartStyle() {
            var style = cx.mainStyle(this);
            return _lodash2.default.pick(style, 'width', 'height');
        },
        metricConfig: function metricConfig() {
            var metrics = this.data.get('metrics');
            var unit = this.data.get('unit');
            var statistics = this.data.get('statistics');

            return {
                unit: unit,
                statistics: statistics,
                metrics: parseMetrics(metrics)
            };
        },
        conf: function conf() {
            // 这些参数实际上跟 https://cloud.baidu.com/doc/BCM/API.html#.E6.9F.A5.E8.AF.A2.E6.95.B0.E6.8D.AE.E6.8E.A5.E5.8F.A3 有关系
            // 保持跟之前的命名规则一致
            var conf = {};

            var statistics = this.data.get('statistics');
            var scope = this.data.get('scope');
            var time = this.data.get('time');
            var period = this.data.get('period');
            var apiType = this.data.get('apiType');
            var dimensions = this.data.get('dimensions');
            var metrics = this.data.get('metrics');

            var metricMap = parseMetrics(metrics);

            var _mtools$getUTCTimeRan = _mtools2.default.getUTCTimeRange(time, +period),
                startTime = _mtools$getUTCTimeRan.startTime,
                endTime = _mtools$getUTCTimeRan.endTime;

            if (apiType === kMetricName) {
                conf.dimensions = dimensions;
                conf.metricNames = _lodash2.default.map(metricMap, function (o) {
                    return o.value;
                });
            } else {
                // 是数组，表示已经解析好了，不需要再次解析
                if (_lodash2.default.isArray(dimensions)) {
                    conf.dimensions = dimensions;
                } else {
                    conf.dimensions = _mtools2.default.parseDimensions(dimensions);
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
    initData: function initData() {
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
                statistics: [{ text: '平均值', value: 'average' }, { text: '和值', value: 'sum' }, { text: '最大值', value: 'maximum' }, { text: '最小值', value: 'minimum' }, { text: '样本数', value: 'sampleCount' }],
                period: [{ text: '1分钟', value: 60 }, { text: '5分钟', value: 300 }, { text: '20分钟', value: 1200 }, { text: '1小时', value: 3600 }, { text: '6小时', value: 21600 }, { text: '12小时', value: 43200 }, { text: '1天', value: 86400 }],
                timeRange: [{ text: '1小时', value: '1h' }, { text: '6小时', value: '6h' }, { text: '1天', value: '1d' }, { text: '7天', value: '7d' }, { text: '14天', value: '14d' }, { text: '40天', value: '40d' }]
            }
        };
    },
    inited: function inited() {
        var requester = this.data.get('requester');
        if (typeof requester !== 'function') {
            var apiType = this.data.get('apiType');
            var url = requester && typeof requester === 'string' ? requester : getDefaultUrl(apiType);
            this.data.set('requester', function (payload) {
                return (0, _ajax.$post)(url, payload);
            });
        }
    },
    attached: function attached() {
        this.loadMetrics();
    },
    loadMetrics: function loadMetrics() {
        var _this = this;

        var requester = this.data.get('requester');
        if (typeof requester !== 'function') {
            this.data.set('error', '请设置 requester 参数');
            return;
        }

        var payload = this.data.get('conf');
        this.data.set('loading', true);
        this.data.set('error', null);
        return requester(payload).then(function (data) {
            _this.data.set('loading', false);
            _this.renderChart(data);
        }).catch(function (error) {
            _this.data.set('loading', false);
            _this.data.set('error', error && error.global ? error.global : error);
        });
    },
    renderChart: function renderChart(data) {
        var conf = this.data.get('conf');

        var isEmpty = _mtools2.default.isMonitorTrendEmpty(data.series, conf.statistics);
        this.data.set('isEmpty', isEmpty);
        if (isEmpty) {
            return;
        }

        _mtools2.default.adjustSeriesData(data, conf.statistics);
        var metricConfig = this.data.get('metricConfig');
        var chartOption = _mtools2.default.getChartOptions(data, metricConfig, { type: 'line' }, { period: conf.periodInSecond });
        this.data.set('chartOption', chartOption);
    },
    showBigView: function showBigView() {
        var _this2 = this;

        if (this.dialog) {
            this.dialog.dispose();
            this.dialog = null;
        }

        var DialogComponent = (0, _asDialog.asDialog)(BcmChart);
        var payload = _lodash2.default.defaults({ withFilter: true, width: 740, height: 350 }, this.data.get());
        var data = {
            title: payload.title,
            foot: false,
            width: 800,
            payload: payload
        };
        var dialog = this.dialog = new DialogComponent({ data: data });
        dialog.on('close', function () {
            return _this2.dialog = null;
        });
        dialog.attach(document.body);
    },
    disposed: function disposed() {
        if (this.dialog) {
            this.dialog.dispose();
        }
    }
});

exports.default = BcmChart;

/***/ }),

/***/ 400:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _moment = __webpack_require__(1);

var _moment2 = _interopRequireDefault(_moment);

var _lodash = __webpack_require__(5);

var _lodash2 = _interopRequireDefault(_lodash);

var _infI18n = __webpack_require__(14);

var _infI18n2 = _interopRequireDefault(_infI18n);

var _jquery = __webpack_require__(10);

var _jquery2 = _interopRequireDefault(_jquery);

var _echarts = __webpack_require__(401);

var _echarts2 = _interopRequireDefault(_echarts);

var _formatter = __webpack_require__(402);

var _formatter2 = _interopRequireDefault(_formatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file inf-ria/utils/mtools.es6
 * @author leeight
 */

var IS_V3 = /^3\./.test(_echarts2.default.version);

/**
 * 将utc时间转换为本地时间
 *
 * @param {number} time 时间戳
 * @param {string} pattern 格式化字符串
 * @return {string}
 */
function utc2local(time, pattern) {
    pattern = pattern || 'MM-DD HH:mm';
    return (0, _moment2.default)(time).format(pattern);
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
    return (0, _moment2.default)(time).utc().format(pattern) + 'Z';
}

/**
 * 获取当前的utc时间区间
 *
 * @param {string} timeRange 时间段标识
 * @param {number} period 时间区间
 * @return {Object}
 */
function getUTCTimeRange(timeRange, period) {
    var mt = timeRange.match(/(\d+)(\w+)/);
    var value = mt[1];
    var unit = mt[2];
    var m = (0, _moment2.default)();

    var endTime = local2utc(m);
    var startTime = '';

    if (arguments.length === 1) {
        // 格式化时间：秒为0，起始时间加1分钟，解决时间区间超过范围问题
        startTime = local2utc(m.add('m', 1).subtract(unit, value), 'YYYY-MM-DDTHH:mm:00');
    } else {
        if (period < 60 * 60) {
            startTime = local2utc((0, _moment2.default)(m.add('m', 1).subtract(unit, value).format('YYYY-MM-DDTHH:mm:00')));
        } else if (period < 60 * 60 * 24) {
            startTime = local2utc((0, _moment2.default)(m.add('h', 1).subtract(unit, value).format('YYYY-MM-DDTHH:00:00')));
        } else {
            startTime = local2utc((0, _moment2.default)(m.add('d', 1).subtract(unit, value).format('YYYY-MM-DDT00:00:00')));
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
    var byteLength = source.replace('/[^\x00-\xff]/g', '**').length;
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

var chartTheme = ['#4aaaff', '#f2605d', '#01B09B', '#E74684', '#6EC50F', '#FE863D', '#A45BFF', '#F6D622', '#0AC1D7', '#B569D4'];

/**
 * 趋势图默认配置
 *
 * @type {Object}
 */
var defaultChartOptions = {
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
var statisticsMap = {
    average: (0, _infI18n2.default)('平均值'),
    maximum: (0, _infI18n2.default)('最大值'),
    minimum: (0, _infI18n2.default)('最小值'),
    sum: (0, _infI18n2.default)('和值'),
    sampleCount: (0, _infI18n2.default)('样本数')
};

/**
 * 与默认配置进行合并，得到最终的配置信息
 *
 * @param {Object} opt 扩充对象
 * @return {Object} 最终配置
 */
function mergeChartOptions(opt) {
    return _lodash2.default.extend({}, defaultChartOptions, opt);
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
    var category = [];
    var unit = metric.unit;
    var zoomStart = 0;
    var legend = [];
    var tmpData = {};
    var seriesOpt = {};
    var seriesData = [];
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
    } else if (opt.type === 'bar') {
        seriesOpt = {
            type: 'bar'
        };
    }

    seriesOpt = _lodash2.default.extend(seriesOpt, opt.chart || {});

    var spliteNumber = 5;
    var yAxisFormatter = void 0;
    var yAxisMax = void 0;
    var tooltipFormatter = function tooltipFormatter(params) {
        var arr = [];
        if (params.length > 0) {
            arr.push(params[0].name + ' (' + statisticsMap[metric.statistics] + ')');
        }

        _lodash2.default.each(params, function (item) {
            var label = truncate(item.seriesName, 22, '…');
            arr.push(label + '：' + item.value);
        });
        return arr.join('<br/>');
    };
    if (data.category.length === 0) {
        category.push(utc2local((0, _moment2.default)().utc()).replace(' ', '\n'));
        category.push(utc2local()); // .replace(' ', '\n'));
        category.push(utc2local()); // .replace(' ', '\n'));
    } else {
        var pattern = 'MM-DD HH:mm';
        if (addition && addition.period) {
            if (addition.period >= 60 * 60 * 24) {
                pattern = 'MM-DD';
            }

            // 精确到毫秒的格式
            if (addition.period < 1) {
                pattern = 'MM-DD HH:mm:ss.SSS';
            }
        }

        _lodash2.default.each(data.category, function (item) {
            category.push(utc2local(item, pattern));
        });
    }
    if (metric.nullPointMode === 0) {
        _lodash2.default.each(data.series, function (item) {
            var values = [];

            _lodash2.default.each(item.data, function (value) {
                if (typeof value === 'undefined') {
                    value = 0;
                }

                values.push(value);
            });
            if (values.length === 0) {
                for (var i = 0, len = category.length; i < len; i++) {
                    values[i] = 0;
                }
            }

            tmpData[item.name] = values;
        });
    } else {
        _lodash2.default.each(data.series, function (item) {
            var values = [];
            var tmpvalue = '';

            _lodash2.default.each(item.data, function (value) {
                if (typeof value === 'undefined') {
                    value = '-';
                }

                // 对于孤立数据点，以圆点的方式展示
                if (tmpvalue === '-' && value !== '-') {
                    values.push({
                        value: value,
                        symbol: 'emptyCircle'
                    });
                } else {
                    values.push(value);
                    if (value !== '-' && values.length > 1) {
                        values[values.length - 2] = tmpvalue;
                    }
                }
                tmpvalue = value;
            });
            if (values.length === 0) {
                for (var i = 0, len = category.length; i < len; i++) {
                    values[i] = '-';
                }
            }

            tmpData[item.name] = values;
        });
    }

    if (addition && addition.dataZoom) {
        zoomStart = addition.dataZoom.start;
    } else {
        zoomStart = Math.max((1 - 100 / category.length) * 100, 0);
    }

    var metricNames = {};
    _lodash2.default.each(metric.metrics, function (item, key) {
        metricNames[item.value] = item.name;
    });
    _lodash2.default.each(tmpData, function (item, key) {
        var name = metricNames[key] || key;
        var obj = _jquery2.default.extend(true, {}, seriesOpt, {
            name: name,
            data: item
        });
        legend.push(name);
        seriesData.push(obj);
    });
    if (metric.statistics === 'sampleCount') {
        unit = '个';
        tooltipFormatter = function tooltipFormatter(params) {
            var str = '';
            if (params.length > 0) {
                str += params[0].name + ' (' + statisticsMap[metric.statistics] + ')<br/>';
            }

            _lodash2.default.each(params, function (item, index) {
                str += truncate(item.seriesName, 22, '…') + '：';
                var value = item.value;
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
            var enums = metric.src || {};
            var count = (0, _lodash2.default)(enums).value().length;
            if (count < 6) {
                spliteNumber = count - 1;
            }

            tooltipFormatter = function tooltipFormatter(params) {
                var str = '';
                if (params.length > 0) {
                    str += params[0].name;
                }

                str += ' (' + statisticsMap[metric.statistics] + ')';
                _lodash2.default.each(params, function (item, index) {
                    var value = item.value;
                    str += '<br/>' + truncate(item.seriesName, 22, '…') + '：' + value;
                    if (value !== '-') {
                        str += '（' + (enums[value] || value) + '）';
                    }
                });
                return str;
            };
        } else if (unit === (0, _infI18n2.default)('字节') || unit === (0, _infI18n2.default)('字节/秒')) {
            var suffix = unit === (0, _infI18n2.default)('字节') ? '' : '/s';
            tooltipFormatter = function tooltipFormatter(params) {
                var str = '';
                if (params.length > 0) {
                    str += params[0].name + ' (' + statisticsMap[metric.statistics] + ')<br/>';
                }

                _lodash2.default.each(params, function (item, index) {
                    str += truncate(item.seriesName, 22, '…') + '：';
                    var value = item.value;
                    var prefix = void 0;
                    var valueStr = '';
                    if (isNaN(value)) {
                        valueStr = '-';
                    } else {
                        prefix = value < 0 ? '-' : '';
                        value = Math.abs(value);

                        value = _formatter2.default.bytes(value, 2, metric.byteUnit);
                        valueStr = prefix + value + suffix;
                    }
                    str += valueStr + '<br/>';
                });
                return str;
            };

            yAxisFormatter = function yAxisFormatter(value) {
                var prefix = value < 0 ? '-' : '';
                value = Math.abs(value);
                value = _formatter2.default.bytes(value, 1, metric.byteUnit);
                return prefix + value + suffix;
            };
        } else if (unit === 'bps') {
            tooltipFormatter = function tooltipFormatter(params) {
                var str = '';
                if (params.length > 0) {
                    str += params[0].name + ' (' + statisticsMap[metric.statistics] + ')<br/>';
                }

                _lodash2.default.each(params, function (item, index) {
                    str += truncate(item.seriesName, 22, '…') + '：';
                    var value = item.value;
                    var prefix = void 0;
                    var valueStr = '';
                    if (isNaN(value)) {
                        valueStr = '-';
                    } else {
                        prefix = value < 0 ? '-' : '';
                        value = Math.abs(value);

                        value = _formatter2.default.bits(value, 2, metric.bitUnit).toUpperCase();
                        valueStr = prefix + value + unit;
                    }
                    str += valueStr + '<br/>';
                });
                return str;
            };

            yAxisFormatter = function yAxisFormatter(value) {
                var prefix = value < 0 ? '-' : '';
                value = Math.abs(value);
                // 保留1位小数的话
                // 当纵坐标是0 0.125 0.15 0.175 0.2的时候
                // 就会出现三个0.1
                value = _formatter2.default.bits(value, 2, metric.bitUnit).toUpperCase();
                return prefix + value;
            };
        } else if (unit === (0, _infI18n2.default)('百分比')) {
            tooltipFormatter = function tooltipFormatter(params) {
                var str = '';
                if (params.length > 0) {
                    str += params[0].name + ' (' + statisticsMap[metric.statistics] + ')<br/>';
                }

                _lodash2.default.each(params, function (item, index) {
                    str += truncate(item.seriesName, 22, '…') + '：' + item.value + (item.value === '-' ? '' : '%') + '<br/>';
                });
                return str;
            };
            yAxisFormatter = '{value}%';
            yAxisMax = 100;
        } else {
            tooltipFormatter = function tooltipFormatter(params) {
                var str = '';
                if (params.length > 0) {
                    str = params[0].name + ' (' + statisticsMap[metric.statistics] + ')<br/>';
                }

                _lodash2.default.each(params, function (item) {
                    str += truncate(item.seriesName, 22, '…') + '：';
                    var value = item.value;
                    var valueStr = '';
                    if (isNaN(value)) {
                        valueStr = '-';
                    } else {
                        valueStr = item.value;
                    }
                    str += valueStr + '<br/>';
                });
                return str;
            };

            yAxisFormatter = function yAxisFormatter(value) {
                return _formatter2.default.number(value, 0);
            };
        }

    var opts = {
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
        xAxis: [{
            type: 'category',
            boundaryGap: opt.type === 'bar',
            data: category,
            splitLine: {
                lineStyle: {
                    color: '#eee'
                }
            }
        }],
        yAxis: [{
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
        }],
        series: seriesData
    };
    var forceOpt = opt.chartOptions || {};
    deepExtend(opts, forceOpt);
    return mergeChartOptions(opts);
}

function getPieChartOptions(config) {
    var options = {
        tooltip: {
            trigger: 'item',
            formatter: '{b} <br/> {c} ({d}%)'
        },
        color: ['#4aaaff', '#f2605d', '#F6D622', '#6EC50F', '#FE863D', '#B569D4', '#A45BFF', '#01B09B', '#E74684', '#0AC1D7'],
        legend: {
            orient: 'vertical',
            x: 'right',
            y: 'center',
            data: config.legend
        },
        series: [{
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
        }]
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
    _lodash2.default.each(opt, function (item, key) {
        if (_lodash2.default.isArray(item)) {
            deepExtend(src[key] = src[key] || [], item);
        } else if (_lodash2.default.isObject(item)) {
            deepExtend(src[key] = src[key] || {}, item);
        } else {
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
    var empty = true;
    _lodash2.default.each(series, function (item, i) {
        _lodash2.default.each(item.data, function (value) {
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
    var chartMetric = {};
    var defaultStatistics = 'average';
    _lodash2.default.each(metrics, function (item, key) {
        chartMetric[key] = {
            metrics: [],
            unit: item.unit,
            names: {},
            nullPointMode: item.nullPointMode || null, // 可选值： 0， null(显示为 '-')
            statistics: item.statistics || defaultStatistics
        };
        item.chartType && (chartMetric[key].type = item.chartType);
        _lodash2.default.each(item.metrics, function (metric, i) {
            var value = metric.value;
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
    _lodash2.default.each(result.series, function (item) {
        item.data = _lodash2.default.map(item.data, key);
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
    var EVENT_TYPE = {
        ConfigurationUpdate: (0, _infI18n2.default)('配置变更'),
        StateUpdate: (0, _infI18n2.default)('状态变化'),
        Action: (0, _infI18n2.default)('触发报警')
    };
    var type = EVENT_TYPE[eventType] || eventType;
    var ico = '';
    if (eventData) {
        var data = {};
        try {
            data = new Function('return ' + eventData)();
        } catch (e) {}

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
    _lodash2.default.each(metrics, function (item, k) {
        if (item.filter === filterName) {
            for (var i = item.metrics.length - 1; i >= 0; i--) {
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
    var empty = true;
    _lodash2.default.each(series, function (item, i) {
        var itemData = [];
        _lodash2.default.each(item.data, function (v, k) {
            var value = v[statistics];
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
    var reg = /([^\(]+)(?:\((.+)\))*/;
    var ret = [];
    _lodash2.default.each(str.split(','), function (item) {
        if (item) {
            var tmp = item.match(reg);
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
    var darr = [];
    var arr = str.split(';');
    function xc(src, dist) {
        var ret = [];
        _lodash2.default.each(dist.value, function (item) {
            if (src.length === 0) {
                ret.push([dist.key + ':' + item]);
            } else {
                _lodash2.default.each(src, function (it) {
                    var tmp = [];
                    [].push.apply(tmp, it);
                    tmp.push(dist.key + ':' + item);
                    ret.push(tmp);
                });
            }
        });
        return ret;
    }
    _lodash2.default.each(arr, function (item) {
        if (item) {
            var it = item.split(':');
            if (it[1]) {
                var key = it[0];
                var value = it[1].split('|');
                darr.push({
                    key: key,
                    value: value
                });
            }
        }
    });
    var src = [];
    _lodash2.default.each(darr, function (item) {
        src = xc(src, item);
    });
    src = _lodash2.default.map(src, function (item) {
        return item.join(';');
    });
    return src;
}

/* eslint-disable */
exports.default = {
    utc2local: utc2local,
    local2utc: local2utc,
    getUTCTimeRange: getUTCTimeRange,
    getChartOptions: getChartOptions,
    getPieChartOptions: getPieChartOptions,
    isSeriesEmpty: isSeriesEmpty,
    adjustToChartMetric: adjustToChartMetric,
    adjustSeriesData: adjustSeriesData,
    formatBytes: _formatter2.default.bytes,
    transferAlarmEventType: transferAlarmEventType,
    filterMetrics: filterMetrics,
    parseMetrics: parseMetrics,
    parseDimensions: parseDimensions,
    isMonitorTrendEmpty: isMonitorTrendEmpty
};

/***/ }),

/***/ 401:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_401__;

/***/ }),

/***/ 402:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _infI18n = __webpack_require__(14);

var _infI18n2 = _interopRequireDefault(_infI18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var kByteUnit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB']; /**
                                                                              * @file inf-ria/utils/formatter.es6
                                                                              * @author leeight
                                                                              */

var kBitUnit = ['', 'k', 'm', 'g', 't', 'p', 'e', 'z', 'y', 'b'];

exports.default = {
    percent: function percent(value) {
        return value + '%';
    },
    bytes: function bytes(value) {
        var number = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
        var byteUnit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1024;

        var idx = 0;
        var len = kByteUnit.length - 1;
        while (value >= byteUnit && idx < len) {
            value = value / byteUnit;
            idx++;
        }
        return value.toFixed(number) + kByteUnit[idx];
    },
    bits: function bits(value) {
        var number = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
        var bitUnit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1024;

        var idx = 0;
        var len = kBitUnit.length - 1;
        while (value >= bitUnit && idx < len) {
            value = value / bitUnit;
            idx++;
        }
        return value.toFixed(number) + kBitUnit[idx];
    },
    number: function number(value) {
        var number = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        if (value < 10000) {
            return value;
        }
        // 15000、20000，当number为0的时候，都是2万
        // 所以需要判断一下value是否能整除，不能整除的至少保留一位小数
        else if (value < 1000000) {
                return (value / 10000).toFixed(value % 10000 === 0 ? number : Math.max(1, number)) + (0, _infI18n2.default)('万');
            } else if (value < 10000000) {
                return (value / 1000000).toFixed(value % 1000000 === 0 ? number : Math.max(1, number)) + (0, _infI18n2.default)('百万');
            }

        return (value / 10000000.0).toFixed(value % 10000000 === 0 ? number : Math.max(1, number)) + (0, _infI18n2.default)('千万');
    }
};

/***/ }),

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$post = $post;

var _axios = __webpack_require__(404);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function $post(url, data, options) {
  return _axios2.default.post(url, data, options);
} /**
   * @file mixins/ajax.es6
   * @author leeight
   */

/***/ }),

/***/ 404:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(405);

/***/ }),

/***/ 405:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(13);
var bind = __webpack_require__(243);
var Axios = __webpack_require__(407);
var defaults = __webpack_require__(73);

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
axios.Cancel = __webpack_require__(247);
axios.CancelToken = __webpack_require__(421);
axios.isCancel = __webpack_require__(246);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(422);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ 406:
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

/***/ 407:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(73);
var utils = __webpack_require__(13);
var InterceptorManager = __webpack_require__(416);
var dispatchRequest = __webpack_require__(417);

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

/***/ 408:
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

/***/ 409:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(245);

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

/***/ 410:
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

/***/ 411:
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

/***/ 412:
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

/***/ 413:
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

/***/ 414:
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

/***/ 415:
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

/***/ 416:
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

/***/ 417:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(13);
var transformData = __webpack_require__(418);
var isCancel = __webpack_require__(246);
var defaults = __webpack_require__(73);
var isAbsoluteURL = __webpack_require__(419);
var combineURLs = __webpack_require__(420);

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

/***/ 418:
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

/***/ 419:
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

/***/ 420:
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

/***/ 421:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(247);

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

/***/ 422:
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

/***/ 423:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @file examples/bcmData.es6
 * @author leeight
 */

/* eslint-disable */

var Data1 = exports.Data1 = {
    "category": ["2014-05-26T07:10:00Z", "2014-05-26T07:11:00Z", "2014-05-26T07:12:00Z", "2014-05-26T07:13:00Z", "2014-05-26T07:14:00Z", "2014-05-26T07:15:00Z", "2014-05-26T07:16:00Z", "2014-05-26T07:17:00Z", "2014-05-26T07:18:00Z", "2014-05-26T07:19:00Z", "2014-05-26T07:20:00Z", "2014-05-26T07:21:00Z", "2014-05-26T07:22:00Z", "2014-05-26T07:23:00Z", "2014-05-26T07:24:00Z", "2014-05-26T07:25:00Z", "2014-05-26T07:26:00Z", "2014-05-26T07:27:00Z", "2014-05-26T07:28:00Z", "2014-05-26T07:29:00Z", "2014-05-26T07:30:00Z", "2014-05-26T07:31:00Z", "2014-05-26T07:32:00Z", "2014-05-26T07:33:00Z", "2014-05-26T07:34:00Z", "2014-05-26T07:35:00Z", "2014-05-26T07:36:00Z", "2014-05-26T07:37:00Z", "2014-05-26T07:38:00Z", "2014-05-26T07:39:00Z", "2014-05-26T07:40:00Z", "2014-05-26T07:41:00Z", "2014-05-26T07:42:00Z", "2014-05-26T07:43:00Z", "2014-05-26T07:44:00Z", "2014-05-26T07:45:00Z", "2014-05-26T07:46:00Z", "2014-05-26T07:47:00Z", "2014-05-26T07:48:00Z", "2014-05-26T07:49:00Z", "2014-05-26T07:50:00Z", "2014-05-26T07:51:00Z", "2014-05-26T07:52:00Z", "2014-05-26T07:53:00Z", "2014-05-26T07:54:00Z", "2014-05-26T07:55:00Z", "2014-05-26T07:56:00Z", "2014-05-26T07:57:00Z", "2014-05-26T07:58:00Z", "2014-05-26T07:59:00Z"],
    "series": [{
        "name": "vCPUUsagePercent",
        "data": [{
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
        }]
    }]
};

var Data2 = exports.Data2 = {
    "category": ["2014-05-26T07:10:00Z", "2014-05-26T07:11:00Z", "2014-05-26T07:12:00Z", "2014-05-26T07:13:00Z", "2014-05-26T07:14:00Z", "2014-05-26T07:15:00Z", "2014-05-26T07:16:00Z", "2014-05-26T07:17:00Z", "2014-05-26T07:18:00Z", "2014-05-26T07:19:00Z", "2014-05-26T07:20:00Z", "2014-05-26T07:21:00Z", "2014-05-26T07:22:00Z", "2014-05-26T07:23:00Z", "2014-05-26T07:24:00Z", "2014-05-26T07:25:00Z", "2014-05-26T07:26:00Z", "2014-05-26T07:27:00Z", "2014-05-26T07:28:00Z", "2014-05-26T07:29:00Z", "2014-05-26T07:30:00Z", "2014-05-26T07:31:00Z", "2014-05-26T07:32:00Z", "2014-05-26T07:33:00Z", "2014-05-26T07:34:00Z", "2014-05-26T07:35:00Z", "2014-05-26T07:36:00Z", "2014-05-26T07:37:00Z", "2014-05-26T07:38:00Z", "2014-05-26T07:39:00Z", "2014-05-26T07:40:00Z", "2014-05-26T07:41:00Z", "2014-05-26T07:42:00Z", "2014-05-26T07:43:00Z", "2014-05-26T07:44:00Z", "2014-05-26T07:45:00Z", "2014-05-26T07:46:00Z", "2014-05-26T07:47:00Z", "2014-05-26T07:48:00Z", "2014-05-26T07:49:00Z", "2014-05-26T07:50:00Z", "2014-05-26T07:51:00Z", "2014-05-26T07:52:00Z", "2014-05-26T07:53:00Z", "2014-05-26T07:54:00Z", "2014-05-26T07:55:00Z", "2014-05-26T07:56:00Z", "2014-05-26T07:57:00Z", "2014-05-26T07:58:00Z", "2014-05-26T07:59:00Z"],
    "series": [{
        "name": "vDiskReadOpCountPerSecond",
        "data": [{
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
        }]
    }, {
        "name": "vDiskWriteOpCountPerSecond",
        "data": [{
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
        }]
    }]
};

var Data3 = exports.Data3 = {
    "category": ["2014-05-26T07:10:00Z", "2014-05-26T07:11:00Z", "2014-05-26T07:12:00Z", "2014-05-26T07:13:00Z", "2014-05-26T07:14:00Z", "2014-05-26T07:15:00Z", "2014-05-26T07:16:00Z", "2014-05-26T07:17:00Z", "2014-05-26T07:18:00Z", "2014-05-26T07:19:00Z", "2014-05-26T07:20:00Z", "2014-05-26T07:21:00Z", "2014-05-26T07:22:00Z", "2014-05-26T07:23:00Z", "2014-05-26T07:24:00Z", "2014-05-26T07:25:00Z", "2014-05-26T07:26:00Z", "2014-05-26T07:27:00Z", "2014-05-26T07:28:00Z", "2014-05-26T07:29:00Z", "2014-05-26T07:30:00Z", "2014-05-26T07:31:00Z", "2014-05-26T07:32:00Z", "2014-05-26T07:33:00Z", "2014-05-26T07:34:00Z", "2014-05-26T07:35:00Z", "2014-05-26T07:36:00Z", "2014-05-26T07:37:00Z", "2014-05-26T07:38:00Z", "2014-05-26T07:39:00Z", "2014-05-26T07:40:00Z", "2014-05-26T07:41:00Z", "2014-05-26T07:42:00Z", "2014-05-26T07:43:00Z", "2014-05-26T07:44:00Z", "2014-05-26T07:45:00Z", "2014-05-26T07:46:00Z", "2014-05-26T07:47:00Z", "2014-05-26T07:48:00Z", "2014-05-26T07:49:00Z", "2014-05-26T07:50:00Z", "2014-05-26T07:51:00Z", "2014-05-26T07:52:00Z", "2014-05-26T07:53:00Z", "2014-05-26T07:54:00Z", "2014-05-26T07:55:00Z", "2014-05-26T07:56:00Z", "2014-05-26T07:57:00Z", "2014-05-26T07:58:00Z", "2014-05-26T07:59:00Z"],
    "series": [{
        "name": "vDiskReadBytesPerSecond",
        "data": [{
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
        }]
    }, {
        "name": "vDiskWriteBytesPerSecond",
        "data": [{
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
        }]
    }]
};

var Data4 = exports.Data4 = {
    "category": ["2014-05-26T07:10:00Z", "2014-05-26T07:11:00Z", "2014-05-26T07:12:00Z", "2014-05-26T07:13:00Z", "2014-05-26T07:14:00Z", "2014-05-26T07:15:00Z", "2014-05-26T07:16:00Z", "2014-05-26T07:17:00Z", "2014-05-26T07:18:00Z", "2014-05-26T07:19:00Z", "2014-05-26T07:20:00Z", "2014-05-26T07:21:00Z", "2014-05-26T07:22:00Z", "2014-05-26T07:23:00Z", "2014-05-26T07:24:00Z", "2014-05-26T07:25:00Z", "2014-05-26T07:26:00Z", "2014-05-26T07:27:00Z", "2014-05-26T07:28:00Z", "2014-05-26T07:29:00Z", "2014-05-26T07:30:00Z", "2014-05-26T07:31:00Z", "2014-05-26T07:32:00Z", "2014-05-26T07:33:00Z", "2014-05-26T07:34:00Z", "2014-05-26T07:35:00Z", "2014-05-26T07:36:00Z", "2014-05-26T07:37:00Z", "2014-05-26T07:38:00Z", "2014-05-26T07:39:00Z", "2014-05-26T07:40:00Z", "2014-05-26T07:41:00Z", "2014-05-26T07:42:00Z", "2014-05-26T07:43:00Z", "2014-05-26T07:44:00Z", "2014-05-26T07:45:00Z", "2014-05-26T07:46:00Z", "2014-05-26T07:47:00Z", "2014-05-26T07:48:00Z", "2014-05-26T07:49:00Z", "2014-05-26T07:50:00Z", "2014-05-26T07:51:00Z", "2014-05-26T07:52:00Z", "2014-05-26T07:53:00Z", "2014-05-26T07:54:00Z", "2014-05-26T07:55:00Z", "2014-05-26T07:56:00Z", "2014-05-26T07:57:00Z", "2014-05-26T07:58:00Z", "2014-05-26T07:59:00Z"],
    "series": [{
        "name": "vNicInBytes",
        "data": [{
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
        }]
    }, {
        "name": "vNicOutBytes",
        "data": [{
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
        }]
    }, {
        "name": "WebInBytes",
        "data": [{
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
        }]
    }, {
        "name": "WebOutBytes",
        "data": [{
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
        }]
    }]
};

var Data5 = exports.Data5 = {
    "category": ["2014-05-26T07:10:00Z", "2014-05-26T07:11:00Z", "2014-05-26T07:12:00Z", "2014-05-26T07:13:00Z", "2014-05-26T07:14:00Z", "2014-05-26T07:15:00Z", "2014-05-26T07:16:00Z", "2014-05-26T07:17:00Z", "2014-05-26T07:18:00Z", "2014-05-26T07:19:00Z", "2014-05-26T07:20:00Z", "2014-05-26T07:21:00Z", "2014-05-26T07:22:00Z", "2014-05-26T07:23:00Z", "2014-05-26T07:24:00Z", "2014-05-26T07:25:00Z", "2014-05-26T07:26:00Z", "2014-05-26T07:27:00Z", "2014-05-26T07:28:00Z", "2014-05-26T07:29:00Z", "2014-05-26T07:30:00Z", "2014-05-26T07:31:00Z", "2014-05-26T07:32:00Z", "2014-05-26T07:33:00Z", "2014-05-26T07:34:00Z", "2014-05-26T07:35:00Z", "2014-05-26T07:36:00Z", "2014-05-26T07:37:00Z", "2014-05-26T07:38:00Z", "2014-05-26T07:39:00Z", "2014-05-26T07:40:00Z", "2014-05-26T07:41:00Z", "2014-05-26T07:42:00Z", "2014-05-26T07:43:00Z", "2014-05-26T07:44:00Z", "2014-05-26T07:45:00Z", "2014-05-26T07:46:00Z", "2014-05-26T07:47:00Z", "2014-05-26T07:48:00Z", "2014-05-26T07:49:00Z", "2014-05-26T07:50:00Z", "2014-05-26T07:51:00Z", "2014-05-26T07:52:00Z", "2014-05-26T07:53:00Z", "2014-05-26T07:54:00Z", "2014-05-26T07:55:00Z", "2014-05-26T07:56:00Z", "2014-05-26T07:57:00Z", "2014-05-26T07:58:00Z", "2014-05-26T07:59:00Z"],
    "series": [{
        "name": "WebOutBitsPerSecond",
        "data": [{
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
        }]
    }]
};

var Data6 = exports.Data6 = {
    "category": [],
    "series": [{
        "name": "MemUsedBytes",
        "data": []
    }]
};

var Data7 = exports.Data7 = {
    "category": ["2014-05-26T07:10:00Z", "2014-05-26T07:11:00Z", "2014-05-26T07:12:00Z", "2014-05-26T07:13:00Z", "2014-05-26T07:14:00Z", "2014-05-26T07:15:00Z", "2014-05-26T07:16:00Z", "2014-05-26T07:17:00Z", "2014-05-26T07:18:00Z", "2014-05-26T07:19:00Z", "2014-05-26T07:20:00Z", "2014-05-26T07:21:00Z", "2014-05-26T07:22:00Z", "2014-05-26T07:23:00Z", "2014-05-26T07:24:00Z", "2014-05-26T07:25:00Z", "2014-05-26T07:26:00Z", "2014-05-26T07:27:00Z", "2014-05-26T07:28:00Z", "2014-05-26T07:29:00Z", "2014-05-26T07:30:00Z", "2014-05-26T07:31:00Z", "2014-05-26T07:32:00Z", "2014-05-26T07:33:00Z", "2014-05-26T07:34:00Z", "2014-05-26T07:35:00Z", "2014-05-26T07:36:00Z", "2014-05-26T07:37:00Z", "2014-05-26T07:38:00Z", "2014-05-26T07:39:00Z", "2014-05-26T07:40:00Z", "2014-05-26T07:41:00Z", "2014-05-26T07:42:00Z", "2014-05-26T07:43:00Z", "2014-05-26T07:44:00Z", "2014-05-26T07:45:00Z", "2014-05-26T07:46:00Z", "2014-05-26T07:47:00Z", "2014-05-26T07:48:00Z", "2014-05-26T07:49:00Z", "2014-05-26T07:50:00Z", "2014-05-26T07:51:00Z", "2014-05-26T07:52:00Z", "2014-05-26T07:53:00Z", "2014-05-26T07:54:00Z", "2014-05-26T07:55:00Z", "2014-05-26T07:56:00Z", "2014-05-26T07:57:00Z", "2014-05-26T07:58:00Z", "2014-05-26T07:59:00Z"],
    "series": [{
        "name": "MemUsedPercent",
        "data": [{
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
        }]
    }]
};

var Data8 = exports.Data8 = {
    "category": [],
    "series": [{
        "name": "HomeUsedBytes",
        "data": []
    }, {
        "name": "RootUsedBytes",
        "data": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }]
};

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(13);
var normalizeHeaderName = __webpack_require__(408);

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
    adapter = __webpack_require__(244);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(244);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(39)))

/***/ })

},[398])});;