import {safeMath,liveWebSearch,geminiCall} from "./sovereignAiHelpers.js";
export const AI_MODELS=[{id:"llama-3.3-70b",name:"🧠 KGT-Omni-70B + Vision & Live Web"},{id:"kgt-pro",name:"⚡ KGT-Universal-Encyclopedia"}];
export const AI_MODES=[{id:"AUTO",label:"🌐 Live Web + World Brain"},{id:"VIS",label:"👁️ Image & Screenshot Analyzer"},{id:"EDU",label:"🎓 Uburezi, Amashuri & Siyansi"},{id:"AGR",label:"🌾 Ubuhinzi, Ubworozi & Ikirere"},{id:"BIZ",label:"🏛️ Ubucuruzi, RDB, RRA & Imari"},{id:"COD",label:"💻 Ikoranabuhanga & Kode (HTML/Python)"}];
export async function runSovereignAiAsync({mode,prompt,rwf=1480,fileText="",imgData="",apiKey="",history=[]}){
  const q=String(prompt||"").trim();
  const mv=safeMath(q);
  if(!imgData&&mv!==null)return{text:"🧮 "+q+" = "+mv.toLocaleString()};
  const webCtx=imgData?"":await liveWebSearch(q);
  const today=new Date().toLocaleDateString("en-GB",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
  const sys="You are KGT Sovereign Omni-AI (Kigali & Gatsibo, Rwanda). Today is "+today+". Live rate: 1 USD = "+rwf+" RWF. Reply clearly, naturally, and accurately in the exact language the user used (Kinyarwanda, English, French, Swahili, etc.). Never ask the user for an API key."+(webCtx?"\nLive Web Search Results:\n"+webCtx:"")+(fileText?"\nAttached File Content:\n"+fileText.slice(0,2200):"");
  const res=await geminiCall(q||"Analyze attached file or image",apiKey,sys,history,imgData);
  if(res?.text)return{text:(webCtx?"🌐 ":imgData?"👁️ ":"")+res.text};
  if(webCtx)return{text:"🌐 "+webCtx};
  return{text:"Muraho neza! Ndi KGT Sovereign Omni-AI. Ongera ugerageze kubaza cyangwa uhitemo dosiye/ifoto ukoresheje buto ya 📎 / 🖼️ iri hasi."};
}