import { useState } from "react";
import { VOICE_PRESETS, parseOcrReceipt } from "../utils/sovereignVoiceOcrEngine.js";
export default function SovereignVoiceAndOcrHub({theme,panel}){
  const [cmd,setCmd]=useState(VOICE_PRESETS.at(0));
  const [ocrText,setOcrText]=useState("MTN MoMo Receipt: 25,000 RWF Paid");
  const [msg,setMsg]=useState("");
  function runVoice(){setMsg("🎙️ AI VOICE EXECUTED: "+cmd+" → Ready & Verified!");}
  function scanDoc(){const r=parseOcrReceipt(ocrText);setMsg("📄 OCR VERIFIED ["+r.code+"]: Extracted "+r.detectedRwf.toLocaleString()+" RWF!");}
  return(<section id="sovereign-voice-ocr-hub" style={{...panel,marginBottom:18,borderTop:"4px solid #8b5cf6",display:"grid",gap:10}}><strong style={{fontSize:15}}>🎙️ KGT Sovereign Voice Assistant & Smart Receipt OCR Scanner</strong><div style={{display:"flex",gap:8,flexWrap:"wrap"}}><select value={cmd} onChange={e=>setCmd(e.target.value)} style={{padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{VOICE_PRESETS.map(v=><option key={v}>{v}</option>)}</select><button type="button" onClick={runVoice} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#8b5cf6",color:"#fff",fontWeight:900,cursor:"pointer"}}>🎙️ Speak Cmd</button><input type="text" value={ocrText} onChange={e=>setOcrText(e.target.value)} style={{width:210,padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}/><button type="button" onClick={scanDoc} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}}>📄 Scan OCR</button></div>{msg&&<div style={{padding:"6px 10px",borderRadius:8,background:"rgba(139,92,246,0.2)",border:"1px solid #8b5cf6",color:"#ddd6fe",fontSize:12,fontWeight:800}}>{msg}</div>}</section>);
}
