import React from 'react';
import {useParams} from 'react-router-dom'
import {useTags} from '../useTags';

type Params={
    id:string
}
const EditLabel:React.FC=()=>{
    let { id }=useParams<Params>();
    const {findTag}=useTags();
    const label=findTag(parseInt(id));
    return (
      <div>{label.id}{label.icon}{label.name}</div>
    )
}

export default EditLabel;
