# DESIGN.md — がま口サブスク 現状デザイン仕様書

> アプリ名「**がま口サブスク**」（旧称: サブスク管理 / SubsTracker）の現状デザイン仕様。
> 2026-06-16 のアクセント刷新「がま口パステル」＋アプリ名統一を反映した最新版。

---

## 1. Visual Theme & Atmosphere（テーマと雰囲気）

- **コンセプト**: 新アプリアイコン（がま口財布のゆるかわキャラ＝「みがわりガエル」モチーフ）に合わせた **パステル系（抹茶グリーン × さくらピンク）**。iOS 風のやわらかい角丸・影・軽快なアニメーションは維持。
- **形状**: 角丸を多用（カード 16px、アプリ枠 40px）。やわらかいシャドウで浮遊感。
- **モバイル前提**: デスクトップでは中央に iPhone 風フレーム（max 390×844px、白枠8px）で表示。430px 以下では全画面化。
- **旧テーマからの変更**: 旧「ゴールド基調（金融トーン）」から、アイコンの世界観に寄せたパステルへ全面刷新済み。

---

## 2. Color Palette & Roles（カラーパレットと役割）

CSS カスタムプロパティで管理。`src/constants/themes.js` がソース・オブ・トゥルース、`src/styles/globals.css` の `:root` に既定値（がま口パステル ライト）。

### 命名方針（重要）
- 正は新名 `--accent` 系。旧名 `--gold-accent` 系は**同値のエイリアス**として併存（既存インラインスタイル約145箇所を無改修で移行するため）。**新規コードは新名トークンを使うこと。**

### ライト（default / `ライト`）— がま口パステル
| トークン | 値 | 役割 |
|---|---|---|
| `--bg-app` | `#F6F3EC` | アプリ背景（温かいクリームホワイト） |
| `--card-bg` | `#FFFFFF` | カード背景 |
| `--input-bg` | `#F4F0E7` | 入力欄・チップ背景 |
| `--border` | `#ECE6D8` | 境界線 |
| `--text` | `#3B362E` | 本文（温かいダークブラウン） |
| `--muted` | `#A39C8D` | 補助テキスト |
| `--accent` | `#7FA869` | **主アクセント（抹茶グリーン）** |
| `--accent2` | `#E89BB0` | **副アクセント（さくらピンク）** |
| `--shadow` | `rgba(120,100,60,0.07)` | カード影の色 |

#### 派生（事前計算済み実値）
| トークン | 値 | 用途 |
|---|---|---|
| `--accent-soft` | `#F0F5ED` | 選択チップ背景・アイコン枠・サマリchip |
| `--accent-weak` | `#F7FAF6` | 最も淡い面 |
| `--accent2-soft` | `#FCF1F4` | バッジ・delta chip背景 |
| `--accent-line` | `#E0EADB` | サマリカード境界 |
| `--accent-blend` | `#B4A28D` | 進捗/推移バーのグラデ終点 |
| `--accent-shadow` | `rgba(127,168,105,0.40)` | +ボタン・CTAの落ち影 |
| `--accent-border` | `rgba(127,168,105,0.50)` | 選択チップの枠 |
| `--nav-bg` | `rgba(255,255,255,0.90)` | ボトムナビ半透明面 |
| `--nav-border` | `#F4F0E8` | ナビ上端線 |
| `--summary-grad` | `linear-gradient(140deg,#FFFFFF 0%,#F3F7F2 100%)` | サマリカード背景グラデ |

#### 注意色（旧ハードコードを集約・テーマ連動）
| トークン | ライト値 | 旧ハードコード | 用途 |
|---|---|---|---|
| `--warning` | `#E06A6A` | `#FF4444` | 予算超過・削除系 |
| `--warning-soft` | `rgba(224,106,106,0.10)` | `rgba(255,68,68,0.1)` | 警告の淡背景 |
| `--warning-border` | `rgba(224,106,106,0.30)` | `rgba(255,68,68,0.3)` | 警告系の枠 |
| `--trial` | `#E8A04B` | `#FF8C00` / `#FF9500` | トライアル/期限 |
| `--trial-soft` | `rgba(232,160,75,0.12)` | `rgba(255,165,0,0.1)` | 体験中の淡背景 |
| `--trial-border` | `rgba(232,160,75,0.30)` | `rgba(255,165,0,0.3)` | 期限系の枠 |

> 旧 `#6495ED`（期限まだ先=安全）系は意味的に「余裕あり」として `--accent` 系へ集約済み。

