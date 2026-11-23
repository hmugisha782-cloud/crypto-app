export function calcRwandaPayeRwf(gross){const g=Number(gross||0);if(g<=60000)return 0;if(g<=100000)return Math.round((g-60000)*0.10);if(g<=200000)return Math.round(4000+(g-100000)*0.20);return Math.round(24000+(g-200000)*0.30);}
export function calcCorporateCitRwf(profit,isKifc=true){return Math.round(Number(profit||0)*(isKifc?0.15:0.28));}
export function generateEbmSignature(txId){return "EBM-RRA-"+String(txId||"000").slice(-6)+"-VERIFIED";}
