// import {useEffect, useState} from 'react';
//
// const useUpdate=(fn:()=>void,dep:any[])=>{
//   const [count,setCount]=useState(0);
//   //当dep变化了，count+1
//   useEffect(()=>{
//     setCount(count=>count+1)
//   },dep);
//
//   useEffect(()=>{
//     //初次渲染时count由0变为1
//     //之后count会一直大于1
//     if(count>1){
//       fn();
//     }
//   },[fn,count])
// }
//
// export {useUpdate}
import {useEffect, useRef} from 'react';

const useUpdate=(fn:()=>void,dependency:any)=>{
  const count=useRef(0)

  useEffect(()=>{
    count.current+=1;
  })
  useEffect(()=>{
    if(count.current>1){
      fn()
    }
  },[fn,dependency])
}
export {useUpdate}
