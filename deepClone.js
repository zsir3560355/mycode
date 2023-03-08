const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    field5:{
        a:{
            a1:'123'
        }
    },
    field6:function(a,b){
        return a+b
    }
};
target.target = target;  //循环引用的问题 用map数据来解决

console.log(clone(target))

function clone(target,map = new WeakMap()){
    if(typeof target === 'object'){
        let cloneTarget = Array.isArray(target) ? [] : {};
        if(map.get(target)){
            return map.get(target)
        }
        map.set(target,cloneTarget)

        for(const key in target){
            cloneTarget[key] = clone(target[key],map)
        }
        return cloneTarget;
    }else{
        return target
    }
}
function cloneSymbol(targe) {
    return Object(Symbol.prototype.valueOf.call(targe));
}
function cloneReg(targe) {
    const reFlags = /\w*$/;
    const result = new targe.constructor(targe.source, reFlags.exec(targe));
    result.lastIndex = targe.lastIndex;
    return result;
}
function cloneFunction(func) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    if (func.prototype) {
        console.log('普通函数');
        const param = paramReg.exec(funcString);
        const body = bodyReg.exec(funcString);
        if (body) {
            console.log('匹配到函数体：', body[0]);
            if (param) {
                const paramArr = param[0].split(',');
                console.log('匹配到参数：', paramArr);
                return new Function(...paramArr, body[0]);
            } else {
                return new Function(body[0]);
            }
        } else {
            return null;
        }
    } else {
        return eval(funcString);
    }
}
function getType(target) {
    return Object.prototype.toString.call(target);
}
function cloneOtherType(targe, type) {
    const Ctor = targe.constructor;
    switch (type) {
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(targe)
        case regexpTag:
            return cloneReg(targe);
        case symbolTag:
            return cloneSymbol(targe);
        default:
            return null;
    }
}
