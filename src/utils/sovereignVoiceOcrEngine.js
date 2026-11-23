export const VOICE_PRESETS=["Check my RWF and USDT balance","Convert 500 USD to RWF","Show Bitcoin and Gold live price","Pay 10,000 RWF EUCL CashPower"];
export function parseOcrReceipt(raw){const m=String(raw||"").match(/(\d[\d,]*)/);const val=m?Number(m[1].replace(/,/g,"")):5000;return{detectedRwf:val,verified:true,code:"OCR-"+Date.now().toString(36).toUpperCase()};}
