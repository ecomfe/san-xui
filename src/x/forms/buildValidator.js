/**
 * @file san-xui/x/forms/buildValidator.js
 * @author leeight
 */

import _ from 'lodash';

function jsonValidator(errorMessage) {
    return {
        type: 'string',
        validator(rule, value, callback) {
            try {
                JSON.parse(value);
                callback();
            }
            catch (ex) {
                callback(errorMessage || 'JSON不合法');
            }
        }
    };
}

function toAsyncValidatorRule(type, param, message) {
    switch (type) {
        case 'isEmail':
            return {type: 'email', message: message || '邮箱格式不正确'};
        case 'isUrl':
            return {type: 'url', message: message || 'URL格式不正确'};
        case 'isNumeric':
            // 这里用 {type: 'number'} 有些问题
            // 因为输入组件可能返回的是 string 类型，如果 string 类型的值交给 validator 是无法通过的
            // return {type: 'number', message: message || '请输入数字'};
            return {type: 'string', pattern: /^\d+(\.\d+)?$/, message: message || '请输入数字'};
        case 'isInt':
            return {type: 'string', pattern: /^\d+$/, message: message || '请输入整数'};
        case 'isFloat':
            return {type: 'string', pattern: /^\d+?\.\d+$/, message: message || '请输入浮点数'};
        case 'isBool':
            return {type: 'boolean', message};
        case 'isJson':
            return jsonValidator(message);
        case 'isAlphanumeric':
            return {type: 'string', pattern: /^[a-zA-Z0-9]+$/, message: message || '只能输入字母或者数字'};
        case 'minLength':
            return {type: 'string', min: parseInt(param, 10), message: message || `最少输入${param}个字符`};
        case 'maxLength':
            return {type: 'string', max: parseInt(param, 10), message: message || `最多输入${param}个字符`};
        case 'minimum':
            return {type: 'number', min: parseFloat(param, 10), message: message || `最小值${param}`};
        case 'maximum':
            return {type: 'number', max: parseFloat(param, 10), message: message || `最大值${param}`};
        case 'decimal':
            // 简化版decimal 认为scale需要大于0 且暂不支持负号
            let [precision = '12', scale = '2'] = param.split(',');
            precision = parseInt(precision, 10);
            scale = parseInt(scale, 10);
            if (precision && scale && precision > scale) {
                return {
                    type: 'string',
                    pattern: RegExp(`^\\d{1,${precision - scale}}(\\.\\d{0,${scale}})?$`),
                    message
                };
            }
            // 不符合条件就返回浮点型
            return {type: 'string', pattern: /^\d+?\.\d+$/, message: '请输入浮点数'};
        case 'matchRegexp':
            return {type: 'string', pattern: new RegExp(param), message};
        default:
            return null;
    }
}

/**
 * 从 schema 里面的配置，生成表单可用的验证逻辑
 * 更多的内容请参考：http://amis.baidu.com/docs/renderers 提到的 validations 部分
 *
 * 当前支持的规则如下：
 * matchRegexp:/foo/ 必须命中某个正则
 * minLength:length 最小长度
 * maxLength:length 最大长度
 * maximum:length 最大值
 * minimum:length 最小值
 * isEmail 必须是 Email
 * isUrl 必须是 Url
 * isNumeric 必须是 数值
 * isAlphanumeric 必须是 字母或者数字
 * isInt 必须是 整形
 * isFloat 必须是 浮点形
 * isJson 是否是合法的 Json 字符串
 *
 * @param {Array.<string>} validations 数组（为了避免正则里面出现 , 导致切分的问题，这里是数组，而不是类似 amis 里面的字符串）.
 * @param {Object?} validationErrors 针对每个规则配置的失败之后的错误信息，如果没有的话，就用默认的逻辑来生成
 *
 * @return {Array.<Object>}
 */
export function buildValidator(validations, validationErrors) {
    if (!validationErrors) {
        validationErrors = {}; // eslint-disable-line
    }

    const rules = [];

    _.each(validations, item => {
        let type = item;
        let param = null;
        let message = validationErrors[type];
        if (/^(matchRegexp|minLength|maxLength|maximum|minimum|decimal):/.test(item)) {
            type = RegExp.$1;
            param = item.substr(type.length + 1);
            if (!param) {
                // 如果没有所需要的参数值，直接忽略这条规则即可
                return;
            }
            message = validationErrors[type];
        }
        const rule = toAsyncValidatorRule(type, param, message);
        if (rule) {
            rules.push(rule);
        }
    });

    return rules;
}
