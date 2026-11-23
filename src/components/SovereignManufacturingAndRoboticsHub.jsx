import React,{useState} from "react";
import {HARDWARE_KITS,FACTORY_SLOTS} from "../utils/sovereignManufacturingRobotics.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignManufacturingAndRoboticsHub({rates={},theme,panel}){
  const [hwId,setHwId]=useState(HARDWARE_KITS.at(0).id);
  const [fcId,setFcId]=useState(FACTORY_SLOTS.at(0).id);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const hw=HARDWARE_KITS.find(h=>h.id===hwId)||HARDWARE_KITS.at(0);
  const fc=FACTORY_SLOTS.find(f=>f.id===fcId)||FACTORY_SLOTS.at(0);
  function orderHw(){const {tx}=recordSovereignTx({hub:"Kigali Robotics & 3D Lab",title:hw.name,amountUsd:hw.usd,rwfRate:rwf,type:"DEBIT"});setMsg("🤖 HARDWARE ORDERED ["+tx.id+"]: "+hw.name+" · $"+hw.usd+" USD ("+Math.round(hw.usd*rwf).toLocaleString()+" RWF)!");}
  function bookFactory(){const usd=Number((fc.rwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"KSEZ & Gatsibo Industrial",title:fc.name,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("🏭 SLOT RESERVED ["+tx.id+"]: "+fc.name+" ("+fc.rwf.toLocaleString()+" RWF)!");}
  return React.createElement("section",{id:"sovereign-manufacturing-robotics-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #8b5cf6",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"🤖 Kigali Robotics, 3D Prototyping & KSEZ / Gatsibo Smart Manufacturing"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:hwId,onChange:e=>setHwId(e.target.value),style:{flex:1,minWidth:190,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},HARDWARE_KITS.map(h=>React.createElement("option",{key:h.id,value:h.id},h.name+" ($"+h.usd+")"))),
      React.createElement("button",{type:"button",onClick:orderHw,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#8b5cf6",color:"#fff",fontWeight:900,cursor:"pointer"}},"🤖 Order Hardware"),
      React.createElement("select",{value:fcId,onChange:e=>setFcId(e.target.value),style:{padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},FACTORY_SLOTS.map(f=>React.createElement("option",{key:f.id,value:f.id},f.name+" ("+f.rwf.toLocaleString()+" RWF)"))),
      React.createElement("button",{type:"button",onClick:bookFactory,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"🏭 Book CNC Slot")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(139,92,246,0.2)",color:"#ddd6fe",fontSize:12,fontWeight:800}},msg)
  );
}
