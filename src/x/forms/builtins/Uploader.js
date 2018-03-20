/**
 * @file san-xui/x/forms/builtins/Uploader.js
 * @author leeight
 */

import Uploader from '../Uploader';

const tagName = 'ui-form-uploader';
export default {
    type: 'uploader',
    tagName,
    Component: Uploader,
    builder(item, prefix) {
        return `
            <${tagName} s-if="!preview" value="{=formData.${item.name}=}" />
            <a s-else href="{{formData.${item.name}}}" target="_blank">
                {{formData.${item.name} | filename}}
            </a>`;
    }
};
