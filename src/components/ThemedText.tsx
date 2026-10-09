import React from 'react';
import type { TextProps } from 'react-native';
import { Text, type TextStyle } from 'react-native';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'bodySm' | 'caption' | 'link' | 'count';

export interface ThemedTextProps extends TextProps {
  variant?: TextVariant;
  style?: TextStyle;
}

export function ThemedText({ variant = 'body', style, ...props }: ThemedTextProps) {
  const size = variant === 'h1' ? 26 : variant === 'h2' ? 20 : variant === 'h3' ? 16 : variant === 'bodySm' ? 12 : variant === 'caption' ? 11 : variant === 'link' ? 13 : 14;
  const lineHeight = variant === 'h1' ? 32 : variant === 'h2' ? 26 : variant === 'h3' ? 22 : variant === 'bodySm' ? 15 : variant === 'caption' ? 13 : variant === 'link' ? 16 : 20;
  const family = variant === 'h1' || variant === 'h2' ? 'System' : 'System';

  return (
    <Text
      style={[
        styles.base,
        { fontSize: size, lineHeight, fontFamily: family, ...style },
      ]}
      {...props}
    />
  );
}

const styles = {
  base: {
    color: '#1C1C1E',
    letterSpacing: 0,
  },
};
