import { useEffect, useState } from "react";

export default function EarnAndBetHub({ activeTab, setActiveTab, rates = {}, theme, panel }) {
  const [markets, setMarkets] = useState([]);
  const [liveSports, setLiveSports] = useState([]);
  const [traders, setTraders] = useState([]);
  const [giftCards, setGiftCards] = useState([]);
  const [rwaList, setRwaList] = useState([]);
  const [slips, setSlips] = useState([]);
  const [nations150, setNations150] = useState([]);
  const [nationSearch, setNationSearch] = useState("");
  const [nationPage, setNationPage] = useState(1);
  const [selectedBet, setSelectedBet] = useState(null);
  const [stakeRwf, setStakeRwf] = useState("5000");
  const [p2pRwf, setP2pRwf] = useState("50000");
  const [p2pProvider, setP2pProvider] = useState("MTN MoMo");
  const [remitRwf, setRemitRwf] = useState("100000");
  const [remitCorridor, setRemitCorridor] = useState("KES");
  const [remitRes, setRemitRes] = useState(null);
  const [vaultUsd, setVaultUsd] = useState("250");
  const [vaultDays, setVaultDays] = useState("90");
  const [loanUsd, setLoanUsd] = useState("500");
  const [utilRef, setUtilRef] = useState("0421984211");
  const [utilRwf, setUtilRwf] = useState("10000");
  const [cardUsd, setCardUsd] = useState("50");
  const [toastMsg, setToastMsg] = useState("");

  const token = typeof window !== "undefined" ? sessionStorage.getItem("kgt-auth-token") : null;
  const rwfRate = Number(rates?.RWF || 1380);

  useEffect(() => {
    fetch("/api/football150/top-150").then((r) => (r.ok ? r.json() : null)).then((d) => d && setNations150(d.nations || [])).catch(() => {});
    fetch("/api/football150/top-150").then((r) => (r.ok ? r.json() : null)).then((d) => d && setNations150(d.nations || [])).catch(() => {});
    fetch("/api/earnbet/markets").then((r) => (r.ok ? r.json() : null)).then((d) => d && setMarkets(d.events || [])).catch(() => {});
    fetch("/api/monetize/live-sports-feed").then((r) => (r.ok ? r.json() : null)).then((d) => d && setLiveSports(d.inPlay || [])).catch(() => {});
    fetch("/api/monetize/copy-traders").then((r) => (r.ok ? r.json() : null)).then((d) => d && setTraders(d.traders || [])).catch(() => {});
    fetch("/api/monetize/gift-cards").then((r) => (r.ok ? r.json() : null)).then((d) => d && setGiftCards(d.catalog || [])).catch(() => {});
    fetch("/api/monetize/fractional-rwa").then((r) => (r.ok ? r.json() : null)).then((d) => d && setRwaList(d.assets || [])).catch(() => {});
    if (token && activeTab === "earnbet") {
      fetch("/api/earnbet/slips", { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => d && setSlips(d.slips || []))
        .catch(() => {});
    }
  }, [activeTab, token]);

  const inp = { width: "100%", padding: "9px 11px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 13 };
  const btn = { padding: "9px 13px", borderRadius: 8, border: "none", background: "#06b6d4", color: "#02131d", fontWeight: 700, cursor: "pointer", fontSize: 12 };

  async function postAuth(url, body, onOk) {
    if (!token) { setToastMsg("Sign in under Accounts to save transactions in SQLite."); return; }
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(body) });
    if (r.ok) onOk(await r.json());
  }

  const submitBet = (e) => { e.preventDefault(); if (selectedBet) postAuth("/api/earnbet/place-bet", { category: selectedBet.category, eventTitle: selectedBet.match, pick: selectedBet.pick, odds: selectedBet.odds, stakeRwf: Number(stakeRwf) }, (d) => { setToastMsg(`Bet Slip Placed! Win: ${Number(d.potentialPayoutRwf).toLocaleString()} RWF`); setSelectedBet(null); }); };
  const createP2p = (e) => { e.preventDefault(); postAuth("/api/monetize/p2p-order", { side: "BUY", asset: "USDT", rwfAmount: Number(p2pRwf), provider: p2pProvider }, (d) => setToastMsg(`P2P Escrow ${d.id} locked via ${p2pProvider} (Fee: ${d.feeRwf} RWF).`)); };
  const openVault = (e) => { e.preventDefault(); postAuth("/api/monetize/savings-vault", { asset: "USDT", amountUsd: Number(vaultUsd), lockDays: Number(vaultDays) }, (d) => setToastMsg(`Vault ${d.id} active at ${d.apy}% APY ($${d.estimatedYearlyUsd}/yr).`)); };
  const payUtility = (e) => { e.preventDefault(); postAuth("/api/monetize/pay-utility", { serviceType: "EUCL CashPower", accountRef: utilRef, rwfAmount: Number(utilRwf) }, (d) => setToastMsg(`CashPower Paid! Meter Token: ${d.meterToken}`)); };
  const requestLoan = (e) => { e.preventDefault(); postAuth("/api/monetize/instant-loan", { collateralAsset: "BTC", collateralUsd: Number(loanUsd) }, (d) => setToastMsg(`Instant MoMo Loan: ${Number(d.borrowedRwf).toLocaleString()} RWF approved.`)); };
  const issueCard = (e) => { e.preventDefault(); postAuth("/api/monetize/virtual-card", { amountUsd: Number(cardUsd) }, (d) => setToastMsg(`Virtual Visa ${d.cardNumberMasked} issued with $${d.balanceUsd}!`)); };
  const placeBinary = (dir) => postAuth("/api/monetize/binary-15m", { asset: "BTC", direction: dir, stakeRwf: Number(stakeRwf) }, (d) => setToastMsg(`15m BTC ${dir} Option placed! Payout: ${Number(d.potentialPayoutRwf).toLocaleString()} RWF`));
  async function calcRemit(e) { e.preventDefault(); const r = await fetch("/api/monetize/eac-remittance", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ rwfAmount: Number(remitRwf), corridor: remitCorridor }) }); if (r.ok) setRemitRes(await r.json()); }

  return (
    <>
      <div style={{ position: "fixed", right: 14, bottom: 20, zIndex: 900, display: "flex", flexDirection: "column", gap: 7, background: "rgba(2, 6, 23, 0.94)", padding: 10, borderRadius: 14, border: "1px solid #06b6d4", boxShadow: "0 10px 28px rgba(0,0,0,0.5)" }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: "#06b6d4", textAlign: "center" }}>MONEY HUB (20)</div>
        <button type="button" onClick={() => setActiveTab("earnbet")} style={{ padding: "8px 11px", borderRadius: 8, border: "none", background: activeTab === "earnbet" ? "#10b981" : "#06b6d4", color: "#02131d", fontWeight: 800, fontSize: 11, cursor: "pointer" }}>🎰 Bet, P2P & Cards</button>
        <button type="button" onClick={() => setActiveTab("growth")} style={{ padding: "6px 11px", borderRadius: 8, border: "1px solid rgba(6,182,212,0.4)", background: "transparent", color: "#e2e8f0", fontWeight: 700, fontSize: 11, cursor: "pointer" }}>📱 MoMo & AI Bots</button>
        <button type="button" onClick={() => setActiveTab("institutional")} style={{ padding: "6px 11px", borderRadius: 8, border: "1px solid rgba(6,182,212,0.4)", background: "transparent", color: "#e2e8f0", fontWeight: 700, fontSize: 11, cursor: "pointer" }}>🏛️ Margin & DeFi</button>
      </div>

      {activeTab === "earnbet" && (
        <section style={{ display: "grid", gap: 18, marginBottom: 24 }}>
          <div style={{ ...panel, borderLeft: "4px solid #10b981" }}>
            <h2 style={{ marginTop: 0 }}>🎰 Complete Online Revenue, Betting & FinTech Commerce Suite (20 Engines)</h2>
            <p style={{ color: theme.muted, fontSize: 13, marginBottom: 0 }}>
              Live Sports & 15-Min Crypto Betting, P2P MoMo Escrow, EAC Remittance, Virtual Visa Cards, CashPower Crypto Pay, High-Yield Vaults & Instant Crypto Loans.
            </p>
          </div>
          
          {/* INSTANT UNIVERSAL GAME, COUNTRY & LEAGUE FINDER */}
          <div style={{ ...panel, border: "1px solid #06b6d4", display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
            <strong style={{ fontSize: 13, color: "#06b6d4" }}>🔍 Instant Finder (Games, Countries & Leagues):</strong>
            <input
              type="search"
              value={nationSearch}
              onChange={(e) => {
                setNationSearch(e.target.value);
                setNationPage(1);
                const el = document.getElementById("world-football-150");
                if (el && e.target.value.trim()) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
              }}
              placeholder="Type any country (Spain, England, Germany, Rwanda) or league (LaLiga, Championship, Bundesliga)..."
              style={{ ...inp, flex: "1 1 280px" }}
            />
            <button
              type="button"
              onClick={() => document.getElementById("world-football-150")?.scrollIntoView({ behavior: "smooth" })}
              style={btn}
            >
              🌍 Jump to 150 Nations
            </button>
          </div>

          {toastMsg && <div style={{ ...panel, border: "1px solid #10b981", color: "#10b981", fontWeight: 700, fontSize: 13 }}>{toastMsg}</div>}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 16 }}>
            <div style={{ ...panel, display: "grid", gap: 10 }}>
              <h3 style={{ margin: 0, fontSize: 15 }}>🔴 Live In-Play & Pre-Match Sports Odds</h3>
              {liveSports.map((g) => (
                <div key={g.id} style={{ padding: 10, borderRadius: 9, background: theme.input, border: `1px solid ${theme.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#10b981", fontWeight: 700 }}><span>● LIVE {g.minute} · {g.league}</span><span>Score: {g.score}</span></div>
                  <div style={{ fontWeight: 700, fontSize: 13, margin: "4px 0 6px" }}>{g.match}</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[["1", g.homeOdds], ["X", g.drawOdds], ["2", g.awayOdds]].map(([lbl, odd]) => (
                      <button key={lbl} type="button" onClick={() => setSelectedBet({ category: g.league, match: g.match, pick: lbl, odds: odd })} style={{ flex: 1, padding: "6px", borderRadius: 6, border: `1px solid ${theme.border}`, background: theme.card, color: theme.text, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{lbl} @ {odd}</button>
                    ))}
                  </div>
                </div>
              ))}
              {markets.map((m) => (
                <div key={m.id} style={{ padding: 10, borderRadius: 9, background: theme.input, border: `1px solid ${theme.border}` }}>
                  <div style={{ fontSize: 11, color: "#06b6d4", fontWeight: 700 }}>{m.category}</div>
                  <div style={{ fontWeight: 700, fontSize: 13, margin: "4px 0 6px" }}>{m.match}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {m.options.map((opt) => (
                      <button key={opt.label} type="button" onClick={() => setSelectedBet({ category: m.category, match: m.match, pick: opt.label, odds: opt.odds })} style={{ flex: 1, padding: "6px", borderRadius: 6, border: `1px solid ${theme.border}`, background: theme.card, color: theme.text, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{opt.label} @ {opt.odds}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
              <form onSubmit={submitBet} style={{ ...panel, display: "grid", gap: 10, borderTop: "3px solid #10b981" }}>
                <h3 style={{ margin: 0, fontSize: 15 }}>🎟️ Bet Slip & 15-Min BTC Binary Options</h3>
                {selectedBet ? <div style={{ padding: 9, borderRadius: 8, background: theme.input, fontSize: 12 }}><strong>{selectedBet.match}</strong> · Pick: <strong style={{ color: "#10b981" }}>{selectedBet.pick}</strong> (@{selectedBet.odds})</div> : <p style={{ fontSize: 12, color: theme.muted, margin: 0 }}>Select any odd on the left or trade 15-Min BTC Up/Down below.</p>}
                <input type="number" min="500" value={stakeRwf} onChange={(e) => setStakeRwf(e.target.value)} placeholder="Stake (RWF)" style={inp} />
                {selectedBet && <div style={{ fontSize: 13, fontWeight: 700, color: "#06b6d4" }}>Est. Payout: {Math.round(Number(stakeRwf || 0) * selectedBet.odds).toLocaleString()} RWF</div>}
                <button type="submit" disabled={!selectedBet} style={{ ...btn, background: "#10b981" }}>Place Sports Bet Slip</button>
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <button type="button" onClick={() => placeBinary("UP")} style={{ ...btn, flex: 1, background: "#10b981" }}>▲ BTC UP 15m (1.85x)</button>
                  <button type="button" onClick={() => placeBinary("DOWN")} style={{ ...btn, flex: 1, background: "#ef4444", color: "#fff" }}>▼ BTC DOWN 15m (1.85x)</button>
                </div>
              </form>
              <form onSubmit={createP2p} style={{ ...panel, display: "grid", gap: 8 }}>
                <h3 style={{ margin: 0, fontSize: 15 }}>🤝 P2P Escrow Marketplace (USDT ↔ MoMo)</h3>
                <input type="number" value={p2pRwf} onChange={(e) => setP2pRwf(e.target.value)} placeholder="Amount in RWF" style={inp} />
                <select value={p2pProvider} onChange={(e) => setP2pProvider(e.target.value)} style={inp}><option value="MTN MoMo">MTN MoMo Rwanda</option><option value="Airtel Money">Airtel Money Rwanda</option><option value="Bank of Kigali">Bank of Kigali Instant</option></select>
                <button type="submit" style={btn}>Lock Escrow & Buy {(Number(p2pRwf || 0) / rwfRate).toFixed(2)} USDT</button>
              </form>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            <form onSubmit={issueCard} style={{ ...panel, display: "grid", gap: 8 }}>
              <h3 style={{ margin: 0, fontSize: 15 }}>💳 Virtual USD Visa / Mastercard</h3>
              <input type="number" value={cardUsd} onChange={(e) => setCardUsd(e.target.value)} placeholder="Load Amount (USD)" style={inp} />
              <button type="submit" style={btn}>Issue Virtual Visa (${cardUsd})</button>
            </form>
            <form onSubmit={payUtility} style={{ ...panel, display: "grid", gap: 8 }}>
              <h3 style={{ margin: 0, fontSize: 15 }}>⚡ EUCL CashPower & Airtime with Crypto</h3>
              <input type="text" value={utilRef} onChange={(e) => setUtilRef(e.target.value)} placeholder="Meter / Phone Number" style={inp} />
              <input type="number" value={utilRwf} onChange={(e) => setUtilRwf(e.target.value)} placeholder="Amount (RWF)" style={inp} />
              <button type="submit" style={btn}>Pay with USDT Balance</button>
            </form>
            <form onSubmit={calcRemit} style={{ ...panel, display: "grid", gap: 8 }}>
              <h3 style={{ margin: 0, fontSize: 15 }}>🌍 East Africa Instant Remittance</h3>
              <input type="number" value={remitRwf} onChange={(e) => setRemitRwf(e.target.value)} placeholder="Send RWF" style={inp} />
              <select value={remitCorridor} onChange={(e) => setRemitCorridor(e.target.value)} style={inp}><option value="KES">Rwanda → Kenya (KES)</option><option value="UGX">Rwanda → Uganda (UGX)</option><option value="TZS">Rwanda → Tanzania (TZS)</option></select>
              <button type="submit" style={btn}>Calculate Cross-Border Payout</button>
              {remitRes && <div style={{ fontSize: 12, color: "#10b981", fontWeight: 700 }}>Recipient Gets: {remitRes.recipientGets.toLocaleString()} {remitRes.corridor}</div>}
            </form>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            <form onSubmit={openVault} style={{ ...panel, display: "grid", gap: 8 }}>
              <h3 style={{ margin: 0, fontSize: 15 }}>🏦 Fixed High-Yield Vaults (Up to 16% APY)</h3>
              <input type="number" value={vaultUsd} onChange={(e) => setVaultUsd(e.target.value)} placeholder="Deposit USDT" style={inp} />
              <select value={vaultDays} onChange={(e) => setVaultDays(e.target.value)} style={inp}><option value="30">30 Days Lock (10.5% APY)</option><option value="90">90 Days Lock (13.5% APY)</option><option value="180">180 Days Lock (16.0% APY)</option></select>
              <button type="submit" style={btn}>Start Earning Daily Yield</button>
            </form>
            <form onSubmit={requestLoan} style={{ ...panel, display: "grid", gap: 8 }}>
              <h3 style={{ margin: 0, fontSize: 15 }}>💸 Instant Crypto-Backed RWF Loan</h3>
              <input type="number" value={loanUsd} onChange={(e) => setLoanUsd(e.target.value)} placeholder="BTC Collateral (USD)" style={inp} />
              <button type="submit" style={btn}>Borrow {Math.round(Number(loanUsd || 0) * 0.6 * rwfRate).toLocaleString()} RWF Now</button>
            </form>
            <div style={{ ...panel, display: "grid", gap: 8 }}>
              <h3 style={{ margin: 0, fontSize: 15 }}>👥 AI Copy-Trading & Gift Cards</h3>
              {traders.map((t) => <div key={t.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "4px 0", borderBottom: `1px solid ${theme.border}` }}><strong>{t.name}</strong><span style={{ color: "#10b981" }}>+{t.monthlyRoiPct}%/mo</span></div>)}
              {giftCards.slice(0, 2).map((g) => <div key={g.brand} style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}><span>🎁 {g.brand}</span><strong>{g.priceRwf.toLocaleString()} RWF</strong></div>)}
              {rwaList.slice(0, 1).map((r) => <div key={r.symbol} style={{ fontSize: 11, color: "#06b6d4" }}>🥇 {r.name} · Min {r.minRwf.toLocaleString()} RWF</div>)}
            </div>
          </div>
          
          {/* TOP 150 WORLD FOOTBALL NATIONS & DIVISIONS 1, 2, 3 */}
          <div id="world-football-150" style={{ ...panel, borderTop: "3px solid #06b6d4" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 16 }}>🌍 All 150 World Football Nations & Every Tier/League (LaLiga, Premier League, Bundesliga, Serie A, Ligue 1, Rwanda & All 150)</h3>
                <p style={{ margin: "4px 0 0", fontSize: 12, color: theme.muted }}>
                  Search any country, rank (#1–#150), or division (e.g. Spain, LaLiga, England, Championship, League One, Germany, Bundesliga, Rwanda).
                </p>
              </div>
              <input
                type="search"
                value={nationSearch}
                onChange={(e) => { setNationSearch(e.target.value); setNationPage(1); }}
                placeholder="🔍 Search 150 Nations & Divisions (Spain, England, Germany, Rwanda)..."
                style={{ ...inp, maxWidth: 360, border: "1px solid #06b6d4" }}
              />
            </div>

            {(() => {
              const q = nationSearch.trim().toLowerCase();
              const filtered = nations150.filter((n) =>
                !q ||
                n.country.toLowerCase().includes(q) ||
                n.league.toLowerCase().includes(q) ||
                (n.competitions || []).some((c) => c.name.toLowerCase().includes(q)) ||
                String(n.rank) === q
              );
              const perPage = 12;
              const pages = Math.max(1, Math.ceil(filtered.length / perPage));
              const cur = Math.min(nationPage, pages);
              const slice = filtered.slice((cur - 1) * perPage, cur * perPage);

              return (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
                    {slice.map((n) => (
                      <div key={n.rank} style={{ padding: 12, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 7, alignContent: "start" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${theme.border}`, paddingBottom: 5 }}>
                          <strong style={{ color: "#06b6d4", fontSize: 14 }}>#{n.rank} {n.country}</strong>
                          <span style={{ fontSize: 11, color: n.rank <= 20 ? "#10b981" : theme.muted, fontWeight: 700 }}>
                            "All 4 Divisions & Cup"
                          </span>
                        </div>
                        {(n.competitions || []).map((comp) => (
                          <div key={comp.tier} style={{ padding: 7, borderRadius: 7, background: theme.card, border: `1px solid ${theme.border}`, display: "grid", gap: 4 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                              <strong style={{ color: comp.tier === 1 ? "#10b981" : theme.text }}>Div {comp.tier}: {comp.name}</strong>
                              <span style={{ color: theme.muted }}>{comp.type}</span>
                            </div>
                            <div style={{ fontSize: 11, color: theme.muted }}>{comp.fixture}</div>
                            <div style={{ display: "flex", gap: 4 }}>
                              {["1", "X", "2"].map((k) => (
                                <button
                                  key={k}
                                  type="button"
                                  onClick={() => setSelectedBet({ category: `#${n.rank} ${n.country} · ${comp.name}`, match: comp.fixture, pick: k, odds: comp.odds[k] })}
                                  style={{ flex: 1, padding: "4px", borderRadius: 5, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 10, fontWeight: 700, cursor: "pointer" }}
                                >
                                  {k} @ {comp.odds[k]}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, fontSize: 12 }}>
                    <span style={{ color: theme.muted }}>Showing {slice.length} of {filtered.length} nations (Page {cur}/{pages})</span>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button type="button" disabled={cur <= 1} onClick={() => setNationPage((p) => Math.max(1, p - 1))} style={btn}>‹ Prev 12</button>
                      <button type="button" disabled={cur >= pages} onClick={() => setNationPage((p) => Math.min(pages, p + 1))} style={btn}>Next 12 ›</button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>

          {slips.length > 0 && (
            <div style={panel}>
              <h3 style={{ marginTop: 0, fontSize: 15 }}>📜 Saved Bet & Binary Option Slips ({slips.length})</h3>
              {slips.map((s) => <div key={s.id} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${theme.border}`, fontSize: 12 }}><span><strong>{s.eventTitle}</strong> ({s.pick} @ {s.odds})</span><span>Stake: {Number(s.stakeRwf).toLocaleString()} RWF → <strong style={{ color: "#10b981" }}>Win: {Number(s.potentialPayoutRwf).toLocaleString()} RWF</strong></span></div>)}
            </div>
          )}
        </section>
      )}
    </>
  );
}
