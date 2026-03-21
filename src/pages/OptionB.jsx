import React from 'react';

// Option B: Fresh Mint & Crystal Clean
export default function OptionB() {
  const subscriptions = [
    { id: 1, name: 'Netflix', price: 1490, category: 'エンタメ', date: '20' },
    { id: 2, name: 'Spotify', price: 980, category: '音楽', date: '15' },
    { id: 3, name: 'Amazon Prime', price: 600, category: '買い物', date: '01' },
  ];
  const totalMonthly = 3070;

  return (
    <div style={{ background: '#F8FAFC', color: '#475569', minHeight: '100%', padding: '40px 24px', fontFamily: '"Inter", "SF Pro Text", sans-serif' }}>
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#334155', margin: 0 }}>マイ・サブスク</h1>
          <p style={{ color: '#94A3B8', fontSize: '13px', marginTop: '4px' }}>3つのサービスを利用中</p>
        </div>
        <div style={{ width: '40px', height: '40px', borderRadius: '20px', backgroundColor: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0EA5E9', fontWeight: 'bold' }}>S</div>
      </header>

      <section style={{ 
        background: '#FFFFFF', 
        borderRadius: '20px', 
        padding: '32px 24px', 
        marginBottom: '32px',
        border: '1px solid #F1F5F9',
        boxShadow: '0 4px 20px rgba(100, 116, 139, 0.05)'
      }}>
        <p style={{ color: '#94A3B8', fontSize: '13px', fontWeight: '500', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Total This Month</p>
        <h2 style={{ fontSize: '44px', fontWeight: '800', color: '#0EA5E9', margin: 0 }}>
          <span style={{ fontSize: '24px', marginRight: '4px', color: '#38BDF8' }}>¥</span>{totalMonthly.toLocaleString()}
        </h2>
      </section>

      <section>
        {subscriptions.map((sub) => (
          <div key={sub.id} style={{ 
            background: '#FFFFFF', 
            borderRadius: '16px', 
            padding: '16px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '12px',
            border: '1px solid #F1F5F9'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#F0FDFA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#14B8A6', fontWeight: 'bold', fontSize: '20px' }}>
                {sub.name.charAt(0)}
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 2px 0', color: '#334155' }}>{sub.name}</h4>
                <p style={{ color: '#94A3B8', fontSize: '13px', margin: 0 }}>毎月{sub.date}日</p>
              </div>
            </div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#475569' }}>
              ¥{sub.price.toLocaleString()}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
