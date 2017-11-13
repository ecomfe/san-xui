/**
 * @file mixins/ef.es6
 * @author leeight
 *
 * 增加新api供处理特殊逻辑
 */

export default {
    /**
     * 仿照san的dispatch方法，仅限于san调用san的dialog同时使用了LegacyActionAdapter时使用
     * 目的: 由于ActionLoader中用er创建了一个san的页面 从而导致原生的dispatch无法发送，fire事件在
     * LegacyActionAdapter中需统一转化成dispatch才能使动态创建的dialog发出的事件被主页面获取。
     * 典型场景:
     * 1.已经打开的dialog中，希望告诉主页面继续打开新的dialog
     * 2.dialog中的修改，希望在关闭页面之前就能告知主页面
     * @param {String} 事件类型
     * @param {Object} value 事件携带的参数
     */
    $dispatch(legacyActionFireCustomType, value) {
        const opt = {legacyActionFireCustomType, value};
        this.fire('legacyactioncustomevent', opt);
    }
};
