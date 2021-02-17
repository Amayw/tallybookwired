import React, {useState} from 'react';
import styled from 'styled-components';
import {WiredButton} from 'react-wired-elements';

const CategoryWrapper=styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height:8vh;
  >ol>li{
    margin: 0 20px;
    display: inline-block;
    &.active{
    background: #f7d26a;
    }
  }
`

type Props={
  category:'-'|'+',
  onChange:(category:'-'|'+')=>void
}
const Category:React.FC<Props>=(props)=>{
  const categoryMap={'-':'支出','+':'收入'};
  type categoryType=keyof typeof categoryMap;
  const [categoryList]=useState<categoryType[]>(['-','+']);
  const category=props.category;

  const onToggleCategory=(c:categoryType)=>{
    props.onChange(c);
  }
  return (
    <CategoryWrapper>
      <ol>
        {
          categoryList.map(c=>(
            <li key={c} className={category===c?'active':''} onClick={()=>onToggleCategory(c)}>
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
export default Category;
