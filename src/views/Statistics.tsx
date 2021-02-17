
import React from 'react';
import Layout from '../components/Layout';
import Category from '../components/money/Category';

export default function Statistics(){

  const onChange=()=>{

  }
  return(
    <Layout>
      <Category category={'-'} onChange={(category)=>onChange()}/>

    </Layout>
  )
}
