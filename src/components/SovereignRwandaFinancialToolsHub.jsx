import { useState } from "react";
import { calcLoanMonthly, calcRraVat, calcGoldGrams, calcFuelLiters, calcMomoFeeRwf, calcStakingDaily } from "../utils/sovereignMathEngine.js";
import { RWANDA_DISTRICTS, RWANDA_BANKS } from "../utils/sovereignRwandaDirectory.js";
export default function SovereignRwandaFinancialToolsHub({theme,panel}){
  const [amt,setAmt]=useState(100000);
  const [district,setDistrict]=useState("Gatsibo");
  const [bank,setBank]=useState(RWANDA_BANKS[0]);
  const vat=calcRraVat(amt);
  const loan=calcLoanMonthly(amt,14,12);
  const fee=calcMomoFeeRwf(amt);
  const liters=calcFuelLiters(amt);
  const gold=calcGoldGrams(amt/1480);
  const stake=calcStakingDaily(amt/1480);
  return(<section id="sovereign-rwanda-financial-tools" style={{...panel,marginBottom:18,borderTop:"4px solid #38bdf8",display:"grid",gap:10}}>
    <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
      <strong style={{fontSize:15}}>🧮 Rwanda & Global Financial Precision Suite (RRA EBM VAT, Loan, MoMo Fee, Gold & Staking)</strong>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        <select value={district} onChange={e=>setDistrict(e.target.value)} style={{padding:"5px 8px",borderRadius:8,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{RWANDA_DISTRICTS.map(d=><option key={d}>{d}</option>)}</select>
        <select value={bank} onChange={e=>setBank(e.target.value)} style={{padding:"5px 8px",borderRadius:8,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{RWANDA_BANKS.map(b=><option key={b}>{b}</option>)}</select>
        <input type="number" value={amt} onChange={e=>setAmt(Math.max(0,Number(e.target.value)))} style={{width:115,padding:"5px 8px",borderRadius:8,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:12,fontWeight:800}}/>
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:8,fontSize:11.5}}>
      <div style={{padding:8,borderRadius:8,background:theme.input,border:`1px solid ${theme.border}`}}>🏛️ RRA VAT (18%): <strong>{vat.vat.toLocaleString()} RWF</strong></div>
      <div style={{padding:8,borderRadius:8,background:theme.input,border:`1px solid ${theme.border}`}}>🏦 12m Loan/mo: <strong>{loan.toLocaleString()} RWF</strong></div>
      <div style={{padding:8,borderRadius:8,background:theme.input,border:`1px solid ${theme.border}`}}>📲 MoMo Fee: <strong>{fee.toLocaleString()} RWF</strong></div>
      <div style={{padding:8,borderRadius:8,background:theme.input,border:`1px solid ${theme.border}`}}>⛽ Fuel Est.: <strong>{liters} L</strong></div>
      <div style={{padding:8,borderRadius:8,background:theme.input,border:`1px solid ${theme.border}`}}>🥇 24K Gold: <strong>{gold} g</strong></div>
      <div style={{padding:8,borderRadius:8,background:theme.input,border:`1px solid ${theme.border}`}}>📈 Daily Yield: <strong>+${stake}/day</strong></div>
    </div>
  </section>);
}
