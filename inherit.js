/**
 * js深入继承的多种方式和优缺点
 */

/**
 * 1,原型链继承
 */
// 1.1 ,引用类型的属性被所有实例共享
// 1.2 ,在创建 Child 的实例时，不能向Parent传参
function Parent(){
    this.name = ['aa','bb','cc'];
}
Parent.habit = 'singing';//静态属性
Parent.love = function(){  //静态方法
  console.log("make love")
}
Parent.prototype.getName = function(){
    console.log("name",this.name)
}
Parent.prototype.setName = function(val){
    this.name = val
}

function Child(){
}

Child.prototype  = new Parent();
var child1 = new Child();
var child2 = new Child();
// child1.setName('child')
child1.name.push("dd")
// console.log(child1.getName())
// console.log(child2.getName())

/**
 * 2,借用构造函数（经典继承）
 */

// 2.1,避免了引用类型的属性被所有实例共享
//2.2,可以在Child中向parent传值

function Father(name){
    this.name = name;
}
function Kid(name){
    Father.call(this,name)
}
var kid1 = new Kid('kevin');
// console.log(kid1.name);
var kid2 = new Kid('dasin');
// console.log(kid2.name)

//缺点：方法都在构造函数中定义，每次创建实例都会创建一遍方法；


/**
 * 3,组合继承
 * 
 */

// 3.1 融合原型链继承和构造函数的优点，是Javascript的常用的继承模式
function Mom(name){
    this.name = name;
    this.colors = ['red','green','white','grey']
}
Mom.prototype.getName = function(){
    return this.name
}

function Son(name,age){
    Mom.call(this,name);
    this.age = age
}

Son.prototype = new Mom();
Son.prototype.constructor = Son;



var son1 = new Son('小明','14');
son1.colors.push("yellow");
// console.log(son1.getName())
// console.log(son1.age)
// console.log(son1.colors)


/**
 * 4,new操作符实现 
 */

function Otaku(name,age){
    this.name = name;
    this.age = age;
    this.habit = 'Games';
}
Otaku.prototype.strength = 60;
Otaku.prototype.sayYourName = function(){
    console.log('I am ' + this.name)
}


// var person = new Otaku("zsir",'28');
var person = _new(Otaku,'keven','28');
// console.log(person.name) // Kevin
// console.log(person.habit) // Games
// console.log(person.sayYourName()) // 60

// person.sayYourName(); // I am Kevin

// 模拟实现new操作符的实现
function _new(fn,...arg){   
     var obj = {};
     obj.__proto__ = fn.prototype;
     let ret = fn.call(obj,...arg);
     return typeof ret === 'object' ? ret : obj
}
function myNew(fn,...args){
   let obj = {};
   obj.__proto__ = fn.prototype;
   let ret = fn.call(obj,...args);
   return typeof ret === 'obj' ? ret : obj
}
/**
 * 5.instanceof 代码实现
 */

let a1 = 'abd';
let b1 = 123;
let c1 = false;
let d1 = null;
let f1 = undefined;
let e1 = {
    a:123,
    c:'123fsa'
}


function new_instance_of(leftValue,rightValue){
    let rightProto = rightValue.prototype;
     leftValue  = leftValue.__proto__;
    while(true){
        if(leftValue === null){
            return false
        }
        if(leftValue === rightProto ){ 
            return true
        }
        leftValue =  leftValue.__proto__;
    }   
}
// console.log(new_instance_of(child1,Parent))


/**
 * 
 * 5,call自己实现
 */

 Function.prototype.call2  = function(context){
    var context = context || window;
    context.fn = this;
    var args = [];
    for (let i = 0; i < arguments.length; i++) {
        args.push('arguments['+ i + ']');
    }
    var result = eval('context.fn('+ args +')');
    delete context.fn;
    return result
}

Function.prototype._apply = function(ctx){
    ctx = ctx || window;
    ctx.fn = this;
    let args = [];
    for(let i=0;i<arguments.length;i++){
         args.push('arguments['+ i+']')
    }
    let ret = eval('ctx.fn('+ args+')')
    delete ctx.fn;
    return ret
 }

Function.prototype._call = function(ctx){
   ctx = ctx || window;
   ctx.fn = this;
   let args = [];
   for(let i=0;i<arguments.length;i++){
        args.push('arguments['+ i+']')
   }
   let ret = eval('ctx.fn('+ args+')')
   delete ctx.fn;
   return ret
}


var value = 2;
var objs = {
    value : 1,
}
function bar(name,age){
    console.log(this.value);
    return {
        value:this.value,
        name:name,
        agee:age
    }
}
console.log(bar.call2(objs, 'kevin', 18));