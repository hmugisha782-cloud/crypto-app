import React,{useState} from "react";
import {LABOR_CONTRACTS,GOVERNANCE_PROPOSALS} from "../utils/sovereignLegalGovernance.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignLegalAndGovernanceHub({rates={},theme,panel}){
  const [lcId,setLcId]=useState(LABOR_CONTRACTS.at(0).id);
  const [gvId,setGvId]=useState(GOVERNANCE_PROPOSALS.at(0).id);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const lc=LABOR_CONTRACTS.find(x=>x.id===lcId)||LABOR_CONTRACTS.at(0);
  const gv=GOVERNANCE_PROPOSALS.find(g=>g.id===gvId)||GOVERNANCE_PROPOSALS.at(0);
  function issueContract(){const usd=Number((lc.rwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"Rwanda Legal & HR Studio",title:lc.name,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("📄 CONTRACT GENERATED ["+tx.id+"]: "+lc.name+" ("+lc.rwf.toLocaleString()+" RWF)!");}
  function castVote(){setMsg("🗳️ GOVERNANCE VOTE RECORDED: "+gv.title+" · Consensus: "+gv.quorum+"!");}
  return React.createElement("section",{id:"sovereign-legal-governance-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #38bdf8",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"📄 Rwanda Labor Contract Generator & Sovereign DAO Board Governance Voting"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:lcId,onChange:e=>setLcId(e.target.value),style:{flex:1,minWidth:190,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},LABOR_CONTRACTS.map(x=>React.createElement("option",{key:x.id,value:x.id},x.name+" ("+x.rwf.toLocaleString()+" RWF)"))),
      React.createElement("button",{type:"button",onClick:issueContract,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#38bdf8",color:"#02131d",fontWeight:900,cursor:"pointer"}},"📄 Issue Contract"),
      React.createElement("select",{value:gvId,onChange:e=>setGvId(e.target.value),style:{padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},GOVERNANCE_PROPOSALS.map(g=>React.createElement("option",{key:g.id,value:g.id},g.title))),
      React.createElement("button",{type:"button",onClick:castVote,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"🗳️ Vote YES")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(56,189,248,0.2)",color:"#7dd3fc",fontSize:12,fontWeight:800}},msg)
  );
}
