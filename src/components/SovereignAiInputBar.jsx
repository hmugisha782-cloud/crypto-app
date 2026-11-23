import React from "react";
import {AI_MODES} from "../utils/sovereignOmniAiEngine.js";
export default function SovereignAiInputBar({t,mode,setMode,fileRef,handleFile,fileName,prompt,setPrompt,askAi,thinking}){
  return React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
    React.createElement("select",{value:mode,onChange:e=>setMode(e.target.value),style:{padding:"8px 10px",borderRadius:10,border:"1px solid rgba(139,92,246,0.5)",background:"#0f172a",color:"#f8fafc",fontWeight:800,fontSize:12}},AI_MODES.map(m=>React.createElement("option",{key:m.id,value:m.id},m.id==="AUTO"?t.autoMode:m.label))),
    React.createElement("input",{ref:fileRef,type:"file",accept:".txt,.csv,.json,.md",onChange:handleFile,style:{display:"none"}}),
    React.createElement("button",{type:"button",onClick:()=>fileRef.current?.click(),style:{padding:"8px 11px",borderRadius:10,border:"1px solid #38bdf8",background:"rgba(56,189,248,0.18)",color:"#7dd3fc",fontWeight:800,fontSize:12,cursor:"pointer"}},fileName?"📎 "+fileName.slice(0,12):"📎 / 🖼️ / 🎬 "+t.fileBtn),
    React.createElement("input",{type:"text",value:prompt,onChange:e=>setPrompt(e.target.value),onKeyDown:e=>{if(e.key==="Enter")askAi();},placeholder:t.askPh,style:{flex:1,minWidth:200,padding:"8px 12px",borderRadius:10,border:"1px solid rgba(139,92,246,0.5)",background:"#0f172a",color:"#fff",fontSize:12.5}}),
    React.createElement("button",{type:"button",disabled:thinking,onClick:()=>askAi(),style:{padding:"8px 16px",borderRadius:10,border:"none",background:"#8b5cf6",color:"#fff",fontWeight:900,fontSize:12.5,cursor:"pointer"}},thinking?"⏳...":"🚀 "+t.askBtn)
  );
}