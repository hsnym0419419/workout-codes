import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Target, Activity, ChevronRight, Info, Globe, BookOpen, Bell, FileText, Shield } from 'lucide-react-native';
import {
  isNotificationsSupported,
  openAppNotificationSettings,
  requestNotificationPermission,
  syncReminder,
  cancelReminder,
} from '@/lib/notifications';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { usePreferences } from '@/hooks/usePreferences';
import { useTranslation } from '@/hooks/useTranslation';
import { UserPreference } from '@/types/user';
import { LANGUAGES } from '@/constants/translations';

const GOALS: UserPreference['goal'][] = [
  'weight_loss',
  'strength',
  'endurance',
  'flexibility',
];

const LEVELS: UserPreference['level'][] = ['beginner', 'intermediate', 'advanced'];

function SectionHeader({ title, colors }: { title: string; colors: any }) {
  return (
    <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
      {title.toUpperCase()}
    </Text>
  );
}

function SettingsCard({ children, colors }: { children: React.ReactNode; colors: any }) {
  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      {children}
    </View>
  );
}

function Divider({ colors }: { colors: any }) {
  return <View style={[styles.divider, { backgroundColor: colors.border }]} />;
}

export default function SettingsScreen() {
  const { colors } = useColorScheme();
  const { preferences, update } = usePreferences();
  const { t } = useTranslation();
  const router = useRouter();

  const handleToggleNotifications = async (value: boolean) => {
    if (value) {
      if (isNotificationsSupported) {
        const granted = await requestNotificationPermission();
        if (!granted) {
          await update({ notificationsEnabled: false });
          await openAppNotificationSettings();
          return;
        }
      }
      await update({ notificationsEnabled: true, hasAskedNotifications: true });
      await syncReminder(true, t('notif.reminder.title'), t('notif.reminder.body'));
    } else {
      await update({ notificationsEnabled: false });
      await cancelReminder();
    }
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>{t('settings.title')}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {t('settings.subtitle')}
          </Text>
        </View>

        <View style={styles.section}>
          <SectionHeader title={t('settings.fitnessGoal')} colors={colors} />
          <SettingsCard colors={colors}>
            {GOALS.map((goal, i) => (
              <React.Fragment key={goal}>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => update({ goal })}
                  activeOpacity={0.7}
                >
                  <View style={styles.rowLeft}>
                    <View style={[styles.rowIcon, { backgroundColor: colors.primaryDim }]}>
                      <Target size={16} color={colors.primary} strokeWidth={2} />
                    </View>
                    <Text style={[styles.rowLabel, { color: colors.text }]}>
                      {t(`goal.${goal}` as const)}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.radioOuter,
                      {
                        borderColor:
                          preferences.goal === goal ? colors.primary : colors.border,
                      },
                    ]}
                  >
                    {preferences.goal === goal && (
                      <View
                        style={[styles.radioInner, { backgroundColor: colors.primary }]}
                      />
                    )}
                  </View>
                </TouchableOpacity>
                {i < GOALS.length - 1 && <Divider colors={colors} />}
              </React.Fragment>
            ))}
          </SettingsCard>
        </View>

        <View style={styles.section}>
          <SectionHeader title={t('settings.fitnessLevel')} colors={colors} />
          <SettingsCard colors={colors}>
            {LEVELS.map((level, i) => (
              <React.Fragment key={level}>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => update({ level })}
                  activeOpacity={0.7}
                >
                  <View style={styles.rowLeft}>
                    <View style={[styles.rowIcon, { backgroundColor: `${colors.secondary}20` }]}>
                      <Activity size={16} color={colors.secondary} strokeWidth={2} />
                    </View>
                    <Text style={[styles.rowLabel, { color: colors.text }]}>
                      {t(`level.${level}` as const)}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.radioOuter,
                      {
                        borderColor:
                          preferences.level === level ? colors.primary : colors.border,
                      },
                    ]}
                  >
                    {preferences.level === level && (
                      <View
                        style={[styles.radioInner, { backgroundColor: colors.primary }]}
                      />
                    )}
                  </View>
                </TouchableOpacity>
                {i < LEVELS.length - 1 && <Divider colors={colors} />}
              </React.Fragment>
            ))}
          </SettingsCard>
        </View>

        <View style={styles.section}>
          <SectionHeader title={t('settings.language')} colors={colors} />
          <SettingsCard colors={colors}>
            {LANGUAGES.map((lang, i) => (
              <React.Fragment key={lang.value}>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => update({ language: lang.value })}
                  activeOpacity={0.7}
                >
                  <View style={styles.rowLeft}>
                    <View style={[styles.rowIcon, { backgroundColor: `${colors.accent}20` }]}>
                      <Globe size={16} color={colors.accent} strokeWidth={2} />
                    </View>
                    <Text style={[styles.rowLabel, { color: colors.text }]}>
                      {lang.nativeLabel}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.radioOuter,
                      {
                        borderColor:
                          preferences.language === lang.value ? colors.primary : colors.border,
                      },
                    ]}
                  >
                    {preferences.language === lang.value && (
                      <View
                        style={[styles.radioInner, { backgroundColor: colors.primary }]}
                      />
                    )}
                  </View>
                </TouchableOpacity>
                {i < LANGUAGES.length - 1 && <Divider colors={colors} />}
              </React.Fragment>
            ))}
          </SettingsCard>
        </View>

        <View style={styles.section}>
          <SettingsCard colors={colors}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <View style={[styles.rowIcon, { backgroundColor: colors.primaryDim }]}>
                  <Bell size={16} color={colors.primary} strokeWidth={2} />
                </View>
                <Text style={[styles.rowLabel, { color: colors.text }]}>
                  {t('settings.notifications')}
                </Text>
              </View>
              <Switch
                value={preferences.notificationsEnabled}
                onValueChange={handleToggleNotifications}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#fff"
              />
            </View>
          </SettingsCard>
        </View>

        <View style={styles.section}>
          <SettingsCard colors={colors}>
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.7}
              onPress={() => router.push('/onboarding')}
            >
              <View style={styles.rowLeft}>
                <View style={[styles.rowIcon, { backgroundColor: `${colors.secondary}20` }]}>
                  <BookOpen size={16} color={colors.secondary} strokeWidth={2} />
                </View>
                <Text style={[styles.rowLabel, { color: colors.text }]}>
                  {t('settings.guide')}
                </Text>
              </View>
              <ChevronRight size={18} color={colors.textTertiary} strokeWidth={2} />
            </TouchableOpacity>
            <Divider colors={colors} />
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.7}
              onPress={() => router.push('/legal/terms')}
            >
              <View style={styles.rowLeft}>
                <View style={[styles.rowIcon, { backgroundColor: `${colors.accent}20` }]}>
                  <FileText size={16} color={colors.accent} strokeWidth={2} />
                </View>
                <Text style={[styles.rowLabel, { color: colors.text }]}>
                  {t('settings.terms')}
                </Text>
              </View>
              <ChevronRight size={18} color={colors.textTertiary} strokeWidth={2} />
            </TouchableOpacity>
            <Divider colors={colors} />
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.7}
              onPress={() => router.push('/legal/privacy')}
            >
              <View style={styles.rowLeft}>
                <View style={[styles.rowIcon, { backgroundColor: colors.primaryDim }]}>
                  <Shield size={16} color={colors.primary} strokeWidth={2} />
                </View>
                <Text style={[styles.rowLabel, { color: colors.text }]}>
                  {t('settings.privacy')}
                </Text>
              </View>
              <ChevronRight size={18} color={colors.textTertiary} strokeWidth={2} />
            </TouchableOpacity>
          </SettingsCard>
        </View>

        <View style={styles.versionWrap}>
          <Text style={[styles.versionText, { color: colors.textTertiary }]}>
            {t('settings.version')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { paddingBottom: 40 },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    gap: 4,
  },
  title: { fontSize: 32, fontFamily: 'Inter-Bold' },
  subtitle: { fontSize: 14, fontFamily: 'Inter-Regular' },
  section: { paddingHorizontal: 24, marginBottom: 20, gap: 8 },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 1,
    marginBottom: 2,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: { fontSize: 15, fontFamily: 'Inter-Regular' },
  rowSub: { fontSize: 12, fontFamily: 'Inter-Regular', marginTop: 1 },
  divider: { height: StyleSheet.hairlineWidth, marginLeft: 62 },
  versionWrap: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: { width: 10, height: 10, borderRadius: 5 },
});
