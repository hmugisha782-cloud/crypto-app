import React,{useState} from "react";
import {RWANDA_MINERAL_TOKENS,MINING_ROYALTIES} from "../utils/sovereignMineralsAndMining.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignMineralsAndMiningHub({rates={},theme,panel}){
  const [mnId,setMnId]=useState(RWANDA_MINERAL_TOKENS.at(0).id);
  const [units,setUnits]=useState(2);
  const [ryId,setRyId]=useState(MINING_ROYALTIES.at(0).id);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const mn=RWANDA_MINERAL_TOKENS.find(m=>m.id===mnId)||RWANDA_MINERAL_TOKENS.at(0);
  const ry=MINING_ROYALTIES.find(r=>r.id===ryId)||MINING_ROYALTIES.at(0);
  function buyMineral(){const q=Math.max(1,Number(units||1));const usd=q*mn.usdPerUnit;const {tx}=recordSovereignTx({hub:"Rwanda 3Ts Minerals & Gems",title:q+"x "+mn.name,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("⛏️ MINERAL VAULT ISSUED ["+tx.id+"]: "+q+"x "+mn.name+" ("+mn.purity+") · $"+usd+" USD!");}
  function payRoyalty(){const usd=Number((ry.rwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"RMB Mineral Traceability",title:ry.name,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("💎 CERTIFICATE ISSUED ["+tx.id+"]: "+ry.name+" ("+ry.rwf.toLocaleString()+" RWF)!");}
  return React.createElement("section",{id:"sovereign-minerals-mining-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #38bdf8",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"⛏️ Rwanda 3Ts Minerals (Tin, Coltan, Tungsten) & Certified Gemstones Vault"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:mnId,onChange:e=>setMnId(e.target.value),style:{flex:1,minWidth:190,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},RWANDA_MINERAL_TOKENS.map(m=>React.createElement("option",{key:m.id,value:m.id},m.name+" ($"+m.usdPerUnit+")"))),
      React.createElement("input",{type:"number",min:1,value:units,onChange:e=>setUnits(e.target.value),style:{width:55,padding:"6px 7px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text,fontWeight:800}}),
      React.createElement("button",{type:"button",onClick:buyMineral,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#38bdf8",color:"#02131d",fontWeight:900,cursor:"pointer"}},"⛏️ Acquire Token"),
      React.createElement("select",{value:ryId,onChange:e=>setRyId(e.target.value),style:{padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},MINING_ROYALTIES.map(r=>React.createElement("option",{key:r.id,value:r.id},r.name+" ("+r.rwf.toLocaleString()+" RWF)"))),
      React.createElement("button",{type:"button",onClick:payRoyalty,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"💎 Issue Tag")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(56,189,248,0.2)",color:"#7dd3fc",fontSize:12,fontWeight:800}},msg)
  );
}
