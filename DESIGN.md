# DESIGN.md — サブスク管理 現状デザイン仕様書

> アイコン刷新・全体デザイン改修にあたり、**現在のデザインの現状**をまとめたドキュメント。
> 改修前のスナップショットとして利用する。

---

## 1. Visual Theme & Atmosphere（テーマと雰囲気）

- **コンセプト**: iOS 風のミニマル/上質系。`ゴールド` をアクセントにした落ち着いた金融アプリのトーン。
- **形状**: 角丸を多用（カード 16px、アプリ枠 40px）。やわらかいシャドウで浮遊感。
- **モバイル前提**: デスクトップでは中央に iPhone 風フレーム（max 390×844px、白枠8px）で表示。430px 以下では全画面化。
- **新アイコンとのギャップ**: 新アイコン（`New icon.png`）は淡いピンク×グリーンの**ゆるかわ/パステル系**。現状のゴールド基調はこの世界観と乖離しているため、改修で寄せる余地が大きい。

---

## 2. Color Palette & Roles（カラーパレットと役割）

CSS カスタムプロパティで管理。`src/constants/themes.js` がソース・オブ・トゥルース、`src/styles/globals.css` の `:root` に既定値。

### ライト（default / `ゴールド (ライト)`）
| 変数 | 値 | 役割 |
|---|---|---|
| `--bg-app` | `#F5F6F8` | アプリ背景 |
| `--card-bg` | `#FFFFFF` | カード背景 |
| `--input-bg` | `#F9F9F9` | 入力欄・チップ背景 |
| `--border-color` | `#E5E5E5` | 境界線 |
| `--text-main` | `#1C1C1E` | 本文 |
| `--text-muted` | `#8E8D92` | 補助テキスト |
| `--gold-accent` | `#C39D55` | アクセント（主役） |
| `--gold-accent-light` | `rgba(195,157,85,0.1)` | アクセント淡色（選択背景等） |
| `--shadow-soft` | `0 10px 25px rgba(0,0,0,0.05)` | カードシャドウ |
| `--border-radius-lg` | `16px` | 大角丸 |

### ダーク（dark / `ゴールド (ダーク)`）
| 変数 | 値 |
|---|---|
| `--bg-app` | `#121212` |
| `--card-bg` | `#1E1E1E` |
| `--input-bg` | `#2A2A2A` |
| `--border-color` | `#3A3A3A` |
| `--text-main` | `#E0E0E0` |
| `--text-muted` | `#A0A0A0` |
| `--gold-accent` | `#D4AF37` |
| `--gold-accent-light` | `rgba(212,175,55,0.15)` |
| `--shadow-soft` | `0 10px 25px rgba(0,0,0,0.3)` |

### テーマ切替
- `auto` / `default` / `dark` の3択（`auto` はシステム設定追従、`App.jsx` で `prefers-color-scheme` を監視）。
- 適用は `App.jsx` が `document.documentElement.style.setProperty` で CSS 変数を流し込む方式。

### カテゴリカラー（`src/constants/categories.js`）
固定の鮮やかな色。グラフ・ドット・アイコン色に使用。
| カテゴリ | color |
|---|---|
| 動画配信 | `#E50914` |
| 音楽 | `#1DB954` |
| ゲーム | `#0055ff` |
| 読書・学習 | `#8855bb` |
| クラウド | `#4A90E2` |
| 仕事・クリエイティブ | `#FF9500` |
| AI・テック | `#10a37f` |
| ショッピング | `#FF6B35` |
| その他 | `#8E8E93` |

### その他のハードコード色（テーマ非対応・改修候補）
- 警告/超過: `#FF4444`
- トライアル/期限: `#FF8C00`, `#6495ED`, `rgba(255,165,0,0.1)` など（Dashboard 内にインライン散在）

---

## 3. Typography（タイポグラフィ）

- **本文フォント**: `"Noto Sans JP", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif`（`globals.css` body）
  - Google Fonts から `Noto Sans JP` (300/400/500/600) を読み込み（`index.html`）。
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
- **字間**: 金額系に `letter-spacing: -0.5px`、見出しに `-0.5px`、ラベルに `+0.3〜0.5px`。
- ⚠️ `src/index.css` / `src/App.css` は **Vite テンプレートの残骸**（紫アクセント `#aa3bff` 等）。実画面では未使用。改修時に削除候補。

---

## 4. Component Stylings（コンポーネント）

### Card（`.soft-card`）
- `background: var(--card-bg)` / `border-radius: 16px` / `box-shadow: var(--shadow-soft)`
- `padding: 20px` / `margin-bottom: 24px`
- hover で `translateY(-2px)` + シャドウ強化、active で `scale(0.98)`

### Summary Card（`.summary-card`）
- ゴールドの微グラデ `linear-gradient(135deg, card-bg → gold 8%混色)` + `border: rgba(195,157,85,0.2)`
- 合計支出 / 契約数 / 予算プログレスバー / カテゴリ別ミニ積み上げバーを内包。

### Buttons
- **追加(+)ボタン**: 32×32 円形、`background: var(--gold-accent)`、白文字、`box-shadow: 0 4px 12px rgba(195,157,85,0.4)`。hover `scale(1.12)` / active `scale(0.92)`（`.add-btn`）。
- **テキストボタン**（編集/完了）: 透明背景・ゴールド文字。
- **チップ/フィルタ**: `border-radius: 20px`、選択時 `gold-accent-light` 背景 + ゴールド文字 + 1.5px ゴールド枠。

