/* calendar.jsx — カレンダー画面（支払日の可視化 + 直近の支払い） */
function CalendarScreen() {
  // 2026年6月: 1日=月曜と仮定（モック）。月初オフセット1。
  const daysInMonth = 30;
  const offset = 1; // 0=日曜始まり
  const billing = {};
  window.SUBS.forEach((s) => {
    (billing[s.day] = billing[s.day] || []).push(s);
  });
  const today = 15;

  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const upcoming = window.SUBS
    .map((s) => ({ ...s, until: (s.day - today + 30) % 30 }))
    .sort((a, b) => a.until - b.until)
    .slice(0, 4);

  const wd = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div className="dashboard">
      <div className="app-header">
        <div>
          <div className="header-hello">支払いの予定</div>
          <h1 className="header-title">カレンダー</h1>
        </div>
        <span className="month-pill">2026年 6月</span>
      </div>

      <div className="soft-card cal-card">
        <div className="cal-grid cal-head">
          {wd.map((w, i) => <span key={w} className={"cal-wd" + (i === 0 ? " sun" : i === 6 ? " sat" : "")}>{w}</span>)}
        </div>
        <div className="cal-grid">
          {cells.map((d, i) => {
            const subs = d ? billing[d] : null;
            return (
              <div key={i} className={"cal-cell" + (d === today ? " cal-today" : "") + (!d ? " cal-empty" : "")}>
                {d && <span className="cal-num">{d}</span>}
                {subs && (
                  <div className="cal-dots">
                    {subs.slice(0, 3).map((s) => (
                      <window.Dot key={s.id} color={window.CATEGORIES[s.cat].color} size={5} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <window.SectionTitle>まもなく請求</window.SectionTitle>
      <div className="sub-list">
        {upcoming.map((s) => (
          <div className="soft-card sub-card" key={s.id}>
            <div className="sub-item">
              <div className="cal-daybox">
                <span className="cal-daybox-num">{s.day}</span>
                <span className="cal-daybox-cap">日</span>
              </div>
              <div className="sub-body">
                <span className="sub-name">{s.name}</span>
                <div className="sub-meta">
                  <window.Dot color={window.CATEGORIES[s.cat].color} size={7} />
                  <span>{s.until === 0 ? "今日" : `あと${s.until}日`}</span>
                </div>
              </div>
              <div className="sub-price"><span className="price-num">{window.yen(s.price)}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
Object.assign(window, { CalendarScreen });
