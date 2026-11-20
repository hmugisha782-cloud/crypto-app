import { useState } from "react";
import { recordSovereignTx } from "../utils/sovereignLedger.js";

const NFTS = [
  { id: "NFT-01", title: "🦍 Virunga Silverback Sovereign Pass #001", artist: "Kigali Digital Guild", priceUsd: 120, perk: "VIP Gorilla Trek & Airport Lounge" },
  { id: "NFT-02", title: "🎨 Imigongo Royal Geometric Genesis #014", artist: "Eastern Province Creators", priceUsd: 45, perk: "12% Royalty Share + Museum Pass" },
  { id: "NFT-03", title: "🥁 Intore Heritage Rhythm Audio-NFT #088", artist: "Rwanda Cultural Collective", priceUsd: 30, perk: "BK Arena Backstage & Streaming Share" },
  { id: "NFT-04", title: "🏙️ Kigali Convention Dome 3D Twin #007", artist: "Kigali Metaverse Studio", priceUsd: 250, perk: "Virtual Land & Event Ad Revenue" },
];

export default function SovereignNftCulturalVault({ rates = {}, theme, panel }) {
  const [nftMsg, setNftMsg] = useState("");
  const rwfRate = Number(rates?.RWF || 1480);

  function mintNft(item) {
    const { tx } = recordSovereignTx({
      hub: "Sovereign NFT Gallery",
      title: `Minted ${item.title}`,
      amountUsd: item.priceUsd,
      rwfRate,
      type: "DEBIT",
    });
    setNftMsg(`🖼️ NFT MINTED ON-CHAIN [${tx.id}]: ${item.title} · Paid $${item.priceUsd} USD (${Math.round(item.priceUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="sovereign-nft-cultural-vault" style={{ ...panel, marginBottom: 18, borderTop: "4px solid #8b5cf6", display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <strong style={{ fontSize: 15.5 }}>🖼️ Rwandan Cultural Heritage, Imigongo & Virunga VIP NFT Marketplace</strong>
        <span style={{ fontSize: 11, color: "#c4b5fd", fontWeight: 800 }}>Zero-Gas Sovereign Minting</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {NFTS.map((n) => (
          <div key={n.id} style={{ padding: 10, borderRadius: 10, background: theme.input, border: `1px solid ${theme.border}`, display: "grid", gap: 4 }}>
            <strong style={{ fontSize: 12 }}>{n.title}</strong>
            <span style={{ fontSize: 10.5, color: theme.muted }}>By {n.artist} · {n.perk}</span>
            <span style={{ fontSize: 11, color: "#c4b5fd", fontWeight: 800 }}>${n.priceUsd} USD ({Math.round(n.priceUsd * rwfRate).toLocaleString()} RWF)</span>
            <button type="button" onClick={() => mintNft(n)} style={{ padding: "5px 9px", borderRadius: 7, border: "none", background: "#8b5cf6", color: "#fff", fontWeight: 800, fontSize: 11, cursor: "pointer", justifySelf: "start" }}>
              🖼️ Mint / Collect NFT
            </button>
          </div>
        ))}
      </div>
      {nftMsg && <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(16,185,129,0.2)", border: "1px solid #10b981", color: "#34d399", fontSize: 12, fontWeight: 800 }}>{nftMsg}</div>}
    </section>
  );
}
