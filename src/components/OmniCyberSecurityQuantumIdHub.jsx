import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const CYBER_PILLARS = [
  "🪪 Zero-Knowledge Sovereign Digital ID & Passport",
  "🛡️ 24/7 AI Anti-Fraud & Crypto/MoMo Firewall",
  "🔐 Quantum Multi-Sig Inheritance & Family Vault",
  "📡 Sovereign DDoS Shield & Quantum Satellite DNS",
  "🔍 Real-Time Dark-Web & Wallet Threat Scanner",
  "🏦 Bank-Grade SOC-2 & ISO-27001 Compliance Guard",
  "🔑 Biometric Passkey & Hardware Key Recovery",
  "🌐 Encrypted Enterprise VPN & Zero-Trust Mesh"
];

const SECURITY_ZONES = ["Kigali Cyber SOC", "Gatsibo Node Guard", "Zurich Quantum Vault", "London FinTech SOC", "Nairobi EAC Shield", "Singapore Tier-4", "New York Fed-Guard", "Tokyo Optical Mesh"];

export default function OmniCyberSecurityQuantumIdHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [secMsg, setSecMsg] = useState("");

  const TOTAL_SHIELDS = 100000000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const shields = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_SHIELDS) {
      const id = ((idx + scanned - 1) % TOTAL_SHIELDS) + 1;
      scanned++;
      const p = CYBER_PILLARS[id % CYBER_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const zone = SECURITY_ZONES[(id * 47) % SECURITY_ZONES.length];
      const title = `${p} · ${zone} #${String(id).padStart(24, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const feeUsd = Number((9 + ((id * 137) % 390)).toFixed(2));
      out.push({ id, p, zone, title, feeUsd });
    }
    return out;
  }, [search, pillar, page]);

  function deployShield(item) {
    const cert = "QSEC-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🛡️ QUANTUM SHIELD DEPLOYED [${cert}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "CyberSecurityQuantumId", title: item.title || "CyberSecurityQuantumId Execution", amountUsd: _usdVal, rwfRate }); setSecMsg(`🛡️ QUANTUM SHIELD DEPLOYED [${cert}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-cyber-security-quantum-id-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #f43f5e", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🛡️ Sovereign Cybersecurity, AI Fraud Firewall & Quantum Digital ID Hub (100QD+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Deploy 24/7 AI fraud shields, zero-knowledge digital IDs, multi-sig inheritance vaults & DDoS guards in RWF/USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(244,63,94,0.18)", color: "#fb7185", fontWeight: 800, fontSize: 11 }}>
          100SX+ Active Shields · 100 Quattuordecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search security shields & digital IDs (e.g. Kigali, Gatsibo, Firewall, Vault, Passport)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign Cybersecurity & Digital ID Pillars (100SX+)</option>
          {CYBER_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_SHIELDS / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_SHIELDS / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_SHIELDS / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_SHIELDS / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {shields.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#fb7185", fontWeight: 800 }}>${item.feeUsd} USD ({Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => deployShield(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#f43f5e", color: "#fff", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🛡️ Deploy Shield
            </button>
          </div>
        ))}
      </div>

      {secMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{secMsg}</div>}
    </section>
  );
}
