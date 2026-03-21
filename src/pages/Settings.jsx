import React, { useRef, useState } from 'react';
import { THEMES } from '../constants/themes';

const sectionStyle = {
  marginBottom: '32px',
};

const Settings = ({ currentTheme, onThemeChange, budget, onBudgetChange, subscriptions, onImport }) => {
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
    <div className="dashboard-container" style={{ paddingBottom: '100px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px', color: 'var(--text-main)' }}>設定</h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>アプリの設定を管理</p>
      </header>

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

      {/* データ管理 */}
      <div style={sectionStyle}>
        <div className="section-title">データ管理</div>
        <div className="soft-card" style={{ margin: '16px 0 0 0', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
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

      {/* テーマ */}
      <div style={sectionStyle}>
        <div className="section-title">デザインテーマ</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          {Object.entries(THEMES).map(([key, theme]) => (
            <div
              key={key}
              className="soft-card"
              onClick={() => onThemeChange(key)}
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
