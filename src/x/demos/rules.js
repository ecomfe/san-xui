/**
 * @file demos/rules.js
 * @author leeight
 */

export function noInvalidChar(label) {
    return {
        validator(rule, value, callback) {
            if (/[。~!@#$%\^\+\*&\\\/\?\|:\.<>{}()';="]/.test(value)) {
                return callback(label + '不能包含特殊字符');
            }
            callback();
        }
    };
}

export function password(label) {
    return {
        validator(rule, value, callback) {
            let a = [/[A-Z]/, /[a-z]/, /\d/];
            let b = true;
            let c = a.length;
            for (;c;) {
                b = a[--c].test(value) && b;
            }
            if (!b) {
                return callback(label + '必须包含数字、大小写英文字母');
            }
            callback();
        }
    };
}

export function equals(key) {
    return {
        validator(rule, value, callback, source) {
            if (value !== source[key]) {
                return callback('两次输入的内容不一致');
            }
            callback();
        }
    };
}

