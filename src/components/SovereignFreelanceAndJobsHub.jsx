import { useState } from "react";
import { FREELANCE_GIGS, REMOTE_CONTRACTS } from "../utils/sovereignTalentAndJobs.js";
import { recordSovereignTx } from "../utils/sovereignLedger.js";
export default function SovereignFreelanceAndJobsHub({rates={},theme,panel}){
  const [gigId,setGigId]=useState(FREELANCE_GIGS.at(0).id);
  const [roleId,setRoleId]=useState(REMOTE_CONTRACTS.at(0).id);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const gig=FREELANCE_GIGS.find(g=>g.id===gigId)||FREELANCE_GIGS.at(0);
  const role=REMOTE_CONTRACTS.find(r=>r.id===roleId)||REMOTE_CONTRACTS.at(0);
  function hireGig(){const {tx}=recordSovereignTx({hub:"Rwanda Talent Escrow",title:gig.title,amountUsd:gig.usd,rwfRate:rwf,type:"DEBIT"});setMsg(`💼 ESCROW HIRED [${tx.id}]: ${gig.title} · $${gig.usd} USD (${Math.round(gig.usd*rwf).toLocaleString()} RWF)!`);}
  function applyJob(){const {tx}=recordSovereignTx({hub:"Global Remote Careers",title:"Fast-Track Application: "+role.role,amountUsd:5,rwfRate:rwf,type:"DEBIT"});setMsg(`🚀 APPLICATION VERIFIED [${tx.id}]: ${role.role} ($${role.monthlyUsd}/mo)!`);}
  return(<section id="sovereign-freelance-jobs-hub" style={{...panel,marginBottom:18,borderTop:"4px solid #38bdf8",display:"grid",gap:10}}><strong style={{fontSize:15}}>💼 Rwanda & Global Freelance Escrow Marketplace + Remote Tech Careers</strong><div style={{display:"flex",gap:8,flexWrap:"wrap"}}><select value={gigId} onChange={e=>setGigId(e.target.value)} style={{padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{FREELANCE_GIGS.map(g=><option key={g.id} value={g.id}>{g.title} (${g.usd})</option>)}</select><button type="button" onClick={hireGig} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}}>💼 Hire Escrow</button><select value={roleId} onChange={e=>setRoleId(e.target.value)} style={{padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{REMOTE_CONTRACTS.map(r=><option key={r.id} value={r.id}>{r.role} (${r.monthlyUsd}/mo)</option>)}</select><button type="button" onClick={applyJob} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#38bdf8",color:"#02131d",fontWeight:900,cursor:"pointer"}}>🚀 Fast-Track Apply</button></div>{msg&&<div style={{padding:"6px 10px",borderRadius:8,background:"rgba(56,189,248,0.2)",border:"1px solid #38bdf8",color:"#7dd3fc",fontSize:12,fontWeight:800}}>{msg}</div>}</section>);
}
