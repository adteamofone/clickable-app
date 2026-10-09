import React from 'react';
import { StyleSheet, ScrollView, View, Text, Alert } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { theme, themeColor, spacing } from '../constants/theme';
import { PURCHASE_STATE } from '../mockData';

export type Plan = 'weekly' | 'monthly' | 'annual';

interface PriceCard {
  plan: Plan;
  label: string;
  price: string;
  period: string;
  periodLabel: string;
  popular?: boolean;
}

const PLANS: PriceCard[] = [
  { plan: 'weekly', label: '$0.99 / week', price: '0.99', period: 'weekly', periodLabel: '/ week' },
  { plan: 'monthly', label: '$2.99 / month', price: '2.99', period: 'month', periodLabel: '/ month' },
  {
    plan: 'annual',
    label: '$24.99 / year',
    price: '24.99',
    period: 'year',
    periodLabel: '/ year',
    popular: true,
  },
];

const BENEFITS = [
  'Unlimited screenshot OCR extractions',
  'Batch camera-roll scanning',
  '7-day free trial on every plan',
  'No ads and no data selling',
  'Sync links across devices',
  'Export your library anytime',
];

export function PaywallScreen() {
  const [plan, setPlan] = React.useState<Plan>('annual');
  const [loading, setLoading] = React.useState(false);

  const selected = PLANS.find((p) => p.plan === plan)!;

  const handleSubscribe = () => {
    setLoading(true);
    Alert.alert(
      'Purchase complete',
      'Thanks! You have unlocked unlimited OCR extractions (simulated).',
      [{ text: 'Got it', style: 'default' }]
    );
    setLoading(false);
  };

  const handleRestore = () => {
    Alert.alert('Restore purchases', 'Restore purchases (simulated, RevenueCat).', [
      { text: 'OK', style: 'default' },
    ]);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <ThemedText variant="h2" style={styles.title}>
          Unlock unlimited
        </ThemedText>
        <ThemedText variant="h2" style={styles.subtitle}>
          screenshot rescue
        </ThemedText>
        <ThemedText variant="body" style={styles.description}>
          Get unlimited OCR extractions and full batch camera-roll scanning after your 7-day free trial.
        </ThemedText>

        <View style={styles.priceGrid}>
          {PLANS.map((p) => (
            <Card
              key={p.plan}
              style={[
                styles.priceCard,
                p.popular && styles.priceCardPopular,
                { borderColor: p.popular ? themeColor('primary') : themeColor('border') },
              ]}
              accessible
              accessibilityLabel={`${p.label} plan`}>
              {p.popular && (
                <View style={styles.popularBadge}>
                  <Icon name="local-fire-department" size={14} color="#FFFFFF" />
                  <ThemedText variant="caption" style={styles.popularBadgeText}>
                    Most popular
                  </ThemedText>
                </View>
              )}
              <ThemedText variant="h3" style={styles.price}>
                {p.price}
              </ThemedText>
              <ThemedText variant="caption" style={styles.period}>
                {p.price} {p.periodLabel}
              </ThemedText>
              <ThemedText variant="bodySm" style={styles.planLabel}>
                {p.label}
              </ThemedText>
              <Button
                title={PURCHASE_STATE.entitlement === 'pro' ? 'Current plan' : 'Choose plan'}
                icon="check-circle"
                size="sm"
                variant={p.popular ? 'primary' : 'secondary'}
                onPress={handleSubscribe}
                loading={loading && p.plan === plan}
                disabled={PURCHASE_STATE.entitlement === 'pro'}
              />
            </Card>
          ))}
        </View>

        <ThemedText variant="h3" style={styles.benefitTitle}>
          What you get
        </ThemedText>
        <View style={styles.benefits}>
          {BENEFITS.map((b) => (
            <View key={b} style={styles.benefitRow}>
              <Icon name="check-circle" size={18} color={themeColor('success')} />
              <ThemedText variant="bodySm" style={styles.benefitText}>
                {b}
              </ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.trustRow}>
          <Button
            title="Restore purchases"
            icon="restore"
            variant="ghost"
            size="md"
            onPress={handleRestore}
          />
          <Button
            title="Start free trial"
            icon="arrow-forward"
            variant="primary"
            size="md"
            onPress={handleSubscribe}
            disabled={PURCHASE_STATE.entitlement === 'pro'}
            loading={loading}
          />
        </View>

        <View style={styles.legalRow}>
          <ThemedText
            style={styles.legalText}
            accessible
            accessibilityRole="link"
            onPress={() => Alert.alert('Privacy Policy', 'Privacy policy page (demo).')}>
            Privacy Policy
          </ThemedText>
          <Text style={styles.legalDivider}>•</Text>
          <ThemedText
            style={styles.legalText}
            accessible
            accessibilityRole="link"
            onPress={() => Alert.alert('Terms of Service', 'Terms of service page (demo).')}>
            Terms of Service
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor('background'),
  },
  body: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
  },
  subtitle: {
    textAlign: 'center',
    color: themeColor('primary'),
    fontWeight: '700',
  },
  description: {
    textAlign: 'center',
    color: themeColor('textSecondary'),
    marginTop: spacing.sm,
  },
  priceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  priceCard: {
    width: 230,
    padding: spacing.xl,
    borderWidth: 2,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'stretch',
  },
  priceCardPopular: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: themeColor('primary'),
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: spacing.sm,
  },
  popularBadgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11,
  },
  price: {
    color: themeColor('primary'),
    fontWeight: '700',
    fontSize: 28,
  },
  period: {
    color: themeColor('textSecondary'),
    marginTop: 2,
  },
  planLabel: {
    color: themeColor('textSecondary'),
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  benefitTitle: {
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  benefits: {
    gap: spacing.sm,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  benefitText: {
    flex: 1,
    color: themeColor('textSecondary'),
    fontSize: 13,
  },
  trustRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  legalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: spacing.xl,
  },
  legalText: {
    color: themeColor('textTertiary'),
    fontSize: 12,
  },
  legalDivider: {
    color: themeColor('border'),
  },
});
