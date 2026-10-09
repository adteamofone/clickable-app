import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps as RNCompositeScreenProps } from '@react-navigation/native';

export type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: undefined;
};

export type TabParamList = {
  Home: undefined;
  Library: undefined;
  Capture: undefined;
  Settings: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof TabParamList> =
  BottomTabScreenProps<TabParamList, T>;

export type CompositeScreenProps<
  TScreenProps extends object,
  TNavProps extends object,
> = RNCompositeScreenProps<TScreenProps, TNavProps>;

export interface ScreenIntro {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}
