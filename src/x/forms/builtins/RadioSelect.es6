/**
 * @file inf-ui/x/forms/builtins/RadioSelect.es6
 * @author liyuan
 */

import RadioSelect from 'inf-ui/x/components/RadioSelect';

const tagName = 'ui-form-radioselect';
export default {
    type: 'radioselect',
    tagName,
    Component: RadioSelect,
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                datasource="{{${prefix}.datasource}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
};
