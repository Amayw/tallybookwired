import React, {useState} from 'react';
import styled from 'styled-components';
import {WiredButton, WiredCalendar, WiredDialog, WiredInput} from 'react-wired-elements';

const NumberPadWrapper=styled.div`
  height: 32vh;
  overflow: hidden;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  >.inputs{
    margin: 6px 10px;
    >.left{
      width: 60vw;
      padding: 4px;
    }
    >.right{
      width: 30vw;
      padding: 4px;
    }
  }
  >.buttons{
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    >wired-button{
      width: 20%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`
const NumberPad:React.FC=()=>{
  const [toggleOpen,setToggleOpen]=useState<boolean>(false);
  const [date,setDate]=useState<string>('');
  const onChangeDate=(e:CustomEvent)=>{
    setDate(e.detail.selected);
  }
  return (
    <NumberPadWrapper>
       <div className='inputs'>
         <WiredInput className='left' placeholder='请输入备注'/>
         <WiredInput className='right' placeholder='0元'/>
       </div>
       <div className='buttons'>
         <WiredButton elevation={2}>1</WiredButton>
         <WiredButton>2</WiredButton>
         <WiredButton>3</WiredButton>
         <WiredButton>4</WiredButton>
         <WiredButton elevation={2} onClick={()=>setToggleOpen(!toggleOpen)}>日历
         </WiredButton>
         <WiredButton>5</WiredButton>
         <WiredButton>6</WiredButton>
         <WiredButton>7</WiredButton>
         <WiredButton>8</WiredButton>
         <WiredButton>删除</WiredButton>
         <WiredButton>9</WiredButton>
         <WiredButton>0</WiredButton>
         <WiredButton>.</WiredButton>
         <WiredButton>清空</WiredButton>
         <WiredButton>完成</WiredButton>
       </div>
      <WiredDialog elevation={1} zIndex={1} open={toggleOpen}>
        <div style={{textAlign: 'center'}}>
          <div>
            <WiredCalendar bgColor="white" dimmedColor="gray" elevation={1}
              lineColor="black" locale="en" onSelect={e=>onChangeDate(e)} selectedColor="red" selectedDate={date}/>
          </div>
          <br />
          <div>
            <WiredButton  onClick={()=>setToggleOpen(!toggleOpen)}>
              关闭
            </WiredButton>
          </div>
        </div>
      </WiredDialog>
    </NumberPadWrapper>
  )
}

export default NumberPad;
