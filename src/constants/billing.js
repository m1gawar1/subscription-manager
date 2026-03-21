export const BILLING_CYCLES = [
  { id: 'monthly',     label: '月払い',     shortLabel: '/月',   divisor: 1  },
  { id: 'quarterly',   label: '四半期払い', shortLabel: '/3ヶ月', divisor: 3  },
  { id: 'semi-annual', label: '半年払い',   shortLabel: '/半年', divisor: 6  },
  { id: 'yearly',      label: '年払い',     shortLabel: '/年',   divisor: 12 },
];

export const getBillingCycleById = (id) => {
  return BILLING_CYCLES.find(c => c.id === id) || BILLING_CYCLES[0];
};

// 指定した月がそのサブスクの課金月かどうかを返す（month は 1〜12）
export const isBillingMonth = (sub, month) => {
  const anchor = sub.billingMonth || 1;
  switch (sub.billingCycle) {
    case 'yearly':      return month === anchor;
    case 'semi-annual': return (month - anchor + 12) % 6 === 0;
    case 'quarterly':   return (month - anchor + 12) % 3 === 0;
    default:            return true; // monthly
  }
};
