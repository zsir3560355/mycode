/**
 * ## 问题1 有赞   5.26
 * 将一个json数据的所有key从下划线改为驼峰
 * @param {object | array} value 待处理对象或数组
 * @returns {object | array} 处理后的对象或数组
 */

const testData = {
  a_bbb: 123,
  a_g12: [1, 2, 3, 4],
  a_ddef_ii: {
    s: 2,
    s_d: 3,
  },
  a_fecd: [
    1,
    2,
    3,
    {
      a_g: 5,
    },
  ],
  a_d_s: 1,
};

// console.log(transform(testData))

function transform(obj) {
  let newObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (typeof obj[key] == "object") {
      newObj[toCal(key)] = transform(obj[key]);
    } else {
      newObj[toCal(key)] = obj[key];
    }
  }
  return newObj;
}

function toCal(value) {
  const chunks = value?.split("_");
  return (
    chunks[0] +
    chunks
      .slice(1)
      .map((item) => {
        item[0].toUpperCase() + item.slice(1);
      })
      .join("")
  );
}
// console.log(toCal('a_ddef_ii'));

/**
 * 问题2    5.26
 * 函数柯里化curry 实现 add(1)(2)(3)(4)
 */
const curry = (fn, ...args) => {
  return args.length >= fn.length
    ? fn(...args)
    : (...args1) => curry(fn, ...args, ...args1);
};

function plus(a, b, c, d) {
  return a * b + c + d;
}

const plus1 = curry(plus);
console.log(plus1(2, 3, 4));
// console.log(plus1(12)(2)(4)(8))

/**
 * 5.27
 * 问题3
 * 控制并发请求数量 ->limitRequest
 */

function limitRequest(requests, limit = 4) {
  return new Promise((resolve, reject) => {
    let len = requests.length;
    let count = 0;
    let errorNum = 0;
    let isStop = false;
    const start = async () => {
      if (isStop) {
        return;
      }
      try {
        const task = requests.shift();
        if (task) {
          await task();
          if (count < len - 1) {
            count++;
            start();
          } else {
            resolve();
          }
        }
      } catch (error) {
        if (errorNum < 3) {
          errorNum++;
          requests.unshift(task);
          start();
        } else {
          isStop = true;
          reject();
        }
      }
    };

    while (limit > 0) {
      start();
      limit -= 1;
    }
  });
}

/**
 * 问题4，大数相加  5.28
 *
 */
let aa = "2134455676587972424";
let bb = "323254465375865652142535456585";

function bigNumPlus(a, b) {
  let maxLength = Math.max(a.length, b.length);
  a = a.padStart(maxLength, 0);
  b = b.padStart(maxLength, 0);
  let temp = 0;
  let ten = 0;
  let sum = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    temp = parseInt(a[i]) + parseInt(b[i]) + ten;
    ten = Math.floor(temp / 10);
    sum = (temp % 10) + sum;
  }
  if (ten == 1) {
    sum = "1" + sum;
  }
  return sum;
}
//  console.log(bigNumPlus(aa,bb));

/**
 * 问题5 PromiseAll实现按照顺序返回接口  5.28
 */

const promiseAll = (promises) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new Error("传入的参数必须是数组格式"));
    }
    let res = [];
    let count = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((data) => {
          res[index] = data;
          count++;
          if (count == promises.length) {
            resolve(res);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

const allPromise = (promises) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new Error("必须传入数组"));
    }
    let res = [];
    let count = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((data) => {
          res[index] = data;
          count++;
          if (count === promises.length) {
            resolve(res);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};
/**
 * 问题6 多维度数组变成一维 flatter  5.28
 */
const flatter = (arr) => {
  return arr.reduce((prev, cur) => {
    prev.concat(Array.isArray(cur) ? flatter(cur) : cur);
  }, []);
};

/**
 * 问题7 promise相关问题和API(all,race,finally)  5.29
 */

// let a = 0;
// let pro1 = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve(++a)
//     },1000)
// })

// let pro2 = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve(++a)
//     },2000)
// })

// let pro3 = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve(++a)
//     },3000)
// })

// Promise.all([pro1,pro2,pro3]).then(res=>{
//     console.log(res);
// })

// Promise.race([pro1,pro2,pro3]).then(res=>{
//     console.log(res)
// })

/**
 * 问题8，防抖和节流
 */
const debounce = (fn, delay = 1000) => {
  let timer = null;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.call(this, args);
    }, delay);
  };
};


const throttle = (fn, delay = 1000) => {
  let lastTime = 0;
  return (...args) => {
    let nowTime = Date.now();
    if (nowTime - lastTime > delay) {
      fn.call(this, args);
      lastTime = nowTime;
    }
  };
};

/**
 * 问题9，实现深拷贝函数
 */

const deepClone = (obj) => {
  let newObj = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    newObj[key] = typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key];
  }
  return newObj;
};

/**
 * 问题10，数组去重
 */

