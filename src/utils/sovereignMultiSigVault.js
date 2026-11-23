export const ESCROW_TEMPLATES=[{id:"MS-01",name:"🔐 2-of-3 Corporate Multi-Sig Treasury (Kigali HQ)",feeUsd:2},{id:"MS-02",name:"🤝 Cross-Border Trade & Goods Delivery Escrow",feeUsd:5},{id:"MS-03",name:"🏗️ Real Estate & Construction Milestone Release Vault",feeUsd:10}];
export function calcEscrowRelease(usd,fee=2){return Math.max(0,Number((Number(usd||0)-Number(fee||0)).toFixed(2)));}
