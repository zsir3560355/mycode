/**
 * 耀乘面试
 */

class DataType {
    // 'string' | 'number' | 'boolean' | [DataType]
    type
}

const str = 'foo';
const strType = {
    type : 'string'
}

const num = 123;
const numType = {
    type : 'nubmer'
}

const arr = [1,4,5,6];
const arrType = {
    type : [
                {
                    type : 'number'
                }
           ]
};
const arr1 = [2,3,4];
const arrType1 = {
    type : [
                    {
                        type: 'number'
                    }
           ]
};

function validate(value, dataType) {
        let valueType = typeof value;
        if(valueType !== 'object'){
            let type = dataType.type;
               if(valueType === type){
                    return value
               }else{
                    console.log('error')
               }     
        }else{
            if(Array.isArray(dataType.type)){
                const itemDataType = dataType.type[0];
                if(Array.isArray(value)){
                   return value.map(item=>validate(item,itemDataType))
                }else{
                    console.log('error')
                }
            }else{
                console.log('error')
            }
        }
    
}
                                  

// console.log(validate(str, strType)) // throw Error;
// validate(str, strType) // 'foo';
console.log(validate(arr, arrType)) // [1,4,5,6] !== arr;
// validate(["1","4","5","6"], arrType) // throw Error;


/**
 * 同城面试
 */

 const a = {b: {}}
 function fn(param) {

 }
 // 无key时不报错
 console.log(fn(a.c)) // null
 console.log(fn(a.b.c)) // null
 console.log(fn(a.b.c.c.c.c)) // null 


 const fetchParam = function(param){
      if(!param){
           return null
      } 
      let newobj = {};
      for(let key in obj){
           newOjb[key] = obj[key]
      }
      fetchParam(newobj[c]);
      return  newobj
 }