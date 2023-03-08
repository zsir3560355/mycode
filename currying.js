// 函数柯里化

const currying = (fn, ...args) => {
  console.log("args=>", ...args, fn.length);
  return args.length >= fn.length
    ? fn(...args)
    : (...args1) => currying(fn, ...args, ...args1);
};
// function curry(func) {
//   return function curried(...args) {
//     // 1
//     if (args.length >= func.length) {
//       //2
//       return func.apply(this, args);
//     } else {
//       //3
//       return function (...args2) {
//         //4c
//         return curried.apply(this, args.concat(args2));
//       };
//     }
//   };
// }

function sum(a, b, c) {
  return a + b + c;
}
let curriedSum = currying(sum);
let a = curriedSum(100, 200)(300)();
console.log("a==>",a)
// var sum = currying(function () {
//   //求和
// });

// 函数柯里化，不管参数多少，不管方法名称

// const curry = function (fn) {
//   let _args = [];
//   return function () {
//     if (arguments.length === 0) {
//       fn.apply(fn, _args);
//     }
//     [].push.call(_args, arguments);
//     return arguments.callee;
//   };
// };
// function multi() {
//   return [].reduce.call(arguments, function (a, b) {
//     return a + b;
//   });
// }
// let sum = curry(multi);
// console.log(sum(100, 200)(300)(12)(122));
