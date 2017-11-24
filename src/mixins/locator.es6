/**
 * @file mixins/locator.es6
 * @author leeight
 */
import $ from 'jquery';
import locator from 'er/locator';
import Go from 'inf-ui/x/components/Go';

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
    }
};
