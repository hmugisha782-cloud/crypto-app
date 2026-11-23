import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";
export default function SovereignVirtualCardAndAgroHub({rates={},theme,panel}){
  const [frozen,setFrozen]=useState(false);
  const [cvvShow,setCvvShow]=useState(false);
  const [crop,setCrop]=useState("☕ Rwanda Bourbon Specialty Coffee (6,200 RWF/kg)");
  const [kg,setKg]=useState(25);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  function buyAgro(){
    const unit=crop.includes("Coffee")?6200:crop.includes("Tea")?4100:crop.includes("Honey")?7500:1200;
    const totalRwf=Math.max(1,Number(kg||1))*unit;
    const usd=Number((totalRwf/rwf).toFixed(2));
    const {tx}=recordSovereignTx({hub:"Gatsibo & Rwanda Agro-Market",title:`${kg}kg ${crop}`,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});
    setMsg(`🌾 ORDER CONFIRMED [${tx.id}]: ${kg}kg ${crop} · ${totalRwf.toLocaleString()} RWF ($${usd} USD)!`);
  }
  return(<section id="sovereign-virtual-card-agro-hub" style={{...panel,marginBottom:18,borderTop:"4px solid #8b5cf6",display:"grid",gap:10}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(265px,1fr))",gap:12}}>
      <div style={{padding:12,borderRadius:12,background:"linear-gradient(135deg,#0f172a,#1e1b4b)",border:"1px solid #8b5cf6",color:"#f8fafc",display:"grid",gap:8}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11.5}}><strong>💳 KGT SOVEREIGN VIRTUAL VISA</strong><span>{frozen?"❄️ FROZEN":"🟢 ACTIVE"}</span></div>
        <div style={{fontSize:15,fontWeight:900,letterSpacing:"0.12em"}}>4532 •••• •••• 8824</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:11}}>
          <span>EXP: 11/29 · CVV: <strong>{cvvShow?"739":"***"}</strong></span>
          <div style={{display:"flex",gap:6}}>
            <button type="button" onClick={()=>setCvvShow(v=>!v)} style={{padding:"3px 8px",borderRadius:6,border:"none",background:"#38bdf8",color:"#02131d",fontWeight:800,fontSize:10.5,cursor:"pointer"}}>{cvvShow?"Hide":"Show CVV"}</button>
            <button type="button" onClick={()=>setFrozen(f=>!f)} style={{padding:"3px 8px",borderRadius:6,border:"none",background:frozen?"#10b981":"#f43f5e",color:"#fff",fontWeight:800,fontSize:10.5,cursor:"pointer"}}>{frozen?"Unfreeze":"Freeze"}</button>
          </div>
        </div>
      </div>
      <div style={{padding:10,borderRadius:12,background:theme.input,border:`1px solid ${theme.border}`,display:"grid",gap:8}}>
        <strong style={{fontSize:13}}>🌾 Gatsibo & Rwanda Direct Agro-Commodity Order</strong>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          <select value={crop} onChange={e=>setCrop(e.target.value)} style={{flex:1,minWidth:180,padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>
            <option>☕ Rwanda Bourbon Specialty Coffee (6,200 RWF/kg)</option>
            <option>🍃 Pfunda & Gisovu Orthodox Tea (4,100 RWF/kg)</option>
            <option>🍯 Gatsibo Pure Forest Honey (7,500 RWF/kg)</option>
            <option>🌽 Eastern Province Export Maize (1,200 RWF/kg)</option>
          </select>
          <input type="number" min="1" value={kg} onChange={e=>setKg(e.target.value)} style={{width:65,padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:12,fontWeight:800}}/>
          <button type="button" onClick={buyAgro} style={{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,fontSize:11.5,cursor:"pointer"}}>🌾 Buy Direct</button>
        </div>
      </div>
    </div>
    {msg&&<div style={{padding:"6px 10px",borderRadius:8,background:"rgba(16,185,129,0.2)",border:"1px solid #10b981",color:"#34d399",fontSize:12,fontWeight:800}}>{msg}</div>}
  </section>);
}
