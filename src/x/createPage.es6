/**
 * @file inf-ui/x/createPage.es6
 * @author leeight
 */

import {asPage} from 'inf-ui/x/asPage';
import Table from 'inf-ui/x/biz/Table';

export default function createPage(schema) {
    // 如果主体的区域不是一个 Table，而是其它组件，可以考虑使用 asPage 来代替 createPage
    // 因为 asPage 支持额外的参数
    return asPage(schema, Table);
}
