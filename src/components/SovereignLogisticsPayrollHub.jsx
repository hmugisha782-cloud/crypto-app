import { useState } from "react";
import { CARGO_LANES, calcCargoQuote, calcBatchPayroll } from "../utils/sovereignLogisticsAndPayroll.js";
import { recordSovereignTx } from "../utils/sovereignLedger.js";
export default function SovereignLogisticsPayrollHub({rates={},theme,panel}){
  const [laneId,setLaneId]=useState(CARGO_LANES.at(0).id);
  const [kg,setKg]=useState(15);
  const [staff,setStaff]=useState(8);
  const [avgSal,setAvgSal]=useState(350000);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const lane=CARGO_LANES.find(l=>l.id===laneId)||CARGO_LANES.at(0);
  const cargoUsd=calcCargoQuote(kg,lane.perKgUsd);
  const pay=calcBatchPayroll(staff,avgSal);
  function shipCargo(){
    const {tx}=recordSovereignTx({hub:"Rwanda Global Cargo & Customs",title:`${kg}kg ${lane.route}`,amountUsd:cargoUsd,rwfRate:rwf,type:"DEBIT"});
    setMsg(`📦 WAYBILL [${tx.id}]: ${kg}kg on ${lane.route} · $${cargoUsd} USD (${lane.days} days ETA)!`);
  }
  function runPayroll(){
    const usd=Number((pay.grandTotalRwf/rwf).toFixed(2));
    const {tx}=recordSovereignTx({hub:"Enterprise MoMo/Bank Payroll",title:`${staff} Staff Salaries + RSSB`,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});
    setMsg(`👥 PAYROLL DISBURSED [${tx.id}]: ${staff} employees paid ${pay.grandTotalRwf.toLocaleString()} RWF (incl. ${pay.rssb.toLocaleString()} RWF RSSB)!`);
  }
  return(<section id="sovereign-logistics-payroll-hub" style={{...panel,marginBottom:18,borderTop:"4px solid #38bdf8",display:"grid",gap:10}}>
    <strong style={{fontSize:15}}>📦 Global Air/Port Cargo Freight & Enterprise Batch Payroll (MTN MoMo / BK / RSSB)</strong>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(265px,1fr))",gap:10}}>
      <div style={{padding:9,borderRadius:9,background:theme.input,border:`1px solid ${theme.border}`,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
        <select value={laneId} onChange={e=>setLaneId(e.target.value)} style={{flex:1,minWidth:160,padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{CARGO_LANES.map(l=><option key={l.id} value={l.id}>{l.route} (${l.perKgUsd}/kg)</option>)}</select>
        <input type="number" min="1" value={kg} onChange={e=>setKg(e.target.value)} style={{width:60,padding:"6px 7px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:12,fontWeight:800}}/>
        <button type="button" onClick={shipCargo} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#38bdf8",color:"#02131d",fontWeight:900,fontSize:11.5,cursor:"pointer"}}>📦 Ship (${cargoUsd})</button>
      </div>
      <div style={{padding:9,borderRadius:9,background:theme.input,border:`1px solid ${theme.border}`,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center",fontSize:11.5}}>
        <span>Staff:</span>
        <input type="number" min="1" value={staff} onChange={e=>setStaff(e.target.value)} style={{width:50,padding:"5px 6px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontWeight:800}}/>
        <span>Avg RWF:</span>
        <input type="number" step="10000" value={avgSal} onChange={e=>setAvgSal(e.target.value)} style={{width:95,padding:"5px 6px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontWeight:800}}/>
        <button type="button" onClick={runPayroll} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,fontSize:11.5,cursor:"pointer"}}>👥 Pay Payroll</button>
      </div>
    </div>
    {msg&&<div style={{padding:"6px 10px",borderRadius:8,background:"rgba(56,189,248,0.2)",border:"1px solid #38bdf8",color:"#7dd3fc",fontSize:12,fontWeight:800}}>{msg}</div>}
  </section>);
}
