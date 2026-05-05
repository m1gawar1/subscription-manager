# サブスク管理アプリ — 統合プロジェクト計画書

> 最終更新: 2026-03-31

---

## 1. プロジェクト概要

React + Vite で構築された日本語サブスクリプション管理アプリ。Capacitor を使い Android/iOS モバイルアプリとしてパッケージング。価格はデフォルト JPY、ライブ為替レートによる USD 変換にも対応。

- **リポジトリ**: https://github.com/m1gawar1/subscription-manager
- **アプリID**: `com.subscmanager.app`
- **技術スタック**: React, Vite, Capacitor
- **通知メール**: tim1209136@gmail.com

---

## 2. 現在の進捗状況

### 完了済み ✅

| # | 内容 | コミット |
|---|------|---------|
| 1 | アプリ基本機能（ダッシュボード・分析・カレンダー・設定） | `dd2d5aa` |
| 2 | Capacitor によるモバイルアプリ化（Android / iOS） | `c8bfa64` |
| 3 | Codemagic CI 設定（codemagic.yaml） | `455edb0` |
| 4 | TODO.md 追加（ビルド手順メモ） | `3d1d33a` |
| 5 | カテゴリ再設計（9カテゴリ）& プリセット（34件）定義 | 設計済み |
| 6 | 機能追加候補リスト（23項目）の洗い出し | 設計済み |
| 7 | 収益化戦略（フリーミアム + リワード + 買い切り）策定 | 設計済み |

### 未着手 🔲

- Codemagic での実際のビルド実行（Android / iOS）
- 収益化ロジックの実装
- 機能追加候補の実装

---

## 3. アーキテクチャ

| 項目 | 内容 |
|------|------|
| ルーティング | なし（タブベース SPA、`activeTab` で切り替え） |
| 状態管理 | `App.jsx` の `useState` |
| 永続化 | `localStorage`（`subsc_data`, `subsc_theme`, `subsc_budget`, `subsc_history`） |
| テーマ | CSS カスタムプロパティ（ライト / ダーク） |
| モバイル | Capacitor（`dist/` → ネイティブ同期） |

### ディレクトリ構成

```
src/
├── pages/       Dashboard, Analysis, Calendar, Settings
├── components/  AddSubscription モーダル
├── constants/   カテゴリ, プリセット, 課金サイクル, テーマ
└── utils/       currency.js（価格変換・月額換算）
```

### データモデル（サブスクリプション）

`id`, `name`, `price`, `categoryId`, `domain`, `date`, `currency`, `billingCycle`, `billingMonth`, `isPaused`, `isReminderEnabled`, `reminderDays`, `memo`

---

## 4. カテゴリ & プリセット設計

### カテゴリ（9種類）

| ID | アイコン | 名前 | 主な対象 |
|----|---------|------|---------|
| `video` | 🎬 | 動画配信 | Netflix, Hulu, U-NEXT, Disney+ |
| `music` | 🎵 | 音楽 | Spotify, Apple Music, LINE MUSIC |
| `game` | 🎮 | ゲーム | PS Plus, Xbox Game Pass, Switch Online |
| `reading` | 📚 | 読書・学習 | Kindle Unlimited, Audible, dマガジン |
| `cloud` | ☁️ | クラウド | iCloud+, Google One, Dropbox |
| `work` | 💼 | 仕事・クリエイティブ | Adobe CC, Microsoft 365, Canva |
| `ai` | 🤖 | AI・テック | ChatGPT Plus, Claude Pro, Copilot |
| `shopping` | 🛍️ | ショッピング | Amazon Prime |
| `other` | 📦 | その他 | — |

### マイグレーション（旧 → 新）

- `entertainment` → `video`
- `utility` → `cloud`
- `professional` → `work`

### プリセット合計: 34件

動画配信11件 / 音楽7件 / ゲーム4件 / 読書・学習5件 / クラウド5件 / 仕事4件 / AI6件 / ショッピング1件

---

## 5. 収益化戦略

### モデル: ハイブリッド・フリーミアム

| ティア | 内容 |
|--------|------|
| **無料** | 最大5件登録 / 基本機能すべて / バナー広告あり |
| **動画リワード** | 30秒動画視聴で +1枠永久追加（上限10〜15件） |
| **プロ版（買い切り）** | 800〜1,000円 / 無制限登録 / 広告非表示 / iCloud同期 / プレミアム外観 |

### ターゲットユーザー

| ユーザー層 | ニーズ | 対応ティア |
|-----------|--------|-----------|
| ライトユーザー | 3〜5個管理 | 無料 |
| コスト意識層 | 10個程度、課金は避けたい | 動画リワード |
| ヘビー/ビジネス層 | 20個以上を完璧に管理 | プロ版 |

