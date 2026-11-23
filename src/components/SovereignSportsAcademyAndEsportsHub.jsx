import React,{useState} from "react";
import {SPORTS_ACADEMY_PASSES,ESPORTS_LEAGUES} from "../utils/sovereignSportsAcademyEsports.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignSportsAcademyAndEsportsHub({rates={},theme,panel}){
  const [saId,setSaId]=useState(SPORTS_ACADEMY_PASSES.at(0).id);
  const [esId,setEsId]=useState(ESPORTS_LEAGUES.at(0).id);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const sa=SPORTS_ACADEMY_PASSES.find(s=>s.id===saId)||SPORTS_ACADEMY_PASSES.at(0);
  const es=ESPORTS_LEAGUES.find(e=>e.id===esId)||ESPORTS_LEAGUES.at(0);
  function joinAcademy(){const usd=Number((sa.rwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"Rwanda Sports & Amahoro Pass",title:sa.name,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("⚽ ACADEMY PASS ["+tx.id+"]: "+sa.name+" ("+sa.rwf.toLocaleString()+" RWF)!");}
  function joinEsports(){const {tx}=recordSovereignTx({hub:"KGT Global Esports & Hackathons",title:es.name,amountUsd:es.usd,rwfRate:rwf,type:"DEBIT"});setMsg("🎮 TOURNAMENT REGISTERED ["+tx.id+"]: "+es.name+" (Prize Pool: $"+es.prizeUsd+" USD)!");}
  return React.createElement("section",{id:"sovereign-sports-academy-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #8b5cf6",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"⚽ Amahoro Stadium Sports Academy, Tour du Rwanda Club & Global Esports Arena"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:saId,onChange:e=>setSaId(e.target.value),style:{flex:1,minWidth:190,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},SPORTS_ACADEMY_PASSES.map(s=>React.createElement("option",{key:s.id,value:s.id},s.name+" ("+s.rwf.toLocaleString()+" RWF)"))),
      React.createElement("button",{type:"button",onClick:joinAcademy,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"⚽ Join Academy"),
      React.createElement("select",{value:esId,onChange:e=>setEsId(e.target.value),style:{padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},ESPORTS_LEAGUES.map(e=>React.createElement("option",{key:e.id,value:e.id},e.name+" ($"+e.usd+")"))),
      React.createElement("button",{type:"button",onClick:joinEsports,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#8b5cf6",color:"#fff",fontWeight:900,cursor:"pointer"}},"🎮 Enter Arena")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(139,92,246,0.2)",color:"#ddd6fe",fontSize:12,fontWeight:800}},msg)
  );
}
