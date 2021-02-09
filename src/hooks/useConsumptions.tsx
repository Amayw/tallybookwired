import {useEffect, useState} from 'react';
import {useUpdate} from './useUpdate';

type Consumption={
  selectedId:number,
  category:'-'|'+',
  note:string,
  amount:string,
  date:string
}

const useConsumptions=()=>{
  const [consumptions,setConsumptions]=useState<Consumption[]>([]);
  useEffect(()=>{
    setConsumptions(JSON.parse(window.localStorage.getItem('reactAllConsumptions')||'[]'));
  },[])

  useUpdate(()=>{
    window.localStorage.setItem('reactAllConsumptions',JSON.stringify(consumptions));
  },[consumptions])

  const addConsumption=(consumption:Consumption)=>{
    setConsumptions([...consumptions,consumption]);
  }

  return {addConsumption}
}

export {useConsumptions};
