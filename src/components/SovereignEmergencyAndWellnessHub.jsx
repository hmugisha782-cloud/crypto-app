import React,{useState} from "react";
import {EMERGENCY_HOTLINES,WELLNESS_PLANS} from "../utils/sovereignEmergencyWellness.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignEmergencyAndWellnessHub({rates={},theme,panel}){
  const [emId,setEmId]=useState(EMERGENCY_HOTLINES.at(0).id);
  const [wlId,setWlId]=useState(WELLNESS_PLANS.at(0).id);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const em=EMERGENCY_HOTLINES.find(e=>e.id===emId)||EMERGENCY_HOTLINES.at(0);
  const wl=WELLNESS_PLANS.find(w=>w.id===wlId)||WELLNESS_PLANS.at(0);
  function triggerSos(){setMsg("🚨 SOS DISPATCH READY: "+em.name+" · Toll-Free Line: "+em.code+" (GPS Location Shared)!");}
  function joinWellness(){const usd=Number((wl.rwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"Rwanda Wellness & Health",title:wl.name,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("💪 PASS ACTIVATED ["+tx.id+"]: "+wl.name+" ("+wl.rwf.toLocaleString()+" RWF)!");}
  return React.createElement("section",{id:"sovereign-emergency-wellness-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #f43f5e",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"🚨 Rwanda Rapid SOS Emergency Dispatch (912 / 112) & Executive Wellness Pass"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:emId,onChange:e=>setEmId(e.target.value),style:{padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},EMERGENCY_HOTLINES.map(e=>React.createElement("option",{key:e.id,value:e.id},e.name))),
      React.createElement("button",{type:"button",onClick:triggerSos,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#f43f5e",color:"#fff",fontWeight:900,cursor:"pointer"}},"🚨 Test SOS Alert"),
      React.createElement("select",{value:wlId,onChange:e=>setWlId(e.target.value),style:{padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},WELLNESS_PLANS.map(w=>React.createElement("option",{key:w.id,value:w.id},w.name+" ("+w.rwf.toLocaleString()+" RWF)"))),
      React.createElement("button",{type:"button",onClick:joinWellness,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"💪 Activate Pass")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(244,63,94,0.18)",color:"#fda4af",fontSize:12,fontWeight:800}},msg)
  );
}
