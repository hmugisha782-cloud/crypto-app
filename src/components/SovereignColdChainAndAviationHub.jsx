import React,{useState} from "react";
import {COLD_CHAIN_SLOTS,FUEL_CREDITS} from "../utils/sovereignColdChainAviation.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignColdChainAndAviationHub({rates={},theme,panel}){
  const [ccId,setCcId]=useState(COLD_CHAIN_SLOTS.at(0).id);
  const [flId,setFlId]=useState(FUEL_CREDITS.at(0).id);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const cc=COLD_CHAIN_SLOTS.find(c=>c.id===ccId)||COLD_CHAIN_SLOTS.at(0);
  const fl=FUEL_CREDITS.find(f=>f.id===flId)||FUEL_CREDITS.at(0);
  function bookCold(){const usd=Number((cc.rwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"Rwanda Cold-Chain & KGL Cargo",title:cc.name,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("❄️ COLD-CHAIN LOCKED ["+tx.id+"]: "+cc.name+" ("+cc.rwf.toLocaleString()+" RWF)!");}
  function buyFuel(){const usd=Number((fl.rwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"KGT Aviation & Fleet Fuel",title:fl.name,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("⛽ FUEL VOUCHER ISSUED ["+tx.id+"]: "+fl.name+" ("+fl.rwf.toLocaleString()+" RWF)!");}
  return React.createElement("section",{id:"sovereign-coldchain-aviation-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #10b981",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"❄️ KGL Airport Cold-Chain Agro-Export & Commercial Fuel Credit Vault"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:ccId,onChange:e=>setCcId(e.target.value),style:{flex:1,minWidth:190,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},COLD_CHAIN_SLOTS.map(c=>React.createElement("option",{key:c.id,value:c.id},c.name+" ("+c.rwf.toLocaleString()+" RWF)"))),
      React.createElement("button",{type:"button",onClick:bookCold,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"❄️ Book Cold-Room"),
      React.createElement("select",{value:flId,onChange:e=>setFlId(e.target.value),style:{padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},FUEL_CREDITS.map(f=>React.createElement("option",{key:f.id,value:f.id},f.name+" ("+f.rwf.toLocaleString()+" RWF)"))),
      React.createElement("button",{type:"button",onClick:buyFuel,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#38bdf8",color:"#02131d",fontWeight:900,cursor:"pointer"}},"⛽ Issue Fuel Pass")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(16,185,129,0.2)",color:"#34d399",fontSize:12,fontWeight:800}},msg)
  );
}
