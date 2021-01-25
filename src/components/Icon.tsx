import React from "react"
import styled from 'styled-components';

const SvgWrapper=styled.div`
  >svg{
    width: 26px;
    height: 26px;
  }
`
//这里使用的typescript
type Props={
  name:String;
}
const Icon=(props:Props)=>{
  return (
    <SvgWrapper>
      <svg className="icon">
        <use xlinkHref={'#'+props.name}/>
      </svg>
    </SvgWrapper>
  )
}

export default Icon
