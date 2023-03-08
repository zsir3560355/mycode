// 策略模式，用于多重逻辑判断，减少if else使用
let type = "A";
let tactics = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  default: 0,
};

console.log(tactics[type]);

const getDisCount = (userKey, salary) => {
  let discounts = new Map([
    ["A", 4],
    ["B", 3],
    ["C", 2],
  ]);
  return discounts.get(userKey) * salary;
};
// console.log(getDisCount('C',2000))

let strategies = new Map([
  ["A_D", 4 * 1.2],
  ["B_D", 3 * 1.2],
  ["C_D", 2 * 1.2],
  ["A_F", 4 * 0.9],
  ["B_F", 3 * 0.9],
  ["C_F", 2 * 0.9],
]);
const calculateBonus = (performanceLevel, salary, department) => {
  return strategies.get(`${performanceLevel}_${department}`) * salary;
};
// console.log(calculateBonus( 'B', 20000, 'D' )) // 输出：72000

const calculateMoney = (level, status, salary) => {
  let mapStatus = new Map([
    ["A_1", 4],
    ["A_2", 3.5],
    ["B_1", 2],
    ["B_2", 2.5],
    ["C_1", 1],
    ["C_2", 1.5],
    ["D_1", 0.2],
    ["D_2", 0.6],
  ]);
  return mapStatus.get(`${level}_${status}`) * salary;
};

// console.log(calculateMoney('D','1',35000))

let Arr = [0, [1, 2, 3, 4, 5], ["1", "a", "c", "f"], ["fuck"], "aa"];
// 数组扁平化
function flatter(arr) {
  return arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? flatter(cur) : cur);
  }, []);
}

// console.log(flatter(Arr))

let brr = [1, 2, 3, 4, 3, 2, 2, 1, 3, 4, 5, 5, 6];
// 数组去重
function quchong(arr) {
  return arr.reduce((prev, cur) => {
    prev.indexOf(cur) == -1 && prev.push(cur);
    return prev;
  }, []);
}
let c = [...new Set(brr)];

/**
 * 数组转为树形结构
 */

let arrssss = [
  { id: 1, name: "test1", pid: 0 },
  { id: 2, name: "test2", pid: 1 },
  { id: 3, name: "test3", pid: 2 },
  { id: 4, name: "test4", pid: 3 },
  { id: 5, name: "test5", pid: 4 },
  { id: 6, name: "test6", pid: 5 },
];

const getChildren = (arr, result, pid) => {
  for (let item of arr) {
    if (item.pid === pid) {
      let newItem = { ...item, children: [] };
      result.push(newItem);
      getChildren(arr, newItem.children, item.id);
    }
  }
};
const arrayToTree = (arr, pid) => {
  let result = [];
  getChildren(arr, result, pid);
  return result;
};

function nest(arr, pid) {
  return arr
    .filter((item) => item.pid === pid)
    .map((item) => ({ ...item, children: nest(arr, item.id) }));
}

// console.log(arrayToTree(arrssss,0))
console.log(nest(arrssss, 0));

// 14.实现一个函数
// params: func 需要重复执行的函数
//         interval 执行间隔时间（ms）
//         times 执行次数
function repeatFn(fn, interval, times) {
  return async (...args) => {
    for (let i = 0; i < times; i++) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          fn.call(this, args);
          resolve();
        }, interval);
      });
    }
  };
}
// 函数使用如下所示
const r = repeatFn(console.log, 1000, 5);
r("hello world", "fuck");

/**
 * 函数curry
 */

const curry = (fn, ...args) => {
  return args.length >= fn.length
    ? fn(...args)
    : (...args1) => curry(fn, ...args, ...args1);
};

const curryFn = (fn,...args)=>{
   return args.length >= fn.length 
   ? fn(...args)
   : (...args1)=> curryFn(fn,...args,...args1)
}   
/**
 * 1，防抖函数实现
 */

const debounce = (func, wait, immediate) => {
  let timeout, args, context, timestamp, result;

  let later = function () {
    let last = Date.now() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.call(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    context = this;
    args = arguments;
    timestamp = Date.now();
    let callNow = immediate && !timeout;
    if (!timeout) {
      //确保timeout存在
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      //立即执行
      result = func.apply(context, args);
      context = args = null; //解除饮用
    }
    return result;
  };
};

/**
 * 2，实现一个函数，包含多个promise，需要按照顺序执行，得到对应的返回结果
 * a,考虑所有promise是异步执行，不需要考虑返回数据的时间点，可以用promiseAll类似的方式
 */

const ApromiseAll = (promises) => {
    return new Promise((resolve,reject)=>{
       if(!Array.isArray(promises)){
         return reject(new Error("promises必须是数组"))
       }
       let res= [];
       let count = 0;
       promises.forEach((item,index)=>{
          Promise.resolve(item).then(data=>{
            res[index] = data;
            count++;
            if(count === promises.length){
                resolve(res)
            }
          }).catch(err=>{
            reject(new Error(err))
          })
       })
    })
};

