/**
 * @file san-xui/x/forms/builtins/Switch.es6
 * @author leeight
 */

import Switch from '../../components/Switch';

const tagName = 'ui-form-switch';
export default {
    type: 'switch',
    tagName,
    Component: Switch,
    builder(item, prefix) {
        return `
            <${tagName} s-if="!preview" checked="{=formData.${item.name}=}" />
            <span s-else>{{formData.${item.name} === true ? 'ON' : 'OFF'}}</span>`;
    }
};
