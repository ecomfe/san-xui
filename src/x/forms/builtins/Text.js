/**
 * @file san-xui/x/forms/builtins/Text.js
 * @author leeight
 */

import TextBox from '../../components/TextBox';

const tagName = 'ui-form-textbox';

export default {
    type: 'text',
    tagName,
    Component: TextBox,
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                disabled="{{disabledOn.${item.name}}}"
                type="{{${prefix}.inputType}}"
                multiline="{{${prefix}.multiline}}"
                width="{{${prefix}.width}}"
                placeholder="{{${prefix}.placeholder}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
};
