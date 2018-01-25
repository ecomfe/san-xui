/**
 * @file san-xui/x/forms/builtins/Tip.es6
 * @author liyuan
 */

import Tip from '../../components/Tip';

const tagName = 'ui-form-tip';
export default {
    type: 'tip',
    tagName,
    Component: Tip,
    builder(item, prefix) {
        return `
            <${tagName}
                message="{{${prefix}.message}}"
                position="{{${prefix}.position}}"
            />`;
    }
};
