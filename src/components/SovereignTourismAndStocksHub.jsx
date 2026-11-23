import { useState } from "react";
import { RWANDA_TOURISM_EVENTS, GLOBAL_STOCKS_ETFS } from "../utils/sovereignTourismAndStocks.js";
import { recordSovereignTx } from "../utils/sovereignLedger.js";
export default function SovereignTourismAndStocksHub({rates={},theme,panel}){
  const [tourId,setTourId]=useState(RWANDA_TOURISM_EVENTS.at(0).id);
  const [guests,setGuests]=useState(2);
  const [ticker,setTicker]=useState(GLOBAL_STOCKS_ETFS.at(0).ticker);
  const [investUsd,setInvestUsd]=useState(50);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const tour=RWANDA_TOURISM_EVENTS.find(t=>t.id===tourId)||RWANDA_TOURISM_EVENTS.at(0);
  const stock=GLOBAL_STOCKS_ETFS.find(s=>s.ticker===ticker)||GLOBAL_STOCKS_ETFS.at(0);
  function bookTour(){
    const qty=Math.max(1,Number(guests||1));
    const totalRwf=qty*tour.rwf;
    const usd=Number((totalRwf/rwf).toFixed(2));
    const {tx}=recordSovereignTx({hub:"Visit Rwanda & BK Arena Pass",title:`${qty}x ${tour.name}`,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});
    setMsg(`🦍 PASS ISSUED [${tx.id}]: ${qty}x ${tour.name} · ${totalRwf.toLocaleString()} RWF ($${usd} USD)!`);
  }
  function buyStock(){
    const v=Math.max(5,Number(investUsd||0));
    const shares=Number((v/stock.priceUsd).toFixed(4));
    const {tx}=recordSovereignTx({hub:"RSE & Global Equities",title:`${shares} shares ${stock.ticker}`,amountUsd:v,rwfRate:rwf,type:"DEBIT"});
    setMsg(`📈 SHARES BOUGHT [${tx.id}]: ${shares} ${stock.ticker} (${stock.name}) for $${v} USD!`);
  }
  return(<section id="sovereign-tourism-stocks-hub" style={{...panel,marginBottom:18,borderTop:"4px solid #8b5cf6",display:"grid",gap:10}}>
    <strong style={{fontSize:15}}>🦍 Visit Rwanda Parks, BK Arena VIP Tickets & RSE / NASDAQ Global Stocks</strong>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(265px,1fr))",gap:10}}>
      <div style={{padding:9,borderRadius:9,background:theme.input,border:`1px solid ${theme.border}`,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
        <select value={tourId} onChange={e=>setTourId(e.target.value)} style={{flex:1,minWidth:160,padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{RWANDA_TOURISM_EVENTS.map(t=><option key={t.id} value={t.id}>{t.name} ({t.rwf.toLocaleString()} RWF)</option>)}</select>
        <input type="number" min="1" value={guests} onChange={e=>setGuests(e.target.value)} style={{width:55,padding:"6px 7px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:12,fontWeight:800}}/>
        <button type="button" onClick={bookTour} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,fontSize:11.5,cursor:"pointer"}}>🦍 Book Pass</button>
      </div>
      <div style={{padding:9,borderRadius:9,background:theme.input,border:`1px solid ${theme.border}`,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
        <select value={ticker} onChange={e=>setTicker(e.target.value)} style={{flex:1,minWidth:160,padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{GLOBAL_STOCKS_ETFS.map(s=><option key={s.ticker} value={s.ticker}>{s.ticker} — {s.name} (${s.priceUsd})</option>)}</select>
        <input type="number" min="5" value={investUsd} onChange={e=>setInvestUsd(e.target.value)} style={{width:65,padding:"6px 7px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:12,fontWeight:800}}/>
        <button type="button" onClick={buyStock} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#8b5cf6",color:"#fff",fontWeight:900,fontSize:11.5,cursor:"pointer"}}>📈 Buy Equity</button>
      </div>
    </div>
    {msg&&<div style={{padding:"6px 10px",borderRadius:8,background:"rgba(139,92,246,0.2)",border:"1px solid #8b5cf6",color:"#ddd6fe",fontSize:12,fontWeight:800}}>{msg}</div>}
  </section>);
}
