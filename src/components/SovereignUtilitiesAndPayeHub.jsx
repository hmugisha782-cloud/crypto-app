import { useState } from "react";
import { UTILITY_PROVIDERS, calcKwhFromRwf } from "../utils/sovereignTelecomAndUtilities.js";
import { calcRwandaPayeRwf, generateEbmSignature } from "../utils/sovereignTaxAndCompliance.js";
import { recordSovereignTx } from "../utils/sovereignLedger.js";
export default function SovereignUtilitiesAndPayeHub({rates={},theme,panel}){
  const [prov,setProv]=useState(UTILITY_PROVIDERS.at(0).code);
  const [meter,setMeter]=useState("04289104421");
  const [rwfAmt,setRwfAmt]=useState(10000);
  const [salaryRwf,setSalaryRwf]=useState(450000);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const paye=calcRwandaPayeRwf(salaryRwf);
  function buyUtility(){
    const p=UTILITY_PROVIDERS.find(x=>x.code===prov)||UTILITY_PROVIDERS.at(0);
    const v=Math.max(1000,Number(rwfAmt||0));
    const usd=Number((v/rwf).toFixed(2));
    const {tx}=recordSovereignTx({hub:p.name,title:`Meter ${meter} (${v.toLocaleString()} RWF)`,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});
    const extra=p.code==="EUCL"?` · ${calcKwhFromRwf(v)} kWh Token`:` · ${generateEbmSignature(tx.id)}`;
    setMsg(`⚡ TOKEN ISSUED [${tx.id}]: ${p.name} · ${v.toLocaleString()} RWF${extra}!`);
  }
  return(<section id="sovereign-utilities-paye-hub" style={{...panel,marginBottom:18,borderTop:"4px solid #f59e0b",display:"grid",gap:10}}>
    <strong style={{fontSize:15}}>⚡ EUCL CashPower, WASAC, Starlink & RRA PAYE Tax Calculator</strong>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(265px,1fr))",gap:10}}>
      <div style={{padding:9,borderRadius:9,background:theme.input,border:`1px solid ${theme.border}`,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
        <select value={prov} onChange={e=>setProv(e.target.value)} style={{padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{UTILITY_PROVIDERS.map(u=><option key={u.code} value={u.code}>{u.name}</option>)}</select>
        <input type="text" value={meter} onChange={e=>setMeter(e.target.value)} style={{width:105,padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}/>
        <input type="number" value={rwfAmt} onChange={e=>setRwfAmt(e.target.value)} style={{width:85,padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:12,fontWeight:800}}/>
        <button type="button" onClick={buyUtility} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#f59e0b",color:"#02131d",fontWeight:900,fontSize:11.5,cursor:"pointer"}}>⚡ Pay Bill</button>
      </div>
      <div style={{padding:9,borderRadius:9,background:theme.input,border:`1px solid ${theme.border}`,display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",fontSize:12}}>
        <strong>🏛️ Gross Salary (RWF):</strong>
        <input type="number" value={salaryRwf} onChange={e=>setSalaryRwf(e.target.value)} style={{width:105,padding:"5px 7px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontWeight:800}}/>
        <span>PAYE Tax: <strong style={{color:"#fbbf24"}}>{paye.toLocaleString()} RWF</strong> · Net: <strong style={{color:"#34d399"}}>{Math.max(0,Number(salaryRwf||0)-paye).toLocaleString()} RWF</strong></span>
      </div>
    </div>
    {msg&&<div style={{padding:"6px 10px",borderRadius:8,background:"rgba(245,158,11,0.2)",border:"1px solid #f59e0b",color:"#fde68a",fontSize:12,fontWeight:800}}>{msg}</div>}
  </section>);
}
