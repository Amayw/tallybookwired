import {NavLink} from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

const NoMatchWrapper=styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color:#f0f8ff;
  >div>a{
    color:#f7d26a;
    font-weight: 800;
  }
`
export default function NoMatch(){
  return(
    <NoMatchWrapper>
      <div>
        没有匹配页面，
        <NavLink activeClassName='is-active' to="/money">点击跳转</NavLink>
        至记账页面
      </div>
    </NoMatchWrapper>
  )
}
