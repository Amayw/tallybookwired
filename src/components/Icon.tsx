import React from "react"
import styled from 'styled-components';

const SvgWrapper=styled.svg`
    width: 26px;
    height: 26px;
`
//这里使用的typescript
type Props={
  name:string
}
const Icon:React.FC<Props>=(props)=>{
  return (
      <SvgWrapper className="icon">
        <use xlinkHref={'#'+props.name}/>
      </SvgWrapper>
  )
}

export default Icon
