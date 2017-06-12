/**
 * @file mixins/locator.es6
 * @author leeight
 */
import locator from 'er/locator';

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
    }
};
