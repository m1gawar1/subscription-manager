/* settings.jsx — 設定画面 + フィルタ用ボトムシート */

function Row({ icon, label, sub, right, onClick, danger }) {
  return (
    <button className={"set-row" + (danger ? " danger" : "")} onClick={onClick}>
      {icon && <span className="set-ico">{icon}</span>}
      <span className="set-label">
        {label}
        {sub && <span className="set-sub">{sub}</span>}
      </span>
      <span className="set-right">{right ?? <window.IconChevron size={16} sw={1.8} />}</span>
    </button>
  );
}

function Toggle({ on }) {
  return <span className={"toggle" + (on ? " on" : "")}><span className="knob" /></span>;
}

function SettingsScreen() {
  const [notif, setNotif] = React.useState(true);
  const [autoRenew, setAutoRenew] = React.useState(true);

  return (
    <div className="dashboard">
      <div className="app-header">
        <div>
          <div className="header-hello">アプリの設定</div>
          <h1 className="header-title">設定</h1>
        </div>
      </div>

      {/* 新アイコンを主役に */}
      <div className="soft-card brand-card">
        <img className="brand-icon" src="assets/app-icon.png" alt="アプリアイコン" />
        <div className="brand-text">
          <div className="brand-name">がま口サブスク</div>
          <div className="brand-ver">バージョン 2.0 · 新デザイン</div>
        </div>
        <button className="text-btn">確認</button>
      </div>

      <div className="soft-card pro-card">
        <div className="pro-left">
          <span className="pro-crown"><window.IconCrown size={18} sw={1.7} /></span>
          <div>
            <div className="pro-title">Premium にアップグレード</div>
            <div className="pro-sub">無制限の登録・予算アラート・CSV書き出し</div>
          </div>
        </div>
        <button className="pro-btn">月額¥480</button>
      </div>

      <window.SectionTitle>表示</window.SectionTitle>
      <div className="soft-card set-group">
        <Row icon={<window.IconSun size={18} />} label="テーマ" sub="ライト" />
        <Row icon={<window.IconBolt size={18} />} label="アクセントカラー" sub="がま口パステル"
          right={<span className="swatch-mini" />} />
      </div>

      <window.SectionTitle>通知とお金</window.SectionTitle>
      <div className="soft-card set-group">
        <Row icon={<window.IconBell size={18} />} label="請求前リマインド" sub="3日前に通知"
          right={<span onClick={(e) => { e.stopPropagation(); setNotif(!notif); }}><Toggle on={notif} /></span>} />
        <Row icon={<window.IconWallet size={18} />} label="月の予算" sub="¥18,000" />
        <Row icon={<window.IconArrowUp size={18} />} label="超過アラート"
          right={<span onClick={(e) => { e.stopPropagation(); setAutoRenew(!autoRenew); }}><Toggle on={autoRenew} /></span>} />
      </div>

      <window.SectionTitle>その他</window.SectionTitle>
      <div className="soft-card set-group">
        <Row label="データを書き出す" sub="CSV" />
        <Row label="このアプリについて" />
        <Row label="すべてのデータを削除" danger right={<span />} />
      </div>
    </div>
  );
}

function FilterSheet({ open, onClose }) {
  const cats = window.byCategory();
  const [sort, setSort] = React.useState("price");
  const [active, setActive] = React.useState({});
  const toggle = (id) => setActive((a) => ({ ...a, [id]: !a[id] }));

  if (!open) return null;
  return (
    <div className="sheet-overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grip" />
        <div className="sheet-head">
          <h3>絞り込み・並び替え</h3>
          <button className="ghost-btn" onClick={onClose}><window.IconX size={18} /></button>
        </div>

        <div className="sheet-label">並び替え</div>
        <div className="chip-row wrap">
          {[["price", "金額が高い順"], ["day", "請求日が近い順"], ["name", "名前順"]].map(([id, l]) => (
            <button key={id} className={"chip" + (sort === id ? " chip-on" : "")} onClick={() => setSort(id)}>{l}</button>
          ))}
        </div>

        <div className="sheet-label">カテゴリ</div>
        <div className="chip-row wrap">
          {cats.map((c) => (
            <button key={c.id} className={"chip chip-cat" + (active[c.id] ? " chip-on" : "")} onClick={() => toggle(c.id)}>
              <window.Dot color={c.color} size={8} /> {c.name}
            </button>
          ))}
        </div>

        <button className="apply-btn" onClick={onClose}>この条件で表示</button>
      </div>
    </div>
  );
}

Object.assign(window, { SettingsScreen, FilterSheet });
