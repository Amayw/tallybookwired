import React, {useState} from 'react';
import Layout from '../components/Layout';
import Category from '../components/money/Category';
import Tags from '../components/money/Tags';
import NumberPad from '../components/money/NumberPad';

type Consumption={
  selectedId:number,
  category:'-'|'+',
  note:string,
  amount:string
}
export default function Money(){
  const [consumption,setConsumption]=useState<Consumption>({
    selectedId:2,
    category:'-',
    note:'',
    amount:'0'
  });

  return (
    <Layout>
      {consumption.selectedId}{consumption.category}
      <Category category={consumption.category} onChange={category=>setConsumption({...consumption,category})}/>
      <Tags selectedId={consumption.selectedId} onChange={selectedId=>setConsumption({...consumption,selectedId})}/>
      <NumberPad/>
    </Layout>
  )
}
