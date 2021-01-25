import styled from 'styled-components';
import Icon from '../Icon';

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

const TagsWrapper=styled.div`
  >ul{
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    >li{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 25%;
      wired-icon-button{
        >.icon{
          width: 20px;
          height:20px;
        }
      }
    }
  }
`
export default function Tags(){
  return (
    <TagsWrapper>
      <ul>
        {labelList.map(label=>
          <li key={label.id}>
            <button><Icon name={label.icon}/></button>
            <span>{label.name}</span>
          </li>)}
      </ul>
    </TagsWrapper>
  )
}
