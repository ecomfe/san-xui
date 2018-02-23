/**
 * @file san-xui/x/forms/builtins/UserPicker.es6
 * @author liyuan
 */

import UserPicker from '../../components/UserPicker';

const tagName = 'ui-form-userpicker';
export default {
    type: 'userpicker',
    tagName,
    Component: UserPicker,
    builder(item, prefix) {
        return `
            <${tagName}
                preview="{{preview}}"
                search-requester="{{${prefix}.searchRequester}}"
                search-api="{{${prefix}.searchApi}}"
                keyword-name="{{${prefix}.keywordName}}"
                keyword="{{${prefix}.keyword}}"
                max="{{${prefix}.max}}"
                width="{{${prefix}.width}}"
                disabled="{{${prefix}.disabled}}"
                layer-width="{{${prefix}.layerWidth}}"
                auto-layer-width="{{${prefix}.autoLayerWidth}}"
                value="{=formData.${item.name}=}"
            />
        `;
    }
};
