const createId=():number=>{
  let maximumId=parseInt(window.localStorage.getItem('maximumId')||'18');
  maximumId++;
  window.localStorage.setItem('maximumId',maximumId.toString());
  return maximumId;
}
export default createId;
