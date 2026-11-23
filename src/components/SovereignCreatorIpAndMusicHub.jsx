import React,{useState} from "react";
import {CREATOR_ROYALTY_ASSETS,IP_REGISTRATIONS} from "../utils/sovereignCreatorIpRoyalties.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignCreatorIpAndMusicHub({rates={},theme,panel}){
  const [ipId,setIpId]=useState(CREATOR_ROYALTY_ASSETS.at(0).id);
  const [rgId,setRgId]=useState(IP_REGISTRATIONS.at(0).id);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const ip=CREATOR_ROYALTY_ASSETS.find(x=>x.id===ipId)||CREATOR_ROYALTY_ASSETS.at(0);
  const rg=IP_REGISTRATIONS.find(r=>r.id===rgId)||IP_REGISTRATIONS.at(0);
  function buyRoyalty(){const {tx}=recordSovereignTx({hub:"Rwanda Music & Art Royalties",title:ip.name,amountUsd:ip.usd,rwfRate:rwf,type:"DEBIT"});setMsg("🎵 ROYALTY SHARE ISSUED ["+tx.id+"]: "+ip.name+" · $"+ip.usd+" USD ("+ip.apy+"% Est. Yield)!");}
  function registerIp(){const usd=Number((rg.rwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"RDB Intellectual Property",title:rg.name,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("📜 IP CERTIFICATE SEALED ["+tx.id+"]: "+rg.name+" ("+rg.rwf.toLocaleString()+" RWF)!");}
  return React.createElement("section",{id:"sovereign-creator-ip-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #ec4899",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"🎵 Kigali Music Royalties, Imigongo Digital Art & RDB Creator IP Vault"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:ipId,onChange:e=>setIpId(e.target.value),style:{flex:1,minWidth:190,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},CREATOR_ROYALTY_ASSETS.map(x=>React.createElement("option",{key:x.id,value:x.id},x.name+" ($"+x.usd+" · "+x.apy+"%)"))),
      React.createElement("button",{type:"button",onClick:buyRoyalty,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#ec4899",color:"#fff",fontWeight:900,cursor:"pointer"}},"🎵 Buy Royalty"),
      React.createElement("select",{value:rgId,onChange:e=>setRgId(e.target.value),style:{padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},IP_REGISTRATIONS.map(r=>React.createElement("option",{key:r.id,value:r.id},r.name+" ("+r.rwf.toLocaleString()+" RWF)"))),
      React.createElement("button",{type:"button",onClick:registerIp,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"📜 Register IP")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(236,72,153,0.18)",color:"#f9a8d4",fontSize:12,fontWeight:800}},msg)
  );
}
