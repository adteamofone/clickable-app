import type { ClickableLink, ScreenshotAsset, Session, SavedResult, UserPreference, PurchaseState } from '../types';

export const NOW = new Date().toISOString();

export const CURRENT_USER: import('../types').UserProfile = {
  id: 'user-1',
  displayName: 'Alex Rivera',
  email: 'alex@example.com',
  avatarUrl: 'https://example.com/avatars/alex.png',
  subscriptionStatus: 'free',
  onboardingCompleted: true,
  createdAt: '2026-09-28T12:00:00Z',
  updatedAt: NOW,
};

export const USER_PREFERENCES: UserPreference = {
  id: 'pref-1',
  userId: 'user-1',
  visualMode: 'light',
  notificationEnabled: true,
  defaultSettingsJson: JSON.stringify({ theme: 'light', soundEnabled: true }),
  privacyChoicesJson: JSON.stringify({ analytics: false, marketing: false }),
};

export const PURCHASE_STATE: PurchaseState = {
  id: 'purchase-1',
  userId: 'user-1',
  entitlement: 'free',
  productId: null,
  expiresAt: null,
  lastCheckedAt: NOW,
};

export const LINK_COUNTS = {
  products: 242,
  articles: 118,
  tools: 87,
  services: 33,
  other: 19,
};

export const SAMPLE_LINKS: ClickableLink[] = [
  {
    id: 'link-1',
    title: 'AirPods Pro (2nd generation)',
    url: 'https://www.apple.com/airpods-pro/',
    excerpt: 'New white earbuds with active noise cancellation, adaptive audio, and a customizable fit.',
    thumbnailUrl: 'apple',
    category: 'products',
    createdAt: '2026-10-01T09:12:00Z',
    updatedAt: NOW,
    favorite: true,
  },
  {
    id: 'link-2',
    title: 'MacBook Pro 14-inch (M3)',
    url: 'https://www.apple.com/macbook-pro/',
    excerpt: 'The ultimate notebook for pro workflow, powered by M3 chips.',
    thumbnailUrl: 'apple',
    category: 'products',
    createdAt: '2026-10-02T14:30:00Z',
    updatedAt: NOW,
    favorite: true,
  },
  {
    id: 'link-3',
    title: 'The Age of AI Is Here',
    url: 'https://www.newyorker.com/magazine/the-age-of-ai',
    excerpt: 'How large language models will change the way we write, code, and think.',
    thumbnailUrl: 'newyorker',
    category: 'articles',
    createdAt: '2026-09-20T08:05:00Z',
    updatedAt: NOW,
    favorite: false,
  },
  {
    id: 'link-4',
    title: 'Electric Vehicles: What Comes Next',
    url: 'https://www.nytimes.com/2026/09/15/technology/electric-vehicles',
    excerpt: 'A look at battery advances and the shift toward affordable EVs.',
    thumbnailUrl: 'nytimes',
    category: 'articles',
    createdAt: '2026-09-22T11:20:00Z',
    updatedAt: NOW,
    favorite: false,
  },
  {
    id: 'link-5',
    title: 'Linear — Issue tracking',
    url: 'https://linear.app',
    excerpt: 'A new way to track issues for modern teams. Fast, beautiful, and deeply usable.',
    thumbnailUrl: 'linear',
    category: 'tools',
    createdAt: '2026-08-30T16:10:00Z',
    updatedAt: NOW,
    favorite: true,
  },
  {
    id: 'link-6',
    title: 'Notion — Notes & Docs',
    url: 'https://www.notion.so',
    excerpt: 'All your notes, docs, and wikis in one place, with flexible databases.',
    thumbnailUrl: 'notion',
    category: 'tools',
    createdAt: '2026-09-05T10:45:00Z',
    updatedAt: NOW,
    favorite: false,
  },
  {
    id: 'link-7',
    title: 'Stripe — Payments',
    url: 'https://stripe.com',
    excerpt: 'Accept payments online and in app with modern merchant infrastructure.',
    thumbnailUrl: 'stripe',
    category: 'services',
    createdAt: '2026-09-10T13:00:00Z',
    updatedAt: NOW,
    favorite: false,
  },
  {
    id: 'link-8',
    title: 'Loom — Video Messaging',
    url: 'https://www.loom.com',
    excerpt: 'Record and share instant videos that feel like a face-to-face conversation.',
    thumbnailUrl: 'loom',
    category: 'services',
    createdAt: '2026-09-18T09:55:00Z',
    updatedAt: NOW,
    favorite: true,
  },
  {
    id: 'link-9',
    title: 'WhatsApp — Free Messaging',
    url: 'https://www.whatsapp.com',
    excerpt: 'Free messaging and calls on any device, so you can stay in touch anywhere.',
    thumbnailUrl: 'whatsapp',
    category: 'services',
    createdAt: '2026-09-12T15:30:00Z',
    updatedAt: NOW,
    favorite: false,
  },
  {
    id: 'link-10',
    title: 'Spotify — Music & Podcasts',
    url: 'https://www.spotify.com',
    excerpt: 'Stream millions of songs and podcasts, everywhere you go.',
    thumbnailUrl: 'spotify',
    category: 'products',
    createdAt: '2026-08-25T12:00:00Z',
    updatedAt: NOW,
    favorite: false,
  },
  {
    id: 'link-11',
    title: 'Figma — Collaborative Design',
    url: 'https://www.figma.com',
    excerpt: 'Design together in real time with your team, from wireframes to prototypes.',
    thumbnailUrl: 'figma',
    category: 'tools',
    createdAt: '2026-09-08T17:40:00Z',
    updatedAt: NOW,
    favorite: false,
  },
  {
    id: 'link-12',
    title: 'A Practical Guide to Local SEO',
    url: 'https://moz.com/academy/local-seo',
    excerpt: 'Rank higher in local search results and attract nearby customers.',
    thumbnailUrl: 'moz',
    category: 'articles',
    createdAt: '2026-09-01T11:05:00Z',
    updatedAt: NOW,
    favorite: false,
  },
];

