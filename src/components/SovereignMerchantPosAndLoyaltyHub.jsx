import React,{useState} from "react";
import {MERCHANT_TERMINALS,calcCashbackRwf} from "../utils/sovereignMerchantPosLoyalty.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignMerchantPosAndLoyaltyHub({rates={},theme,panel}){
  const [posId,setPosId]=useState(MERCHANT_TERMINALS.at(0).id);
  const [rwfAmt,setRwfAmt]=useState(12000);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const pos=MERCHANT_TERMINALS.find(p=>p.id===posId)||MERCHANT_TERMINALS.at(0);
  const cbRwf=calcCashbackRwf(rwfAmt,pos.cashbackPct);
  function payQrPos(){const v=Math.max(500,Number(rwfAmt||0));const usd=Number((v/rwf).toFixed(2));const {tx}=recordSovereignTx({hub:"KGT Merchant QR POS",title:pos.name+" ("+v.toLocaleString()+" RWF)",amountUsd:usd,rwfRate:rwf,type:"DEBIT"});setMsg("📲 QR POS PAID ["+tx.id+"]: "+pos.name+" · "+v.toLocaleString()+" RWF (+"+cbRwf.toLocaleString()+" RWF Cashback)!");}
  return React.createElement("section",{id:"sovereign-merchant-pos-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #10b981",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"📲 Kigali & Gatsibo Smart Merchant QR POS Terminal & Instant Loyalty Cashback"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:posId,onChange:e=>setPosId(e.target.value),style:{flex:1,minWidth:210,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},MERCHANT_TERMINALS.map(p=>React.createElement("option",{key:p.id,value:p.id},p.name+" ("+p.cashbackPct+"% Cashback)"))),
      React.createElement("input",{type:"number",step:500,value:rwfAmt,onChange:e=>setRwfAmt(e.target.value),style:{width:95,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text,fontWeight:800}}),
      React.createElement("button",{type:"button",onClick:payQrPos,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#10b981",color:"#02131d",fontWeight:900,cursor:"pointer"}},"📲 Scan & Pay (+"+cbRwf.toLocaleString()+" RWF)")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(16,185,129,0.2)",color:"#34d399",fontSize:12,fontWeight:800}},msg)
  );
}
