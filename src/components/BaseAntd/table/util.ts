import _ from "lodash";
function traverseAndModify(root: any, callback: (arg0: any) => void) {
    if (!root) return;

    const stack = Array.isArray(root) ? [...root] : [root];

    while (stack.length) {
        const node = stack.pop();
        callback(node);
        if (node.children && node.children.length > 0) {
            // 将子节点逆序推入栈中，以保证遍历顺序
            for (let i = node.children.length - 1; i >= 0; i--) {
                stack.push(node.children[i]);
            }
        }
    }
}

function getColumnNodeWidth(column: any, dataSource: any) {
    const columnWidth: any = {};
    traverseAndModify(column, (node) => {
        columnWidth[node.dataIndex] = _.max([node.title?.length, columnWidth[node.dataIndex]?.length]);
    });
    traverseAndModify(dataSource, (node) => {
        const keys = Object.keys(node);
        keys.forEach((item) => {
            columnWidth[item] = _.max([columnWidth[item], node[item]?.length]);
        });
    });
    return columnWidth;
}

export { 
    traverseAndModify,
    getColumnNodeWidth
}