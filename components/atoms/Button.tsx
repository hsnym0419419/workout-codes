import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  style,
  textStyle,
}: ButtonProps) {
  const { colors } = useColorScheme();

  const sizeStyle = size === 'sm' ? styles.sm : size === 'lg' ? styles.lg : styles.md;
  const variantStyle: ViewStyle =
    variant === 'primary' ? { backgroundColor: colors.primary } :
    variant === 'secondary' ? { backgroundColor: colors.surfaceElevated, borderWidth: 1, borderColor: colors.border } :
    variant === 'ghost' ? { backgroundColor: 'transparent' } :
    { backgroundColor: colors.error };
  const containerStyles = [styles.base, sizeStyle, variantStyle, (disabled || loading) ? { opacity: 0.5 } : undefined, style];

  const labelSize = size === 'sm' ? styles.labelSm : size === 'lg' ? styles.labelLg : styles.labelMd;
  const labelColor: TextStyle =
    variant === 'primary' ? { color: '#000000' } :
    variant === 'secondary' ? { color: colors.text } :
    variant === 'ghost' ? { color: colors.primary } :
    { color: '#FFFFFF' };
  const textStyles = [styles.label, labelSize, labelColor, textStyle];

  return (
    <TouchableOpacity
      style={containerStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#000' : colors.primary}
          size="small"
        />
      ) : (
        <Text style={textStyles}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sm: { paddingVertical: 8, paddingHorizontal: 16 },
  md: { paddingVertical: 14, paddingHorizontal: 24 },
  lg: { paddingVertical: 20, paddingHorizontal: 32 },
  label: { fontFamily: 'Inter-SemiBold', letterSpacing: 0.3 },
  labelSm: { fontSize: 13 },
  labelMd: { fontSize: 15 },
  labelLg: { fontSize: 17 },
});
