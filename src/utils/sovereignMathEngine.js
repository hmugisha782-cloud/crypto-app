export function calcCompoundRoi(p,r,m){return Number((p*Math.pow(1+r/100/12,m)).toFixed(2));}
export function calcLoanMonthly(p,r,m){const i=r/100/12;return i===0?Number((p/m).toFixed(2)):Number(((p*i)/(1-Math.pow(1+i,-m))).toFixed(2));}
export function calcRraVat(gross){const net=gross/1.18;return{net:Math.round(net),vat:Math.round(gross-net)};}
export function calcCryptoSlippage(amt,bps=12){return Number((amt*(1-bps/10000)).toFixed(4));}
export function calcGoldGrams(usd,ozPx=2685){return Number(((usd/ozPx)*31.1035).toFixed(4));}
export function calcFuelLiters(rwf,px=1640){return Number((rwf/px).toFixed(2));}
export function calcMomoFeeRwf(rwf){return rwf<=1000?0:rwf<=10000?100:rwf<=150000?250:500;}
export function calcFxSpread(usd,rate=1480,spread=0.005){return Math.round(usd*rate*(1-spread));}
export function calcStakingDaily(usd,apy=14.5){return Number(((usd*(apy/100))/365).toFixed(4));}
export function calcPortfolioRiskScore(btcPct,cashPct){return Math.min(100,Math.max(5,Math.round(btcPct*0.85+(100-cashPct)*0.25)));}
