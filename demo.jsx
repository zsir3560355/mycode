import React, {useEffect,useState} from 'react';

function Renders(props){
  const [counter,setCouner] = useState(5);
  const [timerID,setTimerID] = useState(null);

  useEffect(()=>{
      if(counter>0){
          let timer = setTimeout(()=>{
            setCouner(counter-1)
          },1000)
          setTimerID(timer)
      }else{
        props.history.push('./order')
      }
      return ()=>{
        setTimerID(null)
      }
  },[counter])

  return(
    <div>
       <p>{counter}秒后自动跳转到订单页面。。。</p>
    </div>
  )
}
export default Renders