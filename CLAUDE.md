# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

React + Vite で構築された日本語のサブスクリプション管理アプリ（「サブスク管理」）。Capacitor を使って Android/iOS モバイルアプリとしてパッケージング。価格はデフォルトJPY、ライブ為替レートによるUSD変換にも対応。

## コマンド

- `npm run dev` — Vite 開発サーバー起動
- `npm run build` — `dist/` に本番ビルド
- `npm run lint` — ESLint 実行
- `npm run preview` — 本番ビルドのプレビュー
- `npx cap sync` — Web ビルドをネイティブプラットフォームに同期
- `npx cap open android` / `npx cap open ios` — Android Studio / Xcode で開く

## アーキテクチャ

**ルーターなし** — タブベースの SPA。`App.jsx` が全状態を管理し、`activeTab` ステート（`home`, `analysis`, `calendar`, `settings`）でページを切り替え。

**状態管理と永続化** — 全アプリ状態は `App.jsx` の `useState` で管理。`localStorage` に以下のキーで永続化: `subsc_data`（サブスクリプション）、`subsc_theme`、`subsc_budget`、`subsc_history`（月別支出履歴）。

**データモデル** — 各サブスクリプションオブジェクトのフィールド: `id`, `name`, `price`, `categoryId`, `domain`（Clearbit経由のファビコン用）, `date`（請求日）, `currency`（`JPY`/`USD`）, `billingCycle`, `billingMonth`, `isPaused`, `isReminderEnabled`, `reminderDays`, `memo`。

**主要ディレクトリ:**
- `src/pages/` — Dashboard, Analysis, Calendar, Settings（タブビュー）
- `src/components/` — AddSubscription モーダル（追加/編集フォーム）
- `src/constants/` — カテゴリ、プリセットサブスク、課金サイクル、テーマ
- `src/utils/currency.js` — 価格変換（USD→JPY）と月額換算

**データマイグレーション** — `App.jsx` の初期化関数がロード時にレガシーデータを移行（旧カテゴリ名→新categoryId、デフォルトフィールド追加）。既存の localStorage データとの後方互換性のため、新フィールドはここで処理する必要がある。

**テーマ** — `THEMES` 設定から `document.documentElement` に CSS カスタムプロパティを設定。ライト（デフォルト）とダークの2テーマ。

## Capacitor / モバイル

- アプリID: `com.subscmanager.app`
- Web アセットは `dist/` から配信 — `npx cap sync` の前に必ず `npm run build` を実行
- Codemagic CI 設定は `codemagic.yaml`
- `vite.config.js` は `base: './'` で相対パス（Capacitor に必要）
