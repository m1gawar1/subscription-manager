export const PRESET_SUBSCRIPTIONS = [
  // 🎬 動画配信
  {
    id: 'netflix', name: 'Netflix', categoryId: 'video', domain: 'netflix.com',
    plans: [
      { name: '広告付きスタンダード', price: 790, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'スタンダード', price: 1590, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'プレミアム', price: 2290, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  {
    id: 'youtube-premium', name: 'YouTube Premium', categoryId: 'video', domain: 'youtube.com',
    plans: [
      { name: '個人プラン', price: 1280, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'ファミリープラン', price: 2280, billingCycle: 'monthly', currency: 'JPY' },
      { name: '学生プラン', price: 680, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  {
    id: 'disney-plus', name: 'Disney+', categoryId: 'video', domain: 'disneyplus.com',
    plans: [
      { name: 'スタンダード月額', price: 990, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'スタンダード年額', price: 9900, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'プレミアム月額', price: 1320, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'プレミアム年額', price: 13200, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },
  { id: 'hulu', name: 'Hulu', categoryId: 'video', domain: 'hulu.jp', price: 1026 },
  {
    id: 'u-next', name: 'U-NEXT', categoryId: 'video', domain: 'unext.jp',
    plans: [
      { name: '月額プラン', price: 2189, billingCycle: 'monthly', currency: 'JPY' },
      { name: '追加アカウント', price: 429, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  { id: 'd-anime', name: 'dアニメストア', categoryId: 'video', price: 550 },
  { id: 'dmm-tv', name: 'DMM TV', categoryId: 'video', domain: 'tv.dmm.com', price: 550 },
  { id: 'fod', name: 'FODプレミアム', categoryId: 'video', domain: 'fod.fujitv.co.jp', price: 976 },
  {
    id: 'abema', name: 'ABEMAプレミアム', categoryId: 'video', domain: 'abema.tv',
    plans: [
      { name: '月額プラン', price: 960, billingCycle: 'monthly', currency: 'JPY' },
      { name: '年額プラン', price: 8600, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },
  { id: 'telasa', name: 'TELASA', categoryId: 'video', domain: 'telasa.jp', price: 618 },
  { id: 'lemino', name: 'Lemino', categoryId: 'video', domain: 'lemino.docomo.ne.jp', price: 990 },
  {
    id: 'dazn', name: 'DAZN', categoryId: 'video', domain: 'dazn.com',
    plans: [
      { name: '月額プラン', price: 4200, billingCycle: 'monthly', currency: 'JPY' },
      { name: '年額プラン', price: 27000, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },
  { id: 'nba-league-pass', name: 'NBA League Pass', categoryId: 'video', domain: 'nba.com', price: 3190 },

  // 🎵 音楽
  {
    id: 'spotify', name: 'Spotify', categoryId: 'music', domain: 'spotify.com',
    plans: [
      { name: '個人プラン', price: 980, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'デュオプラン', price: 1280, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'ファミリープラン', price: 1580, billingCycle: 'monthly', currency: 'JPY' },
      { name: '学生プラン', price: 480, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  {
    id: 'apple-music', name: 'Apple Music', categoryId: 'music', domain: 'apple.com',
    plans: [
      { name: '個人プラン', price: 1080, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'ファミリープラン', price: 1680, billingCycle: 'monthly', currency: 'JPY' },
      { name: '学生プラン', price: 580, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  {
    id: 'youtube-music', name: 'YouTube Music', categoryId: 'music', domain: 'youtube.com',
    plans: [
      { name: '個人プラン', price: 1080, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'ファミリープラン', price: 1680, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  {
    id: 'amazon-music', name: 'Amazon Music Unlimited', categoryId: 'music', domain: 'music.amazon.co.jp',
    plans: [
      { name: 'Prime会員価格', price: 980, billingCycle: 'monthly', currency: 'JPY' },
      { name: '通常月額', price: 1080, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'ファミリープラン', price: 1680, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  { id: 'line-music', name: 'LINE MUSIC', categoryId: 'music', domain: 'music.line.me', price: 980 },
  { id: 'awa', name: 'AWA', categoryId: 'music', domain: 'awa.fm', price: 960 },

  // 🎮 ゲーム
  {
    id: 'nintendo-switch-online', name: 'Nintendo Switch Online', categoryId: 'game', domain: 'nintendo.co.jp',
    plans: [
      { name: '個人プラン（月）', price: 306, billingCycle: 'monthly', currency: 'JPY' },
      { name: '個人プラン（年）', price: 2400, billingCycle: 'yearly', currency: 'JPY' },
      { name: '個人+追加パック（年）', price: 4900, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'ファミリープラン（年）', price: 4500, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },
  {
    id: 'playstation-plus', name: 'PlayStation Plus', categoryId: 'game', domain: 'playstation.com',
    plans: [
      { name: 'Essential（月）', price: 850, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Extra（月）', price: 1300, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Premium（月）', price: 1550, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Essential（年）', price: 5143, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Extra（年）', price: 8600, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Premium（年）', price: 10250, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },
  {
    id: 'xbox-game-pass', name: 'Xbox Game Pass', categoryId: 'game', domain: 'xbox.com',
    plans: [
      { name: 'PC Game Pass', price: 850, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Game Pass Ultimate', price: 1210, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  {
    id: 'apple-arcade', name: 'Apple Arcade', categoryId: 'game', domain: 'apple.com',
    plans: [
      { name: '個人プラン', price: 700, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'ファミリープラン', price: 700, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },

  // 📚 読書・学習
  { id: 'kindle-unlimited', name: 'Kindle Unlimited', categoryId: 'reading', domain: 'amazon.co.jp', price: 980 },
  { id: 'audible', name: 'Audible', categoryId: 'reading', domain: 'audible.co.jp', price: 1500 },
  { id: 'cmoa', name: 'コミックシーモア', categoryId: 'reading', price: 780 },
  {
    id: 'rakuten-magazine', name: '楽天マガジン', categoryId: 'reading', domain: 'magazine.rakuten.co.jp',
    plans: [
      { name: '月額プラン', price: 550, billingCycle: 'monthly', currency: 'JPY' },
      { name: '年額プラン', price: 5500, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },
  { id: 'd-magazine', name: 'dマガジン', categoryId: 'reading', price: 580 },
  { id: 'bookwalker', name: 'BOOKWALKER', categoryId: 'reading', domain: 'bookwalker.jp' },

  // ☁️ クラウド
  {
    id: 'icloud-plus', name: 'iCloud+', categoryId: 'cloud', domain: 'icloud.com',
    plans: [
      { name: '50GB', price: 130, billingCycle: 'monthly', currency: 'JPY' },
      { name: '200GB', price: 400, billingCycle: 'monthly', currency: 'JPY' },
      { name: '2TB', price: 1300, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  {
    id: 'google-one', name: 'Google One', categoryId: 'cloud', domain: 'one.google.com',
    plans: [
      { name: '100GB', price: 250, billingCycle: 'monthly', currency: 'JPY' },
      { name: '200GB', price: 380, billingCycle: 'monthly', currency: 'JPY' },
      { name: '2TB', price: 1300, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  {
    id: 'dropbox', name: 'Dropbox', categoryId: 'cloud', domain: 'dropbox.com',
    plans: [
      { name: 'Plus（月額）', price: 1200, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Plus（年額）', price: 11990, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Professional', price: 2400, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  {
    id: 'onedrive', name: 'OneDrive', categoryId: 'cloud', domain: 'onedrive.live.com',
    plans: [
      { name: '100GB', price: 260, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Microsoft 365込み', price: 1490, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },

  // 💼 仕事・クリエイティブ
  {
    id: 'adobe-cc', name: 'Adobe Creative Cloud', categoryId: 'work', domain: 'adobe.com',
    plans: [
      { name: 'フォトグラフィー', price: 2180, billingCycle: 'monthly', currency: 'JPY' },
      { name: '単体アプリ', price: 3280, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'コンプリート（年間）', price: 7780, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'コンプリート（月払い）', price: 9720, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  {
    id: 'microsoft-365', name: 'Microsoft 365', categoryId: 'work', domain: 'microsoft.com',
    plans: [
      { name: 'Personal（月額）', price: 1490, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Personal（年額）', price: 14900, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Family（月額）', price: 2100, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Family（年額）', price: 21000, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },

  // 🤖 AI・テック
  {
    id: 'chatgpt-plus', name: 'ChatGPT', categoryId: 'ai', domain: 'openai.com',
    plans: [
      { name: 'Plus', price: 20, billingCycle: 'monthly', currency: 'USD' },
      { name: 'Pro', price: 200, billingCycle: 'monthly', currency: 'USD' },
    ]
  },
  {
    id: 'claude-pro', name: 'Claude', categoryId: 'ai', domain: 'claude.ai',
    plans: [
      { name: 'Pro', price: 18, billingCycle: 'monthly', currency: 'USD' },
      { name: 'Max（5倍）', price: 100, billingCycle: 'monthly', currency: 'USD' },
    ]
  },
  {
    id: 'github-copilot', name: 'GitHub Copilot', categoryId: 'ai', domain: 'github.com',
    plans: [
      { name: 'Individual', price: 10, billingCycle: 'monthly', currency: 'USD' },
      { name: 'Business', price: 19, billingCycle: 'monthly', currency: 'USD' },
    ]
  },
  { id: 'google-ai-plus', name: 'Google AI Premium', categoryId: 'ai', domain: 'one.google.com', price: 2900 },
  {
    id: 'perplexity', name: 'Perplexity', categoryId: 'ai', domain: 'perplexity.ai',
    plans: [
      { name: 'Pro（月額）', price: 20, billingCycle: 'monthly', currency: 'USD' },
      { name: 'Pro（年額）', price: 200, billingCycle: 'yearly', currency: 'USD' },
    ]
  },
  {
    id: 'notion', name: 'Notion', categoryId: 'ai', domain: 'notion.so',
    plans: [
      { name: 'Plus', price: 10, billingCycle: 'monthly', currency: 'USD' },
      { name: 'Business', price: 18, billingCycle: 'monthly', currency: 'USD' },
    ]
  },
  { id: 'genspark', name: 'Genspark', categoryId: 'ai', domain: 'genspark.ai', price: 10, currency: 'USD' },
  {
    id: 'midjourney', name: 'Midjourney', categoryId: 'ai', domain: 'midjourney.com',
    plans: [
      { name: 'Basic', price: 10, billingCycle: 'monthly', currency: 'USD' },
      { name: 'Standard', price: 30, billingCycle: 'monthly', currency: 'USD' },
      { name: 'Pro', price: 60, billingCycle: 'monthly', currency: 'USD' },
    ]
  },
  {
    id: 'grok', name: 'Grok', categoryId: 'ai', domain: 'x.ai',
    plans: [
      { name: 'X Premium', price: 1380, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'X Premium+', price: 3300, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  {
    id: 'canva', name: 'Canva', categoryId: 'ai', domain: 'canva.com',
    plans: [
      { name: 'Pro（月額）', price: 1500, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Pro（年額）', price: 12000, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Teams', price: 2000, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  { id: 'copilot', name: 'Microsoft Copilot Pro', categoryId: 'ai', price: 3200 },

  // 🛍️ ショッピング
  {
    id: 'amazon-prime', name: 'Amazon Prime', categoryId: 'shopping', domain: 'amazon.co.jp',
    plans: [
      { name: '月額プラン', price: 600, billingCycle: 'monthly', currency: 'JPY' },
      { name: '年額プラン', price: 5900, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },
];

export const getLogoUrl = (domain) => {
  if (!domain) return null;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
};
