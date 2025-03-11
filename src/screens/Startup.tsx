import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Appbar, Avatar, Button, Chip, IconButton, MD3Theme, Modal, Portal, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { Founder } from '../components/Founder';
import { MainStackParams } from '../models/navigation';

type StartupProps = StackScreenProps<MainStackParams, 'Startup'>;

export const Startup = (props: StartupProps) => {
    const { navigation } = props;
     const { colors } = useTheme();
      const dynamicStyles = createDynamicStyles(colors);

    const startup = {
        image: '',
        title: 'Foodsy',
        bio: 'Quick, Fresh, and Local',
        body: 'Foodsy is a revolutionary platform that connects you with fresh, locally-sourced meals delivered straight to your doorstep...',
        types: [
            { id: 0, value: 'Funding round' },
            { id: 1, value: 'Graduate' }
        ],
        data: [
            { label: 'Status', value: 'Prototype ready' },
            { label: 'Investment status', value: 'Pre-seed' },
            { label: 'Total investment', value: '$400K' },
            { label: 'Valuation', value: '$3M' },
            { label: 'Target amount', value: '$500K' },
            { label: 'Amount collected', value: '$350K' },
        ]
    };

    const [founders] = useState([
        {
            id: 0, image: '', name: 'Elif Yılmaz', status: 'CEO at Foodsy',
            role: 'Entrepreneur', following: false
        },
        {
            id: 1, image: '', name: 'Ayşe Demir', status: 'Co-Founder at Foodsy',
            role: 'Entrepreneur', following: false
        }
    ]);

    const [visible, setVisible] = useState(false);

    const checkColor = (value: string) => {
        const colorsMap: { [key: string]: string } = {
            'Funding round': '#00AEEF',
            'Academy': '#F99F1C',
            'Closed deals': '#A09FA0',
            'Graduate': '#4CB748'
        };
        return colorsMap[value] || undefined;
    };

    return (
        <SafeAreaView style={dynamicStyles.safeArea} edges={['top']}>

        <Appbar.Header style={dynamicStyles.appbarHeader}>
            <Appbar.Action
                icon={require('../assets/flat-icons/angle-small-left.png')}
                color="#414042"
                size={20}
                style={dynamicStyles.appbarActionRight}
                onPress={() => {}}
            />
            <Appbar.Content
                title={
                    <View style={dynamicStyles.titleContainer}>
                    <Text variant="titleMedium" style={dynamicStyles.interestText}>
                        My startup
                    </Text>
                    </View>
                }
            />
            <Appbar.Action
                icon={require('../assets/flat-icons/heart-outlined.png')}
                color="#414042"
                size={20}
                style={dynamicStyles.appbarActionRight}
                onPress={() => {}}
            />
            <Appbar.Action
                icon={require('../assets/flat-icons/edit.png')}
                color="#414042"
                size={20}
                style={dynamicStyles.appbarActionRight}
                onPress={() => {}}
            />
      </Appbar.Header>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={dynamicStyles.cardContainer}>
                    <View style={dynamicStyles.header}>
                        <Avatar.Image
                            size={80}
                            source={require('../assets/dummy-product-4.jpeg')}
                            style={dynamicStyles.avatar}
                        />
                        <Box style={dynamicStyles.headerContent}>
                            <View style={dynamicStyles.chipContainer}>
                                {startup.types?.map((type, index) => (
                                    <Chip
                                        key={type.id}
                                        style={[dynamicStyles.chip, { backgroundColor: checkColor(type.value) }]}
                                    >
                                        <Text variant="labelMedium" style={dynamicStyles.chipText}>
                                            {type.value}
                                        </Text>
                                    </Chip>
                                ))}
                            </View>
                            <Text variant="titleMedium" style={dynamicStyles.title}>
                                {startup.title}
                            </Text>
                            <Text variant="bodyMedium" style={dynamicStyles.bio}>
                                {startup.bio}
                            </Text>
                        </Box>
                    </View>
                    <View style={dynamicStyles.body}>
                        <Text numberOfLines={4}>{startup.body}</Text>
                    </View>
                    <View style={dynamicStyles.dataContainer}>
                        {startup.data.map((item, index) => (
                            <View
                                key={index}
                                style={[
                                    dynamicStyles.dataItem,
                                    index % 2 === 0 && dynamicStyles.dataItemBorderRight,
                                    index < startup.data.length - 2 && dynamicStyles.dataItemBorderBottom
                                ]}
                            >
                                <Text variant="bodySmall" style={dynamicStyles.dataLabel}>
                                    {item.label}:
                                </Text>
                                <Text style={dynamicStyles.dataValue}>{item.value}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Funding Round Section */}
                {/* <View style={dynamicStyles.section}>
                    <Text variant="titleMedium">Funding round</Text>
                    <View style={dynamicStyles.card}>
                        <View>
                            <Text variant="titleSmall" style={dynamicStyles.sectionTitle}>Funding deadline</Text>
                            <Text>15.01.2025</Text>
                        </View>
                        <Divider style={dynamicStyles.divider} />
                        <View>
                            <Text variant="titleSmall" style={dynamicStyles.sectionTitle}>Use of funds</Text>
                            <Text>40% for product development and improvements...</Text>
                        </View>
                        <Divider style={dynamicStyles.divider} />
                        <View>
                            <Text variant="titleSmall" style={dynamicStyles.sectionTitle}>Investment terms</Text>
                            <Text>Equity offered: 15%...</Text>
                        </View>
                        <Divider style={dynamicStyles.divider} />
                        <View>
                            <Text variant="titleSmall" style={dynamicStyles.sectionTitle}>Pitch deck</Text>
                            <View style={dynamicStyles.pitchDeck}>
                                <Image
                                    source={require('../assets/flat-icons/download.png')}
                                    style={dynamicStyles.downloadIcon}
                                />
                                <Text>Foodsy Pitch Deck.pdf</Text>
                            </View>
                        </View>
                    </View>
                </View> */}

                {/* Founders Section */}
                <View style={dynamicStyles.section}>
                    <Text variant="titleMedium">Founders</Text>
                    <View style={dynamicStyles.foundersContainer}>
                        {founders.map((founder, index) => (
                            <Founder
                                key={founder.id}
                                name={founder.name}
                                image={founder.image}
                                founderRole={founder.role}
                                status={founder.status}
                                following={founder.following}
                                style={index === founders.length - 1 ? null : dynamicStyles.founderItem}
                                onPress={() => navigation.navigate('Member', { id: founder.name })}
                            />
                        ))}
                    </View>
                </View>

                {/* Products Section */}
                <View style={dynamicStyles.section}>
                    <Text variant="titleMedium">Products</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={dynamicStyles.productsScroll}
                    >
                        {[1, 2, 3].map((num) => (
                            <Image
                                key={num}
                                resizeMode="cover"
                                source={require(`../assets/dummy-product-1.jpeg`)}
                                style={dynamicStyles.productImage}
                            />
                        ))}
                    </ScrollView>
                </View>
                {/* Founders Section */}
                <View style={dynamicStyles.section}>
                    <Text variant="titleMedium">Investors</Text>
                    <View style={dynamicStyles.foundersContainer}>
                        {founders.map((founder, index) => (
                            <Founder
                                key={founder.id}
                                name={founder.name}
                                image={founder.image}
                                founderRole={founder.role}
                                status={founder.status}
                                following={founder.following}
                                style={index === founders.length - 1 ? null : dynamicStyles.founderItem}
                                onPress={() => navigation.navigate('Member', { id: founder.name })}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>

            <Box px={16} py={16}>
                <Button mode="contained" onPress={() => setVisible(true)}>
                    Apply for round
                </Button>
            </Box>

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
                        <TouchableOpacity style={dynamicStyles.modalButton}>
                            <Text variant="titleMedium" style={dynamicStyles.modalButtonText}>
                                Wait for updates
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={dynamicStyles.modalButtonPrimary}>
                            <Text variant="titleMedium" style={dynamicStyles.modalButtonPrimaryText}>
                                Get in touch
                            </Text>
                        </TouchableOpacity>
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
        backgroundColor: colors.onPrimary,
        marginRight: 5,
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 20,
    },
    titleText: {
        fontWeight: 'bold',
        paddingLeft: 50,
    },
    interestText: {
        fontWeight: 'bold',
        paddingLeft: 0,
        marginLeft: 0,
    },
    headerContent: { flex: 1 },
    chipContainer: { flexDirection: 'row' },
    chip: {
        marginRight: 4,
        alignSelf: 'flex-start',
    },
    chipText: { color: '#fff' },
    title: { marginVertical: 4 },
    bio: { flex: 1 },
    body: { marginVertical: 12 },
    dataContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        backgroundColor: '#fff',
    },
    dataItem: {
        width: '50%',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    dataItemBorderRight: {
        borderRightWidth: 1,
        borderRightColor: '#e0e0e0',
    },
    dataItemBorderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    dataLabel: { color: '#A09FA0' },
    dataValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#414042',
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
    sectionTitle: { marginBottom: 2 },
    divider: { marginVertical: 8 },
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
    foundersContainer: { marginTop: 8 },
    founderItem: { marginBottom: 8 },
    productsScroll: { marginTop: 8 },
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
    modalClose: { alignSelf: 'flex-end' },
    modalIcon: {
        alignSelf: 'center',
        width: 56,
        height: 56,
        tintColor: '#4CB748',
        marginBottom: 24,
    },
    modalTitle: { textAlign: 'center' },
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
    },
    modalButtonText: { textAlign: 'center' },
    modalButtonPrimary: {
        paddingVertical: 12.5,
        paddingHorizontal: 28.5,
        backgroundColor: '#4CB748',
        borderRadius: 32,
    },
    modalButtonPrimaryText: { color: '#FFFFFF' },
});