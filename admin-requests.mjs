import {json,admin} from "./_auth.mjs";
import {get} from "./_store.mjs";
export default async event=>{if(event.httpMethod!=="GET")return json(405,{error:"Método no permitido"});if(!admin(event))return json(401,{error:"Solo administración."});return json(200,{requests:(await get("requests",[])).filter(x=>x.status==="pending")})};
export const config={path:"/.netlify/functions/admin-requests"};