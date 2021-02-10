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
    display: flex;
    flex-direction: row;
    width: 90vw;
    >.left{
      width: 60vw;
      padding: 8px;
      border: none;
      outline: none;
    }
    >.right{
      width: 30vw;
      padding: 4px;
      background-color:#fff;
      display: flex;
      justify-content: flex-end;
      flex-wrap: nowrap;
      overflow:auto;
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
  onOk:()=>void
}
const NumberPad:React.FC<Props>=(props)=>{
  let [note,setNote]=useState(props.noteAmountDate.note);
  let output=props.noteAmountDate.amount;
  const [toggleOpen,setToggleOpen]=useState<boolean>(false);
  let date=props.noteAmountDate.date;

  const onChangeDate=(date:string)=>{
    props.onChange({date});
  }

  const onChangeNote=(note:string)=>{
    setNote(note);
    props.onChange({note});
  }

  const onChangeAmount=(e: React.MouseEvent)=>{
    const text=(((e.target as HTMLButtonElement).textContent) as string).trim();
    if(text===undefined){
      return;
    }
    const output=handleButton(text);
    if(output.length>10){
      alert('不能输入了哦，你也太会花钱了');
      return;
    }
    props.onChange({amount:output as string});
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
      console.log('before');
      console.log(props.noteAmountDate);
        props.onOk();
        setNote('')
        output='0';

    }
    return output;
  }

  return (
    <NumberPadWrapper>
       <div className='inputs'>
         <input className='left' placeholder='请输入备注' value={note} onChange={e=>onChangeNote(e.target.value)}/>
         <div className='right'>{`${output}元`}</div>
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
              lineColor="black" locale="en" onSelect={e=>onChangeDate(e.detail.selected)} selectedColor="red" selectedDate={date}/>
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
