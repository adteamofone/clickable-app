export type LinkCategory = 'products' | 'articles' | 'tools' | 'services' | 'other';

export const CATEGORIES: { value: LinkCategory; label: string }[] = [
  { value: 'products', label: 'Products' },
  { value: 'articles', label: 'Articles' },
  { value: 'tools', label: 'Tools' },
  { value: 'services', label: 'Services' },
  { value: 'other', label: 'Other' },
];
