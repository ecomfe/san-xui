/**
 * @file san-xui/x/forms/builtins/SubForm.js
 * @author chenbo09
 */

import SubForm from '../SubForm';

const tagName = 'ui-form-item-sub-form';

export default {
    type: 'sub-form',
    tagName, // eslint-disable-line
    Component: SubForm,
    builder(item, prefix) {
        return `
            <ui-form-item-sub-form
                preview="{{preview}}"
                title="{{${prefix}.form.title}}"
                icon="{{${prefix}.icon}}"
                button-label="{{${prefix}.buttonLabel}}"
                button-width="{{${prefix}.buttonWidth}}"
                width="{{${prefix}.width}}"
                pick-name="{{${prefix}.pickName}}"
                controls="{{${prefix}.form.controls}}"
                formData="{=formData.${item.name}=}"
            />`;
    }
};
