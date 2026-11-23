import React,{useState} from "react";
import {CREDIT_FACILITIES,calcRepayRwf} from "../utils/sovereignMicroCreditSme.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignMicroCreditAndSmeLoanHub({rates={},theme,panel}){
  const [crId,setCrId]=useState(CREDIT_FACILITIES.at(0).id);
  const [rwfAmt,setRwfAmt]=useState(25000);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const cr=CREDIT_FACILITIES.find(c=>c.id===crId)||CREDIT_FACILITIES.at(0);
  const repayRwf=calcRepayRwf(rwfAmt,cr.ratePct);
  function drawCredit(){const v=Math.min(cr.maxRwf,Math.max(1000,Number(rwfAmt||0)));const usd=Number((v/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"KGT Instant Credit & SME",title:cr.name+" ("+v.toLocaleString()+" RWF)",amountUsd:usd,rwfRate:rwf,type:"CREDIT"});setMsg("💳 CREDIT CREDITED ["+tx.id+"]: +"+v.toLocaleString()+" RWF ($+"+usd+" USD) · Repay: "+repayRwf.toLocaleString()+" RWF!");}
  return React.createElement("section",{id:"sovereign-micro-credit-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #38bdf8",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"💳 Instant MoMo Overdraft, SME Working Capital & Gatsibo Agro-Credit Line"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:crId,onChange:e=>setCrId(e.target.value),style:{flex:1,minWidth:210,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},CREDIT_FACILITIES.map(c=>React.createElement("option",{key:c.id,value:c.id},c.name+" (Max "+c.maxRwf.toLocaleString()+" RWF)"))),
      React.createElement("input",{type:"number",step:1000,value:rwfAmt,onChange:e=>setRwfAmt(e.target.value),style:{width:95,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text,fontWeight:800}}),
      React.createElement("button",{type:"button",onClick:drawCredit,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#38bdf8",color:"#02131d",fontWeight:900,cursor:"pointer"}},"💳 Draw Funds (Repay "+repayRwf.toLocaleString()+" RWF)")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(56,189,248,0.2)",color:"#7dd3fc",fontSize:12,fontWeight:800}},msg)
  );
}
