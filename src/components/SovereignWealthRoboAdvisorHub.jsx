import React,{useState} from "react";
import {ROBO_PORTFOLIOS,projectFiveYearUsd} from "../utils/sovereignRoboAdvisor.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignWealthRoboAdvisorHub({rates={},theme,panel}){
  const [rbId,setRbId]=useState(ROBO_PORTFOLIOS.at(0).id);
  const [usdAmt,setUsdAmt]=useState(100);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const rb=ROBO_PORTFOLIOS.find(r=>r.id===rbId)||ROBO_PORTFOLIOS.at(0);
  const proj5y=projectFiveYearUsd(usdAmt,rb.apy);
  function allocateRobo(){const v=Math.max(10,Number(usdAmt||0));const {tx}=recordSovereignTx({hub:"KGT AI Wealth Robo-Advisor",title:rb.name+" ($"+v+")",amountUsd:v,rwfRate:rwf,type:"DEBIT"});setMsg("🧠 PORTFOLIO ACTIVE ["+tx.id+"]: $"+v+" USD allocated → 5-Yr Est: $"+proj5y.toLocaleString()+" USD ("+Math.round(proj5y*rwf).toLocaleString()+" RWF)!");}
  return React.createElement("section",{id:"sovereign-wealth-robo-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #8b5cf6",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"🧠 KGT Sovereign AI Wealth Robo-Advisor & 5-Year Compounding Engine"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:rbId,onChange:e=>setRbId(e.target.value),style:{flex:1,minWidth:210,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},ROBO_PORTFOLIOS.map(r=>React.createElement("option",{key:r.id,value:r.id},r.name+" ("+r.apy+"% APY)"))),
      React.createElement("input",{type:"number",min:10,value:usdAmt,onChange:e=>setUsdAmt(e.target.value),style:{width:80,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text,fontWeight:800}}),
      React.createElement("button",{type:"button",onClick:allocateRobo,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#8b5cf6",color:"#fff",fontWeight:900,cursor:"pointer"}},"🧠 Auto-Invest (5Y: $"+proj5y.toLocaleString()+")")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(139,92,246,0.2)",color:"#ddd6fe",fontSize:12,fontWeight:800}},msg)
  );
}
