import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { default as LinearGradient } from 'react-native-linear-gradient';
import { Appbar, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { AppStackParams } from '../navigation/App';

type ContentProps = StackScreenProps<AppStackParams, 'Content'>;

export const Content = (props: ContentProps) => {
    const {
        navigation,
        route
    } = props;
    const { colors } = useTheme();

    const [
        content,
        setContent
    ] = useState({
        title: "Arya GSYF Invests $250,000 in PhiTech",
        subTitle: "Health biotechnology focused on genome technologies",
        image: "",
        body: `Arya GCIF, established in partnership with Arya Women Investment Platform and Maxis, announced its seventh investment in PhiTech, a health biotechnology company focused on genome technologies.
Founded by Prof. Dr. Saliha Durmuş, Prof. Dr. Tunahan Çakır and Prof. Dr. Erdoğan Sevilgen, PhiTech is developing an artificial intelligence-enabled clinical decision support system that processes DNA and RNA sequence data. Aiming early and accurate diagnosis, especially against the diagnostic processes that can take years in rare genetic diseases, the initiative is preparing to start offering bioinformatics (data processing) solutions that bring the diagnostic power of RNA to clinical practice through its platform called Genomics & More in early 2024.
PhiTech's first investment round, which closed in February 2023, was led by IstCapital and Omurga Teknoloji GSYF, with Aytül Erçil, Candan Karabağlı, Cengiz Aydın, Emine Erdem, Neşe Gök, Ömer Aras, Selen Kocabaş, Sena Nomak and Temel Güzeloglu as investors. Saliha Durmuş, co-founder and CEO of the company, stated that after the first investment round, they accelerated their R&D processes and completed the company structuring in the US and are about to complete the Dutch structuring. The company plans to close this second investment round, in which Arya GSYF participated, before the end of 2023.
Arya GSYF's decision to invest in PhiTech was driven by a team of highly competent scientists with complementary expertise, led by Saliha Durmuş, and a deep technological R&D team that develops innovative diagnostic solutions.`,
        type: "Investment",
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
                    source={require('../assets/dummy-image-1.png')}
                    style={{
                        position: 'relative',
                        paddingTop: '56.25%',
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
                            {content.type}
                        </Text>
                    </Box>
                    <Text
                        variant='titleLarge'
                        style={{
                            marginTop: 28,
                            marginBottom: 4
                        }}
                    >
                        {content.title}
                    </Text>
                    <Text
                        variant='titleSmall'
                        style={{
                            marginTop: 4,
                            marginBottom: 12
                        }}
                    >
                        {content.subTitle}
                    </Text>
                    <Text>
                        {content.body}
                    </Text>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
};