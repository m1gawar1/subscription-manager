import React, { useState, useRef } from 'react';
import { CATEGORIES } from '../constants/categories';
import { PRESET_SUBSCRIPTIONS, getLogoUrl } from '../constants/presets';
import { BILLING_CYCLES } from '../constants/billing';
import CategoryIcon from './CategoryIcon';
import { Globe, ChevronDown, ChevronUp } from 'lucide-react';
import DatePicker from './DatePicker';

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: '12px',
  border: '1px solid var(--border-color)',
  background: 'var(--input-bg)',
  color: 'var(--text-main)',
  fontSize: '15px',
  boxSizing: 'border-box',
  outline: 'none',
};

const selectStyle = {
  ...inputStyle,
  width: 'auto',
};

// ── Step 1: サービス選択 ──────────────────────────────
const ServiceSelector = ({ onSelect, onCancel }) => {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  const filtered = PRESET_SUBSCRIPTIONS.filter(p => {
    const matchCat = activeCat === 'all' || p.categoryId === activeCat;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* ヘッダー */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-main)' }}>サービスを選ぶ</h2>
        <button onClick={onCancel} style={{ background: 'none', border: 'none', fontSize: '24px', color: 'var(--text-muted)', cursor: 'pointer' }}>×</button>
      </div>

      {/* 検索 */}
      <div style={{ position: 'relative', marginBottom: '12px' }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="サービス名で検索"
          style={{ ...inputStyle, paddingLeft: '36px' }}
        />
      </div>

      {/* カテゴリフィルター（差別化点） */}
      <div style={{ display: 'flex', overflowX: 'auto', gap: '6px', paddingBottom: '8px', marginBottom: '12px' }} className="no-scrollbar">
        <button
          onClick={() => setActiveCat('all')}
          style={{ flexShrink: 0, padding: '6px 14px', borderRadius: '20px', border: 'none', fontSize: '12px', fontWeight: '600', cursor: 'pointer', background: activeCat === 'all' ? 'var(--gold-accent)' : 'var(--input-bg)', color: activeCat === 'all' ? '#FFF' : 'var(--text-muted)' }}
        >
          すべて
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            style={{ flexShrink: 0, padding: '6px 12px', borderRadius: '20px', border: 'none', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', background: activeCat === cat.id ? 'var(--gold-accent)' : 'var(--input-bg)', color: activeCat === cat.id ? '#FFF' : 'var(--text-muted)' }}
          >
            <CategoryIcon id={cat.id} size={11} />
            {cat.name}
          </button>
        ))}
      </div>

      {/* サービスグリッド */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontSize: '14px' }}>
            見つかりませんでした
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', paddingBottom: '8px' }}>
            {filtered.map(preset => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelect(preset)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '2px', minWidth: 0 }}
              >
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'var(--input-bg)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                  <CategoryIcon id={preset.categoryId} size={26} color={CATEGORIES.find(c => c.id === preset.categoryId)?.color || 'var(--text-muted)'} />
                  {preset.domain && (
                    <img
                      src={getLogoUrl(preset.domain)}
                      alt={preset.name}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px', backgroundColor: 'var(--card-bg)' }}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  )}
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 手動入力 */}
      <button
        onClick={() => onSelect(null)}
        style={{ marginTop: '16px', width: '100%', padding: '14px', borderRadius: '14px', border: '1.5px dashed var(--border-color)', background: 'transparent', color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
      >
        + 手動で入力する
      </button>
    </div>
  );
};

// ── Step 1.5: プラン選択 ──────────────────────────────
const PlanSelector = ({ preset, onSelect, onBack }) => {
  const cat = CATEGORIES.find(c => c.id === preset.categoryId);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '22px', lineHeight: 1 }}>‹</button>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-main)' }}>プランを選ぶ</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: 'var(--input-bg)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
            <CategoryIcon id={preset.categoryId} size={16} color={cat?.color} />
            {preset.domain && <img src={getLogoUrl(preset.domain)} alt={preset.name} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', backgroundColor: 'var(--card-bg)' }} onError={e => { e.target.style.display = 'none'; }} />}
          </div>
          <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-main)' }}>{preset.name}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }} className="no-scrollbar">
        {preset.plans.map((plan, i) => (
          <button
            key={i}
            onClick={() => onSelect(plan)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', cursor: 'pointer', textAlign: 'left' }}
          >
            <div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-main)' }}>{plan.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                {plan.billingCycle === 'yearly' ? '年額' : '月額'}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--gold-accent)' }}>
                {plan.currency === 'USD' ? `$${plan.price}` : `¥${plan.price.toLocaleString()}`}
              </div>
              {plan.billingCycle === 'yearly' && (
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  月換算 ¥{Math.round(plan.price / 12).toLocaleString()}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ── Step 2: 詳細入力 ────────────────────────────────
const AddSubscription = ({ onSave, onCancel, initialData, defaultReminderDays = [0] }) => {
  // 編集時はdetailから始める
  const [step, setStep] = useState(initialData ? 'detail' : 'service');
  const [selectedPreset, setSelectedPreset] = useState(null);

  const [name, setName] = useState(initialData?.name || '');
  const [price, setPrice] = useState(initialData?.price?.toString() || '');
  const [date, setDate] = useState(initialData?.date || String(new Date().getDate()));
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || CATEGORIES[0].id);
  const [domain, setDomain] = useState(initialData?.domain || '');
  const [currency, setCurrency] = useState(initialData?.currency || 'JPY');
  const [billingCycle, setBillingCycle] = useState(initialData?.billingCycle || 'monthly');
  const [billingMonth, setBillingMonth] = useState(initialData?.billingMonth || new Date().getMonth() + 1);
  const [isReminderEnabled, setIsReminderEnabled] = useState(initialData?.isReminderEnabled !== false);
  const [reminderDays, setReminderDays] = useState(initialData?.reminderDays || defaultReminderDays);
  const [memo, setMemo] = useState(initialData?.memo || '');
  const [trialEndDate, setTrialEndDate] = useState(initialData?.trialEndDate || '');
  const [cancelDeadline, setCancelDeadline] = useState(initialData?.cancelDeadline || '');
  const [showOptions, setShowOptions] = useState(false);

  const isMonthly = billingCycle === 'monthly';

  // カスタムアイコン用
  const iconFileRef = useRef(null);
  const [iconUrlInput, setIconUrlInput] = useState('');

  // 選んだ画像を128px正方形に縮小・圧縮してdomainに保存（localStorage節約）
  const handleIconFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const size = 128;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        // 中央を正方形にクロップ
        const min = Math.min(img.width, img.height);
        const sx = (img.width - min) / 2;
        const sy = (img.height - min) / 2;
        ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size);
        setDomain(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // 同じファイルを再選択できるようにリセット
  };

  // URL入力を反映
  const applyIconUrl = () => {
    const url = iconUrlInput.trim();
    if (!url) return;
    setDomain(url);
    setIconUrlInput('');
  };

  // カスタムアイコンを削除（ファビコン/カテゴリーアイコンに戻す）
  const clearIcon = () => setDomain('');

  const toggleReminderDay = (day) => {
    setReminderDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day].sort((a, b) => b - a)
    );
  };

  const handlePresetSelect = (preset) => {
    if (preset) {
      setName(preset.name);
      setCategoryId(preset.categoryId);
      setDomain(preset.domain || '');
      // priceのみのサービスも1プランとして統一
      const normalized = preset.plans && preset.plans.length > 0
        ? preset
        : { ...preset, plans: [{ name: '標準プラン', price: preset.price || 0, billingCycle: 'monthly', currency: preset.currency || 'JPY' }] };
      setSelectedPreset(normalized);
      setStep('plan');
    } else {
      setSelectedPreset(null);
      setStep('detail');
    }
  };

  const handlePlanSelect = (plan) => {
    setPrice(plan.price.toString());
    setCurrency(plan.currency || 'JPY');
    setBillingCycle(plan.billingCycle || 'monthly');
    setStep('detail');
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

  const cat = CATEGORIES.find(c => c.id === categoryId);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'flex-end', zIndex: 1000 }}>
      <div style={{ width: '100%', height: '92vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--card-bg)', borderTopLeftRadius: '32px', borderTopRightRadius: '32px', padding: '24px 20px 40px', boxShadow: '0 -10px 40px rgba(0,0,0,0.1)' }}>

        {step === 'service' ? (
          <ServiceSelector onSelect={handlePresetSelect} onCancel={onCancel} />
        ) : step === 'plan' ? (
          <PlanSelector
            preset={selectedPreset}
            onSelect={handlePlanSelect}
            onBack={() => setStep('service')}
          />
        ) : (
          <div style={{ overflowY: 'auto', overflowX: 'hidden' }} className="no-scrollbar">
            {/* ヘッダー */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {!initialData && (
                  <button onClick={() => setStep(selectedPreset?.plans?.length ? 'plan' : 'service')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '22px', lineHeight: 1 }}>‹</button>
                )}
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-main)' }}>
                  {initialData ? 'サブスクを編集' : '詳細を入力'}
                </h2>
              </div>
              <button onClick={onCancel} style={{ background: 'none', border: 'none', fontSize: '24px', color: 'var(--text-muted)', cursor: 'pointer' }}>×</button>
            </div>

            {/* 選択サービス表示 */}
            {(selectedPreset || initialData) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '14px', background: 'var(--input-bg)', marginBottom: '20px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                  <CategoryIcon id={categoryId} size={20} color={cat?.color || 'var(--text-muted)'} />
                  {domain && (
                    <img src={getLogoUrl(domain)} alt={name} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', backgroundColor: 'var(--card-bg)' }} onError={e => { e.target.style.display = 'none'; }} />
                  )}
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-main)' }}>{name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{cat?.name}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

              {/* アイコン設定 */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>アイコン</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', backgroundColor: 'var(--input-bg)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                    <CategoryIcon id={categoryId} size={24} color={cat?.color || 'var(--text-muted)'} />
                    {domain && (
                      <img src={getLogoUrl(domain)} alt={name} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', backgroundColor: 'var(--card-bg)' }} onError={e => { e.target.style.display = 'none'; }} />
                    )}
                  </div>
                  <button type="button" onClick={() => iconFileRef.current?.click()} style={{ padding: '10px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', border: '1.5px solid var(--gold-accent)', background: 'var(--gold-accent-light)', color: 'var(--gold-accent)' }}>画像を選ぶ</button>
                  {domain && (
                    <button type="button" onClick={clearIcon} style={{ padding: '10px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', border: '1.5px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-muted)' }}>削除</button>
                  )}
                  <input ref={iconFileRef} type="file" accept="image/*" onChange={handleIconFile} style={{ display: 'none' }} />
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="url" value={iconUrlInput} onChange={e => setIconUrlInput(e.target.value)} placeholder="画像URLを貼り付け（任意）" style={{ ...inputStyle, flex: 1 }} />
                  <button type="button" onClick={applyIconUrl} style={{ padding: '0 18px', borderRadius: '12px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', border: '1.5px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-main)', flexShrink: 0 }}>反映</button>
                </div>
              </div>

              {/* サービス名（手動入力時） */}
              {!selectedPreset && !initialData && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>サービス名</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Netflix, Spotifyなど" style={inputStyle} required />
                </div>
              )}

              {/* カテゴリー（手動入力時） */}
              {!selectedPreset && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>カテゴリー</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {CATEGORIES.map(c => (
                      <button key={c.id} type="button" onClick={() => setCategoryId(c.id)} style={{ padding: '7px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', border: categoryId === c.id ? '1.5px solid var(--gold-accent)' : '1.5px solid var(--border-color)', background: categoryId === c.id ? 'var(--gold-accent-light)' : 'var(--card-bg)', color: categoryId === c.id ? 'var(--gold-accent)' : 'var(--text-muted)' }}>
                        <CategoryIcon id={c.id} size={13} />{c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 支払いサイクル */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>支払いサイクル</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {BILLING_CYCLES.map(cycle => (
                    <button key={cycle.id} type="button" onClick={() => setBillingCycle(cycle.id)} style={{ padding: '8px 4px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', border: billingCycle === cycle.id ? '1.5px solid var(--gold-accent)' : '1.5px solid var(--border-color)', background: billingCycle === cycle.id ? 'var(--gold-accent-light)' : 'var(--card-bg)', color: billingCycle === cycle.id ? 'var(--gold-accent)' : 'var(--text-muted)' }}>
                      {cycle.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 料金・更新日 */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>料金</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <select value={currency} onChange={e => setCurrency(e.target.value)} style={{ ...selectStyle, padding: '14px 10px' }}>
                      <option value="JPY">¥</option>
                      <option value="USD">$</option>
                    </select>
                    <input type="number" step={currency === 'USD' ? '0.01' : '1'} min="0" value={price} onChange={e => setPrice(e.target.value)} placeholder={currency === 'JPY' ? '980' : '9.99'} style={inputStyle} required />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>更新日（日）</label>
                  <input type="number" min="1" max="31" value={date} onChange={e => setDate(e.target.value)} placeholder="20" style={inputStyle} required />
                </div>
              </div>

              {!isMonthly && (
                <>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', padding: '8px 12px', background: 'var(--gold-accent-light)', borderRadius: '8px' }}>
                    月換算: {price ? `¥${Math.round((currency === 'USD' ? parseFloat(price) * 150 : parseFloat(price)) / BILLING_CYCLES.find(c => c.id === billingCycle).divisor).toLocaleString()}` : '—'} /月
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>最初の課金月</label>
                    <select value={billingMonth} onChange={e => setBillingMonth(e.target.value)} style={{ ...inputStyle }}>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(m => <option key={m} value={m}>{m}月</option>)}
                    </select>
                  </div>
                </>
              )}

              {/* 通知リマインダー */}
              <div style={{ padding: '14px 16px', borderRadius: '14px', backgroundColor: 'var(--input-bg)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>通知リマインダー</div>
                  <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                    <input type="checkbox" checked={isReminderEnabled} onChange={() => setIsReminderEnabled(!isReminderEnabled)} style={{ opacity: 0, width: 0, height: 0 }} />
                    <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: isReminderEnabled ? 'var(--gold-accent)' : '#CCC', transition: '.4s', borderRadius: '24px' }}>
                      <span style={{ position: 'absolute', height: '18px', width: '18px', left: '3px', bottom: '3px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%', transform: isReminderEnabled ? 'translateX(20px)' : 'translateX(0)' }} />
                    </span>
                  </label>
                </div>
                {isReminderEnabled && (
                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {[{ label: '7日前', value: 7 }, { label: '3日前', value: 3 }, { label: '1日前', value: 1 }, { label: '当日', value: 0 }].map(opt => {
                      const sel = reminderDays.includes(opt.value);
                      return (
                        <button key={opt.value} type="button" onClick={() => toggleReminderDay(opt.value)} style={{ padding: '6px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', border: sel ? '1.5px solid var(--gold-accent)' : '1.5px solid var(--border-color)', backgroundColor: sel ? 'var(--gold-accent-light)' : 'var(--card-bg)', color: sel ? 'var(--gold-accent)' : 'var(--text-muted)' }}>
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 詳細オプション（折りたたみ） */}
              <button
                type="button"
                onClick={() => setShowOptions(!showOptions)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '13px', fontWeight: '600', cursor: 'pointer', padding: '4px' }}
              >
                {showOptions ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {showOptions ? '詳細を閉じる' : '詳細オプション（トライアル・メモなど）'}
              </button>

              {showOptions && (
                <>
                  {/* ドメイン */}
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>
                      <Globe size={13} />ロゴ表示用ドメイン（オプション）
                    </label>
                    <input type="text" value={domain} onChange={e => setDomain(e.target.value)} placeholder="例: netflix.com" style={inputStyle} />
                  </div>

                  {/* 無料トライアル */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>無料トライアル終了日（オプション）</label>
                    <DatePicker value={trialEndDate} onChange={setTrialEndDate} placeholder="終了日を選択" />
                    {trialEndDate && (() => {
                      const diff = Math.ceil((new Date(trialEndDate) - new Date()) / (1000 * 60 * 60 * 24));
                      return <div style={{ marginTop: '6px', fontSize: '12px', padding: '8px 12px', borderRadius: '8px', background: diff <= 3 ? 'var(--warning-soft)' : 'var(--gold-accent-light)', color: diff <= 3 ? 'var(--warning)' : 'var(--gold-accent)', fontWeight: '600' }}>{diff > 0 ? `あと${diff}日で自動課金されます` : diff === 0 ? '今日が最終日です！' : 'トライアルは終了しています'}</div>;
                    })()}
                  </div>

                  {/* 解約期限 */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>解約期限日（オプション）</label>
                    <DatePicker value={cancelDeadline} onChange={setCancelDeadline} placeholder="期限日を選択" />
                    {cancelDeadline && (() => {
                      const diff = Math.ceil((new Date(cancelDeadline) - new Date()) / (1000 * 60 * 60 * 24));
                      return <div style={{ marginTop: '6px', fontSize: '12px', padding: '8px 12px', borderRadius: '8px', background: diff <= 3 ? 'var(--warning-soft)' : diff <= 7 ? 'var(--trial-soft)' : 'var(--gold-accent-light)', color: diff <= 3 ? 'var(--warning)' : diff <= 7 ? 'var(--trial)' : 'var(--gold-accent)', fontWeight: '600' }}>{diff > 0 ? `解約期限まであと${diff}日` : diff === 0 ? '今日が解約期限です！' : '解約期限を過ぎています'}</div>;
                    })()}
                  </div>

                  {/* メモ */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '8px' }}>メモ（オプション）</label>
                    <textarea value={memo} onChange={e => setMemo(e.target.value)} placeholder="解約予定、家族と共有中など" rows={2} style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.5' }} />
                  </div>
                </>
              )}

              <button type="submit" style={{ marginTop: '8px', backgroundColor: 'var(--gold-accent)', color: '#FFFFFF', padding: '16px', borderRadius: '16px', border: 'none', fontSize: '16px', fontWeight: '600', boxShadow: '0 6px 18px var(--accent-shadow)', cursor: 'pointer' }}>
                {initialData ? '保存する' : '追加する'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddSubscription;
