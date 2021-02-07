import styled from 'styled-components';
import Icon from '../Icon';
import {WiredIconButton} from 'react-wired-elements';
import React from 'react';
import {useTags} from '../../useTags';

const TagsWrapper=styled.div`
  >ul{
    height: 52vh;
    padding: 10px 0;
    overflow: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    background-color:#fdfdfd;
    >li{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 25%;
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
            <Icon name={label.icon}/>
            {/*<WiredIconButton lineColor={selectedId===label.id?'hotpink':'#000'} ><Icon name={label.icon}/></WiredIconButton>*/}
            <span>{label.name}</span>
          </li>)}
      </ul>
    </TagsWrapper>
  )
}
export default Tags;
