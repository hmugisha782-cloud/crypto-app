import { useState } from "react";
import { SACCO_GROUPS, calcGroupPayout } from "../utils/sovereignSaccoAndIkibina.js";
import { recordSovereignTx } from "../utils/sovereignLedger.js";
export default function SovereignSaccoAndIkibinaHub({rates={},theme,panel}){
  const [grpId,setGrpId]=useState(SACCO_GROUPS.at(0).id);
  const [members,setMembers]=useState(12);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const grp=SACCO_GROUPS.find(g=>g.id===grpId)||SACCO_GROUPS.at(0);
  const payout=calcGroupPayout(grp.shareRwf,members);
  function contribute(){const usd=Number((grp.shareRwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"Rwanda SACCO & Ikibina",title:grp.name,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg(`🤝 CONTRIBUTION LOGGED [${tx.id}]: ${grp.name} · ${grp.shareRwf.toLocaleString()} RWF (Cycle Pool: ${payout.toLocaleString()} RWF)!`);}
  return(<section id="sovereign-sacco-ikibina-hub" style={{...panel,marginBottom:18,borderTop:"4px solid #10b981",display:"grid",gap:10}}><strong style={{fontSize:15}}>🤝 Umurenge SACCO, Cooperatives & Digital Ikibina Group Savings</strong><div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}><select value={grpId} onChange={e=>setGrpId(e.target.value)} style={{padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{SACCO_GROUPS.map(g=><option key={g.id} value={g.id}>{g.name} ({g.shareRwf.toLocaleString()} RWF · {g.apy}% APY)</option>)}</select><span style={{fontSize:11.5}}>Members:</span><input type="number" min="2" value={members} onChange={e=>setMembers(e.target.value)} style={{width:60,padding:"6px 7px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontWeight:800}}/><button type="button" onClick={contribute} style={{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}}>🤝 Pay Share ({payout.toLocaleString()} RWF Pool)</button></div>{msg&&<div style={{padding:"6px 10px",borderRadius:8,background:"rgba(16,185,129,0.2)",border:"1px solid #10b981",color:"#34d399",fontSize:12,fontWeight:800}}>{msg}</div>}</section>);
}
