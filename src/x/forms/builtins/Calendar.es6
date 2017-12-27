/**
 * @file inf-ui/x/forms/builtins/Calendar.es6
 * @author leeight
 */

import Calendar from 'inf-ui/x/components/Calendar';

const tagName = 'ui-form-calendar';
export default {
    type: 'calendar',
    tagName,
    Component: Calendar,
    builder(item, prefix) {
        return `
            <${tagName} s-if="!preview"
                range="{{${prefix}.range}}"
                prev="{{${prefix}.prev}}"
                next="{{${prefix}.next}}"
                value="{=formData.${item.name}=}" />
            <span s-else>{{formData.${item.name} | datetime(${item.format})}}</span>`;
    }
};
