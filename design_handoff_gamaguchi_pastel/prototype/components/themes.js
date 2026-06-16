/* themes.js — accent theme presets (light)
   現状ゴールド + 新アイコン（がま口パステル）から抽出した数案。
   各テーマは accent / accent2 / 中立色のみ持ち、淡色は CSS の color-mix で派生。 */
(function () {
  const THEMES = {
    gold: {
      id: "gold",
      label: "現状ゴールド",
      desc: "改修前のスナップショット",
      swatch: ["#C39D55", "#F5F6F8"],
      bg: "#F5F6F8",
      card: "#FFFFFF",
      input: "#F7F7F8",
      border: "#E6E6E8",
      text: "#1C1C1E",
      muted: "#8E8D92",
      accent: "#C39D55",
      accent2: "#C39D55",
      shadow: "rgba(20,20,30,0.05)",
    },
    gamaguchi: {
      id: "gamaguchi",
      label: "がま口パステル",
      desc: "新アイコンに最も忠実 · 抹茶グリーン×さくら",
      swatch: ["#7FA869", "#E89BB0"],
      bg: "#F6F3EC",
      card: "#FFFFFF",
      input: "#F4F0E7",
      border: "#ECE6D8",
      text: "#3B362E",
      muted: "#A39C8D",
      accent: "#7FA869",
      accent2: "#E89BB0",
      shadow: "rgba(120,100,60,0.07)",
    },
    sakura: {
      id: "sakura",
      label: "さくらピンク",
      desc: "ピンク主役 · やわらかく親しみやすい",
      swatch: ["#E07F9B", "#84B873"],
      bg: "#FBF4F5",
      card: "#FFFFFF",
      input: "#FAEEF0",
      border: "#F2E3E6",
      text: "#3A2E31",
      muted: "#AA959B",
      accent: "#E07F9B",
      accent2: "#84B873",
      shadow: "rgba(150,90,110,0.07)",
    },
    matcha: {
      id: "matcha",
      label: "抹茶ミント",
      desc: "上品で落ち着いた金融トーンを維持",
      swatch: ["#6DA68D", "#B6A6D6"],
      bg: "#F2F6F3",
      card: "#FFFFFF",
      input: "#ECF2EE",
      border: "#E0EAE3",
      text: "#2E3833",
      muted: "#93A099",
      accent: "#6DA68D",
      accent2: "#B6A6D6",
      shadow: "rgba(60,110,90,0.07)",
    },
  };

  // ---- color helpers (precompute derived colors as concrete values;
  //      color-mix() is avoided so html-to-image / PPTX export render correctly) ----
  function toRgb(hex) {
    let h = hex.replace("#", "");
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  // mix: weight w of color a over color b
  function mix(a, b, w) {
    const A = toRgb(a), B = toRgb(b);
    const r = Math.round(A[0] * w + B[0] * (1 - w));
    const g = Math.round(A[1] * w + B[1] * (1 - w));
    const bl = Math.round(A[2] * w + B[2] * (1 - w));
    return `rgb(${r}, ${g}, ${bl})`;
  }
  function rgba(hex, a) {
    const [r, g, b] = toRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  // CSS 変数へ流し込む（App.jsx の document.documentElement.style.setProperty 方式に倣う）
  function themeVars(t) {
    return {
      "--bg-app": t.bg,
      "--card-bg": t.card,
      "--input-bg": t.input,
      "--border": t.border,
      "--text": t.text,
      "--muted": t.muted,
      "--accent": t.accent,
      "--accent2": t.accent2,
      "--shadow": t.shadow,
      // 派生色（全て具体値）
      "--accent-soft": mix(t.accent, t.card, 0.12),
      "--accent-weak": mix(t.accent, t.card, 0.06),
      "--accent2-soft": mix(t.accent2, t.card, 0.14),
      "--accent-line": mix(t.accent, t.card, 0.24),
      "--accent-blend": mix(t.accent2, t.accent, 0.5),
      "--accent-shadow": rgba(t.accent, 0.4),
      "--accent-border": rgba(t.accent, 0.5),
      "--nav-bg": rgba(t.card, 0.9),
      "--nav-border": mix(t.border, t.card, 0.6),
      "--summary-grad": `linear-gradient(140deg, ${t.card} 0%, ${mix(t.accent, t.card, 0.09)} 100%)`,
    };
  }

  window.THEMES = THEMES;
  window.themeVars = themeVars;
  window.mix = mix;
  window.rgba = rgba;
})();
