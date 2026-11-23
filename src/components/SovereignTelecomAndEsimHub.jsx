import React,{useState} from "react";
import {GLOBAL_ESIM_PLANS,VIRTUAL_NUMBERS} from "../utils/sovereignTelecomAndEsim.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignTelecomAndEsimHub({rates={},theme,panel}){
  const [esId,setEsId]=useState(GLOBAL_ESIM_PLANS.at(0).id);
  const [vnId,setVnId]=useState(VIRTUAL_NUMBERS.at(0).id);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const es=GLOBAL_ESIM_PLANS.find(e=>e.id===esId)||GLOBAL_ESIM_PLANS.at(0);
  const vn=VIRTUAL_NUMBERS.find(v=>v.id===vnId)||VIRTUAL_NUMBERS.at(0);
  function activateEsim(){const {tx}=recordSovereignTx({hub:"KGT Global eSIM & 5G",title:es.name,amountUsd:es.usd,rwfRate:rwf,type:"DEBIT"});setMsg("📶 eSIM QR ACTIVATED ["+tx.id+"]: "+es.name+" · $"+es.usd+" USD ("+Math.round(es.usd*rwf).toLocaleString()+" RWF)!");}
  function leaseNumber(){const usd=Number((vn.rwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"Sovereign Cloud Telecom",title:vn.name,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("📞 VIRTUAL LINE LIVE ["+tx.id+"]: "+vn.name+" ("+vn.rwf.toLocaleString()+" RWF/mo)!");}
  return React.createElement("section",{id:"sovereign-telecom-esim-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #10b981",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"📶 Global 190-Country Travel eSIM, 5G Data & +250/+1/+44 Cloud Virtual Numbers"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:esId,onChange:e=>setEsId(e.target.value),style:{flex:1,minWidth:190,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},GLOBAL_ESIM_PLANS.map(e=>React.createElement("option",{key:e.id,value:e.id},e.name+" ($"+e.usd+")"))),
      React.createElement("button",{type:"button",onClick:activateEsim,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"📶 Activate eSIM"),
      React.createElement("select",{value:vnId,onChange:e=>setVnId(e.target.value),style:{padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},VIRTUAL_NUMBERS.map(v=>React.createElement("option",{key:v.id,value:v.id},v.name+" ("+v.rwf.toLocaleString()+" RWF)"))),
      React.createElement("button",{type:"button",onClick:leaseNumber,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#38bdf8",color:"#02131d",fontWeight:900,cursor:"pointer"}},"📞 Get Number")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(16,185,129,0.2)",color:"#34d399",fontSize:12,fontWeight:800}},msg)
  );
}
