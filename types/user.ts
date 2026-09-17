export type Language = 'en' | 'ja' | 'fr' | 'es' | 'zh';

export interface UserPreference {
  goal: 'weight_loss' | 'strength' | 'endurance' | 'flexibility';
  level: 'beginner' | 'intermediate' | 'advanced';
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  language: Language;
  hasSeenOnboarding: boolean;
  notificationsEnabled: boolean;
  hasAskedNotifications: boolean;
}
