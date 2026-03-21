import React from 'react';

// Option A: Soft Pastel & Elegant
export default function OptionA() {
  const subscriptions = [
    { id: 1, name: 'Netflix', price: 1490, category: 'エンタメ', date: '20' },
    { id: 2, name: 'Spotify', price: 980, category: '音楽', date: '15' },
    { id: 3, name: 'Amazon Prime', price: 600, category: '買い物', date: '01' },
  ];
  const totalMonthly = 3070;

  return (
    <div style={{ background: '#FFFFFF', color: '#57534E', minHeight: '100%', padding: '40px 24px', fontFamily: '"Avenir Next", "Hiragino Kaku Gothic ProN", sans-serif' }}>
      <header style={{ marginBottom: '32px' }}>
        <p style={{ color: '#A8A29E', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>2026年3月</p>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#57534E', margin: 0 }}>サブスク管理</h1>
      </header>

      <section style={{ 
        background: 'linear-gradient(135deg, #FDF4F5 0%, #F3F0FF 100%)', 
        borderRadius: '32px', 
        padding: '32px 24px', 
        marginBottom: '40px',
        boxShadow: '0 12px 30px rgba(168, 162, 158, 0.15)'
      }}>
        <p style={{ color: '#78716C', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>月間の支払い合計</p>
        <h2 style={{ fontSize: '40px', fontWeight: '800', color: '#57534E', margin: 0, letterSpacing: '-1px' }}>
          <span style={{ fontSize: '24px', marginRight: '4px' }}>¥</span>{totalMonthly.toLocaleString()}
        </h2>
      </section>

      <section>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#78716C' }}>契約中のサービス</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {subscriptions.map((sub) => (
            <div key={sub.id} style={{ 
              background: '#FFFFFF', 
              borderRadius: '24px', 
              padding: '20px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              boxShadow: '0 8px 24px rgba(168, 162, 158, 0.1)',
              border: '1px solid #F5F5F4'
            }}>
              <div>
                <span style={{ fontSize: '11px', color: '#C7D2FE', fontWeight: '800', backgroundColor: '#EEF2FF', padding: '4px 8px', borderRadius: '8px', display: 'inline-block', marginBottom: '6px' }}>{sub.category}</span>
                <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 4px 0', color: '#57534E' }}>{sub.name}</h4>
                <p style={{ color: '#A8A29E', fontSize: '12px', margin: 0 }}>次回: {sub.date}日</p>
              </div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#57534E' }}>
                ¥{sub.price.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
