/* shared.jsx — reusable bits across screens */

// サービスアイコン: Clearbit ファビコン → 失敗時はカテゴリ色のモノグラムにフォールバック
function ServiceIcon({ sub, size = 52, radius = 16 }) {
  const [failed, setFailed] = React.useState(false);
  const cat = window.CATEGORIES[sub.cat];
  const mono = sub.name.replace(/[^A-Za-z0-9ぁ-んァ-ン一-龠]/, "")[0] || "?";
  return (
    <div className="icon-box" style={{
      width: size, height: size, borderRadius: radius,
      background: failed ? window.rgba(cat.color, 0.13) : "var(--input-bg)",
    }}>
      {!failed ? (
        <img src={window.logoUrl(sub.domain)} alt={sub.name}
          onError={() => setFailed(true)}
          style={{ width: "62%", height: "62%", objectFit: "contain", borderRadius: 8 }} />
      ) : (
        <span style={{ color: cat.color, fontWeight: 700, fontSize: size * 0.42 }}>{mono}</span>
      )}
    </div>
  );
}

// カテゴリの色ドット
function Dot({ color, size = 8 }) {
  return <span style={{ width: size, height: size, borderRadius: 99, background: color, display: "inline-block", flex: "none" }} />;
}

// セクション見出し（13px 大文字 letter-spacing）
function SectionTitle({ children, right }) {
  return (
    <div className="section-title-row">
      <div className="section-title">{children}</div>
      {right}
    </div>
  );
}

Object.assign(window, { ServiceIcon, Dot, SectionTitle });
