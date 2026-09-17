import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { ChartBar as BarChart2, Trophy, Flame } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useHistory } from '@/hooks/useHistory';
import { useTranslation } from '@/hooks/useTranslation';
import { HistoryItem } from '@/components/atoms/molecules/HistoryItem';
import { CaloriesChart } from '@/components/atoms/molecules/CaloriesChart';

function EmptyState({
  colors,
  title,
  text,
}: {
  colors: ReturnType<typeof useColorScheme>['colors'];
  title: string;
  text: string;
}) {
  return (
    <View style={styles.empty}>
      <View style={[styles.emptyIcon, { backgroundColor: colors.primaryDim }]}>
        <BarChart2 size={32} color={colors.primary} strokeWidth={2} />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>{text}</Text>
    </View>
  );
}

export default function HistoryScreen() {
  const { colors } = useColorScheme();
  const { logs, loading, refetch } = useHistory();
  const { t } = useTranslation();

  const completedCount = logs.filter((l) => l.completed).length;
  const totalMinutes = logs.reduce((a, l) => a + Math.round(l.duration_seconds / 60), 0);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            tintColor={colors.primary}
          />
        }
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>{t('history.title')}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {t('history.subtitle')}
          </Text>
        </View>

        {logs.length > 0 && (
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Trophy size={20} color={colors.primary} strokeWidth={2} />
              <Text style={[styles.statNum, { color: colors.text }]}>{completedCount}</Text>
              <Text style={[styles.statLbl, { color: colors.textSecondary }]}>{t('history.completed')}</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <BarChart2 size={20} color={colors.secondary} strokeWidth={2} />
              <Text style={[styles.statNum, { color: colors.text }]}>{logs.length}</Text>
              <Text style={[styles.statLbl, { color: colors.textSecondary }]}>{t('history.total')}</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Flame size={20} color={colors.accent} strokeWidth={2} />
              <Text style={[styles.statNum, { color: colors.text }]}>{totalMinutes}</Text>
              <Text style={[styles.statLbl, { color: colors.textSecondary }]}>{t('history.minutes')}</Text>
            </View>
          </View>
        )}

        <View style={styles.chartSection}>
          <CaloriesChart logs={logs} />
        </View>

        <View style={styles.list}>
          {loading && logs.length === 0 ? (
            <ActivityIndicator
              color={colors.primary}
              size="large"
              style={{ marginTop: 60 }}
            />
          ) : logs.length === 0 ? (
            <EmptyState
              colors={colors}
              title={t('history.empty.title')}
              text={t('history.empty.text')}
            />
          ) : (
            logs.map((log) => <HistoryItem key={log.id} log={log} />)
          )}
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
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    alignItems: 'center',
    gap: 6,
  },
  statNum: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
  },
  statLbl: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  chartSection: {
    paddingHorizontal: 24,
  },
  list: {
    paddingHorizontal: 24,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 14,
    paddingHorizontal: 24,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 22,
  },
});
