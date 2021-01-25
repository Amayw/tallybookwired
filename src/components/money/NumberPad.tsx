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
      width: 20%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`
const NumberPad:React.FC=()=>{
  const [note,setNote]=useState('');
  const [output,setOutput]=useState('0');
  const [toggleOpen,setToggleOpen]=useState<boolean>(false);
  const [date,setDate]=useState<string>('');

  const onChangeDate=(e:CustomEvent)=>{
    setDate(e.detail.selected);
  }

  const handleButton=(e: React.MouseEvent)=>{
    const text=(((e.target as HTMLButtonElement).textContent) as string).trim();
    if('0123456789'.split('').indexOf(text)>=0){
      if (output === '0') {
        setOutput(text);
      } else {
        setOutput(output + text);
      }
    }else if(text==='删除'){
      if(output.length>=1){
        setOutput(output.slice(0,-1));
      }

      if(output.length===1||output===''){
        setOutput('0');
      }
    }else if(text==='清空'){
      setOutput('0');
    }else if(text==='.'){
      if(output.indexOf('.')>=0){
        return;
      }
      setOutput(output + text);
    }else if(text==='完成'){
      console.log('ok');
    }
  }

  return (
    <NumberPadWrapper>
       <div className='inputs'>
         <WiredInput className='left' placeholder='请输入备注' value={note} onBlur={e=>setNote(e.target.value)}/>
         <WiredInput className='right' value={output}/>
       </div>
       <div className='buttons' onClick={handleButton}>
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
              关闭
            </WiredButton>
          </div>
        </div>
      </WiredDialog>
    </NumberPadWrapper>
  )
}

export default NumberPad;
