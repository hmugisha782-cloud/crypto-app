import React,{useState} from "react";
import {RWANDA_HOTELS,EVENT_HALLS} from "../utils/sovereignHospitalitySuite.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignHospitalityAndEventsHub({rates={},theme,panel}){
  const [htId,setHtId]=useState(RWANDA_HOTELS.at(0).id);
  const [nights,setNights]=useState(2);
  const [hallId,setHallId]=useState(EVENT_HALLS.at(0).id);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const ht=RWANDA_HOTELS.find(h=>h.id===htId)||RWANDA_HOTELS.at(0);
  const hl=EVENT_HALLS.find(e=>e.id===hallId)||EVENT_HALLS.at(0);
  function bookHotel(){const n=Math.max(1,Number(nights||1));const usd=n*ht.usd;const {tx}=recordSovereignTx({hub:"Rwanda Luxury Hospitality",title:n+" nights: "+ht.name,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("🏨 SUITE RESERVED ["+tx.id+"]: "+n+" nights at "+ht.name+" · $"+usd+" USD ("+Math.round(usd*rwf).toLocaleString()+" RWF)!");}
  function bookHall(){const {tx}=recordSovereignTx({hub:"Kigali Summit Venues",title:hl.name,amountUsd:hl.usd,rwfRate:rwf,type:"DEBIT"});setMsg("🏛️ VENUE CONFIRMED ["+tx.id+"]: "+hl.name+" · $"+hl.usd+" USD!");}
  return React.createElement("section",{id:"sovereign-hospitality-events-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #f59e0b",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"🏨 Rwanda Luxury Hotels, Akagera Safari Lodges & KCC Summit Venues"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:htId,onChange:e=>setHtId(e.target.value),style:{flex:1,minWidth:190,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},RWANDA_HOTELS.map(h=>React.createElement("option",{key:h.id,value:h.id},h.name+" ($"+h.usd+"/nt)"))),
      React.createElement("input",{type:"number",min:1,value:nights,onChange:e=>setNights(e.target.value),style:{width:55,padding:"6px 7px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text,fontWeight:800}}),
      React.createElement("button",{type:"button",onClick:bookHotel,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#f59e0b",color:"#02131d",fontWeight:900,cursor:"pointer"}},"🏨 Book Stay"),
      React.createElement("select",{value:hallId,onChange:e=>setHallId(e.target.value),style:{padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},EVENT_HALLS.map(e=>React.createElement("option",{key:e.id,value:e.id},e.name+" ($"+e.usd+")"))),
      React.createElement("button",{type:"button",onClick:bookHall,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"🏛️ Reserve Hall")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(245,158,11,0.2)",color:"#fde68a",fontSize:12,fontWeight:800}},msg)
  );
}
