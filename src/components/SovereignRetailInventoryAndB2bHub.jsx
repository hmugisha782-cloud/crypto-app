import React,{useState} from "react";
import {WHOLESALE_BUNDLES,POS_TOOLS} from "../utils/sovereignRetailInventoryB2b.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignRetailInventoryAndB2bHub({rates={},theme,panel}){
  const [whId,setWhId]=useState(WHOLESALE_BUNDLES.at(0).id);
  const [ptId,setPtId]=useState(POS_TOOLS.at(0).id);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const wh=WHOLESALE_BUNDLES.find(w=>w.id===whId)||WHOLESALE_BUNDLES.at(0);
  const pt=POS_TOOLS.find(p=>p.id===ptId)||POS_TOOLS.at(0);
  function orderWholesale(){const usd=Number((wh.rwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"Rwanda B2B Wholesale",title:wh.name,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("📦 WHOLESALE DISPATCHED ["+tx.id+"]: "+wh.name+" ("+wh.rwf.toLocaleString()+" RWF)!");}
  function activatePos(){const usd=Number((pt.rwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"RRA EBM & Retail POS",title:pt.name,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("🧾 POS ACTIVATED ["+tx.id+"]: "+pt.name+" ("+pt.rwf.toLocaleString()+" RWF)!");}
  return React.createElement("section",{id:"sovereign-retail-inventory-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #38bdf8",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"📦 Kigali & Gatsibo B2B Wholesale Supply, Retail Stock & RRA EBM POS Sync"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:whId,onChange:e=>setWhId(e.target.value),style:{flex:1,minWidth:190,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},WHOLESALE_BUNDLES.map(w=>React.createElement("option",{key:w.id,value:w.id},w.name+" ("+w.rwf.toLocaleString()+" RWF)"))),
      React.createElement("button",{type:"button",onClick:orderWholesale,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"📦 Order Stock"),
      React.createElement("select",{value:ptId,onChange:e=>setPtId(e.target.value),style:{padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},POS_TOOLS.map(p=>React.createElement("option",{key:p.id,value:p.id},p.name+" ("+p.rwf.toLocaleString()+" RWF)"))),
      React.createElement("button",{type:"button",onClick:activatePos,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#38bdf8",color:"#02131d",fontWeight:900,cursor:"pointer"}},"🧾 Sync EBM POS")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(56,189,248,0.2)",color:"#7dd3fc",fontSize:12,fontWeight:800}},msg)
  );
}
