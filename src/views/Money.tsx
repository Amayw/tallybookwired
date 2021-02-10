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
  date:string
}
const defaultFormData:Consumption={
  selectedId:8,
  category:'-',
  note:'',
  amount:'0',
  date:(new Date()).toString().split(' ').slice(1,4).join(',')
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
      <NumberPad noteAmountDate={{note:consumption.note,amount:consumption.amount,date:consumption.date}}
                 onChange={obj=>onChange(obj)}
                 onOk={onAddConsumption}/>
    </Layout>
  )
}

export default Money
