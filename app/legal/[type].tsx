import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { usePreferences } from '@/hooks/usePreferences';
import { LEGAL_CONTENT } from '@/constants/legalContent';
import { Language } from '@/types/user';

type LegalType = 'terms' | 'privacy';

const FALLBACK: Language = 'en';

export default function LegalScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const router = useRouter();
  const { preferences } = usePreferences();

  const lang: Language = (['en', 'ja', 'fr', 'es', 'zh'] as Language[]).includes(
    preferences.language as Language
  )
    ? preferences.language
    : FALLBACK;

  const legalType: LegalType =
    type === 'terms' || type === 'privacy' ? type : 'terms';

  const content = LEGAL_CONTENT[lang]?.[legalType] ?? LEGAL_CONTENT[FALLBACK][legalType];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <ChevronLeft size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {content.title}
        </Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.lastUpdated}>{content.lastUpdated}</Text>

        {content.sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionHeading}>{section.heading}</Text>
            <Text style={styles.sectionBody}>{section.body}</Text>
          </View>
        ))}

        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2C2C2E',
  },
  backBtn: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  lastUpdated: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginBottom: 28,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeading: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 21,
  },
  sectionBody: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#EBEBF5CC',
    lineHeight: 22,
  },
  footer: {
    height: 40,
  },
});
