/**
 * @description: 数组-->树形数据
 * @param data  需要转化的数组
 * @param nodeKy 当前节点Key值
 * @param parentKey 父节点Key值
 * @return result 转化之后的树形数据
 */

export function toTree (data, nodeKy, parentKey) {
    debugger
    if (!Array.isArray(data)) {
        return [];
    }
    const flag = data.every(item => {
        return nodeKy in item && parentKey in item;
    });
    if (!flag) throw new Error('invalid parameter');
    const result = [];
    const map = {};
    data.forEach(item => {
        map[item[nodeKy]] = item;
    });
    data.forEach(item => {
        const parent = map[item[parentKey]];
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    });
    return result;
}
