import { useEffect, useState } from "react";

export default function FearGreedIndex({ activeTab, theme, panel }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (activeTab !== "sentiment") return;

    const controller = new AbortController();

    async function loadIndex() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          "https://api.alternative.me/fng/?limit=1&format=json",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to load market sentiment.");
        }

        const json = await response.json();
        const item = json.data?.[0];

        if (!item || !Number.isFinite(Number(item.value))) {
          throw new Error("The API returned invalid data.");
        }

        setResult({
          value: Number(item.value),
          classification: item.value_classification,
          timestamp: item.timestamp,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Could not load the index. Check your internet and try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadIndex();

    return () => controller.abort();
  }, [activeTab, refreshKey]);

  if (activeTab !== "sentiment") return null;

  const score = result?.value ?? 0;

  const scoreColor =
    score <= 24 ? "#ef4444" :
    score <= 44 ? "#f97316" :
    score <= 55 ? "#eab308" :
    score <= 74 ? "#84cc16" :
    "#22c55e";

  return (
    <section style={{ ...panel, marginBottom: 22 }}>
      <h2 style={{ margin: "0 0 8px", fontSize: 22 }}>
        Fear &amp; Greed Index
      </h2>

      <p style={{ color: theme.muted, fontSize: 13, lineHeight: 1.7 }}>
        Understand the overall sentiment of the cryptocurrency market.
        The index ranges from 0 (extreme fear) to 100 (extreme greed).
      </p>

      {loading && (
        <p style={{ color: theme.muted }}>Loading market sentiment...</p>
      )}

      {error && (
        <div>
          <p style={{ color: "#ef4444" }}>{error}</p>
          <button
            type="button"
            onClick={() => setRefreshKey((value) => value + 1)}
            style={{ cursor: "pointer", padding: "9px 14px" }}
          >
            Try again
          </button>
        </div>
      )}

      {result && !error && (
        <div style={{ textAlign: "center", padding: "18px 0" }}>
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              border: `10px solid ${scoreColor}`,
              margin: "0 auto 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
            }}
          >
            <strong style={{ fontSize: 36, color: scoreColor }}>
              {result.value}
            </strong>
            <span style={{ color: theme.muted, fontSize: 12 }}>/ 100</span>
          </div>

          <h3 style={{ margin: "0 0 12px", color: scoreColor }}>
            {result.classification}
          </h3>

          <div
            style={{
              height: 10,
              background: theme.border,
              borderRadius: 20,
              overflow: "hidden",
              margin: "0 auto",
              maxWidth: 420,
            }}
          >
            <div
              style={{
                width: `${result.value}%`,
                height: "100%",
                background: scoreColor,
                borderRadius: 20,
                transition: "width .3s ease",
              }}
            />
          </div>

          <p style={{ color: theme.muted, fontSize: 12, marginTop: 14 }}>
            Source: Alternative.me
          </p>

          <button
            type="button"
            onClick={() => setRefreshKey((value) => value + 1)}
            disabled={loading}
            style={{ padding: "9px 14px", cursor: "pointer" }}
          >
            Refresh index
          </button>
        </div>
      )}
    </section>
  );
}
