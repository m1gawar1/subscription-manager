import React from 'react';
import { CATEGORIES } from '../constants/categories';
import { getMonthlyPrice } from '../utils/currency';
import CategoryIcon from '../components/CategoryIcon';

const Analysis = ({ subscriptions, exchangeRate, monthlyHistory }) => {
  const totalMonthly = subscriptions
    .filter(sub => !sub.isPaused)
    .reduce((sum, sub) => sum + getMonthlyPrice(sub, exchangeRate), 0);
  const totalYearly = totalMonthly * 12;

  // カテゴリー別集計（一時停止除く）
  const activeCategories = CATEGORIES.map(cat => {
    const amount = subscriptions
      .filter(sub => !sub.isPaused && sub.categoryId === cat.id)
      .reduce((sum, sub) => sum + getMonthlyPrice(sub, exchangeRate), 0);
    return { ...cat, amount };
  }).filter(cat => cat.amount > 0);

  // ドーナツチャート
  let cumulativePercentage = 0;
  const chartData = activeCategories.map(cat => {
    const percentage = (cat.amount / totalMonthly) * 100;
    const start = cumulativePercentage;
    cumulativePercentage += percentage;
    return { ...cat, start, end: cumulativePercentage };
  });

  // 月別推移（直近6ヶ月）
  const getLast6Months = () => {
    const result = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      result.push({ key, label: `${d.getMonth() + 1}月`, amount: monthlyHistory?.[key] || 0 });
    }
    return result;
  };
  const historyData = getLast6Months();
  const maxAmount = Math.max(...historyData.map(d => d.amount), 1);
  const hasHistory = historyData.some(d => d.amount > 0);

  return (
    <div className="dashboard-container" style={{ height: '100%', overflowY: 'auto' }}>
      {/* Projection Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '32px' }}>
        {[
          { label: '年間', value: `¥${totalYearly.toLocaleString()}` },
          { label: '月間', value: `¥${totalMonthly.toLocaleString()}` },
          { label: '日間', value: `¥${Math.round(totalYearly / 365).toLocaleString()}` },
        ].map(card => (
          <div key={card.label} className="soft-card" style={{ background: 'transparent', border: '2px solid var(--gold-accent)', color: 'var(--gold-accent)', padding: '16px 8px', margin: 0, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', marginBottom: '4px', opacity: 0.9 }}>{card.label}</div>
            <div style={{ fontSize: '16px', fontWeight: '700', letterSpacing: '-0.5px' }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* 月別推移グラフ */}
      <div className="soft-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <div className="section-title" style={{ marginBottom: '20px' }}>月別支出推移</div>
        {hasHistory ? (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
            {historyData.map((d, i) => {
              const heightPct = (d.amount / maxAmount) * 100;
              const isCurrentMonth = i === historyData.length - 1;
              return (
                <div key={d.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center' }}>
                    {d.amount > 0 ? `¥${Math.round(d.amount / 1000)}k` : ''}
                  </div>
                  <div style={{
                    width: '100%',
                    height: `${heightPct}%`,
                    minHeight: d.amount > 0 ? '4px' : '0',
                    borderRadius: '4px 4px 0 0',
                    backgroundColor: isCurrentMonth ? 'var(--gold-accent)' : 'var(--gold-accent-light)',
                    border: isCurrentMonth ? 'none' : '1px solid var(--gold-accent)',
                    transition: 'height 0.4s ease',
                  }} />
                  <div style={{ fontSize: '11px', color: isCurrentMonth ? 'var(--gold-accent)' : 'var(--text-muted)', fontWeight: isCurrentMonth ? '700' : '400' }}>
                    {d.label}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontSize: '14px' }}>
            データが蓄積されると推移が表示されます
          </div>
        )}
      </div>

      {/* カテゴリー別ドーナツチャート */}
      <div className="soft-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 24px', marginBottom: '80px' }}>
        <div className="section-title" style={{ width: '100%', marginBottom: '24px' }}>カテゴリー別割合</div>

        <div style={{ position: 'relative', width: '200px', height: '200px', marginBottom: '32px' }}>
          <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            {subscriptions.length === 0 ? (
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--border-color)" strokeWidth="4" />
            ) : (
              chartData.map(data => (
                <circle
                  key={data.id}
                  cx="18" cy="18" r="15.915"
                  fill="none"
                  stroke={data.color}
                  strokeWidth="4"
                  strokeDasharray={`${data.end - data.start} ${100 - (data.end - data.start)}`}
                  strokeDashoffset={-data.start}
                />
              ))
            )}
          </svg>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>合計</div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)' }}>{activeCategories.length}種</div>
          </div>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {activeCategories.map(cat => (
            <div key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'var(--input-bg)', color: 'var(--text-muted)', flexShrink: 0 }}><CategoryIcon id={cat.id} size={16} /></div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>{cat.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{Math.round((cat.amount / totalMonthly) * 100)}%</div>
                </div>
              </div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>¥{cat.amount.toLocaleString()}</div>
            </div>
          ))}
          {activeCategories.length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>データがありません</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
