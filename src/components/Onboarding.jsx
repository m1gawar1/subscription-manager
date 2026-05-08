import React, { useState } from 'react';

const SLIDES = [
  {
    icon: (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="40" stroke="var(--gold-accent)" strokeWidth="2" opacity="0.2" />
        <circle cx="50" cy="50" r="28" stroke="var(--gold-accent)" strokeWidth="2" opacity="0.4" />
        <circle cx="50" cy="50" r="16" fill="var(--gold-accent)" opacity="0.15" />
        {/* Wallet icon */}
        <rect x="30" y="38" width="40" height="26" rx="5" stroke="var(--gold-accent)" strokeWidth="2.5" />
        <path d="M30 46h40" stroke="var(--gold-accent)" strokeWidth="2" opacity="0.5" />
        <circle cx="62" cy="54" r="3" fill="var(--gold-accent)" />
        <path d="M30 43c0-3.3 2.7-6 6-6h28" stroke="var(--gold-accent)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'SubsTrackerへようこそ',
    description: 'サブスクリプションの支出を\n一目で把握・管理できるアプリです',
  },
  {
    icon: (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <rect x="18" y="22" width="64" height="56" rx="12" stroke="var(--gold-accent)" strokeWidth="2" opacity="0.3" />
        <rect x="28" y="38" width="12" height="28" rx="4" fill="var(--gold-accent)" opacity="0.3" />
        <rect x="44" y="30" width="12" height="36" rx="4" fill="var(--gold-accent)" opacity="0.5" />
        <rect x="60" y="42" width="12" height="24" rx="4" fill="var(--gold-accent)" opacity="0.7" />
        <circle cx="34" cy="34" r="3" fill="var(--gold-accent)" />
        <circle cx="50" cy="26" r="3" fill="var(--gold-accent)" />
        <circle cx="66" cy="38" r="3" fill="var(--gold-accent)" />
        <line x1="34" y1="34" x2="50" y2="26" stroke="var(--gold-accent)" strokeWidth="1.5" />
        <line x1="50" y1="26" x2="66" y2="38" stroke="var(--gold-accent)" strokeWidth="1.5" />
      </svg>
    ),
    title: 'かんたん登録 & 分析',
    description: 'サブスクを追加するだけで\n月額・年額の合計やカテゴリ別の\n支出割合を自動で分析します',
  },
  {
    icon: (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <rect x="22" y="18" width="56" height="56" rx="12" stroke="var(--gold-accent)" strokeWidth="2" opacity="0.3" />
        <line x1="22" y1="34" x2="78" y2="34" stroke="var(--gold-accent)" strokeWidth="1.5" opacity="0.3" />
        <line x1="40" y1="18" x2="40" y2="26" stroke="var(--gold-accent)" strokeWidth="2" strokeLinecap="round" />
        <line x1="60" y1="18" x2="60" y2="26" stroke="var(--gold-accent)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="38" cy="48" r="4" fill="var(--gold-accent)" opacity="0.5" />
        <circle cx="50" cy="48" r="4" fill="var(--gold-accent)" />
        <circle cx="62" cy="48" r="4" fill="var(--gold-accent)" opacity="0.5" />
        <circle cx="38" cy="60" r="4" fill="var(--gold-accent)" opacity="0.3" />
        <circle cx="50" cy="60" r="4" fill="var(--gold-accent)" opacity="0.3" />
        <circle cx="72" cy="70" r="14" fill="var(--gold-accent)" />
        <path d="M68 70L71 73L77 67" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: '更新日を見逃さない',
    description: 'カレンダーで更新日を一覧表示。\nリマインダー通知で\nうっかり課金を防げます',
  },
  {
    icon: (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <rect x="20" y="24" width="60" height="52" rx="12" stroke="var(--gold-accent)" strokeWidth="2" opacity="0.3" />
        <circle cx="40" cy="44" r="8" stroke="var(--gold-accent)" strokeWidth="2" />
        <path d="M40 40v8l4 4" stroke="var(--gold-accent)" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="54" y="40" width="18" height="3" rx="1.5" fill="var(--gold-accent)" opacity="0.5" />
        <rect x="54" y="48" width="12" height="3" rx="1.5" fill="var(--gold-accent)" opacity="0.3" />
        <rect x="28" y="60" width="44" height="6" rx="3" fill="var(--gold-accent)" opacity="0.15" />
        <rect x="28" y="60" width="28" height="6" rx="3" fill="var(--gold-accent)" opacity="0.5" />
      </svg>
    ),
    title: '予算を設定して節約',
    description: '月の予算を設定すると\n進捗バーで使いすぎを\nひと目でチェックできます',
  },
  {
    icon: (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="46" r="26" stroke="var(--gold-accent)" strokeWidth="2" opacity="0.3" />
        <circle cx="50" cy="46" r="18" fill="var(--gold-accent)" opacity="0.1" />
        {/* Checkmark */}
        <circle cx="50" cy="46" r="14" fill="var(--gold-accent)" opacity="0.9" />
        <path d="M43 46l5 5 9-9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="30" y="76" width="40" height="6" rx="3" fill="var(--gold-accent)" />
      </svg>
    ),
    title: 'さっそく始めましょう！',
    description: 'ホーム画面の「+」ボタンから\nサブスクリプションを登録して\n支出管理を始めましょう',
  },
];

const Onboarding = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');

  const isLast = currentSlide === SLIDES.length - 1;
  const slide = SLIDES[currentSlide];

  const goNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setSlideDirection('right');
      setCurrentSlide(prev => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentSlide > 0) {
      setSlideDirection('left');
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'var(--bg-app)',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Skip button */}
      {!isLast && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 24px 0' }}>
          <button
            onClick={onComplete}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              padding: '8px 12px',
            }}
          >
            スキップ
          </button>
        </div>
      )}

      {/* Slide content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 32px',
      }}>
        <div
          key={currentSlide}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            animation: `onboardSlide${slideDirection === 'right' ? 'Right' : 'Left'} 0.35s ease-out forwards`,
          }}
        >
          <div style={{ marginBottom: '40px' }}>
            {slide.icon}
          </div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: 'var(--text-main)',
            marginBottom: '16px',
            letterSpacing: '-0.3px',
          }}>
            {slide.title}
          </h2>
          <p style={{
            fontSize: '15px',
            color: 'var(--text-muted)',
            lineHeight: '1.8',
            whiteSpace: 'pre-line',
          }}>
            {slide.description}
          </p>
        </div>
      </div>

      {/* Bottom area */}
      <div style={{ padding: '0 32px 48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Dots indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {SLIDES.map((_, i) => (
            <div
              key={i}
              onClick={() => { setSlideDirection(i > currentSlide ? 'right' : 'left'); setCurrentSlide(i); }}
              style={{
                width: i === currentSlide ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === currentSlide ? 'var(--gold-accent)' : 'var(--border-color)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {currentSlide > 0 && (
            <button
              onClick={goPrev}
              style={{
                padding: '16px 24px',
                borderRadius: '14px',
                border: '1.5px solid var(--border-color)',
                background: 'var(--card-bg)',
                color: 'var(--text-muted)',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              戻る
            </button>
          )}
          <button
            onClick={goNext}
            style={{
              flex: 1,
              padding: '16px',
              borderRadius: '14px',
              border: 'none',
              background: 'var(--gold-accent)',
              color: '#FFF',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(195, 157, 85, 0.4)',
            }}
          >
            {isLast ? 'はじめる' : '次へ'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
