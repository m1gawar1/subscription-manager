import React from 'react';
import { CATEGORIES } from '../constants/categories';
import { getMonthlyPrice } from '../utils/currency';
import { PRESET_SUBSCRIPTIONS } from '../constants/presets';
import CategoryIcon from '../components/CategoryIcon';
import { Crown, Lock, Trophy, TrendingDown, AlertTriangle, Lightbulb, CheckCircle } from 'lucide-react';

const ProSection = ({ children, isPro, onUpgrade, style = {} }) => (
  <div className="soft-card" style={{ padding: '24px', marginBottom: '24px', position: 'relative', overflow: 'hidden', ...style }}>
    {children}
    {!isPro && (
      <div
        onClick={onUpgrade}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(6px)', backgroundColor: 'rgba(var(--card-bg-rgb, 255,255,255), 0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', borderRadius: '16px' }}
      >
        <Lock size={22} color="var(--gold-accent)" />
        <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--gold-accent)' }}>Pro版で解放</div>
      </div>
    )}
  </div>
);

const Analysis = ({ subscriptions, exchangeRate, monthlyHistory, isPro, onUpgrade }) => {
  const activeSubscriptions = subscriptions.filter(sub => !sub.isPaused);

  const totalMonthly = activeSubscriptions.reduce((sum, sub) => sum + getMonthlyPrice(sub, exchangeRate), 0);
  const totalYearly = totalMonthly * 12;

  // カテゴリー別集計
  const activeCategories = CATEGORIES.map(cat => {
    const amount = activeSubscriptions
      .filter(sub => sub.categoryId === cat.id)
      .reduce((sum, sub) => sum + getMonthlyPrice(sub, exchangeRate), 0);
    return { ...cat, amount };
  }).filter(cat => cat.amount > 0);

  // ドーナツチャートデータ
  let cumulativePercentage = 0;
  const chartData = activeCategories.map(cat => {
    const percentage = (cat.amount / totalMonthly) * 100;
    const start = cumulativePercentage;
    cumulativePercentage += percentage;
    return { ...cat, start, end: cumulativePercentage };
  });

  // 月別推移（直近6ヶ月）
  const getLast6Months = () => {
    const result = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      result.push({ key, label: `${d.getMonth() + 1}月`, amount: monthlyHistory?.[key] || 0 });
    }
    return result;
  };
  const historyData = getLast6Months();
  const maxAmount = Math.max(...historyData.map(d => d.amount), 1);
  const hasHistory = historyData.some(d => d.amount > 0);

  // ① 高額ランキング（上位5件）
  const topSubscriptions = [...activeSubscriptions]
    .map(sub => ({ ...sub, monthly: getMonthlyPrice(sub, exchangeRate) }))
    .sort((a, b) => b.monthly - a.monthly)
    .slice(0, 5);
  const maxMonthly = topSubscriptions.length > 0 ? topSubscriptions[0].monthly : 1;

  // ② 節約シミュレーター（年間コスト降順）
  const savingsData = [...activeSubscriptions]
    .map(sub => ({ ...sub, monthly: getMonthlyPrice(sub, exchangeRate) }))
    .sort((a, b) => b.monthly - a.monthly);
  const totalAnnual = savingsData.reduce((sum, s) => sum + s.monthly * 12, 0);

  // ⑨ コスト偏り警告（40%超のカテゴリ）
  const skewedCategories = totalMonthly > 0
    ? activeCategories.filter(cat => (cat.amount / totalMonthly) >= 0.4)
    : [];

  // ⑩ 年間プランお得診断
  const yearlyDeals = activeSubscriptions
    .filter(sub => sub.billingCycle === 'monthly')
    .map(sub => {
      const preset = PRESET_SUBSCRIPTIONS.find(p =>
        (p.domain && p.domain === sub.domain) || p.name === sub.name
      );
      if (!preset?.plans) return null;

      const monthlyInJPY = getMonthlyPrice(sub, exchangeRate);
      const annualIfMonthly = monthlyInJPY * 12;

      const yearlyPlans = preset.plans.filter(p => p.billingCycle === 'yearly');
      if (yearlyPlans.length === 0) return null;

      const cheapest = yearlyPlans.reduce((min, p) => {
        const priceJPY = p.currency === 'USD' ? Math.round(p.price * exchangeRate) : p.price;
        return priceJPY < min.priceJPY ? { ...p, priceJPY } : min;
      }, { priceJPY: Infinity });

      if (cheapest.priceJPY === Infinity) return null;

      const savings = annualIfMonthly - cheapest.priceJPY;
      if (savings <= 0) return null;

      return { sub, savings, yearlyPlanName: cheapest.name, yearlyPrice: cheapest.priceJPY };
    })
    .filter(Boolean)
    .sort((a, b) => b.savings - a.savings);

  const totalYearlySavings = yearlyDeals.reduce((sum, d) => sum + d.savings, 0);

  return (
    <div className="dashboard-container" style={{ height: '100%', overflowY: 'auto' }}>
      {/* Projection Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '32px' }}>
        {[
          { label: '年間', value: `¥${Math.round(totalYearly).toLocaleString()}` },
          { label: '月間', value: `¥${Math.round(totalMonthly).toLocaleString()}` },
          { label: '日間', value: `¥${Math.round(totalYearly / 365).toLocaleString()}` },
        ].map(card => (
          <div key={card.label} className="soft-card" style={{ background: 'transparent', border: '2px solid var(--gold-accent)', color: 'var(--gold-accent)', padding: '16px 8px', margin: 0, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', marginBottom: '4px', opacity: 0.9 }}>{card.label}</div>
            <div style={{ fontSize: '16px', fontWeight: '700', letterSpacing: '-0.5px' }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Pro限定コンテンツ */}
      {!isPro && (
        <div
          onClick={onUpgrade}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '16px', background: 'linear-gradient(135deg, var(--gold-accent-light), var(--card-bg))', border: '1.5px solid var(--gold-accent)', cursor: 'pointer', marginBottom: '24px' }}
        >
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--gold-accent), #b8860b)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Crown size={18} color="#FFF" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--gold-accent)' }}>Pro版で詳細分析を解放</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>高額ランキング・節約診断・支出偏り警告など → ¥1,000</div>
          </div>
          <Lock size={16} color="var(--gold-accent)" />
        </div>
      )}

      {/* 月別推移グラフ（Pro限定） */}
      <div className="soft-card" style={{ padding: '24px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
        <div className="section-title" style={{ marginBottom: '20px' }}>月別支出推移</div>
        {hasHistory ? (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
            {historyData.map((d, i) => {
              const heightPct = (d.amount / maxAmount) * 100;
              const isCurrentMonth = i === historyData.length - 1;
              return (
                <div key={d.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center' }}>
                    {d.amount > 0 ? `¥${Math.round(d.amount / 1000)}k` : ''}
                  </div>
                  <div style={{
                    width: '100%',
                    height: `${heightPct}%`,
                    minHeight: d.amount > 0 ? '4px' : '0',
                    borderRadius: '4px 4px 0 0',
                    backgroundColor: isCurrentMonth ? 'var(--gold-accent)' : 'var(--gold-accent-light)',
                    border: isCurrentMonth ? 'none' : '1px solid var(--gold-accent)',
                    transition: 'height 0.4s ease',
                  }} />
                  <div style={{ fontSize: '11px', color: isCurrentMonth ? 'var(--gold-accent)' : 'var(--text-muted)', fontWeight: isCurrentMonth ? '700' : '400' }}>
                    {d.label}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontSize: '14px' }}>
            データが蓄積されると推移が表示されます
          </div>
        )}
        {!isPro && (
          <div onClick={onUpgrade} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(6px)', backgroundColor: 'rgba(var(--card-bg-rgb, 255,255,255), 0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', borderRadius: '16px' }}>
            <Lock size={22} color="var(--gold-accent)" />
            <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--gold-accent)' }}>Pro版で解放</div>
          </div>
        )}
      </div>

      {/* カテゴリー別ドーナツチャート（Pro限定） */}
      <div className="soft-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 24px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
        <div className="section-title" style={{ width: '100%', marginBottom: '24px' }}>カテゴリー別割合</div>

        <div style={{ position: 'relative', width: '200px', height: '200px', marginBottom: '32px' }}>
          <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            {subscriptions.length === 0 ? (
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--border-color)" strokeWidth="4" />
            ) : (
              chartData.map(data => (
                <circle
                  key={data.id}
                  cx="18" cy="18" r="15.915"
                  fill="none"
                  stroke={data.color}
                  strokeWidth="4"
                  strokeDasharray={`${data.end - data.start} ${100 - (data.end - data.start)}`}
                  strokeDashoffset={-data.start}
                />
              ))
            )}
          </svg>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>合計</div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)' }}>{activeCategories.length}種</div>
          </div>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {activeCategories.map(cat => (
            <div key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'var(--input-bg)', color: 'var(--text-muted)', flexShrink: 0 }}><CategoryIcon id={cat.id} size={16} /></div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>{cat.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{Math.round((cat.amount / totalMonthly) * 100)}%</div>
                </div>
              </div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>¥{Math.round(cat.amount).toLocaleString()}</div>
            </div>
          ))}
          {activeCategories.length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>データがありません</div>
          )}
        </div>
        {!isPro && (
          <div onClick={onUpgrade} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(6px)', backgroundColor: 'rgba(255,255,255,0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', borderRadius: '16px' }}>
            <Lock size={22} color="var(--gold-accent)" />
            <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--gold-accent)' }}>Pro版で解放</div>
          </div>
        )}
      </div>

      {/* ① 高額ランキング */}
      <ProSection isPro={isPro} onUpgrade={onUpgrade}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <Trophy size={16} color="var(--gold-accent)" />
          <div className="section-title" style={{ margin: 0 }}>高額ランキング</div>
        </div>
        {topSubscriptions.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px', padding: '16px' }}>
            登録されたサブスクリプションがありません
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {topSubscriptions.map((sub, i) => (
              <div key={sub.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '22px', textAlign: 'center', fontSize: '13px', fontWeight: '700', color: i === 0 ? 'var(--gold-accent)' : 'var(--text-muted)', flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)', marginBottom: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {sub.name}
                  </div>
                  <div style={{ height: '6px', borderRadius: '3px', backgroundColor: 'var(--input-bg)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(sub.monthly / maxMonthly) * 100}%`, borderRadius: '3px', backgroundColor: i === 0 ? 'var(--gold-accent)' : 'var(--gold-accent-light)', border: i === 0 ? 'none' : '1px solid var(--gold-accent)', transition: 'width 0.4s ease' }} />
                  </div>
                </div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', flexShrink: 0 }}>
                  ¥{Math.round(sub.monthly).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </ProSection>

      {/* ⑩ 年間プランお得診断 */}
      <ProSection isPro={isPro} onUpgrade={onUpgrade}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Lightbulb size={16} color="var(--gold-accent)" />
          <div className="section-title" style={{ margin: 0 }}>年間プランお得診断</div>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px' }}>
          月払い → 年払いに切り替えると節約できるサービス
        </div>
        {yearlyDeals.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', borderRadius: '12px', backgroundColor: 'rgba(52, 199, 89, 0.1)' }}>
            <CheckCircle size={18} color="#34C759" />
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#34C759' }}>すでに最適なプランです</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>年払いで節約できるサービスは見つかりませんでした</div>
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {yearlyDeals.map((deal, i) => (
                <div key={deal.sub.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < yearlyDeals.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>{deal.sub.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      年払い ¥{Math.round(deal.yearlyPrice).toLocaleString()}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#34C759' }}>
                      年間 ¥{Math.round(deal.savings).toLocaleString()} 節約
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '12px', backgroundColor: 'var(--input-bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>全部切り替えた場合の節約額</div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#34C759' }}>¥{Math.round(totalYearlySavings).toLocaleString()}/年</div>
            </div>
          </>
        )}
      </ProSection>

      {/* ⑨ コスト偏り警告 */}
      <ProSection isPro={isPro} onUpgrade={onUpgrade}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <AlertTriangle size={16} color="var(--gold-accent)" />
          <div className="section-title" style={{ margin: 0 }}>コスト偏り警告</div>
        </div>
        {activeCategories.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px', padding: '16px' }}>
            登録されたサブスクリプションがありません
          </div>
        ) : skewedCategories.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', borderRadius: '12px', backgroundColor: 'rgba(52, 199, 89, 0.1)' }}>
            <CheckCircle size={18} color="#34C759" />
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#34C759' }}>支出バランスは良好です</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>特定カテゴリへの極端な集中はありません</div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {skewedCategories.map(cat => {
              const pct = Math.round((cat.amount / totalMonthly) * 100);
              return (
                <div key={cat.id} style={{ padding: '14px 16px', borderRadius: '12px', backgroundColor: 'rgba(255, 149, 0, 0.1)', border: '1px solid rgba(255, 149, 0, 0.3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '6px', backgroundColor: 'var(--input-bg)', color: 'var(--text-muted)', flexShrink: 0 }}>
                      <CategoryIcon id={cat.id} size={13} />
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#FF9500' }}>{cat.name}に{pct}%集中</div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    月額 ¥{Math.round(cat.amount).toLocaleString()} を {cat.name} だけに支払っています
                  </div>
                  <div style={{ marginTop: '8px', height: '4px', borderRadius: '2px', backgroundColor: 'var(--input-bg)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, borderRadius: '2px', backgroundColor: '#FF9500' }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </ProSection>

      {/* ② 節約シミュレーター */}
      <ProSection isPro={isPro} onUpgrade={onUpgrade} style={{ marginBottom: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <TrendingDown size={16} color="var(--gold-accent)" />
          <div className="section-title" style={{ margin: 0 }}>節約シミュレーター</div>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px' }}>
          解約した場合の年間節約額
        </div>
        {savingsData.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px', padding: '16px' }}>
            登録されたサブスクリプションがありません
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {savingsData.map((sub, i) => {
                const annual = Math.round(sub.monthly * 12);
                return (
                  <div key={sub.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < savingsData.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>{sub.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        ¥{Math.round(sub.monthly).toLocaleString()}/月
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#E05C5C' }}>
                        年間 ¥{annual.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>解約で節約</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '12px', backgroundColor: 'var(--input-bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>全解約した場合の年間節約</div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#E05C5C' }}>¥{Math.round(totalAnnual).toLocaleString()}</div>
            </div>
          </>
        )}
      </ProSection>
    </div>
  );
};

export default Analysis;
