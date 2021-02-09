import React, {useState} from 'react';
import Layout from '../components/Layout';
import Category from '../components/money/Category';
import Tags from '../components/money/Tags';
import NumberPad from '../components/money/NumberPad';
import {useConsumptions} from '../hooks/useConsumptions';



type Consumption={
  selectedId:number,
  category:'-'|'+',
  note:string,
  amount:string,
  date:string
}
const Money:React.FC=()=>{

  const [consumption,setConsumption]=useState<Consumption>({
    selectedId:2,
    category:'-',
    note:'',
    amount:'0',
    date:(new Date()).toString().split(' ').slice(1,4).join(',')
  });

  const onChange=(obj:Partial<typeof consumption>)=>{
    setConsumption({
      ...consumption,
      ...obj
    })
  }

  const {addConsumption}=useConsumptions();
  const onAddConsumption=()=>{
    addConsumption(consumption);
  }

  return (
    <Layout>
      {consumption.date}{consumption.selectedId}{consumption.note}{consumption.amount}
      <Category category={consumption.category}
                onChange={category=>onChange({category})}/>
      <Tags selectedId={consumption.selectedId}
            onChange={selectedId=>onChange({selectedId})}/>
      <NumberPad noteAmountDate={{note:consumption.note,amount:consumption.amount,date:consumption.date}}
                 onChange={obj=>onChange(obj)}
                 onOk={()=>onAddConsumption()}/>
    </Layout>
  )
}

export default Money
