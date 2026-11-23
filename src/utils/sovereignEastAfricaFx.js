export const EAC_RATES={RWF:1,USD:0.000675,KES:0.0875,UGX:2.51,TZS:1.78,BIF:1.98,CDF:1.92,EUR:0.00062,GBP:0.00053};
export function convertRwfToAll(rwf){const v=Number(rwf||0);return Object.fromEntries(Object.entries(EAC_RATES).map(([k,r])=>[k,Number((v*r).toFixed(k==="USD"||k==="EUR"||k==="GBP"?2:0))]));}
export const EAC_CORRIDORS=["🇷🇼 Kigali -> 🇰🇪 Nairobi (M-Pesa)","🇷🇼 Kigali -> 🇺🇬 Kampala (MTN UG)","🇷🇼 Kigali -> 🇹🇿 Dar es Salaam (Tigo/M-Pesa)","🇷🇼 Gatsibo -> 🇨🇩 Goma/Bukavu (Cross-Border)","🇷🇼 Kigali -> 🇧🇮 Bujumbura (Lumicash)"];
