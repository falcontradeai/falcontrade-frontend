import { useEffect, useState } from 'react';

export default function Home() {
  const [prices, setPrices] = useState(null);
  const [forecasts, setForecasts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_BASE || '';
        const res = await fetch(`${base}/prices`);
        if (!res.ok) throw new Error('Failed to fetch prices');
        const pricesData = await res.json();
        setPrices(pricesData.prices);
        const res2 = await fetch(`${base}/forecast`);
        if (res2.ok) {
          const forecastsData = await res2.json();
          setForecasts(forecastsData.forecasts);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>FalconTrade AI Dashboard</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!error && !prices && <p>Loading...</p>}
      {prices && (
        <section>
          <h2>Last Prices</h2>
          <table border="1" cellPadding="6">
            <thead>
              <tr>
                {Object.keys(prices[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {prices.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, cidx) => (
                    <td key={cidx}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
      {forecasts && (
        <section style={{ marginTop: '2rem' }}>
          <h2>Forecast (T+1)</h2>
          <table border="1" cellPadding="6">
            <thead>
              <tr>
                {Object.keys(forecasts[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {forecasts.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, cidx) => (
                    <td key={cidx}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
}
