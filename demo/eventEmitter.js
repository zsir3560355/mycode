class EventEmitter{
    constructor(){
        this._events = this._events || new Map();
        this._maxLength = this._maxLength || 10;
    }
    // 添加监听事件
    addListener(type,fn){
        const handler = this._events.get(type);
        if(!handler){
            this._events.set(type,fn)
        }else if(handler && typeof handler === 'function'){
            this._events.set(type,[handler,fn])
        }else{
            handler.push(fn)  //存在多个事件了 直接push
        }
    }
    removeListener(type,fn){
        const handler = this._events.get(type);
        if(handler && typeof handler === 'function'){
            this._events.delete(type,fn)
        }else{
            let index;
            // 如果是数组，说明被监听多次要找到对应的函数
            for(let i=0;i<handler.length;i++){
                if(handler[i] === fn){
                    index = i
                }else{
                    index =-1
                }
            }
            if(index !== -1){
                handler.splice(index,1)
                if(handler.length === 1){
                    this._events.set(type,handler[0])
                }
            }else{
                return this
            }
        }
    }
    // 触发函数
    emit(type,...args){
        const handler = this._events.get(type);
        // 分两种情况 单个函数  或者多个
        if(Array.isArray(handler)){
            for(let i=0;i<handler.length;i++){
                if(args.length > 0){
                    handler[i].apply(this,args)
                }else{
                    handler[i].call(this)
                }
            }
        }else{
            if(args.length>0){
                handler.apply(this,args)
            }else{
                handler.call(this)
            }
        }
    }
}