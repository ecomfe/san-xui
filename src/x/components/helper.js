/**
 * @file san-xui/x/components/helper.js
 * @author leeight
 */

import ConfirmDialog from './ConfirmDialog';
import AlertDialog from './AlertDialog';
import PlainDialog from './PlainDialog';

const kAmdPluginId = 'san-xui-loader-' + new Date().getTime().toString(36);

function jsLoader() {
    return {
        load(resourceId, req, load) {
            let script = document.createElement('script');
            script.src = req.toUrl(resourceId);
            script.async = true;
            if (script.readyState) {
                script.onreadystatechange = onload;
            }
            else {
                script.onload = onload;
            }

            function onload() {
                let readyState = script.readyState;
                if (
                    typeof readyState === 'undefined'
                    || /^(loaded|complete)$/.test(readyState)
                ) {
                    script.onload = script.onreadystatechange = null;
                    script = null;
                    load(true);
                }
            }

            let parent = document.getElementsByTagName('head')[0]
                || document.body;
            parent.appendChild(script);
            parent = null;
        }
    };
}

function cssLoader() {
    return {
        load(resourceId, req, load) {
            let link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('type', 'text/css');
            link.setAttribute('href', req.toUrl(resourceId));

            let parent = document.getElementsByTagName('head')[0]
                || document.body;
            parent.appendChild(link);

            parent = null;
            link = null;

            load(true);
        }
    };
}

if (typeof window.define === 'function' && window.define.amd) {
    window.define(`${kAmdPluginId}/js`, jsLoader);
    window.define(`${kAmdPluginId}/css`, cssLoader);
}

export function js(resourceId) {
    return `${kAmdPluginId}/js!${resourceId}`;
}

export function css(resourceId) {
    return `${kAmdPluginId}/css!${resourceId}`;
}

export function loadThirdParty(globalKey, amdModules, delay = 0) {
    // 首先检查是否已经直接在页面中引入了，如果引入了，就直接使用全局的对象即可
    // 比如 echarts, WebUploader 等等
    const keys = typeof globalKey === 'string' ? [globalKey] : globalKey;
    const globalVars = [];
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const globalVar = window[key];
        if (globalVar != null) {
            globalVars.push(globalVar);
        }
        else {
            // 存在一些没有加载成功的情况，直接忽略掉吧
            globalVars.length = 0;
            break;
        }
    }

    if (globalVars.length) {
        return new Promise(resolve => {
            if (keys.length > 1) {
                resolve(globalVars);
            }
            else {
                resolve(globalVars[0]);
            }
        });
    }

    return new Promise((resolve, reject) => {
        // 因为 amd 加载成功之后会 cache，所以后续执行的时候不会发请求
        // 所以不需要往 window 下面添加新的对象
        setTimeout(() => window.require(amdModules, (...modules) => {
            const globalVars = [];
            for (let i = 0; i < modules.length; i++) {
                const key = keys[i];
                // 优先考虑 window 下面的内容，因为有时候 amdModule 是 js() 这种类型的模块
                globalVars.push(window[key] || modules[i]);
            }
            if (keys.length > 1) {
                resolve(globalVars);
            }
            else {
                resolve(globalVars[0]);
            }
        }), delay);
    });
}

export function asPromise(dialog) {
    return new Promise((resolve, reject) => {
        dialog.on('confirm', () => {
            resolve();
            dialog.dispose();
        });
        dialog.on('close', () => {
            reject();
            dialog.dispose();
        });
    });
}

export function displayDialog(DialogComponent, data = {}) {
    if (typeof data === 'string') {
        data = {message: data};
    }
    const dialog = new DialogComponent({data});
    dialog.attach(document.body);
    return asPromise(dialog);
}

export function plain(data) {
    return displayDialog(PlainDialog, data);
}

export function alert(data) {
    return displayDialog(AlertDialog, data);
}

export function confirm(data) {
    return displayDialog(ConfirmDialog, data);
}
