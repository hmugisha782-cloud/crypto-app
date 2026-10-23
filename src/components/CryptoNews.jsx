import { useEffect, useState } from "react";

export default function CryptoNews({ activeTab, theme, panel }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (activeTab !== "news") return;

    const controller = new AbortController();

    async function loadNews() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          "https://cryptocurrency.cv/api/news",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`News service returned ${response.status}`);
        }

        const result = await response.json();

        if (!Array.isArray(result.articles)) {
          throw new Error("The news service returned an unexpected response.");
        }

        const keywords =
          /cryptocurrency|crypto market|crypto exchange|bitcoin|btc|ethereum|ether|eth\b|blockchain|altcoin|defi|web3|stablecoin|binance|solana|\bxrp\b|dogecoin|coinbase|cardano|\btokenomics\b|crypto regulation|digital asset|digital assets|crypto trading|crypto wallet|crypto ETF|crypto mining|proof of stake|proof of work/i;

        const cryptoArticles = result.articles.filter((article) => {
          const title = String(article.title || "").trim();
          const description = String(article.description || "");
          const category = String(article.category || "");

          // The headline must contain a clear crypto-related term.
          const headlineIsCrypto = keywords.test(title);

          // Some feeds use broad headlines, so accept a relevant category
          // or a title plus a matching description.
          const categoryIsCrypto =
            /crypto|cryptocurrency|blockchain|digital assets/i.test(category);

          const descriptionIsCrypto = keywords.test(description);

          return title.length > 0 &&
            (headlineIsCrypto || categoryIsCrypto || descriptionIsCrypto);
        });

        setArticles(
          cryptoArticles.map((article) => ({
            ...article,
            link: String(article.link || "").replace(/&amp;/g, "&"),
          }))
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            "Unable to load news. Check your internet connection and try again."
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
          marginBottom: 18,
        }}
      >
        <div>
          <h2 style={{ margin: "0 0 6px" }}>📰 Crypto News</h2>
          <p style={{ color: theme.muted, fontSize: 13, margin: 0 }}>
            Latest cryptocurrency news and market updates.
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
          }}
        >
          {loading ? "Loading..." : "↻ Refresh News"}
        </button>
      </div>

      {loading && articles.length === 0 && (
        <div style={panel}>Loading crypto news...</div>
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
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <div style={panel}>
          No crypto news articles are available right now.
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: 16,
        }}
      >
        {articles.map((article, index) => (
          <article
            key={article.link || `${article.title}-${index}`}
            style={{
              ...panel,
              padding: 18,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <p style={{ color: theme.muted, fontSize: 12, margin: 0 }}>
              {article.source || "Crypto News"}
              {article.category ? ` · ${article.category}` : ""}
            </p>

            <h3 style={{ fontSize: 17, lineHeight: 1.5, margin: 0 }}>
              {article.title || "Crypto market update"}
            </h3>

            <p
              style={{
                color: theme.muted,
                fontSize: 13,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {article.description
                ? article.description.replace(/<[^>]*>/g, "").slice(0, 220)
                : "Open the article to read more details."}
            </p>

            {article.pubDate && (
              <p style={{ color: theme.muted, fontSize: 11, margin: 0 }}>
                {new Date(article.pubDate).toLocaleString()}
              </p>
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
                  marginTop: "auto",
                  paddingTop: 6,
                }}
              >
                Read Full Article ↗
              </a>
            )}
          </article>
        ))}
      </div>

      <p style={{ color: theme.muted, fontSize: 12, marginTop: 16 }}>
        News is provided by an external service. Click an article
        to read the full story on its original website.
      </p>
    </section>
  );
}
