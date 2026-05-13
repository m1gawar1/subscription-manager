export const PRESET_SUBSCRIPTIONS = [
  // 🎬 動画配信
  {
    id: 'netflix', name: 'Netflix', categoryId: 'video', domain: 'netflix.com',
    plans: [
      { name: '広告付きスタンダード', price: 890, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'スタンダード', price: 1590, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'プレミアム', price: 2290, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  {
    id: 'youtube-premium', name: 'YouTube Premium', categoryId: 'video', domain: 'youtube.com',
    plans: [
      { name: '個人プラン（月額）', price: 1280, billingCycle: 'monthly', currency: 'JPY' },
      { name: '個人プラン（年額）', price: 12800, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'ファミリープラン', price: 2280, billingCycle: 'monthly', currency: 'JPY' },
      { name: '学生プラン', price: 780, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Premium Lite', price: 780, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  {
    id: 'disney-plus', name: 'Disney+', categoryId: 'video', domain: 'disneyplus.com',
    plans: [
      { name: 'スタンダード月額', price: 1250, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'スタンダード年額', price: 12500, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'プレミアム月額', price: 1670, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'プレミアム年額', price: 16700, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },
  { id: 'hulu', name: 'Hulu', categoryId: 'video', domain: 'hulu.jp', price: 1026 },
  {
    id: 'u-next', name: 'U-NEXT', categoryId: 'video', domain: 'unext.jp',
    plans: [
      { name: '月額プラン', price: 2189, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'サッカープラン（月額）', price: 2600, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'サッカープラン（年額）', price: 26000, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },
  { id: 'd-anime', name: 'dアニメストア', categoryId: 'video', price: 660 },
  { id: 'dmm-tv', name: 'DMM TV', categoryId: 'video', domain: 'tv.dmm.com', price: 550 },
  {
    id: 'fod', name: 'FODプレミアム', categoryId: 'video', domain: 'fod.fujitv.co.jp',
    plans: [
      { name: 'スタンダード', price: 1320, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'ライト（広告付）', price: 976, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'ポイントMAX', price: 2090, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  {
    id: 'abema', name: 'ABEMAプレミアム', categoryId: 'video', domain: 'abema.tv',
    plans: [
      { name: '広告付きプレミアム', price: 680, billingCycle: 'monthly', currency: 'JPY' },
      { name: '月額プラン', price: 1180, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  { id: 'telasa', name: 'TELASA', categoryId: 'video', domain: 'telasa.jp', price: 990 },
  { id: 'lemino', name: 'Lemino', categoryId: 'video', domain: 'lemino.docomo.ne.jp', price: 1540 },
  {
    id: 'dazn', name: 'DAZN', categoryId: 'video', domain: 'dazn.com',
    plans: [
      { name: 'Standard（月間）', price: 4200, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Standard（年間・一括払い）', price: 32000, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Standard（年間・月々払い）', price: 3200, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Global', price: 980, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'SOCCER（月間）', price: 2600, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'SOCCER（年間）', price: 31200, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'BASEBALL（月間）', price: 2300, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'BASEBALL（年間）', price: 27600, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },
  {
    id: 'nba-league-pass', name: 'NBA League Pass', categoryId: 'video', domain: 'nba.com',
    plans: [
      { name: 'League Pass（月額）', price: 3190, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'League Pass（年額）', price: 19190, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'League Pass Premium（月額）', price: 4190, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'League Pass Premium（年額）', price: 25190, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Team Pass（月額）', price: 2890, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Team Pass（年額）', price: 17390, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },

  // 🎵 音楽
  {
    id: 'spotify', name: 'Spotify', categoryId: 'music', domain: 'spotify.com',
    plans: [
      { name: 'Premium Standard（個人・月額）', price: 1080, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Premium Standard（個人・年額）', price: 12960, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Premium Standard 年間（一括払い）', price: 9800, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Premium Student', price: 580, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Premium Duo', price: 1480, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Premium Family', price: 1880, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  {
    id: 'apple-music', name: 'Apple Music', categoryId: 'music', domain: 'apple.com',
    plans: [
      { name: '個人プラン（月額）', price: 1080, billingCycle: 'monthly', currency: 'JPY' },
      { name: '個人プラン（年額）', price: 10800, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'ファミリープラン', price: 1680, billingCycle: 'monthly', currency: 'JPY' },
      { name: '学生プラン', price: 580, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  {
    id: 'youtube-music', name: 'YouTube Music', categoryId: 'music', domain: 'youtube.com',
    plans: [
      { name: 'Premium（月額）', price: 1080, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Premium（年額）', price: 12800, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },
  {
    id: 'amazon-music', name: 'Amazon Music Unlimited', categoryId: 'music', domain: 'music.amazon.co.jp',
    plans: [
      { name: 'Unlimited 個人（プライム会員）', price: 1080, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Unlimited 個人（プライム会員・年額）', price: 10800, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Unlimited 個人（非プライム）', price: 1180, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Unlimited ファミリープラン（プライム会員）', price: 1980, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Unlimited ファミリープラン（プライム会員・年額）', price: 19800, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },
  {
    id: 'line-music', name: 'LINE MUSIC', categoryId: 'music', domain: 'music.line.me',
    plans: [
      { name: 'プレミアム（一般・月額）', price: 980, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'プレミアム（一般・年額）', price: 9600, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'プレミアム（学生・月額）', price: 480, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'プレミアム（学生・年額）', price: 5760, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'ファミリープラン（月額）', price: 1680, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'ファミリープラン（年額）', price: 20160, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },
  {
    id: 'awa', name: 'AWA', categoryId: 'music', domain: 'awa.fm',
    plans: [
      { name: 'STANDARD プラン（月額）', price: 980, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'STANDARD プラン（年額）', price: 9800, billingCycle: 'yearly', currency: 'JPY' },
      { name: '学生プラン', price: 480, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'ファミリープラン', price: 1480, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },

  // 🎮 ゲーム
  {
    id: 'nintendo-switch-online', name: 'Nintendo Switch Online', categoryId: 'game', domain: 'nintendo.co.jp',
    plans: [
      { name: '個人プラン（3カ月）', price: 815, billingCycle: 'quarterly', currency: 'JPY' },
      { name: '個人プラン（月）', price: 306, billingCycle: 'monthly', currency: 'JPY' },
      { name: '個人プラン（年）', price: 2400, billingCycle: 'yearly', currency: 'JPY' },
      { name: '個人+追加パック（年）', price: 4900, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'ファミリープラン（年）', price: 4500, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'ファミリー+追加パック（年）', price: 8900, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },
  {
    id: 'playstation-plus', name: 'PlayStation Plus', categoryId: 'game', domain: 'playstation.com',
    plans: [
      { name: 'Essential（月）', price: 850, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Essential（3カ月）', price: 2150, billingCycle: 'quarterly', currency: 'JPY' },
      { name: 'Essential（年）', price: 6800, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Extra（月）', price: 1300, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Extra（3カ月）', price: 3600, billingCycle: 'quarterly', currency: 'JPY' },
      { name: 'Extra（年）', price: 11700, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Premium（月）', price: 1550, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Premium（3カ月）', price: 4300, billingCycle: 'quarterly', currency: 'JPY' },
      { name: 'Premium（年）', price: 13900, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },
  {
    id: 'xbox-game-pass', name: 'Xbox Game Pass', categoryId: 'game', domain: 'xbox.com',
    plans: [
      { name: 'Essential', price: 850, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'PC Game Pass', price: 1300, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Premium', price: 1300, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  {
    id: 'apple-arcade', name: 'Apple Arcade', categoryId: 'game', domain: 'apple.com',
    plans: [
      { name: '標準プラン（月額）', price: 900, billingCycle: 'monthly', currency: 'JPY' },
      { name: '標準プラン（年額）', price: 6000, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },

  // 📚 読書・学習
  { id: 'kindle-unlimited', name: 'Kindle Unlimited', categoryId: 'reading', domain: 'amazon.co.jp', price: 980 },
  { id: 'audible', name: 'Audible', categoryId: 'reading', domain: 'audible.co.jp', price: 1500 },
  {
    id: 'cmoa', name: 'コミックシーモア', categoryId: 'reading',
    plans: [
      { name: '読み放題ライト', price: 780, billingCycle: 'monthly', currency: 'JPY' },
      { name: '読み放題フル', price: 1480, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  {
    id: 'rakuten-magazine', name: '楽天マガジン', categoryId: 'reading', domain: 'magazine.rakuten.co.jp',
    plans: [
      { name: '月額プラン', price: 597, billingCycle: 'monthly', currency: 'JPY' },
      { name: '3カ月プラン', price: 1650, billingCycle: 'quarterly', currency: 'JPY' },
      { name: '年額プラン', price: 5980, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },
  { id: 'd-magazine', name: 'dマガジン', categoryId: 'reading', price: 580 },

  // ☁️ クラウド
  {
    id: 'icloud-plus', name: 'iCloud+', categoryId: 'cloud', domain: 'icloud.com',
    plans: [
      { name: '50GB', price: 150, billingCycle: 'monthly', currency: 'JPY' },
      { name: '200GB', price: 450, billingCycle: 'monthly', currency: 'JPY' },
      { name: '2TB', price: 1500, billingCycle: 'monthly', currency: 'JPY' },
      { name: '6TB', price: 4500, billingCycle: 'monthly', currency: 'JPY' },
      { name: '12TB', price: 9000, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
  {
    id: 'google-one', name: 'Google One', categoryId: 'cloud', domain: 'one.google.com',
    plans: [
      { name: '100GB（月額）', price: 290, billingCycle: 'monthly', currency: 'JPY' },
      { name: '100GB（年額）', price: 2900, billingCycle: 'yearly', currency: 'JPY' },
      { name: '200GB（月額）', price: 440, billingCycle: 'monthly', currency: 'JPY' },
      { name: '200GB（年額）', price: 4400, billingCycle: 'yearly', currency: 'JPY' },
      { name: '2TB（月額）', price: 1450, billingCycle: 'monthly', currency: 'JPY' },
      { name: '2TB（年額）', price: 14500, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },
  {
    id: 'dropbox', name: 'Dropbox', categoryId: 'cloud', domain: 'dropbox.com',
    plans: [
      { name: 'Plus（月額）', price: 1500, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Plus（年額）', price: 14400, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Family（月額）', price: 2500, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Family（年額）', price: 24000, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Professional（月額）', price: 2400, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Professional（年額）', price: 24000, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },

  // 💼 仕事・クリエイティブ
  {
    id: 'adobe-cc', name: 'Adobe Creative Cloud', categoryId: 'work', domain: 'adobe.com',
    plans: [
      { name: 'Creative Cloud Pro（月々）', price: 14480, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Creative Cloud Pro（年間月々払い）', price: 9080, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Creative Cloud Pro（年間プラン）', price: 102960, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Creative Cloud Standard（月々）', price: 10280, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Creative Cloud Standard（年間月々払い）', price: 6480, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Creative Cloud Standard（年間プラン）', price: 72336, billingCycle: 'yearly', currency: 'JPY' },
      { name: '単体アプリ（月々）', price: 4980, billingCycle: 'monthly', currency: 'JPY' },
      { name: '単体アプリ（年間月々払い）', price: 3280, billingCycle: 'monthly', currency: 'JPY' },
      { name: '単体アプリ（年間プラン）', price: 34680, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Acrobat Studio（月々）', price: 4620, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Acrobat Studio（年間月々払い）', price: 3300, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Acrobat Studio（年間プラン）', price: 39600, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Acrobat Standard（月々）', price: 3300, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Acrobat Standard（年間月々払い）', price: 1980, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Acrobat Standard（年間プラン）', price: 23760, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Adobe Express（月々）', price: 1180, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Adobe Express（年間プラン）', price: 11980, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },
  {
    id: 'microsoft-365', name: 'Microsoft 365', categoryId: 'work', domain: 'microsoft.com',
    plans: [
      { name: 'Basic（月額）', price: 260, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Basic（年額）', price: 2440, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Personal（月額）', price: 2130, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Personal（年額）', price: 21300, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Family（月額）', price: 2740, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Family（年額）', price: 27400, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Premium（月額）', price: 3200, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Premium（年額）', price: 32000, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },

  // 🤖 AI・テック
  {
    id: 'chatgpt-plus', name: 'ChatGPT', categoryId: 'ai', domain: 'openai.com',
    plans: [
      { name: 'Go', price: 8, billingCycle: 'monthly', currency: 'USD' },
      { name: 'Plus', price: 20, billingCycle: 'monthly', currency: 'USD' },
      { name: 'Pro', price: 200, billingCycle: 'monthly', currency: 'USD' },
    ]
  },
  {
    id: 'claude-pro', name: 'Claude', categoryId: 'ai', domain: 'claude.ai',
    plans: [
      { name: 'Pro', price: 20, billingCycle: 'monthly', currency: 'USD' },
      { name: 'Max（5倍）', price: 100, billingCycle: 'monthly', currency: 'USD' },
      { name: 'Max（20倍）', price: 200, billingCycle: 'monthly', currency: 'USD' },
    ]
  },
  {
    id: 'github-copilot', name: 'GitHub Copilot', categoryId: 'ai', domain: 'github.com',
    plans: [
      { name: 'Pro（Individual）', price: 10, billingCycle: 'monthly', currency: 'USD' },
      { name: 'Pro+', price: 39, billingCycle: 'monthly', currency: 'USD' },
      { name: 'Business', price: 19, billingCycle: 'monthly', currency: 'USD' },
    ]
  },
  {
    id: 'google-ai', name: 'Google AI', categoryId: 'ai', domain: 'one.google.com',
    plans: [
      { name: 'Plus', price: 1200, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Pro', price: 2900, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Ultra', price: 36400, billingCycle: 'monthly', currency: 'JPY' },
    ]
  },
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
      { name: 'Personal', price: 8, billingCycle: 'monthly', currency: 'USD' },
      { name: 'Team', price: 15, billingCycle: 'monthly', currency: 'USD' },
      { name: 'Business', price: 20, billingCycle: 'monthly', currency: 'USD' },
    ]
  },
  {
    id: 'genspark', name: 'Genspark', categoryId: 'ai', domain: 'genspark.ai',
    plans: [
      { name: 'Plus', price: 24.99, billingCycle: 'monthly', currency: 'USD' },
      { name: 'Pro', price: 249.99, billingCycle: 'monthly', currency: 'USD' },
    ]
  },
  {
    id: 'midjourney', name: 'Midjourney', categoryId: 'ai', domain: 'midjourney.com',
    plans: [
      { name: 'Basic', price: 10, billingCycle: 'monthly', currency: 'USD' },
      { name: 'Standard', price: 30, billingCycle: 'monthly', currency: 'USD' },
      { name: 'Pro', price: 60, billingCycle: 'monthly', currency: 'USD' },
      { name: 'Mega', price: 120, billingCycle: 'monthly', currency: 'USD' },
    ]
  },
  {
    id: 'grok', name: 'Grok', categoryId: 'ai', domain: 'x.ai',
    plans: [
      { name: 'X Basic（月額）', price: 368, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'X Basic（年額）', price: 3916, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'X Premium（月額）', price: 980, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'X Premium（年額）', price: 10280, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'X Premium+（月額）', price: 6080, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'X Premium+（年額）', price: 60040, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'SuperGrok Lite', price: 10, billingCycle: 'monthly', currency: 'USD' },
      { name: 'SuperGrok', price: 30, billingCycle: 'monthly', currency: 'USD' },
    ]
  },
  {
    id: 'canva', name: 'Canva', categoryId: 'ai', domain: 'canva.com',
    plans: [
      { name: 'Pro（月額）', price: 1180, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Pro（年額）', price: 11800, billingCycle: 'yearly', currency: 'JPY' },
      { name: 'Business（月額）', price: 1880, billingCycle: 'monthly', currency: 'JPY' },
      { name: 'Business（年額）', price: 18800, billingCycle: 'yearly', currency: 'JPY' },
    ]
  },

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
