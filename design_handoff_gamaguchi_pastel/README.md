# 引継ぎ: サブスク管理アプリ — アクセント刷新「がま口パステル」

## 概要 (Overview)

サブスク管理アプリの **アクセントカラー刷新** 案。現状の「ゴールド基調（iOS風・金融トーン）」を、新アプリアイコン（`New icon.png` / がま口財布のゆるかわキャラ）の世界観に合わせた **パステル（抹茶グリーン × さくらピンク）** に置き換える。

このパッケージのゴールは、`prototype/` 内の HTML デザインを **既存の React コードベースに反映する**こと。具体的には:

1. `src/constants/themes.js` に **がま口パステル** テーマを定義し、既定テーマにする
2. `src/styles/globals.css` の `:root` 既定値を更新
3. インライン散在＆ハードコードされた色（`#FF4444` 等）を **テーマトークンへ集約**
4. PWA / iOS / Android のアイコン・テーマカラーを差し替え
5. Vite テンプレ残骸 CSS（`src/index.css` / `src/App.css`）を削除

> 既存コードベースの構造・前提は、本リポジトリにある `DESIGN.md`（現状デザイン仕様書）に準拠する。本 README は `DESIGN.md` を「改修指示」で上書きするもの。

---

## このバンドルのデザインファイルについて (About the Design Files)

`prototype/` に入っているのは **HTML で作られたデザインリファレンス**（見た目と挙動を示すプロトタイプ）であり、そのまま本番コードにコピーするものではありません。

- プロトタイプは React + Babel(CDN) のインラインJSXで素早く組んだ「見本」です。
- やることは、この見本を **既存アプリ（React + `themes.js` によるCSS変数管理 + タブSPA）の流儀で再現すること**。コンポーネント分割・状態管理・スタイル記述は、既存コードベースの既存パターンに合わせてください。
- プロトタイプは複数テーマを切替可能ですが、**採用は「がま口パステル（ライト）」**。他テーマ（現状ゴールド / さくらピンク / 抹茶ミント）は比較用で、実装対象外（ただしダーク版の指針は本書末尾の付録に記載）。

## 完成度 (Fidelity)

**ハイファイ (hifi)**。配色・タイポ・余白・角丸・影・インタラクションまで最終値で作り込み済み。色は下記「デザイントークン」の **具体値（hex / rgba）をそのまま**使ってください。

---

## デザイントークン (Design Tokens) — がま口パステル（ライト）★採用

`themes.js` は各テーマで `accent` / `accent2` と中立色のみを持ち、淡色は派生計算で生成する方式。**プロトタイプでは `color-mix()` を避け、全て具体値に事前展開**している（html-to-image / PPTX 書き出し対策）。本番では `color-mix()` を使ってもよいが、下記の **展開済み具体値**と一致させること。

### ベース（テーマが直接持つ値）

| トークン | 値 | 役割 |
|---|---|---|
| `--bg-app` | `#F6F3EC` | アプリ背景（温かいクリームホワイト） |
| `--card-bg` | `#FFFFFF` | カード背景 |
| `--input-bg` | `#F4F0E7` | 入力欄・チップ背景 |
| `--border` | `#ECE6D8` | 境界線 |
| `--text` | `#3B362E` | 本文（黒に寄せた温かいダークブラウン） |
| `--muted` | `#A39C8D` | 補助テキスト |
| `--accent` | `#7FA869` | **主アクセント（抹茶グリーン）** |
| `--accent2` | `#E89BB0` | **副アクセント（さくらピンク）** |
| `--shadow` | `rgba(120,100,60,0.07)` | カード影の色 |

### 派生（事前計算済み・実値）

| トークン | 値 | 生成式 | 用途 |
|---|---|---|---|
| `--accent-soft` | `rgb(240,245,237)` `#F0F5ED` | mix(accent,card,12%) | 選択チップ背景・アイコン枠・サマリchip |
| `--accent-weak` | `rgb(247,250,246)` `#F7FAF6` | mix(accent,card,6%) | 最も淡い面 |
| `--accent2-soft` | `rgb(252,241,244)` `#FCF1F4` | mix(accent2,card,14%) | 体験中バッジ・delta chip背景 |
| `--accent-line` | `rgb(224,234,219)` `#E0EADB` | mix(accent,card,24%) | サマリカード境界 |
| `--accent-blend` | `rgb(180,162,141)` `#B4A28D` | mix(accent2,accent,50%) | 進捗バー/推移バーのグラデ終点 |
| `--accent-shadow` | `rgba(127,168,105,0.40)` | rgba(accent,.4) | +ボタン・CTAの落ち影 |
| `--accent-border` | `rgba(127,168,105,0.50)` | rgba(accent,.5) | 選択チップの枠 |
| `--nav-bg` | `rgba(255,255,255,0.90)` | rgba(card,.9) | ボトムナビ半透明面 |
| `--nav-border` | `rgb(244,240,232)` `#F4F0E8` | mix(border,card,60%) | ナビ上端線 |
| `--summary-grad` | `linear-gradient(140deg,#FFFFFF 0%, rgb(243,247,242) 100%)` | card→mix(accent,card,9%) | サマリカード背景の微グラデ |

