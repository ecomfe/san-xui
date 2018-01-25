/**
 * @file san-xui/x/forms/builtins/Select.es6
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
                datasource="{{${prefix}.datasource}}"
                width="{{${prefix}.width}}"
                multi="{{${prefix}.multi}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
};
