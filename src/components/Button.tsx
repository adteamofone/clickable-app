import React from 'react';
import type { TouchableOpacityProps, StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import { borderRadius as th, themeColor } from '../constants/theme';
import { Icon } from './Icon';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  icon?: React.ComponentProps<typeof Icon>['name'];
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

export function Button({
  title,
  icon,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onPress,
  style,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.wrapper,
        {
          minHeight: size === 'sm' ? 36 : size === 'md' ? 44 : 52,
          paddingHorizontal: size === 'sm' ? 12 : size === 'md' ? 16 : 20,
          borderRadius: size === 'sm' ? th.sm : th.lg,
          backgroundColor: buttonBg(variant, disabled),
          borderWidth: disabled ? 1 : 0,
          borderColor: disabled ? themeColor('border') : buttonBorder(variant, disabled),
        },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={buttonTextColor(variant)} />
      ) : (
        <>
          {icon && <Icon name={icon} size={size === 'sm' ? 18 : 20} color={buttonTextColor(variant)} />}
          <Text
            style={[
              styles.text,
              { marginLeft: icon ? 8 : 0, fontSize: size === 'sm' ? 12 : 14 },
            ]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

function buttonBg(variant: ButtonVariant, disabled: boolean): string {
  if (disabled) return themeColor('border');
  switch (variant) {
    case 'primary':
      return themeColor('primary');
    case 'secondary':
      return themeColor('primaryDark');
    case 'destructive':
      return themeColor('error');
    case 'ghost':
      return 'transparent';
    default:
      return themeColor('primary');
  }
}

function buttonBorder(variant: ButtonVariant, disabled: boolean): string {
  if (disabled) return themeColor('border');
  if (variant === 'ghost') return themeColor('border');
  return 'transparent';
}

function buttonTextColor(variant: ButtonVariant): string {
  if (variant === 'ghost') return themeColor('primary');
  if (variant === 'destructive') return themeColor('error');
  return '#FFFFFF';
}

const styles = {
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
  },
};
