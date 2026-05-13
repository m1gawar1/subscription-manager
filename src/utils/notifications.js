import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

const isNative = Capacitor.isNativePlatform();

// 通知の権限をリクエスト
export const requestNotificationPermission = async () => {
  if (!isNative) return false;
  const { display } = await LocalNotifications.requestPermissions();
  return display === 'granted';
};

// 全通知をスケジュールし直す（サブスク変更時に呼ぶ）
export const scheduleAllNotifications = async (subscriptions, notificationHour = 9) => {
  if (!isNative) return;

  try {
    // 既存の通知をすべてキャンセル
    const pending = await LocalNotifications.getPending();
    if (pending.notifications.length > 0) {
      await LocalNotifications.cancel({ notifications: pending.notifications });
    }

    const notifications = [];
    const now = new Date();

    subscriptions
      .filter(sub => sub.isReminderEnabled !== false && !sub.isPaused)
      .forEach(sub => {
        const reminderDays = sub.reminderDays || [7, 3, 0];

        reminderDays.forEach(daysBefore => {
          // 次回の請求日を計算
          const billingDay = parseInt(sub.date);
          let nextBilling = new Date(now.getFullYear(), now.getMonth(), billingDay, notificationHour, 0, 0);

          // 請求日 - リマインダー日数 が過去なら来月に設定
          const notifyDate = new Date(nextBilling);
          notifyDate.setDate(notifyDate.getDate() - daysBefore);

          if (notifyDate <= now) {
            nextBilling.setMonth(nextBilling.getMonth() + 1);
            notifyDate.setTime(nextBilling.getTime());
            notifyDate.setDate(notifyDate.getDate() - daysBefore);
          }

          const id = Math.abs(hashCode(`${sub.id}-${daysBefore}`)) % 2147483647;

          const dayLabel = daysBefore === 0 ? '今日' : `${daysBefore}日後`;
          const priceLabel = sub.currency === 'USD' ? `$${sub.price}` : `¥${sub.price.toLocaleString()}`;

          notifications.push({
            id,
            title: `${sub.name} の更新${daysBefore === 0 ? '日です' : 'が近づいています'}`,
            body: `${dayLabel}に ${priceLabel} の請求があります`,
            schedule: { at: notifyDate },
            sound: 'default',
          });
        });
      });

    // 解約期限の通知（7日前、3日前、1日前、当日）
    subscriptions
      .filter(sub => sub.cancelDeadline && !sub.isPaused)
      .forEach(sub => {
        const deadline = new Date(sub.cancelDeadline);
        deadline.setHours(notificationHour, 0, 0, 0);

        [7, 3, 1, 0].forEach(daysBefore => {
          const notifyDate = new Date(deadline);
          notifyDate.setDate(notifyDate.getDate() - daysBefore);

          if (notifyDate <= now) return;

          const id = Math.abs(hashCode(`${sub.id}-cancel-${daysBefore}`)) % 2147483647;

          notifications.push({
            id,
            title: `${sub.name} の解約期限${daysBefore === 0 ? 'です！' : 'が近づいています'}`,
            body: daysBefore === 0
              ? '今日中に解約しないと自動更新されます'
              : `解約期限まであと${daysBefore}日です`,
            schedule: { at: notifyDate },
            sound: 'default',
          });
        });
      });

    if (notifications.length > 0) {
      await LocalNotifications.schedule({ notifications });
    }
  } catch (err) {
    console.error('Failed to schedule notifications:', err);
  }
};

// 文字列からハッシュコードを生成（通知ID用）
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash;
}
