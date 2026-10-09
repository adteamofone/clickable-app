import React from 'react';
import type { ViewStyle } from 'react-native';
import { TouchableOpacity, Text, View } from 'react-native';
import { themeColor, theme } from '../constants/theme';

export interface ToggleProps {
  value: boolean;
  onValueChange: (v: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
  thumbColor?: string;
  activeTrack?: string;
  inactiveTrack?: string;
}

export function Toggle({
  value,
  onValueChange,
  disabled = false,
  style,
  thumbColor = '#FFFFFF',
  activeTrack = themeColor('primary'),
  inactiveTrack = themeColor('border'),
}: ToggleProps) {
  return (
    <TouchableOpacity
      style={[
        styles.wrapper,
        { backgroundColor: value ? activeTrack : inactiveTrack, ...style },
      ]}
      activeOpacity={0.85}
      disabled={disabled}
      onPress={() => onValueChange(!value)}>
      <View
        style={[
          styles.thumb,
          { backgroundColor: thumbColor, transform: [{ translateX: value ? 24 : 4 }] },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = {
  wrapper: {
    height: 32,
    borderRadius: 16,
    padding: 2,
    justifyContent: 'center',
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
  },
};
