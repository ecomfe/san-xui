/**
 * @file inf-ui/x/forms/builtins/RichTextEditor.es6
 * @author liyuan
 */

import RichTextEditor from 'inf-ui/x/components/RichTextEditor';

const tagName = 'ui-form-richtexteditor';
export default {
    type: 'richtexteditor',
    tagName,
    Component: RichTextEditor,
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                options="{{${prefix}.options}}"
                width="{{${prefix}.width}}"
                height="{{${prefix}.height}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
};
