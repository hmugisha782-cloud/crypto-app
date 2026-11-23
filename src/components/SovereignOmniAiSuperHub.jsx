import {extractFullBookPdf,extractVideoFrame} from "../utils/sovereignAiHelpers.js";
import React,{useState,useRef} from "react";
import SovereignAiHeaderBar from "./SovereignAiHeaderBar.jsx";
import SovereignAiInputBar from "./SovereignAiInputBar.jsx";
import SovereignAiChatFeed from "./SovereignAiChatFeed.jsx";
import {AI_MODELS,runSovereignAiAsync} from "../utils/sovereignOmniAiEngine.js";
import {useSovereignLang} from "../utils/sovereignUniversalI18n.js";
import {recordSovereignTx,getLedgerTxs} from "../utils/sovereignLedger.js";
export default function SovereignOmniAiSuperHub({rates={},panel}){
  const {t}=useSovereignLang();
  const [model,setModel]=useState(AI_MODELS.at(0).id);const [mode,setMode]=useState("AUTO");const [prompt,setPrompt]=useState("");const [fileText,setFileText]=useState("");const [imgData,setImgData]=useState("");const [fileName,setFileName]=useState("");const [listening,setListening]=useState(false);const [copied,setCopied]=useState(false);const [thinking,setThinking]=useState(false);const [showKey,setShowKey]=useState(false);
  const [apiKey,setApiKey]=useState(()=>{try{return localStorage.getItem("kgt_gem_k")||"";}catch{return "";}});
  const fileRef=useRef(null);
  const [history,setHistory]=useState([]);
  const rwf=Number(rates?.RWF||1480);
  const shownHistory=history.length?history:[{role:"AI",text:t.welcome}];
  async function askAi(cq){const q=String(cq!==undefined?cq:prompt).trim();if((!q&&!fileText&&!imgData)||thinking)return;const lq=fileName?(q||t.fileBtn)+" [📎 "+fileName+"]":q;const base=[{role:"USER",text:lq},...history].slice(0,20);setHistory([{role:"AI",text:"⏳ "+t.thinking},...base]);if(cq===undefined)setPrompt("");setThinking(true);const res=await runSovereignAiAsync({mode,prompt:q,rwf,txs:getLedgerTxs(),fileText,imgData,apiKey,langName:t.langName,history});setThinking(false);setFileText("");setImgData("");setFileName("");recordSovereignTx({hub:"KGT Omni-AI",title:lq.slice(0,38),amountUsd:0,rwfRate:rwf,type:"CREDIT"});setHistory([{role:"AI",text:res.text},...base]);}
  async function handleFile(e){const f=e.target.files?.at(0);if(!f)return;setFileName(f.name);if(f.type.startsWith("video/")){const v=await extractVideoFrame(f);setImgData(v.frame);setFileText(v.info);return;}if(f.type==="application/pdf"||f.name.toLowerCase().endsWith(".pdf")){const b=await f.arrayBuffer();const tx=await extractFullBookPdf(b);setFileText(tx||"PDF: "+f.name);setImgData("");return;}const rd=new FileReader();if(f.type.startsWith("image/")){rd.onload=()=>{setImgData(String(rd.result||""));setFileText("");};rd.readAsDataURL(f);}else{rd.onload=()=>{setFileText(String(rd.result||""));setImgData("");};rd.readAsText(f);}}
  function startMic(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return;const r=new SR();setListening(true);r.onresult=e=>{const tx=e.results?.at(0)?.at(0)?.transcript||"";setPrompt(tx);askAi(tx);};r.onend=()=>setListening(false);r.start();}
  function speakLast(){const l=shownHistory.find(x=>x.role==="AI");if(l&&window.speechSynthesis){window.speechSynthesis.cancel();window.speechSynthesis.speak(new SpeechSynthesisUtterance(l.text));}}
  function copyLast(){const l=shownHistory.find(x=>x.role==="AI");if(l&&navigator?.clipboard){navigator.clipboard.writeText(l.text);setCopied(true);setTimeout(()=>setCopied(false),1500);}}
  function exportTxt(){const b=new Blob([shownHistory.map(x=>x.role+": "+x.text).join("\n\n")],{type:"text/plain"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="KGT-AI.txt";a.click();}
  return React.createElement("section",{id:"sovereign-omni-ai-super-hub",style:{...panel,marginBottom:18,borderRadius:16,border:"1px solid #8b5cf6",borderTop:"4px solid #8b5cf6",background:"linear-gradient(145deg,#0f172a,#1e1b4b)",display:"grid",gap:10}},
    React.createElement(SovereignAiHeaderBar,{t,model,setModel,listening,startMic,speakLast,copyLast,copied,exportTxt,clearHist:()=>setHistory([])}),
    React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}},React.createElement("span",{style:{fontSize:11.5,fontWeight:800,color:apiKey?"#34d399":"#fde68a"}},apiKey?"🟢 "+t.apiActive:"🟡 "+t.apiHybrid),React.createElement("button",{type:"button",onClick:()=>setShowKey(v=>!v),style:{padding:"4px 10px",borderRadius:8,border:"1px solid #f59e0b",background:"rgba(245,158,11,0.2)",color:"#fde68a",fontWeight:800,fontSize:11,cursor:"pointer"}},showKey?"▲ "+t.close:"🔑 "+t.apiKey)),
    showKey&&React.createElement("input",{type:"password",value:apiKey,onChange:e=>{setApiKey(e.target.value);localStorage.setItem("kgt_gem_k",e.target.value);},placeholder:"API Key (gsk_... / AIzaSy...)...",style:{padding:"6px 10px",borderRadius:8,border:"1px solid #f59e0b",background:"#020617",color:"#fff",fontSize:12}}),
    React.createElement(SovereignAiInputBar,{t,mode,setMode,fileRef,handleFile,fileName,prompt,setPrompt,askAi,thinking}),
    React.createElement(SovereignAiChatFeed,{history:shownHistory})
  );
}