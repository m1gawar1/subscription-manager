import React, { useState } from 'react';
import '../styles/globals.css';
import { Crown } from 'lucide-react';
import { CATEGORIES, getCategoryById } from '../constants/categories';
import { getLogoUrl } from '../constants/presets';
import { getBillingCycleById, isBillingMonth } from '../constants/billing';
import { getConvertedPrice, getMonthlyPrice } from '../utils/currency';
import SubscriptionDetail from '../components/SubscriptionDetail';
import CategoryIcon from '../components/CategoryIcon';

const SORT_OPTIONS = [
  { id: 'default',     label: '登録順' },
  { id: 'name-asc',    label: '名前順' },
  { id: 'price-desc',  label: '金額が高い順' },
  { id: 'price-asc',   label: '金額が安い順' },
  { id: 'date-asc',    label: '更新日が近い順' },
];

const Dashboard = ({ subscriptions, onAddClick, onDelete, onEdit, onTogglePause, exchangeRate, budget, isPro, maxSlots, onUpgrade }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState('all');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortId, setSortId] = useState('default');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [detailSub, setDetailSub] = useState(null);

  // カテゴリー・検索・ソートを適用
  const filteredSubscriptions = subscriptions
    .filter(sub => activeCategoryId === 'all' || sub.categoryId === activeCategoryId)
    .filter(sub => sub.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (sortId) {
        case 'name-asc':   return a.name.localeCompare(b.name, 'ja');
        case 'price-desc': return getMonthlyPrice(b, exchangeRate) - getMonthlyPrice(a, exchangeRate);
        case 'price-asc':  return getMonthlyPrice(a, exchangeRate) - getMonthlyPrice(b, exchangeRate);
        case 'date-asc':   return parseInt(a.date) - parseInt(b.date);
        default:           return 0;
      }
    });

  // 月換算合計（一時停止中は除外）
  const activeSubscriptions = filteredSubscriptions.filter(sub => !sub.isPaused);
  const totalMonthly = activeSubscriptions.reduce((sum, sub) => sum + getMonthlyPrice(sub, exchangeRate), 0);

  // 通知用
  const today = new Date().getDate();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const upcomingSubscriptions = subscriptions
    .filter(sub => sub.isReminderEnabled !== false && !sub.isPaused)
    .filter(sub => isBillingMonth(sub, currentMonth + 1))
    .map(sub => {
      let daysLeft = parseInt(sub.date) - today;
      if (daysLeft < 0) daysLeft += getDaysInMonth(currentYear, currentMonth);
      return { ...sub, daysLeft };
    })
    .filter(sub => (sub.reminderDays || [7, 3, 0]).includes(sub.daysLeft))
    .sort((a, b) => a.daysLeft - b.daysLeft);

  const getRenewalLabel = (sub) => {
    const cycle = getBillingCycleById(sub.billingCycle);
    if (sub.billingCycle === 'monthly') return `毎月${sub.date}日`;
    if (sub.billingCycle === 'yearly') return `毎年${sub.billingMonth}月${sub.date}日`;
    return `${cycle.label} ${sub.billingMonth}月${sub.date}日〜`;
  };

  const currentSortLabel = SORT_OPTIONS.find(o => o.id === sortId)?.label;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) return 'おやすみなさい';
    if (hour < 12) return 'おはようございます';
    if (hour < 18) return 'こんにちは';
    return 'こんばんは';
  };

  return (
    <>
      <div className="dashboard-container">
        {/* Header */}
        <header className="greeting-header">
          <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-muted)' }}>
            {new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div
              style={{ color: 'var(--text-main)', display: 'flex', cursor: 'pointer', position: 'relative' }}
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              {upcomingSubscriptions.length > 0 && (
                <div style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', backgroundColor: '#FF4444', borderRadius: '50%', border: '2px solid var(--bg-app)' }} />
              )}
            </div>
          </div>

          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <div className="soft-card" style={{ position: 'absolute', top: '50px', right: '0', width: '280px', zIndex: 100, padding: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1.5px solid var(--gold-accent)' }}>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', color: 'var(--text-main)' }}>
                通知
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'normal' }}>リマインダー設定に基づく</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {upcomingSubscriptions.length > 0 ? (
                  upcomingSubscriptions.map(sub => (
                    <div key={sub.id} style={{ display: 'flex', gap: '10px', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '20px' }}>⏰</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>{sub.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--gold-accent)' }}>
                          次回更新まで あと {sub.daysLeft === 0 ? '今日' : `${sub.daysLeft}日`}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-main)' }}>
                          {sub.currency === 'USD' ? `$${sub.price}` : `¥${sub.price.toLocaleString()}`}
                        </div>
                        {sub.currency === 'USD' && (
                          <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>約¥{getConvertedPrice(sub, exchangeRate).toLocaleString()}</div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '12px', color: 'var(--text-muted)', fontSize: '13px' }}>
                    新しい通知はありません
                  </div>
                )}
              </div>
            </div>
          )}
        </header>

        {/* 上限到達バナー */}
        {!isPro && subscriptions.length >= maxSlots && (
          <div
            onClick={onUpgrade}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 16px',
              marginBottom: '16px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, var(--gold-accent-light), var(--card-bg))',
              border: '1.5px solid var(--gold-accent)',
              cursor: 'pointer',
            }}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--gold-accent), #b8860b)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Crown size={16} color="#FFF" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--gold-accent)' }}>
                登録枠がいっぱいです
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                プロ版で無制限に管理 → ¥1,000
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        )}

        {/* Summary Card */}
        <div className="soft-card summary-card" style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <div className="section-title" style={{ marginBottom: '4px' }}>
                {activeCategoryId === 'all' ? '月換算の合計支出' : `${getCategoryById(activeCategoryId).name}の支出`}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>一時停止中を除く</div>
              <div className="gold-text count-animate" key={totalMonthly} style={{ fontSize: '32px', fontWeight: '500', letterSpacing: '-0.5px' }}>¥{totalMonthly.toLocaleString()}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="section-title" style={{ marginBottom: '8px', lineHeight: '1.2' }}>契約中の<br/>サービス</div>
              <div className="gold-text" style={{ fontSize: '28px', fontWeight: '500' }}>{activeSubscriptions.length}</div>
              {!isPro && (
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {subscriptions.length}/{maxSlots} 枠
                </div>
              )}
              {isPro && (
                <div style={{ fontSize: '11px', color: 'var(--gold-accent)', marginTop: '4px', fontWeight: '600' }}>
                  Pro
                </div>
              )}
            </div>
          </div>

          {/* Budget Progress Bar */}
          {budget > 0 && (() => {
            const pct = Math.min((totalMonthly / budget) * 100, 100);
            const isOver = totalMonthly > budget;
            return (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                  <span style={{ color: isOver ? '#FF4444' : 'var(--text-muted)', fontWeight: '600' }}>
                    {isOver ? '⚠️ 予算超過' : '月予算'}
                  </span>
                  <span style={{ color: isOver ? '#FF4444' : 'var(--text-muted)' }}>
                    ¥{totalMonthly.toLocaleString()} / ¥{budget.toLocaleString()}
                  </span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'var(--input-bg)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', borderRadius: '3px', backgroundColor: isOver ? '#FF4444' : 'var(--gold-accent)', transition: 'width 0.4s ease' }} />
                </div>
              </div>
            );
          })()}

          {/* Mini Category Bar Chart */}
          <div style={{ width: '100%', height: '8px', background: 'var(--input-bg)', borderRadius: '4px', display: 'flex', overflow: 'hidden' }}>
            {CATEGORIES.map(cat => {
              const amount = activeSubscriptions
                .filter(sub => sub.categoryId === cat.id)
                .reduce((sum, sub) => sum + getMonthlyPrice(sub, exchangeRate), 0);
              const percentage = totalMonthly > 0 ? (amount / totalMonthly) * 100 : 0;
              if (percentage === 0) return null;
              return (
                <div key={cat.id} style={{ width: `${percentage}%`, height: '100%', backgroundColor: cat.color, transition: 'width 0.3s ease' }} title={`${cat.name}: ${Math.round(percentage)}%`} />
              );
            })}
          </div>
          {totalMonthly > 0 && (
            <div style={{ display: 'flex', gap: '12px', marginTop: '12px', flexWrap: 'wrap' }}>
              {CATEGORIES.filter(cat => activeSubscriptions.some(sub => sub.categoryId === cat.id)).map(cat => (
                <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: cat.color }} />
                  {cat.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', overflowX: 'auto', gap: '10px', marginTop: '24px', paddingBottom: '8px', scrollbarWidth: 'none' }} className="no-scrollbar">
          <button onClick={() => setActiveCategoryId('all')} style={{ flexShrink: 0, padding: '8px 16px', borderRadius: '20px', border: 'none', background: activeCategoryId === 'all' ? 'var(--gold-accent)' : 'var(--card-bg)', color: activeCategoryId === 'all' ? '#FFF' : 'var(--text-muted)', fontSize: '13px', fontWeight: '600', cursor: 'pointer', boxShadow: activeCategoryId === 'all' ? '0 4px 12px rgba(195, 157, 85, 0.3)' : 'none' }}>
            すべて
          </button>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategoryId(cat.id)} style={{ flexShrink: 0, padding: '8px 16px', borderRadius: '20px', border: 'none', background: activeCategoryId === cat.id ? 'var(--gold-accent)' : 'var(--card-bg)', color: activeCategoryId === cat.id ? '#FFF' : 'var(--text-muted)', fontSize: '13px', fontWeight: '600', cursor: 'pointer', boxShadow: activeCategoryId === cat.id ? '0 4px 12px rgba(195, 157, 85, 0.3)' : 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CategoryIcon id={cat.id} size={13} />{cat.name}
            </button>
          ))}
        </div>

        {/* List Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', marginBottom: '12px' }}>
          <div className="section-title" style={{ margin: 0 }}>サブスクリプション一覧</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => setIsEditMode(!isEditMode)} style={{ background: 'none', border: 'none', color: 'var(--gold-accent)', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              {isEditMode ? '完了' : '編集'}
            </button>
            <button onClick={onAddClick} style={{ width: '28px', height: '28px', borderRadius: '14px', backgroundColor: 'var(--card-bg)', color: 'var(--gold-accent)', border: '1.5px solid var(--gold-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(195, 157, 85, 0.2)' }}>
              <span style={{ transform: 'translateY(-1px)' }}>+</span>
            </button>
          </div>
        </div>

        {/* 検索・ソートバー */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {/* 検索 */}
          <div style={{ flex: 1, position: 'relative' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="サービス名で検索"
              style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-main)', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>
          {/* ソート */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              style={{ padding: '10px 12px', borderRadius: '12px', border: '1px solid var(--border-color)', background: sortId !== 'default' ? 'var(--gold-accent-light)' : 'var(--input-bg)', color: sortId !== 'default' ? 'var(--gold-accent)' : 'var(--text-muted)', fontSize: '13px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="9" y2="18"/></svg>
              {currentSortLabel}
            </button>
            {isSortOpen && (
              <div className="soft-card" style={{ position: 'absolute', right: 0, top: '44px', zIndex: 50, minWidth: '160px', padding: '8px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { setSortId(opt.id); setIsSortOpen(false); }}
                    style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px', background: sortId === opt.id ? 'var(--gold-accent-light)' : 'none', color: sortId === opt.id ? 'var(--gold-accent)' : 'var(--text-main)', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: sortId === opt.id ? '600' : '400', cursor: 'pointer' }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredSubscriptions.map(sub => {
            const cat = getCategoryById(sub.categoryId);
            const cycle = getBillingCycleById(sub.billingCycle);
            const monthlyEquiv = getMonthlyPrice(sub, exchangeRate);
            const actualPrice = getConvertedPrice(sub, exchangeRate);
            const isNonMonthly = sub.billingCycle && sub.billingCycle !== 'monthly';

            return (
              <div key={sub.id} className="soft-card" onClick={() => !isEditMode && setDetailSub(sub)} style={{ margin: 0, padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: sub.isPaused ? 0.5 : 1, transition: 'opacity 0.2s', cursor: isEditMode ? 'default' : 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="icon-box" style={{ width: '52px', height: '52px', borderRadius: '16px', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: 'var(--input-bg)', border: `1.5px solid ${cat.color}`, position: 'relative' }}>
                    <span style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, color: cat.color }}><CategoryIcon id={cat.id} size={24} /></span>
                    {sub.domain && (
                      <img src={getLogoUrl(sub.domain)} alt={sub.name} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 2, backgroundColor: 'var(--card-bg)' }} onError={(e) => { e.target.style.display = 'none'; }} />
                    )}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-main)' }}>{sub.name}</div>
                      {sub.isPaused && <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '6px', background: 'var(--border-color)', color: 'var(--text-muted)', fontWeight: '600' }}>停止中</span>}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      <span style={{ color: cat.color }}>●</span> {cat.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--gold-accent)', marginTop: '2px', fontWeight: '600' }}>
                      {getRenewalLabel(sub)}
                    </div>
                    {sub.trialEndDate && (() => {
                      const diff = Math.ceil((new Date(sub.trialEndDate) - new Date()) / (1000 * 60 * 60 * 24));
                      if (diff < 0) return null;
                      return (
                        <div style={{ fontSize: '10px', marginTop: '3px', padding: '2px 8px', borderRadius: '6px', display: 'inline-block', background: diff <= 3 ? 'rgba(255,68,68,0.1)' : 'rgba(255,165,0,0.1)', color: diff <= 3 ? '#FF4444' : '#FF8C00', fontWeight: '700' }}>
                          {diff === 0 ? 'トライアル最終日！' : `トライアル残り${diff}日`}
                        </div>
                      );
                    })()}
                    {sub.cancelDeadline && (() => {
                      const diff = Math.ceil((new Date(sub.cancelDeadline) - new Date()) / (1000 * 60 * 60 * 24));
                      if (diff < 0) return null;
                      return (
                        <div style={{ fontSize: '10px', marginTop: '3px', padding: '2px 8px', borderRadius: '6px', display: 'inline-block', background: diff <= 3 ? 'rgba(255,68,68,0.1)' : diff <= 7 ? 'rgba(255,165,0,0.1)' : 'rgba(100,149,237,0.1)', color: diff <= 3 ? '#FF4444' : diff <= 7 ? '#FF8C00' : '#6495ED', fontWeight: '700' }}>
                          {diff === 0 ? '今日が解約期限！' : `解約期限まで${diff}日`}
                        </div>
                      );
                    })()}
                    {sub.memo && (
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '3px', fontStyle: 'italic' }}>
                        {sub.memo}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div className="gold-text" style={{ fontSize: '16px', fontWeight: '500' }}>
                      {sub.currency === 'USD' ? `$${sub.price}` : `¥${actualPrice.toLocaleString()}`}
                      <span style={{ fontSize: '11px', fontWeight: '400', marginLeft: '2px' }}>{cycle.shortLabel}</span>
                    </div>
                    {isNonMonthly && (
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>月換算 ¥{monthlyEquiv.toLocaleString()}</div>
                    )}
                    {sub.currency === 'USD' && !isNonMonthly && (
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>約¥{actualPrice.toLocaleString()}</div>
                    )}
                  </div>
                  {isEditMode ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {/* 一時停止トグル */}
                      <button onClick={() => onTogglePause(sub.id)} style={{ background: 'none', border: 'none', color: sub.isPaused ? 'var(--gold-accent)' : 'var(--text-muted)', cursor: 'pointer', padding: '4px' }} title={sub.isPaused ? '再開' : '一時停止'}>
                        {sub.isPaused ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                        )}
                      </button>
                      <button onClick={() => onEdit(sub)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button onClick={() => onDelete(sub.id)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', padding: '4px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                  )}
                </div>
              </div>
            );
          })}

          {filteredSubscriptions.length === 0 && (
            <div className="empty-state">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <rect x="16" y="14" width="48" height="52" rx="8" stroke="var(--text-muted)" strokeWidth="2" strokeDasharray="4 4" />
                <rect x="28" y="28" width="24" height="4" rx="2" fill="var(--gold-accent)" opacity="0.4" />
                <rect x="28" y="36" width="18" height="4" rx="2" fill="var(--gold-accent)" opacity="0.3" />
                <rect x="28" y="44" width="20" height="4" rx="2" fill="var(--gold-accent)" opacity="0.2" />
                <circle cx="56" cy="56" r="10" fill="var(--gold-accent)" />
                <line x1="52" y1="56" x2="60" y2="56" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="56" y1="52" x2="56" y2="60" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div className="empty-title">
                {searchQuery ? `"${searchQuery}" に一致するサービスなし` : activeCategoryId === 'all' ? 'まだサブスクが登録されていません' : `${getCategoryById(activeCategoryId).name}のサブスクなし`}
              </div>
              <div className="empty-desc">
                {searchQuery ? '別のキーワードで検索してみてください' : activeCategoryId === 'all' ? '「+」ボタンからサブスクリプションを追加して\n支出を管理しましょう' : '別のカテゴリーを選択してください'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* サブスク詳細モーダル */}
      {detailSub && (
        <SubscriptionDetail
          subscription={detailSub}
          exchangeRate={exchangeRate}
          onEdit={onEdit}
          onDelete={onDelete}
          onTogglePause={onTogglePause}
          onClose={() => setDetailSub(null)}
        />
      )}
    </>
  );
};

export default Dashboard;
