
import React, {useState} from 'react';
import Layout from '../components/Layout';
import Category from '../components/money/Category';
import styled from 'styled-components';
import {ConsumptionType, useConsumptions} from '../hooks/useConsumptions';
import Icon from '../components/Icon';
import {useTags} from '../hooks/useTags';
import day from 'dayjs'
import {NavLink} from 'react-router-dom';
import dayjs from 'dayjs';

const RecordsWrapper=styled.div`
  height: 84vh;
  background-color:#fff;
  overflow: auto;
  >.item{
    >.title{
      margin: 16px 8px 8px 8px;
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
const NoRecordsWrapper=styled.div`
  background-color:#fdfdfd;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 84vh;
  >div>a{
    color:#f7d26a;
    font-weight: 800;
  }
`

export default function Statistics(){
  const [category,setCategory]=useState<'-'|'+'>('-');
  const {consumptions}=useConsumptions();
  const {getTagIcon,getTagName}=useTags();
  const selectedCategory=consumptions.filter(consumption=>consumption.category===category);

  const hash:{[key:string]:ConsumptionType[]}={};
  selectedCategory.forEach(consumption=>{
    const key=day(consumption.date).format('YYYY-MM-DD');
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

  function beauty(title: string){
    const day=dayjs(title);
    const now=dayjs();
    if(day.isSame(now,'day')){
      return '今天';
    }else if(day.isSame(now.subtract(1,'day'),'day')){
      return '昨天';
    }else if(day.isSame(now.subtract(2,'day'),'day')){
      return '前天'
    }else{
      if(day.isSame(now,'year')){
        return day.format('MM月DD日');
      }else{
        return day.format('YYYY年MM月D日');
      }
    }
  }
  return(
    <Layout>
      <Category category={category} onChange={(category)=>setCategory(category)}/>
      {array.length!==0?(
        <RecordsWrapper>
          {
            array.map(([date,records])=>(
              <div className='item'  key={date}>
                <div className='title'>
                  <span>{beauty(date)}</span>
                </div>
                <ul>
                  {
                    records.map(consumption=>(
                      <li key={JSON.stringify(consumption)}>
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
      ):(
        <NoRecordsWrapper>
          <div>快去
            <NavLink activeClassName='is-active' to="/money">记一笔</NavLink>
            吧</div>
        </NoRecordsWrapper>
      )}

    </Layout>
  )
}
