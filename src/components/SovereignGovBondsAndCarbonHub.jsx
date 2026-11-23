import { useState } from "react";
import { RWANDA_GOV_SERVICES, CLEAN_ENERGY_ASSETS } from "../utils/sovereignGovAndEnergy.js";
import { recordSovereignTx } from "../utils/sovereignLedger.js";
export default function SovereignGovBondsAndCarbonHub({rates={},theme,panel}){
  const [govId,setGovId]=useState(RWANDA_GOV_SERVICES.at(0).id);
  const [govRwf,setGovRwf]=useState(100000);
  const [enId,setEnId]=useState(CLEAN_ENERGY_ASSETS.at(0).id);
  const [units,setUnits]=useState(4);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const gov=RWANDA_GOV_SERVICES.find(g=>g.id===govId)||RWANDA_GOV_SERVICES.at(0);
  const en=CLEAN_ENERGY_ASSETS.find(e=>e.id===enId)||CLEAN_ENERGY_ASSETS.at(0);
  function payGov(){
    const v=Math.max(gov.minRwf,Number(govRwf||0));
    const usd=Number((v/rwf).toFixed(2));
    const {tx}=recordSovereignTx({hub:"Rwanda GovTech & BNR Bonds",title:`${gov.name} (${v.toLocaleString()} RWF)`,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});
    setMsg(`🏛️ CONFIRMED [${tx.id}]: ${gov.name} · ${v.toLocaleString()} RWF ($${usd} USD)!`);
  }
  function buyClean(){
    const qty=Math.max(1,Number(units||1));
    const usd=Number((qty*en.usdPerUnit).toFixed(2));
    const {tx}=recordSovereignTx({hub:"Rwanda Clean Energy & Carbon",title:`${qty}x ${en.name}`,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});
    setMsg(`🌱 CERTIFIED [${tx.id}]: ${qty}x ${en.name} · $${usd} USD (${(qty*en.co2Tons).toFixed(2)}t CO2 offset)!`);
  }
  return(<section id="sovereign-gov-bonds-carbon-hub" style={{...panel,marginBottom:18,borderTop:"4px solid #10b981",display:"grid",gap:10}}>
    <strong style={{fontSize:15}}>🏛️ BNR Treasury Bonds, IremboGov / RDB Services & Rwanda Solar Carbon Credits</strong>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(265px,1fr))",gap:10}}>
      <div style={{padding:9,borderRadius:9,background:theme.input,border:`1px solid ${theme.border}`,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
        <select value={govId} onChange={e=>setGovId(e.target.value)} style={{flex:1,minWidth:160,padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{RWANDA_GOV_SERVICES.map(g=><option key={g.id} value={g.id}>{g.name}</option>)}</select>
        <input type="number" step="5000" value={govRwf} onChange={e=>setGovRwf(e.target.value)} style={{width:95,padding:"6px 7px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:12,fontWeight:800}}/>
        <button type="button" onClick={payGov} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,fontSize:11.5,cursor:"pointer"}}>🏛️ Execute</button>
      </div>
      <div style={{padding:9,borderRadius:9,background:theme.input,border:`1px solid ${theme.border}`,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
        <select value={enId} onChange={e=>setEnId(e.target.value)} style={{flex:1,minWidth:160,padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{CLEAN_ENERGY_ASSETS.map(e=><option key={e.id} value={e.id}>{e.name} (${e.usdPerUnit})</option>)}</select>
        <input type="number" min="1" value={units} onChange={e=>setUnits(e.target.value)} style={{width:55,padding:"6px 7px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:12,fontWeight:800}}/>
        <button type="button" onClick={buyClean} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#38bdf8",color:"#02131d",fontWeight:900,fontSize:11.5,cursor:"pointer"}}>🌱 Invest (${units*en.usdPerUnit})</button>
      </div>
    </div>
    {msg&&<div style={{padding:"6px 10px",borderRadius:8,background:"rgba(16,185,129,0.2)",border:"1px solid #10b981",color:"#34d399",fontSize:12,fontWeight:800}}>{msg}</div>}
  </section>);
}
