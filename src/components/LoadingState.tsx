import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { themeColor } from '../constants/theme';

export interface LoadingStateProps {
  label?: string;
  size?: number;
}

export function LoadingState({ label = 'Working…', size = 24 }: LoadingStateProps) {
  return (
    <ActivityIndicator
      size="large"
      color={themeColor('primary')}
      style={styles.wrapper}
      aria-label={label}>
      <ThemedText variant="bodySm" style={styles.label}>
        {label}
      </ThemedText>
    </ActivityIndicator>
  );
}

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: themeColor('textSecondary'),
    marginTop: 8,
  },
});
