import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";
export default function SovereignHealthcareAndEducationHub({rates={},theme,panel}){
  const [service,setService]=useState("🏥 King Faisal / CHUK Tele-Doctor Consultation · 10,000 RWF");
  const [course,setCourse]=useState("🎓 Full-Stack AI & FinTech Masterclass Certificate · 15,000 RWF");
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  function payHealth(){
    const amtRwf=service.includes("10,000")?10000:service.includes("5,000")?5000:25000;
    const usd=Number((amtRwf/rwf).toFixed(2));
    const {tx}=recordSovereignTx({hub:"Rwanda Health & Pharmacy",title:service,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});
    setMsg(`🏥 BOOKED [${tx.id}]: ${service} ($${usd} USD)!`);
  }
  function payEdu(){
    const amtRwf=course.includes("15,000")?15000:course.includes("8,000")?8000:30000;
    const usd=Number((amtRwf/rwf).toFixed(2));
    const {tx}=recordSovereignTx({hub:"Kigali EdTech Academy",title:course,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});
    setMsg(`🎓 ENROLLED [${tx.id}]: ${course} ($${usd} USD)!`);
  }
  return(<section id="sovereign-health-edu-hub" style={{...panel,marginBottom:18,borderTop:"4px solid #ec4899",display:"grid",gap:10}}>
    <strong style={{fontSize:15}}>🏥 Rwanda Tele-Healthcare, Pharmacy Delivery & EdTech Certification Academy</strong>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(265px,1fr))",gap:10}}>
      <div style={{padding:9,borderRadius:9,background:theme.input,border:`1px solid ${theme.border}`,display:"flex",gap:6,flexWrap:"wrap"}}>
        <select value={service} onChange={e=>setService(e.target.value)} style={{flex:1,minWidth:180,padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>
          <option>🏥 King Faisal / CHUK Tele-Doctor Consultation · 10,000 RWF</option>
          <option>💊 Kipharma / Goodlife Express Medicine Delivery · 5,000 RWF</option>
          <option>🩺 Full Executive Lab Checkup Package · 25,000 RWF</option>
        </select>
        <button type="button" onClick={payHealth} style={{padding:"6px 12px",borderRadius:7,border:"none",background:"#ec4899",color:"#fff",fontWeight:900,fontSize:11.5,cursor:"pointer"}}>🏥 Book Care</button>
      </div>
      <div style={{padding:9,borderRadius:9,background:theme.input,border:`1px solid ${theme.border}`,display:"flex",gap:6,flexWrap:"wrap"}}>
        <select value={course} onChange={e=>setCourse(e.target.value)} style={{flex:1,minWidth:180,padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>
          <option>🎓 Full-Stack AI & FinTech Masterclass Certificate · 15,000 RWF</option>
          <option>📊 Crypto Trading & Risk Management Pro · 8,000 RWF</option>
          <option>🌐 Global Business English & French Fluency · 30,000 RWF</option>
        </select>
        <button type="button" onClick={payEdu} style={{padding:"6px 12px",borderRadius:7,border:"none",background:"#8b5cf6",color:"#fff",fontWeight:900,fontSize:11.5,cursor:"pointer"}}>🎓 Enroll Now</button>
      </div>
    </div>
    {msg&&<div style={{padding:"6px 10px",borderRadius:8,background:"rgba(236,72,153,0.18)",border:"1px solid #ec4899",color:"#f9a8d4",fontSize:12,fontWeight:800}}>{msg}</div>}
  </section>);
}
