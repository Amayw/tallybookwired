import React, {useState} from 'react';
import styled from 'styled-components';
import {WiredButton} from 'react-wired-elements';

const NumberPadWrapper=styled.div`
  height: 32vh;
  overflow: hidden;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  >.inputs{
    margin: 10px 10px 6px 10px;
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
      width: 20vw;
      margin:0 2vw;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`
type ParameterProps={
  note:string,
  amount:string
}
type Props={
  note:string,
  amount:string,
  onChange:(obj:Partial<ParameterProps>)=>void,
  onOk:()=>void
}
const NumberPad:React.FC<Props>=(props)=>{
  let [note,setNote]=useState(props.note);
  let output=props.amount;

  const onChangeNote=(note:string)=>{
    setNote(note);
    props.onChange({note});
  }

  const onChangeAmount=(e: React.MouseEvent)=>{
    const text=(((e.target as HTMLButtonElement).textContent) as string).trim();
    if(text===undefined){
      return;
    }
    const output=handleButton(text)!;
    if(output.length>10){
      alert('不能输入了哦，你也太会花钱了');
      return;
    }
    props.onChange({amount:output as string});
  }

  const handleButton=(text:string)=>{
    // if('0123456789'.split('').indexOf(text)>=0){
    //   if (output === '0') {
    //     return text;
    //   } else {
    //     return output + text;
    //   }
    // }else if(text==='删除'){
    //   if(output.length>=1){
    //     return output.slice(0,-1);
    //   }
    //
    //   if(output.length===1||output===''){
    //     return '0';
    //   }
    // }else if(text==='清空'){
    //   return '0';
    // }else if(text==='.'){
    //   if(output.indexOf('.')>=0){
    //     return output;
    //   }
    //   return output + text;
    // }else if(text==='完成'){
    //     props.onOk();
    //     setNote('');
    //     output='0';
    //
    // }
    // return output;


    if ('0123456789'.indexOf(text) >= 0) {
      //输入数字
      if (output === '0') {
       output = text;
      } else {
        output += text;
      }
    } else if ('+-'.indexOf(text) >= 0) {
      //输入'+''-'
      if (output.indexOf('+') >= 0 || output.indexOf('-') >= 0) {
        //第二次输入加或减，那么先要计算前面的结果
        if (text === '+') {
          if (output.indexOf('-') >= 0) {
            //前面的计算是减，所以需要判断一下是否负数
            //若是负数，弹出提示框
            //若是正数，继续计算
            isZero(sub((output)), text);
          } else {
            output = add(output) + '+';
          }
        } else if (text === '-') {
          if (output.indexOf('+') >= 0) {
            output = add(output) + '-';
          } else {
            isZero(sub(output), text);
          }
        } else {
          return;
        }
      } else {
        //第一次输入加或减
        if (isNum(output)) {
          //输入减需要判断一下是不是负数
          if (text === '-' && output === '0') {
            alert('金额不能输入负数哦~');
          } else {
            output += text;
          }
        } else {
          //输入加则继续输入
          return;
        }
      }
    } else if (text === '清除') {
      output = '0';
    } else if (text === '删除') {
      if (output.length === 1) {
        output = '0';
      } else {
        output = output.slice(0, output.length - 1);
      }
    } else if (text === '.') {
      //输入点
      if (output.indexOf(text) >= 0) {
        //一个数字中只能一个点
        if (output.indexOf('+') >= 0) {
          //如果有加号，则加号之后的数字中可以有一个点
          const num1 = output.split('+');
          const arr1 = Array.from(num1[1]);
          isPoints(arr1, text);
        } else if (output.indexOf('-') >= 0) {
          //如果有减号，则减号之后的数字中可以有一个点
          const num2 = output.split('-');
          const arr2 = Array.from(num2[1]);
          isPoints(arr2, text);
        } else {
          return;
        }
        return;
      } else {
        output += text;
      }
    } else if (text === '完成') {
      if (output.indexOf('+') >= 0) {
        //判断是否有待计算的加运算
        output = add(output)!;
      } else if (output.indexOf('-') >= 0) {
        //判断是否有待计算的减运算
        output = sub(output)!;
      } else if(isResZero(output)){
        window.alert('请输入正确记账金额哦~');
      }else if (isNum(output)) {
        //判断金额是否为数字，排除'3.'这种情况
        //判断金额四舍五入后是否为0
        if(isResZero(isFloat(output)!)){
          window.alert('请输入正确的记账金额哦'+'(小数四舍五入精确到小数点后两位哦)'+'~');
          return;
        }
        props.onOk();
        setNote('');
        output='0';
      }
    }

    return output;
  }



  const add=(str: string)=>{
    const arr=str.split('+');
    return isFloat(String(Number(arr[0])+Number(arr[1])));
  }

  const sub=(str: string)=>{
    const arr=str.split('-');
    const res=Number(arr[0])-Number(arr[1]);
    if(res>0){
      return isFloat(String(res));
    }else{
      window.alert('金额不能为负数哦~');
      return '0';
    }
  }

  const isNum=(str: string)=> {
    if (output.indexOf('.') === output.length - 1) {
      window.alert("请检查输入金额，小数点不应在金额末尾！")
      return false;
    }else{
      return true;
    }
  }
  const isPoints=(str: string[],text: string)=>{
    if(str.indexOf(text)>=0){
      return;
    }else{
      output+=text;
    }
  }

  const isZero=(res: string|undefined,text: string)=>{
    if(res==='0'){
      output=res;
    }else{
      output=res+text;
    }
  }

  const isFloat=(str: string)=>{
    if(str.indexOf('.')){
      return String(Number(str).toFixed(2));
    }
  }

  const isResZero=(str: string)=>{
    const res=Array.from(str).filter(item=>item!=='.'&&item!=='0')
    return res.length === 0;
  }



  return (
    <NumberPadWrapper>
       <div className='inputs'>
         <input className='left' placeholder='请输入备注' value={note} onChange={e=>onChangeNote(e.target.value)}/>
         <div className='right'>{`${output}元`}</div>
       </div>
       <div className='buttons' onClick={onChangeAmount}>
         <WiredButton>&nbsp;&nbsp;1&nbsp;&nbsp;</WiredButton>
         <WiredButton>&nbsp;&nbsp;2&nbsp;&nbsp;</WiredButton>
         <WiredButton>&nbsp;&nbsp;3&nbsp;&nbsp;</WiredButton>
         <WiredButton>删除</WiredButton>
         <WiredButton>&nbsp;&nbsp;4&nbsp;&nbsp;</WiredButton>
         <WiredButton>&nbsp;&nbsp;5&nbsp;&nbsp;</WiredButton>
         <WiredButton>&nbsp;&nbsp;6&nbsp;&nbsp;</WiredButton>
         <WiredButton>&nbsp;&nbsp;+&nbsp;&nbsp;</WiredButton>
         <WiredButton>&nbsp;&nbsp;7&nbsp;&nbsp;</WiredButton>
         <WiredButton>&nbsp;&nbsp;8&nbsp;&nbsp;</WiredButton>
         <WiredButton>&nbsp;&nbsp;9&nbsp;&nbsp;</WiredButton>
         <WiredButton>&nbsp;&nbsp;-&nbsp;&nbsp;</WiredButton>
         <WiredButton>&nbsp;&nbsp;0&nbsp;&nbsp;</WiredButton>
         <WiredButton>&nbsp;&nbsp;.&nbsp;&nbsp;</WiredButton>
         <WiredButton>清空</WiredButton>
         <WiredButton>完成</WiredButton>
       </div>
    </NumberPadWrapper>
  )
}

export default NumberPad;
