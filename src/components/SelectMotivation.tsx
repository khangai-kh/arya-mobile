import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';
import { Box } from './common/Box';
import { View } from './common/View';

type SelectMotivationProps = {
    motivations: {
        id: number;
        title: string;
    }[];
    selectedMotivation: string | undefined;
    onSelect: (value: string) => void;
    onNextButton: () => void;
};
export const SelectMotivation = (props: SelectMotivationProps) => {
    const {
        motivations,
        selectedMotivation,
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
                            textAlign: 'center',
                            paddingHorizontal: 16
                        }}
                    >
                        What’s your motivation for joining Arya?
                    </Text>
                    <Text
                        variant='bodyMedium'
                        style={{
                            marginTop: 12,
                            textAlign: 'center'
                        }}
                    >
                        Let us know what you aim to achieve by being part of our community
                    </Text>
                    <View
                        style={{
                            marginTop: 24
                        }}
                    >
                        {motivations.map((motivation, index) => (
                            <TouchableOpacity
                                key={motivation.id}
                                style={{
                                    backgroundColor: selectedMotivation === motivation.title ? '#F5EF99' : '#fff',
                                    paddingHorizontal: 16,
                                    paddingVertical: 10,
                                    borderRadius: 24,
                                    marginBottom: motivations.length >= index ? 8 : 0
                                }}
                                onPress={() => onSelect(motivation.title)}
                            >
                                <Text variant='titleMedium'>
                                    {motivation.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <Box
                px={16}
                py={16}
            >
                <Button
                    mode="contained"
                    // onPress={() => onNextButton()}
                    //TODO: edit button after confirm what to do in action
                    disabled={selectedMotivation === undefined}
                >
                    Next
                </Button>
            </Box>
        </View >
    );
};