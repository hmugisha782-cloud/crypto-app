import { useState, useEffect } from "react";
import { getWalletState, getLedgerTxs, recordSovereignTx } from "../utils/sovereignLedger.js";
import { getLiveMarketSnapshot } from "../utils/liveMarketStore.js";

export default function SovereignMasterWalletBar({ rates = {}, theme, panel }) {
  const [wallet, setWallet] = useState(getWalletState);
  const [txs, setTxs] = useState(getLedgerTxs);
  const [liveRwf, setLiveRwf] = useState(() => Number(rates?.RWF || getLiveMarketSnapshot().rwfRate || 1480));
  const [mode, setMode] = useState("DEPOSIT");
  const [amount, setAmount] = useState("250");
  const [rail, setRail] = useState("MTN MoMo Rwanda (+250)");
  const [recipient, setRecipient] = useState("+250 788 000 000");
  const [showLedger, setShowLedger] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const syncW = () => { setWallet(getWalletState()); setTxs(getLedgerTxs()); };
    const syncM = () => setLiveRwf(getLiveMarketSnapshot().rwfRate);
    window.addEventListener("kgt-wallet-updated", syncW);
    window.addEventListener("kgt-market-tick", syncM);
    return () => { window.removeEventListener("kgt-wallet-updated", syncW); window.removeEventListener("kgt-market-tick", syncM); };
  }, []);

  function runWallet() {
    const val = Math.max(1, Number(amount || 0));
    if (mode !== "DEPOSIT" && val > wallet.usd) {
      setToast(`⚠️ Insufficient balance ($${wallet.usd.toFixed(2)} USDT available).`);
      return;
    }
    const isCredit = mode === "DEPOSIT";
    const lbl = mode === "DEPOSIT" ? `Top-Up via ${rail}` : mode === "WITHDRAW" ? `Withdraw to ${rail} (${recipient})` : `P2P Send to ${recipient} (${rail})`;
    const { tx } = recordSovereignTx({ hub: "Sovereign Treasury", title: lbl, amountUsd: val, rwfRate: liveRwf, type: isCredit ? "CREDIT" : "DEBIT" });
    setToast(`✅ ${mode} [${tx.id}]: $${val.toFixed(2)} USD (${Math.round(val * liveRwf).toLocaleString()} RWF) · ${lbl}`);
  }

  function printReceipt(t) {
    const w = window.open("", "_blank", "width=480,height=580");
    if (!w) return;
    w.document.write(`<body style="font-family:sans-serif;padding:20px;background:#0f172a;color:#f8fafc;"><div style="border:2px solid #10b981;border-radius:12px;padding:18px;"><h2 style="color:#10b981;margin:0;">🇷🇼 KIGALI GLOBAL TRACKER</h2><p><strong>ID:</strong> ${t.id} · ${t.time}</p><p><strong>Hub:</strong> ${t.hub}</p><p><strong>Action:</strong> ${t.title}</p><h3 style="color:#34d399;">$${t.amountUsd.toFixed(2)} USD (${t.amountRwf.toLocaleString()} RWF)</h3></div></body>`);
    w.document.close();
    w.print();
  }

  function exportCsv() {
    const csv = "ID,Time,Hub,Title,Type,USD,RWF\n" + txs.map((t) => `"${t.id}","${t.time}","${t.hub}","${t.title.replace(/"/g, "'")}","${t.type}",${t.amountUsd},${t.amountRwf}`).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `KGT_Receipts_${Date.now()}.csv`;
    a.click();
  }

  return (
    <section id="sovereign-master-wallet-bar" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #10b981", background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(56,189,248,0.08))", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <strong style={{ fontSize: 15 }}>💳 Unified Sovereign Wallet, Cash-Out & P2P (1 USD = {liveRwf.toLocaleString()} RWF)</strong>
          <span style={{ display: "block", fontSize: 11.5, color: theme.muted }}>Connected across all 138 Sovereign Engines</span>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span style={{ padding: "5px 10px", borderRadius: 8, background: "rgba(16,185,129,0.2)", color: "#34d399", fontWeight: 900, fontSize: 12 }}>💵 ${wallet.usd.toLocaleString(undefined, { minimumFractionDigits: 2 })} USDT</span>
          <span style={{ padding: "5px 10px", borderRadius: 8, background: "rgba(56,189,248,0.2)", color: "#7dd3fc", fontWeight: 900, fontSize: 12 }}>🇷🇼 {Math.round(wallet.usd * liveRwf).toLocaleString()} RWF</span>
          <span style={{ padding: "5px 10px", borderRadius: 8, background: "rgba(245,158,11,0.2)", color: "#fbbf24", fontWeight: 900, fontSize: 12 }}>📈 +${wallet.totalYieldEarnedUsd.toLocaleString()} Yield</span>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }}>
          <option value="DEPOSIT">➕ Deposit</option>
          <option value="WITHDRAW">🏧 Withdraw</option>
          <option value="P2P">📲 P2P Send</option>
        </select>
        <select value={rail} onChange={(e) => setRail(e.target.value)} style={{ padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 700 }}>
          <option>MTN MoMo Rwanda (+250)</option>
          <option>Airtel Money Rwanda (+250)</option>
          <option>Bank of Kigali (BK)</option>
          <option>USDT (TRC20 / TON)</option>
        </select>
        {mode !== "DEPOSIT" && <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} style={{ width: 160, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />}
        <input type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: 95, padding: "7px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12, fontWeight: 800 }} />
        <button type="button" onClick={runWallet} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: mode === "DEPOSIT" ? "#10b981" : "#f59e0b", color: "#02131d", fontWeight: 900, fontSize: 12, cursor: "pointer" }}>Execute</button>
        <button type="button" onClick={() => setShowLedger((s) => !s)} style={{ padding: "7px 11px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontWeight: 800, fontSize: 12, cursor: "pointer" }}>🧾 Receipts ({txs.length})</button>
        <button type="button" onClick={exportCsv} style={{ padding: "7px 11px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: "#38bdf8", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>📥 CSV</button>
      </div>
      {toast && <div style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 11.5, fontWeight: 800 }}>{toast}</div>}
      {showLedger && (
        <div style={{ maxHeight: 200, overflowY: "auto", display: "grid", gap: 5, padding: 8, borderRadius: 8, background: theme.input, border: `1px solid ${theme.border}` }}>
          {txs.length === 0 ? <span style={{ fontSize: 12, color: theme.muted }}>No transactions yet.</span> : txs.map((t) => (
            <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11.5, padding: "4px 6px", borderBottom: `1px solid ${theme.border}` }}>
              <span><strong>[{t.id}]</strong> {t.hub}: {t.title}</span>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <strong style={{ color: t.type === "CREDIT" ? "#34d399" : "#fbbf24" }}>{t.type === "CREDIT" ? "+" : "-"}${t.amountUsd.toFixed(2)}</strong>
                <button type="button" onClick={() => printReceipt(t)} style={{ padding: "2px 7px", borderRadius: 5, border: `1px solid ${theme.border}`, background: "transparent", color: "#38bdf8", fontSize: 11, cursor: "pointer" }}>🖨️</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
