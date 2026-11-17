import { useEffect, useMemo, useState } from "react";

export default function CryptoNews({ activeTab, theme, panel }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  useEffect(() => {
    if (activeTab !== "news") return;

    const controller = new AbortController();

    async function loadNews() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/news", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`News service returned ${response.status}`);
        }

        const result = await response.json();

        if (!Array.isArray(result.articles)) {
          throw new Error("Unexpected response format.");
        }

        setArticles(result.articles);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            "Unable to load crypto news. Make sure the backend server is running and check your internet connection."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadNews();

    return () => controller.abort();
  }, [activeTab, refreshKey]);

  const categories = useMemo(() => {
    const counts = new Map();
    articles.forEach((item) => {
      if (item.category) {
        const cat = item.category.toUpperCase();
        counts.set(cat, (counts.get(cat) || 0) + 1);
      }
    });
    const top = Array.from(counts.entries())
      .sort((a, b) => b - a)
      .slice(0, 6)
      .map(([cat]) => cat);
    return ["ALL", ...top];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCat =
        selectedCategory === "ALL" ||
        (article.category && article.category.toUpperCase() === selectedCategory);
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        (article.title && article.title.toLowerCase().includes(q)) ||
        (article.description && article.description.toLowerCase().includes(q)) ||
        (article.source && article.source.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [articles, selectedCategory, query]);

  if (activeTab !== "news") return null;

  return (
    <section style={{ marginBottom: 22 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div>
          <h2 style={{ margin: "0 0 6px" }}>📰 Live Crypto & Market News</h2>
          <p style={{ color: theme.muted, fontSize: 13, margin: 0 }}>
            Real-time cryptocurrency headlines, regulation updates, and market insights.
          </p>
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={() => setRefreshKey((value) => value + 1)}
          style={{
            padding: "10px 14px",
            borderRadius: 9,
            border: `1px solid ${theme.border}`,
            background: theme.card,
            color: theme.text,
            cursor: loading ? "wait" : "pointer",
            fontWeight: 600,
          }}
        >
          {loading ? "Refreshing..." : "↻ Refresh News"}
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news (e.g. Bitcoin, Ethereum, ETF, Solana)..."
          style={{
            flex: "1 1 240px",
            padding: "10px 14px",
            borderRadius: 9,
            border: `1px solid ${theme.border}`,
            background: theme.card,
            color: theme.text,
            fontSize: 14,
          }}
        />

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "7px 12px",
                  borderRadius: 999,
                  border: `1px solid ${active ? "#06b6d4" : theme.border}`,
                  background: active ? "rgba(6, 182, 212, 0.15)" : theme.card,
                  color: active ? "#06b6d4" : theme.muted,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {loading && articles.length === 0 && (
        <div style={panel}>Loading latest crypto news...</div>
      )}

      {error && (
        <div
          role="alert"
          style={{
            ...panel,
            border: "1px solid #ef4444",
            marginBottom: 16,
          }}
        >
          <p style={{ margin: 0 }}>{error}</p>
        </div>
      )}

      {!loading && !error && filteredArticles.length === 0 && (
        <div style={panel}>
          No matching crypto news articles found. Try clearing your search filter.
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: 16,
        }}
      >
        {filteredArticles.map((article, index) => (
          <article
            key={article.id || article.link || index}
            style={{
              ...panel,
              padding: 0,
              overflow: "hidden",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {article.imageUrl && (
              <img
                src={article.imageUrl}
                alt={article.title || "Crypto news"}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
                style={{
                  width: "100%",
                  height: 165,
                  objectFit: "cover",
                  borderBottom: `1px solid ${theme.border}`,
                }}
              />
            )}

            <div
              style={{
                padding: 18,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                flex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 12,
                  color: theme.muted,
                }}
              >
                <span style={{ fontWeight: 600, color: "#06b6d4" }}>
                  {article.source || "Crypto News"}
                </span>
                {article.category && (
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: 6,
                      border: `1px solid ${theme.border}`,
                      fontSize: 11,
                    }}
                  >
                    {article.category}
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: 16, lineHeight: 1.45, margin: 0 }}>
                {article.title}
              </h3>

              <p
                style={{
                  color: theme.muted,
                  fontSize: 13,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {article.description
                  ? article.description.replace(/<[^>]*>/g, "").slice(0, 180) + "..."
                  : "Click below to read the full story."}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "auto",
                  paddingTop: 10,
                  borderTop: `1px solid ${theme.border}`,
                }}
              >
                {article.pubDate && (
                  <span style={{ color: theme.muted, fontSize: 11 }}>
                    {new Date(article.pubDate).toLocaleString()}
                  </span>
                )}

                {article.link && (
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#06b6d4",
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    Read Full Story ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
