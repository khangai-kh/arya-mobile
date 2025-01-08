import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { default as LinearGradient } from 'react-native-linear-gradient';
import { Appbar, Avatar, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { AppStackParams } from '../navigation/App';

type InspirationProps = StackScreenProps<AppStackParams, 'Inspiration'>;

export const Inspiration = (props: InspirationProps) => {
    const {
        navigation,
        route
    } = props;
    const { colors } = useTheme();

    const [
        inspiration,
        setInspiration
    ] = useState({
        title: "Sustainability and Social Innovation: Who is Really Responsible?",
        image: "",
        name: "Hüsna Nur Sontürk",
        profileImage: "",
        date: "2024-09-24",
        body: `Lifelong learning, development, discovery! A lifelong learning route for everyone who embraces learning from knowledge and experiences at every moment of life.

Lifelong learning and personal development are popular topics of recent times. So what is lifelong learning? In this article, I would like to talk about the importance of lifelong learning, the contributions it offers us and how we can learn more effectively. If you are ready, let's take a look at this inclusive process that takes place anywhere and anytime, not only within the classroom walls, not only learning from experiences at a young age. 🙂

First of all, let's talk about the key to adaptation in a changing world. For example, with the advancement of mobile technology, especially in the post-covid period, restaurants have made their menus accessible with QR, so access has both become easier and faster. Businesses that could not follow and learn this development could not have these advantages. Or let's take a simpler example from daily life. We have all come across at some point in our lives that elderly people who are not familiar with telephone technology have difficulty in taking advantage of opportunities such as video chat or communication using social media. This is why adapting to the changing world conditions and adopting lifelong learning is necessary in every field and at every moment.`
    });

    return (

        <SafeAreaView
            style={{
                flex: 1
            }}
            edges={[
                'bottom'
            ]}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground
                    resizeMode="cover"
                    source={require('../assets/dummy-image-1.jpeg')}
                    style={{
                        position: 'relative',
                        paddingTop: '64%',
                        backgroundColor: '#f2f4f7'
                    }}
                >
                    <LinearGradient
                        style={{
                            ...StyleSheet.absoluteFillObject
                        }}
                        colors={[
                            '#00000099',
                            '#00000000'
                        ]}
                    >
                        <Appbar.Header style={{
                            backgroundColor: 'transparent'
                        }}>
                            <Appbar.Action
                                icon={require('../assets/flat-icons/chevron-left.png')}
                                color="#414042"
                                style={{
                                    backgroundColor: colors.onPrimary
                                }}
                                onPress={() => {
                                    navigation.goBack();
                                }}
                            />
                        </Appbar.Header>
                    </LinearGradient>
                </ImageBackground>
                <Box
                    px={16}
                    mt={24}
                >
                    <Box
                        px={12}
                        py={3}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 12,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderRadius: 32,
                            backgroundColor: '#F5EF99'
                        }}
                    >
                        <Text variant="labelSmall">
                            Financial Inspirations
                        </Text>
                    </Box>
                    <Text
                        variant='titleLarge'
                        style={{
                            marginTop: 28,
                            marginBottom: 4
                        }}
                    >
                        {inspiration.title}
                    </Text>
                    <View
                        style={{
                            marginTop: 4,
                            marginBottom: 12,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Avatar.Image
                            size={24}
                            source={require('../assets/avatar.png')}
                            style={{
                                backgroundColor: '#f2f4f7',
                                marginRight: 4.5
                            }}
                        />
                        <Text
                            variant='bodySmall'
                            style={{
                                fontWeight: '300'
                            }}
                        >
                            {inspiration.name}
                        </Text>
                    </View>
                    <Text>
                        {inspiration.body}
                    </Text>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
};