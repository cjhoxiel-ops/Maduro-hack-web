import {sign,cookie,json,body,safeText} from "./_auth.mjs";
import {get} from "./_store.mjs";
import crypto from "node:crypto";
export default async event=>{if(event.httpMethod!=="POST")return json(405,{error:"Método no permitido"});const b=body(event),u=safeText(b.username,120).toLowerCase(),p=typeof b.password==="string"?b.password:"";const users=await get("users",[]),user=users.find(x=>x.username.toLowerCase()===u);if(!user||user.passwordHash!==crypto.createHash("sha256").update(p).digest("hex"))return json(401,{error:"Usuario o contraseña incorrectos."});return json(200,{role:"client",username:user.username},{ "Set-Cookie":cookie(sign({role:"client",username:user.username}))})};
export const config={path:"/.netlify/functions/login"};