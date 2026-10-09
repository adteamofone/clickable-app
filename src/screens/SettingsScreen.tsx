import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Toggle } from '../components/Toggle';
import { Avatar } from '../components/Avatar';
import { Icon } from '../components/Icon';
import { theme, themeColor, spacing } from '../constants/theme';
import { CURRENT_USER, USER_PREFERENCES, PURCHASE_STATE } from '../mockData';
import type { UserPreference } from '../types';

export function SettingsScreen() {
  const [notifications, setNotifications] = React.useState<UserPreference>(USER_PREFERENCES);
  const [visualMode, setVisualMode] = React.useState<UserPreference['visualMode']>('light');

  const sections = [
    {
      title: 'Profile',
      children: [
        {
          key: 'name',
          label: 'Display name',
          value: CURRENT_USER.displayName,
          editable: false,
        },
        {
          key: 'email',
          label: 'Email',
          value: CURRENT_USER.email,
          editable: false,
        },
        {
          key: 'appearance',
          label: 'App appearance',
          value: visualMode === 'light' ? 'Light mode' : 'Dark mode',
          editable: true,
        },
        {
          key: 'notifications',
          label: 'Push notifications',
          value: notifications.notificationEnabled ? 'On' : 'Off',
          editable: true,
        },
      ],
    },
    {
      title: 'Account & Subscription',
      children: [
        {
          key: 'subscription',
          label: 'Subscription',
          value: PURCHASE_STATE.entitlement === 'pro' ? 'Pro' : 'Free',
          editable: false,
        },
        {
          key: 'restore',
          label: 'Restore purchases',
          value: '',
          editable: false,
          action: () => Alert.alert('Restore', 'Restore purchases (demo). In production, this calls RevenueCat.'),
        },
      ],
    },
    {
      title: 'Trust & Support',
      children: [
        {
          key: 'privacy',
          label: 'Privacy Policy',
          value: '',
          editable: false,
          action: () => Alert.alert('Privacy Policy', 'Privacy policy (demo link).', [{ text: 'OK' }]),
        },
        {
          key: 'terms',
          label: 'Terms of Service',
          value: '',
          editable: false,
          action: () => Alert.alert('Terms', 'Terms of service (demo link).', [{ text: 'OK' }]),
        },
        {
          key: 'support',
          label: 'Contact support',
          value: '',
          editable: false,
          action: () => Alert.alert('Support', 'Support email: support@example.com', [{ text: 'OK' }]),
        },
        {
          key: 'delete',
          label: 'Delete account',
          value: '',
          editable: false,
          action: () =>
            Alert.alert('Delete account', 'This action cannot be undone. Your links will be permanently removed.', [
              { text: 'Cancel', style: 'default' },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: () => Alert.alert('Deleted', 'Account deletion is simulated in this demo.'),
              },
            ]),
        },
      ],
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerAvatar}>
          <Avatar name={CURRENT_USER.displayName} size="lg" />
        </View>
        <View style={styles.headerInfo}>
          <ThemedText variant="h2" style={styles.headerTitle}>
            Settings
          </ThemedText>
          <ThemedText variant="body" style={styles.headerSub}>
            Manage your account and preferences.
          </ThemedText>
        </View>
        <Icon name="settings" size={22} color={themeColor('textTertiary')} />
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <Card style={styles.sectionCard} accessible accessibilityLabel="Profile">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.profileRow}>
              <Avatar name={CURRENT_USER.displayName} size="xl" />
              <View style={styles.profileInfo}>
                <ThemedText variant="h3" style={styles.profileName}>
                  {CURRENT_USER.displayName}
                </ThemedText>
                <ThemedText variant="body" style={styles.profileEmail}>
                  {CURRENT_USER.email}
                </ThemedText>
              </View>
            </View>
          </ScrollView>
          <View style={styles.subscriptionRow}>
            <View style={[styles.subscriptionBadge, { backgroundColor: PURCHASE_STATE.entitlement === 'pro' ? themeColor('primary') + '20' : themeColor('backgroundAlt') }]}>
              <Icon name="star" size={12} color={PURCHASE_STATE.entitlement === 'pro' ? themeColor('primary') : themeColor('textTertiary')} />
              <ThemedText
                variant="caption"
                style={[styles.subscriptionBadgeText, { color: PURCHASE_STATE.entitlement === 'pro' ? themeColor('primary') : themeColor('textSecondary') }]}>
                {PURCHASE_STATE.entitlement === 'pro' ? 'Pro' : 'Free plan'}
              </ThemedText>
            </View>
          </View>
        </Card>

        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <ThemedText variant="h3" style={styles.sectionTitle}>
              {section.title}
            </ThemedText>
            {section.children.map((item) =>
              item.action ? (
                <Button key={item.key} title={item.label} icon="arrow-forward" size="sm" onPress={item.action} />
              ) : item.editable ? (
                <View key={item.key} style={styles.settingRow}>
                  <ThemedText style={styles.settingLabel}>{item.label}</ThemedText>
                  {item.key === 'appearance' ? (
                    <View style={styles.modePicker}>
                      {(['light', 'dark', 'system'] as const).map((mode) => (
                        <TouchableOpacity
                          key={mode}
                          onPress={() => setVisualMode(mode)}
                          style={[
                            styles.modeOption,
                            { backgroundColor: visualMode === mode ? themeColor('primary') + '20' : themeColor('backgroundAlt') },
                          ]}
                          accessibilityState={{ selected: visualMode === mode }}>
                          <ThemedText
                            style={[
                              styles.modeText,
                              { color: visualMode === mode ? themeColor('primary') : themeColor('textSecondary') },
                            ]}>
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                          </ThemedText>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <Toggle
                      value={item.key === 'notifications' ? notifications.notificationEnabled : false}
                      onValueChange={(v) =>
                        setNotifications((p) => ({ ...p, notificationEnabled: v }))
                      }
                      style={styles.toggle}
                    />
                  )}
                </View>
              ) : (
                <View key={item.key} style={styles.settingRow}>
                  <ThemedText style={styles.settingLabel}>{item.label}</ThemedText>
                </View>
              )
            )}
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
  headerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    overflow: 'hidden',
  },
  headerInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  headerTitle: {
    fontWeight: '700',
  },
  headerSub: {
    color: themeColor('textSecondary'),
  },
  body: {
    padding: spacing.md,
    paddingBottom: spacing.xl * 2,
  },
  sectionCard: {
    marginBottom: spacing.md,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  profileName: {
    fontWeight: '700',
  },
  profileEmail: {
    color: themeColor('textSecondary'),
  },
  subscriptionRow: {
    marginTop: spacing.sm,
  },
  subscriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: 999,
  },
  subscriptionBadgeText: {
    fontWeight: '600',
    fontSize: 12,
  },
  section: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: themeColor('text'),
    fontWeight: '700',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLabel: {
    flex: 1,
    color: themeColor('textSecondary'),
    fontSize: 14,
  },
  toggle: {
    width: 44,
  },
  modePicker: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  modeOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  modeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
