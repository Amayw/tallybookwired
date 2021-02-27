import styled from 'styled-components';
import Icon from '../Icon';
import React from 'react';
import {useTags} from '../../hooks/useTags';
import {WiredIconButton} from 'react-wired-elements';

const TagsWrapper=styled.div`
  >ul{
    height: 50vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    background-color:#fdfdfd;
    overflow: auto;
    padding: 10px 0;
    >li{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 25%;
      padding: 20px 0;
      &.active{
        color: hotpink;
        font-weight: 800;
      }
    }
  }
`

type Props={
  selectedId:number,
  onChange:(selectedId:number)=>void;
}
const Tags:React.FC<Props>=(props)=>{
  const {tags}=useTags();
  const selectedId=props.selectedId;
  const onChangeSelectedId=(selectedId:number)=>{
    props.onChange(selectedId);
  }
  return (
    <TagsWrapper>
      <ul>
        {tags.map(label=>
          <li key={label.id} className={selectedId===label.id?'active':''} onClick={()=>onChangeSelectedId(label.id)}>
            <WiredIconButton lineColor={selectedId===label.id?'hotpink':'#000'} ><Icon name={label.icon}/></WiredIconButton>
            <span>{label.name}</span>
          </li>)}
      </ul>
    </TagsWrapper>
  )
}
export default Tags;
