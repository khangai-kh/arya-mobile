import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { MainStackParams } from '../models/navigation';
import { IconButton, useTheme } from 'react-native-paper';

type CalendarlyScreen = StackScreenProps<MainStackParams, 'CalendarlyScreen'>;

export const CalendarlyScreen = ({ navigation, route: _route }: CalendarlyScreen) => {
    const { colors } = useTheme();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <IconButton
                    containerColor={colors.onPrimary}
                    icon={require('../assets/flat-icons/angle-small-left.png')}
                    size={24}
                    onPress={() => navigation.goBack()}
                />
            </View>
        <WebView
            source={{ uri: 'https://calendly.com/khangai-khurelbaatar-dubertas' }}
            style={styles.webview}
        />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginVertical: 10,
      backgroundColor: 'transparent', // Make the header transparent
      position: 'absolute', // Overlay the header on top of the WebView
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1, // Ensure it stays above the WebView
    },
    webview: {
      flex: 1,
    },
  });
