import React, { useRef, useState } from 'react';
import { THEMES } from '../constants/themes';
import { Crown, Package, Lock, Bell } from 'lucide-react';

const sectionStyle = {
  marginBottom: '32px',
};

const Settings = ({ currentTheme, onThemeChange, budget, onBudgetChange, subscriptions, onImport, isPro, onUpgradePro, onRestoreFree, onRestorePurchases, notificationHour, onNotificationHourChange, notificationMinute, onNotificationMinuteChange }) => {
  const [budgetInput, setBudgetInput] = useState(budget > 0 ? budget.toString() : '');
  const [importError, setImportError] = useState('');
  const fileInputRef = useRef(null);

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    const val = parseInt(budgetInput) || 0;
    onBudgetChange(val);
  };

  const handleExport = () => {
    const json = JSON.stringify(subscriptions, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subsc-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImportError('');
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (!Array.isArray(data)) throw new Error('形式が正しくありません');
        onImport(data);
      } catch {
        setImportError('ファイルの読み込みに失敗しました。正しいJSONファイルを選択してください。');
      }
      e.target.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div className="dashboard-container">
      {/* プラン */}
      <div style={sectionStyle}>
        <div className="section-title">プラン</div>
        <div className="soft-card" style={{ margin: '16px 0 0 0', padding: '20px' }}>
          {isPro ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--gold-accent), #b8860b)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Crown size={18} color="#FFF" />
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--gold-accent)' }}>Pro版</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>登録無制限 / 広告なし</div>
                </div>
              </div>
              <button
                onClick={onRestoreFree}
                style={{ fontSize: '12px', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                無料版に戻す（デバッグ用）
              </button>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'var(--input-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Package size={18} color="var(--text-muted)" />
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)' }}>無料版</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>広告あり・基本機能のみ</div>
                </div>
              </div>
              <button
                onClick={onUpgradePro}
                style={{ width: '100%', padding: '14px', borderRadius: '14px', border: 'none', background: 'var(--gold-accent)', color: '#FFF', fontSize: '15px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 15px rgba(195, 157, 85, 0.4)' }}
              >
                <Crown size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                Pro版にアップグレード ¥1,000
              </button>
              <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>
                広告なし / 全テーマ / 詳細分析 / エクスポート（買い切り）
              </div>
              <button
                onClick={onRestorePurchases}
                style={{ display: 'block', margin: '8px auto 0', fontSize: '12px', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                購入を復元
              </button>
            </>
          )}
        </div>
      </div>

      {/* 月予算 */}
      <div style={sectionStyle}>
        <div className="section-title">月予算の設定</div>
        <div className="soft-card" style={{ margin: '16px 0 0 0', padding: '20px' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            設定するとダッシュボードに進捗バーが表示されます。0で無効になります。
          </p>
          <form onSubmit={handleBudgetSubmit} style={{ display: 'flex', gap: '8px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '16px' }}>¥</span>
              <input
                type="number"
                min="0"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                placeholder="例: 15000"
                style={{ width: '100%', padding: '12px 12px 12px 28px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-main)', fontSize: '16px', boxSizing: 'border-box' }}
              />
            </div>
            <button type="submit" style={{ padding: '12px 20px', borderRadius: '12px', backgroundColor: 'var(--gold-accent)', color: '#FFF', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              保存
            </button>
          </form>
          {budget > 0 && (
            <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--gold-accent)', fontWeight: '600' }}>
              現在の設定: ¥{budget.toLocaleString()}/月
            </div>
          )}
        </div>
      </div>

      {/* 通知時刻 */}
      <div style={sectionStyle}>
        <div className="section-title">通知設定</div>
        <div className="soft-card" style={{ margin: '16px 0 0 0', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'var(--input-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bell size={18} color="var(--text-muted)" />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-main)' }}>通知を送る時刻</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>リマインダー通知を受け取る時間帯</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <select
              value={notificationHour}
              onChange={(e) => onNotificationHourChange(parseInt(e.target.value))}
              style={{ flex: 1, padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-main)', fontSize: '16px', cursor: 'pointer', appearance: 'auto' }}
            >
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i}>{String(i).padStart(2, '0')}</option>
              ))}
            </select>
            <span style={{ fontSize: '18px', color: 'var(--text-muted)', fontWeight: '600' }}>:</span>
            <select
              value={notificationMinute}
              onChange={(e) => onNotificationMinuteChange(parseInt(e.target.value))}
              style={{ flex: 1, padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-main)', fontSize: '16px', cursor: 'pointer', appearance: 'auto' }}
            >
              {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(m => (
                <option key={m} value={m}>{String(m).padStart(2, '0')}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* データ管理（Pro限定） */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="section-title" style={{ margin: 0 }}>データ管理</div>
          {!isPro && <Lock size={13} color="var(--gold-accent)" />}
        </div>
        <div className="soft-card" style={{ margin: '16px 0 0 0', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', opacity: isPro ? 1 : 0.5, pointerEvents: isPro ? 'auto' : 'none' }}>
          {/* エクスポート */}
          <div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)', marginBottom: '4px' }}>エクスポート</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>現在のデータをJSONファイルとして保存します</div>
            <button
              onClick={handleExport}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '10px', border: '1.5px solid var(--gold-accent)', background: 'var(--gold-accent-light)', color: 'var(--gold-accent)', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              JSONでダウンロード ({subscriptions.length}件)
            </button>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)', marginBottom: '4px' }}>インポート</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>JSONファイルからデータを読み込みます（現在のデータは上書きされます）</div>
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '10px', border: '1.5px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-main)', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              ファイルを選択
            </button>
            <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportFile} style={{ display: 'none' }} />
            {importError && <div style={{ marginTop: '8px', fontSize: '12px', color: '#FF4444' }}>{importError}</div>}
          </div>
        </div>
      </div>

      {/* テーマ（Pro限定） */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="section-title" style={{ margin: 0 }}>デザインテーマ</div>
          {!isPro && <Lock size={13} color="var(--gold-accent)" />}
        </div>
        {!isPro && (
          <div style={{ marginTop: '12px', padding: '12px 16px', borderRadius: '12px', background: 'var(--gold-accent-light)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Crown size={16} color="var(--gold-accent)" />
            <div style={{ fontSize: '13px', color: 'var(--gold-accent)', fontWeight: '600' }}>Pro版ではダークモードを含む全テーマが使えます</div>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px', opacity: isPro ? 1 : 0.5, pointerEvents: isPro ? 'auto' : 'none' }}>
          {/* 自動（システム追従） */}
          <div
            className="soft-card"
            onClick={() => isPro && onThemeChange('auto')}
            style={{ margin: 0, padding: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: currentTheme === 'auto' ? '2px solid var(--gold-accent)' : '1px solid transparent', transition: 'all 0.3s ease' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #F5F6F8 50%, #121212 50%)', border: '2px solid var(--border-color)' }} />
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-main)' }}>自動</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>端末の設定に追従</div>
              </div>
            </div>
            {currentTheme === 'auto' && (
              <div className="gold-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            )}
          </div>
          {Object.entries(THEMES).map(([key, theme]) => (
            <div
              key={key}
              className="soft-card"
              onClick={() => isPro && onThemeChange(key)}
              style={{ margin: 0, padding: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: currentTheme === key ? '2px solid var(--gold-accent)' : '1px solid transparent', transition: 'all 0.3s ease' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: theme.variables['--gold-accent'], border: theme.variables['--bg-app'] === '#121212' ? '2px solid rgba(255,255,255,0.1)' : '2px solid rgba(0,0,0,0.05)' }} />
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-main)' }}>{theme.name}</div>
              </div>
              {currentTheme === key && (
                <div className="gold-text">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
