import { useState } from "react";
import { RWANDA_MARKET_ITEMS, LEGAL_NOTARY_DOCS } from "../utils/sovereignCommerceAndNotary.js";
import { recordSovereignTx } from "../utils/sovereignLedger.js";
export default function SovereignCommerceAndNotaryHub({rates={},theme,panel}){
  const [itemId,setItemId]=useState(RWANDA_MARKET_ITEMS.at(0).id);
  const [docId,setDocId]=useState(LEGAL_NOTARY_DOCS.at(0).id);
  const [party,setParty]=useState("Kigali Global Partners Ltd");
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const item=RWANDA_MARKET_ITEMS.find(i=>i.id===itemId)||RWANDA_MARKET_ITEMS.at(0);
  const doc=LEGAL_NOTARY_DOCS.find(d=>d.id===docId)||LEGAL_NOTARY_DOCS.at(0);
  function buyItem(){
    const usd=Number((item.rwf/rwf).toFixed(2));
    const {tx}=recordSovereignTx({hub:"Kigali Escrow E-Commerce",title:`${item.name} (${item.rwf.toLocaleString()} RWF)`,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});
    setMsg(`🛍️ ESCROW ORDER [${tx.id}]: ${item.name} · ${item.rwf.toLocaleString()} RWF ($${usd} USD) — Same-Day Dispatch!`);
  }
  function notarizeDoc(){
    const {tx}=recordSovereignTx({hub:"Sovereign Digital Notary",title:`${doc.name} — ${party}`,amountUsd:doc.usd,rwfRate:rwf,type:"DEBIT"});
    const hash="SHA256-"+Date.now().toString(16).toUpperCase();
    setMsg(`⚖️ NOTARIZED [${tx.id}]: ${doc.name} for ${party} · Seal: ${hash}!`);
  }
  return(<section id="sovereign-commerce-notary-hub" style={{...panel,marginBottom:18,borderTop:"4px solid #38bdf8",display:"grid",gap:10}}>
    <strong style={{fontSize:15}}>🛍️ Kigali Escrow E-Commerce Marketplace & Blockchain Digital Legal Notary</strong>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(265px,1fr))",gap:10}}>
      <div style={{padding:9,borderRadius:9,background:theme.input,border:`1px solid ${theme.border}`,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
        <select value={itemId} onChange={e=>setItemId(e.target.value)} style={{flex:1,minWidth:160,padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{RWANDA_MARKET_ITEMS.map(i=><option key={i.id} value={i.id}>{i.name} ({i.rwf.toLocaleString()} RWF)</option>)}</select>
        <button type="button" onClick={buyItem} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,fontSize:11.5,cursor:"pointer"}}>🛍️ Buy Escrow</button>
      </div>
      <div style={{padding:9,borderRadius:9,background:theme.input,border:`1px solid ${theme.border}`,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
        <select value={docId} onChange={e=>setDocId(e.target.value)} style={{flex:1,minWidth:150,padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{LEGAL_NOTARY_DOCS.map(d=><option key={d.id} value={d.id}>{d.name} (${d.usd})</option>)}</select>
        <input type="text" value={party} onChange={e=>setParty(e.target.value)} style={{width:110,padding:"6px 7px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}/>
        <button type="button" onClick={notarizeDoc} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#38bdf8",color:"#02131d",fontWeight:900,fontSize:11.5,cursor:"pointer"}}>⚖️ Seal Deed</button>
      </div>
    </div>
    {msg&&<div style={{padding:"6px 10px",borderRadius:8,background:"rgba(56,189,248,0.2)",border:"1px solid #38bdf8",color:"#7dd3fc",fontSize:12,fontWeight:800}}>{msg}</div>}
  </section>);
}
