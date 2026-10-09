import React from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { themeColor, spacing } from '../constants/theme';
import type { RootStackScreenProps } from '../navigation/types';

const { width } = Dimensions.get('window');

interface Step {
  title: string;
  subtitle: string;
  icon: React.ComponentProps<typeof Icon>['name'];
}

const STEPS: Step[] = [
  {
    title: 'Screenshots become bookmarks',
    subtitle: 'Upload a single shot or scan your camera roll. Every embedded link is pulled out instantly.',
    icon: 'open-in-new',
  },
  {
    title: 'Smart extraction',
    subtitle: 'OCR reads products, articles, and screenshots of anything. Review and edit before you save.',
    icon: 'article',
  },
  {
    title: 'No account to start',
    subtitle: 'Capture and save in under a minute. Permissions are only used to read your photos — and only with your consent.',
    icon: 'camera',
  },
];

export function OnboardingScreen({ navigation }: RootStackScreenProps<'Onboarding'>) {
  const [step, setStep] = React.useState(0);
  const isLast = step === STEPS.length - 1;

  const goNext = () => {
    if (isLast) {
      navigation.replace('MainTabs');
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.avatarRow}>
            <View style={[styles.avatar, { backgroundColor: themeColor('primary') }]}>
              <Icon name="open-in-new" size={22} color="#FFFFFF" />
            </View>
            <View style={[styles.avatar, { backgroundColor: themeColor('accent') }]}>
              <Icon name="article" size={22} color={themeColor('card')} />
            </View>
            <View style={[styles.avatar, { backgroundColor: themeColor('primary') }]}>
              <Icon name="search" size={22} color="#FFFFFF" />
            </View>
          </View>

          <View style={styles.dots}>
            {STEPS.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  { backgroundColor: i === step ? themeColor('primary') : themeColor('border') },
                ]}
              />
            ))}
          </View>

          <ThemedText variant="h2" style={styles.title}>
            {STEPS[step].title}
          </ThemedText>
          <ThemedText variant="body" style={styles.subtitle}>
            {STEPS[step].subtitle}
          </ThemedText>
        </View>

        <ThemedText variant="caption" style={styles.note}>
          {isLast
            ? 'You will be taken straight to the capture screen — no account needed.'
            : 'One step back.'}
        </ThemedText>
      </ScrollView>

      <Button
        title={isLast ? 'Start capturing' : 'Continue'}
        onPress={goNext}
        icon={isLast ? 'arrow-forward' : 'arrow-forward'}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xl * 3,
  },
  card: {
    backgroundColor: themeColor('card'),
    borderRadius: themeColor('border'),
    padding: spacing.xl,
    elevation: 0,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: themeColor('border'),
    alignItems: 'center',
  },
  avatarRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  dots: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  title: {
    color: themeColor('text'),
    textAlign: 'center',
    fontWeight: '700',
  },
  subtitle: {
    color: themeColor('textSecondary'),
    textAlign: 'center',
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  note: {
    color: themeColor('textTertiary'),
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
