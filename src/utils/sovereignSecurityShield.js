export function sanitizeText(s){return String(s||"").replace(/[<>]/g,"").trim().slice(0,500);}
export function verifyChecksum(id,amt){return String(id||"").startsWith("KGT")&&Number(amt)>=0;}
export function maskAccount(acc){const s=String(acc||"");return s.length<=4?s:"****"+s.slice(-4);}
export function createSessionNonce(){return Math.random().toString(36).slice(2,10).toUpperCase();}
export function isSafeUrl(u){return /^https:\/\//i.test(String(u||""));}
