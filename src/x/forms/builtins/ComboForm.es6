/**
 * @file san-xui/x/forms/builtins/ComboForm.es6
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
                s-if="!preview"
                multiple="{{${prefix}.multiple}}"
                controls="{{${prefix}.controls}}"
                max="{{${prefix}.max}}"
                min="{{${prefix}.min}}"
                width="{{${prefix}.width}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
};
