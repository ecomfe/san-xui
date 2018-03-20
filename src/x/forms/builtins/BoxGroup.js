/**
 * @file san-xui/x/forms/builtins/BoxGroup.js
 * @author liyuan
 */

import BoxGroup from '../../components/BoxGroup';

const tagName = 'ui-form-boxgroup';
export default {
    type: 'boxgroup',
    tagName,
    Component: BoxGroup,
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                box-type="{{${prefix}.boxType}}"
                datasource="{{${prefix}.datasource}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
};
