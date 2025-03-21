import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, Button, MD3Theme, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; //

type DisclosureComponentProps = {
  headerTitle: string;
  mainText: string;
  buttonText: string;
  onButtonPress: () => void;
  isVisible?: boolean;
  containerStyle?: ViewStyle;
};

export const DisclosureComponent = ({
  headerTitle,
  mainText,
  buttonText,
  onButtonPress,
  isVisible = true,
  containerStyle,
}: DisclosureComponentProps) => {
    const { colors } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const dynamicStyles = createDynamicStyles(colors);
    return (
        <SafeAreaView style={[dynamicStyles.container, containerStyle]} edges={['bottom']}>
            <Appbar.Header style={dynamicStyles.appbarHeader}>
                <Appbar.Action
                    icon={require('../assets/flat-icons/angle-small-left.png')}
                    color="#414042"
                    size={20}
                    style={dynamicStyles.appbarActionRight}
                    onPress={() => navigation.goBack()}
                />
                <Appbar.Content
                    title={
                        <View style={dynamicStyles.titleContainer}>
                            <Text variant="titleMedium">{headerTitle}</Text>
                        </View>
                    }
                />
            </Appbar.Header>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={dynamicStyles.contentContainer}>
            <Text variant="labelMedium">{headerTitle}</Text>
            <Text variant="bodySmall">{mainText}</Text>
            </View>
        </ScrollView>
        {isVisible &&
            <Box px={16} py={16}>
                <Button mode="contained" onPress={onButtonPress}>
                {buttonText}
                </Button>
            </Box>
        }
        </SafeAreaView>
  );
};
const createDynamicStyles = (colors: MD3Theme['colors']) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    appbarHeader:{
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    contentContainer: {
      marginTop: 24,
      paddingHorizontal: 16,
    },
    appbarActionRight: {
      backgroundColor: colors.onPrimary,
      marginRight: 5,
      position: 'absolute',
      left: 5,
      top: '50%',
      transform: [{ translateY: -25}],
  },
});
