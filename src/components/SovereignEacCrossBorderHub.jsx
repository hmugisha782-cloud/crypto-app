import { useState } from "react";
import { convertRwfToAll, EAC_CORRIDORS } from "../utils/sovereignEastAfricaFx.js";
import { recordSovereignTx } from "../utils/sovereignLedger.js";
export default function SovereignEacCrossBorderHub({rates={},theme,panel}){
  const [rwf,setRwf]=useState(50000);
  const [corridor,setCorridor]=useState(EAC_CORRIDORS[0]);
  const [msg,setMsg]=useState("");
  const conv=convertRwfToAll(rwf);
  const rwfRate=Number(rates?.RWF||1480);
  function sendEac(){
    const usd=Number((rwf/rwfRate).toFixed(2));
    const {tx}=recordSovereignTx({hub:"EAC Instant Remittance",title:corridor,amountUsd:usd,rwfRate,type:"DEBIT"});
    setMsg(`🌍 SENT [${tx.id}]: ${Number(rwf).toLocaleString()} RWF via ${corridor}!`);
  }
  return(<section id="sovereign-eac-remittance-hub" style={{...panel,marginBottom:18,borderTop:"4px solid #10b981",display:"grid",gap:10}}>
    <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
      <strong style={{fontSize:15}}>🌍 East Africa Instant Cross-Border Remittance & Live FX Board</strong>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        <select value={corridor} onChange={e=>setCorridor(e.target.value)} style={{padding:"6px 9px",borderRadius:8,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{EAC_CORRIDORS.map(c=><option key={c}>{c}</option>)}</select>
        <input type="number" value={rwf} onChange={e=>setRwf(Math.max(1000,Number(e.target.value)))} style={{width:110,padding:"6px 8px",borderRadius:8,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:12,fontWeight:800}}/>
        <button type="button" onClick={sendEac} style={{padding:"6px 12px",borderRadius:8,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,fontSize:12,cursor:"pointer"}}>🌍 Send Instant</button>
      </div>
    </div>
    <div style={{display:"flex",gap:8,flexWrap:"wrap",fontSize:11.5}}>
      {Object.entries(conv).map(([k,v])=><span key={k} style={{padding:"4px 9px",borderRadius:8,background:theme.input,border:`1px solid ${theme.border}`}}><strong>{k}:</strong> {Number(v).toLocaleString()}</span>)}
    </div>
    {msg&&<div style={{padding:"6px 10px",borderRadius:8,background:"rgba(16,185,129,0.2)",border:"1px solid #10b981",color:"#34d399",fontSize:12,fontWeight:800}}>{msg}</div>}
  </section>);
}
