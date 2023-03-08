var myQueue = function(){
    this.stackIn = [];
    this.stackOut = [];
}

myQueue.prototype.push = function(x){
    this.stackIn.push(x)
}

myQueue.prototype.pop = function(){
    const size = this.stackOut.length;
    if(size){
        return this.stackOut.pop()
    }
    while(this.stackIn.length){
        this.stackOut.push(this.stackIn.pop())
    }
    return this.stackOut.pop()
}

myQueue.prototype.peek = function(){
    const x = this.pop();
    this.stackOut.push(x)
    return x
}

myQueue.prototype.empty = function(){
    return !this.stackIn.length && !this.stackOut.length
}