export const SCREENSHOT_ASSETS: ScreenshotAsset[] = [
  {
    id: 'asset-1',
    title: 'AirPods product page',
    source: 'camera_roll',
    createdAt: '2026-10-05T08:15:00Z',
    fileSize: '241 KB',
    status: 'done',
    extractedLinks: 8,
    tags: ['products', 'apple'],
  },
  {
    id: 'asset-2',
    title: 'MacBook review',
    source: 'import',
    createdAt: '2026-10-06T12:02:00Z',
    fileSize: '188 KB',
    status: 'done',
    extractedLinks: 2,
    tags: ['products', 'laptop'],
  },
  {
    id: 'asset-3',
    title: 'Tesla lineup gallery',
    source: 'sample',
    createdAt: '2026-10-07T16:40:00Z',
    fileSize: '330 KB',
    status: 'done',
    extractedLinks: 5,
    tags: ['products', 'cars'],
  },
  {
    id: 'asset-4',
    title: 'Untitled sketch',
    source: 'camera_roll',
    createdAt: '2026-10-08T07:30:00Z',
    fileSize: '150 KB',
    status: 'scanning',
    extractedLinks: 0,
    tags: [],
  },
  {
    id: 'asset-5',
    title: 'Article draft',
    source: 'sample',
    createdAt: '2026-10-09T09:00:00Z',
    fileSize: '95 KB',
    status: 'pending',
    extractedLinks: 0,
    tags: ['drafts'],
  },
];

export const RECENT_SESSIONS: Session[] = [
  {
    id: 'session-1',
    userId: 'user-1',
    startedAt: new Date(Date.now() - 2 * 60000).toISOString(),
    completedAt: new Date(Date.now() - 60000).toISOString(),
    durationSeconds: 45,
    outcomeSummary: 'Extracted 8 links from the AirPods product page.',
    notes: 'Quick capture, OCR worked well.',
  },
  {
    id: 'session-2',
    userId: 'user-1',
    startedAt: new Date(Date.now() - 60 * 60000).toISOString(),
    completedAt: new Date(Date.now() - 54 * 60000).toISOString(),
    durationSeconds: 182,
    outcomeSummary: 'Batch scanned camera roll — 3 screenshots done.',
    notes: 'Ran through the whole camera roll.',
  },
  {
    id: 'session-3',
    userId: 'user-1',
    startedAt: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
    completedAt: new Date(Date.now() - 2 * 60 * 60000 - 10000).toISOString(),
    durationSeconds: 12,
    outcomeSummary: 'Manual link entry for a product page.',
    notes: 'Added a missed link by hand.',
  },
];

export const SAVED_RESULTS: SavedResult[] = [
  {
    id: 'result-1',
    userId: 'user-1',
    sourceItemId: 'asset-1',
    resultType: 'ocr',
    contentJson: JSON.stringify({ linksFound: 8, category: 'products' }),
    favorite: true,
    createdAt: '2026-10-05T08:20:00Z',
  },
  {
    id: 'result-2',
    userId: 'user-1',
    sourceItemId: 'asset-2',
    resultType: 'ocr',
    contentJson: JSON.stringify({ linksFound: 2, category: 'products' }),
    favorite: false,
    createdAt: '2026-10-06T12:05:00Z',
  },
  {
    id: 'result-3',
    userId: 'user-1',
    sourceItemId: 'asset-5',
    resultType: 'manual',
    contentJson: JSON.stringify({ linksAdded: 1, note: 'Added missing pricing link' }),
    favorite: false,
    createdAt: '2026-10-09T09:05:00Z',
  },
];

export function getLinksById(id: string): ClickableLink | undefined {
  return SAMPLE_LINKS.find((l) => l.id === id);
}

export function getAssetById(id: string): ScreenshotAsset | undefined {
  return SCREENSHOT_ASSETS.find((a) => a.id === id);
}

export function getSessionById(id: string): Session | undefined {
  return RECENT_SESSIONS.find((s) => s.id === id);
}
