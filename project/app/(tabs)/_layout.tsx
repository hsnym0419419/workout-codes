import { useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
import { Dumbbell, History, Settings } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from '@/hooks/useTranslation';
import { usePreferences } from '@/hooks/usePreferences';
import { NotificationPrompt } from '@/components/NotificationPrompt';
import { syncReminder } from '@/lib/notifications';

export default function TabLayout() {
  const { colors } = useColorScheme();
  const { t } = useTranslation();
  const { preferences } = usePreferences();
  const [promptVisible, setPromptVisible] = useState(false);

  useEffect(() => {
    if (preferences.hasSeenOnboarding && !preferences.hasAskedNotifications) {
      const tm = setTimeout(() => setPromptVisible(true), 400);
      return () => clearTimeout(tm);
    }
  }, [preferences.hasSeenOnboarding, preferences.hasAskedNotifications]);

  useEffect(() => {
    if (preferences.notificationsEnabled) {
      syncReminder(true, t('notif.reminder.title'), t('notif.reminder.body'));
    }
  }, [preferences.notificationsEnabled, preferences.language]);

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: 80,
            paddingBottom: 20,
            paddingTop: 10,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarLabelStyle: {
            fontFamily: 'Inter-Medium',
            fontSize: 11,
            marginTop: 2,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t('tab.workout'),
            tabBarIcon: ({ color, size }) => (
              <Dumbbell size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: t('tab.history'),
            tabBarIcon: ({ color, size }) => (
              <History size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: t('tab.settings'),
            tabBarIcon: ({ color, size }) => (
              <Settings size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
      </Tabs>
      <NotificationPrompt visible={promptVisible} onClose={() => setPromptVisible(false)} />
    </>
  );
}
