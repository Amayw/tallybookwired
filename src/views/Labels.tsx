import React from 'react';
import Layout from '../components/Layout';
import {useTags} from '../useTags';
import Icon from '../components/Icon';
import {WiredIconButton} from 'react-wired-elements';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import createId from '../lib/createId';



const HeaderWrapper=styled.div`
  background-color:#f0f8ff;
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  >.right{
    width: 1.5em;
    height: 1.5em;
    padding: 0.3em;
    fill:#fff;
    background-color: #f7d26a;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    &.icon{
      width: 1.2em;
      height: 1.2em;
    }
  }
`
const LabelsWrapper=styled.div`
  background: #fdfdfd;
  >ul{
     overflow: auto;
     height: 86vh;
     >li>a{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 20px;
      >.left{
        display: flex;
        align-items: center;
        >span{
          margin-left: 20px;
        }
      }
  }
  }
  
`
const Labels:React.FC=()=>{
  const {tags,addTag}=useTags();
  const onAddTag=()=>{
    const name=window.prompt('请输入标签名');
    if(name){
      addTag({id:createId(),name,icon:'icon-fruit8'});
    }else{
      window.alert('标签名不能为空');
    }

  }
  return(
    <Layout>
      <HeaderWrapper>
        <span>
          <Icon name=''/>
        </span>
        <span>
          标签管理
        </span>
        <span className='right'  onClick={()=>onAddTag()}>
          <Icon name='icon-jia1'/>
        </span>
      </HeaderWrapper>
      <LabelsWrapper>
        <ul>
          {
            tags.map(label=>(
              <li key={label.id}>
                <NavLink to={'/labels/'+label.id}>
                  <div className='left'>
                    <WiredIconButton lineColor={'#000'}>
                      <Icon name={label.icon}/>
                    </WiredIconButton>
                    <span>{label.name}</span>
                  </div>
                  <div className='right'>
                    <Icon name='icon-gengduo'/>
                  </div>
                </NavLink>
              </li>
            ))
          }
        </ul>
      </LabelsWrapper>
    </Layout>
  )
}

export default Labels;
