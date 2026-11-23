const UK="kgt_auth_user_v1",DK="kgt_auth_db_v1";
export function getAuthUser(){try{return JSON.parse(localStorage.getItem(UK)||"null");}catch{return null;}}
export function logoutAuth(){localStorage.removeItem(UK);}
export function authAction(mode,name,email,pw,rw){
  const em=String(email||"").trim().toLowerCase(),p=String(pw||"").trim();
  if(!em||p.length<4)return{err:rw?"Shyiramo Email/Telefoni na Password (inyuguti 4+)":"Enter Email/Phone & Password (4+ chars)"};
  let db={};try{db=JSON.parse(localStorage.getItem(DK)||"{}");}catch{}
  if(mode==="reg"){if(db[em])return{err:rw?"Konti isanzwe ihari. Injira hasi.":"Account already exists. Sign In below."};const u={name:name.trim()||em.split("@").at(0),email:em,pw:p};db[em]=u;localStorage.setItem(DK,JSON.stringify(db));localStorage.setItem(UK,JSON.stringify(u));return{user:u};}
  if(mode==="rst"){if(!db[em])return{err:rw?"Iyi Email/Telefoni ntibonetse.":"Email/Phone not found."};db[em].pw=p;localStorage.setItem(DK,JSON.stringify(db));localStorage.setItem(UK,JSON.stringify(db[em]));return{user:db[em]};}
  const f=db[em];if(!f)return{err:rw?"Konti ntibonetse. Fungura konti hasi.":"Account not found. Create one below."};
  if(f.pw!==p)return{err:rw?"Ijambo ry ibanga si ryo.":"Wrong password."};
  localStorage.setItem(UK,JSON.stringify(f));return{user:f};
}
