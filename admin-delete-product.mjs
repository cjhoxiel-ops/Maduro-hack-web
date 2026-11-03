import {json,body,admin,safeText} from "./_auth.mjs";
import {get,put} from "./_store.mjs";
export default async event=>{if(event.httpMethod!=="POST")return json(405,{error:"Método no permitido"});if(!admin(event))return json(401,{error:"Solo administración."});const id=safeText(body(event).id,100),products=await get("products",[]);await put("products",products.filter(p=>p.id!==id));return json(200,{ok:true})};
export const config={path:"/.netlify/functions/admin-delete-product"};