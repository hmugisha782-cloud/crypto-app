import React,{useState} from "react";
import {useSovereignLang} from "../utils/sovereignUniversalI18n.js";
import {getAuthUser,logoutAuth,authAction} from "../utils/sovereignAuthStore.js";
export default function SovereignAuthGate(){
  const {code}=useSovereignLang();const [lg,setLg]=useState(code||"en");const rw=lg==="rw";
  const [user,setUser]=useState(getAuthUser);
  const [mode,setMode]=useState("log");const [showPw,setShowPw]=useState(false);
  const [name,setName]=useState("");const [email,setEmail]=useState("");const [pw,setPw]=useState("");const [err,setErr]=useState("");
  function sub(e){e.preventDefault();setErr("");const r=authAction(mode,name,email,pw,rw);if(r.err){setErr(r.err);return;}setUser(r.user);setPw("");}
  function openReset(){const em=user?.email||"";logoutAuth();setUser(null);setEmail(em);setPw("");setMode("rst");setErr("");}
  if(user)return React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,padding:"8px 14px",marginBottom:10,borderRadius:12,background:"rgba(15,23,42,0.92)",border:"1px solid #10b981",color:"#f8fafc",fontSize:12}},
    React.createElement("strong",{style:{color:"#34d399"}},"🛡️ "+(rw?"Ikaze, ":"Welcome, ")+user.name+" ("+user.email+")"),
    React.createElement("div",{style:{display:"flex",gap:6}},
      React.createElement("button",{type:"button",onClick:openReset,style:{padding:"4px 10px",borderRadius:8,border:"1px solid #f59e0b",background:"rgba(245,158,11,0.2)",color:"#fde68a",fontWeight:800,cursor:"pointer"}},rw?"🔑 Hindura Password":"🔑 Change Password"),
      React.createElement("button",{type:"button",onClick:()=>{logoutAuth();setUser(null);setMode("log");setPw("");},style:{padding:"4px 10px",borderRadius:8,border:"1px solid #ef4444",background:"rgba(239,68,68,0.2)",color:"#fca5a5",fontWeight:800,cursor:"pointer"}},rw?"🚪 Sohoka":"🚪 Logout")
    )
  );
  const inp={padding:"10px 12px",borderRadius:10,border:"1px solid #8b5cf6",background:"#0f172a",color:"#fff",fontSize:13,width:"100%",boxSizing:"border-box"};
  const titles={log:rw?"Injira muri konti yawe":"Sign In to Continue",reg:rw?"Fungura konti nshya":"Create New Account",rst:rw?"Shyiraho Password Nshya":"Reset / Change Password"};
  const btns={log:rw?"🔓 Injira (Login)":"🔓 Sign In",reg:rw?"✅ Emeza Konti":"✅ Create Account",rst:rw?"🔑 Emeza Password Nshya":"🔑 Save New Password"};
  return React.createElement("div",{style:{position:"fixed",inset:0,zIndex:99999,background:"radial-gradient(circle at top,#1e1b4b,#020617)",display:"grid",placeItems:"center",padding:16}},
    React.createElement("form",{onSubmit:sub,style:{width:"100%",maxWidth:395,padding:24,borderRadius:18,background:"rgba(15,23,42,0.97)",border:"1px solid #8b5cf6",display:"grid",gap:11,color:"#f8fafc"}},
      React.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},React.createElement("select",{value:lg,onChange:e=>{setLg(e.target.value);localStorage.setItem("kgt_ui_lang",e.target.value);},style:{padding:"4px 8px",borderRadius:8,border:"1px solid #8b5cf6",background:"#020617",color:"#c4b5fd",fontSize:11,fontWeight:800}},React.createElement("option",{value:"en"},"🇬🇧 English"),React.createElement("option",{value:"rw"},"🇷🇼 Kinyarwanda"))),
      React.createElement("h2",{style:{margin:0,textAlign:"center",fontSize:18,color:"#ede9fe"}},"🔐 KIGALI GLOBAL TRACKER"),
      React.createElement("p",{style:{margin:0,textAlign:"center",fontSize:12,color:"#94a3b8"}},titles[mode]),
      mode==="reg"&&React.createElement("input",{type:"text",value:name,onChange:e=>setName(e.target.value),placeholder:rw?"Amazina yose...":"Full Name...",style:inp}),
      React.createElement("input",{type:"text",value:email,onChange:e=>setEmail(e.target.value),placeholder:rw?"Email cyangwa Telefoni...":"Email or Phone...",style:inp}),
      React.createElement("div",{style:{position:"relative"}},React.createElement("input",{type:showPw?"text":"password",value:pw,onChange:e=>setPw(e.target.value),placeholder:mode==="rst"?(rw?"Andika Password nshya (4+)...":"Enter New Password (4+)..."):(rw?"Ijambo ry ibanga (Password)...":"Password..."),style:inp}),React.createElement("button",{type:"button",onClick:()=>setShowPw(v=>!v),style:{position:"absolute",right:10,top:9,background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:13}},showPw?"🙈":"👁️")),
      err&&React.createElement("div",{style:{padding:"7px 10px",borderRadius:8,background:"rgba(239,68,68,0.2)",border:"1px solid #ef4444",color:"#fca5a5",fontSize:12}},err),
      React.createElement("button",{type:"submit",style:{padding:"11px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#8b5cf6,#10b981)",color:"#fff",fontWeight:900,cursor:"pointer"}},btns[mode]),
      React.createElement("div",{style:{display:"flex",justifyContent:"space-between",gap:8,flexWrap:"wrap"}},
        React.createElement("button",{type:"button",onClick:()=>{setMode(mode==="reg"?"log":"reg");setErr("");},style:{background:"none",border:"none",color:"#7dd3fc",fontSize:11.5,fontWeight:800,cursor:"pointer",textDecoration:"underline"}},mode==="reg"?(rw?"Injira hano":"Sign In"):(rw?"Fungura konti":"Create Account")),
        React.createElement("button",{type:"button",onClick:()=>{setMode(mode==="rst"?"log":"rst");setErr("");},style:{background:"none",border:"none",color:"#fde68a",fontSize:11.5,fontWeight:800,cursor:"pointer",textDecoration:"underline"}},mode==="rst"?(rw?"Subira kwinjira":"Back to Sign In"):(rw?"Wibagiwe Password?":"Forgot / Change Password?"))
      )
    )
  );
}
