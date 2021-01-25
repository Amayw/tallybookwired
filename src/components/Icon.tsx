import React from "react"

//这里使用的typescript
type Props={
  name:String;
}
const Icon=(props:Props)=>{
  return (
      <svg className="icon">
        <use xlinkHref={'#'+props.name}/>
      </svg>
  )
}

export default Icon
