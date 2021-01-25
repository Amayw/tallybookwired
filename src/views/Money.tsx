import React from 'react'
import Layout from '../components/Layout';
import Category from '../components/money/Category';
import Tags from '../components/money/Tags';


export default function Money(){
  return (
    <Layout>
      <Category/>
      <Tags/>
    </Layout>
  )
}