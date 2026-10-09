import type { ColorName } from './colors';
import { colors } from './colors';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    heavy: 'System',
  },
  sizes: {
    xs: 11,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 26,
  },
  lineHeight: {
    xs: 14,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    xxl: 32,
  },
} as const;

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(2, 132, 199, 0.08)',
  md: '0 4px 12px rgba(2, 132, 199, 0.12)',
  lg: '0 12px 32px rgba(2, 132, 199, 0.18)',
} as const;

export function themeColor(name: ColorName): string {
  return colors[name];
}

export const transition = {
  fast: '200ms ease',
  normal: '260ms ease',
  slow: '360ms ease',
} as const;

export const theme = {
  borderRadius,
  spacing,
  shadows,
};
