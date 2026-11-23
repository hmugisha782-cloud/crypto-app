export const MERCHANT_TERMINALS=[{id:"POS-01",name:"🏪 Kigali Heights & Simba Supermarket QR Till",cashbackPct:3},{id:"POS-02",name:"🌾 Gatsibo Kabarore Agro-Dealer & Pharmacy POS",cashbackPct:4},{id:"POS-03",name:"☕ Bourbon Coffee & Kigali Restaurant Tap-to-Pay",cashbackPct:5}];
export function calcCashbackRwf(rwf,pct){return Math.round(Number(rwf||0)*(Number(pct||0)/100));}
