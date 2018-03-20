/**
 * @file san-xui/x/forms/builtins/Select.js
 * @author leeight
 */

import Select from '../../components/Select';

const tagName = 'ui-form-select';
export default {
    type: 'select',
    tagName,
    Component: Select,
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                disabled="{{disabledOn.${item.name}}}"
                datasource="{{${prefix}.datasource}}"
                width="{{${prefix}.width}}"
                multi="{{${prefix}.multi}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
};
