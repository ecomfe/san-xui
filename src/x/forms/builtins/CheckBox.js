/**
 * @file san-xui/x/forms/builtins/CheckBox.js
 * @author chenbo09
 */

import CheckBox from '../../components/CheckBox';

const tagName = 'ui-form-checkbox';
export default {
    type: 'checkbox',
    tagName,
    Component: CheckBox,
    builder(item, prefix) {
        return `
            <${tagName}
                disabled="{{preview}}"
                title="{{${prefix}.title}}"
                checked="{=formData.${item.name}=}"
            />`;
    }
};
