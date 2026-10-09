import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import type { StyleProp, TextStyle } from 'react-native';

export type IconName =
  | 'home'
  | 'book-open'
  | 'camera'
  | 'settings'
  | 'search'
  | 'link'
  | 'add-circle'
  | 'cloud-upload'
  | 'check-circle'
  | 'dangerous'
  | 'arrow-back'
  | 'arrow-forward'
  | 'more-horiz'
  | 'star'
  | 'star-outline'
  | 'person'
  | 'lock'
  | 'tractor'
  | 'article'
  | 'build'
  | 'event'
  | 'restore'
  | 'bookmark'
  | 'delete'
  | 'info'
  | 'warning'
  | 'refresh'
  | 'open-in-new'
  | 'view-list'
  | 'grid-on'
  | 'local-fire-department'
  | 'remove-circle';

const MAP: Record<IconName, React.ComponentProps<typeof MaterialIcons>['name']> = {
  home: 'home',
  'book-open': 'menu-book',
  camera: 'camera-alt',
  settings: 'settings',
  search: 'search',
  link: 'link',
  'add-circle': 'add-circle',
  'cloud-upload': 'cloud-upload',
  'check-circle': 'check-circle',
  dangerous: 'error-outline',
  'arrow-back': 'chevron-left',
  'arrow-forward': 'chevron-right',
  'more-horiz': 'more-horiz',
  star: 'star',
  'star-outline': 'star-border',
  person: 'person',
  lock: 'lock',
  tractor: 'storage',
  article: 'article',
  build: 'build',
  event: 'event',
  restore: 'restore',
  bookmark: 'bookmark',
  delete: 'delete',
  info: 'info',
  warning: 'warning',
  refresh: 'refresh',
  'open-in-new': 'open-in-new',
  'view-list': 'view-list',
  'grid-on': 'grid-on',
  'local-fire-department': 'local-fire-department',
  'remove-circle': 'remove-circle',
};

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export function Icon({ name, size = 24, color = '#1C1C1E', style }: IconProps) {
  return <MaterialIcons name={MAP[name]} size={size} color={color} style={style} />;
}
