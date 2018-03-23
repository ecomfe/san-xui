/**
 * @file san-xui/x/components/helper.js
 * @author leeight
 */

import ConfirmDialog from './ConfirmDialog';
import AlertDialog from './AlertDialog';
import PlainDialog from './PlainDialog';

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
                // 优先考虑 window 下面的内容，因为有时候 amdModule 是 inf-ria/js! 这种类型的模块
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
