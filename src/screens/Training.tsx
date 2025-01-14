import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { default as LinearGradient } from 'react-native-linear-gradient';
import { Appbar, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { AppStackParams } from '../navigation/App';

type TrainingProps = StackScreenProps<AppStackParams, 'Training'>;

export const Training = (props: TrainingProps) => {
    const {
        navigation,
        route
    } = props;
    const { colors } = useTheme();

    const [
        training,
        setTraining
    ] = useState({
        title: "Understanding Venture Capital",
        subTitle: "Gain insights into how venture capital works and what investors look for in startups",
        image: "",
        body: `In today’s fast-paced world, groundbreaking ideas are born every day. But without the right resources, even the most brilliant innovations can remain unrealized. That’s where venture capital steps in—a powerful engine driving growth for startups and emerging businesses.

Venture capital isn't just about money; it's about partnership and strategy. As an investor, you’re not simply funding an idea; you’re fueling a vision, guiding entrepreneurs through the challenges of scaling, and sharing in the risks and rewards of innovation. But how does it all work?

In this course, we’ll dive deep into the venture capital ecosystem. You’ll learn the ins and outs of funding stages, from seed rounds to Series A and beyond. We’ll demystify the structure of venture capital funds, explore the intricacies of term sheets, and equip you with the tools to assess startups effectively.
By the end, you'll not only understand how venture capital shapes the future of industries but also how you can leverage it to maximize both financial returns and societal impact. Ready to begin your journey into the world of venture capital? Let’s get started!`,
        type: "Investor training",
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
                                icon={require('../assets/flat-icons/angle-small-left.png')}
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
                            {training.type}
                        </Text>
                    </Box>
                    <Text
                        variant='titleLarge'
                        style={{
                            marginTop: 28,
                            marginBottom: 4
                        }}
                    >
                        {training.title}
                    </Text>
                    <Text
                        variant='titleSmall'
                        style={{
                            marginTop: 4,
                            marginBottom: 12
                        }}
                    >
                        {training.subTitle}
                    </Text>
                    <Text>
                        {training.body}
                    </Text>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
};