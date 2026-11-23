import React,{useState} from "react";
import {TUITION_INSTITUTIONS,SCHOLARSHIP_GRANTS} from "../utils/sovereignEducationScholarships.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignEducationAndScholarshipsHub({rates={},theme,panel}){
  const [instId,setInstId]=useState(TUITION_INSTITUTIONS.at(0).id);
  const [grantId,setGrantId]=useState(SCHOLARSHIP_GRANTS.at(0).id);
  const [regNo,setRegNo]=useState("UR-2026-8841");
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const inst=TUITION_INSTITUTIONS.find(i=>i.id===instId)||TUITION_INSTITUTIONS.at(0);
  const gr=SCHOLARSHIP_GRANTS.find(g=>g.id===grantId)||SCHOLARSHIP_GRANTS.at(0);
  function payTuition(){const usd=Number((inst.rwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"Rwanda Education & Tuition",title:inst.name+" ["+regNo+"]",amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("🎓 RECEIPT ISSUED ["+tx.id+"]: "+inst.name+" for ID "+regNo+" ("+inst.rwf.toLocaleString()+" RWF)!");}
  function applyGrant(){setMsg("🌍 GRANT APPLICATION SUBMITTED: "+gr.name+" · Student ID: "+regNo+" (Fast-Track Review)!");}
  return React.createElement("section",{id:"sovereign-education-scholarships-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #8b5cf6",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"🎓 Rwanda University / School Tuition Pay & Global AI Scholarship Grants"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("input",{type:"text",value:regNo,onChange:e=>setRegNo(e.target.value),style:{width:115,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text,fontWeight:800}}),
      React.createElement("select",{value:instId,onChange:e=>setInstId(e.target.value),style:{flex:1,minWidth:180,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},TUITION_INSTITUTIONS.map(i=>React.createElement("option",{key:i.id,value:i.id},i.name+" ("+i.rwf.toLocaleString()+" RWF)"))),
      React.createElement("button",{type:"button",onClick:payTuition,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"🎓 Pay Tuition"),
      React.createElement("select",{value:grantId,onChange:e=>setGrantId(e.target.value),style:{padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},SCHOLARSHIP_GRANTS.map(g=>React.createElement("option",{key:g.id,value:g.id},g.name))),
      React.createElement("button",{type:"button",onClick:applyGrant,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#8b5cf6",color:"#fff",fontWeight:900,cursor:"pointer"}},"🌍 Claim Grant")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(139,92,246,0.2)",color:"#ddd6fe",fontSize:12,fontWeight:800}},msg)
  );
}