### ダーク（dark / `ダーク`）— がま口パステル暗色版
| トークン | 値 |
|---|---|
| `--bg-app` | `#16140F` |
| `--card-bg` | `#1F1C16` |
| `--input-bg` | `#2A271F` |
| `--border` | `#3A352B` |
| `--text` | `#ECE6DA` |
| `--muted` | `#A39C8D` |
| `--accent` | `#93BE80`（暗背景でのコントラスト確保で明るめ） |
| `--accent2` | `#E89BB0` |
| `--shadow` | `rgba(0,0,0,0.30)` |
| `--warning` / `--trial` | `#E5736B` / `#E2A24E` |

> 派生トークン（`--accent-soft` 等）はダークにも全て定義済み。詳細は `themes.js` を参照。

### テーマ切替
- `auto` / `default(=ライト)` / `dark` の3択（`auto` はシステム設定追従、`App.jsx` で `prefers-color-scheme` を監視）。
- 適用は `App.jsx` が `document.documentElement.style.setProperty` で CSS 変数を流し込む方式。

### カテゴリカラー（`src/constants/categories.js`）— 据え置き
識別色として固定の鮮やかな色を使用（動画配信 `#E50914`、音楽 `#1DB954`、ゲーム `#0055ff` ほか）。パステルアクセントとは役割が異なるため**変更しない**。

---

## 3. Typography（タイポグラフィ）

- **本文フォント**: `"Noto Sans JP", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif`（`globals.css` body）。Google Fonts から `Noto Sans JP`(300/400/500/600) を読み込み（`index.html`）。
- **基本サイズ**: `15px` / `line-height: 1.5` / `font-weight: 400`
- **サイズ階層（実測）**:
  | 用途 | size | weight |
  |---|---|---|
  | 合計金額（大） | 32px | 500 |
  | サービス数 | 28px | 500 |
  | アプリ名/見出し | 22px | 700 |
  | カード金額 | 16px | 500 |
  | サービス名 | 15px | 600 |
  | セクションタイトル | 13px | 500（大文字+`letter-spacing:0.5px`） |
  | 補助・ラベル | 10–12px | 400–600 |
  | ナビラベル | 10px | 500 |
- **字間**: 金額系・見出しに `letter-spacing: -0.5px`、ラベルに `+0.3〜0.5px`。
- ✅ Vite テンプレート残骸 `src/index.css` / `src/App.css`（紫アクセント）は**削除済み**。

---

## 4. Component Stylings（コンポーネント）

### Card（`.soft-card`）
- `background: var(--card-bg)` / `border-radius: 16px` / `box-shadow: var(--shadow-soft)`
- `padding: 20px` / `margin-bottom: 24px`、hover で `translateY(-2px)`、active で `scale(0.98)`

### Summary Card（`.summary-card`）
- `background: var(--summary-grad)` + `border: 1px solid var(--accent-line)`
- 合計支出 / 契約数 / 予算プログレスバー / カテゴリ別ミニ積み上げバーを内包。

### Buttons
- **追加(+)ボタン**（`.add-btn`）: `background: var(--gold-accent)`(=accent)、白文字。hover/active の落ち影は `var(--accent-shadow)`。
- **テキストボタン**（編集/完了）: 透明背景・アクセント文字。
- **チップ/フィルタ**: `border-radius: 20px`、選択時 `--gold-accent-light` 背景 + アクセント文字 + 枠。
- **Premium/Pro系グラデ**: `linear-gradient(135deg, var(--accent), var(--accent2))`（緑→ピンクのブランドグラデ）。

### Inputs
- 検索バー: `border-radius: 12px`、`background: var(--input-bg)`、左に虫眼鏡 SVG、`1px solid var(--border-color)`。

### Icon Box（サービスアイコン）
- 一覧: 52×52、`border-radius: 16px`。Clearbit ファビコン（`getLogoUrl(domain)`）、失敗時はカテゴリアイコンへフォールバック。
- 汎用 `.icon-box`: 44×44 / `border-radius: 12px`。

### Bottom Navigation（`.bottom-nav`）
- 高さ80px、`backdrop-filter: blur(20px)` + `background: var(--nav-bg)`、上端線 `var(--nav-border)`。
- 4タブ: ホーム / 分析 / カレンダー / 設定。アクティブはアクセント着色、アイコン `scale(1.15)`、上部に伸びるインジケータ（バネ系イージング）。

### Modal / Bottom Sheet
- フィルタ等は下からのボトムシート（`border-radius: 24px 24px 0 0`、オーバーレイ `rgba(0,0,0,0.4)` + `blur(4px)`）。

