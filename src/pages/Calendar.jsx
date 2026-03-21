import React, { useState } from 'react';
import { getCategoryById } from '../constants/categories';
import { getConvertedPrice } from '../utils/currency';
import { isBillingMonth } from '../constants/billing';

const Calendar = ({ subscriptions, exchangeRate }) => {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth()); // 0-indexed
  const [selectedDay, setSelectedDay] = useState(now.getDate());

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const goToPrevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelectedDay(1);
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelectedDay(1);
  };

  const getSubscForDay = (day) => {
    return subscriptions.filter(sub =>
      !sub.isPaused &&
      parseInt(sub.date) === day &&
      isBillingMonth(sub, viewMonth + 1)
    );
  };

  const selectedDaySubscriptions = getSubscForDay(selectedDay);
  const isCurrentMonth = viewYear === now.getFullYear() && viewMonth === now.getMonth();

  return (
    <div className="dashboard-container">
      <header style={{ marginBottom: '32px' }}>
        {/* 月移動ナビゲーション */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={goToPrevMonth}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px', color: 'var(--text-main)', margin: 0 }}>
              {viewYear}年{viewMonth + 1}月
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>更新スケジュールを確認</p>
          </div>
          <button
            onClick={goToNextMonth}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
        {!isCurrentMonth && (
          <div style={{ textAlign: 'center', marginTop: '8px' }}>
            <button onClick={() => { setViewYear(now.getFullYear()); setViewMonth(now.getMonth()); setSelectedDay(now.getDate()); }} style={{ background: 'none', border: 'none', color: 'var(--gold-accent)', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
              今月に戻る
            </button>
          </div>
        )}
      </header>

      {/* Calendar Grid */}
      <div className="soft-card" style={{ padding: '20px 12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '16px' }}>
          {['日', '月', '火', '水', '木', '金', '土'].map(d => (
            <div key={d} style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>{d}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
          {days.map((day, i) => {
            if (day === null) return <div key={`empty-${i}`} />;

            const hasSubsc = getSubscForDay(day).length > 0;
            const isSelected = day === selectedDay;
            const isToday = isCurrentMonth && day === now.getDate();

            return (
              <div
                key={day}
                onClick={() => setSelectedDay(day)}
                style={{
                  height: '40px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '12px', cursor: 'pointer',
                  backgroundColor: isSelected ? 'var(--gold-accent)' : (isToday ? 'var(--gold-accent-light)' : 'transparent'),
                  color: isSelected ? '#FFF' : (isToday ? 'var(--gold-accent)' : 'var(--text-main)'),
                  position: 'relative',
                  fontWeight: (isSelected || isToday) ? '700' : '400',
                  fontSize: '14px',
                  transition: 'all 0.2s ease'
                }}
              >
                {day}
                {hasSubsc && !isSelected && (
                  <div style={{ position: 'absolute', bottom: '6px', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--gold-accent)' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Details */}
      <div style={{ marginTop: '32px' }}>
        <div className="section-title">{selectedDay}日の更新予定</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {selectedDaySubscriptions.length > 0 ? (
            selectedDaySubscriptions.map(sub => {
              const cat = getCategoryById(sub.categoryId);
              return (
                <div key={sub.id} className="soft-card" style={{ margin: 0, padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '24px' }}>{cat.icon}</div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-main)' }}>{sub.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{cat.name}</div>
                    </div>
                  </div>
                  <div className="gold-text" style={{ fontSize: '16px', fontWeight: '600', textAlign: 'right' }}>
                    {sub.currency === 'USD' ? `$${sub.price}` : `¥${sub.price.toLocaleString()}`}
                    {sub.currency === 'USD' && (
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'normal' }}>
                        約¥{getConvertedPrice(sub, exchangeRate).toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontSize: '14px' }}>
              この日の更新予定はありません
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
