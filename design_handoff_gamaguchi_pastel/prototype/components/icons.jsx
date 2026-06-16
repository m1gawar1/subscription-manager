/* icons.jsx — inline SVG icon set (Feather-style stroke 1.6–2px) */
const Ico = ({ d, size = 22, sw = 1.8, fill = "none", children, vb = 24 }) => (
  <svg width={size} height={size} viewBox={`0 0 ${vb} ${vb}`} fill={fill} stroke="currentColor"
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {d ? <path d={d} /> : children}
  </svg>
);

const IconHome = (p) => (
  <Ico {...p}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" /></Ico>
);
const IconChart = (p) => (
  <Ico {...p}><path d="M4 20V4" /><path d="M4 20h16" /><rect x="7" y="11" width="3" height="6" rx="1" /><rect x="13" y="7" width="3" height="10" rx="1" /></Ico>
);
const IconCalendar = (p) => (
  <Ico {...p}><rect x="3.5" y="4.5" width="17" height="16" rx="3" /><path d="M3.5 9h17" /><path d="M8 2.5v4M16 2.5v4" /></Ico>
);
const IconSettings = (p) => (
  <Ico {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2.5v2.4M12 19.1v2.4M21.5 12h-2.4M4.9 12H2.5M18.7 5.3l-1.7 1.7M7 17l-1.7 1.7M18.7 18.7 17 17M7 7 5.3 5.3" /></Ico>
);
const IconSearch = (p) => (
  <Ico {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></Ico>
);
const IconPlus = (p) => (
  <Ico {...p}><path d="M12 5v14M5 12h14" /></Ico>
);
const IconFilter = (p) => (
  <Ico {...p}><path d="M4 7h16M7 12h10M10 17h4" /></Ico>
);
const IconChevron = (p) => (
  <Ico {...p}><path d="m9 5 7 7-7 7" /></Ico>
);
const IconBell = (p) => (
  <Ico {...p}><path d="M18 9a6 6 0 1 0-12 0c0 6-2.5 7-2.5 7h17S18 15 18 9Z" /><path d="M10.5 20a2 2 0 0 0 3 0" /></Ico>
);
const IconCrown = (p) => (
  <Ico {...p}><path d="M3 17h18l-1.4-9-4.6 4-3-5-3 5-4.6-4L3 17Z" /></Ico>
);
const IconX = (p) => (
  <Ico {...p}><path d="M6 6l12 12M18 6 6 18" /></Ico>
);
const IconCheck = (p) => (
  <Ico {...p}><path d="m5 12.5 4.5 4.5L19 7" /></Ico>
);
const IconSun = (p) => (
  <Ico {...p}><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.3M12 19.2v2.3M21.5 12h-2.3M4.8 12H2.5M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6M18.4 18.4l-1.6-1.6M7.2 7.2 5.6 5.6" /></Ico>
);
const IconMoon = (p) => (
  <Ico {...p}><path d="M20 14.5A8 8 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5Z" /></Ico>
);
const IconWallet = (p) => (
  <Ico {...p}><path d="M3.5 7.5A2.5 2.5 0 0 1 6 5h11a1.5 1.5 0 0 1 1.5 1.5V8" /><rect x="3.5" y="7.5" width="17" height="12" rx="2.6" /><path d="M16.5 13.5h.01" /><path d="M14.5 13.5a2 2 0 0 0 2 2h4v-4h-4a2 2 0 0 0-2 2Z" /></Ico>
);
const IconArrowUp = (p) => (
  <Ico {...p}><path d="M12 19V6M6 11l6-6 6 6" /></Ico>
);
const IconBolt = (p) => (
  <Ico {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></Ico>
);

Object.assign(window, {
  IconHome, IconChart, IconCalendar, IconSettings, IconSearch, IconPlus,
  IconFilter, IconChevron, IconBell, IconCrown, IconX, IconCheck, IconSun,
  IconMoon, IconWallet, IconArrowUp, IconBolt,
});
