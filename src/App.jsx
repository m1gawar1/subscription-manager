import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import AddSubscription from './components/AddSubscription';
import Analysis from './pages/Analysis';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';
import { THEMES } from './constants/themes';
import { getMonthlyPrice } from './utils/currency';

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

      return newSub;
    });
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(150);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('subsc_theme') || 'default';
  });

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
    const root = document.documentElement;
    const selectedTheme = THEMES[theme] || THEMES.default;
    if (!THEMES[theme] && theme !== 'default') setTheme('default');
    Object.entries(selectedTheme.variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('subsc_data', JSON.stringify(subscriptions));
  }, [subscriptions]);

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

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <div style={{ height: 'calc(100% - 80px)', overflow: 'hidden' }}>
          {activeTab === 'home' && (
            <Dashboard
              subscriptions={subscriptions}
              onAddClick={() => { setEditingSub(null); setIsModalOpen(true); }}
              onDelete={deleteSubscription}
              onEdit={(sub) => { setEditingSub(sub); setIsModalOpen(true); }}
              onTogglePause={togglePauseSubscription}
              exchangeRate={exchangeRate}
              budget={budget}
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
            />
          )}
        </div>

        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          <div className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          </div>
          <div className={`nav-item ${activeTab === 'analysis' ? 'active' : ''}`} onClick={() => setActiveTab('analysis')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
          </div>
          <div className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => setActiveTab('calendar')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
          <div className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
          </div>
        </nav>

        {isModalOpen && (
          <AddSubscription
            onSave={saveSubscription}
            onCancel={() => { setIsModalOpen(false); setEditingSub(null); }}
            initialData={editingSub}
          />
        )}
      </div>
    </div>
  );
}

export default App;
