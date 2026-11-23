import React,{useState} from "react";
import {EV_CHARGING_HUBS,calcEnergyCostRwf} from "../utils/sovereignEnergyGridEv.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignEnergyGridAndEvHub({rates={},theme,panel}){
  const [evId,setEvId]=useState(EV_CHARGING_HUBS.at(0).id);
  const [kwh,setKwh]=useState(20);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const hub=EV_CHARGING_HUBS.find(e=>e.id===evId)||EV_CHARGING_HUBS.at(0);
  const costRwf=calcEnergyCostRwf(kwh,hub.rwfPerKwh);
  function chargeNow(){const v=Math.max(1,Number(kwh||1));const usd=Number((costRwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"Rwanda EV & Solar Grid",title:hub.name+" ("+v+" kWh)",amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("⚡ CHARGE SESSION LIVE ["+tx.id+"]: "+v+" kWh at "+hub.name+" · "+costRwf.toLocaleString()+" RWF!");}
  return React.createElement("section",{id:"sovereign-energy-grid-ev-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #10b981",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"⚡ Kigali & Gatsibo Solar Micro-Grid VPP & Fast EV Charging Network"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:evId,onChange:e=>setEvId(e.target.value),style:{flex:1,minWidth:210,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},EV_CHARGING_HUBS.map(e=>React.createElement("option",{key:e.id,value:e.id},e.name+" ("+e.rwfPerKwh+" RWF/kWh)"))),
      React.createElement("input",{type:"number",min:1,value:kwh,onChange:e=>setKwh(e.target.value),style:{width:70,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text,fontWeight:800}}),
      React.createElement("button",{type:"button",onClick:chargeNow,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"⚡ Start Charge ("+costRwf.toLocaleString()+" RWF)")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(16,185,129,0.2)",color:"#34d399",fontSize:12,fontWeight:800}},msg)
  );
}
