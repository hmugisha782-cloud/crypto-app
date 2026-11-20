import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useState, useMemo } from "react";

const GOVTECH_PILLARS = [
  "🪪 Irembo 2.0 E-Passport, NID & Civil Express",
  "🗺️ Blockchain UPI Land Title & Cadastre Transfer",
  "🗳️ Zero-Knowledge Cryptographic E-Voting Ballot",
  "🏙️ Smart-City Construction & Trade Permit",
  "🚗 RNP Motor Inspection & Traffic Fine Auto-Pay",
  "📜 RDB Business Certificate & Apostille Stamp",
  "🎓 REB / HEC Academic Equivalence & Transcript",
  "🌍 Diplomatic Consular & Visa Fast-Track Pass"
];

const DISTRICTS = ["Kigali City", "Gatsibo District", "Musanze District", "Rubavu District", "Huye District", "Bugesera Hub", "Kayonza Hub", "Rusizi Hub"];

export default function OmniGovTechIremboHub({ rates = {}, theme, panel }) {
  const [search, setSearch] = useState("");
  const [pillar, setPillar] = useState("ALL");
  const [page, setPage] = useState(1);
  const [govMsg, setGovMsg] = useState("");

  const TOTAL_GOV = 1000000000000000000000000;
  const PAGE_SIZE = 24;
  const rwfRate = Number(rates?.RWF || 1480);

  const services = useMemo(() => {
    const out = [];
    const q = search.trim().toLowerCase();
    let idx = (page - 1) * PAGE_SIZE + 1;
    let scanned = 0;
    while (out.length < PAGE_SIZE && scanned < TOTAL_GOV) {
      const id = ((idx + scanned - 1) % TOTAL_GOV) + 1;
      scanned++;
      const p = GOVTECH_PILLARS[id % GOVTECH_PILLARS.length];
      if (pillar !== "ALL" && p !== pillar) continue;
      const dist = DISTRICTS[(id * 53) % DISTRICTS.length];
      const title = `${p} · ${dist} #${String(id).padStart(25, "0")}`;
      if (q && !title.toLowerCase().includes(q) && !String(id).includes(q)) continue;
      const feeUsd = Number((4 + ((id * 149) % 295)).toFixed(2));
      out.push({ id, p, dist, title, feeUsd });
    }
    return out;
  }, [search, pillar, page]);

  function processGovService(item) {
    const ref = "IRM-" + Math.floor(100000 + Math.random() * 900000);
    const _amtMatch = (`🏛️ GOVTECH CERTIFICATE ISSUED [${ref}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)!`).match(/\$([0-9]+(?:\.[0-9]+)?)/); const _usdVal = _amtMatch ? Number(_amtMatch[1]) : 25; const _rec = recordSovereignTx({ hub: "GovTechIrembo", title: item.title || "GovTechIrembo Execution", amountUsd: _usdVal, rwfRate }); setGovMsg(`🏛️ GOVTECH CERTIFICATE ISSUED [${ref}]: ${item.title} · Paid $${item.feeUsd} USD (${Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)! · Wallet Bal: $${_rec.wallet.usd.toLocaleString()} USDT`);
  }

  return (
    <section id="omni-govtech-irembo-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #3b82f6", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>🏛️ Sovereign GovTech, Irembo 2.0, Blockchain Land Title & E-Voting Hub (1QND+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Process Irembo passports, verify UPI land titles, cast encrypted e-votes & issue Gatsibo/Kigali permits in RWF/USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(59,130,246,0.18)", color: "#60a5fa", fontWeight: 800, fontSize: 11 }}>
          1SP+ Citizen Nodes · 1 Quindecillion+ Modules
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search Irembo, land titles & permits (e.g. Gatsibo, Kigali, Passport, Land, Voting)..."
          style={{ flex: 2, minWidth: 220, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
        />
        <select value={pillar} onChange={(e) => { setPillar(e.target.value); setPage(1); }} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option value="ALL">All 8 Sovereign GovTech & Irembo Pillars (1SP+)</option>
          {GOVTECH_PILLARS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>◀ Prev</button>
          <span style={{ fontSize: 11.5, fontWeight: 800 }}>Page {page} / {(Math.ceil(TOTAL_GOV / PAGE_SIZE) > 1e15 ? Math.ceil(TOTAL_GOV / PAGE_SIZE).toExponential(2).replace("e+", " × 10^") : Math.ceil(TOTAL_GOV / PAGE_SIZE).toLocaleString())}</span>
          <button type="button" onClick={() => setPage((p) => (p < Math.ceil(TOTAL_GOV / PAGE_SIZE) ? p + 1 : 1))} style={{ padding: "7px 11px", borderRadius: 7, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer", fontWeight: 800 }}>Next ▶</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {services.map((item) => (
          <div key={item.id} style={{ padding: 10, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.input, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 11.5 }}>{item.title}</strong>
            <span style={{ fontSize: 11, color: "#60a5fa", fontWeight: 800 }}>${item.feeUsd} USD ({Math.round(item.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => processGovService(item)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#3b82f6", color: "#fff", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🏛️ Issue & Verify
            </button>
          </div>
        ))}
      </div>

      {govMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{govMsg}</div>}
    </section>
  );
}