### Inputs
- 検索バー: `border-radius: 12px`、`background: var(--input-bg)`、左に虫眼鏡 SVG、`1px solid var(--border-color)`。

### Icon Box（サービスアイコン）
- 一覧: 52×52、`border-radius: 16px`、`input-bg` 背景。Clearbit ファビコン（`getLogoUrl(domain)`）を上に重ね、失敗時はカテゴリアイコン（`CategoryIcon`）にフォールバック。
- 汎用 `.icon-box`: 44×44 / `border-radius: 12px`。

### Bottom Navigation（`.bottom-nav`）
- 高さ80px、`backdrop-filter: blur(20px)` + `card-bg` 85% 半透明。
- 4タブ: ホーム / 分析 / カレンダー / 設定（SVG アイコン + 10px ラベル）。
- アクティブ: ゴールド着色、アイコン `scale(1.15)`、上部に伸びるインジケータ（バネ系イージング）。

### Modal / Bottom Sheet
- フィルタ等は下からのボトムシート（`border-radius: 24px 24px 0 0`、オーバーレイ `rgba(0,0,0,0.4)` + `blur(4px)`）。

---

## 5. Layout Principles（レイアウト）

- **ルーターなし**: `App.jsx` の `activeTab`（home/analysis/calendar/settings）でタブ切替する SPA。
- **コンテナ**: `.app-container` max 390px / 角丸40px / 白枠8px（デスクトップ）。`.dashboard-container` は `padding: 16px 24px 100px`（セーフエリア考慮）。
- **間隔**: カード間 16px、セクション間 24–32px、要素 gap 8–16px が中心。
- **スタイル記述**: グローバル CSS は `globals.css` のみ。**大半はコンポーネント内インラインスタイル**で記述（テーマ変数を参照）。改修時は散在に注意。

---

## 6. Depth & Elevation（奥行き）

- カード: `0 10px 25px rgba(0,0,0,0.05)`（hover で `0 14px 30px /0.08`）。
- アプリ枠: `0 25px 50px -12px rgba(0,0,0,0.25)`。
- ナビ: `backdrop-filter: blur(20px)` による半透明レイヤー。
- 全体に「白基調 + やわらかい影」で軽さを演出。

---

## 7. Animation（アニメーション）

- ページ初期表示: `fadeIn`（opacity + translateY 8px, 0.4s）。
- タブ切替: 方向付きスライド `tabSlideInRight/Left`（cubic-bezier, 0.28s）。
- 数値: `countFadeIn`（key 更新で再生）。
- ナビインジケータ: バネ系 `cubic-bezier(0.34,1.56,0.64,1)`。
- オンボーディング: `onboardSlideRight/Left`。

---

## 8. Iconography & Assets（アイコン・アセット）

### アプリアイコン（差し替え対象）
- 新素材: `New icon.png`（プロジェクト直下、1024×1024、淡ピンク背景のゆるかわキャラ）。
- 現状の配置先一覧（差し替えが必要な場所）:
  - Web/PWA: `public/icon.svg`, `public/favicon.svg`, `public/manifest.json`, `index.html`（`theme-color #C39D55`）
  - iOS: `ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png`（+ `Contents.json`）、Splash 各種
  - Android: `android/app/src/main/res/mipmap-*/ic_launcher*.png`（foreground/background/round）、`drawable*/splash.png`
  - `resources/icon.png`（Capacitor アセット生成元 / `@capacitor/assets` 用）
- ※ `public/` 配下は `android/.../assets/public`・`ios/App/App/public` にも複製あり。生成は `npx cap sync` 系で同期。

### UI アイコン
- ナビ・操作系は **インライン SVG**（Feather 系のストローク 1.5–2px）。
- カテゴリは絵文字 + `CategoryIcon` コンポーネント。サービスは Clearbit ファビコン。
- `lucide-react`（`Crown`, `SlidersHorizontal`, `X` 等）も使用。

---

## 9. 改修に向けた論点（Do's / Don'ts / TODO）

### 現状の課題
- アクセントが**ゴールド固定**で、新アイコンのパステル（ピンク/グリーン）と不一致。
- スタイルが**インライン散在**。色のハードコード（`#FF4444` 等）が多くテーマで切り替わらない。
- `src/index.css` / `src/App.css` が未使用の Vite 残骸。

### 改修の選択肢（要相談）
1. **アクセントカラー刷新**: `--gold-accent` 系をパステル（例: 抹茶グリーン×ピンク）に置換 → 全体が連動。
2. **テーマ名/プリセット見直し**: 「ゴールド」前提の命名・配色を変更。
3. **インライン色のトークン化**: ハードコード色を CSS 変数へ集約。
4. **アイコン一括差し替え**: `resources/icon.png` を新素材に置き換え、`@capacitor/assets` で各サイズ再生成。
5. **残骸 CSS の削除**: `index.css` / `App.css`。

### 維持したいもの
- iOS 風のやわらかい角丸・シャドウ・軽快なアニメーション。
- テーマ変数による集中管理の仕組み（`themes.js`）。
- タブ SPA 構造とボトムナビの操作感。

---

_作成日: 2026-06-15 / 対象コミット: master @ 2e88b39_
