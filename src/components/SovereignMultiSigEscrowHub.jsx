import React,{useState} from "react";
import {ESCROW_TEMPLATES,calcEscrowRelease} from "../utils/sovereignMultiSigVault.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignMultiSigEscrowHub({rates={},theme,panel}){
  const [tplId,setTplId]=useState(ESCROW_TEMPLATES.at(0).id);
  const [usdAmt,setUsdAmt]=useState(250);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const tpl=ESCROW_TEMPLATES.find(t=>t.id===tplId)||ESCROW_TEMPLATES.at(0);
  const netUsd=calcEscrowRelease(usdAmt,tpl.feeUsd);
  function lockEscrow(){const v=Math.max(10,Number(usdAmt||0));const {tx}=recordSovereignTx({hub:"Sovereign Multi-Sig Escrow",title:tpl.name+" ($"+v+")",amountUsd:v,rwfRate:rwf,type:"DEBIT"});setMsg("🔐 ESCROW LOCKED ["+tx.id+"]: $"+v+" USD (Net Release: $"+netUsd+" USD / "+Math.round(netUsd*rwf).toLocaleString()+" RWF)!");}
  return React.createElement("section",{id:"sovereign-multisig-escrow-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #8b5cf6",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"🔐 Sovereign 2-of-3 Multi-Sig Treasury & Smart-Contract Escrow Vault"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:tplId,onChange:e=>setTplId(e.target.value),style:{flex:1,minWidth:210,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},ESCROW_TEMPLATES.map(t=>React.createElement("option",{key:t.id,value:t.id},t.name+" ($"+t.feeUsd+" fee)"))),
      React.createElement("input",{type:"number",min:10,value:usdAmt,onChange:e=>setUsdAmt(e.target.value),style:{width:85,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text,fontWeight:800}}),
      React.createElement("button",{type:"button",onClick:lockEscrow,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#8b5cf6",color:"#fff",fontWeight:900,cursor:"pointer"}},"🔐 Lock Escrow ($"+netUsd+" net)")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(139,92,246,0.2)",color:"#ddd6fe",fontSize:12,fontWeight:800}},msg)
  );
}
