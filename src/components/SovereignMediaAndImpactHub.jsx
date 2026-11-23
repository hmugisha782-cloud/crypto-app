import { useState } from "react";
import { RWANDA_LIVE_CHANNELS, IMPACT_CAMPAIGNS } from "../utils/sovereignMediaAndImpact.js";
import { recordSovereignTx } from "../utils/sovereignLedger.js";
export default function SovereignMediaAndImpactHub({rates={},theme,panel}){
  const [chId,setChId]=useState(RWANDA_LIVE_CHANNELS.at(0).id);
  const [campId,setCampId]=useState(IMPACT_CAMPAIGNS.at(0).id);
  const [donateRwf,setDonateRwf]=useState(5000);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const ch=RWANDA_LIVE_CHANNELS.find(c=>c.id===chId)||RWANDA_LIVE_CHANNELS.at(0);
  const camp=IMPACT_CAMPAIGNS.find(c=>c.id===campId)||IMPACT_CAMPAIGNS.at(0);
  function tip(){const usd=Number((ch.tipRwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"Rwanda Media & Creators",title:ch.name,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg(`📺 STREAM & TIP [${tx.id}]: ${ch.name} (${ch.tipRwf.toLocaleString()} RWF)!`);}
  function donate(){const v=Math.max(500,Number(donateRwf||0));const usd=Number((v/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"Rwanda Impact Fund",title:camp.name,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg(`🤝 DONATED [${tx.id}]: ${v.toLocaleString()} RWF ($${usd} USD) to ${camp.name}!`);}
  return(<section id="sovereign-media-impact-hub" style={{...panel,marginBottom:18,borderTop:"4px solid #ec4899",display:"grid",gap:10}}><strong style={{fontSize:15}}>📺 Rwanda Live TV/Radio Creator Studio & Community Impact Crowdfunding</strong><div style={{display:"flex",gap:8,flexWrap:"wrap"}}><select value={chId} onChange={e=>setChId(e.target.value)} style={{padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{RWANDA_LIVE_CHANNELS.map(c=><option key={c.id} value={c.id}>{c.name} ({c.tipRwf} RWF)</option>)}</select><button type="button" onClick={tip} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#ec4899",color:"#fff",fontWeight:900,cursor:"pointer"}}>📺 Tune & Tip</button><select value={campId} onChange={e=>setCampId(e.target.value)} style={{padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{IMPACT_CAMPAIGNS.map(c=><option key={c.id} value={c.id}>{c.name} (${c.raisedUsd}/${c.goalUsd})</option>)}</select><input type="number" value={donateRwf} onChange={e=>setDonateRwf(e.target.value)} style={{width:75,padding:"6px 7px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text}}/><button type="button" onClick={donate} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}}>🤝 Donate</button></div>{msg&&<div style={{padding:"6px 10px",borderRadius:8,background:"rgba(236,72,153,0.18)",border:"1px solid #ec4899",color:"#f9a8d4",fontSize:12,fontWeight:800}}>{msg}</div>}</section>);
}
