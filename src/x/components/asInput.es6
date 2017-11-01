/**
 * @file components/Input.es6
 * @author leeight
 */

import {nextTick} from 'san';

export function asInput(Klass) {
    return class extends Klass {
        fire(name, event) {
            super.fire(name, event);

            if (name === 'change' && event.value != null) {
                this.dispatch('input-comp-value-changed', {value: event.value});
            }

            if (name === 'input') {
                nextTick(() => {
                    const value = this.data.get('value');
                    this.dispatch('input-comp-value-changed', {value});
                });
            }
        }
    };
}
