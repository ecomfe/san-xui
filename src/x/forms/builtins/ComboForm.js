/**
 * @file san-xui/x/forms/builtins/ComboForm.js
 * @author leeight
 */

import ComboForm from '../ComboForm';

const tagName = 'ui-combo';

export default {
    type: 'combo',
    tagName,
    Component: ComboForm,
    builder(item, prefix) {
        return `
            <${tagName}
                preview="{{preview}}"
                preview-cols="{{${prefix}.previewCols}}"
                multiple="{{${prefix}.multiple}}"
                controls="{{${prefix}.controls}}"
                max="{{${prefix}.max}}"
                min="{{${prefix}.min}}"
                width="{{${prefix}.width}}"
                value="{=formData.${item.name}=}"
            >
            ${item.slot}
            </${tagName}>`;
    }
};
