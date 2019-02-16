import ajax from './ajax'
const BASE_URL='http://localhost:4000'
export const Recommendlist=()=> ajax(BASE_URL+'/list')
//export const Singerlist=()=> ajax(BASE_URL+'/singerlist')
export const Toprlist=()=> ajax(BASE_URL+'/toplist')
export  const Topdetail=(id)=>ajax(BASE_URL+'/topinfo',{id})
export  const  Serach=(sname,page)=>ajax(BASE_URL+'/serach',{sname,page})
