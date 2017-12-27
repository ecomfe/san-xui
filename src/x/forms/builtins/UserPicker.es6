/**
 * @file inf-ui/x/forms/builtins/UserPicker.es6
 * @author liyuan
 */

import UserPicker from 'inf-ui/x/components/UserPicker';

const tagName = 'ui-form-userpicker';
export default {
    type: 'userpicker',
    tagName,
    Component: UserPicker,
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                search-requester="{{${prefix}.searchRequester}}"
                search-api="{{${prefix}.searchApi}}"
                keyword-name="{{${prefix}.keywordName}}"
                keyword="{{${prefix}.keyword}}"
                layer-width="{{${prefix}.layerWidth}}"
                auto-layer-width="{{${prefix}.autoLayerWidth}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
};
