import {json,clearCookie} from "./_auth.mjs";
export default async event=>json(200,{ok:true},{"Set-Cookie":clearCookie()});
export const config={path:"/.netlify/functions/logout"};