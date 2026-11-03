import {json,read} from "./_auth.mjs";
import {get} from "./_store.mjs";
export default async event=>{if(event.httpMethod!=="GET")return json(405,{error:"Método no permitido"});const s=read(event);if(!s)return json(401,{error:"Inicia sesión."});return json(200,{products:await get("products",[])})};
export const config={path:"/.netlify/functions/products"};