import React from 'react';
import { getCategoryById } from '../constants/categories';
import { getBillingCycleById } from '../constants/billing';
import { getConvertedPrice, getMonthlyPrice } from '../utils/currency';
import { getLogoUrl } from '../constants/presets';

const SubscriptionDetail = ({ subscription: sub, exchangeRate, onEdit, onDelete, onTogglePause, onClose }) => {
  const cat = getCategoryById(sub.categoryId);
  const cycle = getBillingCycleById(sub.billingCycle);
  const monthlyEquiv = getMonthlyPrice(sub, exchangeRate);
  const actualPrice = getConvertedPrice(sub, exchangeRate);
  const yearlyEquiv = monthlyEquiv * 12;

  const getRenewalLabel = () => {
    if (sub.billingCycle === 'monthly') return `毎月${sub.date}日`;
    if (sub.billingCycle === 'yearly') return `毎年${sub.billingMonth}月${sub.date}日`;
    return `${cycle.label} ${sub.billingMonth}月${sub.date}日〜`;
  };

  // 次回更新日までの日数
  const today = new Date();
  const billingDay = parseInt(sub.date);
  let nextDate = new Date(today.getFullYear(), today.getMonth(), billingDay);
  if (nextDate <= today) nextDate.setMonth(nextDate.getMonth() + 1);
  const daysUntilRenewal = Math.ceil((nextDate - today) / (1000 * 60 * 60 * 24));

  const trialDiff = sub.trialEndDate
    ? Math.ceil((new Date(sub.trialEndDate) - today) / (1000 * 60 * 60 * 24))
    : null;

  const cancelDiff = sub.cancelDeadline
    ? Math.ceil((new Date(sub.cancelDeadline) - today) / (1000 * 60 * 60 * 24))
    : null;

  const infoRow = (label, value, color) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
      <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ fontSize: '14px', fontWeight: '600', color: color || 'var(--text-main)' }}>{value}</span>
    </div>
  );

  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'flex-end',
      zIndex: 1000,
    }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        width: '100%',
        maxHeight: '85vh',
        overflowY: 'auto',
        backgroundColor: 'var(--card-bg)',
        borderTopLeftRadius: '32px',
        borderTopRightRadius: '32px',
        padding: '32px 24px 40px 24px',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.1)',
      }}>
        {/* ヘッダー */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '20px', fontSize: '28px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', backgroundColor: 'var(--input-bg)',
              border: '1px solid var(--border-color)', position: 'relative',
            }}>
              <span style={{ position: 'absolute', zIndex: 1 }}>{cat.icon}</span>
              {sub.domain && (
                <img
                  src={getLogoUrl(sub.domain)}
                  alt={sub.name}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 2, backgroundColor: 'var(--card-bg)' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>{sub.name}</h2>
                {sub.isPaused && (
                  <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', background: 'var(--border-color)', color: 'var(--text-muted)', fontWeight: '600' }}>停止中</span>
                )}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span style={{ color: cat.color }}>●</span> {cat.name}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}>×</button>
        </div>

        {/* 料金カード */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px',
        }}>
          <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--input-bg)', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>月額換算</div>
            <div className="gold-text" style={{ fontSize: '22px', fontWeight: '700' }}>¥{monthlyEquiv.toLocaleString()}</div>
          </div>
          <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--input-bg)', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>年間換算</div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-main)' }}>¥{yearlyEquiv.toLocaleString()}</div>
          </div>
        </div>

        {/* 詳細情報 */}
        <div style={{ marginBottom: '24px' }}>
          {infoRow('料金', sub.currency === 'USD' ? `$${sub.price}（約¥${actualPrice.toLocaleString()}）` : `¥${actualPrice.toLocaleString()}${cycle.shortLabel}`)}
          {infoRow('支払いサイクル', cycle.label)}
          {infoRow('次回更新', getRenewalLabel())}
          {infoRow('更新まで', `${daysUntilRenewal}日`, daysUntilRenewal <= 3 ? '#FF4444' : 'var(--gold-accent)')}
          {sub.isReminderEnabled !== false && infoRow('リマインダー', (sub.reminderDays || []).map(d => d === 0 ? '当日' : `${d}日前`).join(', '))}
        </div>

        {/* トライアル / 解約期限 アラート */}
        {trialDiff !== null && trialDiff >= 0 && (
          <div style={{
            padding: '14px 16px', borderRadius: '14px', marginBottom: '12px',
            background: trialDiff <= 3 ? 'rgba(255,68,68,0.1)' : 'rgba(255,165,0,0.1)',
            border: `1px solid ${trialDiff <= 3 ? 'rgba(255,68,68,0.3)' : 'rgba(255,165,0,0.3)'}`,
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <span style={{ fontSize: '20px' }}>⏳</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: trialDiff <= 3 ? '#FF4444' : '#FF8C00' }}>
                {trialDiff === 0 ? 'トライアル最終日！' : `トライアル残り${trialDiff}日`}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{sub.trialEndDate} に自動課金</div>
            </div>
          </div>
        )}

        {cancelDiff !== null && cancelDiff >= 0 && (
          <div style={{
            padding: '14px 16px', borderRadius: '14px', marginBottom: '12px',
            background: cancelDiff <= 3 ? 'rgba(255,68,68,0.1)' : cancelDiff <= 7 ? 'rgba(255,165,0,0.1)' : 'rgba(100,149,237,0.1)',
            border: `1px solid ${cancelDiff <= 3 ? 'rgba(255,68,68,0.3)' : cancelDiff <= 7 ? 'rgba(255,165,0,0.3)' : 'rgba(100,149,237,0.3)'}`,
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <span style={{ fontSize: '20px' }}>🔔</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: cancelDiff <= 3 ? '#FF4444' : cancelDiff <= 7 ? '#FF8C00' : '#6495ED' }}>
                {cancelDiff === 0 ? '今日が解約期限！' : `解約期限まで${cancelDiff}日`}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{sub.cancelDeadline} までに解約</div>
            </div>
          </div>
        )}

        {/* メモ */}
        {sub.memo && (
          <div style={{ padding: '14px 16px', borderRadius: '14px', background: 'var(--input-bg)', marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>メモ</div>
            <div style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{sub.memo}</div>
          </div>
        )}

        {/* アクションボタン */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => { onClose(); onTogglePause(sub.id); }}
            style={{
              flex: 1, padding: '14px', borderRadius: '14px',
              border: '1.5px solid var(--border-color)',
              background: 'var(--card-bg)',
              color: sub.isPaused ? 'var(--gold-accent)' : 'var(--text-muted)',
              fontSize: '14px', fontWeight: '700', cursor: 'pointer',
            }}
          >
            {sub.isPaused ? '再開する' : '一時停止'}
          </button>
          <button
            onClick={() => { onClose(); onEdit(sub); }}
            style={{
              flex: 1, padding: '14px', borderRadius: '14px',
              border: 'none',
              background: 'var(--gold-accent)',
              color: '#FFF',
              fontSize: '14px', fontWeight: '700', cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(195, 157, 85, 0.3)',
            }}
          >
            編集する
          </button>
        </div>
        <button
          onClick={() => { onClose(); onDelete(sub.id); }}
          style={{
            width: '100%', marginTop: '10px', padding: '12px', borderRadius: '14px',
            border: '1.5px solid rgba(255,68,68,0.3)',
            background: 'rgba(255,68,68,0.05)',
            color: '#FF4444',
            fontSize: '14px', fontWeight: '600', cursor: 'pointer',
          }}
        >
          削除する
        </button>
      </div>
    </div>
  );
};

export default SubscriptionDetail;
