import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  Image,
} from 'react-native';
import {
  Appbar,
  Text,
  Icon,
  useTheme,
  MD3Theme,
  Button,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainStackParams } from '../models/navigation';
import { StackScreenProps } from '@react-navigation/stack';

type MemberDiscoveryProps = StackScreenProps<
  MainStackParams,
  'MemberDiscovery'
>;

export const MemberDiscovery = ({ navigation }: MemberDiscoveryProps) => {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const styles = makeStyles(colors, width);

  // Determine icon + tint for each role
  const getRoleProps = (role: string) => {
    let iconSource: any;
    let tintColor: string;
    switch (role) {
      case 'Investor':
        iconSource = require('../assets/flat-icons/diamond.png');
        tintColor = '#00AEEF';
        break;
      case 'Premium':
        iconSource = require('../assets/flat-icons/crown.png');
        tintColor = '#B61D8D';
        break;
      case 'Entrepreneur':
        iconSource = require('../assets/flat-icons/rocket.png');
        tintColor = '#F99F1C';
        break;
      default:
        iconSource = require('../assets/flat-icons/diamond.png');
        tintColor = colors.primary;
    }
    return { iconSource, tintColor };
  };

  // Example member data; replace with API-driven data as needed
  const member = {
    photo: { uri: 'https://example.com/ozlem-kurt.jpg' },
    role: 'Investor',
    name: 'Özlem Kurt',
    position: 'Managing Partner at Kurt & Partners',
    yearsMember: 4,
    interests: ['Competition Law', 'Technology', 'Data', 'GRC', 'Anti‑Trust'],
  };

  const { iconSource, tintColor } = getRoleProps(member.role);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.Content
            title={
                <View style={styles.titleContainer}>
                    <Text variant="titleMedium" style={styles.titleText}>
                        Member Discovery
                    </Text>
                </View>
            }
        />
    </Appbar.Header>

      <View style={styles.cardWrapper}>
        <ImageBackground
          source={require('../assets/portrait.png')}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.badgeContainer}>
            <View
              style={[styles.badge, { backgroundColor: tintColor }]}
            >
              <Image
                source={iconSource}
                style={styles.roleIcon}
                resizeMode="contain"
              />
              <Text style={styles.badgeText}>{member.role}</Text>
            </View>
          </View>

          <View style={styles.overlay}>
            <Text variant="headlineSmall" style={styles.nameText}>
              {member.name}
            </Text>

            <View style={styles.infoRow}>
              <Icon
                source={require('../assets/flat-icons/briefcase.png')}
                size={16}
                color="#E0E0E0"
              />
              <Text variant="bodyMedium" style={styles.infoText}>
                {member.position}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon
                source={require('../assets/flat-icons/badge.png')}
                size={16}
                color="#E0E0E0"
              />
              <Text variant="bodyMedium" style={styles.infoText}>
                {member.yearsMember} Years Member
              </Text>
            </View>

            <View style={styles.interestsRow}>
              {member.interests.map((tag) => (
                <Text key={tag} style={styles.infoText}>
                  #{tag}
                </Text>
              ))}
            </View>

            <View style={styles.actionsRow}>
              <Button
                mode="contained"
                style={[styles.actionButton, { width: 40, height: 60, borderRadius: 40, justifyContent: 'center', alignItems: 'center' }]}
                onPress={() => {}}
              >
                <Image
                  source={require('../assets/flat-icons/x.png')}
                  style={{ width: 24, height: 24 }}
                />
              </Button>
              <Button
                style={[styles.actionButton, styles.actionSecondary, { width: 40, height: 60, justifyContent: 'center', alignItems: 'center' }]}
                onPress={() => {}}
              >
                <Image
                  source={require('../assets/flat-icons/comment-alt-outlined.png')}
                  style={{ width: 24, height: 24, tintColor:colors.primary }}
                   resizeMode="contain"
                />
              </Button>
              <Button
                style={[styles.actionButton, styles.actionPrimary, { width: 40, height: 60, justifyContent: 'center', alignItems: 'center' }]}
                onPress={() => {}}
              >
                <Image
                  source={require('../assets/flat-icons/info.png')}
                  style={{ width: 24, height: 24, tintColor:'white' }}
                  resizeMode="contain"
                />
              </Button>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const makeStyles = (colors: MD3Theme['colors'], width: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    header: {
      backgroundColor: 'transparent',
      elevation: 0,
    },
    cardWrapper: {
      alignItems: 'center',
      height: '80%',
      marginTop: 16,
    },
    imageBackground: {
      width: width - 32,
      height: '92%',
      overflow: 'hidden',
      borderRadius: 16,
    },
    imageStyle: {
      borderRadius: 16,
      height: '100%',
    },
    badgeContainer: {
      position: 'absolute',
      top: 12,
      left: 12,
    },
    badge: {
      borderRadius: 12,
      width:100,
      flex:1,
      flexDirection:'row',
      alignContent:'center',
     paddingVertical:2,
     paddingHorizontal:6 
    },
    badgeContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
    },
    badgeText: {
      color: '#fff',
      fontSize: 11,
      fontWeight: 'bold',
    },
    roleIcon: {
      width: 14,
      height: 14,
      marginRight: 6,
      marginLeft: 6,
      marginTop:2,
      tintColor:'white',
    },
    overlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      padding: 16,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    },
    nameText: {
      color: '#fff',
      fontWeight: 'bold',
      marginBottom: 8,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoText: {
      color: '#E0E0E0',
      marginLeft: 10,
      fontSize: 11,
    },
    interestsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: 4,
    },
    actionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 4,
    },
    actionButton: {
      backgroundColor: '#fff',
      borderRadius: 40,
    },
    actionSecondary: {
      backgroundColor: '#F3EE9B',
    },
    actionPrimary: {
      backgroundColor: colors.primary,
    },
    appbarHeader: {
      width: '100%',
      backgroundColor: 'transparent',
      alignContent: 'flex-start',
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    titleContainer: {
      alignItems: 'center',
    },
    titleText: {
        fontWeight: 'bold',
        marginLeft: -20,
    },
  });
