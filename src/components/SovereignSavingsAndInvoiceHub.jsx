import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";
export default function SovereignSavingsAndInvoiceHub({rates={},theme,panel}){
  const [vaultUsd,setVaultUsd]=useState(1250);
  const [stakeAmt,setStakeAmt]=useState(100);
  const [clientName,setClientName]=useState("Kigali Tech Partner");
  const [invUsd,setInvUsd]=useState(250);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  function lockSavings(){
    const v=Math.max(10,Number(stakeAmt||0));
    const {tx}=recordSovereignTx({hub:"Sovereign High-Yield Vault",title:`16.5% APY Vault Lock ($${v})`,amountUsd:v,rwfRate:rwf,type:"DEBIT"});
    setVaultUsd(s=>s+v);
    setMsg(`🔒 LOCKED [${tx.id}]: $${v} USD added to 16.5% APY Vault (Total Vault: $${(vaultUsd+v).toLocaleString()})!`);
  }
  function createInvoice(){
    const v=Math.max(1,Number(invUsd||0));
    const ref="INV-"+Date.now().toString(36).toUpperCase();
    setMsg(`🧾 INVOICE [${ref}] generated for ${clientName}: $${v} USD (${Math.round(v*rwf).toLocaleString()} RWF) — Ready to Pay!`);
  }
  return(<section id="sovereign-savings-invoice-hub" style={{...panel,marginBottom:18,borderTop:"4px solid #f59e0b",display:"grid",gap:10}}>
    <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
      <strong style={{fontSize:15}}>🏦 16.5% APY High-Yield Savings Vault & Instant Business Invoice Generator</strong>
      <span style={{padding:"3px 10px",borderRadius:999,background:"rgba(245,158,11,0.2)",color:"#fbbf24",fontWeight:900,fontSize:11.5}}>Vault Balance: ${vaultUsd.toLocaleString()} USD</span>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:10}}>
      <div style={{padding:9,borderRadius:9,background:theme.input,border:`1px solid ${theme.border}`,display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
        <strong style={{fontSize:12}}>🔒 Stake USDT:</strong>
        <input type="number" value={stakeAmt} onChange={e=>setStakeAmt(e.target.value)} style={{width:85,padding:"5px 7px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:12,fontWeight:800}}/>
        <button type="button" onClick={lockSavings} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,fontSize:11.5,cursor:"pointer"}}>+ Lock 16.5% APY</button>
      </div>
      <div style={{padding:9,borderRadius:9,background:theme.input,border:`1px solid ${theme.border}`,display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
        <input type="text" value={clientName} onChange={e=>setClientName(e.target.value)} style={{width:125,padding:"5px 7px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}/>
        <input type="number" value={invUsd} onChange={e=>setInvUsd(e.target.value)} style={{width:70,padding:"5px 7px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:12,fontWeight:800}}/>
        <button type="button" onClick={createInvoice} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#f59e0b",color:"#02131d",fontWeight:900,fontSize:11.5,cursor:"pointer"}}>🧾 Issue Invoice</button>
      </div>
    </div>
    {msg&&<div style={{padding:"6px 10px",borderRadius:8,background:"rgba(16,185,129,0.2)",border:"1px solid #10b981",color:"#34d399",fontSize:12,fontWeight:800}}>{msg}</div>}
  </section>);
}