### ホームのリスト見出し
- 「サブスクリプション一覧」＋右側の絞り込み/編集/＋ボタン群は1行固定（タイトル `white-space:nowrap`、ボタン群 `flex-shrink:0`）。狭幅端末での2行折り返しを防止。

---

## 5. Layout Principles（レイアウト）

- **ルーターなし**: `App.jsx` の `activeTab`（home/analysis/calendar/settings）でタブ切替する SPA。
- **コンテナ**: `.app-container` max 390px / 角丸40px / 白枠8px（デスクトップ）。`.dashboard-container` は `padding: 16px 24px 100px`（セーフエリア考慮）。
- **間隔**: カード間 16px、セクション間 24–32px、要素 gap 8–16px が中心。
- **スタイル記述**: グローバル CSS は `globals.css` のみ。大半はコンポーネント内インラインスタイル（テーマ変数を参照）。

---

## 6. Depth & Elevation（奥行き）

- カード: `0 10px 26px var(--shadow)`（hover で強化）。
- アプリ枠: `0 25px 50px -12px rgba(0,0,0,0.25)`。
- ナビ: `backdrop-filter: blur(20px)` による半透明レイヤー。
- 全体に「クリーム基調 + やわらかい影」で軽さを演出。

---

## 7. Animation（アニメーション）

- ページ初期表示: `fadeIn`（opacity + translateY 8px, 0.4s）。
- タブ切替: 方向付きスライド `tabSlideInRight/Left`（cubic-bezier, 0.28s）。
- 数値: `countFadeIn`（key 更新で再生）。
- ナビインジケータ: バネ系 `cubic-bezier(0.34,1.56,0.64,1)`。
- オンボーディング: `onboardSlideRight/Left`。

---

## 8. Iconography & Assets（アイコン・アセット）

### アプリ名（表示名）
- **がま口サブスク**。配置先: `capacitor.config.ts`(appName)、iOS `Info.plist`(CFBundleDisplayName)、Android `strings.xml`(app_name/title_activity_main)、PWA `manifest.json`(name/short_name)、`index.html`(title/apple-mobile-web-app-title)、アプリ内文言（Onboarding/UpgradeModal）、サポート/プライバシーページ。
- **Bundle ID `com.subscmanager.app` は不変**（変更すると別アプリ扱い）。署名プロファイル名「SubsTracker AppStore」・Codemagic連携名は内部ラベルのため据え置き。
- iOS マーケティングバージョン: `MARKETING_VERSION = 1.0.1`（App Store のトレイン締切回避のため 1.0 から更新）。

### アプリアイコン（がま口キャラ）
- 生成元: `resources/icon.png`（1024×1024）。`@capacitor/assets generate` で iOS/Android 各サイズ＋スプラッシュを生成。
- Web/PWA: `public/icon.png`、`public/icons/icon-*.webp`(48〜512)、`public/favicon.svg`。
- `theme-color` / `manifest.theme_color`: **`#7FA869`**（旧 `#C39D55`）。`background_color`: `#F6F3EC`。

### UI アイコン
- ナビ・操作系は **インライン SVG**（Feather 系のストローク 1.5–2px）。`lucide-react`（`Crown`, `SlidersHorizontal`, `X` 等）も使用。
- カテゴリは `CategoryIcon`。サービスは Clearbit ファビコン。

---

## 9. 現状の論点・メンテ指針（Do's / Don'ts）

### 維持するもの（Keep）
- iOS 風のやわらかい角丸・シャドウ・軽快なアニメーション。
- `themes.js` によるテーマ変数の集中管理。
- タブ SPA 構造とボトムナビの操作感。
- カテゴリ原色（識別色として据え置き）。

### 留意点
- 色は必ず**新名トークン（`--accent` / `--warning` / `--trial` 系）**で参照する。`--gold-accent` 系は互換エイリアスのため新規利用しない。
- ハードコード色（hex/rgba 直書き）は追加しない。テーマで切り替わらなくなるため、必要なら `themes.js` にトークンを追加する。
- アイコン再生成時、`@capacitor/assets` が `manifest.json` の webp `type` を `image/png` に誤って書き換えるため、生成後は `image/webp` に戻すこと。

### 今後の候補（未実施）
- サマリカードのレイアウト強化（前月比 delta chip、年間換算/先月比行）。
- 設定画面のブランドカード新設（新アイコンを主役に表示）。

---

_更新日: 2026-06-16 / 対象コミット: master @ bd7558f_
