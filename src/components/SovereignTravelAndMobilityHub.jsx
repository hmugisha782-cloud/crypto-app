import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";
export default function SovereignTravelAndMobilityHub({rates={},theme,panel}){
  const [route,setRoute]=useState("✈️ RwandAir WB: Kigali (KGL) → Dubai (DXB) · $420");
  const [ride,setRide]=useState("🚕 Kigali Smart Cab (Kiyovu → KIFC) · 3,500 RWF");
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  function bookFlight(){
    const usd=route.includes("420")?420:route.includes("680")?680:185;
    const {tx}=recordSovereignTx({hub:"RwandAir & Global Aviation",title:route,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});
    setMsg(`✈️ E-TICKET ISSUED [${tx.id}]: ${route} (${Math.round(usd*rwf).toLocaleString()} RWF)!`);
  }
  function bookRide(){
    const fareRwf=ride.includes("3,500")?3500:ride.includes("1,800")?1800:15000;
    const usd=Number((fareRwf/rwf).toFixed(2));
    const {tx}=recordSovereignTx({hub:"Rwanda Smart Mobility",title:ride,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});
    setMsg(`🚖 DRIVER DISPATCHED [${tx.id}]: ${ride} ($${usd} USD)!`);
  }
  return(<section id="sovereign-travel-mobility-hub" style={{...panel,marginBottom:18,borderTop:"4px solid #38bdf8",display:"grid",gap:10}}>
    <strong style={{fontSize:15}}>✈️ RwandAir Global Flights, Hotel Concierge & Kigali/Gatsibo Smart Mobility</strong>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(265px,1fr))",gap:10}}>
      <div style={{padding:9,borderRadius:9,background:theme.input,border:`1px solid ${theme.border}`,display:"flex",gap:6,flexWrap:"wrap"}}>
        <select value={route} onChange={e=>setRoute(e.target.value)} style={{flex:1,minWidth:180,padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>
          <option>✈️ RwandAir WB: Kigali (KGL) → Dubai (DXB) · $420</option>
          <option>✈️ RwandAir WB: Kigali (KGL) → London (LHR) · $680</option>
          <option>✈️ RwandAir WB: Kigali (KGL) → Nairobi (NBO) · $185</option>
        </select>
        <button type="button" onClick={bookFlight} style={{padding:"6px 12px",borderRadius:7,border:"none",background:"#38bdf8",color:"#02131d",fontWeight:900,fontSize:11.5,cursor:"pointer"}}>✈️ Book Flight</button>
      </div>
      <div style={{padding:9,borderRadius:9,background:theme.input,border:`1px solid ${theme.border}`,display:"flex",gap:6,flexWrap:"wrap"}}>
        <select value={ride} onChange={e=>setRide(e.target.value)} style={{flex:1,minWidth:180,padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>
          <option>🚕 Kigali Smart Cab (Kiyovu → KIFC) · 3,500 RWF</option>
          <option>🏍️ Safe EV Moto Taxi (Remera → Nyabugogo) · 1,800 RWF</option>
          <option>🚐 Express Van (Kigali → Gatsibo Kabarore) · 15,000 RWF</option>
        </select>
        <button type="button" onClick={bookRide} style={{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,fontSize:11.5,cursor:"pointer"}}>🚖 Book Ride</button>
      </div>
    </div>
    {msg&&<div style={{padding:"6px 10px",borderRadius:8,background:"rgba(56,189,248,0.2)",border:"1px solid #38bdf8",color:"#7dd3fc",fontSize:12,fontWeight:800}}>{msg}</div>}
  </section>);
}
