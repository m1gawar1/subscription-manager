/* analysis.jsx — 分析画面（ドーナツ + カテゴリ内訳 + 推移） */
function AnalysisScreen() {
  const cats = window.byCategory();
  const total = window.totalMonthly();

  // conic-gradient のストップを生成
  let acc = 0;
  const stops = cats.map((c) => {
    const start = (acc / total) * 100;
    acc += c.total;
    const end = (acc / total) * 100;
    return `${c.color} ${start}% ${end}%`;
  }).join(", ");

  // 6ヶ月推移（モック）
  const trend = [13800, 14600, 15200, 14900, 15800, total];
  const maxT = Math.max(...trend);
  const months = ["1月", "2月", "3月", "4月", "5月", "6月"];

  return (
    <div className="dashboard">
      <div className="app-header">
        <div>
          <div className="header-hello">支出のかたち</div>
          <h1 className="header-title">分析</h1>
        </div>
      </div>

      <div className="soft-card">
        <div className="donut-wrap">
          <div className="donut" style={{ background: `conic-gradient(${stops})` }}>
            <div className="donut-hole">
              <span className="donut-total">{window.yen(total)}</span>
              <span className="donut-cap">月額合計</span>
            </div>
          </div>
        </div>
        <div className="rank-list">
          {cats.map((c) => {
            const p = Math.round((c.total / total) * 100);
            return (
              <div className="rank-row" key={c.id}>
                <window.Dot color={c.color} size={9} />
                <span className="rank-name">{c.name}</span>
                <div className="rank-track">
                  <div className="rank-fill" style={{ width: p + "%", background: c.color }} />
                </div>
                <span className="rank-amt">{window.yen(c.total)}</span>
                <span className="rank-pct">{p}%</span>
              </div>
            );
          })}
        </div>
      </div>

      <window.SectionTitle>月別の推移</window.SectionTitle>
      <div className="soft-card">
        <div className="trend-chart">
          {trend.map((v, i) => (
            <div className="trend-col" key={i}>
              <div className="trend-bar-track">
                <div className={"trend-bar" + (i === trend.length - 1 ? " trend-now" : "")}
                  style={{ height: (v / maxT) * 100 + "%" }} />
              </div>
              <span className="trend-label">{months[i]}</span>
            </div>
          ))}
        </div>
        <div className="trend-foot">
          <span>平均 {window.yen(Math.round(trend.reduce((a, b) => a + b) / trend.length))}</span>
          <span className="trend-up"><window.IconArrowUp size={12} sw={2.2} /> 6ヶ月で +{window.yen(total - trend[0])}</span>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { AnalysisScreen });
