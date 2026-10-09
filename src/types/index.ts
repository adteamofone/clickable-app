import type { LinkCategory } from './categories';

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  avatarUrl: string;
  subscriptionStatus: 'free' | 'pro' | 'past_due';
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClickableLink {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  thumbnailUrl: string;
  category: LinkCategory;
  createdAt: string;
  updatedAt: string;
  favorite: boolean;
}

export interface ScreenshotAsset {
  id: string;
  title: string;
  source: 'camera_roll' | 'import' | 'sample';
  createdAt: string;
  fileSize: string;
  status: 'pending' | 'scanning' | 'done' | 'error';
  extractedLinks: number;
  tags: string[];
}

export interface Session {
  id: string;
  userId: string;
  startedAt: string;
  completedAt: string;
  durationSeconds: number;
  outcomeSummary: string;
  notes: string;
}

export interface SavedResult {
  id: string;
  userId: string;
  sourceItemId: string;
  resultType: string;
  contentJson: string;
  favorite: boolean;
  createdAt: string;
}

export interface UserPreference {
  id: string;
  userId: string;
  visualMode: 'light' | 'dark' | 'system';
  notificationEnabled: boolean;
  defaultSettingsJson: string;
  privacyChoicesJson: string;
}

export interface PurchaseState {
  id: string;
  userId: string;
  entitlement: string;
  productId: string | null;
  expiresAt: string | null;
  lastCheckedAt: string;
}

export interface ExtractWebLinksState {
  id: string;
  userId: string;
  relatedItemId: string;
  stateJson: string;
  lastUpdatedAt: string;
}

export interface ProvideInstantManualState {
  id: string;
  userId: string;
  relatedItemId: string;
  stateJson: string;
  lastUpdatedAt: string;
}
