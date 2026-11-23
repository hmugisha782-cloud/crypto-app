import { useState } from "react";
import { AUTO_SERVICES, FLEET_VEHICLES } from "../utils/sovereignAutoAndFleet.js";
import { recordSovereignTx } from "../utils/sovereignLedger.js";
export default function SovereignAutoAndFleetHub({rates={},theme,panel}){
  const [srvId,setSrvId]=useState(AUTO_SERVICES.at(0).id);
  const [vehId,setVehId]=useState(FLEET_VEHICLES.at(0).id);
  const [plate,setPlate]=useState("RAG 482 K");
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const srv=AUTO_SERVICES.find(s=>s.id===srvId)||AUTO_SERVICES.at(0);
  const veh=FLEET_VEHICLES.find(v=>v.id===vehId)||FLEET_VEHICLES.at(0);
  function payAuto(){const usd=Number((srv.rwf/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"Rwanda Smart Auto & RNP",title:`${srv.name} [${plate}]`,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg(`🚗 CONFIRMED [${tx.id}]: ${srv.name} for Plate ${plate} (${srv.rwf.toLocaleString()} RWF)!`);}
  function rentFleet(){const {tx}=recordSovereignTx({hub:"Kigali Executive Fleet",title:veh.name,amountUsd:veh.usd,rwfRate:rwf,type:"DEBIT"});setMsg(`🚙 FLEET BOOKED [${tx.id}]: ${veh.name} · $${veh.usd} USD (${Math.round(veh.usd*rwf).toLocaleString()} RWF)!`);}
  return(<section id="sovereign-auto-fleet-hub" style={{...panel,marginBottom:18,borderTop:"4px solid #f59e0b",display:"grid",gap:10}}><strong style={{fontSize:15}}>🚗 Rwanda Vehicle Inspection (RNP), EV Battery Pass & Executive Fleet Rental</strong><div style={{display:"flex",gap:8,flexWrap:"wrap"}}><select value={srvId} onChange={e=>setSrvId(e.target.value)} style={{padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{AUTO_SERVICES.map(s=><option key={s.id} value={s.id}>{s.name} ({s.rwf.toLocaleString()} RWF)</option>)}</select><input type="text" value={plate} onChange={e=>setPlate(e.target.value)} style={{width:95,padding:"6px 7px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontWeight:800}}/><button type="button" onClick={payAuto} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#f59e0b",color:"#02131d",fontWeight:900,cursor:"pointer"}}>🚗 Pay Pass</button><select value={vehId} onChange={e=>setVehId(e.target.value)} style={{padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{FLEET_VEHICLES.map(v=><option key={v.id} value={v.id}>{v.name} (${v.usd}/day)</option>)}</select><button type="button" onClick={rentFleet} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}}>🚙 Rent Fleet</button></div>{msg&&<div style={{padding:"6px 10px",borderRadius:8,background:"rgba(245,158,11,0.2)",border:"1px solid #f59e0b",color:"#fde68a",fontSize:12,fontWeight:800}}>{msg}</div>}</section>);
}
