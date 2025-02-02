import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';
import { Box } from './common/Box';
import { View } from './common/View';

type SelectInterestProps = {
    interests: {
        id: number;
        type: string;
        title: string;
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
        <View
            style={{
                flex: 1
            }}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        marginTop: 24,
                        paddingHorizontal: 16
                    }}
                >
                    <Text
                        variant='titleLarge'
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        Select up to 5 Interests
                    </Text>
                    <Text
                        variant='bodyMedium'
                        style={{
                            marginTop: 12,
                            textAlign: 'center'
                        }}
                    >
                        Discover meaningful connections by selecting your interests
                    </Text>
                    <View
                        style={{
                            marginTop: 24
                        }}
                    >
                        {interests.map((interest, index) => (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    flex: 1,
                                    // backgroundColor: selectedInterests === interest.title ? '#F5EF99' : '#fff',
                                    padding: 16,
                                    borderRadius: 24,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: interests.length >= index ? 8 : 0
                                }}
                                onPress={() => onSelect(interest.title)}
                            >
                                <Text variant='titleMedium'>
                                    {interest.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView >
            <Box
                px={16}
                py={16}
            >
                <Button
                    mode="contained"
                    onPress={() => onNextButton()}
                // disabled={selectedInterests.length < 5}
                >
                    Next
                </Button>
            </Box>
        </View >
    );
};