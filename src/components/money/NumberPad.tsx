import React, {useEffect, useState} from 'react';
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
    display: flex;
    flex-direction: row;
    max-width: 500px;
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
      border: 1px solid red;
      width: 16vw;
      margin:0 2vw;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`
type ParameterProps={
  note:string,
  amount:string,
  date:string
}
type Props={
  noteAmountDate:ParameterProps,
  onChange:(obj:Partial<ParameterProps>)=>void,
  onOk?:()=>void
}
const NumberPad:React.FC<Props>=(props)=>{
  const note=props.noteAmountDate.note;
  const output=props.noteAmountDate.amount;
  const [toggleOpen,setToggleOpen]=useState<boolean>(false);
  const date=props.noteAmountDate.date;

  const onChangeDate=(e:CustomEvent)=>{
    props.onChange({date:e.detail.selected});
  }

  const onChangeNote=(note:string)=>{
    props.onChange({note});
  }


  const onChangeAmount=(e: React.MouseEvent)=>{
    const text=(((e.target as HTMLButtonElement).textContent) as string).trim();
    if(text===undefined){
      return;
    }
    props.onChange({amount:handleButton(text) as string});
  }

  const onChangeDisplayAmount=(amount:string)=>{
    console.log(amount);
  }

  const handleButton=(text:string)=>{
    if('0123456789'.split('').indexOf(text)>=0){
      if (output === '0') {
        return text;
      } else {
        return output + text;
      }
    }else if(text==='删除'){
      if(output.length>=1){
        return output.slice(0,-1);
      }

      if(output.length===1||output===''){
        return '0';
      }
    }else if(text==='清空'){
      return '0';
    }else if(text==='.'){
      if(output.indexOf('.')>=0){
        return output;
      }
      return output + text;
    }else if(text==='完成'){
      if(props.onOk){
        props.onOk();
      }
    }

    return output;
  }

  useEffect(()=>{
    console.log('here');
  },[output])
  return (
    <NumberPadWrapper>
       <div className='inputs'>
         <WiredInput className='left' placeholder='请输入备注' value={note} onBlur={e=>onChangeNote(e.target.value)}/>
         <WiredInput className='right' value={output} onChange={e=>onChangeDisplayAmount(e.target.value)}></WiredInput>
       </div>
       <div className='buttons' onClick={onChangeAmount}>
         <WiredButton>&nbsp;1&nbsp;</WiredButton>
         <WiredButton>&nbsp;2&nbsp;</WiredButton>
         <WiredButton>&nbsp;3&nbsp;</WiredButton>
         <WiredButton>&nbsp;4&nbsp;</WiredButton>
         <WiredButton elevation={2} onClick={()=>setToggleOpen(!toggleOpen)}>日历
         </WiredButton>
         <WiredButton>&nbsp;5&nbsp;</WiredButton>
         <WiredButton>&nbsp;6&nbsp;</WiredButton>
         <WiredButton>&nbsp;7&nbsp;</WiredButton>
         <WiredButton>&nbsp;8&nbsp;</WiredButton>
         <WiredButton>删除</WiredButton>
         <WiredButton>&nbsp;9&nbsp;</WiredButton>
         <WiredButton>&nbsp;0&nbsp;</WiredButton>
         <WiredButton>&nbsp;.&nbsp;</WiredButton>
         <WiredButton>清空</WiredButton>
         <WiredButton>完成</WiredButton>
       </div>
      <WiredDialog elevation={1} zIndex={1} open={toggleOpen}>
        <div style={{textAlign: 'center'}}>
          <div>
            <WiredCalendar bgColor="white" dimmedColor="gray" elevation={1}
              lineColor="black" locale="en" onSelect={onChangeDate} selectedColor="red" selectedDate={date}/>
          </div>
          <br />
          <div>
            <WiredButton  onClick={()=>setToggleOpen(!toggleOpen)}>
              确定
            </WiredButton>
          </div>
        </div>
      </WiredDialog>
    </NumberPadWrapper>
  )
}

export default NumberPad;
