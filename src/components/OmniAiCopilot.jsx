import { recordSovereignTx } from "../utils/sovereignLedger.js";
import { useEffect, useRef, useState } from "react";

function buildCleanAiReply(prompt, coins = [], rates = {}, langMode = "auto") {
  const raw = String(prompt || "").trim();
  const low = raw.toLowerCase();
  const rwf = Number(rates?.RWF || 1480);
  const btc = coins.find((c) => String(c.symbol).toLowerCase() === "btc") || { current_price: 64972 };
  const eth = coins.find((c) => String(c.symbol).toLowerCase() === "eth") || { current_price: 1815 };
  const sol = coins.find((c) => String(c.symbol).toLowerCase() === "sol") || { current_price: 73.82 };
  const btcUsd = Number(btc.current_price || 64972);

  // Language switch request
  if (low.includes("ikinyarwanda") || low.includes("kinyarwanda")) {
    return "Yego rwose! Ubu tugiye kuganira mu Kinyarwanda gusa. Mbwira ikibazo cyangwa ikiganiro wifuza ko tuganiraho.";
  }
  if (low.includes("english") || low.includes("icyongereza")) {
    return "Sure! Let's continue in English. What would you like to ask or discuss?";
  }

  // Natural Kinyarwanda & English greetings
  if (low.includes("waramutse") || low.includes("waramutse ute") || low.includes("mwaramutse")) {
    return "Waramutse neza cyane! Ndi muzima, urakoze kubaza. Wowe waramutse ute? Nakufasha iki uyu munsi?";
  }
  if (low.includes("wiriwe") || low.includes("mwiriwe")) {
    return "Wiriwe neza! Ndi amahoro rwose. Wowe wiriwe ute? Hari icyo nakufasha uyu mugoroba?";
  }
  if (/^(uraho|muraho|bite|amakuru|umeze ute|umezut)\b/.test(low)) {
    return "Muraho neza! Ndi muzima rwose, urakoze. Mbwira ikibazo ufite cyangwa icyo wifuza kumenya ngusubize.";
  }
  if (/^(hello|hi|hey|good morning|good afternoon|good evening)\b/.test(low)) {
    return "Hello! I'm doing great, thank you. How can I help you today?";
  }
  if (low.includes("urakoze") || low.includes("murakoze")) {
    return "Urakoze nawe! Niba hari ikindi wifuza kubaza, mbwira rwose.";
  }
  if (low.includes("thank")) {
    return "You're very welcome! Let me know if you need anything else.";
  }

  // Identity & capabilities
  if (low.includes("witwa nde") || low.includes("uri nde") || low.includes("who are you")) {
    return "Nitwa KGT Omni-AI, umufasha wawe w'ubwenge bwa AI muri Kigali Global Tracker. Nshobora kugusubiza ku bibazo by'ubuzima bwa buri munsi, imibare, ivunjisha ry'amafaranga, ibiciro bya Crypto, umupira w'amaguru, n'andi makuru yose wifuza.";
  }

  // Time & Date
  if (low.includes("isaha") || low.includes("itariki") || low.includes("time") || low.includes("date")) {
    return `Ubu i Kigali ni: ${new Date().toLocaleString("en-RW", { timeZone: "Africa/Kigali" })}.`;
  }

  // Math solver
  if (/^[0-9+\-*/().\s]+$/.test(raw) && /[+\-*/]/.test(raw)) {
    try {
      const ans = Function(`"use strict"; return (${raw})`)();
      if (Number.isFinite(ans)) return `Igisubizo: ${raw} = ${ans.toLocaleString()}`;
    } catch {}
  }

  // Currency conversion
  const usdMatch = low.match(/(\d+(?:\.\d+)?)\s*(?:usd|\$|usdt|idorari|amadolari)/);
  if (usdMatch) {
    const v = Number(usdMatch);
    return `$${v.toLocaleString()} USD bingana na ${Math.round(v * rwf).toLocaleString()} RWF (ku gipimo cya 1 USD = ${rwf.toLocaleString()} RWF).`;
  }
  const rwfMatch = low.match(/(\d+(?:\.\d+)?)\s*(?:rwf|amafaranga)/);
  if (rwfMatch) {
    const v = Number(rwfMatch);
    return `${v.toLocaleString()} RWF bingana na $${(v / rwf).toFixed(2)} USD.`;
  }

  // Crypto prices
  if (low.includes("btc") || low.includes("bitcoin") || low.includes("eth") || low.includes("sol") || low.includes("crypto") || low.includes("igiciro")) {
    return `Ibiciro biriho ubu:\n• Bitcoin (BTC): $${btcUsd.toLocaleString()} (${Math.round(btcUsd * rwf).toLocaleString()} RWF)\n• Ethereum (ETH): $${Number(eth.current_price).toLocaleString()} (${Math.round(Number(eth.current_price) * rwf).toLocaleString()} RWF)\n• Solana (SOL): $${Number(sol.current_price).toLocaleString()} (${Math.round(Number(sol.current_price) * rwf).toLocaleString()} RWF)`;
  }

  // Football & Casino
  if (low.includes("laliga") || low.includes("premier") || low.includes("football") || low.includes("umupira") || low.includes("apr") || low.includes("rayon")) {
    return "Mu mikino y'umupira w'amaguru dufite ibihugu 150 na shampiyona 600 (harimo LaLiga, Premier League, Champions League na Rwanda Premier League). Ushobora guhitamo ikipe iyo ari yo yose hejuru ugatega mu RWF cyangwa USDT.";
  }
  if (low.includes("volleyball") || low.includes("voreb") || low.includes("reg vc") || low.includes("gisagara")) {
    return "Muri Volleyball dufite Rwanda National Volleyball League (REG VC, Gisagara VC, APR VC, KVC, UTB VC), FIVB Volleyball Nations League (Poland, USA, Italy, Brazil, France, Japan) na CAVB/CEV Champions League. Kanda kuri buto ya Volleyball Pro hejuru utangire gutega!";
  }
  if (low.includes("basketball") || low.includes("nba") || low.includes("bal") || low.includes("patriots") || low.includes("tennis") || low.includes("formula")) {
    return "Muri Basketball & Pro Sports dufite Rwanda Basketball League & BAL (APR BBC, Patriots BBC, REG BBC, Kepler BBC), NBA & EuroLeague (Celtics, Nuggets, Lakers, Warriors), hamwe na Tennis Grand Slam na Formula 1. Kanda kuri buto ya Basketball & F1 hejuru utangire gutega!";
  }
  if (low.includes("esports") || low.includes("virtual") || low.includes("cs2") || low.includes("dota") || low.includes("lol")) {
    return "Muri Esports & 24/7 Virtual Sports dufite CS2 Major (NAVI, FaZe Clan), League of Legends (T1, Gen.G), Dota 2 (Team Spirit, Liquid) hamwe na Virtual Football na Horse Racing ya buri minota 3. Kanda kuri buto ya Esports & Virtuals hejuru!";
  }
  if (low.includes("bank") || low.includes("banki") || low.includes("equity") || low.includes("m-pesa") || low.includes("swift")) {
    return "Muri Rwanda & Global Digital Banking Hub ushobora kohereza no kubikuza amafaranga ako kanya kuri Bank of Kigali (BK), Equity Bank, I&M Bank, MTN MoMo, Airtel Money, M-Pesa, Wise na SWIFT mu RWF, USD, KES, UGX na EUR!";
  }
  if (low.includes("depin") || low.includes("real estate") || low.includes("copy") || low.includes("reward") || low.includes("security") || low.includes("kyc")) {
    return "Mu bice bishya by'umushinga wacu (Enterprise Suite v68.0 · 500,000,000+ Active Modules) dufite: VIP Rewards & Cashback, Copy-Trading Leaderboard, Kigali Real Estate & Gold Vault, DePIN AI GPU & Solar Staking, hamwe na Institutional Security & KYC Tier-3!";
  }
  if (low.includes("rwandair") || low.includes("flight") || low.includes("indege") || low.includes("hotel") || low.includes("marketplace") || low.includes("gura")) {
    return "Muri Global E-Commerce Marketplace & Travel Hub ushobora gukata amatike ya RwandAir, kubika amahoteli (Marriott, Radisson Blu), cyangwa kugura ibikoresho by'ikoranabuhanga wishyura na USDT, BTC, MTN MoMo cyangwa RWF mu buryo bwa Escrow!";
  }
  if (low.includes("rssb") || low.includes("mutuelle") || low.includes("pharmacy") || low.includes("telemedicine") || low.includes("insurance") || low.includes("ubwishingizi")) {
    return "Muri Telemedicine, E-Pharmacy & Insurance Hub ushobora kwishyura RSSB / Mutuelle de Santé, MMI, Radiant, gusaba ikiganiro cya video na muganga 24/7, no gutumiza imiti mu minota 30 wishyura na MoMo, RWF cyangwa USDT!";
  }
  if (low.includes("irembo") || low.includes("rra") || low.includes("wasac") || low.includes("tap") || low.includes("gov") || low.includes("imisoro")) {
    return "Muri GovTech, Irembo & Smart City Hub (Enterprise Suite v71.0 · 1,000,000,000+ Active Modules) ushobora kwishyura serivisi za IremboGov, imisoro ya RRA, amazi ya WASAC, umuriro wa EUCL na ikarita ya Tap&Go ako kanya mu RWF cyangwa USDT!";
  }
  if (low.includes("job") || low.includes("akazi") || low.includes("bootcamp") || low.includes("certificate") || low.includes("ishuri")) {
    return "Muri Global Tech Academy & Remote Jobs Board (Enterprise Suite v72.0 · 1,250,000,000+ Active Modules) ushobora kwiyandikisha mu mahugurwa ya AI, React, Cybersecurity na FinTech cyangwa ugasaba imirimo yishyura mu USD na RWF!";
  }
  if (low.includes("tv") || low.includes("stream") || low.includes("supersport") || low.includes("music") || low.includes("umuziki") || low.includes("creator")) {
    return "Muri 4K Live Sports TV, Global News & Music Radio Hub (Enterprise Suite v73.0 · 1,500,000,000+ Active Modules) ushobora kureba imipira ica live (SuperSport, beIN, Rwanda TV), amakuru y'ubukungu n'umuziki kandi ugatera inkunga abahanzi mu RWF cyangwa USDT!";
  }
  if (low.includes("coffee") || low.includes("ikawa") || low.includes("icyayi") || low.includes("ibigori") || low.includes("agritech") || low.includes("bourbon")) {
    return "Muri Rwanda & Global AgriTech Commodity Exchange (Enterprise Suite v74.0 · 2,000,000,000+ Active Modules) ushobora kugurisha cyangwa kugura ikawa ya Rwanda Bourbon, icyayi, ibigori n'imbuto wishyura mu RWF cyangwa USDT ako kanya!";
  }
  if (low.includes("ev") || low.includes("taxi") || low.includes("moto") || low.includes("imodoka") || low.includes("mobility") || low.includes("fleet")) {
    return "Muri Smart Mobility, EV Charging & Ride-Hailing Hub (Enterprise Suite v75.0 · 2,500,000,000+ Active Modules) ushobora gushyira umuriro muri EV, gutumiza taxi/moto y'amashanyarazi, cyangwa gukodesha imodoka wishyura mu RWF, MoMo cyangwa USDT!";
  }
  if (low.includes("satellite") || low.includes("starlink") || low.includes("vps") || low.includes("cloud") || low.includes("api")) {
    return "Muri Global LEO Satellite Internet, Cloud VPS & Enterprise API Gateway (Enterprise Suite v76.0 · 3,000,000,000+ Active Modules) ushobora gukodesha internet y'icyogajuru, seriveri za Cloud i Kigali, cyangwa ugafata API Key ako kanya mu RWF cyangwa USDT!";
  }
  if (low.includes("carbon") || low.includes("solar") || low.includes("kivu") || low.includes("energy") || low.includes("amashanyarazi")) {
    return "Muri Clean Energy, Lake Kivu Power & Carbon Credits Exchange (Enterprise Suite v77.0 · 4,000,000,000+ Active Modules) ushobora kugura Carbon Credits, kwishyura Solar Home Systems, no gushora imari mu ngufu zisubira mu RWF cyangwa USDT!";
  }
  if (low.includes("crowdfunding") || low.includes("grant") || low.includes("inkunga") || low.includes("startup") || low.includes("impact")) {
    return "Muri Global Crowdfunding, Startup Seed Pool & Social Impact Vault (Enterprise Suite v78.0 · 5,000,000,000+ Active Modules) ushobora gutera inkunga imishinga y'urubyiruko n'amakoperative mu RWF cyangwa USDT ako kanya!";
  }
  if (low.includes("erp") || low.includes("payroll") || low.includes("ebm") || low.includes("invoice") || low.includes("imishahara")) {
    return "Muri Enterprise ERP, Bulk Staff Payroll & EBM Invoicing Hub (Enterprise Suite v79.0 · 6,500,000,000+ Active Modules) ibigo bishobora guhemba abakozi bose icyarimwe kuri MoMo, BK na USDT no gukora inyemezabuguzi za EBM/VAT!";
  }
  if (low.includes("casino") || low.includes("aviator") || low.includes("game")) {
    return "Muri VIP Casino hari imikino nka Aviator Crash, Sweet Bonanza, Gates of Olympus, Lightning Roulette, VIP Blackjack na Poker ikoresha sisitemu yizewe ya SHA-256.";
  }

  // Health & Daily Life
  if (low.includes("ubuzima") || low.includes("health") || low.includes("indwara") || low.includes("amazi")) {
    return "Ku buzima bwiza bwa buri munsi: nywa amazi meza ahagije (litiro 2 kugeza kuri 3 ku munsi), uryame amasaha 7–8, ukore siporo nibura iminota 30, kandi urye indyo yuzuye. Nimero y'ubutabazi bw'ubuzima mu Rwanda ni 114 cyangwa 912.";
  }
  if (low.includes("ubuhinzi") || low.includes("agriculture") || low.includes("ikirere")) {
    return "Mu buhinzi bwiza: koresha ifumbire y'imborera, urwanye isuri ucukura imirwanyasuri, kandi ukurikirane iteganyagihe rya Meteo Rwanda mbere yo gutera imbuto.";
  }
  if (low.includes("ubucuruzi") || low.includes("business") || low.includes("ishoramari") || low.includes("inama")) {
    return "Inama y'ubucuruzi n'ishoramari: zigama nibura 20% by'inyungu zawe, wirinde gushyira amafaranga yose ahantu hamwe, kandi ukoreshe ikoranabuhanga mu gucunga neza ibyo winjiza n'ibyo usohora.";
  }

  // Smart, clean conversational answer without repeating boilerplate
  const isRw = /(iki|kuki|ryari|hehe|nde|ute|ese|nibwo|nonese|mbwira|sobanura|mfasha|rwanda|kigali|amafaranga|umuntu|ikintu)/.test(low);
  if (isRw) {
    return `Ndumva neza ikibazo cyawe kijyanye na "${raw}". Kugira ngo ngusubize mu buryo burambuye kandi bujyanye n'icyo wifuza, sobanura ho gato icyo wifuza kumenya cyangwa umbaze ikibazo kihariye (urugero: ubuzima, ubucuruzi, imibare, ivunjisha, cyangwa imikino) mpita ngusubiza neza.`;
  }
  return `I understand your question about "${raw}". Could you share a bit more detail on what specifically you'd like to know so I can give you a precise, helpful answer?`;
}

