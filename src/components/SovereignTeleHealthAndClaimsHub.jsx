import React,{useState} from "react";
import {TELEHEALTH_CLINICS,INSURANCE_CLAIMS} from "../utils/sovereignTeleHealthClaims.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignTeleHealthAndClaimsHub({rates={},theme,panel}){
  const [thId,setThId]=useState(TELEHEALTH_CLINICS.at(0).id);
  const [clId,setClId]=useState(INSURANCE_CLAIMS.at(0).id);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const th=TELEHEALTH_CLINICS.find(t=>t.id===thId)||TELEHEALTH_CLINICS.at(0);
  const cl=INSURANCE_CLAIMS.find(c=>c.id===clId)||INSURANCE_CLAIMS.at(0);
  const copayRwf=Math.round(th.rwf*(1-cl.coverPct/100));
  function bookCare(){const usd=Number((copayRwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"Rwanda TeleHealth & RSSB",title:th.name+" ("+cl.name+")",amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("🩺 CARE BOOKED ["+tx.id+"]: "+th.name+" · Insurance Covered "+cl.coverPct+"% · Co-Pay: "+copayRwf.toLocaleString()+" RWF!");}
  return React.createElement("section",{id:"sovereign-telehealth-claims-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #ec4899",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"🩺 Kigali & Gatsibo 24/7 Tele-Doctor, Pharmacy Delivery & RSSB/Private Claims"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:thId,onChange:e=>setThId(e.target.value),style:{flex:1,minWidth:190,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},TELEHEALTH_CLINICS.map(t=>React.createElement("option",{key:t.id,value:t.id},t.name+" ("+t.rwf.toLocaleString()+" RWF)"))),
      React.createElement("select",{value:clId,onChange:e=>setClId(e.target.value),style:{padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},INSURANCE_CLAIMS.map(c=>React.createElement("option",{key:c.id,value:c.id},c.name+" ("+c.coverPct+"%)"))),
      React.createElement("button",{type:"button",onClick:bookCare,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#ec4899",color:"#fff",fontWeight:900,cursor:"pointer"}},"🩺 Book Care (Co-Pay "+copayRwf.toLocaleString()+" RWF)")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(236,72,153,0.18)",color:"#f9a8d4",fontSize:12,fontWeight:800}},msg)
  );
}
