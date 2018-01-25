/**
 * @file san-xui/x/forms/builtins/Region.es6
 * @author leeight
 */

import Region from '../../components/Region';

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
