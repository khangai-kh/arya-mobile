import React from 'react';
import { TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { View } from './common/View';
import { Box } from './common/Box';

type SelectInterestProps = {
    interests: {
        id: number;
        type: string;
        title: string;
        icon: JSX.Element; // Add an icon for each interest
    }[];
    selectedInterests: {
        id: number;
        type: string;
        title: string;
    }[];
    onSelect: (value: string) => void;
    onNextButton: () => void;
};

export const SelectInterest = (props: SelectInterestProps) => {
    const {
        interests,
        selectedInterests,
        onSelect,
        onNextButton
    } = props;

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Text variant="titleLarge" style={styles.title}>
                        Select up to 5 Interests
                    </Text>
                    <Text variant="bodyMedium" style={styles.subtitle}>
                        Discover meaningful connections by selecting your interests
                    </Text>
                    <View style={styles.interestsContainer}>
                        {interests.map((interest) => {
                            const isSelected = selectedInterests.some(
                                (selected) => selected.id === interest.id
                            );

                            return (
                                <TouchableOpacity
                                    key={interest.id}
                                    style={[
                                        styles.interestBox,
                                        isSelected && styles.selectedBox,
                                    ]}
                                    onPress={() => onSelect(interest.title)}
                                >
                                    <View style={styles.iconContainer}>{interest.icon}</View>
                                    <Text style={styles.interestText}>{interest.title}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
            <Box px={16} py={16}>
                <Button
                    mode="contained"
                    onPress={onNextButton}
                    disabled={selectedInterests.length === 0 || selectedInterests.length > 5}
                >
                    Next
                </Button>
            </Box>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    title: {
        textAlign: 'center',
    },
    subtitle: {
        marginTop: 12,
        textAlign: 'center',
    },
    interestsContainer: {
        marginTop: 24,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    interestBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 24,
        backgroundColor: '#f5f5f5',
        marginBottom: 12,
        width: '48%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // For Android shad
    },
    selectedBox: {
        backgroundColor: '#F5EF99',
    },
    iconContainer: {
        marginRight: 8,
    },
    interestText: {
        fontSize: 16,
    },
});
