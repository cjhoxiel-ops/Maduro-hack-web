import {getStore} from "@netlify/blobs";
const store=()=>getStore({name:"sign-project-data",consistency:"strong"});
export async function get(key,fallback){return (await store().get(key,{type:"json"}))??fallback}
export async function put(key,value){return store().setJSON(key,value)}
export async function del(key){return store().delete(key)}
