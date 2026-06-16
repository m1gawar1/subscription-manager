/* data.js — categories + subscription sample data */
(function () {
  const CATEGORIES = {
    video: { id: "video", name: "動画配信", color: "#E50914", emoji: "🎬" },
    music: { id: "music", name: "音楽", color: "#1DB954", emoji: "🎵" },
    game: { id: "game", name: "ゲーム", color: "#3366FF", emoji: "🎮" },
    read: { id: "read", name: "読書・学習", color: "#8855BB", emoji: "📚" },
    cloud: { id: "cloud", name: "クラウド", color: "#4A90E2", emoji: "☁️" },
    work: { id: "work", name: "仕事・クリエイティブ", color: "#FF9500", emoji: "🎨" },
    ai: { id: "ai", name: "AI・テック", color: "#10A37F", emoji: "🤖" },
    shop: { id: "shop", name: "ショッピング", color: "#FF6B35", emoji: "🛍️" },
    other: { id: "other", name: "その他", color: "#8E8E93", emoji: "✨" },
  };

  // price: 月額換算（円）, day: 毎月の請求日
  const SUBS = [
    { id: "netflix", name: "Netflix", domain: "netflix.com", cat: "video", price: 1490, day: 15 },
    { id: "spotify", name: "Spotify", domain: "spotify.com", cat: "music", price: 980, day: 3 },
    { id: "youtube", name: "YouTube Premium", domain: "youtube.com", cat: "video", price: 1280, day: 20 },
    { id: "chatgpt", name: "ChatGPT Plus", domain: "openai.com", cat: "ai", price: 3000, day: 8, trial: false },
    { id: "adobe", name: "Adobe Creative Cloud", domain: "adobe.com", cat: "work", price: 6480, day: 25 },
    { id: "prime", name: "Amazon Prime", domain: "amazon.co.jp", cat: "shop", price: 600, day: 12 },
    { id: "icloud", name: "iCloud+", domain: "icloud.com", cat: "cloud", price: 130, day: 1 },
    { id: "nso", name: "Switch Online", domain: "nintendo.com", cat: "game", price: 306, day: 18 },
    { id: "kindle", name: "Kindle Unlimited", domain: "amazon.co.jp", cat: "read", price: 980, day: 5 },
    { id: "disney", name: "Disney+", domain: "disneyplus.com", cat: "video", price: 990, day: 22, trial: true },
  ];

  const BUDGET = 18000;

  function totalMonthly() {
    return SUBS.reduce((s, x) => s + x.price, 0);
  }
  function byCategory() {
    const m = {};
    SUBS.forEach((s) => {
      m[s.cat] = (m[s.cat] || 0) + s.price;
    });
    return Object.keys(m)
      .map((k) => ({ ...CATEGORIES[k], total: m[k] }))
      .sort((a, b) => b.total - a.total);
  }
  function yen(n) {
    return "¥" + n.toLocaleString("ja-JP");
  }
  function logoUrl(domain) {
    return `https://logo.clearbit.com/${domain}`;
  }

  Object.assign(window, { CATEGORIES, SUBS, BUDGET, totalMonthly, byCategory, yen, logoUrl });
})();
