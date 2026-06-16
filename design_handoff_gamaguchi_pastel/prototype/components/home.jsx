/* home.jsx — ホーム画面（サマリ + サブスク一覧） */

function SummaryCard({ showLegend }) {
  const total = window.totalMonthly();
  const budget = window.BUDGET;
  const pct = Math.min(100, Math.round((total / budget) * 100));
  const remain = budget - total;
  const cats = window.byCategory();
  const delta = 1200; // 先月比（モック）

  return (
    <div className="soft-card summary-card">
      <div className="summary-top">
        <span className="summary-label">今月の支出</span>
        <span className="summary-chip">
          <window.IconWallet size={14} sw={1.7} />
          {window.SUBS.length}件
        </span>
      </div>

      <div className="summary-amount-row">
        <span className="total-amount">{window.yen(total)}</span>
        <span className="total-unit">/月</span>
        <span className="delta-chip">
          <window.IconArrowUp size={12} sw={2.2} />
          {window.yen(delta)}
        </span>
      </div>
      <div className="summary-sub">年間 約{window.yen(total * 12)} · 先月比 +{window.yen(delta)}</div>

      <div className="budget-block">
        <div className="budget-meta">
          <span>予算 {window.yen(budget)}</span>
          <span className="budget-pct">{pct}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: pct + "%" }} />
        </div>
        <div className="budget-remain">残り {window.yen(remain)}</div>
      </div>

      {showLegend && (
        <React.Fragment>
          <div className="stack-bar">
            {cats.map((c) => (
              <div key={c.id} className="stack-seg" title={c.name}
                style={{ flex: c.total, background: c.color }} />
            ))}
          </div>
          <div className="stack-legend">
            {cats.slice(0, 3).map((c) => (
              <span key={c.id} className="legend-item">
                <window.Dot color={c.color} /> {c.name}
                <b>{window.yen(c.total)}</b>
              </span>
            ))}
            <span className="legend-item legend-more">他{cats.length - 3}カテゴリ</span>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

function SubItem({ sub }) {
  const cat = window.CATEGORIES[sub.cat];
  return (
    <div className="sub-item">
      <window.ServiceIcon sub={sub} />
      <div className="sub-body">
        <div className="sub-name-row">
          <span className="sub-name">{sub.name}</span>
          {sub.trial && <span className="trial-badge">体験中</span>}
        </div>
        <div className="sub-meta">
          <window.Dot color={cat.color} size={7} />
          <span>{cat.name}</span>
          <span className="meta-dot">·</span>
          <span>毎月{sub.day}日</span>
        </div>
      </div>
      <div className="sub-price">
        <span className="price-num">{window.yen(sub.price)}</span>
        <span className="price-unit">/月</span>
      </div>
    </div>
  );
}

function HomeScreen({ density, showLegend }) {
  const [q, setQ] = React.useState("");
  const [filter, setFilter] = React.useState("all");
  const chips = [{ id: "all", name: "すべて" }, ...window.byCategory().map((c) => ({ id: c.id, name: c.name }))];

  let list = window.SUBS.slice().sort((a, b) => b.price - a.price);
  if (filter !== "all") list = list.filter((s) => s.cat === filter);
  if (q.trim()) list = list.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className={"dashboard " + density}>
      <div className="app-header">
        <div>
          <div className="header-hello">おかえりなさい</div>
          <h1 className="header-title">ホーム</h1>
        </div>
        <div className="header-actions">
          <button className="ghost-btn" aria-label="通知"><window.IconBell size={20} /></button>
          <button className="add-btn" aria-label="追加"><window.IconPlus size={18} sw={2.2} /></button>
        </div>
      </div>

      <SummaryCard showLegend={showLegend} />

      <window.SectionTitle right={<button className="text-btn">編集</button>}>
        登録中のサービス
      </window.SectionTitle>

      <div className="search-bar">
        <window.IconSearch size={18} sw={1.8} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="サービスを検索" />
      </div>

      <div className="chip-row">
        {chips.map((c) => (
          <button key={c.id}
            className={"chip" + (filter === c.id ? " chip-on" : "")}
            onClick={() => setFilter(c.id)}>{c.name}</button>
        ))}
      </div>

      <div className="sub-list">
        {list.map((s) => <div className="soft-card sub-card" key={s.id}><SubItem sub={s} /></div>)}
        {list.length === 0 && <div className="empty">該当するサービスがありません</div>}
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen });
