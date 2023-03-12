/**
 * 1,实现curry函数 支持add(1)(2)(3),add(1,2)(3),add(1)(2,3)
 */

const curry = (fn,...args)=>{
  // console.log(fn,args,fn.length)
  return args.length >= fn.length
  ? fn(...args)
  : (...args1) => curry(fn,...args,...args1)
}
function add(a,b,c,d){
  return a+b+c
}
const plus = curry(add);
// console.log(plus(1)(2)(3)())
// console.log(plus(1,2)(3))
// console.log(plus(1)(2,3))

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

const parseUrl = url=>{
  let arr = url.split("?")[1];
  let ret = [];
  arr.split("&").forEach(item=>{
    let key = item.split("=")[0];
    let value = item.split("=")[1]
    let obj = { }
    obj[key] = value
    ret.push(obj)
  })
  return ret
}
console.log(parseUrl(url));

const deepClone = obj=>{
  let cloneObj = Array.isArray(obj) ? [] :{}
  for(let key in obj){
    cloneObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
  }
  return cloneObj
}

let newObj = JSON.parse(JSON.stringify(obj))

const obj = {
  name :'level1',
  children:[{
    name:'level2',
    children:[{
      name:'level3',
      children:[{
        name:'level4',
        children:[]
      }]
    }]
  }]
}
/**
 * 输出[{name:"level1/level2"},{name:"level1/level2/level3"}]
 */

const outPutObj = obj=>{
  let ret = [];
  
}