import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { LinkCard } from '../components/Card';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { themeColor, spacing, borderRadius } from '../constants/theme';
import { SAMPLE_LINKS, RECENT_SESSIONS } from '../mockData';
import type { ClickableLink } from '../types';

export function ColorsViewScreen() {
  const palette = ['#0EA5E9', '#38BDF8', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];

  const openLink = (link: ClickableLink) => {
    alert(`Opening ${link.title} in browser`);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.greeting}>
          <View style={[styles.avatar, { backgroundColor: themeColor('primary') }]}>
            <Text style={styles.greetingName}>A</Text>
          </View>
          <ThemedText variant="h3" style={styles.hello}>
            Hello, Alex
          </ThemedText>
          <ThemedText variant="body" style={styles.subtitle}>
            You are all set — no links left behind.
          </ThemedText>
        </View>
        <Icon name="camera" size={22} color={themeColor('primary')} />
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <ThemedText variant="h3" style={styles.statValue}>
            {SAMPLE_LINKS.length}
          </ThemedText>
          <ThemedText variant="caption" style={styles.statLabel}>
            Saved links
          </ThemedText>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <ThemedText variant="h3" style={styles.statValue}>
            3
          </ThemedText>
          <ThemedText variant="caption" style={styles.statLabel}>
            Earlier today
          </ThemedText>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <ThemedText variant="h3" style={styles.statValue}>
            {RECENT_SESSIONS.length}
          </ThemedText>
          <ThemedText variant="caption" style={styles.statLabel}>
            Sessions today
          </ThemedText>
        </View>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}>
        <Button title="New capture — rescue a screenshot" icon="camera" onPress={() => {}} />

        <ThemedText variant="h2" style={styles.sectionTitle}>
          Recently rescued
        </ThemedText>
        {SAMPLE_LINKS.slice(0, 4).map((link) => {
          const color = palette[link.title.charCodeAt(0) % palette.length];
          return (
            <LinkCard
              key={link.id}
              title={link.title}
              excerpt={link.excerpt}
              category={link.category}
              favorite={link.favorite}
              thumbnail={color}
              onPress={() => openLink(link)}
            />
          );
        })}

        <ThemedText variant="h2" style={[styles.sectionTitle, styles.sectionSpacing]}>
          Recent activity
        </ThemedText>
        {RECENT_SESSIONS.map((session) => (
          <View key={session.id} style={styles.activityRow}>
            <View style={styles.activityIcon}>
              <Icon name="check-circle" size={18} color={themeColor('success')} />
            </View>
            <View style={styles.activityContent}>
              <ThemedText variant="bodySm" style={styles.activityTitle}>
                {session.outcomeSummary}
              </ThemedText>
              <ThemedText variant="caption" style={styles.activityTime}>
                {session.durationSeconds}s — {session.notes}
              </ThemedText>
            </View>
            <ThemedText variant="caption" style={styles.activityTime}>
              {session.completedAt
                ? new Date(session.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : ''}
            </ThemedText>
          </View>
        ))}
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
  greeting: {
    flex: 1,
    marginRight: spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: themeColor('primary'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  greetingName: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  hello: {
    color: themeColor('text'),
    fontWeight: '700',
  },
  subtitle: {
    color: themeColor('textSecondary'),
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: themeColor('card'),
    borderBottomWidth: 1,
    borderColor: themeColor('border'),
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: themeColor('border'),
  },
  statValue: {
    color: themeColor('primary'),
    fontWeight: '700',
    fontSize: 22,
  },
  statLabel: {
    color: themeColor('textTertiary'),
    marginTop: 2,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl * 2,
  },
  sectionTitle: {
    color: themeColor('text'),
    fontWeight: '700',
    marginTop: spacing.xl,
  },
  sectionSpacing: {
    marginTop: spacing.lg,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColor('card'),
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: themeColor('border'),
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: themeColor('backgroundAlt'),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontWeight: '600',
    marginBottom: 2,
  },
  activityTime: {
    color: themeColor('textTertiary'),
    fontSize: 11,
  },
});
