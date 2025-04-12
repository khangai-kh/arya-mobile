import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Avatar, Chip, IconButton, Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { Box } from './common/Box';
import { InvestmentStage, StartupType } from '../models/general/models';

type FundingProps = Omit<TouchableOpacityProps, 'activeOpacity'> & {
  startup_id: number;
  title?: string;
  image?: string;
  bio?: string;
  type?: StartupType;
  following?: boolean;
  status?: InvestmentStage;
  investmentStatus?: string;
  valuation?: string;
  targetAmount?: string;
  amountCollected?: string;
  totalInvestment?: string;
};

export const Funding = (props: FundingProps) => {
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const {
    style,
    title,
    image,
    bio,
    amountCollected,
    following,
    investmentStatus,
    status,
    targetAmount,
    totalInvestment,
    type,
    ...otherProps
  } = props;

  const checkColor = (value: string) => {
    if (value === 'Funding round') {
      return '#00AEEF';
    } else if (value === 'Academy') {
      return '#F99F1C';
    } else if (value === 'Closed deals') {
      return '#A09FA0';
    } else if (value === 'Graduate') {
      return '#4CB748';
    }else{
      return '#B61D8D';
    }
  };

  return (
    <TouchableOpacity {...otherProps} style={[styles.course, style]}>
      <View style={styles.header}>
        <View style={styles.innerHeader}>
          <Avatar.Image
            size={54}
            source={require('../assets/Image-54.png')}
            style={styles.avatar}
          />
          <Box style={styles.box}>
            <View style={styles.chipContainer}>
              <Chip
                key={type?.id}
                style={[styles.chip, { backgroundColor: checkColor(type?.name || '') }]}
              >
                <Text variant="labelMedium" style={styles.chipText}>
                  {type?.name}
                </Text>
              </Chip>
            </View>
            <Text variant="titleMedium" numberOfLines={1} ellipsizeMode="tail">
              {title}
            </Text>
            <Text
              variant="bodyMedium"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.bioText}
            >
              {bio}
            </Text>
          </Box>
        </View>
        <IconButton
          icon={
            following
              ? require('../assets/flat-icons/heart-outlined.png')
              : require('../assets/flat-icons/heart.png')
          }
          size={18}
          iconColor={following ? '#fff' : '#B61D8D'}
          style={{ backgroundColor: following ? colors.primary : colors.onPrimary }}
          onPress={() => {}}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={[styles.infoCell, styles.borderRight, styles.borderBottom]}>
          <Text style={styles.infoLabel}>Status:</Text>
          <Text style={styles.infoValue}>Prototype ready</Text>
        </View>
        <View style={[styles.infoCell, styles.borderBottom]}>
          <Text style={styles.infoLabel}>Investment status:</Text>
          <Text style={styles.infoValue}>Pre-seed</Text>
        </View>
        <View style={[styles.infoCell, styles.borderRight, styles.borderBottom]}>
          <Text style={styles.infoLabel}>Total investment:</Text>
          <Text style={styles.infoValue}>$400K</Text>
        </View>
        <View style={[styles.infoCell, styles.borderBottom]}>
          <Text style={styles.infoLabel}>Valuation:</Text>
          <Text style={styles.infoValue}>$3M</Text>
        </View>
        <View style={[styles.infoCell, styles.borderRight]}>
          <Text style={styles.infoLabel}>Target amount:</Text>
          <Text style={styles.infoValue}>$500K</Text>
        </View>
        <View style={styles.infoCell}>
          <Text style={styles.infoLabel}>Amount collected:</Text>
          <Text style={styles.infoValue}>$350K</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (colors: MD3Colors) =>
  StyleSheet.create({
    course: {
      padding: 12,
      position: 'relative',
      borderRadius: 24,
      overflow: 'hidden',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.outlineVariant,
      backgroundColor: '#fff',
    },
    header: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    innerHeader: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginRight: 4,
    },
    avatar: {
      backgroundColor: '#f2f4f7',
      marginRight: 4,
    },
    box: {
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
    bioText: {
      flex: 1,
      marginTop: 4,
      marginBottom: 8,
    },
    infoContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      backgroundColor: '#fff',
    },
    infoCell: {
      width: '50%',
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    borderBottom: {
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    borderRight: {
      borderRightWidth: 1,
      borderRightColor: '#e0e0e0',
    },
    infoLabel: {
      fontSize: 12,
      color: '#6e6e6e',
    },
    infoValue: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#000',
    },
  });
