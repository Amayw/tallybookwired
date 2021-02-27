import {useEffect, useState} from 'react';
import {useUpdate} from './useUpdate';

export type ConsumptionType={
  selectedId:number,
  category:'-'|'+',
  note:string,
  amount:string,
  date:Date
}

const useConsumptions=()=>{
  const [consumptions,setConsumptions]=useState<ConsumptionType[]>([]);
  useEffect(()=>{
    setConsumptions(JSON.parse(window.localStorage.getItem('reactAllConsumptions')||'[]'));
  },[])

  useUpdate(()=>{
    window.localStorage.setItem('reactAllConsumptions',JSON.stringify(consumptions));
  },consumptions)

  const addConsumption=(consumption:ConsumptionType)=>{
    if(consumption.amount==='0'){
      return false;
    }
    setConsumptions([...consumptions,consumption]);
    return true;
  }

  return {consumptions,addConsumption}
}

export {useConsumptions};
