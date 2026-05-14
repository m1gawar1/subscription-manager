import React, { useState, useEffect, useRef } from 'react';
import { getCategoryById } from '../constants/categories';
import { getConvertedPrice } from '../utils/currency';
import { isBillingMonth } from '../constants/billing';
import CategoryIcon from '../components/CategoryIcon';
import { getLogoUrl } from '../constants/presets';
import { Pencil } from 'lucide-react';

const Calendar = ({ subscriptions, exchangeRate, onEdit, onUpdateDate }) => {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth()); // 0-indexed
  const [selectedDay, setSelectedDay] = useState(now.getDate());

  // ドラッグ状態
  const draggingRef = useRef(null);
  const dragOverDayRef = useRef(null);
  const longPressTimer = useRef(null);
  const [ghostPos, setGhostPos] = useState(null);
  const [dragOverDay, setDragOverDay] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingSub, setDraggingSub] = useState(null); // 再レンダリング用に元アイコンを非表示にするため

  useEffect(() => {
    const handleMove = (e) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      const touch = e.touches[0];
      setGhostPos({ x: touch.clientX, y: touch.clientY });

      // タッチ位置のdataDay要素を特定
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      const cell = el?.closest('[data-day]');
      const day = cell ? parseInt(cell.getAttribute('data-day')) : null;
      dragOverDayRef.current = day;
      setDragOverDay(day);
    };

    const handleEnd = () => {
      clearTimeout(longPressTimer.current);
      if (draggingRef.current && dragOverDayRef.current) {
        const sub = draggingRef.current;
        const newDay = dragOverDayRef.current;
        if (String(newDay) !== String(sub.date) && onUpdateDate) {
          onUpdateDate(sub.id, newDay);
        }
      }
      draggingRef.current = null;
      dragOverDayRef.current = null;
      setGhostPos(null);
      setDragOverDay(null);
      setIsDragging(false);
      setDraggingSub(null);
    };

    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);
    return () => {
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [onUpdateDate]);

  const startLongPress = (e, sub) => {
    const touch = e.touches[0];
    longPressTimer.current = setTimeout(() => {
      draggingRef.current = sub;
      setIsDragging(true);
      setDraggingSub(sub);
      setGhostPos({ x: touch.clientX, y: touch.clientY });
    }, 300);
  };

  const cancelLongPress = () => {
    clearTimeout(longPressTimer.current);
  };

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
    <div className="dashboard-container" style={{ overflowY: isDragging ? 'hidden' : 'auto' }}>
      {/* ドラッグ中のゴーストアイコン（実際のアイコンを表示） */}
      {ghostPos && draggingSub && (
        <div style={{
          position: 'fixed',
          left: ghostPos.x - 20,
          top: ghostPos.y - 20,
          width: '40px', height: '40px',
          borderRadius: '12px',
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          transform: 'scale(1.2)',
          overflow: 'hidden',
          position: 'fixed',
        }}>
          <CategoryIcon id={draggingSub.categoryId} size={20} color={getCategoryById(draggingSub.categoryId).color} />
          {draggingSub.domain && (
            <img
              src={getLogoUrl(draggingSub.domain)}
              alt={draggingSub.name}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', backgroundColor: 'var(--card-bg)' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}
        </div>
      )}
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

            const daySubsc = getSubscForDay(day);
            const iconsToShow = daySubsc.slice(0, 2);
            const extraCount = daySubsc.length - iconsToShow.length;

            const isDragTarget = isDragging && dragOverDay === day;

            return (
              <div
                key={day}
                data-day={day}
                onClick={() => !isDragging && setSelectedDay(day)}
                style={{
                  height: '52px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
                  paddingTop: '6px',
                  borderRadius: '12px', cursor: isDragging ? 'copy' : 'pointer',
                  backgroundColor: isDragTarget ? 'var(--gold-accent)' : isSelected ? 'var(--gold-accent)' : (isToday ? 'var(--gold-accent-light)' : 'transparent'),
                  color: (isDragTarget || isSelected) ? '#FFF' : (isToday ? 'var(--gold-accent)' : 'var(--text-main)'),
                  fontWeight: (isSelected || isToday || isDragTarget) ? '700' : '400',
                  fontSize: '13px',
                  transition: 'background-color 0.15s ease',
                  gap: '3px',
                  outline: isDragTarget ? '2px solid var(--gold-accent)' : 'none',
                }}
              >
                {day}
                {hasSubsc && (
                  <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                    {iconsToShow.map(sub => {
                      const isDraggingThis = draggingSub?.id === sub.id;
                      return (
                        <div
                          key={sub.id}
                          onTouchStart={(e) => { e.stopPropagation(); startLongPress(e, sub); }}
                          onTouchMove={cancelLongPress}
                          style={{
                            width: '18px', height: '18px', borderRadius: '4px',
                            overflow: 'hidden', backgroundColor: isSelected ? 'rgba(255,255,255,0.3)' : 'var(--input-bg)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0, position: 'relative',
                            cursor: 'grab',
                            WebkitTouchCallout: 'none',
                            WebkitUserSelect: 'none',
                            userSelect: 'none',
                            // ドラッグ中は元アイコンを非表示
                            opacity: isDraggingThis ? 0 : 1,
                          }}
                        >
                          <CategoryIcon id={sub.categoryId} size={10} color={isSelected ? '#FFF' : getCategoryById(sub.categoryId).color} />
                          {sub.domain && (
                            <img
                              src={getLogoUrl(sub.domain)}
                              alt={sub.name}
                              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', backgroundColor: 'var(--card-bg)' }}
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          )}
                        </div>
                      );
                    })}
                    {extraCount > 0 && (
                      <div style={{ fontSize: '8px', color: isSelected ? '#FFF' : 'var(--text-muted)', fontWeight: '600' }}>+{extraCount}</div>
                    )}
                  </div>
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'var(--input-bg)', border: '1px solid var(--border-color)', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                      <CategoryIcon id={cat.id} size={18} color={cat.color} />
                      {sub.domain && (
                        <img
                          src={getLogoUrl(sub.domain)}
                          alt={sub.name}
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', backgroundColor: 'var(--card-bg)' }}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-main)' }}>{sub.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{cat.name}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="gold-text" style={{ fontSize: '16px', fontWeight: '600', textAlign: 'right' }}>
                    {sub.currency === 'USD' ? `$${sub.price}` : `¥${sub.price.toLocaleString()}`}
                    {sub.currency === 'USD' && (
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'normal' }}>
                        約¥{getConvertedPrice(sub, exchangeRate).toLocaleString()}
                      </div>
                    )}
                    </div>
                    {onEdit && (
                      <button
                        onClick={() => onEdit(sub)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px', display: 'flex', alignItems: 'center' }}
                      >
                        <Pencil size={15} />
                      </button>
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
