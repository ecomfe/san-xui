/**
 * @file san-xui/x/forms/builtins/CKEditor.es6
 * @author liyuan
 */

import CKEditor from '../../components/CKEditor';

const tagName = 'ui-form-ckeditor';
export default {
    type: 'ckeditor',
    tagName,
    Component: CKEditor,
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                options="{{${prefix}.options}}"
                value="{=formData.${item.name}=}"
            />
            <span s-else>{{formData.${item.name}}}</span>`;
    }
};
