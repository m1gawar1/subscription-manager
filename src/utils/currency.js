import { getBillingCycleById } from '../constants/billing';

// 実際の請求金額をJPYに変換（割り算なし）
export const getConvertedPrice = (sub, exchangeRate) => {
  return sub.currency === 'USD' ? Math.round(sub.price * exchangeRate) : sub.price;
};

// 月換算金額（支払いサイクルで割った値）
export const getMonthlyPrice = (sub, exchangeRate) => {
  const cycle = getBillingCycleById(sub.billingCycle);
  return Math.round(getConvertedPrice(sub, exchangeRate) / cycle.divisor);
};
