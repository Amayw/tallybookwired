import React from "react"
import styled from 'styled-components';
import cs from 'classnames';

const SvgWrapper=styled.svg`
    width: 26px;
    height: 26px;
`

type Props={
  name:string,
}&React.SVGAttributes<SVGElement>
const Icon:React.FC<Props>=(props)=>{
  const {name,children,className,...rest}=props;

  return (
      <SvgWrapper className={cs('icon',className)} {...rest}>
        <use xlinkHref={'#'+props.name}/>
      </SvgWrapper>
  )
}

export default Icon
