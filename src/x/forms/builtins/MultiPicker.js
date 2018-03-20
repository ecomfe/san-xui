/**
 * @file san-xui/x/forms/builtins/MultiPicker.js
 * @author liyuan
 */

import MultiPicker from '../../components/MultiPicker';

const tagName = 'ui-form-multipicker';
export default {
    type: 'multipicker',
    tagName,
    Component: MultiPicker,
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                datasource="{{${prefix}.datasource}}"
                loader="{{${prefix}.loader}}"
                layer-width="{{${prefix}.layerWidth}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
};
