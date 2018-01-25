/**
 * @file san-xui/x/forms/builtins/RangeCalendar.es6
 * @author liyuan
 */

import RangeCalendar from '../../components/RangeCalendar';

const tagName = 'ui-form-rangecalendar';
export default {
    type: 'rangecalendar',
    tagName,
    Component: RangeCalendar,
    builder(item, prefix) {
        return `
            <${tagName}
                s-if="!preview"
                range="{{${prefix}.range}}"
                shortcut="{{${prefix}.shortcut}}"
                time="{{${prefix}.time}}"
                value="{=formData.${item.name}=}"/>
            <span s-else>
                {{formData.${item.name}.begin | datetime(${item.format})}}
                -
                {{formData.${item.name}.end | datetime(${item.format})}}
            </span>`;
    }
};
