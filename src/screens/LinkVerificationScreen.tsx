import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { Card, LinkCard } from '../components/Card';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { EmptyState } from '../components/EmptyState';
import { theme, themeColor, spacing, borderRadius } from '../constants/theme';
import { SCREENSHOT_ASSETS, SAMPLE_LINKS } from '../mockData';
import type { ClickableLink } from '../types';

export function LinkVerificationScreen() {
  const palette = ['#0EA5E9', '#38BDF8', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];

  const [selectedAssetId, setSelectedAssetId] = useState<string>(
    SCREENSHOT_ASSETS.find((a) => a.status === 'done')?.id ?? SCREENSHOT_ASSETS[0]?.id ?? ''
  );
  const [regionHighlight, setRegionHighlight] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const [manualLinks, setManualLinks] = useState<string[]>([]);
  const [library, setLibrary] = useState<ClickableLink[]>([]);
  const [lastTested, setLastError] = useState<string | null>(null);

  const selectedAsset = SCREENSHOT_ASSETS.find((a) => a.id === selectedAssetId);
  const extractedLinks: ClickableLink[] =
    selectedAsset?.extractedLinks && selectedAsset.extractedLinks > 0
      ? SAMPLE_LINKS.slice(0, selectedAsset.extractedLinks)
      : [];

  const assets = SCREENSHOT_ASSETS;

  function assetsDoneCount(): number {
    return assets.filter((a) => a.status === 'done').length;
  }

  const hasNoAsset = !selectedAsset || assetsDoneCount() === 0;

  const runTest = (link: ClickableLink) => {
    setLastError(link.title);
    Alert.alert(`Opened ${link.title}`, `Simulated tap-to-test for ${link.url}`, [
      { text: 'OK', style: 'default' },
    ]);
  };

  const addManualLink = () => {
    const value = manualInput.trim().replace(/^https?:\/\//, 'https://');
    if (!value) return;
    if (!value.startsWith('http')) {
      Alert.alert('Invalid URL', 'Please enter a full URL starting with http:// or https://');
      return;
    }
    setManualLinks((prev) => [...prev, value]);
    setManualInput('');
  };

  const saveToLibrary = () => {
    if (extractedLinks.length === 0 && manualLinks.length === 0) {
      Alert.alert('Nothing to save', 'Add at least one link before saving to the library.');
      return;
    }
    const nextLinks: ClickableLink[] = extractedLinks.map((l, i) => ({
      ...l,
      id: `saved-${Date.now()}-${i}`,
      updatedAt: new Date().toISOString(),
      favorite: i === 0,
    }));
    const manualSeed = manualLinks.map((url, i) => ({
      id: `saved-${Date.now()}-manual-${i}`,
      title: url,
      url,
      excerpt: 'Manual fallback entry',
      thumbnailUrl: 'manual',
      category: 'other',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorite: false,
    }));
    const combined = [...nextLinks, ...manualSeed];
    setLibrary(combined);
    Alert.alert(
      'Saved to library',
      `Saved ${combined.length} link${combined.length > 1 ? 's' : ''}. Tap Library to open them.`,
      [
        { text: 'View library', onPress: () => {} },
        { text: 'OK', style: 'default' },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Icon name="link" size={22} color={themeColor('primary')} />
        <ThemedText variant="h2" style={styles.headerTitle}>
          Link Verification
        </ThemedText>
        <Icon name="more-horiz" size={22} color={themeColor('textTertiary')} />
      </View>

      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}>
        <View style={styles.stepRow}>
          {['Screenshot preview', 'Review links', 'Save to library'].map((label, i) => (
            <View key={label} style={styles.step}>
              <View
                style={[
                  styles.stepDot,
                  { backgroundColor: i <= 1 ? themeColor('primary') : themeColor('border') },
                ]}
              />
              <ThemedText variant="caption" style={styles.stepLabel}>
                {i < 1 ? 'Done' : i === 1 ? 'Current' : 'Next'}
              </ThemedText>
            </View>
          ))}
        </View>

        {hasNoAsset ? (
          <>
            <EmptyState
              title="No screenshot yet"
              description="Capture or import a screenshot first, then come back here to review the links."
              icon="camera"
              actionLabel="Go to capture"
              onAction={() => {}}
            />
            <Button title="Scan camera roll" icon="cloud-upload" onPress={() => {}} />
          </>
        ) : (
          <>
            <Card style={styles.previewCard} accessible accessibilityLabel="Screenshot preview with extracted links">
              <View style={styles.previewHeader}>
                <ThemedText variant="h3" style={styles.previewTitle}>
                  {selectedAsset?.title ?? 'Screenshot preview'}
                </ThemedText>
                <View style={styles.previewBadges}>
                  <View style={[styles.badge, { backgroundColor: themeColor('primary') + '20' }]}>
                    <Icon name="check-circle" size={12} color={themeColor('primary')} />
                    <ThemedText variant="caption" style={styles.badgeText}>
                      {extractedLinks.length} links
                    </ThemedText>
                  </View>
                  <View style={[styles.badge, { backgroundColor: themeColor('backgroundAlt') }]}>
                    <Icon name="info" size={12} color={themeColor('textTertiary')} />
                    <ThemedText variant="caption" style={styles.badgeText}>
                      Tap a region to inspect
                    </ThemedText>
                  </View>
                </View>
              </View>
              <View
                style={styles.preview}
                onPressIn={() => setRegionHighlight(true)}
                onPressOut={() => setRegionHighlight(false)}>
                <View style={[styles.previewImg, { backgroundColor: palette[0] }]}>
                  <ThemedText variant="caption" style={styles.previewImgLabel}>
                    {selectedAsset?.title.slice(0, 2).toUpperCase() ?? 'Q'}
                  </ThemedText>
                </View>
                {regionHighlight && (
                  <View style={styles.highlightBox}>
                    <ThemedText variant="caption" style={styles.highlightLabel}>
                      Region highlighted — tap to deselect
                    </ThemedText>
                  </View>
                )}
              </View>
            </Card>

            <ThemedText variant="h3" style={styles.sectionTitle}>
              Extracted links
            </ThemedText>
            {extractedLinks.length === 0 ? (
              <Card style={styles.linkCard} accessible accessibilityLabel="No extracted links">
                <EmptyState
                  title="No links found"
                  description="OCR could not read any text. Use the manual entry fallback below."
                  icon="search"
                  actionLabel="Try manual entry"
                  onAction={() => {}}
                />
              </Card>
            ) : (
              extractedLinks.map((link) => (
                <LinkCard
                  key={link.id}
                  title={link.title}
                  excerpt={link.excerpt}
                  category={link.category}
                  favorite={link.favorite}
                  thumbnail={palette[link.title.charCodeAt(0) % palette.length]}
                  onPress={() => runTest(link)}
                />
              ))
            )}

            <Card style={styles.fallbackCard} accessible accessibilityLabel="Manual link entry fallback">
              <ThemedText variant="h3" style={styles.sectionTitle}>
                Manual link entry
              </ThemedText>
              <TextInput
                placeholder="https://example.com/product-page"
                placeholderTextColor={themeColor('textTertiary')}
                value={manualInput}
                onChangeText={setManualInput}
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Button
                title="Add link"
                icon="add-circle"
                size="sm"
                onPress={addManualLink}
                style={styles.fallbackButton}
              />
              {manualLinks.length > 0 && (
                <View style={styles.manualList}>
                  {manualLinks.map((url, i) => (
                    <View key={i} style={styles.manualItem}>
                      <Icon name="link" size={14} color={themeColor('primary')} />
                      <Text style={styles.manualText}>{url}</Text>
                    </View>
                  ))}
                </View>
              )}
            </Card>

            <Button
              title={library.length > 0 ? `Saved to library (${library.length})` : 'Save to bookmark library'}
              icon="bookmark"
              loading={false}
              disabled={extractedLinks.length === 0 && manualLinks.length === 0}
              onPress={saveToLibrary}
            />
          </>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor('background'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: themeColor('card'),
    borderBottomWidth: 1,
    borderColor: themeColor('border'),
  },
  headerTitle: {
    fontWeight: '700',
  },
  body: {
    padding: spacing.md,
    paddingBottom: spacing.xl * 2,
  },
  stepRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  step: {
    alignItems: 'center',
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stepLabel: {
    color: themeColor('textTertiary'),
    marginTop: 4,
    fontSize: 11,
  },
  previewCard: {
    marginBottom: spacing.lg,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewTitle: {
    fontWeight: '700',
  },
  previewBadges: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    color: themeColor('textSecondary'),
    fontSize: 11,
  },
  preview: {
    position: 'relative',
    marginTop: spacing.md,
    height: 160,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: themeColor('border'),
  },
  previewImg: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImgLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  highlightBox: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    bottom: 16,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: themeColor('accent'),
    backgroundColor: themeColor('accent') + '18',
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sectionTitle: {
    color: themeColor('text'),
    fontWeight: '700',
    marginTop: spacing.xl,
  },
  linkCard: {
    position: 'relative',
  },
  fallbackCard: {
    marginBottom: spacing.lg,
  },
  input: {
    backgroundColor: themeColor('backgroundAlt'),
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
    color: themeColor('text'),
    fontSize: 13,
  },
  fallbackButton: {
    marginTop: spacing.sm,
  },
  manualList: {
    marginTop: spacing.sm,
    gap: 6,
  },
  manualItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: themeColor('backgroundAlt'),
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  manualText: {
    flex: 1,
    color: themeColor('textSecondary'),
    fontSize: 12,
  },
});
