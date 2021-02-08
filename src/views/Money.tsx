import React, {useState} from 'react';
import Layout from '../components/Layout';
import Category from '../components/money/Category';
import Tags from '../components/money/Tags';
import NumberPad from '../components/money/NumberPad';

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

  return (
    <Layout>
      <Category category={consumption.category}
                onChange={category=>onChange({category})}/>
      <Tags selectedId={consumption.selectedId}
            onChange={selectedId=>onChange({selectedId})}/>
      <NumberPad noteAmountDate={{note:consumption.note,amount:consumption.amount,date:consumption.date}}
                 onChange={obj=>onChange(obj)}
                 onOk={()=>{}}/>
    </Layout>
  )
}

export default Money
