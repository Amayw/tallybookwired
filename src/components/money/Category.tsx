import React, {useState} from 'react';
import styled from 'styled-components';
import {WiredButton} from 'react-wired-elements';

const CategoryWrapper=styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  >ol>li{
    margin: 12px 20px;
    display: inline-block;
    &.active{
    background: #f7d26a;
    }
  }
`


export default function Category(){
  const categoryMap={'-':'支出','+':'收入'};
  type categoryType=keyof typeof categoryMap;
  const [categoryList]=useState<categoryType[]>(['-','+']);
  const [category,setCategory]=useState<categoryType>('-');
  return (
    <CategoryWrapper>
      <ol>
        {
          categoryList.map(c=>(
            <li key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>
              <WiredButton>
                {categoryMap[c]}
              </WiredButton>
            </li>
          ))
        }
      </ol>
    </CategoryWrapper>
  )
}
