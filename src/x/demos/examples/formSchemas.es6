/**
 * @file inf-ui/x/demos/examples/formSchemas.es6
 * @author leeight
 */

export const kDefaultSchema = {
    '//': '暂时支持 6 种控件类型，如果需要扩展，调用 registerFormItem 即可',
    'controls': [
        {
            label: '文本类型',
            placeholder: '请输入姓名',
            type: 'text',
            required: true,
            name: 'aText',
            validations: [
                'minLength:10',
                'maxLength:20',
                'isUrl'
            ]
        },
        {
            label: '多行文本类型',
            placeholder: '请输入描述信息',
            type: 'text',
            multiline: true,
            required: true,
            name: 'aMultilineText'
        },
        {
            label: '数值类型',
            placeholder: '请输入年龄',
            type: 'number',
            required: true,
            name: 'bNumber',
            validations: ['minimum:10', 'maximum:30'],
            validationErrors: {
                minimum: '年龄最小值10',
                maximum: '年龄最大值30'
            }
        },
        {
            label: 'SELECT',
            type: 'select',
            required: true,
            name: 'cSelect',
            datasource: [
                {text: '选型1', value: 'O1'},
                {text: '选型2', value: 'O2'},
                {text: '选型3', value: 'O3'},
                {text: '选型4', value: 'O4'}
            ]
        },
        {
            label: '多选(MULTI SELECT)',
            type: 'select',
            required: true,
            name: 'dSelect',
            multi: true,
            width: 200,
            datasource: [
                {text: '选型1', value: 'O1'},
                {text: '选型2', value: 'O2'},
                {text: '选型3', value: 'O3'},
                {text: '选型4', value: 'O4'}
            ]
        },
        {
            label: '日期',
            type: 'calendar',
            required: true,
            name: 'eCalendar'
        },
        {
            label: '文件上传',
            type: 'uploader',
            required: true,
            name: 'fUploader'
        },
        {
            label: '开关',
            type: 'switch',
            required: true,
            name: 'gSwitch'
        }
    ]
};

export const kSchema$eq = {
    '//': '演示 $eq, $ne 的用法',
    'controls': [
        {
            label: 'SELECT',
            type: 'select',
            name: 'aSelect',
            datasource: [
                {text: 'A', value: 'A'},
                {text: 'B', value: 'B'},
                {text: 'C', value: 'C'},
                {text: 'D', value: 'D'}
            ]
        },
        {
            label: '选择"A"的时候出现',
            type: 'text',
            name: 'bText',
            visibleOn: {
                aSelect: 'A'
            }
        },
        {
            label: '选择"B"的时候出现',
            type: 'text',
            name: 'cText',
            visibleOn: {
                aSelect: {
                    $eq: 'B'
                }
            }
        },
        {
            label: '不等于"C"的时候出现',
            type: 'text',
            name: 'dText',
            visibleOn: {
                aSelect: {
                    $ne: 'C'
                }
            }
        }
    ]
};

export const kSchema$in = {
    '//': '演示 $in, $nin 的用法',
    'controls': [
        {
            label: 'SELECT',
            type: 'select',
            name: 'aSelect',
            datasource: [
                {text: 'A', value: 'A'},
                {text: 'B', value: 'B'},
                {text: 'C', value: 'C'},
                {text: 'D', value: 'D'}
            ]
        },
        {
            label: '选择"A" / "B" 的时候出现',
            type: 'text',
            name: 'bText',
            visibleOn: {
                aSelect: {
                    $in: ['A', 'B']
                }
            }
        },
        {
            label: '选择"C" / "D" 的时候出现',
            type: 'text',
            name: 'cText',
            visibleOn: {
                aSelect: {
                    $nin: ['A', 'B']
                }
            }
        }
    ]
};


export const kSchema$gt = {
    '//': '演示 $gt, $gte, $lt, $lte 的用法',
    'controls': [
        {
            label: '数值类型',
            type: 'number',
            name: 'aNumber'
        },
        {
            label: '大于 10 的时候出现',
            type: 'text',
            name: 'bText',
            visibleOn: {
                aNumber: {
                    $gt: 10
                }
            }
        },
        {
            label: '大于等于 10 的时候出现',
            type: 'text',
            name: 'cText',
            visibleOn: {
                aNumber: {
                    $gte: 10
                }
            }
        }
    ]
};


export const kSchema$validations = {
    '//': '演示验证规则的用法',
    'controls': [
        {
            label: 'minLength,maxLength',
            type: 'text',
            name: 'username',
            required: true,
            validations: [
                'minLength:5',
                'maxLength:20'
            ]
        },
        {
            label: 'maximum,minimum',
            type: 'number',
            name: 'age',
            required: true,
            validations: [
                'minimum:10',
                'maximum:30'
            ]
        },
        {
            label: 'matchRegexp',
            type: 'text',
            name: 'matchRegexp',
            required: true,
            validations: [
                'matchRegexp:^\\d+$'
            ]
        },
        {
            label: 'isEmail',
            type: 'text',
            name: 'isEmail',
            required: true,
            validations: ['isEmail']
        },
        {
            label: 'isUrl',
            type: 'text',
            name: 'isUrl',
            required: true,
            validations: ['isUrl']
        },
        {
            label: 'isNumeric',
            type: 'text',
            name: 'isNumeric',
            required: true,
            validations: ['isNumeric']
        },
        {
            label: 'isAlphanumeric',
            type: 'text',
            name: 'isAlphanumeric',
            required: true,
            validations: ['isAlphanumeric']
        },
        {
            label: 'isInt',
            type: 'text',
            name: 'isInt',
            required: true,
            validations: ['isInt']
        },
        {
            label: 'isFloat',
            type: 'text',
            name: 'isFloat',
            required: true,
            validations: ['isFloat']
        },
        {
            label: 'isBool',
            type: 'switch',
            name: 'isBool',
            required: true,
            validations: ['isBool']
        },
        {
            label: 'isJson',
            type: 'text',
            multiline: true,
            name: 'isJson',
            required: true,
            validations: ['isJson']
        }
    ]
};
