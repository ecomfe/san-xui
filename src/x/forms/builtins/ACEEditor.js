/**
 * @file san-xui/x/forms/builtins/ACEEditor.js
 * @author liyuan
 */

import ACEEditor from '../../components/ACEEditor';

const tagName = 'ui-form-aceeditor';
export default {
    type: 'aceeditor',
    tagName,
    Component: ACEEditor,
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                width="{{${prefix}.width}}"
                height="{{${prefix}.height}}"
                mode="{{${prefix}.mode}}"
                theme="{{${prefix}.theme}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
};
