import React,{useState} from "react";
import {DIASPORA_CORRIDORS,calcDiasporaBonusRwf} from "../utils/sovereignDiasporaAndGiving.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignDiasporaAndGivingHub({rates={},theme,panel}){
  const [corId,setCorId]=useState(DIASPORA_CORRIDORS.at(0).id);
  const [usdAmt,setUsdAmt]=useState(100);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const cor=DIASPORA_CORRIDORS.find(c=>c.id===corId)||DIASPORA_CORRIDORS.at(0);
  const totalRwf=calcDiasporaBonusRwf(usdAmt,rwf,cor.bonusPct);
  function sendDiaspora(){const v=Math.max(5,Number(usdAmt||0));const {tx}=recordSovereignTx({hub:"Rwanda Diaspora & Giving",title:cor.name+" ($"+v+")",amountUsd:v,rwfRate:rwf,type:"DEBIT"});setMsg("🌍 DELIVERED ["+tx.id+"]: $"+v+" USD -> "+totalRwf.toLocaleString()+" RWF (incl. +"+cor.bonusPct+"% Diaspora Bonus)!");}
  return React.createElement("section",{id:"sovereign-diaspora-giving-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #10b981",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"🌍 Rwanda Diaspora Zero-Fee Remittance (+1.5% Bonus) & Tithe / Zakat Vault"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:corId,onChange:e=>setCorId(e.target.value),style:{flex:1,minWidth:210,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},DIASPORA_CORRIDORS.map(c=>React.createElement("option",{key:c.id,value:c.id},c.name))),
      React.createElement("input",{type:"number",min:5,value:usdAmt,onChange:e=>setUsdAmt(e.target.value),style:{width:80,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text,fontWeight:800}}),
      React.createElement("button",{type:"button",onClick:sendDiaspora,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"Send ("+totalRwf.toLocaleString()+" RWF)")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(16,185,129,0.2)",color:"#34d399",fontSize:12,fontWeight:800}},msg)
  );
}
