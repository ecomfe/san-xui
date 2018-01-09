/**
 * @file inf-ui/x/forms/builtins/Region.es6
 * @author leeight
 */

import Region from 'inf-ui/x/components/Region';

const tagName = 'ui-form-region';
export default {
    type: 'region',
    tagName,
    Component: Region,
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
