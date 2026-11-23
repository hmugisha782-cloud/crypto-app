import React,{useState} from "react";
import {CUSTOMS_DECLARATIONS,TRADE_FINANCE} from "../utils/sovereignCustomsAndTrade.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignCustomsAndTradeHub({rates={},theme,panel}){
  const [csId,setCsId]=useState(CUSTOMS_DECLARATIONS.at(0).id);
  const [tfId,setTfId]=useState(TRADE_FINANCE.at(0).id);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const cs=CUSTOMS_DECLARATIONS.find(c=>c.id===csId)||CUSTOMS_DECLARATIONS.at(0);
  const tf=TRADE_FINANCE.find(t=>t.id===tfId)||TRADE_FINANCE.at(0);
  function clearCustoms(){const usd=Number((cs.rwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"RRA & EAC Customs Territory",title:cs.name,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("🛃 CUSTOMS CLEARED ["+tx.id+"]: "+cs.name+" ("+cs.rwf.toLocaleString()+" RWF)!");}
  function issueLc(){const {tx}=recordSovereignTx({hub:"AfCFTA Trade Finance",title:tf.name,amountUsd:tf.usd,rwfRate:rwf,type:"DEBIT"});setMsg("🏦 TRADE INSTRUMENT ISSUED ["+tx.id+"]: "+tf.name+" · $"+tf.usd+" USD!");}
  return React.createElement("section",{id:"sovereign-customs-trade-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #38bdf8",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"🛃 RRA / EAC Single Customs Clearance, Certificate of Origin & AfCFTA Trade Finance"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:csId,onChange:e=>setCsId(e.target.value),style:{flex:1,minWidth:190,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},CUSTOMS_DECLARATIONS.map(c=>React.createElement("option",{key:c.id,value:c.id},c.name+" ("+c.rwf.toLocaleString()+" RWF)"))),
      React.createElement("button",{type:"button",onClick:clearCustoms,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#38bdf8",color:"#02131d",fontWeight:900,cursor:"pointer"}},"🛃 Clear Customs"),
      React.createElement("select",{value:tfId,onChange:e=>setTfId(e.target.value),style:{padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},TRADE_FINANCE.map(t=>React.createElement("option",{key:t.id,value:t.id},t.name+" ($"+t.usd+")"))),
      React.createElement("button",{type:"button",onClick:issueLc,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"🏦 Issue LC")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(56,189,248,0.2)",color:"#7dd3fc",fontSize:12,fontWeight:800}},msg)
  );
}
