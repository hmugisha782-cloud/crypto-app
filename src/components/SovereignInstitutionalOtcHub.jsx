import React,{useState} from "react";
import {OTC_BLOCKS,calcOtcRebate} from "../utils/sovereignInstitutionalOtc.js";
import {recordSovereignTx} from "../utils/sovereignLedger.js";
export default function SovereignInstitutionalOtcHub({rates={},theme,panel}){
  const [otcId,setOtcId]=useState(OTC_BLOCKS.at(0).id);
  const [usdAmt,setUsdAmt]=useState(500);
  const [msg,setMsg]=useState("");
  const rwf=Number(rates?.RWF||1480);
  const blk=OTC_BLOCKS.find(b=>b.id===otcId)||OTC_BLOCKS.at(0);
  const rebate=calcOtcRebate(usdAmt,blk.rebatePct);
  function settleOtc(){const v=Math.max(blk.minUsd,Number(usdAmt||0));const {tx}=recordSovereignTx({hub:"KGT Institutional OTC Desk",title:blk.pair+" ($"+v+")",amountUsd:v,rwfRate:rwf,type:"DEBIT"});setMsg("🏛️ OTC SETTLED ["+tx.id+"]: "+blk.pair+" · $"+v+" USD (+$"+rebate+" Cashback Rebate)!");}
  return React.createElement("section",{id:"sovereign-institutional-otc-hub",style:{...panel,marginBottom:18,borderTop:"4px solid #f59e0b",display:"grid",gap:10}},
    React.createElement("strong",{style:{fontSize:15}},"🏛️ KGT Institutional OTC Liquidity Desk & 999.9 Gold Bullion Vault"),
    React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}},
      React.createElement("select",{value:otcId,onChange:e=>setOtcId(e.target.value),style:{flex:1,minWidth:210,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text}},OTC_BLOCKS.map(b=>React.createElement("option",{key:b.id,value:b.id},b.pair+" (+"+b.rebatePct+"% Rebate)"))),
      React.createElement("input",{type:"number",min:50,value:usdAmt,onChange:e=>setUsdAmt(e.target.value),style:{width:85,padding:"6px 8px",borderRadius:7,border:"1px solid "+theme.border,background:theme.input,color:theme.text,fontWeight:800}}),
      React.createElement("button",{type:"button",onClick:settleOtc,style:{padding:"6px 12px",borderRadius:7,border:"none",background:"#f59e0b",color:"#02131d",fontWeight:900,cursor:"pointer"}},"🏛️ Settle OTC (+$"+rebate+")")
    ),
    msg&&React.createElement("div",{style:{padding:"6px 10px",borderRadius:8,background:"rgba(245,158,11,0.2)",color:"#fde68a",fontSize:12,fontWeight:800}},msg)
  );
}
