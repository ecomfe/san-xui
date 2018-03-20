/**
 * @file san-xui/x/forms/builtins/Dragger.js
 * @author liyuan
 */

import Dragger from '../../components/Dragger';

const tagName = 'ui-form-dragger';
export default {
    type: 'dragger',
    tagName,
    Component: Dragger,
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                min="{{${prefix}.min}}"
                max="{{${prefix}.max}}"
                length="{{${prefix}.length}}"
                unit="{{${prefix}.unit}}"
                step="{{${prefix}.step}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
};
