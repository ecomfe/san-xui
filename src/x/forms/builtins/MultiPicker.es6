/**
 * @file inf-ui/x/forms/builtins/MultiPicker.es6
 * @author liyuan
 */

import MultiPicker from 'inf-ui/x/components/MultiPicker';

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
