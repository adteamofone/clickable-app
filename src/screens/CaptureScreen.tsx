import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { Card, LinkCard } from '../components/Card';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { EmptyState } from '../components/EmptyState';
import { theme, themeColor, spacing, borderRadius } from '../constants/theme';
import {
  SCREENSHOT_ASSETS,
  SAMPLE_LINKS,
  CURRENT_USER,
  USER_PREFERENCES,
} from '../mockData';
import type { ClickableLink } from '../types';

export function CaptureScreen() {
  const [assets, setAssets] = useState<typeof SCREENSHOT_ASSETS>(SCREENSHOT_ASSETS);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanStep, setScanStep] = useState(0);
  const [doneCount, setDoneCount] = useState(
    assets.filter((a) => a.status === 'done').length
  );

  const palette = ['#0EA5E9', '#38BDF8', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];

  const runScan = () => {
    if (scanning) return;
    setScanning(true);
    setProgress(0);
    setScanStep(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setAssets((prev) =>
            prev.map((a) =>
              a.status === 'scanning' ? { ...a, status: 'done', extractedLinks: 5 } : a
            )
          );
          setDoneCount((prev) => prev + 3);
          setScanning(false);
          return 100;
        }
        return p + 8;
      });
      setScanStep((s) => s + 1);
    }, 260);
  };

  const affordanceCount = assets.filter((a) => a.status === 'done').length;
  const hasReady = affordanceCount > 0 || doneCount > 0;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Icon name="camera" size={22} color={themeColor('primary')} />
        <ThemedText variant="h2" style={styles.headerTitle}>
          Capture & Scan
        </ThemedText>
        <Icon name="more-horiz" size={22} color={themeColor('textTertiary')} />
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <Card style={styles.importCard} accessible accessibilityLabel="Import screenshots">
          <ThemedText variant="h3" style={styles.importTitle}>
            Import screenshots
          </ThemedText>
          <ThemedText variant="body" style={styles.importDesc}>
            Grab a screenshot from your phone and we&apos;ll extract every link embedded in it.
          </ThemedText>
          <View style={styles.importRow}>
            <Button
              title="Photo library"
              icon="cloud-upload"
              variant="secondary"
              disabled
              onPress={() => Alert.alert('Photo library', 'Real camera roll access requires native config in a signed build. In this demo, tap “Generate sample” or “Scan camera roll”.')}
            />
            <Button
              title="Generate sample"
              icon="add-circle"
              onPress={() => {
                Alert.alert('Sample import', 'Sample screenshots are inserted so you can try the full flow. Re-run to see fresh data.');
              }}
            />
          </View>
        </Card>

        {scanning ? (
          <Card style={styles.progressCard} accessible accessibilityLabel="Scanning in progress">
            <View style={styles.progressHeader}>
              <View style={styles.dots}>
                {[0, 1, 2].map((i) => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      { backgroundColor: i < Math.min(scanStep, 3) ? themeColor('success') : themeColor('border') },
                    ]}
                  />
                ))}
              </View>
              <ThemedText variant="bodySm" style={styles.progressLabel}>
                Extracting links from gallery…
              </ThemedText>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <View style={styles.progressMeta}>
              <ThemedText variant="caption">{progress}%</ThemedText>
              <Text style={styles.progressHint}>Scanning assets {scanStep} of {assets.length}</Text>
            </View>
            <ActivityIndicator color={themeColor('primary')} style={styles.indicator} />
          </Card>
        ) : (
          <>
            <ThemedText variant="h3" style={styles.sectionTitle}>
              Recent capture queue
            </ThemedText>
            {assets.map((asset) => {
              const color = palette[asset.title.charCodeAt(0) % palette.length];
              return (
                <Card
                  key={asset.id}
                  style={styles.queueItem}
                  accessible
                  accessibilityLabel={asset.title}
                  accessibilityState={{ busy: asset.status === 'scanning' }}>
                  <View style={[styles.thumb, { backgroundColor: color }]}>
                    <ThemedText variant="caption" style={styles.thumbLabel}>
                      {asset.title.slice(0, 2).toUpperCase()}
                    </ThemedText>
                  </View>
                  <View style={styles.queueInfo}>
                    <ThemedText variant="bodySm" style={styles.queueName}>
                      {asset.title}
                    </ThemedText>
                    <ThemedText variant="caption" style={styles.queueMeta}>
                      {asset.status === 'done'
                        ? `${asset.extractedLinks} links extracted`
                        : asset.status === 'scanning'
                        ? 'Scanning…'
                        : asset.status === 'pending'
                        ? 'Waiting to scan'
                        : 'Scan failed'}
                    </ThemedText>
                  </View>
                  <View style={styles.queueActions}>
                    {asset.status === 'done' ? (
                      <Button
                        title="Review links"
                        icon="arrow-forward"
                        size="sm"
                        onPress={() => {}}
                      />
                    ) : (
                      <Button
                        title="Cancel"
                        icon="remove-circle"
                        size="sm"
                        variant="ghost"
                        onPress={() => {}}
                      />
                    )}
                  </View>
                </Card>
              );
            })}
          </>
        )}

        <Button
          title={hasReady ? 'Review extracted links →' : 'Scan camera roll for links'}
          icon={hasReady ? 'arrow-forward' : 'cloud-upload'}
          loading={scanning}
          disabled={!hasReady && !scanning}
          onPress={runScan}
        />

        {!scanning && assets.length === 0 && (
          <View style={styles.emptyHint}>
            <EmptyState
              title="No screenshots found"
              description="Create a sample so you can try the extraction flow end-to-end."
              icon="search"
              actionLabel="Add sample data"
              onAction={() => {}}
            />
          </View>
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
  importCard: {
    marginBottom: spacing.lg,
  },
  importTitle: {
    fontWeight: '700',
  },
  importDesc: {
    color: themeColor('textSecondary'),
    marginTop: 4,
    lineHeight: 20,
  },
  importRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  sectionTitle: {
    color: themeColor('text'),
    fontWeight: '700',
    marginTop: spacing.xl,
  },
  progressCard: {
    marginBottom: spacing.lg,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dots: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  progressLabel: {
    textAlign: 'right',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: themeColor('backgroundAlt'),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: themeColor('primary'),
    borderRadius: 5,
  },
  progressMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  progressHint: {
    color: themeColor('textTertiary'),
    fontSize: 11,
  },
  indicator: {
    marginTop: spacing.lg,
  },
  queueItem: {
    marginBottom: spacing.sm,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  queueInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  queueName: {
    fontWeight: '600',
  },
  queueMeta: {
    color: themeColor('textTertiary'),
  },
  queueActions: {
    marginTop: spacing.sm,
  },
  emptyHint: {
    marginTop: spacing.lg,
    height: 140,
  },
});
