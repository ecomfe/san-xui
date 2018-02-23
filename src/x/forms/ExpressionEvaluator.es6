/**
 * 本来 san 提供了 san.parseExpr 接口，但是没有开放 san.evalExpr 接口 :-(
 *
 * @file san-xui/x/forms/ExpressionEvaluator.es6
 * @author leeight
 */

import _ from 'lodash';

function expressionComparison(oper, expectedValue, realValue) {
    switch (oper) {
        case '$contains':
            return _.includes(realValue, expectedValue);
        case '$in':
            return _.indexOf(expectedValue, realValue) !== -1;
        case '$nin':
            return _.indexOf(expectedValue, realValue) === -1;
        case '$eq':
            return expectedValue === realValue;
        case '$ne':
            return expectedValue !== realValue;
        case '$gt':
            return realValue > expectedValue;
        case '$lt':
            return realValue < expectedValue;
        case '$gte':
            return realValue >= expectedValue;
        case '$lte':
            return realValue <= expectedValue;
        default:
            return false;
    }
}

/**
 * 计算一个表达式的值
 *
 * @param {string|Object|Array.<Object>} expression The expression.
 * @param {Object} scope The value scope.
 * @return {boolean}
 */
export function evalExpr(expression, scope) {
    if (!expression) {
        return true;
    }

    if (_.isString(expression)) {
        return !!scope.get(expression);
    }

    if (_.isArray(expression)) {
        for (let i = 0, subExpr; subExpr = expression[i]; i++) {
            if (evalExpr(subExpr, scope)) {
                return true;
            }
        }
        return false;
    }

    // {
    //   a: <value>
    //   b: {
    //     <oper1>: <value>,
    //     <oper2>: <value>,
    //     <oper3>: <value>
    //   }
    // }
    // <oper>: [$in, $nin, $eq, $ne, $gt, $lt, $gte, $lte]
    // 如果计算的过程中，有任何一个值是 false，那么就停止计算，返回 false，否则返回 true

    const keys = _.keys(expression);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const realValue = scope.get(key);
        const value = expression[key];
        if (_.isPlainObject(value)) {
            const opers = _.keys(value);
            for (let j = 0; j < opers.length; j++) {
                const oper = opers[j];
                const expectedValue = value[oper];
                if (!expressionComparison(oper, expectedValue, realValue)) {
                    return false;
                }
            }
        }
        else {
            // 如果没有 <oper>，实际上等于
            // a: {
            //   $eq: <value>
            // }
            const expectedValue = value;
            if (!expressionComparison('$eq', expectedValue, realValue)) {
                return false;
            }
        }
    }

    return true;
}
