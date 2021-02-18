
import React, {useState} from 'react';
import Layout from '../components/Layout';
import Category from '../components/money/Category';
import styled from 'styled-components';
import {ConsumptionType, useConsumptions} from '../hooks/useConsumptions';
import Icon from '../components/Icon';
import {useTags} from '../hooks/useTags';
import day from 'dayjs'

const RecordsWrapper=styled.div`
  height: 84vh;
  background-color:#fff;
  overflow: auto;
  >.item{
    >.title{
      margin: 0 8px 8px 8px;
      color:hotpink;
    }
    >ul>li{
    margin: 0 8px 8px 8px;
    background-color: #f4f7fc;
    padding: 8px;
    border-radius: 8px;
    display: flex;
    align-items:center;
    justify-content: space-between;
    >.left{
      display: flex;
      align-items: center;
      >span{
        margin-left: 4px;
        &.note{
          color: #9e9e9e;
          font-size: 14px;
          margin-left: 4px;
          max-width: 40vw;
          text-overflow: ellipsis;
      }
      }
    }
  }
  }
`


export default function Statistics(){
  const [category,setCategory]=useState<'-'|'+'>('-');
  const {consumptions}=useConsumptions();
  const {getTagIcon,getTagName}=useTags();
  const selectedCategory=consumptions.filter(consumption=>consumption.category===category);

  const hash:{[key:string]:ConsumptionType[]}={};
  selectedCategory.map(consumption=>{
    const key=day(consumption.date).format('YYYY年MM月DD日');
    if(!(key in hash)){
      hash[key]=[];
    }
    hash[key].push(consumption);
  })

  const array=Object.entries(hash).sort((a,b)=>{
    if(a[0]===b[0]) return 0;
    if(a[0]>b[0]) return -1;
    if(a[0]<b[0]) return 1;
    return 0;
})

  console.log(array);

  return(
    <Layout>
      <Category category={category} onChange={(category)=>setCategory(category)}/>
      <RecordsWrapper>
        {
          array.map(records=>(
                <div className='item'>
                  <div className='title' key={records[0]}>
                    <span>{records[0]}</span>
                  </div>
                  <ul>
                    {
                      records[1].map(consumption=>(
                        <li key={consumption.date}>
                          <div className='left'>
                            <Icon name={getTagIcon(consumption.selectedId)}/>
                            <span>{getTagName(consumption.selectedId)}</span>
                            <span className='note'>{consumption.note}</span>
                          </div>
                          <span>￥{consumption.amount}</span>
                        </li>
                      ))
                    }
                  </ul>
                </div>
          ))
        }
      </RecordsWrapper>
      {/*<RecordsWrapper>*/}
      {/*  {*/}
      {/*    selectedCategory.map(consumption=>(*/}
      {/*      <li key={consumption.date}>*/}
      {/*        <div className='left'>*/}
      {/*          <Icon name={getTagIcon(consumption.selectedId)}/>*/}
      {/*          <span>{getTagName(consumption.selectedId)}</span>*/}
      {/*          <span className='note'>{consumption.note}</span>*/}
      {/*        </div>*/}
      {/*        <span>￥{consumption.amount}</span>*/}
      {/*      </li>*/}
      {/*    ))*/}
      {/*  }*/}
      {/*</RecordsWrapper>*/}
    </Layout>
  )
}
