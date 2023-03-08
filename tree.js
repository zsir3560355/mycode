/**
 * 树的算法
 */

function treeNode(val,left,right){
    this.val =  (val === undefined ? 0 : val);
    this.left =  (left === undefined ? 0 : val);
    this.right =  (right === undefined ? 0 : val);
}

/**
 * 二叉树的统一迭代法
 */
const  prevTravelTree = function(root,res=[]){
    const stack = [];
    if(root)  stack.push(root)
    while(stack.length){
        const node = stack.pop();
        if(!node){
            res.push(stack.pop().val);
            continue
        }
        node.right && stack.push(node.right)  //右
        node.left && stack.push(node.left) //左
        stack.push(node) //中
        stack.push(null)
    }
    return res;
}

/**
 * 2,二叉树的层级遍历
 */

const levelTravelTree = function(root){
        let res = [] , queue = [];
        queue.push(root)
        if(root == null){
            return res
        }
        while(queue.length){
            let curLevel = [];
            let len = queue.length;
            for(let i=0;i<len;i++){
                let node = queue.shift();
                curLevel.push(node.val);
                node.left && queue.push(node.left);
                node.right && queue.push(node.right)
            }
            res.push(curLevel)
        }
        return res 
}



/**
 * 3, 二叉树的翻转
 */

const reveserTree = function (root){
    const inverNode = function(left,right){
        let temp = left;
        left = right;
        right = temp;
        node.left = left;
        node.right = right
    }
    inverNode(root.left,root,right);
    reveserTree(node.left)
    reveserTree(node.right);
    return root
}

/**
 * 4,二叉树的递归遍历(前序)
 */
const prevNode = function(root){
    let res = [];
    const dps = function(root){
        if(root === null) return
        res.push(node.val);
        dps(root.left)
        dps(root.right)
    }
    dps(root)
    return res
}

/**
 * 5,对称二叉树
 */

var isSymmetric = function(root){
    const compareNode = function(left,right){
        if(left===null && right !== null || left!== null && right===null){
                return false
        }else if(left===null && right === null){
            return true
        }else if(left.val !== right.val){
            return false
        }
        let outSide = compareNode(left.left,right.right);
        let inSide = compareNode(left.right,right.left)
        return outSide && inSide
    }
    if(root === null){
        return true
    }
    compareNode(root.left,root.right)
}

/**
 * 6,二叉树的最近公共祖先
 */

const commonNode = function(root,p,q){
    var dps = function(root,p,q){
        if(root === null || root === p || root ===q){
            return root
        }
        let left = dps(root.left,p,q);
        let right = dps(root.right,p,q);
        if(right !== null && left !== null){
            return root
        }
        if(left === null){
            return right
        }
        return left
    }
    return dps(root,p,q)
}

/**
 * 7,二叉树的最大深度
 */

const maxDep = function(root){
    if(root === null){
        return 0
    }
    let left = maxDep(root.left);
    let right = maxDep(root.right);
    return 1 + Math.max(left,right)
}

/**
 * 8,二叉树的最小深度
 */

const minDep = function(root){
    if(root === null){
        return 0
    }
    let leftDep = minDep(root.left);
    let rightDep= minDep(root.right);
    return (leftDep==0 || rightDep ==0) ? 1 + leftDep + rightDep : 1 + Math.min(leftDep,rightDep)
}

/**
 * 9,二叉树的所有路径
 */
const binaryTreePaths  = function(root){
    let res = [];
    const getPath = function(node,path){
        if(node.left===null && node.right===null){
            path += node.val;
            res.push(path)
            return ''
        }
        path += node.val + '->';
        node.left && getPath(node.left,path)
        node.right && getPath(node.right,path)
    }
    getPath(root,'');
    return res
}

/**
 * 10.合并二叉树
 */

const mergeTree = function(root1,root2){
    var merge = function(root1,root2){
        if(root1=== null){
            return root2
        }
        if(root2 === null){
            return root1
        }
        root1.val += root2.val;
        root1.left = merge(root1.left,root2.left)
        root1.right = merge(root1.right,root1.right)
        return root1
    }
    mergeTree(root1,root2)
}

