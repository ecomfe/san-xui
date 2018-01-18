/**
 * @file sanx.es6
 * @author leeight
 * @author chenbo09
 *
 * defineComponent方法，增加通用类的mixins和components 。er esui相关的将放在san.es6中添加
 */


import u from 'lodash';
import san from 'san';

import Icon from './x/components/Icon';
import Button from './x/components/Button';
import Clipboard from './x/components/Clipboard';
import Loading from './x/components/Loading';
import Dialog from './x/components/Dialog';

import $data from './mixins/data';
import $locator from './mixins/locator';
import {i18n} from './mixins/filters';
import $shim from './mixins/shim';
import {$post} from './mixins/ajax';
import $toast from './mixins/toast';
import {alert, confirm, plain} from './x/biz/helper';

const kDefaultComponents = {
    'x-icon': Icon,
    'ui-icon': Icon,
    'ui-button': Button,
    'ui-dialog': Dialog,
    'ui-loading': Loading,
    'ui-clipboard': Clipboard
};

function defaultInited() {
    // 把 actionContext 的数据同步到 data 里面去
    // 从而可以从 data 里面获取 url, referer 或者一些 querystring 的信息
    const context = this.data.get('context');
    if (context) {
        u.each(context, (v, k) => this.data.set(k, v));
    }
}

/**
 * Create san component
 *
 * @param {Object} options The component options.
 * @return {Function}
 */
export function defineComponent(options) {
    options.components = u.extend({}, kDefaultComponents, options.components);
    options.filters = u.extend({}, {i18n}, options.filters);

    if (!options.inited) {
        options.inited = function () {
            defaultInited.call(this);
        };
    }
    else {
        const selfInited = options.inited;
        options.inited = function () {
            defaultInited.call(this);
            selfInited.call(this);
        };
    }

    // Apply mixins ...
    const $dialog = {
        $alert: alert,
        $confirm: confirm,
        $plain: plain
    };
    const $ajax = {
        $post
    };
    const $options = u.extend($dialog, $ajax, $toast, $data, $locator, $shim, options);

    return san.defineComponent($options);
}

export function nextTick(fn, thisArg) {
    return san.nextTick(fn, thisArg);
}

export const DataTypes = san.DataTypes;
