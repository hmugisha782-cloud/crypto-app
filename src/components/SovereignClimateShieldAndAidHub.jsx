import React,{useState} from "react";
import {PARAMETRIC_POLICIES,AID_VOUCHERS} from "../utils/sovereignClimateShieldAid.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignClimateShieldAndAidHub({rates={},theme,panel}){
  const [plId,setPlId]=useState(PARAMETRIC_POLICIES.at(0).id);
  const [adId,setAdId]=useState(AID_VOUCHERS.at(0).id);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const pl=PARAMETRIC_POLICIES.find(p=>p.id===plId)||PARAMETRIC_POLICIES.at(0);
  const ad=AID_VOUCHERS.find(a=>a.id===adId)||AID_VOUCHERS.at(0);
  function activatePolicy(){const usd=Number((pl.rwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"Rwanda Parametric Climate Shield",title:pl.name,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("🌦️ SHIELD ACTIVE ["+tx.id+"]: "+pl.name+" (Auto-Payout: "+pl.payoutRwf.toLocaleString()+" RWF)!");}
  function sendAid(){const {tx}=recordSovereignTx({hub:"KGT Humanitarian Aid Disburser",title:ad.name,amountUsd:ad.usd,rwfRate:rwf,type:"DEBIT"});setMsg("🤝 AID VOUCHER SENT ["+tx.id+"]: "+ad.name+" · $"+ad.usd+" USD!");}
  return React.createElement("section",{id:"sovereign-climate-aid-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #38bdf8",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"🌦️ Gatsibo & Rwanda Parametric Climate Crop Insurance & Humanitarian Aid Vault"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:plId,onChange:e=>setPlId(e.target.value),style:{flex:1,minWidth:190,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},PARAMETRIC_POLICIES.map(p=>React.createElement("option",{key:p.id,value:p.id},p.name+" ("+p.rwf.toLocaleString()+" RWF)"))),
      React.createElement("button",{type:"button",onClick:activatePolicy,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#38bdf8",color:"#02131d",fontWeight:900,cursor:"pointer"}},"🌦️ Activate Shield"),
      React.createElement("select",{value:adId,onChange:e=>setAdId(e.target.value),style:{padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},AID_VOUCHERS.map(a=>React.createElement("option",{key:a.id,value:a.id},a.name+" ($"+a.usd+")"))),
      React.createElement("button",{type:"button",onClick:sendAid,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"🤝 Send Aid")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(56,189,248,0.2)",color:"#7dd3fc",fontSize:12,fontWeight:800}},msg)
  );
}
