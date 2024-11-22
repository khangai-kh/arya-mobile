import { DefaultTheme } from '@react-navigation/native';
import { default as merge } from 'deepmerge';
import { Platform } from 'react-native';
import { adaptNavigationTheme, configureFonts, MD3LightTheme } from 'react-native-paper';

const { LightTheme } = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme
});

const CustomMD3LightTheme = merge(MD3LightTheme, {
    roundness: 8,
    colors: {
        primary: 'rgb(236, 28, 35)',
        onPrimary: 'rgb(255, 255, 255)',
        primaryContainer: 'rgba(236, 28, 35, 0.12)',
        // onPrimaryContainer: 'rgb(65, 0, 2)',
        secondary: 'rgb(26, 37, 77)',
        onSecondary: 'rgb(255, 255, 255)',
        secondaryContainer: 'rgb(26, 37, 77, 0.12)',
        // onSecondaryContainer: 'rgb(0, 21, 81)',
        tertiary: 'rgb(191, 0, 42)',
        onTertiary: 'rgb(255, 255, 255)',
        tertiaryContainer: 'rgb(191, 0, 42, 0.12)',
        // onTertiaryContainer: 'rgb(65, 0, 8)',
        error: 'rgb(186, 26, 26)',
        onError: 'rgb(255, 255, 255)',
        errorContainer: 'rgb(255, 218, 214)',
        onErrorContainer: 'rgb(65, 0, 2)',
        background: 'rgb(255, 255, 255)',
        onBackground: 'rgb(26, 37, 77)',
        surface: 'rgb(255, 255, 255)',
        onSurface: 'rgb(26, 37, 77)',
        // surfaceVariant: 'rgb(245, 221, 218)',
        // onSurfaceVariant: 'rgb(83, 67, 65)',
        outline: 'rgb(133, 115, 113)',
        outlineVariant: 'rgb(216, 222, 225)',
        shadow: 'rgb(0, 0, 0)',
        scrim: 'rgb(0, 0, 0)',
        inverseSurface: 'rgb(54, 47, 46)',
        inverseOnSurface: 'rgb(251, 238, 236)',
        inversePrimary: 'rgb(255, 180, 171)',
        elevation: {
            level0: 'transparent',
            level1: 'rgb(252, 238, 243)',
            level2: 'rgb(250, 231, 236)',
            level3: 'rgb(248, 223, 229)',
            level4: 'rgb(247, 221, 227)',
            level5: 'rgb(246, 216, 222)'
        },
        surfaceDisabled: 'rgba(32, 26, 25, 0.12)',
        onSurfaceDisabled: 'rgba(32, 26, 25, 0.38)',
        backdrop: 'rgba(59, 45, 43, 0.4)'
    },
    fonts: configureFonts({
        config: {
            displaySmall: {
                fontFamily: 'Nunito-Regular',
                fontSize: 36,
                fontWeight: Platform.OS === 'ios' ? '400' : undefined,
                letterSpacing: 0,
                lineHeight: 44
            },
            displayMedium: {
                fontFamily: 'Nunito-Regular',
                fontSize: 45,
                fontWeight: Platform.OS === 'ios' ? '400' : undefined,
                letterSpacing: 0,
                lineHeight: 52
            },
            displayLarge: {
                fontFamily: 'Nunito-Regular',
                fontSize: 57,
                fontWeight: Platform.OS === 'ios' ? '400' : undefined,
                letterSpacing: -0.25,
                lineHeight: 64
            },
            headlineSmall: {
                fontFamily: 'Nunito-Bold',
                fontSize: 24,
                fontWeight: Platform.OS === 'ios' ? '700' : undefined,
                letterSpacing: 0,
                lineHeight: 32
            },
            headlineMedium: {
                fontFamily: 'Nunito-Bold',
                fontSize: 28,
                fontWeight: Platform.OS === 'ios' ? '700' : undefined,
                letterSpacing: 0,
                lineHeight: 36
            },
            headlineLarge: {
                fontFamily: 'Nunito-Bold',
                fontSize: 32,
                fontWeight: Platform.OS === 'ios' ? '700' : undefined,
                letterSpacing: 0,
                lineHeight: 40
            },
            titleSmall: {
                fontFamily: 'Nunito-Bold',
                fontSize: 14,
                fontWeight: Platform.OS === 'ios' ? '700' : undefined,
                letterSpacing: 0.1,
                lineHeight: 20
            },
            titleMedium: {
                fontFamily: 'Nunito-Bold',
                fontSize: 16,
                fontWeight: Platform.OS === 'ios' ? '700' : undefined,
                letterSpacing: 0.15,
                lineHeight: 24
            },
            titleLarge: {
                fontFamily: 'Nunito-Bold',
                fontSize: 22,
                fontWeight: Platform.OS === 'ios' ? '700' : undefined,
                letterSpacing: 0,
                lineHeight: 28
            },
            labelSmall: {
                fontFamily: 'Nunito-Bold',
                fontSize: 11,
                fontWeight: Platform.OS === 'ios' ? '700' : undefined,
                letterSpacing: 0.5,
                lineHeight: 16
            },
            labelMedium: {
                fontFamily: 'Nunito-Bold',
                fontSize: 12,
                fontWeight: Platform.OS === 'ios' ? '700' : undefined,
                letterSpacing: 0.5,
                lineHeight: 16
            },
            labelLarge: {
                fontFamily: 'Nunito-Bold',
                fontSize: 14,
                fontWeight: Platform.OS === 'ios' ? '700' : undefined,
                letterSpacing: 0.1,
                lineHeight: 20
            },
            bodySmall: {
                fontFamily: 'Nunito-Regular',
                fontSize: 12,
                fontWeight: Platform.OS === 'ios' ? '400' : undefined,
                letterSpacing: 0.4,
                lineHeight: 16
            },
            bodyMedium: {
                fontFamily: 'Nunito-Regular',
                fontSize: 14,
                fontWeight: Platform.OS === 'ios' ? '400' : undefined,
                letterSpacing: 0.25,
                lineHeight: 20
            },
            bodyLarge: {
                fontFamily: 'Nunito-Regular',
                fontSize: 16,
                fontWeight: Platform.OS === 'ios' ? '400' : undefined,
                letterSpacing: 0.5,
                lineHeight: 24
            },
            default: {
                fontFamily: 'Nunito-Regular',
                fontSize: 14,
                fontWeight: Platform.OS === 'ios' ? '400' : undefined,
                letterSpacing: 0.25,
                lineHeight: 20
            }
        }
    })
});

export const theme = merge(LightTheme, CustomMD3LightTheme);
