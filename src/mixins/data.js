/**
 * @file mixins/data.js
 * @author leeight
 */

export default {
    $get(key) {
        if (this.data) {
            return this.data.get(key);
        }
    },

    $set(key, value) {
        if (this.data) {
            // 有可能 xhr 返回之后，component 已经 disposed 了，这里需要
            // 保证 component disposed 之后不会出错
            this.data.set(key, value);
        }
    }
};
