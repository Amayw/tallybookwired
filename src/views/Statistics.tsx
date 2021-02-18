
import React from 'react';
import Layout from '../components/Layout';
import Category from '../components/money/Category';
import styled from 'styled-components';

const RecordsWrapper=styled.div`
  border: 1px solid red;
  height: 84vh;
`
export default function Statistics(){

  const onChange=()=>{

  }
  return(
    <Layout>
      <Category category={'-'} onChange={(category)=>onChange()}/>
      <RecordsWrapper>

      </RecordsWrapper>
    </Layout>
  )
}
