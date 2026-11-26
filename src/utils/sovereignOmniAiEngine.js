import {safeMath,liveWebSearch,geminiCall} from "./sovereignAiHelpers.js";
export const AI_MODELS=[{id:"llama-3.3-70b",name:"🧠 KGT-Omni-70B + Vision & Multi-Lang Web"},{id:"kgt-pro",name:"⚡ KGT-Universal-Encyclopedia"}];
export const AI_MODES=[{id:"AUTO",label:"🌐 Live Web + World Brain (All Languages)"},{id:"VIS",label:"👁️ Image & Screenshot Analyzer"},{id:"EDU",label:"🎓 Uburezi, Amashuri & Siyansi"},{id:"AGR",label:"🌾 Ubuhinzi, Ubworozi & Ikirere"},{id:"BIZ",label:"🏛️ Ubucuruzi, RDB, RRA & Imari"},{id:"COD",label:"💻 Ikoranabuhanga & Kode (HTML/Python)"}];
export async function runSovereignAiAsync({mode,prompt,rwf=1480,fileText="",imgData="",apiKey="",history=[]}){
  const q=String(prompt||"").trim();
  const mv=safeMath(q);
  if(!imgData&&mv!==null)return{text:"🧮 **Igisubizo cy Imibare:** "+q+" = **"+mv.toLocaleString()+"**"};
  const webCtx=imgData?"":await liveWebSearch(q);
  const today=new Date().toLocaleDateString("en-GB",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
  const sys="You are KGT Sovereign Omni-AI Studio (Kigali & Gatsibo, Rwanda). Today is "+today+". Live FX: 1 USD = "+rwf+" RWF. Detect the user language (Kinyarwanda, English, French, Swahili, Spanish, Arabic, Chinese, etc.) and answer fluently in that exact language. Synthesize the Live Web Search & Wikipedia facts below with clear headings, bullet points, and actionable examples. Never ask for an API key."+(webCtx?"\n\n=== LIVE MULTI-LANGUAGE WEB & WIKIPEDIA RESULTS ===\n"+webCtx:"")+(fileText?"\n\n=== ATTACHED DOCUMENT ===\n"+fileText.slice(0,2600):"");
  const res=await geminiCall(q||"Analyze attached file or image",apiKey,sys,history,imgData);
  if(res?.text)return{text:(webCtx?"🌐 **Live Web & Multi-Language Search Verified**\n\n":imgData?"👁️ **Vision Analysis Complete**\n\n":"")+res.text};
  if(webCtx)return{text:"🌐 **Live Multi-Language Web Search Results:**\n\n"+webCtx};
  return{text:"🧠 **KGT Sovereign Omni-AI Studio:** Muraho neza! Ongera ukande **Ask AI** cyangwa ushyiremo dosiye/ifoto ukoresheje 📎 / 🖼️!"};
}