/**
 * @file san-xui/x/forms/builtins/StaticItem.js
 * @author leeight
 */

import StaticItem from '../StaticItem';

const tagName = 'ui-form-static';

export default {
    type: 'static',
    tagName,
    Component: StaticItem,
    builder(item, prefix) {
        return `
            <${tagName}
                mapper="{{${prefix}.mapper}}"
                datasource="{{${prefix}.datasource}}"
                value="{{formData.${item.name}}}"
            />`;
    }
};
