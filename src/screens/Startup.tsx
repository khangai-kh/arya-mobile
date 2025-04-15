import React, { useCallback } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { Image, View, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, Avatar, Button, Chip, Divider, IconButton, MD3Theme, Modal, Portal, Text, useTheme, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { MainStackParams } from '../models/navigation';
import { ProductModel, StartupModel } from '../models/homepage/Startup';
import { useQuery } from 'react-query';
import { RootState } from '../redux/configureStore';
import { useSelector } from 'react-redux';
import { API } from '../plugins/axios';
import { Member } from '../components/Member';
import { UserModelList } from '../models/users/User/user.model';

type StartupProps = StackScreenProps<MainStackParams, 'Startup'>;

export const Startup = ({route, navigation}: StartupProps) => {
    const { token, user_id } = useSelector((state: RootState) => state.auth);
    const { colors } = useTheme();
    const dynamicStyles = createDynamicStyles(colors);
    const [isLoading, setIsLoading] = useState(false);
    const startupId = route.params?.id;
    const [startup, setStartup] = useState<StartupModel | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [loadingFollowId, setLoadingFollowId] = useState<number | null>(null);
    const [founders, setFounders] = useState<UserModelList[]>([]);
    const [investors, setInvestors] = useState<UserModelList[]>([]);

    const { isFetching: isFetchingProfile } = useQuery(
        ['startup', token],
        () => API.get('/api/startup/' + startupId),
        {
          onSuccess: ({ data }) => {
            console.log('Startup data:', data);
            setStartup(data);
            setFounders(data.founders || []);
            setInvestors(data.investors || []);
          },
          onError: (error) => {
            console.error('Error fetching startups:', error);
          },
        }
    );

    const [visible, setVisible] = useState(false);

    const checkColor = (value: string | undefined): string => {
        const colorsMap: { [key: string]: string } = {
            'HealthTech': '#00AEEF',
            'Academy': '#F99F1C',
            'Closed deals': '#A09FA0',
            'Graduate': '#4CB748',
        };
        return colorsMap[value || ''] || '#A09FA0';
    };

    const formatNumber = (value: number, currencySymbol: string): string => {
        const sign = value < 0 ? '-' : '';
        const absValue = Math.abs(value);
        let formattedValue: string;

        if (absValue >= 1000000) {
          formattedValue = (absValue / 1_000_000).toFixed(1).replace(/\.0$/, '') + ' M';
        } else if (absValue >= 1000) {
          formattedValue = (absValue / 1_000).toFixed(1).replace(/\.0$/, '') + ' K';
        } else {
          formattedValue = absValue.toString();
        }

        return `${sign}${currencySymbol} ${formattedValue}`;
    };

    const wrapIntoTwoLines = (text: string, maxLength: number = 50): string => {
        const indexOfParen = text.indexOf('(');
        if (indexOfParen === -1) {
            // No parenthesis, wrap word by word
            const words = text.trim().split(/\s+/);
            let firstLineLength = 0;
            let firstLine: string[] = [];

            for (const word of words) {
                if (firstLineLength + word.length + firstLine.length <= Math.floor(maxLength / 2)) {
                    firstLine.push(word);
                    firstLineLength += word.length;
                } else {
                    break;
                }
            }

            const secondLine = words.slice(firstLine.length).join(' ');
            return firstLine.length > 0 && secondLine ? `${firstLine.join(' ')}\n${secondLine}` : text;
        } else {
            // Parenthesis found, keep ( ) content intact
            const beforeParen = text.substring(0, indexOfParen).trim();
            const afterParen = text.substring(indexOfParen);

            const words = beforeParen.split(/\s+/);
            let firstLineLength = 0;
            let firstLine: string[] = [];

            for (const word of words) {
                if (firstLineLength + word.length + firstLine.length <= Math.floor(maxLength / 2)) {
                    firstLine.push(word);
                    firstLineLength += word.length;
                } else {
                    break;
                }
            }

            const remainingWords = words.slice(firstLine.length);
            const secondLine = remainingWords.length > 0 ? `${remainingWords.join(' ')} ${afterParen}` : afterParen;
            return firstLine.length > 0 ? `${firstLine.join(' ')}\n${secondLine.trim()}` : text;
        }
    };

    const handlePitchDeckPress = async (url: string | undefined) => {
        if (!url) {
            console.log('No pitch deck URL available');
            return;
        }
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                console.error('Cannot open URL:', url);
            }
        } catch (error) {
            console.error('Error opening pitch deck:', error);
        }
    };

    const handleFollowPress = useCallback(
        async (userId: number) => {
          setLoadingFollowId(userId);
          try {
            const currentMember = founders.find((member) => member.id === userId);
            const currentFollowing = currentMember?.is_favorited || false;

            if (currentFollowing) {
              await API.post('/api/users/unfollow', { user_id: userId });
            } else {
              await API.post('/api/users/follow', { user_id: userId });
            }
            setFounders((prevMembers) =>
              prevMembers.map((member) =>
                member.id === userId
                  ? { ...member, is_favorited: !currentFollowing }
                  : member
              )
            );
          } catch (error) {
            console.error('Error toggling follow status:', error);
          } finally {
            setLoadingFollowId(null);
          }
        },
        [founders]
    );

    const handleFollowPress1 = useCallback(
        async (userId: number) => {
          setLoadingFollowId(userId);
          try {
            const currentMember = investors.find((member) => member.id === userId);
            const currentFollowing = currentMember?.is_favorited || false;

            if (currentFollowing) {
              await API.post('/api/users/unfollow', { user_id: userId });
            } else {
              await API.post('/api/users/follow', { user_id: userId });
            }
            setInvestors((prevMembers) =>
              prevMembers.map((member) =>
                member.id === userId
                  ? { ...member, is_favorited: !currentFollowing }
                  : member
              )
            );
          } catch (error) {
            console.error('Error toggling follow status:', error);
          } finally {
            setLoadingFollowId(null);
          }
        },
        [investors]
    );

    const handleFollowPress3 = async (id: number) => {
        if (!id || loadingFollowId !== null) {
            return;
        }
        console.log('Follow button pressed:', id);
        setLoadingFollowId(id);
        try {
            const currentFollowing = startup?.is_favorite || false;
            console.log('Current following status:', currentFollowing);
            await API.post(
                '/api/startups/add-favorites',
                { startup_id: id, status: !currentFollowing },
            );
            setStartup(prev => prev ? { ...prev, is_favorite: !currentFollowing } : prev);
        } catch (error: any) {
            console.error('Error toggling follow status:', error.response?.data || error.message);
        } finally {
            setLoadingFollowId(null);
        }
    };

    const isDataLoading = isFetchingProfile || isLoading;

    if (isDataLoading) {
        return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.primary || '#000000'} />
        </View>
        );
    }

    return (
        <SafeAreaView style={dynamicStyles.safeArea} edges={['top']}>
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

                            <Text variant="titleMedium" style={dynamicStyles.interestText}>
                                Startup
                            </Text>
                        </View>
                    }
                />
                <Appbar.Action
                    icon={
                        startup?.is_favorite
                        ? require('../assets/flat-icons/heart-outlined.png')
                        : require('../assets/flat-icons/heart.png')
                    }
                    iconColor={startup?.is_favorite ? '#fff' : '#B61D8D'}
                    style={[
                        {
                            backgroundColor: startup?.is_favorite ? colors.primary : colors.onPrimary,
                        },
                        dynamicStyles.appbarActionRightHeart,
                    ]}
                    size={18}
                    onPress={() => handleFollowPress3(startupId)}
                />
                {user_id === startup?.created_user && (
                    <Appbar.Action
                    icon={require('../assets/flat-icons/edit.png')}
                    color="#414042"
                    size={20}
                    style={dynamicStyles.appbarActionRight}
                    onPress={() => {}}
                />)}

            </Appbar.Header>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={dynamicStyles.cardContainer}>
                    <View style={dynamicStyles.header}>
                        <Avatar.Image
                            size={80}
                            source={startup?.startup_logo ? { uri: startup?.startup_logo } : require('../assets/dummy-product-4.jpeg')}
                            style={dynamicStyles.avatar}
                        />
                        <Box style={dynamicStyles.headerContent}>
                            <View style={dynamicStyles.chipContainer}>
                                <Chip
                                    style={[dynamicStyles.chip, { backgroundColor: checkColor(startup?.startup_type?.name) }]}
                                >
                                    <Text variant="labelMedium" style={dynamicStyles.chipText}>
                                        {startup?.startup_type?.name || 'Unknown'}
                                    </Text>
                                </Chip>
                            </View>
                            <Text variant="titleMedium" style={dynamicStyles.title}>
                                {startup?.name || 'Unnamed Startup'}
                            </Text>
                            <Text variant="bodyMedium" style={dynamicStyles.bio}>
                                {startup?.startup_type?.description || 'No description available'}
                            </Text>
                        </Box>
                    </View>
                    <View style={dynamicStyles.body}>
                        <Text numberOfLines={4}>{startup?.description || 'No description'}</Text>
                    </View>
                    <View style={dynamicStyles.dataContainer}>
                        <View style={styles.badge}>
                            <View style={[styles.badgeIcon, { backgroundColor: '#E6F3E6' }]}>
                                <Image
                                    source={require('../assets/flat-icons/phase.png')}
                                    style={styles.icon}
                                />
                            </View>
                            <Text style={styles.badgeText}>
                                {wrapIntoTwoLines(startup?.startup_status?.name || 'Unknown', 30)}
                            </Text>
                        </View>
                        <View style={styles.badge}>
                            <View style={[styles.badgeIcon, { backgroundColor: '#FFF8CC' }]}>
                                <Image
                                    source={require('../assets/flat-icons/investment_type.png')}
                                    style={styles.icon}
                                />
                            </View>
                            <Text style={styles.badgeText}>
                                {wrapIntoTwoLines(startup?.funding_round_type?.name || 'Unknown', 100)}
                            </Text>
                        </View>
                        <View style={styles.badge}>
                            <View style={[styles.badgeIcon, { backgroundColor: '#FCE4EC' }]}>
                                <Image
                                    source={require('../assets/flat-icons/total_investment.png')}
                                    style={styles.icon}
                                />
                            </View>
                            <Text style={styles.badgeText}>
                                {startup?.total_investment !== undefined && startup?.total_investment !== null
                                    ? formatNumber(startup.total_investment, startup?.currency?.symbol || '$')
                                    : 'N/A'}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Funding Round Section */}
                <View style={dynamicStyles.section}>
                    <Text variant="titleMedium">Funding round</Text>
                    <View style={dynamicStyles.card}>
                        <View>
                            <Text variant="titleSmall" style={dynamicStyles.sectionTitle}>Funding deadline</Text>
                            <Text>{startup?.fundings?.[0]?.funding_deadline || 'No deadline available'}</Text>
                        </View>
                        <Divider style={dynamicStyles.divider} />
                        <View>
                            <Text variant="titleSmall" style={dynamicStyles.sectionTitle}>Use of funds</Text>
                            <Text>{startup?.fundings?.[0]?.use_of_funds || 'Not available'}</Text>
                        </View>
                        <Divider style={dynamicStyles.divider} />
                        <View>
                            <Text variant="titleSmall" style={dynamicStyles.sectionTitle}>Investment terms</Text>
                            <Text>Equity offered: {startup?.fundings?.[0]?.equity_offered || 0 } %</Text>
                        </View>
                        <Divider style={dynamicStyles.divider} />
                        <View>
                            <Text variant="titleSmall" style={dynamicStyles.sectionTitle}>Pitch deck</Text>
                            <View style={dynamicStyles.pitchDeck}>
                                {startup?.pitch_decks?.[0]?.file_name && (
                                    <>
                                        <Image
                                            source={require('../assets/flat-icons/download.png')}
                                            style={dynamicStyles.downloadIcon} />
                                        <Text
                                            onPress={() => handlePitchDeckPress(startup?.pitch_decks?.[0]?.file_url ?? undefined)}
                                            style={styles.pitchDeckText}
                                        >
                                            {startup?.pitch_decks?.[0]?.file_name || 'Not available'}
                                        </Text>
                                    </>
                                )}
                            </View>
                        </View>
                    </View>
                </View>

                {/* Founders Section */}
                <View style={dynamicStyles.section}>
                    <Text variant="titleMedium">Founders</Text>
                    <View style={dynamicStyles.foundersContainer}>
                        {founders?.map((founder, index) => (
                            <Member
                                key={index}
                                name={founder.full_name || ''}
                                image={founder.photo}
                                memberRole={founder.role?.name || ''}
                                status={founder.title}
                                following={founder.is_favorited || false}
                                interests={[]}
                                isLoading={loadingFollowId === (founder.id || 0)}
                                style={[
                                    styles.memberItem,
                                    index === (startup?.founders?.length ?? 0) - 1 && styles.lastMemberItem,
                                ]}
                                onPress={() => {
                                    navigation.navigate('Member', { id: founder.id });
                                }}
                                onFollowPress={() => handleFollowPress1(founder.id || 0)}
                            />
                        ))}
                    </View>
                </View>

                {/* Products Section */}
                <View style={dynamicStyles.section}>
                    <Text variant="titleMedium">Products</Text>
                    {startup?.products?.map((num: ProductModel, index) => (
                        <View key={index} style={dynamicStyles.cardContainer}>
                            <Text variant="titleMedium" style={dynamicStyles.interestText}>
                                {num.name}
                            </Text>
                            <Text
                                numberOfLines={isExpanded ? 0 : 3}
                                ellipsizeMode="tail"
                            >
                                {num.description}
                            </Text>
                            {num?.description?.length && num.description.length > 100 && (
                                <TouchableRipple onPress={() => setIsExpanded(!isExpanded)}>
                                    <Text style={{ color: colors.primary || '#0000FF', marginTop: 5 }}>
                                        {isExpanded ? 'Show Less' : 'Show More'}
                                    </Text>
                                </TouchableRipple>
                            )}
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={dynamicStyles.productsScroll}
                            >
                                {num?.images?.map((image, imgIndex) => (
                                    <Image
                                        key={`${num.id}-image-${imgIndex}`}
                                        resizeMode="cover"
                                        source={
                                            image?.image_url
                                            ? { uri: image?.image_url }
                                            : require('../assets/dummy-product-1.jpeg')
                                        }
                                        style={dynamicStyles.productImage}
                                    />
                                ))}
                            </ScrollView>
                        </View>
                    ))}
                </View>

                {/* Investors Section */}
                <View style={dynamicStyles.section}>
                    <Text variant="titleMedium">Investors</Text>
                    <View style={dynamicStyles.foundersContainer}>
                        {investors?.map((founder, index) => (
                             <Member
                             key={index}
                             name={founder.full_name || ''}
                             image={founder.photo}
                             memberRole={founder.role?.name || ''}
                             status={founder.title}
                             following={founder.is_favorited || false}
                             interests={[]}
                             isLoading={loadingFollowId === (founder.id || 0)}
                             style={[
                                 styles.memberItem,
                                 index === (startup?.founders?.length ?? 0) - 1 && styles.lastMemberItem,
                             ]}
                             onPress={() => {
                                 navigation.navigate('Member', { id: founder.id });
                             }}
                             onFollowPress={() => handleFollowPress(founder.id || 0)}
                         />
                        ))}
                    </View>
                </View>
            </ScrollView>

            {user_id === startup?.created_user && (
                <Box px={16} py={16}>
                    <Button mode="contained" onPress={() => setVisible(true)}>
                        Apply for round
                    </Button>
                </Box>
            )}

            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    contentContainerStyle={dynamicStyles.modal}
                >
                    <IconButton
                        icon={require('../assets/flat-icons/x.png')}
                        size={24}
                        iconColor="#A09FA0"
                        style={dynamicStyles.modalClose}
                        onPress={() => setVisible(false)}
                    />
                    <Image
                        resizeMode="contain"
                        source={require('../assets/flat-icons/check-circle.png')}
                        style={dynamicStyles.modalIcon}
                    />
                    <Text variant="headlineSmall" style={dynamicStyles.modalTitle}>
                        Your application received
                    </Text>
                    <Text variant="bodySmall" style={dynamicStyles.modalText}>
                        Your application has been forwarded to the relevant persons, thank you.
                    </Text>
                    <View style={dynamicStyles.modalButtons}>
                        <TouchableRipple
                            style={dynamicStyles.modalButton}
                            onPress={() => {}}
                        >
                            <Text variant="titleMedium" style={dynamicStyles.modalButtonText}>
                                Wait for updates
                            </Text>
                        </TouchableRipple>
                        <TouchableRipple
                            style={dynamicStyles.modalButtonPrimary}
                            onPress={() => {}}
                        >
                            <Text variant="titleMedium" style={dynamicStyles.modalButtonPrimaryText}>
                                Get in touch
                            </Text>
                        </TouchableRipple>
                    </View>
                </Modal>
            </Portal>
        </SafeAreaView>
    );
};

