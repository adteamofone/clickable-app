import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { Icon } from './Icon';
import { theme, themeColor } from '../constants/theme';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ComponentProps<typeof Icon>['name'];
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  icon = 'search',
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={40} color={themeColor('textTertiary')} />
      </View>
      <ThemedText variant="h3" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText variant="body" style={styles.description}>
        {description}
      </ThemedText>
      {actionLabel && onAction && (
        <View style={styles.action}>
          <ThemedText
            style={styles.actionLabel}
            onPress={onAction}
            accessible
            accessibilityRole="button">
            {actionLabel}
          </ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: themeColor('backgroundAlt'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    color: themeColor('text'),
    textAlign: 'center',
    marginBottom: 6,
  },
  description: {
    color: themeColor('textSecondary'),
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: theme.spacing.lg,
  },
  action: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: themeColor('primary'),
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  actionLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
});
