import React from "react";
import {AI_MODELS} from "../utils/sovereignOmniAiEngine.js";
export default function SovereignAiHeaderBar({t,model,setModel,listening,startMic,speakLast,copyLast,copied,exportTxt,clearHist}){
  const btn=(bg,bd,cl)=>({padding:"4px 9px",borderRadius:8,border:"1px solid "+bd,background:bg,color:cl,fontWeight:800,fontSize:11,cursor:"pointer"});
  return React.createElement("div",{style:{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,alignItems:"center"}},
    React.createElement("strong",{style:{fontSize:16,color:"#ede9fe"}},"🧠 "+t.aiTitle),
    React.createElement("div",{style:{display:"flex",gap:6,flexWrap:"wrap"}},
      React.createElement("select",{value:model,onChange:e=>setModel(e.target.value),style:{padding:"4px 8px",borderRadius:8,border:"1px solid rgba(139,92,246,0.5)",background:"#0f172a",color:"#c4b5fd",fontWeight:800,fontSize:11}},AI_MODELS.map(m=>React.createElement("option",{key:m.id,value:m.id},m.name))),
      React.createElement("button",{type:"button",onClick:startMic,style:btn(listening?"#ef4444":"rgba(16,185,129,0.2)","#10b981","#fff")},listening?"🔴 ...":"🎙️ "+t.mic),
      React.createElement("button",{type:"button",onClick:speakLast,style:btn("rgba(139,92,246,0.25)","#8b5cf6","#ede9fe")},"🔊 "+t.voice),
      React.createElement("button",{type:"button",onClick:copyLast,style:btn("rgba(245,158,11,0.2)","#f59e0b","#fde68a")},copied?"✅ "+t.copied:"📋 "+t.copy),
      React.createElement("button",{type:"button",onClick:exportTxt,style:btn("rgba(56,189,248,0.2)","#38bdf8","#7dd3fc")},"📥 "+t.txt),
      React.createElement("button",{type:"button",onClick:clearHist,style:btn("rgba(255,255,255,0.08)","rgba(255,255,255,0.2)","#e2e8f0")},"🧹")
    )
  );
}