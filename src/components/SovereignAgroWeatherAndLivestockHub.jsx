import React,{useState} from "react";
import {AGRO_ZONES,AGRO_INPUTS} from "../utils/sovereignAgroWeatherIoT.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignAgroWeatherAndLivestockHub({rates={},theme,panel}){
  const [zoneId,setZoneId]=useState(AGRO_ZONES.at(0).id);
  const [inpId,setInpId]=useState(AGRO_INPUTS.at(0).id);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const zObj=AGRO_ZONES.find(z=>z.id===zoneId)||AGRO_ZONES.at(0);
  const iObj=AGRO_INPUTS.find(i=>i.id===inpId)||AGRO_INPUTS.at(0);
  function checkOracle(){setMsg("🛰️ SATELLITE ORACLE: "+zObj.zone+" · Farmgate Price: "+zObj.cropPriceRwf.toLocaleString()+" RWF/kg!");}
  function orderInput(){const usd=Number((iObj.rwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"Rwanda Smart Agro & IoT",title:iObj.name,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("🚜 DISPATCHED ["+tx.id+"]: "+iObj.name+" ("+iObj.rwf.toLocaleString()+" RWF)!");}
  return React.createElement("section",{id:"sovereign-agro-weather-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #10b981",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"🌾 Gatsibo & Rwanda Smart Agriculture Weather Oracle, Dairy & IoT Inputs"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:zoneId,onChange:e=>setZoneId(e.target.value),style:{flex:1,minWidth:200,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},AGRO_ZONES.map(z=>React.createElement("option",{key:z.id,value:z.id},z.zone))),
      React.createElement("button",{type:"button",onClick:checkOracle,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#38bdf8",color:"#02131d",fontWeight:900,cursor:"pointer"}},"🛰️ Live Weather & Price"),
      React.createElement("select",{value:inpId,onChange:e=>setInpId(e.target.value),style:{padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},AGRO_INPUTS.map(i=>React.createElement("option",{key:i.id,value:i.id},i.name+" ("+i.rwf.toLocaleString()+" RWF)"))),
      React.createElement("button",{type:"button",onClick:orderInput,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"🚜 Order Input")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(16,185,129,0.2)",color:"#34d399",fontSize:12,fontWeight:800}},msg)
  );
}
