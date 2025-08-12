import { useEffect, useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://falcontrade-ai.onrender.com";

export default function Home() {
  const [prices, setPrices] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    try {
      setError("");

      // fetch both endpoints (prices always, forecast best-effort)
      const [pRes, fRes] = await Promise.allSettled([
        fetch(`${API_BASE}/prices`, { cache: "no-store" }),
        fetch(`${API_BASE}/forecast`, { cache: "no-store" }),
      ]);

      // PRICES
      if (pRes.status !== "fulfilled" || !pRes.value.ok) {
        throw new Error("prices failed");
      }
      const pJson = await pRes.value.json();
      const pricesArr = Array.isArray(pJson?.prices) ? pJson.prices : [];
      setPrices(pricesArr);

      // FORECAST (fallback to +2% if empty or failed)
      let fc = [];
      if (fRes.status === "fulfilled" && fRes.value.ok) {
        const fJson = await fRes.value.json();
        fc = Array.isArray(fJson?.forecast) ? fJson.forecast : [];
      }
      if (!fc.length && pricesArr.length) {
        fc = pricesArr.map((r) => ({
          name: r.name,
          unit: r.unit,
          t_plus_1: round2(Number(r.price) * 1.02),
        }));
      }
      setForecast(fc);
    } catch (e) {
      setError("Failed to fetch prices");
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "Inter, system-ui, Arial" }}>
      <h1 style={{ marginBottom: 8 }}>FalconTrade AI — Preview</h1>
      <div style={{ opacity: 0.6, marginBottom: 20, fontSize: 14 }}>
        API: {API_BASE}
      </div>

      {error ? (
        <div style={{ color: "crimson", fontWeight: 600 }}>{error}</div>
      ) : null}

      {/* Prices */}
      <section style={{ marginTop: 16 }}>
        <h2>Prices</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #eee" }}>
            <thead>
              <tr>
                <th style={th}>Commodity</th>
                <th style={th}>Unit</th>
                <th style={th}>Price</th>
                <th style={th}>Source</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((r, i) => (
                <tr key={i}>
                  <td style={td}>{r.name}</td>
                  <td style={td}>{r.unit}</td>
                  <td style={td}>{fmt(r.price)}</td>
                  <td style={td}>{r.source || "Preview"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Forecast */}
      <section style={{ marginTop: 28 }}>
        <h2>Forecast (t+1)</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #eee" }}>
            <thead>
              <tr>
                <th style={th}>Commodity</th>
                <th style={th}>Unit</th>
                <th style={th}>Forecast</th>
              </tr>
            </thead>
            <tbody>
              {forecast.map((r, i) => (
                <tr key={i}>
                  <td style={td}>{r.name}</td>
                  <td style={td}>{r.unit}</td>
                  <td style={td}>{fmt(r.t_plus_1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

const th = { textAlign: "left", padding: "10px 12px", borderBottom: "1px solid #eee", background: "#fafafa", fontWeight: 600 };
const td = { padding: "10px 12px", borderBottom: "1px solid #f2f2f2" };

function fmt(n) {
  if (n == null || isNaN(n)) return "-";
  return Number(n).toLocaleString("en-US", { maximumFractionDigits: 2 });
}
function round2(x) {
  return Math.round((x + Number.EPSILON) * 100) / 100;
}
