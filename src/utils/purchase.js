import { Capacitor } from '@capacitor/core';
import { Purchases, LOG_LEVEL } from '@revenuecat/purchases-capacitor';

const isNative = Capacitor.isNativePlatform();

// TODO: RevenueCatダッシュボードから取得したAPIキーに置き換えてください
// https://app.revenuecat.com → プロジェクト → API Keys
const REVENUECAT_API_KEY_IOS     = 'appl_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // iOS用公開APIキー
const REVENUECAT_API_KEY_ANDROID = 'goog_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Android用公開APIキー

const ENTITLEMENT_ID = 'pro';

/**
 * RevenueCatを初期化する。
 * App.jsx の初回起動useEffectから呼び出す。
 */
export const initializePurchases = async () => {
  if (!isNative) return;
  try {
    await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
    const apiKey = Capacitor.getPlatform() === 'ios'
      ? REVENUECAT_API_KEY_IOS
      : REVENUECAT_API_KEY_ANDROID;
    await Purchases.configure({ apiKey });
  } catch (e) {
    console.error('RevenueCat初期化エラー:', e);
  }
};

/**
 * プロ版を購入する。
 * @returns {Promise<boolean>} 購入成功でtrue、失敗・キャンセルでfalse
 */
export const purchasePro = async () => {
  if (!isNative) {
    return window.confirm('プロ版にアップグレードしますか？（開発中：実際の課金は発生しません）');
  }
  try {
    const offerings = await Purchases.getOfferings();
    const current = offerings.current;
    if (!current || !current.availablePackages.length) {
      alert('購入できる商品が見つかりませんでした。しばらくしてから再試行してください。');
      return false;
    }
    // current offeringの最初のパッケージ（= プロ版）を購入
    const pkg = current.availablePackages[0];
    const result = await Purchases.purchasePackage({ aPackage: pkg });
    const entitlement = result.customerInfo.entitlements.active[ENTITLEMENT_ID];
    return !!entitlement;
  } catch (e) {
    if (e.code === 'PURCHASE_CANCELLED') {
      // ユーザーが自分でキャンセルしたケース：エラー表示不要
      return false;
    }
    console.error('購入エラー:', e);
    alert(`購入に失敗しました: ${e.message || e}`);
    return false;
  }
};

/**
 * 過去の購入を復元する。
 * @returns {Promise<boolean>} プロ版エンタイトルメントが有効ならtrue
 */
export const restorePurchases = async () => {
  if (!isNative) return false;
  try {
    const customerInfo = await Purchases.restorePurchases();
    const entitlement = customerInfo.entitlements.active[ENTITLEMENT_ID];
    return !!entitlement;
  } catch (e) {
    console.error('購入復元エラー:', e);
    alert(`復元に失敗しました: ${e.message || e}`);
    return false;
  }
};

/**
 * RevenueCatのエンタイトルメントからプロ版ステータスを確認する。
 * アプリ起動時に呼び出し、ローカルのisPro状態をサーバー側と同期させる。
 * @returns {Promise<boolean>} プロ版エンタイトルメントが有効ならtrue
 */
export const checkProStatus = async () => {
  if (!isNative) return false;
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    const entitlement = customerInfo.entitlements.active[ENTITLEMENT_ID];
    return !!entitlement;
  } catch (e) {
    console.error('プロステータス確認エラー:', e);
    return false;
  }
};
