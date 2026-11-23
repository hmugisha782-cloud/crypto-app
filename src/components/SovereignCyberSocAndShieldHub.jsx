import React,{useState} from "react";
import {SECURITY_MODULES,runDeepSecurityScan} from "../utils/sovereignCyberSocShield.js";
import {getLedgerTxs} from "../utils/sovereignLedger.js";
export default function SovereignCyberSocAndShieldHub({theme,panel}){
  const [modId,setModId]=useState(SECURITY_MODULES.at(0).id);
  const [msg,setMsg]=useState("");
  const mod=SECURITY_MODULES.find(m=>m.id===modId)||SECURITY_MODULES.at(0);
  function scanNow(){const r=runDeepSecurityScan(getLedgerTxs().length);setMsg("🛡️ SOC SCAN COMPLETE ["+r.stamp+"]: "+mod.name+" · Score: "+r.score+"/100 ("+r.scannedNodes.toLocaleString()+" Nodes Verified)!");}
  return React.createElement("section",{id:"sovereign-cyber-soc-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #10b981",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"🛡️ KGT Sovereign Cybersecurity SOC, Anti-Phishing & Quantum Integrity Shield"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:modId,onChange:e=>setModId(e.target.value),style:{flex:1,minWidth:210,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},SECURITY_MODULES.map(m=>React.createElement("option",{key:m.id,value:m.id},m.name+" ["+m.status+"]"))),
      React.createElement("button",{type:"button",onClick:scanNow,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"🛡️ Run Deep SOC Scan")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(16,185,129,0.2)",color:"#34d399",fontSize:12,fontWeight:800}},msg)
  );
}
