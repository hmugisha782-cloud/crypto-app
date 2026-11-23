import React,{useState} from "react";
import {DIGITAL_BOOKS,RESEARCH_JOURNALS} from "../utils/sovereignPublishingLibrary.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignPublishingAndLibraryHub({rates={},theme,panel}){
  const [bkId,setBkId]=useState(DIGITAL_BOOKS.at(0).id);
  const [jrId,setJrId]=useState(RESEARCH_JOURNALS.at(0).id);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const bk=DIGITAL_BOOKS.find(b=>b.id===bkId)||DIGITAL_BOOKS.at(0);
  const jr=RESEARCH_JOURNALS.find(j=>j.id===jrId)||RESEARCH_JOURNALS.at(0);
  function buyBook(){const usd=Number((bk.rwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"Kigali Digital Library & Press",title:bk.title,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("📘 E-BOOK UNLOCKED ["+tx.id+"]: "+bk.title+" ("+bk.rwf.toLocaleString()+" RWF)!");}
  function subJournal(){const {tx}=recordSovereignTx({hub:"KGT Sovereign Research",title:jr.title,amountUsd:jr.usd,rwfRate:rwf,type:"DEBIT"});setMsg("🔬 REPORT DOWNLOAD READY ["+tx.id+"]: "+jr.title+" · $"+jr.usd+" USD!");}
  return React.createElement("section",{id:"sovereign-publishing-library-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #38bdf8",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"📘 Kigali Digital Publishing Press, E-Books & Sovereign Macro Research Library"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:bkId,onChange:e=>setBkId(e.target.value),style:{flex:1,minWidth:190,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},DIGITAL_BOOKS.map(b=>React.createElement("option",{key:b.id,value:b.id},b.title+" ("+b.rwf.toLocaleString()+" RWF)"))),
      React.createElement("button",{type:"button",onClick:buyBook,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#38bdf8",color:"#02131d",fontWeight:900,cursor:"pointer"}},"📘 Read E-Book"),
      React.createElement("select",{value:jrId,onChange:e=>setJrId(e.target.value),style:{padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},RESEARCH_JOURNALS.map(j=>React.createElement("option",{key:j.id,value:j.id},j.title+" ($"+j.usd+")"))),
      React.createElement("button",{type:"button",onClick:subJournal,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"🔬 Get Report")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(56,189,248,0.2)",color:"#7dd3fc",fontSize:12,fontWeight:800}},msg)
  );
}
