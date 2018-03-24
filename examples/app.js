/**
 * @file examples/app.js
 * @author leeight
 */
define(function (require) {
    const san = require('san');
    const {Button, alert} = require('san-xui');

    const App = san.defineComponent({
        template: `<template><ui-button on-click="onBtnClick">Hello san-xui</ui-button></template>`,
        components: {
            'ui-button': Button
        },
        onBtnClick() {
            alert('Button clicked');
        }
    });

    function start() {
        const app = new App();
        app.attach(document.getElementById('root'));
    }

    return {start};
});