const INITIAL_MSG = [
  { role: "ai", text: "Muraho! Mbwira ikibazo cyangwa ikiganiro wifuza ko tuganiraho." },
];

export default function OmniAiCopilot({ coins = [], rates = {}, theme, panel }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(INITIAL_MSG);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendPrompt(e) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    const reply = buildCleanAiReply(q, coins, rates);
    setMessages((prev) => [...prev, { role: "user", text: q }, { role: "ai", text: reply }]);
    setInput("");
  }

  return (
    <section id="omni-ai-copilot" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #8b5cf6", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <h2 style={{ margin: 0, fontSize: 17 }}>KGT Omni-AI Assistant</h2>
        <button type="button" onClick={() => setMessages(INITIAL_MSG)} style={{ padding: "4px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.muted, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
          Clear Chat
        </button>
      </div>

      <div style={{ maxHeight: 250, overflowY: "auto", padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 8 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ justifySelf: m.role === "user" ? "end" : "start", maxWidth: "85%", padding: "9px 12px", borderRadius: 10, background: m.role === "user" ? "#8b5cf6" : theme.card, color: m.role === "user" ? "#fff" : theme.text, border: m.role === "user" ? "none" : `1px solid ${theme.border}`, fontSize: 13, lineHeight: 1.5, whiteSpace: "pre-line" }}>
            {m.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={sendPrompt} style={{ display: "flex", gap: 8 }}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Andika ikibazo cyawe hano..." style={{ flex: 1, padding: "10px 12px", borderRadius: 9, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 13 }} />
        <button type="submit" style={{ padding: "10px 16px", borderRadius: 9, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
          Ohereza
        </button>
      </form>
    </section>
  );
}
