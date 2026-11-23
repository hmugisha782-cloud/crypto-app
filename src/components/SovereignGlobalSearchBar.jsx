import React,{useState,useEffect,useRef} from "react";
import {useSovereignLang} from "../utils/sovereignUniversalI18n.js";
export default function SovereignGlobalSearchBar({panel={}}){
  const {t}=useSovereignLang();
  const [query,setQuery]=useState("");const [sections,setSections]=useState([]);const inputRef=useRef(null);
  function scan(){if(typeof document==="undefined")return;const list=Array.from(document.querySelectorAll("section[id], main section")).filter(el=>el.id!=="sovereign-global-search-bar").map((el,i)=>{if(!el.id)el.id="kgt-s-"+i;const h=el.querySelector("strong,h1,h2,h3");return{id:el.id,title:(h?.textContent||el.id).trim().slice(0,80),txt:(el.textContent||"").toLowerCase(),el};});setSections(list);}
  useEffect(()=>{const tm=setTimeout(scan,400);return()=>clearTimeout(tm);},[]);
  const q=query.trim().toLowerCase();const matches=q?sections.filter(s=>s.title.toLowerCase().includes(q)||s.txt.includes(q)).slice(0,12):[];
  return React.createElement("section",{id:"sovereign-global-search-bar",style:{...panel,position:"sticky",top:8,zIndex:90,marginBottom:16,borderRadius:14,border:"1px solid rgba(56,189,248,0.55)",borderTop:"4px solid #38bdf8",background:"rgba(15,23,42,0.97)",display:"grid",gap:8}},
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("strong",{style:{fontSize:14,color:"#7dd3fc"}},"🔍 "+t.searchLabel),
      React.createElement("input",{ref:inputRef,type:"search",value:query,onFocus:scan,onChange:e=>{if(!sections.length)scan();setQuery(e.target.value);},placeholder:t.searchPh,style:{flex:1,minWidth:210,padding:"8px 12px",borderRadius:10,border:"1px solid rgba(56,189,248,0.55)",background:"#0f172a",color:"#f8fafc",fontSize:13,fontWeight:700}}),
      query&&React.createElement("button",{type:"button",onClick:()=>setQuery(""),style:{padding:"7px 11px",borderRadius:9,border:"1px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.08)",color:"#e2e8f0",fontWeight:800,fontSize:12,cursor:"pointer"}},"✕ "+t.clear),
      React.createElement("span",{style:{fontSize:11,fontWeight:800,color:"#94a3b8"}},q?matches.length+" "+t.found:(sections.length||"275+")+" "+t.sections)
    ),
    q&&matches.length>0&&React.createElement("div",{style:{display:"flex",gap:6,flexWrap:"wrap",maxHeight:140,overflowY:"auto"}},matches.map(m=>React.createElement("button",{key:m.id,type:"button",onClick:()=>{m.el.scrollIntoView({behavior:"smooth",block:"center"});m.el.style.outline="3px solid #10b981";setTimeout(()=>{m.el.style.outline="";},2200);},style:{padding:"5px 10px",borderRadius:8,border:"1px solid #8b5cf6",background:"rgba(139,92,246,0.2)",color:"#f8fafc",fontSize:11.5,fontWeight:800,cursor:"pointer"}},"📍 "+m.title)))
  );
}