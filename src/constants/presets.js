export const PRESET_SUBSCRIPTIONS = [
  // 🎬 動画配信
  { id: 'netflix', name: 'Netflix', price: 790, categoryId: 'video', domain: 'netflix.com' },
  { id: 'youtube-premium', name: 'YouTube Premium', price: 1280, categoryId: 'video', domain: 'youtube.com' },
  { id: 'disney-plus', name: 'Disney+', price: 990, categoryId: 'video', domain: 'disneyplus.com' },
  { id: 'hulu', name: 'Hulu', price: 1026, categoryId: 'video', domain: 'hulu.jp' },
  { id: 'u-next', name: 'U-NEXT', price: 2189, categoryId: 'video', domain: 'unext.jp' },
  { id: 'd-anime', name: 'dアニメストア', price: 550, categoryId: 'video' },
  { id: 'dmm-tv', name: 'DMM TV', price: 550, categoryId: 'video', domain: 'tv.dmm.com' },
  { id: 'fod', name: 'FODプレミアム', price: 976, categoryId: 'video', domain: 'fod.fujitv.co.jp' },
  { id: 'abema', name: 'ABEMAプレミアム', price: 960, categoryId: 'video', domain: 'abema.tv' },
  { id: 'telasa', name: 'TELASA', price: 618, categoryId: 'video', domain: 'telasa.jp' },
  { id: 'lemino', name: 'Lemino', price: 990, categoryId: 'video', domain: 'lemino.docomo.ne.jp' },
  { id: 'dazn', name: 'DAZN', price: 4200, categoryId: 'video', domain: 'dazn.com' },
  
  // 🎵 音楽
  { id: 'spotify', name: 'Spotify', price: 980, categoryId: 'music', domain: 'spotify.com' },
  { id: 'apple-music', name: 'Apple Music', price: 1080, categoryId: 'music', domain: 'apple.com' },
  { id: 'youtube-music', name: 'YouTube Music', price: 1080, categoryId: 'music', domain: 'youtube.com' },
  { id: 'amazon-music', name: 'Amazon Music Unlimited', price: 1080, categoryId: 'music', domain: 'music.amazon.co.jp' },
  
  // 🎮 ゲーム
  { id: 'nintendo-switch-online', name: 'Nintendo Switch Online', price: 306, categoryId: 'game', domain: 'nintendo.co.jp' },
  { id: 'playstation-plus', name: 'PlayStation Plus Essential', price: 850, categoryId: 'game', domain: 'playstation.com' },
  { id: 'xbox-game-pass', name: 'Xbox Game Pass Ultimate', price: 2750, categoryId: 'game', domain: 'xbox.com' },
  
  // 📚 読書・学習
  { id: 'kindle-unlimited', name: 'Kindle Unlimited', price: 980, categoryId: 'reading', domain: 'amazon.co.jp' },
  { id: 'audible', name: 'Audible', price: 1500, categoryId: 'reading', domain: 'audible.co.jp' },
  { id: 'cmoa', name: 'コミックシーモア', price: 780, categoryId: 'reading' },
  
  // ☁️ クラウド
  { id: 'icloud-plus-50', name: 'iCloud+ 50GB', price: 130, categoryId: 'cloud', domain: 'icloud.com' },
  { id: 'google-one-100', name: 'Google One 100GB', price: 290, categoryId: 'cloud', domain: 'one.google.com' },
  { id: 'dropbox', name: 'Dropbox Plus', price: 1200, categoryId: 'cloud', domain: 'dropbox.com' },
  
  // 💼 仕事・クリエイティブ
  { id: 'adobe-cc', name: 'Adobe Creative Cloud', price: 6480, categoryId: 'work', domain: 'adobe.com' },
  { id: 'microsoft-365', name: 'Microsoft 365 Personal', price: 1490, categoryId: 'work', domain: 'microsoft.com' },
  
  // 🤖 AI・テック
  { id: 'chatgpt-plus', name: 'ChatGPT Plus', price: 3000, categoryId: 'ai', domain: 'openai.com' }, // USDを想定した概算円で登録するか、UIで通貨切り替えさせるか
  { id: 'claude-pro', name: 'Claude Pro', price: 3000, categoryId: 'ai', domain: 'claude.ai' },
  { id: 'github-copilot', name: 'GitHub Copilot', price: 1500, categoryId: 'ai', domain: 'github.com' },
  { id: 'google-ai-plus', name: 'Google AI Plus', price: 1200, categoryId: 'ai', domain: 'one.google.com' },
  { id: 'perplexity', name: 'Perplexity Pro', price: 3000, categoryId: 'ai', domain: 'perplexity.ai' },
  { id: 'notion', name: 'Notion Plus', price: 1650, categoryId: 'ai', domain: 'notion.so' },
  { id: 'genspark', name: 'Genspark', price: 2000, categoryId: 'ai', domain: 'genspark.ai' },
  { id: 'midjourney', name: 'Midjourney', price: 1500, categoryId: 'ai', domain: 'midjourney.com' },
  { id: 'grok', name: 'Grok', price: 2400, categoryId: 'ai', domain: 'x.ai' },
  { id: 'canva', name: 'Canva Pro', price: 1500, categoryId: 'ai', domain: 'canva.com' },
  { id: 'copilot', name: 'Microsoft Copilot Pro', price: 3200, categoryId: 'ai' },
  
  // 🛍️ ショッピング
  { id: 'amazon-prime', name: 'Amazon Prime', price: 600, categoryId: 'shopping', domain: 'amazon.co.jp' }
];

export const getLogoUrl = (domain) => {
  if (!domain) return null;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
};
