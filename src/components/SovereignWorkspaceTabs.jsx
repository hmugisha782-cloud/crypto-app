import { useState, useEffect } from "react";

const TABS = [
  { id: "ALL", label: "🌐 All 138 Engines", match: "" },
  { id: "BANK", label: "💳 Banking, Wallet, P2P & Loans", match: "wallet|p2p|loan|card|escrow|pay|pos|bond|savings|bill|swift|subaccount|iban|subscription|otc" },
  { id: "TRADE", label: "📈 Pro Trading, Charts & Risk", match: "spot|chart|orderbook|staking|dca|copy|amm|bridge|limit|pnl|whale|options|rebalance|reserves|margin" },
  { id: "RWANDA", label: "🇷🇼 Rwanda Gov, Tax, RSSB & Agro", match: "rwanda|ebm|gatsibo|kigali|rse|utilities|kyc|credit|land|telecom|health|solar|agri|transport|diaspora|ecommerce|rssb|rdb" },
  { id: "AIWEB3", label: "🤖 AI Copilot, Security & Global Hubs", match: "ai|security|dao|nft|carbon|voice|academy|cold|will|fraud|auditor|webhook|backup|omni-" },
];

export default function SovereignWorkspaceTabs({ theme, panel }) {
  const [active, setActive] = useState("ALL");
  const [findText, setFindText] = useState("");
  const [visibleCount, setVisibleCount] = useState(138);

  useEffect(() => {
    const rule = TABS.find((t) => t.id === active);
    const q = findText.trim().toLowerCase();
    const sections = document.querySelectorAll("section[id]");
    let shown = 0;

    sections.forEach((sec) => {
      const id = sec.id.toLowerCase();
      if (id.includes("workspace") || id.includes("language") || id.includes("directory") || id.includes("wallet-bar")) {
        sec.style.display = "";
        return;
      }
      const catOk = !rule || rule.id === "ALL" || new RegExp(rule.match, "i").test(id);
      const txtOk = !q || id.includes(q) || (sec.textContent || "").toLowerCase().includes(q);
      if (catOk && txtOk) {
        sec.style.display = "";
        shown++;
      } else {
        sec.style.display = "none";
      }
    });
    setVisibleCount(shown);
  }, [active, findText]);

  return (
    <section id="sovereign-workspace-tabs" style={{ ...panel, marginBottom: 14, borderTop: "3px solid #38bdf8", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <strong style={{ fontSize: 13.5 }}>🗂️ Pro Workspace Filter & Live Search ({visibleCount} Visible Engines)</strong>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <input
            type="text"
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            placeholder="Instant filter (e.g. Gatsibo, Gold, EBM, Loan, RwandAir)..."
            style={{ width: 250, padding: "6px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }}
          />
          {findText && (
            <button type="button" onClick={() => setFindText("")} style={{ padding: "6px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: "#f87171", fontSize: 11.5, fontWeight: 800, cursor: "pointer" }}>
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            style={{
              padding: "6px 11px",
              borderRadius: 999,
              border: active === t.id ? "1px solid #38bdf8" : `1px solid ${theme.border}`,
              background: active === t.id ? "#38bdf8" : theme.input,
              color: active === t.id ? "#02131d" : theme.text,
              fontSize: 11.5,
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
    </section>
  );
}
