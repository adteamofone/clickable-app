import React from 'react';
import type { ViewProps } from 'react-native';
import { View } from 'react-native';
import { themeColor } from '../constants/theme';

export interface ThemedViewProps extends ViewProps {
  style?: any;
}

export function ThemedView({ style, ...props }: ThemedViewProps) {
  return <View style={[styles.container, style]} {...props} />;
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: themeColor('background'),
  },
};
