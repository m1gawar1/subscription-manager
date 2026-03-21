import React from 'react';

// Option C: Warm Minimal & Flat
export default function OptionC() {
  const subscriptions = [
    { id: 1, name: 'Netflix', price: 1490, category: '映像', date: '20' },
    { id: 2, name: 'Spotify', price: 980, category: '音楽', date: '15' },
    { id: 3, name: 'Amazon Prime', price: 600, category: '生活', date: '01' },
  ];
  const totalMonthly = 3070;

  return (
    <div style={{ background: '#FFFDF8', color: '#78716C', minHeight: '100%', padding: '40px 24px', fontFamily: '"Yu Gothic", "Meiryo", sans-serif' }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '500', color: '#78716C', margin: 0, letterSpacing: '2px' }}>SUBSC</h1>
      </header>

      <section style={{ 
        textAlign: 'center',
        marginBottom: '48px'
      }}>
        <p style={{ color: '#A8A29E', fontSize: '14px', marginBottom: '8px' }}>今月の支出</p>
        <h2 style={{ fontSize: '48px', fontWeight: '400', color: '#57534E', margin: 0, fontFamily: 'serif' }}>
          <span style={{ fontSize: '24px', marginRight: '4px', color: '#D6D3D1' }}>¥</span>{totalMonthly.toLocaleString()}
        </h2>
      </section>

      <section>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {subscriptions.map((sub) => (
            <div key={sub.id} style={{ 
              background: '#FDF8F3', 
              borderRadius: '24px', 
              padding: '24px 16px', 
              textAlign: 'center'
            }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '20px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706', margin: '0 auto 12px auto' }}>
                ✦
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 4px 0', color: '#57534E' }}>{sub.name}</h4>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#78716C', marginBottom: '8px' }}>
                ¥{sub.price.toLocaleString()}
              </div>
              <p style={{ color: '#A8A29E', fontSize: '11px', margin: 0 }}>{sub.date}日更新</p>
            </div>
          ))}
          
          <div style={{ 
            background: 'transparent', 
            borderRadius: '24px', 
            padding: '24px 16px', 
            textAlign: 'center',
            border: '2px dashed #E7E5E4',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#A8A29E'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>+</div>
            <span style={{ fontSize: '13px', fontWeight: '500' }}>追加する</span>
          </div>
        </div>
      </section>
    </div>
  );
}