const createDynamicStyles = (colors: MD3Theme['colors']) =>
  StyleSheet.create({
    safeArea: { flex: 1 },
    cardContainer: {
        flex: 1,
        marginTop: 24,
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: '#f2f4f7',
        marginRight: 8,
    },
    appbarHeader: {
        width: '100%',
        backgroundColor: 'transparent',
        alignContent: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    appbarActionRight: {
        backgroundColor: colors.onPrimary || '#FFFFFF',
        marginRight: 5,
        marginTop: 20,
    },
    appbarActionRightHeart: {
        marginRight: 5,
        marginTop: 20,
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 20,
    },
    interestText: {
        fontWeight: 'bold',
        paddingLeft: 0,
        marginLeft: 0,
    },
    headerContent: {
        flex: 1,
    },
    chipContainer: {
        flexDirection: 'row',
    },
    chip: {
        marginRight: 4,
        alignSelf: 'flex-start',
    },
    chipText: {
        color: '#fff',
    },
    title: {
        marginVertical: 4,
    },
    bio: {
        flex: 1,
    },
    body: {
        marginVertical: 12,
    },
    dataContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    section: {
        paddingHorizontal: 16,
        marginTop: 12,
    },
    card: {
        marginTop: 8,
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 16,
    },
    sectionTitle: {
        marginBottom: 2,
    },
    divider: {
        marginVertical: 8,
    },
    pitchDeck: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
    },
    downloadIcon: {
        width: 20,
        height: 20,
        marginRight: 4,
    },
    foundersContainer: {
        marginTop: 8,
    },
    founderItem: {
        marginBottom: 8,
    },
    productsScroll: {
        marginTop: 8,
    },
    productImage: {
        marginRight: 8,
        borderRadius: 12,
        width: 136,
        height: 136,
        backgroundColor: '#fff',
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 24,
        margin: 24,
        padding: 16,
    },
    modalClose: {
        alignSelf: 'flex-end',
    },
    modalIcon: {
        alignSelf: 'center',
        width: 56,
        height: 56,
        tintColor: '#4CB748',
        marginBottom: 24,
    },
    modalTitle: {
        textAlign: 'center',
    },
    modalText: {
        textAlign: 'center',
        marginTop: 8,
    },
    modalButtons: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        rowGap: 8,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12.5,
        borderRadius: 32,
        alignItems: 'center',
    },
    modalButtonText: {
        textAlign: 'center',
    },
    modalButtonPrimary: {
        paddingVertical: 12.5,
        paddingHorizontal: 28.5,
        backgroundColor: '#4CB748',
        borderRadius: 32,
        alignItems: 'center',
    },
    modalButtonPrimaryText: {
        color: '#FFFFFF',
    },
});

const styles = StyleSheet.create({
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 6,
        justifyContent: 'center',
    },
    badgeIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
        height: 35,
        width: 35,
    },
    badgeText: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 10,
        paddingLeft: 4,
        fontWeight: '500',
    },
    icon: {
        width: 18,
        height: 18,
        padding: 5,
    },
    pitchDeckText: {
        color: '#007AFF',
        textDecorationLine: 'underline',
    },
    memberItem: {
        marginBottom: 8,
    },
    lastMemberItem: {
        marginBottom: 0,
    },
});
