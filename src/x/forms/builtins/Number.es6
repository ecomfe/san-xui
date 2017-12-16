/**
 * @file inf-ui/x/forms/builtins/Number.es6
 * @author leeight
 */

import TextBox from 'inf-ui/x/components/TextBox';

const tagName = 'ui-form-textbox';
export default {
    type: 'number',
    tagName,
    Component: TextBox,
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                type="number"
                width="{{${prefix}.width}}"
                placeholder="{{${prefix}.placeholder}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
};
