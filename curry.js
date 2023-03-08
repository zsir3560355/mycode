// 科里化函数
const curry = function (fn) {
  let _args = [];
  // 当传入的实参为0时候
  return function () {
    if (arguments.length === 0) {
      return fn.apply(fn, _args);
    }
    [].push.apply(_args, arguments);
    return arguments.callee;
  };
};

function fns() {
  return [].reduce.call(arguments, function (a, b) {
    return a + b;
  });
}
let sum = curry(fns);

let res = sum(1, 2)(3)(4)();
console.log("re==>", res);

// 改良版本curry
const currys = function (fn) {
  let len = fn.length;
  let _args = [];
  return function () {
    Array.prototype.push.apply(_args, arguments);
    let argsLen = _args.length;
    if (argsLen < len) {
      return arguments.callee;
    }
    return fn.apply(fn, _args);
  };
};
let add = function (a, b, c, d) {
  return a + b + c + d;
};
let sum1 = currys(add);
let res1 = sum1(123, 45)(22)(2)();
console.log(res1);

// 实现要一个函数异步调度器
class Scheduler {
  constructor(maxNum) {
    this.count = 0;
    this.maxNum = maxNum;
    this.taskList = [];
  }
  async add(promiseCreator) {
    if (this.count >= this.maxNum) {
      await new Promise((resolve) => {
        this.taskList.push(resolve);
      });
    }
    console.log("this.count=>", this.count);
    this.count++;
    const result = await promiseCreator();
    this.count--;
    if (this.taskList.length > 0) {
      this.taskList.shift()();
    }
    return result;
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler(2);
const addTask = (time, val) => {
  scheduler.add(() => {
    return timeout(time).then(() => {
      console.log(val);
    });
  });
};
// addTask(1000, "1");
// addTask(500, "2");
// addTask(300, "3");
// addTask(400, "4");

class SchedulerOne {
  constructor(maxNum) {
    this.maxNum = maxNum;
    this.count = 0;
    this.taskList = [];
  }
  async add(promiseCreator) {
    if (this.count >= this.maxNum) {
      await new Promise((resolve) => {
        this.taskList.push(resolve);
      });
    }
    this.count++;
    const result = await promiseCreator();
    this.count--;
    if (this.taskList.length > 0) {
      this.taskList.shift()();
    }
    return result;
  }
}

const timeOne = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const schedulerOne = new SchedulerOne(2);

const addMession = (time, order) => {
  schedulerOne.add(() => timeOne(time)).then(() => console.log(order));
};

// addMession(1000, "1");
// addMession(500, "2");
// addMession(400, "3");
// addMession(300, "4");
