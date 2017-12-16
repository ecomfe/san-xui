/**
 * @file inf-ui/x/forms/createForm.es6
 * @author leeight
 */

import {asForm, registerFormItem} from './asForm';
import Number from './builtins/Number';
import Text from './builtins/Text';
import Select from './builtins/Select';
import Calendar from './builtins/Calendar';
import Uploader from './builtins/Uploader';
import Switch from './builtins/Switch';

registerFormItem(Number);
registerFormItem(Text);
registerFormItem(Select);
registerFormItem(Calendar);
registerFormItem(Uploader);
registerFormItem(Switch);

export function createForm(schema) {
    return asForm(schema);
}
