class Stack{
    constructor(){
        this.count = 0;
        this.items = {};
    }
    push(...eles){
        for(let i=0;i<eles.length;i++){
            this.items[this.count] = eles[i];
            this.count++
        }
    }
    size(){
        return this.count;
    }
    isEmpty(){
        return !this.count
    }
    // 返回栈顶元素
    pop(){
        if(this.isEmpty()){
            return undefined
        }
        this.count --;
        let result = this.items[this.count];
        delete this.items[this.count];
        return result
    }
    peek(){
        if(this.isEmpty()){
            return undefined
        }
        return this.items[--this.count]
    }
    clear(){
        while(!this.isEmpty()){
            this.pop()
        }
    }
}

let arr = new Stack();

arr.push('map')
arr.push('set')
console.log(arr.isEmpty())
arr.push('obj')
arr.push('zsir')
let peeks = arr.pop();
console.log(arr,peeks)
// arr.clear()
// console.log(arr)
// console.log(arr.isEmpty())

