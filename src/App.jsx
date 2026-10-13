import React, { useState, useEffect } from 'react';

export default function App() {
  
  const [cryptoData, setCryptoData] = useState([
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 82969, change: -1.5, icon: '🪙', history: [80, 85, 83, 81, 79, 82, 84, 83] },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 2565, change: 2.4, icon: '💎', history: [40, 42, 45, 48, 47, 49, 52, 54] },
    { id: 'sol', name: 'Solana', symbol: 'SOL', price: 114, change: -2.6, icon: '☀️', history: [90, 88, 85, 82, 80, 83, 81, 79] },
  ]);

  const [search, setSearch] = useState('');
  
  const currencyRates = {
    RWF: { symbol: 'RWF ', rate: 1472.43, name: 'Rwandan Franc 🇷🇼' },
    USD: { symbol: '\$', rate: 1, name: 'US Dollar 🇺🇸' },
    EUR: { symbol: '€', rate: 0.89, name: 'Euro 🇪🇺' },
    GBP: { symbol: '£', rate: 0.76, name: 'British Pound (UK) 🇬🇧' },
    KES: { symbol: 'KSh ', rate: 129, name: 'Kenyan Shilling 🇰🇪' },
    UGX: { symbol: 'USh ', rate: 3680, name: 'Ugandan Shilling 🇺🇬' },
    AED: { symbol: 'AED ', rate: 3.67, name: 'UAE Dirham 🇦🇪' },
    CNY: { symbol: '¥', rate: 7.08, name: 'Chinese Yuan 🇨🇳' }
  };

  const [globalCurrency, setGlobalCurrency] = useState('RWF'); 
  const [converterInput, setConverterInput] = useState('1000'); 

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(prevData => 
        prevData.map(coin => {
          const randomMovement = (Math.random() - 0.5) * 20; 
          const newPrice = Math.max(10, coin.price + randomMovement);
          const randomChange = (Math.random() - 0.5) * 5;
          
          const nextHistoryPoint = Math.min(100, Math.max(15, coin.history[coin.history.length - 1] + (Math.random() - 0.5) * 15));
          const newHistory = [...coin.history.slice(1), nextHistoryPoint];
          
          return {
            ...coin,
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat(randomChange.toFixed(1)),
            history: newHistory
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const filteredCrypto = cryptoData.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: '#0f172a', color: '#f8fafc', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Header Panel */}
      <div style={{ background: '#1e293b', padding: '15px', borderRadius: '12px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #334155' }}>
        <div>
          <h1 style={{ margin: 0, color: '#22d3ee', fontSize: '20px' }}>📊 KIGALI GLOBAL TRACKER</h1>
          <p style={{ margin: '5px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>Universal currency conversion dashboard.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search token..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '6px 12px', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '6px', fontSize: '12px', outline: 'none' }}
          />
          <select 
            value={globalCurrency} 
            onChange={(e) => setGlobalCurrency(e.target.value)}
            style={{ padding: '6px', background: '#334155', color: '#fff', border: '1px solid #475569', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}
          >
            {Object.keys(currencyRates).map(code => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Crypto Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {filteredCrypto.map(coin => {
          const currentCurrency = currencyRates[globalCurrency];
          const convertedPrice = coin.price * currentCurrency.rate;

          return (
            <div key={coin.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '16px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '24px' }}>{coin.icon}</span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px' }}>{coin.name}</h3>
                    <span style={{ fontSize: '10px', color: '#94a3b8', background: '#334155', padding: '2px 6px', borderRadius: '4px' }}>{coin.symbol}</span>
                  </div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: coin.change >= 0 ? '#4ade80' : '#f87171' }}>
                  {coin.change >= 0 ? '+' : ''}{coin.change}%
                </span>
              </div>

              <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #334155' }}>
                <p style={{ margin: 0, fontSize: '10px', color: '#64748b' }}>CURRENT VALUE</p>
                <p style={{ margin: '5px 0 0 0', fontSize: '22px', fontWeight: 'bold' }}>
                  {currentCurrency.symbol}{convertedPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>

              {/* Custom Mini Graph bars */}
              <div style={{ marginTop: '15px' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '9px', color: '#64748b', fontWeight: 'bold' }}>MARKET TREND (24H)</p>
                <div style={{ height: '40px', background: '#0f172a', borderRadius: '8px', padding: '5px', display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '3px' }}>
                  {coin.history.map((val, i) => (
                    <div 
                      key={i} 
                      style={{ height: `${val}%`, width: '100%', background: coin.change >= 0 ? '#10b981' : '#ef4444', borderRadius: '2px', transition: 'height 0.5s' }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Converter Box */}
      <div style={{ background: '#1e293b', padding: '20px', borderRadius: '16px', border: '1px solid #334155', maxWidth: '500px', margin: '0 auto' }}>
        <h3 style={{ margin: '0 0 5px 0', color: '#22d3ee', fontSize: '16px' }}>🌍 Universal Currency Converter</h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '11px', color: '#94a3b8' }}>Convert US Dollars (USD) into global currency instantly.</p>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 2 }}>
            <label style={{ fontSize: '10px', color: '#94a3b8', display: 'block', marginBottom: '5px' }}>AMOUNT IN USD (\$)</label>
            <input 
              type="number" 
              value={converterInput} 
              onChange={(e) => setConverterInput(e.target.value)}
              style={{ width: '90%', padding: '10px', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '8px', outline: 'none' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '10px', color: '#94a3b8', display: 'block', marginBottom: '5px' }}>TARGET</label>
            <select 
              value={globalCurrency} 
              onChange={(e) => setGlobalCurrency(e.target.value)}
              style={{ width: '100%', padding: '10px', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '8px', height: '38px' }}
            >
              {Object.keys(currencyRates).map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ background: '#0f172a', padding: '15px', borderRadius: '10px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '10px', color: '#64748b' }}>TOTAL CONVERTED VALUE</span>
            <p style={{ margin: '5px 0 0 0', fontSize: '20px', fontWeight: 'bold', color: '#4ade80' }}>
              {currencyRates[globalCurrency].symbol}
              {converterInput ? (parseFloat(converterInput) * currencyRates[globalCurrency].rate).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '0'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
