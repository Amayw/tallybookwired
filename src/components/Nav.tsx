import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import React from 'react';
import Icon from './Icon';

const NavWrapper=styled.nav`
  >ul{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background: #f0f8ff;
    >li{
      >a{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 6px;
        color:#000;
        >.icon{
          width: 26px;
          height: 26px;
        }
        
        &.is-active{
          color:#ff69b4;
        }
      }
    }
  }
  box-shadow:0 0 3px rgba(0,0,0,0.25);
`
export default function Nav(){
  return (
    <NavWrapper>
      <ul>
        <li>
          <NavLink activeClassName='is-active' to="/tags"><Icon name='icon-rtag'/>标签</NavLink>
        </li>
        <li>
          <NavLink activeClassName='is-active' to="/money"><Icon name='icon-rmoney'/>记账</NavLink>
        </li>
        <li>
          <NavLink activeClassName='is-active' to="/statistics"><Icon name='icon-tongji' />统计</NavLink>
        </li>
      </ul>
    </NavWrapper>
  )
}