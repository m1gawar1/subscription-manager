import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';

const DatePicker = ({ value, onChange, placeholder = '日付を選択' }) => {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const initial = value ? new Date(value) : today;
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());
  const [selected, setSelected] = useState(value || '');

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const handleSelect = (day) => {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelected(dateStr);
  };

  const handleConfirm = () => {
    onChange(selected);
    setOpen(false);
  };

  const handleClear = () => {
    setSelected('');
    onChange('');
    setOpen(false);
  };

  const displayValue = value
    ? (() => { const d = new Date(value); return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`; })()
    : placeholder;

  const selectedDateStr = selected
    ? `${new Date(selected).getFullYear()}-${String(new Date(selected).getMonth()+1).padStart(2,'0')}-${String(new Date(selected).getDate()).padStart(2,'0')}`
    : '';

  return (
    <>
      {/* トリガーボタン */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          width: '100%',
          padding: '14px 16px',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          background: 'var(--input-bg)',
          color: value ? 'var(--text-main)' : 'var(--text-muted)',
          fontSize: '15px',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxSizing: 'border-box',
        }}
      >
        <Calendar size={16} color="var(--text-muted)" />
        {displayValue}
      </button>

      {/* カレンダーモーダル */}
      {open && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          zIndex: 2000,
        }}>
          <div style={{
            width: '100%',
            maxWidth: '480px',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '24px 24px 0 0',
            padding: '24px 20px 40px',
          }}>
            {/* ヘッダー */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <button type="button" onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}>
                <ChevronLeft size={20} />
              </button>
              <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-main)' }}>
                {viewYear}年{viewMonth + 1}月
              </div>
              <button type="button" onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}>
                <ChevronRight size={20} />
              </button>
            </div>

            {/* 曜日 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '8px' }}>
              {['日', '月', '火', '水', '木', '金', '土'].map(d => (
                <div key={d} style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', padding: '4px 0' }}>{d}</div>
              ))}
            </div>

            {/* 日付グリッド */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '20px' }}>
              {days.map((day, i) => {
                if (!day) return <div key={`e-${i}`} />;
                const dateStr = `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
                const isSelected = dateStr === selectedDateStr;
                const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleSelect(day)}
                    style={{
                      height: '40px',
                      borderRadius: '10px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: isSelected || isToday ? '600' : '400',
                      backgroundColor: isSelected ? 'var(--gold-accent)' : isToday ? 'var(--gold-accent-light)' : 'transparent',
                      color: isSelected ? '#FFF' : isToday ? 'var(--gold-accent)' : 'var(--text-main)',
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* ボタン */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={handleClear}
                style={{
                  padding: '14px', borderRadius: '14px',
                  border: '1.5px solid var(--border-color)',
                  background: 'var(--input-bg)',
                  color: 'var(--text-muted)',
                  fontSize: '14px', fontWeight: '600', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}
              >
                <X size={14} />
                クリア
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                style={{
                  flex: 1, padding: '14px', borderRadius: '14px',
                  border: 'none',
                  background: selected ? 'var(--gold-accent)' : 'var(--border-color)',
                  color: selected ? '#FFF' : 'var(--text-muted)',
                  fontSize: '14px', fontWeight: '600', cursor: 'pointer',
                }}
              >
                {selected ? `${new Date(selected).getMonth()+1}月${new Date(selected).getDate()}日を選択` : '日付を選んでください'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DatePicker;
