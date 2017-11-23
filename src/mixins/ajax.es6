/**
 * @file mixins/ajax.es6
 * @author leeight
 */

import Promise from 'promise';
import io from 'bat-ria/io/serverIO';

export function $post(url, data, options) {
    if (!data) {
        data = '';
    }

    if (!options) {
        options = {'X-silence': true, 'x-silent': true};
    }

    return new Promise((resolve, reject) =>
        io.post(url, data, options).then(resolve).fail(reject));
}