### グラデーション/合成の指定

- **進捗バー fill**: `linear-gradient(90deg, var(--accent), var(--accent-blend))`
- **推移バー（当月）**: `linear-gradient(180deg, var(--accent), var(--accent-blend))`
- **Premiumカード背景**: `linear-gradient(135deg, var(--accent-soft), var(--accent2-soft))`

### ハードコード色のトークン化（重要・改修必須）

現状 Dashboard 等にインライン散在している警告・期限系の色は、テーマで切り替わるよう **新トークン化**する。がま口パステルでの推奨値:

| 新トークン | ライト値 | 旧ハードコード | 用途 |
|---|---|---|---|
| `--warning` | `#E06A6A` | `#FF4444` | 予算超過・削除系（彩度を落として馴染ませる） |
| `--warning-soft` | `rgba(224,106,106,0.10)` | — | 警告の淡背景 |
| `--trial` | `#E8A04B` | `#FF8C00` | トライアル/期限（ピンクと喧嘩しない琥珀） |
| `--trial-soft` | `rgba(232,160,75,0.12)` | `rgba(255,165,0,0.1)` | 体験中の淡背景 |

> プロトタイプでは「体験中」バッジに `--accent2`（ピンク）系を使用。実アプリで「トライアル＝期限の注意喚起」を出したい場合は上記 `--trial` を使うこと。意味（ブランド色 vs 注意色）を切り分ける。

### カテゴリカラー（**据え置き**）

`src/constants/categories.js` の鮮やかな固定色（動画配信 `#E50914`、音楽 `#1DB954` 等）は **変更しない**。グラフ・ドット・アイコンの識別色として機能しており、パステルアクセントとは役割が異なる。プロトタイプでも原色のまま使用している。

### スペーシング / 角丸 / 影（据え置き、参考）

- カード角丸: `18px`（仕様書の16pxから微増。どちらでも可、既存16pxを尊重して良い）
- アイコン枠: `16px`（52×52）、汎用アイコン枠 `12px`（44×44）
- チップ: `20px`（pill）、検索バー `13px`
- カード影: `0 10px 26px var(--shadow)`、hover `translateY(-2px)`
- アプリ枠: `0 25px 50px -12px rgba(30,25,40,.28)`
- 余白: カード間 `10–14px`、セクション間 `22px`、画面パディング `4px 20px 112px`（下部はナビ＋セーフエリア）

### タイポグラフィ（据え置き）

`"Noto Sans JP", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif`（300/400/500/600/700）。

| 用途 | size | weight | letter-spacing |
|---|---|---|---|
| 合計金額（大） | 38px | 600 | -1.2px |
| 見出し（画面タイトル） | 26px | 700 | -0.6px |
| サービス名 / カード金額 | 15–16px | 600 | -0.3px |
| セクションタイトル | 12px | 600 | +0.6px・大文字 |
| 補助・ラベル・ナビ | 10–12px | 400–600 | — |

---

## themes.js への実装（コピペ用）

`src/constants/themes.js` に下記テーマを追加し、既定（`default`）にする。**変数名は既存コードの命名に合わせて調整**（プロトタイプは `--accent` 系の短縮名、現状アプリは `--gold-accent` 等の命名。下表で対応を取る）。

### 命名の対応表（現状 → 新）

| 現状（gold前提の命名） | 新（汎用命名・推奨） |
|---|---|
| `--gold-accent` | `--accent` |
| `--gold-accent-light` | `--accent-soft` |
| （新規） | `--accent2`, `--accent2-soft`, `--accent-line`, `--accent-blend`, `--accent-shadow`, `--accent-border`, `--nav-bg`, `--nav-border`, `--summary-grad` |
| `--text-main` | `--text` |
| `--text-muted` | `--muted` |
| `--shadow-soft` | （影は `0 10px 26px var(--shadow)` の形で `--shadow` に色だけ持たせる） |

