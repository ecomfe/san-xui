/**
 * @file mixins/ajax.es6
 * @author leeight
 */

import axios from 'axios';

export function $post(url, data, options) {
    return axios.post(url, data, options);
}

