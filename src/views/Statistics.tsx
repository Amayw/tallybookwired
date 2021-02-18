
import React, {useState} from 'react';
import Layout from '../components/Layout';
import Category from '../components/money/Category';
import styled from 'styled-components';
import {useConsumptions} from '../hooks/useConsumptions';
import Icon from '../components/Icon';
import {useTags} from '../hooks/useTags';
import day from 'dayjs'

const RecordsWrapper=styled.ul`
  height: 84vh;
  background-color:#fff;
  >li{
    background-color: #f4f7fc;
    margin: 8px;
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
`


export default function Statistics(){
  const [category,setCategory]=useState<'-'|'+'>('-');
  const {consumptions}=useConsumptions();
  const {getTagIcon,getTagName}=useTags();


  return(
    <Layout>
      <Category category={category} onChange={(category)=>setCategory(category)}/>
      <RecordsWrapper>
        {
          consumptions.map(consumption=>(
            <li key={consumption.date}>
              <div className='left'>
                <Icon name={getTagIcon(consumption.selectedId)}/>
                <span>{getTagName(consumption.selectedId)}</span>
                <span className='note'>{consumption.note}</span>
              </div>
              <span>{day(consumption.date).format('YYYY年MM月DD日')}</span>
              <span>￥{consumption.amount}</span>
            </li>
          ))
        }
      </RecordsWrapper>
    </Layout>
  )
}