> 「ゴールド」前提の命名（`--gold-accent` 等）はこの機会に汎用名へリネーム推奨。互換のためエイリアスを一時的に残しても良い。

```js
// src/constants/themes.js — がま口パステル（ライト）
export const gamaguchiLight = {
  id: 'gamaguchi',
  name: 'がま口パステル',
  vars: {
    '--bg-app':        '#F6F3EC',
    '--card-bg':       '#FFFFFF',
    '--input-bg':      '#F4F0E7',
    '--border':        '#ECE6D8',
    '--text':          '#3B362E',
    '--muted':         '#A39C8D',
    '--accent':        '#7FA869',
    '--accent2':       '#E89BB0',
    '--shadow':        'rgba(120,100,60,0.07)',
    // 派生（color-mix を使うなら下記式で。具体値は上の表と一致させる）
    '--accent-soft':   '#F0F5ED',
    '--accent-weak':   '#F7FAF6',
    '--accent2-soft':  '#FCF1F4',
    '--accent-line':   '#E0EADB',
    '--accent-blend':  '#B4A28D',
    '--accent-shadow': 'rgba(127,168,105,0.40)',
    '--accent-border': 'rgba(127,168,105,0.50)',
    '--nav-bg':        'rgba(255,255,255,0.90)',
    '--nav-border':    '#F4F0E8',
    '--summary-grad':  'linear-gradient(140deg,#FFFFFF 0%,#F3F7F2 100%)',
    // 注意色（旧ハードコードを集約）
    '--warning':       '#E06A6A',
    '--warning-soft':  'rgba(224,106,106,0.10)',
    '--trial':         '#E8A04B',
    '--trial-soft':    'rgba(232,160,75,0.12)',
  },
};
```

適用は現状どおり `App.jsx` で `document.documentElement.style.setProperty(key, value)` に流し込む方式を踏襲。`auto` / `default` / `dark` の3択構造もそのまま（`default` の中身を上記に差し替え）。

---

## 画面 / ビュー (Screens / Views)

プロトタイプは 390×844 の iPhone フレーム内・タブSPA（ルーターなし、`activeTab` 切替）。4タブ＋ボトムシート。

### 1. ホーム (home)
- **目的**: 今月の支出サマリと登録サービス一覧の確認・検索・絞り込み。
- **レイアウト**: 縦スクロール。`ヘッダー → サマリカード → セクション見出し → 検索バー → カテゴリチップ列(横スクロール) → サービスカード一覧`。画面右下に絞り込みFAB。
- **ヘッダー**: 左に小さな「おかえりなさい」(12px/muted) ＋「ホーム」(26px/700)。右に通知ベル(ghost-btn 38円)＋追加(+)ボタン（38円・`--accent`・白アイコン・`box-shadow:0 6px 16px var(--accent-shadow)`、hover scale1.1 / active 0.9）。
- **サマリカード**: 背景 `--summary-grad`＋枠 `1px solid --accent-line`。内訳=「今月の支出」ラベル＋件数chip(`--accent-soft`地/`--accent`字)、合計金額 `¥16,236`(38px/600)＋`/月`＋前月比delta chip(`--accent2`字/`--accent2-soft`地)、年間換算＋先月比の補助行、予算ブロック(`予算 ¥18,000` / `90%`(`--accent`) / 進捗バー fill=accent→accent-blend / `残り ¥1,764`)、カテゴリ積み上げバー(原色)＋凡例(上位3＋「他Nカテゴリ」、`white-space:nowrap`)。
- **検索バー**: `--input-bg`地・`1px solid --border`・角丸13px・左に虫眼鏡(muted)。
- **チップ列**: pill(20px)。選択時 `--accent-soft`地・`--accent`字・`1.5px solid --accent-border`。横スクロール（スクロールバー非表示）。
- **サービスカード**: `.soft-card`(白/角丸18/影)。`アイコン52(角丸16) → 本文(名前15/600＋メタ:カテゴリ色ドット+カテゴリ名+「毎月N日」) → 価格(¥/16/600＋/月)`。`体験中`バッジはピンク系。hoverで持ち上げ。
- **密度**: `compact / regular / comfy` の3段階でカード余白・間隔を変える（現在ユーザー選択は **compact**）。

