export const EV_CHARGING_HUBS=[{id:"EV-01",name:"⚡ Kigali Convention & Airport Fast EV Charger (150kW)",rwfPerKwh:260},{id:"EV-02",name:"🔋 Gatsibo Kabarore Solar Battery Swap & Moto Station",rwfPerKwh:210},{id:"EV-03",name:"☀️ Nyagatare & Rwamagana Community Solar Micro-Grid",rwfPerKwh:195}];
export function calcEnergyCostRwf(kwh,rate){return Math.round(Number(kwh||0)*Number(rate||250));}
