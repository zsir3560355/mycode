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

// let newObj = JSON.parse(JSON.stringify(obj))

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


 const data = [
  {
    id: 1,
    name: "test1",
    pid: 1,
    children: [
      {
        id: 4,
        name: "test4",
        pid: 4,
        children: [
          { id: 5, name: "test5", pid: 5 },
          { id: 6, name: "test6", pid: 6 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "test2",
    pid: 2,
    children: [{ id: 21, name: "test21" }],
  },
  {
    id: 3,
    name: "test3",
    pid: 3,
    children: [{ id: 31, name: "test31" }],
  },
];

// 数组拉平为一维度数组

const faltterArr = datas =>{
    return datas.reduce((result,cur)=>{
       let obj = {
         id:cur.id,
         name:cur.name,
         pid:cur.pid
       };
       result.push(obj)
       if(cur?.children?.length >0){
        result.push(...faltterArr(cur.children))
       }
       return result
    },[])
}
console.log(faltterArr(data))

let brr = [
  { id: 1, name: "test1", pid: 0 },
        { id: 2, name: "test2", pid: 1 },
        { id: 3, name: "test3", pid: 1 },
        { id: 4, name: "test4", pid: 2 },
        { id: 5, name: "test5", pid: 2 },
        { id: 6, name: "test6", pid: 3 },
]

const arrToTree = (arr,pid)=>{
  let ret = [];
   transformData(arr,ret,pid)
  return ret
}

const transformData = (arr,ret,pid)=>{
  for(let item of arr){
      if(item.pid === pid){
        let newObj = {...item,children:[]}
        ret.push(newObj)
        transformData(arr,newObj.children,item.id)
      }
  }
}

console.log(arrToTree(brr,1))