/**
 * ESUI (Enterprise Simple UI library)
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 页面相关基础库
 * @author otakustay
 */

const {documentElement, body, compatMode} = document;
const viewRoot = compatMode === 'BackCompat' ? body : documentElement;

/**
 * 获取页面宽度
 *
 * @return {number} 页面宽度
 */
export function getWidth() {
    return Math.max(
        (documentElement ? documentElement.scrollWidth : 0),
        (body ? body.scrollWidth : 0),
        (viewRoot ? viewRoot.clientWidth : 0),
        0
    );
}

/**
 * 获取页面高度
 *
 * @return {number} 页面高度
 */
export function getHeight() {
    return Math.max(
        (documentElement ? documentElement.scrollHeight : 0),
        (body ? body.scrollHeight : 0),
        (viewRoot ? viewRoot.clientHeight : 0),
        0
    );
}


/**
 * 获取页面视觉区域宽度
 *
 * @return {number} 页面视觉区域宽度
 */
export function getViewWidth() {
    return viewRoot ? viewRoot.clientWidth : 0;
}

/**
 * 获取页面视觉区域高度
 *
 * @return {number} 页面视觉区域高度
 */
export function getViewHeight() {
    return viewRoot ? viewRoot.clientHeight : 0;
}

/**
 * 获取纵向滚动量
 *
 * @return {number} 纵向滚动量
 */
export function getScrollTop() {
    return window.pageYOffset
        || document.documentElement.scrollTop
        || document.body.scrollTop
        || 0;
}

/**
 * 获取横向滚动量
 *
 * @return {number} 横向滚动量
 */
export function getScrollLeft() {
    return window.pageXOffset
        || document.documentElement.scrollLeft
        || document.body.scrollLeft
        || 0;
}

/**
 * 获取页面纵向坐标
 *
 * @return {number}
 */
export function getClientTop() {
    return document.documentElement.clientTop
        || document.body.clientTop
        || 0;
}

/**
 * 获取页面横向坐标
 *
 * @return {number}
 */
export function getClientLeft() {
    return document.documentElement.clientLeft
        || document.body.clientLeft
        || 0;
}
