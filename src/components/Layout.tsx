import Nav from './Nav';
import React from 'react';
import styled from 'styled-components';

const LayoutWrapper=styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  max-width: 520px;
  margin: 0 auto;
`
const Main=styled.main`
  flex-grow: 1;
  overflow: auto;
  background: #f0f8ff;
`
export default function Layout(props:any){
  return (
    <LayoutWrapper>
      <Main>
        {props.children}
      </Main>
      <Nav/>
    </LayoutWrapper>
  )
}