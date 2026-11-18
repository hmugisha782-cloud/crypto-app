import { useEffect, useState } from "react";

export default function EnterpriseScale25k({ theme, panel }) {
  const [cat, setCat] = useState("ALL");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ totalAll: 225420, totalMatches: 225420, page: 1, totalPages: 9393, categories: ["ALL"], items: [] });

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`/api/telemetry/cards-25k?cat=${encodeURIComponent(cat)}&q=${encodeURIComponent(q)}&page=${page}&limit=24`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setData(d))
      .catch(() => {});
    return () => ctrl.abort();
  }, [cat, q, page]);

  return (
    <section style={{ marginTop: 24, marginBottom: 24 }}>
      <div style={{ ...panel, marginBottom: 14, borderTop: "3px solid #10b981" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div>
            <h2 style={{ margin: "0 0 4px", fontSize: 18 }}>🚀 Enterprise Deep Telemetry Grid ({data.totalAll.toLocaleString()} Indexed Modules)</h2>
            <p style={{ margin: 0, fontSize: 12, color: theme.muted }}>
              Ultra-fast server-indexed analytics covering Kigali FinTech, 150 Football Nations, Provably Fair Casino, DeFi Alpha, AI Quant & WebRTC Nodes.
            </p>
          </div>
          <span style={{ padding: "6px 12px", borderRadius: 999, background: "rgba(16, 185, 129, 0.15)", color: "#10b981", fontWeight: 800, fontSize: 12 }}>
            {data.totalMatches.toLocaleString()} Matches · Page {data.page}/{data.totalPages.toLocaleString()}
          </span>
        </div>

        <input
          type="search"
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
          placeholder="Search across 225,420+ indexed enterprise telemetry nodes (e.g. Node #500, Kigali, Football, Casino, DeFi, WebRTC)..."
          style={{ width: "100%", padding: "10px 14px", borderRadius: 9, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 13, marginTop: 12 }}
        />

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
          {(data.categories || ["ALL"]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => { setCat(c); setPage(1); }}
              style={{
                padding: "5px 10px",
                borderRadius: 999,
                border: `1px solid ${cat === c ? "#10b981" : theme.border}`,
                background: cat === c ? "#10b981" : theme.input,
                color: cat === c ? "#02131d" : theme.muted,
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 12 }}>
        {(data.items || []).map((card) => (
          <div key={card.id} style={{ ...panel, padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 7 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: theme.muted, textTransform: "uppercase" }}>{card.icon} {card.cat}</span>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>{card.delta}</span>
            </div>
            <div>
              <div style={{ fontSize: 12, color: theme.muted, marginBottom: 3 }}>{card.title}</div>
              <div style={{ fontSize: 17, fontWeight: 800 }}>{card.value}</div>
            </div>
            <div style={{ fontSize: 11, color: theme.muted, borderTop: `1px solid ${theme.border}`, paddingTop: 5 }}>{card.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, flexWrap: "wrap", gap: 10 }}>
        <span style={{ fontSize: 12, color: theme.muted }}>
          Page {data.page.toLocaleString()} of {data.totalPages.toLocaleString()} ({data.totalMatches.toLocaleString()} total nodes)
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          <button type="button" disabled={data.page <= 1} onClick={() => setPage(1)} style={{ padding: "7px 11px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer" }}>« First</button>
          <button type="button" disabled={data.page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "7px 11px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer" }}>‹ Prev</button>
          <button type="button" disabled={data.page >= data.totalPages} onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))} style={{ padding: "7px 11px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer" }}>Next ›</button>
          <button type="button" disabled={data.page >= data.totalPages} onClick={() => setPage(data.totalPages)} style={{ padding: "7px 11px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, cursor: "pointer" }}>Last »</button>
        </div>
      </div>
    </section>
  );
}
