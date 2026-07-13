import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable } from 'react-native';
import { Bell } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from '@/hooks/useTranslation';
import { usePreferences } from '@/hooks/usePreferences';
import {
  isNotificationsSupported,
  openAppNotificationSettings,
  requestNotificationPermission,
  syncReminder,
} from '@/lib/notifications';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function NotificationPrompt({ visible, onClose }: Props) {
  const { colors } = useColorScheme();
  const { t } = useTranslation();
  const { update } = usePreferences();

  const handleNotNow = async () => {
    await update({ hasAskedNotifications: true, notificationsEnabled: false });
    onClose();
  };

  const handleOpenSettings = async () => {
    await update({ hasAskedNotifications: true, notificationsEnabled: true });
    if (isNotificationsSupported) {
      const granted = await requestNotificationPermission();
      if (!granted) {
        await openAppNotificationSettings();
      } else {
        await syncReminder(true, t('notif.reminder.title'), t('notif.reminder.body'));
      }
    }
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <View style={[styles.iconWrap, { backgroundColor: colors.primaryDim }]}>
            <Bell size={28} color={colors.primary} strokeWidth={2} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>{t('notif.prompt.title')}</Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            {t('notif.prompt.body1')}
          </Text>
          <Text style={[styles.body, { color: colors.textSecondary }]}>
            {t('notif.prompt.body2')}
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.btn, styles.secondaryBtn, { borderColor: colors.border }]}
              onPress={handleNotNow}
              activeOpacity={0.7}
            >
              <Text style={[styles.secondaryText, { color: colors.text }]}>
                {t('notif.prompt.notNow')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: colors.primary }]}
              onPress={handleOpenSettings}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryText}>{t('notif.prompt.openSettings')}</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    padding: 28,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
    gap: 10,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
  body: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 21,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
    width: '100%',
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtn: { borderWidth: 1 },
  secondaryText: { fontSize: 14, fontFamily: 'Inter-SemiBold' },
  primaryText: { fontSize: 14, fontFamily: 'Inter-SemiBold', color: '#000' },
});
