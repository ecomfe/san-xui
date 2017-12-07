/**
 * @file sanPage.es6
 * @author leeight
 */

import u from 'underscore';
import san from 'san';
import Promise from 'promise';
import locator from 'er/locator';
import Action from 'er/Action';
import Model from 'er/Model';
import View from 'er/View';

import createPage from './x/createPage';

class SanView extends View {
    constructor(page) {
        super();
        this.page = page;
    }

    render() {
        const container = this.getContainerElement();
        if (container) {
            container.innerHTML = '';
            this.page.attach(container);
        }
        this.enterDocument();
    }

    dispose() {
        this.page.dispose();
        const container = this.getContainerElement();
        if (container) {
            container.innerHTML = '';
        }
    }
}

function buildSanPage(Component) {
    if (Component.__sanPage) {
        return Component.__sanPage;
    }

    const sanPage = san.defineComponent({
        template: '<template><san-page context="{{context}}"/></template>',
        components: {
            'san-page': Component
        },
        messages: {
            redirect({value}) {
                if (typeof value === 'string') {
                    locator.redirect(value);
                    return;
                }
                const {url, options} = value;
                locator.redirect(url, options);
            },
            reload() {
                locator.reload();
            }
        }
    });
    Component.__sanPage = sanPage;
    return sanPage;
}

class SanAction extends Action {
    constructor(SanPage) {
        super();
        this.SanPage = SanPage;
    }

    createModel(context) {
        // 兼容性考虑而已
        return new Model(context);
    }

    createView() {
        return new SanView(this.page);
    }

    enter(actionContext) {
        const SanPage = this.SanPage;
        const context = u.extend({}, actionContext && actionContext.args);
        this.page = new SanPage({data: {context}});
        return super.enter(actionContext);
    }
}

/**
 * initData 里面的几个关键字需要注意
 *
 * 0. context
 * 1. container
 * 2. isChildAction
 * 3. referrer: er/URL
 * 4. url: er/URL
 * 5. 其它URL参数里面的东西
 *
 * @param {string} moduleId The top level module id.
 * @return {Object}
 */
export default function sanPage(moduleId) {
    return {
        createRuntimeAction(actionContext) {
            return new Promise((resolve, reject) => {
                window.require([moduleId], Component => {
                    if (typeof Component === 'function') {
                        const SanPage = buildSanPage(Component);
                        resolve(new SanAction(SanPage));
                    }
                    else if (typeof Component === 'object') {
                        const schema = Component;
                        const SanPage = buildSanPage(createPage(schema));
                        resolve(new SanAction(SanPage));
                    }
                    else {
                        throw new Error('invalid component type');
                    }
                });
            });
        }
    };
}
