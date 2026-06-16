// テーマ定義（がま口パステル）
//
// 命名方針: 新名 --accent 系を正とし、旧名 --gold-accent 系は
// 同値のエイリアスとして併記する（既存インラインスタイル145箇所を無改修で緑化するため）。
// 新規コードは新名トークンを使用すること。

export const THEMES = {
  // ライト（既定）= がま口パステル
  default: {
    name: 'ライト',
    variables: {
      // --- ベース ---
      '--bg-app': '#F6F3EC',
      '--card-bg': '#FFFFFF',
      '--input-bg': '#F4F0E7',
      '--border': '#ECE6D8',
      '--text': '#3B362E',
      '--muted': '#A39C8D',
      '--accent': '#7FA869',   // 主アクセント（抹茶グリーン）
      '--accent2': '#E89BB0',  // 副アクセント（さくらピンク）
      '--shadow': 'rgba(120,100,60,0.07)', // カード影の色

      // --- 派生（事前計算済みの実値）---
      '--accent-soft': '#F0F5ED',
      '--accent-weak': '#F7FAF6',
      '--accent2-soft': '#FCF1F4',
      '--accent-line': '#E0EADB',
      '--accent-blend': '#B4A28D',
      '--accent-shadow': 'rgba(127,168,105,0.40)',
      '--accent-border': 'rgba(127,168,105,0.50)',
      '--nav-bg': 'rgba(255,255,255,0.90)',
      '--nav-border': '#F4F0E8',
      '--summary-grad': 'linear-gradient(140deg,#FFFFFF 0%,#F3F7F2 100%)',

      // --- 注意色（旧ハードコードを集約）---
      '--warning': '#E06A6A',
      '--warning-soft': 'rgba(224,106,106,0.10)',
      '--warning-border': 'rgba(224,106,106,0.30)',
      '--trial': '#E8A04B',
      '--trial-soft': 'rgba(232,160,75,0.12)',
      '--trial-border': 'rgba(232,160,75,0.30)',

      // --- 旧名エイリアス（互換のため。値は新トークンと一致）---
      '--gold-accent': '#7FA869',
      '--gold-accent-light': 'rgba(127,168,105,0.12)',
      '--border-color': '#ECE6D8',
      '--text-main': '#3B362E',
      '--text-muted': '#A39C8D',
      '--shadow-soft': '0 10px 26px rgba(120,100,60,0.07)',
      '--border-radius-lg': '16px',
    }
  },
  // ダーク = がま口パステル（暗色版）
  dark: {
    name: 'ダーク',
    variables: {
      // --- ベース ---
      '--bg-app': '#16140F',
      '--card-bg': '#1F1C16',
      '--input-bg': '#2A271F',
      '--border': '#3A352B',
      '--text': '#ECE6DA',
      '--muted': '#A39C8D',
      '--accent': '#93BE80',   // 暗背景でのコントラスト確保のため少し明るめ
      '--accent2': '#E89BB0',
      '--shadow': 'rgba(0,0,0,0.30)',

      // --- 派生 ---
      '--accent-soft': '#282D24',
      '--accent-weak': '#22241B',
      '--accent2-soft': '#2D2628',
      '--accent-line': '#3B432F',
      '--accent-blend': '#BDAC98',
      '--accent-shadow': 'rgba(147,190,128,0.40)',
      '--accent-border': 'rgba(147,190,128,0.50)',
      '--nav-bg': 'rgba(31,28,22,0.90)',
      '--nav-border': '#2F2B22',
      '--summary-grad': 'linear-gradient(140deg,#1F1C16 0%,#292A1F 100%)',

      // --- 注意色 ---
      '--warning': '#E5736B',
      '--warning-soft': 'rgba(229,115,107,0.12)',
      '--warning-border': 'rgba(229,115,107,0.30)',
      '--trial': '#E2A24E',
      '--trial-soft': 'rgba(226,162,78,0.14)',
      '--trial-border': 'rgba(226,162,78,0.30)',

      // --- 旧名エイリアス ---
      '--gold-accent': '#93BE80',
      '--gold-accent-light': 'rgba(147,190,128,0.15)',
      '--border-color': '#3A352B',
      '--text-main': '#ECE6DA',
      '--text-muted': '#A39C8D',
      '--shadow-soft': '0 10px 26px rgba(0,0,0,0.30)',
      '--border-radius-lg': '16px',
    }
  }
};
