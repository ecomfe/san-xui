/**
 * @file mixins/locator.es6
 * @author leeight
 */
import $ from 'jquery';
import locator from 'er/locator';
import URL from 'er/URL';

import Go from '../x/components/Go';

export default {

    /**
     * Redirect to another page
     *
     * @param {string|Object} value The locator redirect url or options.
     */
    $redirect(value) {
        if (typeof value === 'string') {
            locator.redirect(value);
            return;
        }
        const {url, options} = value;
        locator.redirect(url, options);
    },

    /**
     * Reload current page
     */
    $reload() {
        locator.reload();
    },

    /**
     * 跨模块的跳转
     *
     * this.$go('/iam/#/user/account/list');
     *
     * @param {string} link 要跳转的地址.
     */
    $go(link) {
        const target = $(`<a href="${link}"></a>`);
        const event = $.Event('click', {target, currentTarget: target});  // eslint-disable-line
        Go.switchHandler(event, this);
    },

    /**
     * 获取当前页面的路由信息.
     *
     * const $route = this.$route();
     * console.log($route.path);
     * console.log($route.query);
     *
     * @param {boolean} disableCache 是否允许缓存数据.
     * @return {{path: string, query: Object}}
     */
    $route(disableCache = false) {
        if (!disableCache && this.__$route) {
            return this.__$route;
        }
        const url = URL.parse(location.hash.substr(1));
        const path = url.getPath();
        const query = url.getQuery();
        this.__$route = {
            path,
            query
        };
        return this.__$route;
    }
};
