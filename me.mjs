import {read,json} from "./_auth.mjs";
export default async (event)=>{if(event.httpMethod!=="GET")return json(405,{error:"Método no permitido"});const s=read(event);return s?json(200,{role:s.role,username:s.username||"Administrador"}):json(401,{error:"Inicia sesión."})};
export const config={path:"/.netlify/functions/me"};