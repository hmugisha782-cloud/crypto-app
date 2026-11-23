import { useState } from "react";
import { RWANDA_PROPERTIES, INSURANCE_PLANS, calcFractionalRentMonthly } from "../utils/sovereignRealEstateAndInsurance.js";
import { recordSovereignTx } from "../utils/sovereignLedger.js";
export default function SovereignRealEstateInsuranceHub({rates={},theme,panel}){
  const [propId,setPropId]=useState(RWANDA_PROPERTIES[0].id);
  const [investUsd,setInvestUsd]=useState(100);
  const [insId,setInsId]=useState(INSURANCE_PLANS[0].id);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const prop=RWANDA_PROPERTIES.find(p=>p.id===propId)||RWANDA_PROPERTIES[0];
  const ins=INSURANCE_PLANS.find(i=>i.id===insId)||INSURANCE_PLANS[0];
  const estRent=calcFractionalRentMonthly(investUsd,prop.yieldPct);
  function buyShare(){
    const v=Math.max(10,Number(investUsd||0));
    const {tx}=recordSovereignTx({hub:"Rwanda Fractional Real Estate",title:`${prop.name} ($${v} Share)`,amountUsd:v,rwfRate:rwf,type:"DEBIT"});
    setMsg(`🏢 DEED ISSUED [${tx.id}]: $${v} USD in ${prop.name} · Est. Rent: $${estRent}/mo!`);
  }
  function payInsurance(){
    const usd=Number((ins.monthlyRwf/rwf).toFixed(2));
    const {tx}=recordSovereignTx({hub:"Rwanda Digital Insurance",title:ins.name,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});
    setMsg(`🛡️ POLICY ACTIVE [${tx.id}]: ${ins.name} (${ins.monthlyRwf.toLocaleString()} RWF/mo)!`);
  }
  return(<section id="sovereign-realestate-insurance-hub" style={{...panel,marginBottom:18,borderTop:"4px solid #10b981",display:"grid",gap:10}}>
    <strong style={{fontSize:15}}>🏢 Rwanda Fractional Real Estate Deeds & Instant Digital Insurance Shield</strong>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(265px,1fr))",gap:10}}>
      <div style={{padding:9,borderRadius:9,background:theme.input,border:`1px solid ${theme.border}`,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
        <select value={propId} onChange={e=>setPropId(e.target.value)} style={{flex:1,minWidth:160,padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{RWANDA_PROPERTIES.map(p=><option key={p.id} value={p.id}>{p.name} ({p.yieldPct}% APY)</option>)}</select>
        <input type="number" value={investUsd} onChange={e=>setInvestUsd(e.target.value)} style={{width:70,padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:12,fontWeight:800}}/>
        <button type="button" onClick={buyShare} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,fontSize:11.5,cursor:"pointer"}}>🏢 Buy Share</button>
      </div>
      <div style={{padding:9,borderRadius:9,background:theme.input,border:`1px solid ${theme.border}`,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
        <select value={insId} onChange={e=>setInsId(e.target.value)} style={{flex:1,minWidth:160,padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{INSURANCE_PLANS.map(i=><option key={i.id} value={i.id}>{i.name} ({i.monthlyRwf.toLocaleString()} RWF)</option>)}</select>
        <button type="button" onClick={payInsurance} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#38bdf8",color:"#02131d",fontWeight:900,fontSize:11.5,cursor:"pointer"}}>🛡️ Insure Now</button>
      </div>
    </div>
    {msg&&<div style={{padding:"6px 10px",borderRadius:8,background:"rgba(16,185,129,0.2)",border:"1px solid #10b981",color:"#34d399",fontSize:12,fontWeight:800}}>{msg}</div>}
  </section>);
}
