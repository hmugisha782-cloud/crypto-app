import React,{useState} from "react";
import {KYC_TIERS,generatePasskeyHash} from "../utils/sovereignKycAndSecurity.js";
export default function SovereignKycAndIdentityHub({theme,panel}){
  const [tierId,setTierId]=useState(KYC_TIERS.at(1).id);
  const [holder,setHolder]=useState("Kigali Executive Member");
  const [msg,setMsg]=useState("");
  const tier=KYC_TIERS.find(t=>t.id===tierId)||KYC_TIERS.at(1);
  function verify(){const k=generatePasskeyHash(holder);setMsg("VAULT VERIFIED ["+k+"]: "+holder+" -> "+tier.level);}
  return React.createElement("section",{id:"sovereign-kyc-identity-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #38bdf8",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"Sovereign Digital KYC, NIDA / Passport & Passkey Vault"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap"}},
      React.createElement("input",{type:"text",value:holder,onChange:e=>setHolder(e.target.value),style:{width:180,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}}),
      React.createElement("select",{value:tierId,onChange:e=>setTierId(e.target.value),style:{padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},KYC_TIERS.map(t=>React.createElement("option",{key:t.id,value:t.id},t.level))),
      React.createElement("button",{type:"button",onClick:verify,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#38bdf8",color:"#02131d",fontWeight:900,cursor:"pointer"}},"Activate Passkey")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(56,189,248,0.2)",color:"#7dd3fc",fontSize:12,fontWeight:800}},msg)
  );
}
