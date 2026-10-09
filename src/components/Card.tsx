import React from 'react';
import type { ViewProps, StyleProp, ViewStyle } from 'react-native';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from './Icon';
import { theme, themeColor } from '../constants/theme';
import { ThemedText } from './ThemedText';

export interface CardProps extends ViewProps {
  accessible?: boolean;
  accessibilityLabel?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Card({ accessible = true, accessibilityLabel, onPress, style, ...props }: CardProps) {
  if (onPress) {
    return (
      <TouchableOpacity
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        activeOpacity={0.9}
        onPress={onPress}
        style={[styles.wrapper, style]}
        {...props}
      />
    );
  }
  return <View style={[styles.wrapper, style]} {...props} />;
}

export interface LinkCardProps extends ViewProps {
  title: string;
  excerpt: string;
  category: string;
  favorite: boolean;
  thumbnail: string;
  onPress: () => void;
}

export function LinkCard({ title, excerpt, category, favorite, thumbnail, onPress }: LinkCardProps) {
  return (
    <Card accessible accessibilityLabel={title} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.thumb}>
          <ThemedText variant="caption" style={styles.thumbText}>
            {thumbnail}
          </ThemedText>
        </View>
        <View style={styles.content}>
          <ThemedText variant="bodySm" numberOfLines={2} style={styles.title}>
            {title}
          </ThemedText>
          <ThemedText variant="body" style={styles.excerpt} numberOfLines={2}>
            {excerpt}
          </ThemedText>
          <View style={styles.meta}>
            <ThemedText variant="caption" style={styles.category}>
              {category}
            </ThemedText>
            {favorite && <Icon name="star" size={12} color={themeColor('accent')} />}
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: themeColor('card'),
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    elevation: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: themeColor('border'),
  },
  row: {
    flexDirection: 'row',
  },
  thumb: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.md,
    backgroundColor: themeColor('backgroundAlt'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbText: {
    fontWeight: '600',
  },
  content: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  title: {
    fontWeight: '600',
    marginBottom: 2,
  },
  excerpt: {
    color: themeColor('textSecondary'),
    fontSize: 12,
    lineHeight: 16,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  category: {
    color: themeColor('primary'),
    fontWeight: '600',
  },
});
