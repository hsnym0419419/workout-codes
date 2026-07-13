import { Platform, Linking } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { supabase } from '@/lib/supabase';

const REMINDER_ID_KEY = 'workout_reminder';
const REMINDER_HOUR = 20;
const REMINDER_MINUTE = 0;

export const isNotificationsSupported =
  Platform.OS !== 'web' && Constants.appOwnership !== 'expo';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermission(): Promise<boolean> {
  if (!isNotificationsSupported) return false;
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function openAppNotificationSettings() {
  if (Platform.OS === 'ios') {
    await Linking.openURL('app-settings:');
  } else if (Platform.OS === 'android') {
    await Linking.openSettings();
  }
}

export async function cancelReminder() {
  if (!isNotificationsSupported) return;
  try {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    await Promise.all(
      scheduled
        .filter((n) => n.content.data?.id === REMINDER_ID_KEY)
        .map((n) => Notifications.cancelScheduledNotificationAsync(n.identifier))
    );
  } catch {}
}

async function didWorkoutToday(): Promise<boolean> {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const { data } = await supabase
    .from('workout_logs')
    .select('id')
    .eq('completed', true)
    .gte('date', start.toISOString())
    .limit(1);
  return Array.isArray(data) && data.length > 0;
}

function tomorrowReminderDate(): Date {
  const next = new Date();
  next.setDate(next.getDate() + 1);
  next.setHours(REMINDER_HOUR, REMINDER_MINUTE, 0, 0);
  return next;
}

export async function syncReminder(
  enabled: boolean,
  title: string,
  body: string
) {
  if (!isNotificationsSupported) return;
  if (!enabled) {
    await cancelReminder();
    return;
  }
  await cancelReminder();
  const doneToday = await didWorkoutToday();
  if (doneToday) return;
  const when = tomorrowReminderDate();
  try {
    await Notifications.scheduleNotificationAsync({
      content: { title, body, data: { id: REMINDER_ID_KEY } },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: when },
    });
  } catch {}
}
