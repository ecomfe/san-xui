/**
 * @file mixins/filters.es6
 * @author chenbo09
 *
 */

import _ from 'inf-i18n';
import u from 'underscore';

export function i18n(value, ...args) {
    if (args.length === 0) {
        return _(value);
    }
    // 默认的underscore 没有sprintf函数。依赖于bat-ria的extension中增加了该方法。demo中暂不放这个例子。
    return u.sprintf(_(value), args);
}