### 競合との差別化

- Bobby（買い切り）→ 動画リワードで無料の幅が広い
- Subtrack（サブスク型）→ 買い切りで「サブスク疲れ」に対応
- SubsHub（買い切り/寄付）→ 動画リワードで粘着性向上

---

## 6. 機能追加候補（優先度別）

### 高優先度（すぐに価値が出る）

| # | 機能 | 概要 |
|---|------|------|
| 1 | Webプッシュ通知 | 更新日の当日・数日前にブラウザ通知 |
| 2 | 無料トライアル管理 | 試用期間終了日の管理・自動課金の警告 |
| 3 | 年払い節約シミュレーター | 月払い→年払いの節約額を試算 |
| 4 | システムダークモード自動追従 | `prefers-color-scheme` で自動切り替え |

### 中優先度（あると便利）

| # | 機能 | 概要 |
|---|------|------|
| 5 | 解約リマインダー | 更新前の解約期限を通知 |
| 6 | 解約シミュレーター | 予算内に収めるための解約提案 |
| 7 | 支出の前月比較 | 分析画面に先月比を表示 |
| 8 | サブスク詳細モーダル | カードタップで詳細ポップアップ |
| 9 | スワイプジェスチャー | 左右スワイプで一時停止/削除 |
| 10 | 複数通貨拡充 | EUR・GBP・CNY 追加 |
| 11 | タグ・ラベル機能 | 「仕事用」「家族共有」などのタグ |
| 12 | CSVエクスポート | Excel で開ける形式での出力 |
| 13 | アクセシビリティ改善 | aria-label・フォントサイズ設定 |

### 低優先度（将来的に）

| # | 機能 |
|---|------|
| 14 | コスパスコア |
| 15 | 1日あたりコスト表示 |
| 16 | カスタムアイコン/カラー |
| 17 | ウィジェット風サマリー |
| 18 | アニメーション強化 |
| 19 | クラウドバックアップ（iCloud/Google Drive） |
| 20 | 複数プロファイル |
| 21 | 言語切り替え（i18n） |
| 22 | キーボードショートカット |
| 23 | オンボーディング画面 |

---

## 7. 実装ロードマップ

### Phase 0: ビルド & リリース準備

- [ ] Codemagic で Android ビルドを実行
- [ ] APK をインストールして動作確認
- [ ] （任意）iOS ビルド実行・Apple Developer 登録検討

### Phase 1: 収益化 — 制限ロジック

- [x] 登録件数カウント & 上限アラート（無料5件制限）
- [x] 動画視聴（ダミー）による枠解放フラグ
- [x] 設定画面に「プロ版にアップグレード」項目追加

### Phase 2: 高優先度機能の実装

- [x] ローカル通知（Capacitor Local Notifications）
- [x] 無料トライアル管理
- [ ] ~~年払い節約シミュレーター~~ （不要と判断、削除済み）
- [x] システムダークモード自動追従

### Phase 3: 収益化 — 広告 & 課金

- [x] Google AdMob 統合（バナー / リワード広告）
- [x] アプリ内課金（StoreKit / Google Play Billing）連携
- ※ テスト用広告IDで実装済み。リリース時に本番ID・RevenueCat等の設定が必要

### Phase 4: 中優先度機能の実装

- [x] 解約リマインダー
- [x] サブスク詳細モーダル
- [ ] 解約シミュレーター（検討中）
- [ ] 支出の前月比較（検討中）
- [ ] スワイプジェスチャー（検討中）
- [ ] 複数通貨拡充（検討中）
- [ ] タグ・ラベル機能（検討中）
- [ ] CSVエクスポート（検討中）

### Phase 5: 仕上げ & 拡張

- [ ] アクセシビリティ改善
- [ ] 低優先度機能の選定・実装
- [ ] App Store / Google Play ストア公開

---

## 8. コマンドリファレンス

```bash
npm run dev          # 開発サーバー起動
npm run build        # 本番ビルド（dist/）
npm run lint         # ESLint
npm run preview      # ビルドプレビュー
npx cap sync         # Web → ネイティブ同期（build 後に実行）
npx cap open android # Android Studio で開く
npx cap open ios     # Xcode で開く
```

---

## 9. 参考情報

- **Codemagic 無料枠**: 月500分
- **Capacitor**: Web アセットは `dist/` から配信、`vite.config.js` で `base: './'`
- **為替レート**: `src/utils/currency.js` でライブ取得済み
- **データマイグレーション**: `App.jsx` の初期化関数でロード時に旧データを自動変換