### 2. 分析 (analysis)
- **目的**: 支出の内訳と推移の可視化。
- **構成**: ドーナツ(conic-gradientでカテゴリ比率・中央ホールに合計)→ カテゴリ別ランキング(色ドット＋名＋横バー＋金額＋%)→「月別の推移」棒グラフ(6ヶ月、当月のみaccentグラデ)＋平均/増減フッター。
- グラフ色＝カテゴリ原色。バーfill/当月バー＝アクセント系。

### 3. カレンダー (calendar)
- **目的**: 支払日の俯瞰と直近請求の確認。
- **構成**: 月ピル(`--accent-soft`/`--accent`)。7×N の月グリッド。請求のある日にカテゴリ色ドット（最大3）。当日セルは `--accent-soft`地・番号 `--accent`。下に「まもなく請求」リスト（日付ボックス＋名＋「あとN日/今日」＋金額）。
- 曜日見出しの日曜=`#E0667E`/土曜=`#5B8DD6`（固定）。

### 4. 設定 (settings)
- **目的**: アプリ設定・課金・データ管理。
- **構成**: **ブランドカード（新アイコンを主役に60×60角丸16で表示）** → Premium訴求カード（`linear-gradient(135deg,accent-soft,accent2-soft)`＋王冠）→「表示」グループ(テーマ/アクセントカラー、ミニ swatch=accent→accent2グラデ)→「通知とお金」(トグル群＋予算)→「その他」(CSV/About/削除=warning色)。
- トグル: OFF=`--border`地、ON=`--accent`地、白ノブ。

### 5. フィルタ・ボトムシート (filter sheet)
- **目的**: 並び替え＆カテゴリ絞り込み。
- **構成**: ホーム右下FAB(50角丸16・白地・accentアイコン)から起動。下からのシート(角丸 `26px 26px 0 0`)＋オーバーレイ(`rgba(0,0,0,.4)`＋`blur(3px)`)。グリップ→見出し＋×→「並び替え」chip群→「カテゴリ」chip群(色ドット付)→「この条件で表示」CTA(`--accent`地・白)。

---

## インタラクション & 挙動 (Interactions & Behavior)

- **タブ切替**: `activeTab` state。プロトタイプは方向なしの再マウント（key=tab）。実アプリは現状の方向付きスライド `tabSlideInRight/Left`(cubic-bezier,0.28s) を踏襲してよい。
- **ボトムナビ**: アクティブタブは `--accent` 着色＋アイコン `scale(1.15)`＋上部インジケータ(バネ系 `cubic-bezier(0.34,1.56,0.64,1)`)。背景 `--nav-bg`＋`backdrop-filter:blur(20px)`。
- **追加ボタン**: hover `scale(1.1)` / active `scale(0.9)`。
- **チップ/検索**: チップ選択でリストを即時フィルタ。検索は名前部分一致。
- **ボトムシート**: FABでopen、オーバーレイ/×でclose。
  > ⚠️ **実装注記（重要）**: プロトタイプでは、開閉を CSS `transition`/`@keyframes` で出すと環境によって固まる事象があったため、**シートは open 時のみマウントし、基準スタイル＝表示状態**にしている。本番（実機・通常の前面表示）では `transform: translateY(100%)→0` のスライドや transition で問題ない。ただし**初期非表示状態(opacity:0 等)を基準に残すと、印刷/スクショ/PDF出力で空表示になり得る**点に注意。entrance アニメは「表示状態を基準に、隠れた状態から動かす」設計にする。
- **入場アニメ（ページ初期表示）**: 仕様書の `fadeIn`（opacity+translateY 8px,0.4s）を踏襲してよいが、上と同じ理由で **終端=表示を基準**にすること。

## 状態管理 (State Management)

- `activeTab`: 'home' | 'analysis' | 'calendar' | 'settings'
- `theme`: 'auto' | 'default(=gamaguchi)' | 'dark'（`auto`は `prefers-color-scheme` 監視）
- `sheetOpen`: boolean（フィルタシート）
- ホーム: `query`(検索), `filter`(カテゴリ), 並び替えキー
- データ取得は既存アプリの実装に従う（プロトタイプのサンプルデータは `prototype/components/data.js` 参照、実値ではない）。

---

## アセット (Assets)

- **新アプリアイコン**: `prototype/assets/app-icon.png`（= 元の `New icon.png`、1024×1024）。差し替え先一覧は `DESIGN.md §8` を参照:
  - Web/PWA: `public/icon.svg` `public/favicon.svg` `public/manifest.json`、`index.html` の `theme-color` を **`#C39D55` → `#7FA869`** に
  - iOS: `ios/App/App/Assets.xcassets/AppIcon.appiconset/…`、Splash
  - Android: `android/app/src/main/res/mipmap-*/…`、`drawable*/splash.png`
  - 生成元: `resources/icon.png` を新素材に置換 → `@capacitor/assets` で各サイズ再生成 → `npx cap sync`
