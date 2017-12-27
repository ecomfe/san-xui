/**
 * @file inf-ui/x/forms/builtins/BoxGroup.es6
 * @author liyuan
 */

import BoxGroup from 'inf-ui/x/components/BoxGroup';

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
