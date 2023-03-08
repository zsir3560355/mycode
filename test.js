/**
 * 1,实现curry函数 支持add(1)(2)(3),add(1,2)(3),add(1)(2,3)
 */

const curry = (fn,...args)=>{
  console.log(fn,args,fn.length)
  return args.length >= fn.length
  ? fn(...args)
  : (...args1) => curry(fn,...args,...args1)
}
function add(a,b,c,d){
  return a+b+c
}
const plus = curry(add);
console.log(plus(1)(2)(3)())
// console.log(plus(1,2)(3))
// console.log(plus(1)(2,3))