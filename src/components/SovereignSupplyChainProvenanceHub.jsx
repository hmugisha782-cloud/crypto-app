import React,{useState} from "react";
import {PROVENANCE_BATCHES,mintTraceQr} from "../utils/sovereignSupplyChainProvenance.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignSupplyChainProvenanceHub({rates={},theme,panel}){
  const [prId,setPrId]=useState(PROVENANCE_BATCHES.at(0).id);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const batch=PROVENANCE_BATCHES.find(b=>b.id===prId)||PROVENANCE_BATCHES.at(0);
  function verifyOrigin(){setMsg("🔍 ORIGIN VERIFIED: "+batch.name+" · "+batch.origin+" (100% Authentic)!");}
  function sealExportQr(){const code=mintTraceQr(batch.id);const usd=Number((5000/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"Rwanda Export Provenance",title:batch.name+" ["+code+"]",amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("🏷️ TRACE QR SEALED ["+tx.id+"]: "+code+" for "+batch.name+" (5,000 RWF)!");}
  return React.createElement("section",{id:"sovereign-supplychain-provenance-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #10b981",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"🏷️ Gatsibo & Rwanda Export Provenance, Coffee/Tea Barcode & Quality Traceability"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:prId,onChange:e=>setPrId(e.target.value),style:{flex:1,minWidth:210,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},PROVENANCE_BATCHES.map(b=>React.createElement("option",{key:b.id,value:b.id},b.name))),
      React.createElement("button",{type:"button",onClick:verifyOrigin,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#38bdf8",color:"#02131d",fontWeight:900,cursor:"pointer"}},"🔍 Verify Origin"),
      React.createElement("button",{type:"button",onClick:sealExportQr,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"🏷️ Mint Export QR (5,000 RWF)")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(16,185,129,0.2)",color:"#34d399",fontSize:12,fontWeight:800}},msg)
  );
}
