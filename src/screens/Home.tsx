import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, IconButton, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParams } from '../navigation/App';
import { BottomTabStackParams } from '../navigation/BottomTab';

type HomeProps = CompositeScreenProps<BottomTabScreenProps<BottomTabStackParams, 'Home'>, StackScreenProps<AppStackParams>>;

export const Home = (props: HomeProps) => {

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
            edges={[
                'bottom'
            ]}
        >
            <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#B21D8D' }}>aryaUP</Text>
                        <IconButton
                            icon="magnify"
                            size={30}
                            onPress={() => { }}
                            style={{ marginRight: 10 }}
                        />
                        <IconButton
                            icon="bell"
                            size={30}
                            onPress={() => { }}
                            style={{ marginRight: 10 }}
                        />
                        <IconButton
                            icon="information"
                            size={30}
                            onPress={() => { }}
                        />
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>Announcements</Text>
                        <Text style={{ color: '#B21D8D' }}>See all</Text>
                    </View>

                    <Card style={{ marginTop: 10, borderRadius: 10 }}>
                        <Card.Cover
                            // source={{ uri: '' }}
                            style={{ borderRadius: 10 }}
                        />
                        <Card.Content>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Arya Retreat'24</Text>
                            <Text style={{ fontSize: 14, color: '#757575' }}>Freedom: Manage Your Money, Discover Your Power</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={{ fontSize: 12, color: '#757575' }}>Tasigo Hotel Eskişehir</Text>
                                <Text style={{ fontSize: 12, color: '#B21D8D', marginLeft: 10 }}>Sep 27-29</Text>
                            </View>
                        </Card.Content>
                    </Card>

                    <View style={{ marginTop: 30 }}>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>Financial Inspirations</Text>
                        <Text style={{ color: '#B21D8D' }}>See all</Text>
                    </View>

                    <Card style={{ marginTop: 10, borderRadius: 10 }}>
                        <Card.Cover
                            // source={{ uri: '' }}
                            style={{ borderRadius: 10 }}
                        />
                        <Card.Content>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Sustainability and Social Innovation</Text>
                            <Text style={{ fontSize: 14, color: '#757575' }}>Who is Really Responsible?</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={{ fontSize: 12, color: '#757575' }}>Hüsna Nur Söntürk</Text>
                                <Text style={{ fontSize: 12, color: '#B21D8D', marginLeft: 10 }}>24.06.2024</Text>
                            </View>
                        </Card.Content>
                    </Card>

                    <Card style={{ marginTop: 10, borderRadius: 10 }}>
                        <Card.Cover
                            // source={{ uri: '' }}
                            style={{ borderRadius: 10 }}
                        />
                        <Card.Content>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>The Most Important Route of Your Journey</Text>
                            <Text style={{ fontSize: 14, color: '#757575' }}>Lifelong Learning</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={{ fontSize: 12, color: '#757575' }}>Beyza Bilgi</Text>
                                <Text style={{ fontSize: 12, color: '#B21D8D', marginLeft: 10 }}>04.06.2024</Text>
                            </View>
                        </Card.Content>
                    </Card>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};