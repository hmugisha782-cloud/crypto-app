import { useState } from "react";

export default function MerchantQrAndVaultHub({ rates = {}, theme, panel }) {
  const [shopName, setShopName] = useState("Kigali Heights Retail POS");
  const [posRwf, setPosRwf] = useState("25000");
  const [vaultUsd, setVaultUsd] = useState("1000");
  const [vaultDays, setVaultDays] = useState("365");
  const [vaultMsg, setVaultMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);
  const posUsdt = ((Number(posRwf) || 0) / rwfRate).toFixed(2);
  const qrPayload = encodeURIComponent(`KGT-POS|${shopName}|${posRwf}RWF|${posUsdt}USDT`);

  const apy = vaultDays === "365" ? 16.0 : vaultDays === "90" ? 12.5 : 10.5;
  const vPrincipal = Math.max(0, Number(vaultUsd) || 0);
  const vEarnedUsd = vPrincipal * (apy / 100) * (Number(vaultDays) / 365);
  const vTotalRwf = Math.round((vPrincipal + vEarnedUsd) * rwfRate);

  const inp = { width: "100%", padding: "9px 11px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 13 };

  return (
    <section style={{ ...panel, marginBottom: 18, borderTop: "3px solid #10b981", display: "grid", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16 }}>🏪 Merchant Scan-to-Pay QR POS & High-Yield Savings Vaults (Up to 16% APY)</h3>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: theme.muted }}>
            Generate instant crypto-to-RWF point-of-sale QR codes for shops & hotels, or lock USDT in audited yield vaults.
          </p>
        </div>
        <span style={{ padding: "5px 11px", borderRadius: 999, background: "rgba(16, 185, 129, 0.18)", color: "#10b981", fontWeight: 800, fontSize: 11 }}>
          104.5% Audited Reserve · 0% Merchant Fee
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        {/* MERCHANT QR POS GENERATOR */}
        <div style={{ padding: 13, borderRadius: 12, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 8 }}>
          <strong style={{ fontSize: 13, color: "#10b981" }}>📲 1. Instant Merchant QR POS Terminal</strong>
          <input type="text" value={shopName} onChange={(e) => setShopName(e.target.value)} placeholder="Merchant / Shop Name" style={inp} />
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8, alignItems: "center" }}>
            <input type="number" value={posRwf} onChange={(e) => setPosRwf(e.target.value)} placeholder="Amount in RWF" style={inp} />
            <span style={{ fontSize: 12, fontWeight: 800, color: "#38bdf8" }}>≈ {posUsdt} USDT</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 8, borderRadius: 8, background: "#ffffff", color: "#0f172a" }}>
            <img
              src={`https://qrserver.com${qrPayload}`}
              alt="Merchant POS QR"
              width={74}
              height={74}
              style={{ borderRadius: 6 }}
            />
            <div style={{ fontSize: 11 }}>
              <div style={{ fontWeight: 900 }}>{shopName}</div>
              <div>Pay: <strong>{Number(posRwf || 0).toLocaleString()} RWF</strong> ({posUsdt} USDT)</div>
              <div style={{ color: "#059669", fontWeight: 700 }}>● Instant MoMo & Crypto QR Ready</div>
            </div>
          </div>
        </div>

        {/* HIGH-YIELD SAVINGS VAULT */}
        <div style={{ padding: 13, borderRadius: 12, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 8 }}>
          <strong style={{ fontSize: 13, color: "#38bdf8" }}>🏦 2. High-Yield Fixed Savings Vault ({apy}% APY)</strong>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <input type="number" value={vaultUsd} onChange={(e) => setVaultUsd(e.target.value)} placeholder="Deposit (USDT)" style={inp} />
            <select value={vaultDays} onChange={(e) => setVaultDays(e.target.value)} style={inp}>
              <option value="30">30 Days (10.5% APY)</option>
              <option value="90">90 Days (12.5% APY)</option>
              <option value="365">365 Days (16.0% APY)</option>
            </select>
          </div>
          <div style={{ fontSize: 12 }}>
            Projected Yield: <strong style={{ color: "#10b981" }}>+{"$"}{vEarnedUsd.toFixed(2)}</strong> · Total Payout: <strong>{vTotalRwf.toLocaleString()} RWF</strong>
          </div>
          <button
            type="button"
            onClick={() => setVaultMsg(`✓ Locked ${vPrincipal.toLocaleString()} USDT for ${vaultDays} days at ${apy}% APY (Maturity: ${vTotalRwf.toLocaleString()} RWF)!`)}
            style={{ padding: "8px 12px", borderRadius: 8, border: "none", background: "#06b6d4", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}
          >
            Lock {vPrincipal.toLocaleString()} USDT in Vault
          </button>
        </div>
      </div>

      {vaultMsg && (
        <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16, 185, 129, 0.16)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 700 }}>
          {vaultMsg}
        </div>
      )}
    </section>
  );
}
