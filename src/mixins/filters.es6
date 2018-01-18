/**
 * @file mixins/filters.es6
 * @author chenbo09
 *
 */

import _ from 'inf-i18n';

export function i18n(value, ...args) {
    if (args.length === 0) {
        return _(value);
    }

    let counter = 0;
    return String(value).replace(/%s/g, word => args[counter++]);
}
