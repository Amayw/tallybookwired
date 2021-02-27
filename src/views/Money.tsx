import React, { useState} from 'react';
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
  date:Date
}
const defaultFormData:Consumption={
  selectedId:1,
  category:'-',
  note:'',
  amount:'0',
  date:new Date()
}

const Money:React.FC=()=>{

  const [consumption,setConsumption]=useState<Consumption>(defaultFormData);

  const onChange=(obj:Partial<typeof consumption>)=>{
    setConsumption({
      ...consumption,
      ...obj
    })
  }


  const {addConsumption}=useConsumptions();

  const onAddConsumption=()=>{
    if(addConsumption(consumption)){
      alert('记账成功');
      setConsumption(defaultFormData);
    }else{
      alert('请输入记账金额');
    }
  }

  return (
    <Layout>
      <Category category={consumption.category}
                onChange={category=>onChange({category})}/>
      <Tags selectedId={consumption.selectedId}
            onChange={selectedId=>onChange({selectedId})}/>
      <NumberPad note={consumption.note} amount={consumption.amount}
                 onChange={obj=>onChange(obj)}
                 onOk={onAddConsumption}/>
    </Layout>
  )
}

export default Money