- **UIアイコン**: プロトタイプは Feather系のインラインSVG（stroke 1.5–1.8px、`prototype/components/icons.jsx`）。実アプリの既存アイコン(`lucide-react` 等)で代替可。
- **サービスロゴ**: Clearbit ファビコン（`https://logo.clearbit.com/<domain>`）。失敗時は「頭文字＋カテゴリ色」モノグラムにフォールバック（現状仕様どおり）。

---

## やることチェックリスト (TODO)

- [ ] `themes.js` に `gamaguchi`（ライト）を追加し既定化、命名を汎用化（`--gold-*`→`--accent-*`）
- [ ] `globals.css` `:root` 既定値を更新
- [ ] 新トークン `--accent2 / --accent-soft / …` を全参照箇所に展開
- [ ] ハードコード色（`#FF4444` `#FF8C00` `rgba(255,165,0,.1)` 等）を `--warning / --trial` 系へ集約
- [ ] `index.html` `theme-color` ＋ PWA/iOS/Android アイコン差し替え（`@capacitor/assets`→`cap sync`）
- [ ] Vite残骸 `src/index.css` `src/App.css` を削除
- [ ] ダークの「がま口」版を追加（付録参照）
- [ ] 入場/シートのアニメは「表示を基準」に（空表示バグ回避）

## 維持するもの (Keep)

- iOS風のやわらかい角丸・影・軽快なアニメーション
- `themes.js` によるCSS変数の集中管理
- タブSPA構造とボトムナビの操作感
- カテゴリ原色（識別色として据え置き）

---

## 付録: ダーク版「がま口パステル」（推奨値）

ライトを採用したが、アプリはダークも持つため、整合する暗色版を用意。アクセントは暗背景でのコントラスト確保のため少し明るめの抹茶に。

| トークン | 値 |
|---|---|
| `--bg-app` | `#16140F` |
| `--card-bg` | `#1F1C16` |
| `--input-bg` | `#2A271F` |
| `--border` | `#3A352B` |
| `--text` | `#ECE6DA` |
| `--muted` | `#A39C8D` |
| `--accent` | `#93BE80` |
| `--accent2` | `#E89BB0` |
| `--shadow` | `rgba(0,0,0,0.30)` |
| `--accent-soft` | `rgb(40,45,36)` 付近（mix(accent,card,12%)） |
| `--accent2-soft` | `rgb(45,38,40)` 付近（mix(accent2,card,14%)） |
| `--warning` | `#E5736B` / `--trial` | `#E2A24E` |

---

## ファイル (Files)

- `prototype/がま口サブスク 改善案.html` — メイン（iPhoneフレーム＋全画面＋テーマ切替Tweaks）
- `prototype/components/themes.js` — **4テーマのトークン定義＋派生計算（移植の主参照）**
- `prototype/components/data.js` — カテゴリ＆サンプルサブスクデータ
- `prototype/components/styles.css`, `styles2.css` — クラス定義（CSS変数駆動）
- `prototype/components/home.jsx` `analysis.jsx` `calendar.jsx` `settings.jsx` — 各画面＋フィルタシート
- `prototype/components/icons.jsx` `shared.jsx` — アイコン・共通部品
- `prototype/assets/app-icon.png` — 新アプリアイコン
- リポジトリ直下 `DESIGN.md` — 現状仕様書（改修前のベースライン）

> プロトタイプを手元で開く場合は `prototype/がま口サブスク 改善案.html` をブラウザで。右上の Tweaks からテーマ＝「がま口パステル」を選択した状態が採用案。

## スクリーンショット (Screenshots)

`screenshots/` に採用テーマ（がま口パステル・ライト）の各画面を同梱:

| ファイル | 画面 |
|---|---|
| `screenshots/01-home.png` | ホーム（サマリカード＋サービス一覧） |
| `screenshots/02-analysis.png` | 分析（ドーナツ＋ランキング＋推移） |
| `screenshots/03-calendar.png` | カレンダー（支払日＋直近請求） |
| `screenshots/04-settings.png` | 設定（新アイコン＋Premium＋テーマ） |
| `screenshots/05-filter-sheet.png` | フィルタ・ボトムシート |
