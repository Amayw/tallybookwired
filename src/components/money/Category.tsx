import React from "react";
import styled from 'styled-components';

const CategoryWrapper=styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  >wired-button{
    margin: 12px 20px;
    &.active{
      background: #f7d26a;
    }
  }
`


export default function Category(){
  return (
    <CategoryWrapper>

    </CategoryWrapper>
  )
}
