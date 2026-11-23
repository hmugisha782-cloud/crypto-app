export const SACCO_GROUPS=[{id:"SC-01",name:"🤝 Gatsibo Kabarore Umurenge SACCO Group",shareRwf:10000,apy:15.2},{id:"SC-02",name:"💼 Kigali FinTech Founders Digital Ikibina",shareRwf:50000,apy:18.0},{id:"SC-03",name:"🌾 Eastern Province Agro-Women Cooperative",shareRwf:5000,apy:14.5}];
export function calcGroupPayout(shareRwf,members=12){return Math.round(Number(shareRwf||0)*Number(members||12));}
