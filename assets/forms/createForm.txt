/**
 * @file san-xui/x/forms/createForm.es6
 * @author leeight
 */

import {asForm, registerFormItem} from './asForm';
import Number from './builtins/Number';
import Text from './builtins/Text';
import Select from './builtins/Select';
import Calendar from './builtins/Calendar';
import Uploader from './builtins/Uploader';
import Switch from './builtins/Switch';
import BoxGroup from './builtins/BoxGroup';
import RangeCalendar from './builtins/RangeCalendar';
import NumberTextline from './builtins/NumberTextline';
import Dragger from './builtins/Dragger';
import RadioSelect from './builtins/RadioSelect';
import Tip from './builtins/Tip';
import MultiPicker from './builtins/MultiPicker';
import Region from './builtins/Region';
import UserPicker from './builtins/UserPicker';
import ACEEditor from './builtins/ACEEditor';
import CKEditor from './builtins/CKEditor';
import RichTextEditor from './builtins/RichTextEditor';
import ComboForm from './builtins/ComboForm';

registerFormItem(ComboForm);
registerFormItem(Number);
registerFormItem(Text);
registerFormItem(Select);
registerFormItem(Calendar);
registerFormItem(Uploader);
registerFormItem(Switch);
registerFormItem(BoxGroup);
registerFormItem(NumberTextline);
registerFormItem(Dragger);
registerFormItem(RadioSelect);
registerFormItem(Tip);
registerFormItem(MultiPicker);
registerFormItem(Region);
registerFormItem(UserPicker);
registerFormItem(RangeCalendar);
registerFormItem(ACEEditor);
registerFormItem(CKEditor);
registerFormItem(RichTextEditor);

export function createForm(schema) {
    return asForm(schema);
}
