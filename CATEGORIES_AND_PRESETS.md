# カテゴリー & プリセット設計ドキュメント

---

## カテゴリー設計（9種類）

### 変更点まとめ
- 「エンタメ」を **動画配信・ゲーム** に分離
- 「ユーティリティ」を **クラウド** に分離・改名
- 「プロ向けツール」を **仕事・クリエイティブ** に改名
- 「AI・テック」を新設
- 「読書・学習」を新設

### カテゴリー一覧

| ID | アイコン | 名前 | 主な対象サービス |
|----|---------|------|----------------|
| `video` | 🎬 | 動画配信 | Netflix, Hulu, U-NEXT, Disney+, ABEMA, Apple TV+ |
| `music` | 🎵 | 音楽 | Spotify, Apple Music, LINE MUSIC, Amazon Music, AWA |
| `game` | 🎮 | ゲーム | PlayStation Plus, Xbox Game Pass, Nintendo Switch Online, Apple Arcade |
| `reading` | 📚 | 読書・学習 | Kindle Unlimited, Audible, dマガジン, Duolingo, Udemy |
| `cloud` | ☁️ | クラウド | iCloud+, Google One, Dropbox, OneDrive, Box |
| `work` | 💼 | 仕事・クリエイティブ | Adobe CC, Microsoft 365, Canva Pro, Figma, Notion |
| `ai` | 🤖 | AI・テック | ChatGPT Plus, Claude Pro, GitHub Copilot, Perplexity |
| `shopping` | 🛍️ | ショッピング | Amazon Prime, 楽天プレミアム |
| `other` | 📦 | その他 | 上記に当てはまらないもの |

---

## 既存カテゴリーとの対応（マイグレーション）

| 旧カテゴリーID | 旧名称 | → | 新カテゴリーID | 新名称 |
|--------------|--------|---|--------------|--------|
| `entertainment` | エンタメ | → | `video` | 動画配信 |
| `music` | 音楽 | → | `music` | 音楽（変わらず） |
| `utility` | ユーティリティ | → | `cloud` | クラウド |
| `professional` | プロ向けツール | → | `work` | 仕事・クリエイティブ |
| `shopping` | ショッピング | → | `shopping` | ショッピング（変わらず） |
| `other` | その他 | → | `other` | その他（変わらず） |

---

## プリセット設計（計34件）

### 🎬 動画配信

| サービス名 | 月額（円） | ドメイン | 備考 |
|-----------|----------|---------|------|
| Netflix | 790 | netflix.com | 広告つきスタンダード |
| YouTube Premium | 1,280 | youtube.com | 音楽再生も含む |
| Disney+ | 990 | disneyplus.com | |
| Hulu | 1,026 | hulu.jp | |
| U-NEXT | 2,189 | unext.jp | |
| ABEMA Premium | 960 | abema.tv | |
| Apple TV+ | 900 | tv.apple.com | |
| WOWOW | 2,530 | wowow.co.jp | |
| FOD Premium | 976 | fod.fujitv.co.jp | |
| NHKオンデマンド | 990 | nhk-ondemand.jp | |
| dアニメストア | 440 | d-anime.ne.jp | |

### 🎵 音楽

| サービス名 | 月額（円） | ドメイン | 備考 |
|-----------|----------|---------|------|
| Spotify | 980 | spotify.com | |
| Apple Music | 1,080 | apple.com | |
| YouTube Music | 1,080 | youtube.com | |
| Amazon Music Unlimited | 1,080 | music.amazon.co.jp | 非プライム会員は1,180円 |
| LINE MUSIC | 980 | music.line.me | |
| AWA | 960 | awa.fm | |
| 楽天ミュージック | 980 | music.rakuten.co.jp | |

### 🎮 ゲーム

| サービス名 | 月額（円） | ドメイン | 備考 |
|-----------|----------|---------|------|
| Nintendo Switch Online | 306 | nintendo.co.jp | 個人プラン |
| PlayStation Plus Essential | 850 | playstation.com | |
| Xbox Game Pass Ultimate | 2,750 | xbox.com | |
| Apple Arcade | 600 | apple.com | |

### 📚 読書・学習

| サービス名 | 月額（円） | ドメイン | 備考 |
|-----------|----------|---------|------|
| Kindle Unlimited | 980 | amazon.co.jp | |
| Audible | 1,500 | audible.co.jp | |
| dマガジン | 580 | dmagazine.docomo.ne.jp | |
| コミックシーモア | 780 | cmoa.jp | 読み放題ライト |
| 楽天マガジン | 580 | magazine.rakuten.co.jp | |

### ☁️ クラウド

| サービス名 | 月額（円） | ドメイン | 備考 |
|-----------|----------|---------|------|
| iCloud+ 50GB | 130 | icloud.com | |
| iCloud+ 200GB | 400 | icloud.com | |
| Google One 100GB | 290 | one.google.com | |
| Dropbox Plus | 1,200 | dropbox.com | 概算 |
| 1Password | 400 | 1password.com | 概算 |

### 💼 仕事・クリエイティブ

| サービス名 | 月額（円） | ドメイン | 備考 |
|-----------|----------|---------|------|
| Adobe Creative Cloud | 6,480 | adobe.com | |
| Microsoft 365 Personal | 1,490 | microsoft.com | |
| Canva Pro | 1,500 | canva.com | 概算 |
| Notion Plus | 1,650 | notion.so | 概算（$10/月） |

### 🤖 AI・テック

| サービス名 | 月額 | ドメイン | 備考 |
|-----------|------|---------|------|
| ChatGPT Plus | $20 | openai.com | USD |
| Claude Pro | $20 | claude.ai | USD |
| GitHub Copilot | $10 | github.com | USD |
| Perplexity Pro | $20 | perplexity.ai | USD |
| Google AI Plus | 1,200 | one.google.com | 円 |
| Microsoft Copilot Pro | 3,200 | microsoft.com | 円・概算 |

### 🛍️ ショッピング

| サービス名 | 月額（円） | ドメイン | 備考 |
|-----------|----------|---------|------|
| Amazon Prime | 600 | amazon.co.jp | 月払い換算 |

---

## 実装時の注意事項

1. **既存ユーザーのマイグレーション**
   - `entertainment` → `video` に自動変換
   - `utility` → `cloud` に自動変換
   - `professional` → `work` に自動変換

2. **USD建てプリセット**
   - AI系サービス（ChatGPT, Claude, GitHub Copilot等）は USD で登録
   - 為替レートは既存の自動取得機能で対応済み

3. **料金が変動しやすいサービス**
   - Dropbox, Canva, Notion は為替や改定で変わりやすいため「概算」扱い
   - ユーザーが編集できるので大きな問題にはならない

4. **複数プランがあるサービス**
   - iCloud+, PlayStation Plus など複数プランがあるものは代表的なプランのみ掲載
   - 将来的にプラン選択UIを追加することも検討可能
