// requestAnimationFrame 比起 setTimeout、setInterval的优势主要有两点：

// 1、requestAnimationFrame 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。

// 2、在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的的cpu，gpu和内存使用量。

function animate(){
    console.log('animate');
    window.requestAnimationFrame(animate)
}
animate()


// window.requestIdleCallback只有当系统有空闲时间时才会执行，若一直没有空闲时间则一直会等待，有一个options可选timeout超时取消，意思是当等待时间超过设定时间时就取消该任务

let handle =   window.requestIdleCallback(fn,timeout)

function loopWork(deadline){
    while(
        (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
        taskList.length > 0
    ){
        dowork()
    }
    if(taskList.length >0){
        requestIdleCallback(loopWork)
    }
}

// 函数fn接受deadline对象作为参数，deadline对象有两个属性：timeRemaining和didTimeout。

// timeRemaining() 返回当前帧还剩余的毫秒数。
// didTimeout 指定的时间是否过期。
requestIdleCallback(lowWork, 2000);