import React,{useState} from "react";
import {MUNICIPAL_SERVICES,RECYCLE_CREDITS} from "../utils/sovereignSmartCityServices.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignWaterAndSmartCityHub({rates={},theme,panel}){
  const [mcId,setMcId]=useState(MUNICIPAL_SERVICES.at(0).id);
  const [rcId,setRcId]=useState(RECYCLE_CREDITS.at(0).id);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const mc=MUNICIPAL_SERVICES.find(m=>m.id===mcId)||MUNICIPAL_SERVICES.at(0);
  const rc=RECYCLE_CREDITS.find(r=>r.id===rcId)||RECYCLE_CREDITS.at(0);
  function payMunicipal(){const usd=Number((mc.rwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"Rwanda Smart City & WASAC",title:mc.name,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("💧 PAID ["+tx.id+"]: "+mc.name+" ("+mc.rwf.toLocaleString()+" RWF)!");}
  function claimEco(){const usd=Number((rc.rwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"Kigali Green Eco-Rewards",title:rc.name,amountUsd:usd,rwfRate:rwf,type:"CREDIT"});setMsg("♻️ ECO-REWARD CREDITED ["+tx.id+"]: "+rc.name+" (+"+rc.rwf.toLocaleString()+" RWF)!");}
  return React.createElement("section",{id:"sovereign-smart-city-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #10b981",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"💧 WASAC Smart Water, Kigali & Gatsibo Municipal Permits & Eco-Recycling Rewards"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:mcId,onChange:e=>setMcId(e.target.value),style:{flex:1,minWidth:190,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},MUNICIPAL_SERVICES.map(m=>React.createElement("option",{key:m.id,value:m.id},m.name+" ("+m.rwf.toLocaleString()+" RWF)"))),
      React.createElement("button",{type:"button",onClick:payMunicipal,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#38bdf8",color:"#02131d",fontWeight:900,cursor:"pointer"}},"💧 Pay Municipal"),
      React.createElement("select",{value:rcId,onChange:e=>setRcId(e.target.value),style:{padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},RECYCLE_CREDITS.map(r=>React.createElement("option",{key:r.id,value:r.id},r.name))),
      React.createElement("button",{type:"button",onClick:claimEco,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"♻️ Claim Eco-Bonus")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(16,185,129,0.2)",color:"#34d399",fontSize:12,fontWeight:800}},msg)
  );
}
