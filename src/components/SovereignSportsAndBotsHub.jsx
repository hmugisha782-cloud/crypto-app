import { useState } from "react";
import { LIVE_MATCHES, AI_TRADING_BOTS } from "../utils/sovereignSportsAndAiBots.js";
import { recordSovereignTx } from "../utils/sovereignLedger.js";
export default function SovereignSportsAndBotsHub({rates={},theme,panel}){
  const [matchId,setMatchId]=useState(LIVE_MATCHES.at(0).id);
  const [pick,setPick]=useState("1");
  const [stakeRwf,setStakeRwf]=useState(5000);
  const [botId,setBotId]=useState(AI_TRADING_BOTS.at(0).id);
  const [botUsd,setBotUsd]=useState(50);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const m=LIVE_MATCHES.find(x=>x.id===matchId)||LIVE_MATCHES.at(0);
  const bot=AI_TRADING_BOTS.find(b=>b.id===botId)||AI_TRADING_BOTS.at(0);
  const odd=pick==="1"?m.odd1:pick==="X"?m.oddX:m.odd2;
  function bet(){const v=Math.max(500,Number(stakeRwf||0));const usd=Number((v/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"Rwanda Sportsbook",title:`${m.match} [${pick}@${odd}]`,amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg(`⚽ TICKET [${tx.id}]: ${m.match} (${pick}@${odd}x) · Win: ${Math.round(v*odd).toLocaleString()} RWF!`);}
  function runBot(){const v=Math.max(bot.minUsd,Number(botUsd||0));const {tx}=recordSovereignTx({hub:"KGT AI Bot",title:`${bot.name} ($${v})`,amountUsd:v,rwfRate:rwf,type:"DEBIT"});setMsg(`🤖 BOT ACTIVE [${tx.id}]: ${bot.name} · $${v} USD (${bot.apy}% APY)!`);}
  return(<section id="sovereign-sports-bots-hub" style={{...panel,marginBottom:18,borderTop:"4px solid #10b981",display:"grid",gap:10}}><strong style={{fontSize:15}}>⚽ Amavubi & Global Sportsbook + 🤖 Autonomous AI Trading Bots</strong><div style={{display:"flex",gap:8,flexWrap:"wrap"}}><select value={matchId} onChange={e=>setMatchId(e.target.value)} style={{padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{LIVE_MATCHES.map(x=><option key={x.id} value={x.id}>{x.match}</option>)}</select><select value={pick} onChange={e=>setPick(e.target.value)} style={{padding:"6px 7px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}><option value="1">1 ({m.odd1})</option><option value="X">X ({m.oddX})</option><option value="2">2 ({m.odd2})</option></select><input type="number" value={stakeRwf} onChange={e=>setStakeRwf(e.target.value)} style={{width:75,padding:"6px 7px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text}}/><button type="button" onClick={bet} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}}>⚽ Bet</button><select value={botId} onChange={e=>setBotId(e.target.value)} style={{padding:"6px 8px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text,fontSize:11.5}}>{AI_TRADING_BOTS.map(b=><option key={b.id} value={b.id}>{b.name} ({b.apy}%)</option>)}</select><input type="number" value={botUsd} onChange={e=>setBotUsd(e.target.value)} style={{width:65,padding:"6px 7px",borderRadius:7,border:`1px solid ${theme.border}`,background:theme.input,color:theme.text}}/><button type="button" onClick={runBot} style={{padding:"6px 11px",borderRadius:7,border:"none",background:"#8b5cf6",color:"#fff",fontWeight:900,cursor:"pointer"}}>🤖 Deploy</button></div>{msg&&<div style={{padding:"6px 10px",borderRadius:8,background:"rgba(16,185,129,0.2)",border:"1px solid #10b981",color:"#34d399",fontSize:12,fontWeight:800}}>{msg}</div>}</section>);
}
