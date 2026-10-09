import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Alert, ScrollView } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { Card, LinkCard } from '../components/Card';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { EmptyState } from '../components/EmptyState';
import { theme, themeColor, spacing, borderRadius } from '../constants/theme';
import { SAMPLE_LINKS } from '../mockData';
import type { ClickableLink } from '../types';
import type { LinkCategory } from '../types/categories';

export function LibraryScreen() {
  const palette = ['#0EA5E9', '#38BDF8', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [library, setLibrary] = useState<ClickableLink[]>(SAMPLE_LINKS);
  const [loading, setLoading] = useState(false);

  const categories: { value: LinkCategory | null; label: string }[] = [
    { value: null, label: 'All' },
    { value: 'products', label: 'Products' },
    { value: 'articles', label: 'Articles' },
    { value: 'tools', label: 'Tools' },
    { value: 'services', label: 'Services' },
    { value: 'other', label: 'Other' },
  ];

  const filtered = library.filter((link) => {
    const matchesQuery =
      !query ||
      link.title.toLowerCase().includes(query.toLowerCase()) ||
      link.url.toLowerCase().includes(query.toLowerCase()) ||
      link.excerpt.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === null || link.category === category;
    return matchesQuery && matchesCategory;
  });

  const openInBrowser = (link: ClickableLink) => {
    Alert.alert(`Opening ${link.title}`, `Simulated browser open for ${link.url}`, [
      { text: 'OK', style: 'default' },
    ]);
  };

  const removeLink = (id: string) => {
    setLibrary((prev) => prev.filter((l) => l.id !== id));
  };

  const clearFilter = () => {
    setQuery('');
    setCategory(null);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Icon name="book-open" size={22} color={themeColor('primary')} />
        <ThemedText variant="h2" style={styles.headerTitle}>
          Library
        </ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.searchRow}>
          <Icon name="search" size={18} color={themeColor('textTertiary')} />
          <TextInput
            placeholder="Filter by title or URL"
            placeholderTextColor={themeColor('textTertiary')}
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
          {query && (
            <TouchableOpacity onPress={clearFilter} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Icon name="remove-circle" size={18} color={themeColor('textTertiary')} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.chips}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.value ?? 'all'}
              onPress={() => setCategory(cat.value)}
              style={[
                styles.chip,
                {
                  backgroundColor: category === cat.value ? themeColor('primary') : themeColor('backgroundAlt'),
                  borderColor: category === cat.value ? themeColor('primary') : themeColor('border'),
                },
              ]}>
              <ThemedText
                style={[
                  styles.chipText,
                  { color: category === cat.value ? '#FFFFFF' : themeColor('textSecondary') },
                ]}>
                {cat.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <ThemedText variant="h2" style={styles.sectionTitle}>
          {category === null ? 'All links' : categories.find((c) => c.value === category)?.label}
        </ThemedText>

        {filtered.length === 0 ? (
          <Card style={styles.emptyCard} accessible accessibilityLabel="No links match your filter">
            <EmptyState
              title="No links found"
              description="Try a different search term or category filter."
              icon="search"
              actionLabel="Clear filters"
              onAction={clearFilter}
            />
          </Card>
        ) : (
          filtered.map((link) => (
            <Card key={link.id} style={styles.linkCard} accessible accessibilityLabel={link.title}>
              <LinkCard
                title={link.title}
                excerpt={link.excerpt}
                category={link.category}
                favorite={link.favorite}
                thumbnail={palette[link.title.charCodeAt(0) % palette.length]}
                onPress={() => openInBrowser(link)}
              />
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeLink(link.id)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Icon name="delete" size={20} color={themeColor('error')} />
              </TouchableOpacity>
            </Card>
          ))
        )}

        {filtered.length === 0 && library.length === 0 && (
          <Card style={styles.emptyCard} accessible accessibilityLabel="Library is empty">
            <EmptyState
              title="Your library is empty"
              description="Captured screenshots appear here once links are rescued and saved."
              icon="book-open"
              actionLabel="Start capturing"
              onAction={() => {}}
            />
          </Card>
        )}

        <Button title="Add screenshot — rescue more links" icon="camera" onPress={() => {}} />
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
  headerSpacer: {
    width: 48,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl * 2,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: themeColor('card'),
    borderWidth: 1,
    borderColor: themeColor('border'),
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    color: themeColor('text'),
    fontSize: 14,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  chip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    color: themeColor('text'),
    fontWeight: '700',
    marginTop: spacing.xl,
  },
  emptyCard: {
    marginBottom: spacing.lg,
  },
  linkCard: {
    position: 'relative',
  },
  removeBtn: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
  },
});
