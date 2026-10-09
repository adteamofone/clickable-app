import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme, themeColor } from '../constants/theme';

export interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  style?: any;
}

export function Avatar({ name, size = 'md', color, style }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase();
  const bg = color || themeColor('primary');

  return (
    <View
      style={[
        styles.wrapper,
        { width: sizeSize(size), height: sizeSize(size), borderRadius: sizeSize(size) / 2 },
        { backgroundColor: bg },
        style,
      ]}>
      <Text style={[styles.text, { color: '#FFFFFF', fontWeight: '700', fontSize: sizeSize(size) * 0.42 }]}>
        {initials}
      </Text>
    </View>
  );
}

function sizeSize(size: string): number {
  switch (size) {
    case 'sm': return 28;
    case 'lg': return 40;
    case 'xl': return 56;
    default: return 36;
  }
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    lineHeight: 1,
  },
});
