import { DefaultTheme } from '@react-navigation/native';
import { default as merge } from 'deepmerge';
import { Platform } from 'react-native';
import { adaptNavigationTheme, configureFonts, MD3LightTheme } from 'react-native-paper';

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme
});

const CustomMD3LightTheme = merge(MD3LightTheme, {
  ...DefaultTheme,
  dark: false,
  roundness: 8,
  colors: {
    primary: 'rgb(182, 29, 141)',
    onPrimary: 'rgb(248,232,244)',
    primaryContainer: 'rgba(182, 29, 141, 0.12)',
    secondary: 'rgb(255,255,255)',
    onSecondary: 'rgb(180, 25, 138)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(242, 242, 242)',
    background: 'rgb(242, 242, 242)',
    onBackground: 'rgb(242,242, 242)',
    outline: 'rgb(133, 115, 113)',
    outlineVariant: 'rgb(216, 222, 225)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(255, 255, 255)',
      level2: 'rgb(253, 248, 248)',
      level3: 'rgb(251, 240, 241)',
      level4: 'rgb(250, 238, 239)',
      level5: 'rgb(249, 233, 234)'
    },
    surfaceDisabled: 'rgba(32, 26, 25, 0.12)',
    onSurfaceDisabled: 'rgba(32, 26, 25, 0.38)',
    backdrop: 'rgba(59, 45, 43, 0.4)',
  },
  fonts: configureFonts({
    config: {
      displaySmall: {
        fontFamily: 'Inter',
        fontSize: 36,
        fontWeight: Platform.OS === 'ios' ? '400' : undefined,
        letterSpacing: 0,
        lineHeight: 44
      },
      displayMedium: {
        fontFamily: 'Inter',
        fontSize: 45,
        fontWeight: Platform.OS === 'ios' ? '400' : undefined,
        letterSpacing: 0,
        lineHeight: 52
      },
      displayLarge: {
        fontFamily: 'Inter',
        fontSize: 57,
        fontWeight: Platform.OS === 'ios' ? '400' : undefined,
        letterSpacing: -0.25,
        lineHeight: 64
      },
      headlineSmall: {
        fontFamily: 'Inter',
        fontSize: 20,
        fontWeight: Platform.OS === 'ios' ? '500' : undefined,
        letterSpacing: 0,
        lineHeight: 32
      },
      headlineMedium: {
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: Platform.OS === 'ios' ? '500' : undefined,
        letterSpacing: 0,
        lineHeight: 36
      },
      headlineLarge: {
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: Platform.OS === 'ios' ? '500' : undefined,
        letterSpacing: 0,
        lineHeight: 40
      },
      titleSmall: {
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: Platform.OS === 'ios' ? '600' : undefined,
        letterSpacing: 0.1,
        lineHeight: 20
      },
      titleMedium: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: Platform.OS === 'ios' ? '500' : undefined,
        letterSpacing: 0.15,
        lineHeight: 24
      },
      titleLarge: {
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: Platform.OS === 'ios' ? '600' : undefined,
        letterSpacing: 0,
        lineHeight: 28
      },
      labelSmall: {
        fontFamily: 'Inter',
        fontSize: 11,
        fontWeight: Platform.OS === 'ios' ? '600' : undefined,
        letterSpacing: 0.5,
        lineHeight: 16
      },
      labelMedium: {
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: Platform.OS === 'ios' ? '600' : undefined,
        letterSpacing: 0.5,
        lineHeight: 16
      },
      labelLarge: {
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: Platform.OS === 'ios' ? '600' : undefined,
        letterSpacing: 0.1,
        lineHeight: 20
      },
      bodySmall: {
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: Platform.OS === 'ios' ? '300' : undefined,
        letterSpacing: 0.4,
        lineHeight: 16
      },
      bodyMedium: {
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: Platform.OS === 'ios' ? '300' : undefined,
        letterSpacing: 0.25,
        lineHeight: 20
      },
      bodyLarge: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: Platform.OS === 'ios' ? '300' : undefined,
        letterSpacing: 0.5,
        lineHeight: 24
      },
      default: {
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: Platform.OS === 'ios' ? '300' : undefined,
        letterSpacing: 0.25,
        lineHeight: 20
      }
    }
  })
});

export const theme = merge(LightTheme, CustomMD3LightTheme);