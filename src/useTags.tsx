import {useState} from 'react';
const labelList = [
  {id: 0, icon: 'icon-clothes5', name: '服饰'},
  {id: 1, icon: 'icon-food4', name: '餐饮'},
  {id: 2, icon: 'icon-book2', name: '书籍'},
  {id: 3, icon: 'icon-travel1', name: '旅游'},
  {id: 4, icon: 'icon-beauty6', name: '美容'},
  {id: 5, icon: 'icon-daily1', name: '日用'},
  {id: 6, icon: 'icon-vegetable3', name: '蔬菜'},
  {id: 7, icon: 'icon-fruit8', name: '水果'},
  {id: 8, icon: 'icon-pet1', name: '宠物'},
  {id: 9, icon: 'icon-lottery1', name: '彩票'},
  {id: 10, icon: 'icon-traffic5', name: '交通'},
  {id: 11, icon: 'icon-home3', name: '住房'},
  {id: 12, icon: 'icon-medical2', name: '医疗'},
  {id: 13, icon: 'icon-fun2', name: '娱乐'},
  {id: 14, icon: 'icon-baby2', name: '母婴'},
  {id: 15, icon: 'icon-car2', name: '汽车'},
  {id: 16, icon: 'icon-communication4', name: '通讯'},
  {id: 17, icon: 'icon-digital2', name: '数码'}
];
const useTags=()=>{
  const [tags,setTags]=useState<{id:number,icon:string,name:string}[]>(labelList);

  const findTag=(id:number)=>{
    return tags.filter(label=>label.id===id)[0];
  }

  const updateTag=(obj:{id:number,icon:string,name:string})=>{
    setTags(tags.map(tag=>{
      return tag.id === obj.id ? obj : tag;
    }))
  }
  const deleteTag=(id:number)=>{
    setTags(tags.filter((tag:{id:number,icon:string,name:string})=>tag.id!==id));
  }
  return {
    tags,setTags,findTag,updateTag,deleteTag
  }
}

export {useTags};
