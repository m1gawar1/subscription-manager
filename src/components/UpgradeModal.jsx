import React from 'react';

const FEATURES = [
  { icon: '∞', label: 'サブスク登録数 無制限' },
  { icon: '🚫', label: '広告なし' },
  { icon: '✏️', label: '全機能アンロック' },
  { icon: '💾', label: '買い切り・追加費用なし' },
];

const UpgradeModal = ({ onPurchase, onRestore, onClose }) => {
  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      zIndex: 1100,
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '28px 28px 0 0',
        padding: '32px 24px 48px',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.2)',
      }}>
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            background: 'var(--input-bg)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            fontSize: '18px',
          }}
        >
          ×
        </button>

        {/* ヘッダー */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>👑</div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--gold-accent)', letterSpacing: '-0.5px' }}>
            SubsTracker Pro
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px' }}>
            一度の購入で、ずっと快適に
          </div>
        </div>

        {/* 機能リスト */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'var(--gold-accent-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                flexShrink: 0,
              }}>
                {f.icon}
              </div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-main)' }}>
                {f.label}
              </div>
            </div>
          ))}
        </div>

        {/* 購入ボタン */}
        <button
          onClick={onPurchase}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '16px',
            border: 'none',
            background: 'linear-gradient(135deg, var(--gold-accent), #b8860b)',
            color: '#FFF',
            fontSize: '17px',
            fontWeight: '800',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(195, 157, 85, 0.45)',
            marginBottom: '14px',
            letterSpacing: '0.02em',
          }}
        >
          ¥1,000 で購入する
        </button>

        {/* 復元ボタン */}
        <button
          onClick={onRestore}
          style={{
            display: 'block',
            width: '100%',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '13px',
            cursor: 'pointer',
            textAlign: 'center',
            padding: '4px',
          }}
        >
          以前の購入を復元する
        </button>
      </div>
    </div>
  );
};

export default UpgradeModal;
