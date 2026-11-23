export const KGT_CONFIG={version:"v275.0",hubs:175,languages:15,nodes:10000,region:"Africa/Kigali"};
export const SUPPORTED_FIAT=["RWF","USD","KES","UGX","TZS","EUR","GBP"];
export const SUPPORTED_CRYPTO=["USDT","BTC","ETH","PAXG","SOL","BNB"];
export function formatRwf(n){return Math.round(Number(n||0)).toLocaleString()+" RWF";}
export function formatUsd(n){return "$"+Number(n||0).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});}
export function calcPlatformFee(usd,bps=15){return Number(((Number(usd||0)*bps)/10000).toFixed(4));}
export function isRwandaPhone(p){return /^(\+?250|0)?7[2389]\d{7}$/.test(String(p||"").replace(/\s+/g,""));}
export function generateTxRef(){return "KGT-"+Date.now().toString(36).toUpperCase();}
export function getKigaliTimestamp(){return new Date().toLocaleString("en-GB",{timeZone:"Africa/Kigali"});}
export function clampAmount(v,min=1,max=1e9){return Math.min(max,Math.max(min,Number(v||0)));}
