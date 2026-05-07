import React, { useState } from 'react';
import { CATEGORIES } from '../constants/categories';
import { PRESET_SUBSCRIPTIONS, getLogoUrl } from '../constants/presets';
import { BILLING_CYCLES } from '../constants/billing';
import CategoryIcon from './CategoryIcon';

const selectStyle = {
  padding: '16px',
  borderRadius: '12px',
  border: '1px solid var(--border-color)',
  background: 'var(--input-bg)',
  color: 'var(--text-main)',
  fontSize: '16px',
  outline: 'none',
  width: '100%',
};

const inputStyle = {
  width: '100%',
  padding: '16px',
  borderRadius: '12px',
  border: '1px solid var(--border-color)',
  background: 'var(--input-bg)',
  color: 'var(--text-main)',
  fontSize: '16px',
};

const AddSubscription = ({ onSave, onCancel, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [price, setPrice] = useState(initialData?.price?.toString() || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || CATEGORIES[0].id);
  const [domain, setDomain] = useState(initialData?.domain || '');
  const [currency, setCurrency] = useState(initialData?.currency || 'JPY');
  const [billingCycle, setBillingCycle] = useState(initialData?.billingCycle || 'monthly');
  const [billingMonth, setBillingMonth] = useState(initialData?.billingMonth || new Date().getMonth() + 1);
  const [isReminderEnabled, setIsReminderEnabled] = useState(initialData?.isReminderEnabled !== false);
  const [reminderDays, setReminderDays] = useState(initialData?.reminderDays || [7, 3, 0]);
  const [memo, setMemo] = useState(initialData?.memo || '');
  const [trialEndDate, setTrialEndDate] = useState(initialData?.trialEndDate || '');
  const [cancelDeadline, setCancelDeadline] = useState(initialData?.cancelDeadline || '');

  const isMonthly = billingCycle === 'monthly';

  const toggleReminderDay = (day) => {
    if (reminderDays.includes(day)) {
      setReminderDays(reminderDays.filter(d => d !== day));
    } else {
      setReminderDays([...reminderDays, day].sort((a, b) => b - a));
    }
  };

  const handlePresetSelect = (preset) => {
    setName(preset.name);
    setPrice(preset.price.toString());
    setCategoryId(preset.categoryId);
    setDomain(preset.domain);
    setCurrency('JPY');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !date) return;
    onSave({
      ...(initialData ? { id: initialData.id } : {}),
      name,
      price: currency === 'JPY' ? parseInt(price) : parseFloat(price),
      date,
      categoryId,
      domain,
      currency,
      billingCycle,
      billingMonth: isMonthly ? 1 : parseInt(billingMonth),
      isReminderEnabled,
      reminderDays,
      memo,
      trialEndDate,
      cancelDeadline,
    });
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'flex-end',
      zIndex: 1000
    }}>
      <div style={{
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        backgroundColor: 'var(--card-bg)',
        borderTopLeftRadius: '32px',
        borderTopRightRadius: '32px',
        padding: '32px 24px 40px 24px',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)' }}>
            {initialData ? 'サブスクを編集' : 'サブスクを追加'}
          </h2>
          <button onClick={onCancel} style={{ background: 'none', border: 'none', fontSize: '24px', color: 'var(--text-muted)', cursor: 'pointer' }}>×</button>
        </div>

        {/* Preset Selection */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '12px' }}>有名サブスクから選ぶ</label>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '16px', paddingBottom: '8px' }} className="no-scrollbar">
            {PRESET_SUBSCRIPTIONS.filter(preset => preset.categoryId === categoryId).length === 0 && (
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', padding: '16px 0' }}>このカテゴリーにはプリセットがありません</div>
            )}
            {PRESET_SUBSCRIPTIONS.filter(preset => preset.categoryId === categoryId).map(preset => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', width: '64px' }}
              >
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px',
                  backgroundColor: 'var(--input-bg)',
                  border: name === preset.name ? '2px solid var(--gold-accent)' : '1px solid var(--border-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', transition: 'all 0.2s', position: 'relative'
                }}>
                  <CategoryIcon id={preset.categoryId} size={24} color={CATEGORIES.find(c => c.id === preset.categoryId)?.color || 'var(--text-muted)'} />
                  {preset.domain && (
                    <img
                      src={getLogoUrl(preset.domain)}
                      alt={preset.name}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px', backgroundColor: 'var(--card-bg)' }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                </div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* サービス名 */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>サービス名</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Netflix, Spotifyなど"
              style={inputStyle}
              required
            />
          </div>

          {/* カテゴリー */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>カテゴリー</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategoryId(cat.id)}
                  style={{
                    padding: '8px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '600',
                    cursor: 'pointer', transition: 'all 0.2s ease',
                    display: 'flex', alignItems: 'center', gap: '4px',
                    border: categoryId === cat.id ? '1.5px solid var(--gold-accent)' : '1.5px solid var(--border-color)',
                    background: categoryId === cat.id ? 'var(--gold-accent-light)' : 'var(--card-bg)',
                    color: categoryId === cat.id ? 'var(--gold-accent)' : 'var(--text-muted)',
                  }}
                >
                  <CategoryIcon id={cat.id} size={15} />
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* 支払いサイクル */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>支払いサイクル</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {BILLING_CYCLES.map(cycle => (
                <button
                  key={cycle.id}
                  type="button"
                  onClick={() => setBillingCycle(cycle.id)}
                  style={{
                    padding: '8px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600',
                    cursor: 'pointer', transition: 'all 0.2s ease',
                    border: billingCycle === cycle.id ? '1.5px solid var(--gold-accent)' : '1.5px solid var(--border-color)',
                    background: billingCycle === cycle.id ? 'var(--gold-accent-light)' : 'var(--card-bg)',
                    color: billingCycle === cycle.id ? 'var(--gold-accent)' : 'var(--text-muted)',
                  }}
                >
                  {cycle.label}
                </button>
              ))}
            </div>
            {!isMonthly && (
              <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-muted)', padding: '8px 12px', background: 'var(--gold-accent-light)', borderRadius: '8px' }}>
                月換算: {price ? `¥${Math.round((currency === 'USD' ? parseFloat(price) * 150 : parseFloat(price)) / BILLING_CYCLES.find(c => c.id === billingCycle).divisor).toLocaleString()}` : '—'} /月
              </div>
            )}
          </div>

          {/* 料金・通貨 / 更新日 */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>料金と通貨</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={{ ...selectStyle, width: 'auto', flexShrink: 0 }}>
                  <option value="JPY">¥</option>
                  <option value="USD">$</option>
                </select>
                <input
                  type="number"
                  step={currency === 'USD' ? '0.01' : '1'}
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder={currency === 'JPY' ? '1490' : '9.99'}
                  style={inputStyle}
                  required
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>
                更新日 (日)
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="20"
                style={inputStyle}
                required
              />
            </div>
          </div>

          {/* 月払い以外: 課金月の選択 */}
          {!isMonthly && (
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>
                最初の課金月
                <span style={{ fontWeight: '400', marginLeft: '6px' }}>
                  ({billingCycle === 'quarterly' ? '以降3ヶ月ごと' : billingCycle === 'semi-annual' ? '以降6ヶ月ごと' : '毎年この月'})
                </span>
              </label>
              <select value={billingMonth} onChange={(e) => setBillingMonth(e.target.value)} style={selectStyle}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                  <option key={m} value={m}>{m}月</option>
                ))}
              </select>
            </div>
          )}

          {/* 通知リマインダー */}
          <div style={{ padding: '16px', borderRadius: '16px', backgroundColor: 'var(--input-bg)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>通知リマインダー</div>
              <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                <input
                  type="checkbox"
                  checked={isReminderEnabled}
                  onChange={() => setIsReminderEnabled(!isReminderEnabled)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                  backgroundColor: isReminderEnabled ? 'var(--gold-accent)' : '#CCC',
                  transition: '.4s', borderRadius: '24px'
                }}>
                  <span style={{
                    position: 'absolute', height: '18px', width: '18px',
                    left: '3px', bottom: '3px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%',
                    transform: isReminderEnabled ? 'translateX(20px)' : 'translateX(0)'
                  }} />
                </span>
              </label>
            </div>
            {isReminderEnabled && (
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>通知するタイミング（複数選択可）</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[
                    { label: '7日前', value: 7 },
                    { label: '3日前', value: 3 },
                    { label: '1日前', value: 1 },
                    { label: '当日', value: 0 },
                  ].map(option => {
                    const isSelected = reminderDays.includes(option.value);
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => toggleReminderDay(option.value)}
                        style={{
                          padding: '6px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: '600',
                          cursor: 'pointer', transition: 'all 0.2s',
                          border: isSelected ? '1.5px solid var(--gold-accent)' : '1.5px solid var(--border-color)',
                          backgroundColor: isSelected ? 'var(--gold-accent-light)' : 'var(--card-bg)',
                          color: isSelected ? 'var(--gold-accent)' : 'var(--text-muted)',
                        }}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ドメイン */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>ドメイン（オプション）</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com（ロゴ表示に使用）"
              style={inputStyle}
            />
          </div>

          {/* 無料トライアル */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>無料トライアル終了日（オプション）</label>
            <input
              type="date"
              value={trialEndDate}
              onChange={(e) => setTrialEndDate(e.target.value)}
              style={inputStyle}
            />
            {trialEndDate && (() => {
              const diff = Math.ceil((new Date(trialEndDate) - new Date()) / (1000 * 60 * 60 * 24));
              return (
                <div style={{ marginTop: '6px', fontSize: '12px', padding: '8px 12px', borderRadius: '8px', background: diff <= 3 ? 'rgba(255,68,68,0.1)' : 'var(--gold-accent-light)', color: diff <= 3 ? '#FF4444' : 'var(--gold-accent)', fontWeight: '600' }}>
                  {diff > 0 ? `あと${diff}日で自動課金されます` : diff === 0 ? '今日が最終日です！' : 'トライアルは終了しています'}
                </div>
              );
            })()}
          </div>

          {/* 解約期限 */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>解約期限日（オプション）</label>
            <input
              type="date"
              value={cancelDeadline}
              onChange={(e) => setCancelDeadline(e.target.value)}
              style={inputStyle}
            />
            {cancelDeadline && (() => {
              const diff = Math.ceil((new Date(cancelDeadline) - new Date()) / (1000 * 60 * 60 * 24));
              return (
                <div style={{ marginTop: '6px', fontSize: '12px', padding: '8px 12px', borderRadius: '8px', background: diff <= 3 ? 'rgba(255,68,68,0.1)' : diff <= 7 ? 'rgba(255,165,0,0.1)' : 'var(--gold-accent-light)', color: diff <= 3 ? '#FF4444' : diff <= 7 ? '#FF8C00' : 'var(--gold-accent)', fontWeight: '600' }}>
                  {diff > 0 ? `解約期限まであと${diff}日` : diff === 0 ? '今日が解約期限です！' : '解約期限を過ぎています'}
                </div>
              );
            })()}
          </div>

          {/* メモ */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>メモ（オプション）</label>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="解約予定、家族と共有中など"
              rows={2}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.5' }}
            />
          </div>

          <button type="submit" style={{
            marginTop: '12px',
            backgroundColor: 'var(--gold-accent)',
            color: '#FFFFFF',
            padding: '18px',
            borderRadius: '16px',
            border: 'none',
            fontSize: '18px',
            fontWeight: '700',
            boxShadow: '0 8px 20px rgba(195, 157, 85, 0.3)',
            cursor: 'pointer',
          }}>
            保存する
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubscription;
