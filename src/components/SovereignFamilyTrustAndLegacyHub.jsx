import React,{useState} from "react";
import {TRUST_VAULT_TYPES,calcTrustAnnualYield} from "../utils/sovereignFamilyTrustLegacy.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignFamilyTrustAndLegacyHub({rates={},theme,panel}){
  const [trId,setTrId]=useState(TRUST_VAULT_TYPES.at(0).id);
  const [heir,setHeir]=useState("Next-of-Kin Beneficiary");
  const [usdAmt,setUsdAmt]=useState(100);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const tr=TRUST_VAULT_TYPES.find(t=>t.id===trId)||TRUST_VAULT_TYPES.at(0);
  const yrYield=calcTrustAnnualYield(usdAmt,tr.apy);
  function createTrust(){const v=Math.max(tr.minUsd,Number(usdAmt||0));const {tx}=recordSovereignTx({hub:"Sovereign Family Trust & Legacy",title:tr.name+" -> "+heir,amountUsd:v,rwfRate:rwf,type:"DEBIT"});setMsg("👨‍👩‍👧‍👦 TRUST SEALED ["+tx.id+"]: $"+v+" USD for "+heir+" (+$"+yrYield+"/yr yield)!");}
  return React.createElement("section",{id:"sovereign-family-trust-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #10b981",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"👨‍👩‍👧‍👦 Sovereign Family Trust, Next-of-Kin Inheritance & Multi-Gen Endowment Vault"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:trId,onChange:e=>setTrId(e.target.value),style:{flex:1,minWidth:190,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},TRUST_VAULT_TYPES.map(t=>React.createElement("option",{key:t.id,value:t.id},t.name+" ("+t.apy+"% APY)"))),
      React.createElement("input",{type:"text",value:heir,onChange:e=>setHeir(e.target.value),style:{width:155,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text,fontWeight:800}}),
      React.createElement("input",{type:"number",min:50,value:usdAmt,onChange:e=>setUsdAmt(e.target.value),style:{width:75,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text,fontWeight:800}}),
      React.createElement("button",{type:"button",onClick:createTrust,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"🏛️ Seal Trust (+$"+yrYield+"/yr)")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(16,185,129,0.2)",color:"#34d399",fontSize:12,fontWeight:800}},msg)
  );
}