const unique = (arr) => {
  arr.reduce((prev, cur) => {
    prev.indexOf(cur) == -1 && prev.push(cur);
    return prev;
  }, []);
};

/**
 * 问题11，快速排序
 */
const aaa = [1, 2, 3, 4, 5, 3, 32, 2];
let mid = aaa.splice(4, 1);
console.log("mid=>", mid);
const quickSort = (arr) => {
  if (arr.length < 1) {
    return arr;
  }
  const index = Math.floor(arr.length / 2);
  const mid = arr.splice(index, 1)[0];
  // console.log(mid);
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < mid) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([mid], quickSort(right));
};

// console.log(quickSort(assv));

/**
 * 12,最长公共前缀
 */

var strs = ["anddes", "nushands", "yutydandsfvs", "aaaadnands"];
function commonStr(arr) {
  let str = "";
  for (let i = 0; i < arr[0].length; i++) {
    for (let j = 1; j < arr.length; j++) {
      if (arr[j][i] !== arr[0][i] || !arr[j][i]) {
        return str;
      }
    }
    str = str.concat(arr[0][i]);
  }
  return str;
}
// console.log(commonStr(strs))

/**
 *
 * 13,冒泡排序
 */
let assv = [
  3, 4, 5, 6, 4, 3, 2, 46, 78, 88, 76, 5, 4, 3, 3, 2, 2, 3454, 56, 77788, 98,
];
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = len; i >= 2; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
console.log("bubbleSort=>", bubbleSort(assv));

// 14.实现一个函数
// params: func 需要重复执行的函数
//         interval 执行间隔时间（ms）
//         times 执行次数
function repeat(func, interval, times) {
  return async (...args) => {
    for (let i = 0; i < times; i++) {
      await new Promise((res, reject) => {
        setTimeout(() => {
          func.call(this, args);
          res();
        }, interval);
      });
    }
  };
}

// 函数使用如下所示
const r = repeat(console.log, 2000, 5);
r("hello world", "fuck");

/**
 * 15，判断两个对象是否完全相等
 */
// 1.判断是否都是对象类型
// 2.判断对象长度是否一值
// 3.判断key是否相等
// 4,判断key对应的value是否相等
// 5.循环递归1-4
function diffObj(obj1, obj2) {
  let o1 = obj1 instanceof Object;
  let o2 = obj2 instanceof Object;
  if (!o1 || !o2) {
    return obj1 === obj2;
  }
  let keyList1 = Object.keys(obj1).length;
  let keyList2 = Object.keys(obj2).length;
  if (keyList1 !== keyList2) {
    return false;
  }
  for (var item in obj1) {
    let t1 = obj1[item] instanceof Object;
    let t2 = obj2[item] instanceof Object;
    if (t1 && t2) {
      if (!diffObj(obj1[item], obj2[item])) {
        return false;
      }
    } else if (obj1[item] !== obj2[item]) {
      return false;
    }
  }
  return true;
}
let a = {
  a: "123",
  b: "2345",
  c: "anshs",
  d: {
    fun: "yew",
  },
  e: "hah",
};
let b = {
  a: "123",
  b: "2345",
  c: "anshs",
  d: {
    fun: "yew",
  },
  e: "hah",
};
// console.log(diffObj(a,b))


function parseQuery(url) {
  let reg = /https:\/\/[a-zA-Z.]+(.*)/g;
  let params = url
    .replace(reg, ($1, $2) => {
      return $2;
    })
    .replace(/^\?/g, "");
  console.log("params=>", params);
  let paramArray = params.split("&");
  let res = {};
  paramArray.forEach((item) => {
    let [key, val] = item.split("=");
    res[key] = decodeURIComponent(val);
  });
  return res;
}
let url =
  'https://www.youzan.com?name=coder&age=20&callback=https%3A%2F%2Fyouzan.com%3Fname%3Dtest&list=["a"]&json=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D';
console.log(parseQuery(url));

/**
 * 17,数组结构转换成树形结构
 */
let arrssss = [
  { id: 1, name: "test1", pid: 0 },
  { id: 2, name: "test2", pid: 1 },
  { id: 3, name: "test3", pid: 1 },
  { id: 4, name: "test4", pid: 2 },
  { id: 5, name: "test5", pid: 2 },
  { id: 6, name: "test6", pid: 3 },
];
function getChildren(arr, result, pid) {
  for (let item of arr) {
    if (item.pid === pid) {
      let newItem = { ...item, children: [] };
      result.push(newItem);
      getChildren(arr, newItem.children, item.id);
    }
  }
}

const arrayToTree = (arr, pid) => {
  let result = [];
  getChildren(arr, result, pid);
  return result;
};

/**
 * 18.有效的括号
 */
let ss = "{}[]()";
var isValid = function (s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    switch (c) {
      case "(":
        stack.push(")");
        break;
      case "{":
        stack.push("}");
        break;
      case "[":
        stack.push("]");
        break;
      default:
        if (c !== stack.pop()) {
          return false;
        }
    }
  }
  return stack.length === 0;
};
// console.log(isValid(ss))
