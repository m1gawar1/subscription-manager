import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import AddSubscription from './components/AddSubscription';
import Onboarding from './components/Onboarding';
import Analysis from './pages/Analysis';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';
import { THEMES } from './constants/themes';
import { getMonthlyPrice } from './utils/currency';
import { requestNotificationPermission, scheduleAllNotifications } from './utils/notifications';
import { initializeAdMob, showBannerAd, hideBannerAd, showRewardedAd } from './utils/ads';
import { purchasePro, restorePurchases, initializePurchases, checkProStatus } from './utils/purchase';
import UpgradeModal from './components/UpgradeModal';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem('subsc_data');
    const initialData = [
      { id: 1, name: 'Netflix', price: 790, categoryId: 'video', domain: 'netflix.com', date: '18' },
      { id: 2, name: 'Spotify', price: 980, categoryId: 'music', domain: 'spotify.com', date: '22' },
      { id: 3, name: 'Adobe Creative Cloud', price: 6480, categoryId: 'work', domain: 'adobe.com', date: '05' },
    ];

    let data;
    try {
      data = saved ? JSON.parse(saved) : initialData;
    } catch {
      data = initialData;
    }

    return data.map(sub => {
      const newSub = { ...sub };
      const normalizedName = (newSub.name || '').toLowerCase().trim();

      if (!newSub.domain) {
        if (normalizedName === 'netflix') newSub.domain = 'netflix.com';
        else if (normalizedName === 'spotify') newSub.domain = 'spotify.com';
        else if (normalizedName.includes('adobe')) newSub.domain = 'adobe.com';
        else if (normalizedName.includes('amazon')) newSub.domain = 'amazon.co.jp';
        else if (normalizedName.includes('youtube')) newSub.domain = 'youtube.com';
      }

      if (newSub.category && !newSub.categoryId) {
        const catMap = {
          'ENTERTAINMENT': 'video',
          'MUSIC': 'music',
          'WORK': 'work',
          'SHOPPING': 'shopping',
          'UTILITY': 'cloud'
        };
        newSub.categoryId = catMap[newSub.category] || 'other';
        delete newSub.category;
      }

      // カテゴリマイグレーション (entertainment -> video, utility -> cloud, professional -> work)
      if (newSub.categoryId === 'entertainment') newSub.categoryId = 'video';
      if (newSub.categoryId === 'utility') newSub.categoryId = 'cloud';
      if (newSub.categoryId === 'professional') newSub.categoryId = 'work';

      // Data Migration
      if (!newSub.currency) newSub.currency = 'JPY';
      if (newSub.isReminderEnabled === undefined) newSub.isReminderEnabled = true;
      if (!newSub.reminderDays) newSub.reminderDays = [7, 3, 0];
      if (!newSub.billingCycle) newSub.billingCycle = 'monthly';
      if (!newSub.billingMonth) newSub.billingMonth = 1;
      if (newSub.isPaused === undefined) newSub.isPaused = false;
      if (newSub.memo === undefined) newSub.memo = '';
      if (newSub.trialEndDate === undefined) newSub.trialEndDate = '';
      if (newSub.cancelDeadline === undefined) newSub.cancelDeadline = '';

      return newSub;
    });
  });

  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('subsc_onboarding_done');
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(150);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const [isPro, setIsPro] = useState(() => {
    return localStorage.getItem('subsc_pro') === 'true';
  });

  const [bonusSlots, setBonusSlots] = useState(() => {
    return parseInt(localStorage.getItem('subsc_bonus_slots') || '0');
  });

  const FREE_LIMIT = 5;
  const MAX_BONUS_SLOTS = 10;
  const maxSlots = isPro ? Infinity : FREE_LIMIT + bonusSlots;
  const canAddMore = subscriptions.length < maxSlots;

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('subsc_theme') || 'auto';
  });

  // auto テーマの場合、システム設定に基づく実際のテーマを返す
  const resolvedTheme = theme === 'auto'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default')
    : theme;

  const [budget, setBudget] = useState(() => {
    return parseInt(localStorage.getItem('subsc_budget') || '0');
  });

  const [monthlyHistory, setMonthlyHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('subsc_history') || '{}');
    } catch {
      return {};
    }
  });

  // Fetch Exchange Rate
  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(res => res.json())
      .then(data => {
        if (data && data.rates && data.rates.JPY) {
          setExchangeRate(data.rates.JPY);
        }
      })
      .catch(err => console.error('Failed to fetch exchange rate:', err));
  }, []);

  useEffect(() => {
    localStorage.setItem('subsc_theme', theme);
  }, [theme]);

  // resolvedTheme（auto解決後）に基づいて CSS 変数を適用
  useEffect(() => {
    const root = document.documentElement;
    const selectedTheme = THEMES[resolvedTheme] || THEMES.default;
    Object.entries(selectedTheme.variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [resolvedTheme]);

  // システムのダークモード変更を監視（auto テーマ時にリアルタイム反映）
  useEffect(() => {
    if (theme !== 'auto') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      const root = document.documentElement;
      const newTheme = mql.matches ? 'dark' : 'default';
      const selected = THEMES[newTheme];
      Object.entries(selected.variables).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('subsc_data', JSON.stringify(subscriptions));
    scheduleAllNotifications(subscriptions);
  }, [subscriptions]);

  // 初回起動時に通知権限リクエスト & AdMob初期化 & RevenueCat初期化
  useEffect(() => {
    requestNotificationPermission();
    initializeAdMob();
    initializePurchases();
  }, []);

  // RevenueCatのエンタイトルメント状態をローカルと同期（再インストール・機種変更対応）
  useEffect(() => {
    checkProStatus().then(isProStatus => {
      if (isProStatus) setIsPro(true);
    });
  }, []);

  // プロ版でなければバナー広告を表示、プロ版なら非表示
  useEffect(() => {
    if (isPro) {
      hideBannerAd();
    } else {
      showBannerAd();
    }
  }, [isPro]);

  useEffect(() => {
    localStorage.setItem('subsc_pro', String(isPro));
  }, [isPro]);

  useEffect(() => {
    localStorage.setItem('subsc_bonus_slots', String(bonusSlots));
  }, [bonusSlots]);

  const handleWatchAd = async () => {
    if (bonusSlots >= MAX_BONUS_SLOTS) return;
    const rewarded = await showRewardedAd();
    if (rewarded) {
      setBonusSlots(prev => Math.min(prev + 1, MAX_BONUS_SLOTS));
      setIsLimitModalOpen(false);
    }
  };

  // 設定・上限モーダルから呼ばれる：アップグレードモーダルを開く
  const handleUpgradePro = () => {
    setIsUpgradeModalOpen(true);
    setIsLimitModalOpen(false);
  };

  // アップグレードモーダル内の購入ボタンから呼ばれる
  const handlePurchasePro = async () => {
    const purchased = await purchasePro();
    if (purchased) {
      setIsPro(true);
      setIsUpgradeModalOpen(false);
    }
  };

  const handleRestorePurchases = async () => {
    const restored = await restorePurchases();
    if (restored) {
      setIsPro(true);
    } else {
      alert('復元できる購入が見つかりませんでした');
    }
  };

  const handleAddClick = () => {
    if (canAddMore) {
      setEditingSub(null);
      setIsModalOpen(true);
    } else {
      setIsLimitModalOpen(true);
    }
  };

  // 月別支出履歴を記録（今月分を常に最新に更新）
  useEffect(() => {
    const now = new Date();
    const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const total = subscriptions
      .filter(sub => !sub.isPaused)
      .reduce((sum, sub) => sum + getMonthlyPrice(sub, exchangeRate), 0);
    setMonthlyHistory(prev => {
      const updated = { ...prev, [key]: total };
      localStorage.setItem('subsc_history', JSON.stringify(updated));
      return updated;
    });
  }, [subscriptions, exchangeRate]);

  const saveSubscription = (subData) => {
    if (editingSub) {
      setSubscriptions(subscriptions.map(sub => sub.id === subData.id ? subData : sub));
    } else {
      setSubscriptions([...subscriptions, { ...subData, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingSub(null);
  };

  const deleteSubscription = (id) => {
    if (window.confirm('このサブスクリプションを削除しますか？')) {
      setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    }
  };

  const togglePauseSubscription = (id) => {
    setSubscriptions(subscriptions.map(sub =>
      sub.id === id ? { ...sub, isPaused: !sub.isPaused } : sub
    ));
  };

  const handleBudgetChange = (val) => {
    setBudget(val);
    localStorage.setItem('subsc_budget', String(val));
  };

  const handleImport = (data) => {
    if (window.confirm(`${data.length}件のデータをインポートします。現在のデータは上書きされます。よろしいですか？`)) {
      setSubscriptions(data);
    }
  };

  const [tabKey, setTabKey] = useState(0);

  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      setTabKey(prev => prev + 1);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <div style={{ height: 'calc(100% - 80px)', overflow: 'hidden' }}>
          <div key={tabKey} className="tab-enter" style={{ height: '100%' }}>
            {activeTab === 'home' && (
              <Dashboard
                subscriptions={subscriptions}
                onAddClick={handleAddClick}
                onDelete={deleteSubscription}
                onEdit={(sub) => { setEditingSub(sub); setIsModalOpen(true); }}
                onTogglePause={togglePauseSubscription}
                exchangeRate={exchangeRate}
                budget={budget}
                isPro={isPro}
                maxSlots={maxSlots}
              />
            )}
            {activeTab === 'analysis' && (
              <Analysis
                subscriptions={subscriptions}
                exchangeRate={exchangeRate}
                monthlyHistory={monthlyHistory}
              />
            )}
            {activeTab === 'calendar' && <Calendar subscriptions={subscriptions} exchangeRate={exchangeRate} />}
            {activeTab === 'settings' && (
              <Settings
                currentTheme={theme}
                onThemeChange={setTheme}
                budget={budget}
                onBudgetChange={handleBudgetChange}
                subscriptions={subscriptions}
                onImport={handleImport}
                isPro={isPro}
                bonusSlots={bonusSlots}
                maxSlots={maxSlots}
                onUpgradePro={handleUpgradePro}
                onRestoreFree={() => { setIsPro(false); setBonusSlots(0); }}
                onRestorePurchases={handleRestorePurchases}
              />
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          <div className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleTabChange('home')}>
            <div className="nav-indicator" />
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            <span className="nav-label">ホーム</span>
          </div>
          <div className={`nav-item ${activeTab === 'analysis' ? 'active' : ''}`} onClick={() => handleTabChange('analysis')}>
            <div className="nav-indicator" />
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
            <span className="nav-label">分析</span>
          </div>
          <div className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => handleTabChange('calendar')}>
            <div className="nav-indicator" />
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span className="nav-label">カレンダー</span>
          </div>
          <div className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => handleTabChange('settings')}>
            <div className="nav-indicator" />
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
            <span className="nav-label">設定</span>
          </div>
        </nav>

        {isModalOpen && (
          <AddSubscription
            onSave={saveSubscription}
            onCancel={() => { setIsModalOpen(false); setEditingSub(null); }}
            initialData={editingSub}
          />
        )}

        {/* アップグレードモーダル */}
        {isUpgradeModalOpen && (
          <UpgradeModal
            onPurchase={handlePurchasePro}
            onRestore={async () => {
              const restored = await restorePurchases();
              if (restored) {
                setIsPro(true);
                setIsUpgradeModalOpen(false);
              } else {
                alert('復元できる購入が見つかりませんでした');
              }
            }}
            onClose={() => setIsUpgradeModalOpen(false)}
          />
        )}

        {/* 登録制限モーダル */}
        {isLimitModalOpen && (
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '24px',
          }}>
            <div style={{
              width: '100%',
              maxWidth: '360px',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '24px',
              padding: '32px 24px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                {bonusSlots >= MAX_BONUS_SLOTS ? '🔒' : '📦'}
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '8px' }}>
                登録枠がいっぱいです
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
                現在 {subscriptions.length}/{maxSlots === Infinity ? '∞' : maxSlots} 件登録済みです。
                <br />枠を増やして続けましょう。
              </p>

              {/* 動画視聴ボタン */}
              {bonusSlots < MAX_BONUS_SLOTS && (
                <button
                  onClick={handleWatchAd}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '14px',
                    border: '1.5px solid var(--gold-accent)',
                    background: 'var(--gold-accent-light)',
                    color: 'var(--gold-accent)',
                    fontSize: '15px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  動画を見て +1枠（残り{MAX_BONUS_SLOTS - bonusSlots}回）
                </button>
              )}

              {/* プロ版ボタン */}
              <button
                onClick={handleUpgradePro}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '14px',
                  border: 'none',
                  background: 'var(--gold-accent)',
                  color: '#FFF',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  marginBottom: '12px',
                  boxShadow: '0 4px 15px rgba(195, 157, 85, 0.4)',
                }}
              >
                プロ版にアップグレード（無制限）
              </button>

              {/* 閉じる */}
              <button
                onClick={() => setIsLimitModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  padding: '8px',
                }}
              >
                閉じる
              </button>
            </div>
          </div>
        )}

        {showOnboarding && (
          <Onboarding onComplete={() => {
            localStorage.setItem('subsc_onboarding_done', 'true');
            setShowOnboarding(false);
          }} />
        )}
      </div>
    </div>
  );
}

export default App;
