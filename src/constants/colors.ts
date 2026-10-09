/**
 * Design tokens from the Clickable Screenshots spec.
 * Primary: #0EA5E9
 * Secondary: #0284C7
 * Accent: #38BDF8
 * Background: #FAFAFA
 * Card: #FFFFFF
 */
export const colors = {
  primary: '#0EA5E9',
  primaryDark: '#0284C7',
  accent: '#38BDF8',
  background: '#FAFAFA',
  card: '#FFFFFF',
  backgroundAlt: '#F2F2F7',
  text: '#1C1C1E',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  border: '#E5E7EB',
  error: '#DC2626',
  warning: '#F59E0B',
  success: '#16A34A',
  tabBar: '#FFFFFF',
  tabBarInactive: '#CBD5E1',
  shadow: 'rgba(2, 132, 199, 0.12)',
} as const;

export type ColorName = keyof typeof colors;
