
import { useEffect, useState } from "react";

const API_BASE = "https://falcontrade-ai.onrender.com";

export default function Home() {
  const [prices, setPrices] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    try {
      setError("");
      const [pRes, fRes] = await Promise.allSettled([
        fetch(`${API_BASE}/prices`, { cache: "no-store" }),
        fetch(`${API_BASE}/forecast`, { cache: "no-store" }),
      ]);
      if (pRes.status !== "fulfilled" || !pRes.value.ok) throw new Error("prices failed");
      const pJson = await pRes.value.json();
      const pricesArr = Array.isArray(pJson?.prices) ? pJson.prices : [];
      setPrices(pricesArr);

      let fc = [];
      if (fRes.status === "fulfilled" && fRes.value.ok) {
        const fJson = await fRes.value.json();
        fc = Array.isArray(fJson?.forecast) ? fJson.forecast : [];
      }
      if (!fc.length && pricesArr.length) {
        fc = pricesArr.map((r) => ({
          name: r.name, unit: r.unit,
          t_plus_1: round2(Number(r.price)*1.02),
          low: round2(Number(r.price)*1.02*0.95),
          high: round2(Number(r.price)*1.02*1.05),
          conf: 0.8,
        }));
      }
      setForecast(fc);
    } catch(e) {
      setError("Failed to fetch prices");
    }
  }

  useEffect(() => { load(); const id=setInterval(load, 60000); return ()=>clearInterval(id); }, []);

  const [fx, setFx] = useState(1.7);
  const [freight, setFreight] = useState(45);
  const [customs, setCustoms] = useState(10);
  const [insurance, setInsurance] = useState(1);

  const calc = (price) => {
    const base = Number(price) + Number(freight);
    const withIns = base * (1 + Number(insurance)/100);
    const withCst = withIns * (1 + Number(customs)/100);
    return { usd: round2(withCst), azn: round2(withCst*Number(fx)) };
  };

  return (
    <div style={{padding:24,fontFamily:"Inter, system-ui, Arial",maxWidth:980,margin:"0 auto"}}>
      <h1 style={{marginBottom:8}}>FalconTrade AI — Preview</h1>
      <div style={{opacity:.7,marginBottom:16,fontSize:14}}>API: {API_BASE}</div>

      {error ? <div style={{color:"crimson",fontWeight:600}}>{error}</div> : null}

      <section style={{marginTop:16}}>
        <h2>Prices</h2>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",border:"1px solid #eee"}}>
            <thead><tr>
              <th style={th}>Commodity</th><th style={th}>Unit</th><th style={th}>Price</th><th style={th}>Source</th><th style={th}>CIF (USD)</th><th style={th}>CIF (AZN)</th>
            </tr></thead>
            <tbody>
              {prices.map((r,i)=>{
                const k = calc(r.price);
                return (<tr key={i}>
                  <td style={td}>{r.name}</td><td style={td}>{r.unit}</td><td style={td}>{fmt(r.price)}</td><td style={td}>{r.source||"Preview"}</td><td style={td}>{fmt(k.usd)}</td><td style={td}>{fmt(k.azn)}</td>
                </tr>)
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section style={{marginTop:12}}>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <Num label="FX USD→AZN" value={fx} onChange={setFx} />
          <Num label="Freight $/ton" value={freight} onChange={setFreight} />
          <Num label="Customs %" value={customs} onChange={setCustoms} />
          <Num label="Insurance %" value={insurance} onChange={setInsurance} />
        </div>
      </section>

      <section style={{marginTop:28}}>
        <h2>Forecast (t+1)</h2>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",border:"1px solid #eee"}}>
            <thead><tr>
              <th style={th}>Commodity</th><th style={th}>Unit</th><th style={th}>Forecast</th><th style={th}>Band (80%)</th><th style={th}>Alert</th>
            </tr></thead>
            <tbody>
              {forecast.map((r,i)=> (
                <tr key={i}>
                  <td style={td}>{r.name}</td><td style={td}>{r.unit}</td><td style={td}>{fmt(r.t_plus_1)}</td>
                  <td style={td}>{r.low!=null&&r.high!=null?`${fmt(r.low)} — ${fmt(r.high)}`:"—"}</td>
                  <td style={td}><span style={{padding:"2px 8px",border:"1px solid #eee",borderRadius:6}}>Notify @ +5%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Num({label,value,onChange}) {
  return (<label style={{display:"flex",gap:8,alignItems:"center",border:"1px solid #eee",padding:"8px 10px",borderRadius:8}}>
    <span style={{minWidth:110}}>{label}</span>
    <input type="number" value={value} onChange={(e)=>onChange(e.target.value)} style={{padding:"6px 8px",border:"1px solid #ddd",borderRadius:6,width:120}} step="0.01" />
  </label>)
}

const th = {textAlign:"left",padding:"10px 12px",borderBottom:"1px solid #eee",background:"#fafafa",fontWeight:600};
const td = {padding:"10px 12px",borderBottom:"1px solid #f2f2f2"};

function fmt(n){ if(n==null||isNaN(n)) return "-"; return Number(n).toLocaleString("en-US",{maximumFractionDigits:2}); }
function round2(x){ return Math.round((x+Number.EPSILON)*100)/100; }
