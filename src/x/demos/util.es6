/**
 * @file demos/util.es6
 * @author leeight
 */

import Promise from 'promise';

class SimpleAction {
    constructor(actionContext) {
        this.context = actionContext;
    }
    enter(actionContext) {
        if (Math.random() > .8) {
            return Promise.reject(new Error('RANDOM error on entering action...'));
        }

        const container = actionContext.container;
        const containerElement = document.getElementById(container);
        if (containerElement) {
            const now = new Date();
            const url = actionContext.url.toString();
            containerElement.innerHTML = `
                <h1>Simple Action Loaded!</h1>
                <h2>Url: ${url}</h2>
                <h3>Time: ${now}</h3>
            `;
            return Promise.resolve();
        }
        return Promise.reject(new Error('No such element, id = ' + container));
    }
}

export function createAction(ms = 350) {
    return {
        createRuntimeAction(actionContext) {
            return new Promise((resolve, reject) => {
                setTimeout(() => resolve(new SimpleAction(actionContext)), ms);
            });
        }
    };
}


