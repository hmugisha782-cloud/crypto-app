import React,{useState} from "react";
import {DOMAIN_TLDS,CLOUD_NODES} from "../utils/sovereignCloudAndDomains.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignCloudAndDomainHub({rates={},theme,panel}){
  const [domain,setDomain]=useState("kigaliglobaltracker");
  const [tld,setTld]=useState(DOMAIN_TLDS.at(0).tld);
  const [nodeId,setNodeId]=useState(CLOUD_NODES.at(0).id);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const dObj=DOMAIN_TLDS.find(d=>d.tld===tld)||DOMAIN_TLDS.at(0);
  const cObj=CLOUD_NODES.find(c=>c.id===nodeId)||CLOUD_NODES.at(0);
  function regDomain(){const clean=String(domain||"kgt").toLowerCase().replace(/[^a-z0-9-]/g,"")+dObj.tld;const usd=Number((dObj.rwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"Rwanda & Global Domains",title:"Register "+clean,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("🌐 DOMAIN REGISTERED ["+tx.id+"]: "+clean+" ("+dObj.rwf.toLocaleString()+" RWF/yr)!");}
  function launchCloud(){const {tx}=recordSovereignTx({hub:"KGT Sovereign Cloud & GPU",title:cObj.name,amountUsd:cObj.usd,rwfRate:rwf,type:"DEBIT"});setMsg("☁️ NODE DEPLOYED ["+tx.id+"]: "+cObj.name+" · $"+cObj.usd+" USD!");}
  return React.createElement("section",{id:"sovereign-cloud-domain-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #38bdf8",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"☁️ Sovereign .rw / .com Domain Registrar & Kigali AI GPU Cloud Compute"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("input",{type:"text",value:domain,onChange:e=>setDomain(e.target.value),style:{width:140,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text,fontWeight:800}}),
      React.createElement("select",{value:tld,onChange:e=>setTld(e.target.value),style:{padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},DOMAIN_TLDS.map(d=>React.createElement("option",{key:d.tld,value:d.tld},d.tld+" ("+d.rwf.toLocaleString()+" RWF)"))),
      React.createElement("button",{type:"button",onClick:regDomain,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#38bdf8",color:"#02131d",fontWeight:900,cursor:"pointer"}},"🌐 Register Domain"),
      React.createElement("select",{value:nodeId,onChange:e=>setNodeId(e.target.value),style:{padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},CLOUD_NODES.map(c=>React.createElement("option",{key:c.id,value:c.id},c.name+" ($"+c.usd+")"))),
      React.createElement("button",{type:"button",onClick:launchCloud,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"☁️ Deploy Server")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(56,189,248,0.2)",color:"#7dd3fc",fontSize:12,fontWeight:800}},msg)
  );
}
