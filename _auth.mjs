import crypto from "node:crypto";
export const cookieName = "sign_session";
const secret = () => process.env.SESSION_SECRET;
export function sign(payload) {
  if (!secret() || secret().length < 32) throw new Error("SESSION_SECRET debe tener al menos 32 caracteres.");
  const data = Buffer.from(JSON.stringify({...payload, exp: Date.now()+8*60*60*1000})).toString("base64url");
  const sig = crypto.createHmac("sha256",secret()).update(data).digest("base64url");
  return `${data}.${sig}`;
}
export function read(event) {
  const raw=(event.headers.cookie||event.headers.Cookie||"").split(";").map(x=>x.trim()).find(x=>x.startsWith(cookieName+"="))?.slice(cookieName.length+1);
  if(!raw||!secret())return null;
  const [data,sig]=raw.split(".");
  if(!data||!sig)return null;
  const expected=crypto.createHmac("sha256",secret()).update(data).digest();
  let actual;try{actual=Buffer.from(sig,"base64url")}catch{return null}
  if(actual.length!==expected.length||!crypto.timingSafeEqual(actual,expected))return null;
  try{const p=JSON.parse(Buffer.from(data,"base64url").toString());return p.exp>Date.now()?p:null}catch{return null}
}
export const cookie = value => `${cookieName}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`;
export const clearCookie = () => `${cookieName}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
export const json = (statusCode, body, headers={}) => ({statusCode,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store",...headers},body:JSON.stringify(body)});
export function body(event){try{return JSON.parse(event.body||"{}")}catch{return {}}}
export function admin(event){const p=read(event);return p?.role==="admin"?p:null}
export function randomId(){return crypto.randomBytes(16).toString("hex")}
export function safeText(v,n=200){return typeof v==="string"?v.trim().slice(0,n):""}
