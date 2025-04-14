import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Avatar, Chip, IconButton, Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { Box } from './common/Box';
import { CurrencyModel, InvestmentStage, StartupType } from '../models/general/models';

type FundingProps = Omit<TouchableOpacityProps, 'activeOpacity'> & {
  startup_id: number;
  title?: string;
  image?: string;
  bio?: string;
  type?: StartupType;
  following?: boolean;
  status?: InvestmentStage;
  investmentStatus?: InvestmentStage;
  currency?: CurrencyModel;
  fundingRound?: string;
  valuation?: number;
  targetAmount?: number;
  amountCollected?: number;
  totalInvestment?: number;
  isLoading?: boolean;
  onFollowPress?: () => void;
};

export const Funding = (props: FundingProps) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const {
    style,
    title,
    image,
    bio,
    amountCollected,
    fundingRound,
    following,
    investmentStatus,
    status,
    targetAmount,
    totalInvestment,
    valuation,
    type,
    currency,
    isLoading = false,
    onFollowPress,
    ...otherProps
  } = props;

  const checkColor = (value: string) => {
    if (value === 'Funding Round') {
      return '#00A3E0';
    } else if (value === 'Academy') {
      return '#F99F1C';
    } else if (value === 'Closed') {
      return '#A09FA0';
    } else if (value === 'Graduate') {
      return '#4CB748';
    }else{
      return '#B61D8D';
    }
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

  // eslint-disable-next-line react/no-unstable-nested-components
  const FollowButton = () => {
      if (isLoading) {
        return (
          <TouchableOpacity
            style={styles.followButtonLoading}
            onPress={onFollowPress}
            disabled={isLoading}
          >
            <ActivityIndicator size={20} color={colors.primary} />
          </TouchableOpacity>
        );
      }

      return (
        <IconButton
          icon={
            following
              ? require('../assets/flat-icons/heart-outlined.png')
              : require('../assets/flat-icons/heart.png')
          }
          size={18}
          iconColor={following ? '#fff' : '#B61D8D'}
          style={{ backgroundColor: following ? colors.primary : colors.onPrimary, marginTop: 20 }}
          onPress={onFollowPress}
          disabled={isLoading}
        />
      );
    };

  return (
    <TouchableOpacity {...otherProps} style={[styles.course, style]}>
      <View style={styles.header}>
        <View style={styles.innerHeader}>
          <Avatar.Image
            size={55}
            source={image ? { uri: image } : require('../assets/Image-54.png')}
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
              <Chip
                key={type?.id}
                style={[styles.chip, { backgroundColor: checkColor(investmentStatus?.name || '') }]}
              >
                <Text variant="labelMedium" style={styles.chipText}>
                  {investmentStatus?.name}
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
        <FollowButton />
      </View>
      <View style={styles.infoContainer}>
        <View style={[styles.infoCell, styles.borderRight, styles.borderBottom]}>
          <Text style={styles.infoLabel}>Status:</Text>
          <Text style={styles.infoValue}>{status?.name}</Text>
        </View>
        <View style={[styles.infoCell, styles.borderBottom]}>
          <Text style={styles.infoLabel}>Investment status:</Text>
          <Text style={styles.infoValue}>{fundingRound}</Text>
        </View>
        <View style={[styles.infoCell, styles.borderRight, styles.borderBottom]}>
          <Text style={styles.infoLabel}>Total investment:</Text>
          <Text style={styles.infoValue}>{formatNumber(totalInvestment ?? 0, currency?.symbol ?? '$')}</Text>
        </View>
        <View style={[styles.infoCell, styles.borderBottom]}>
          <Text style={styles.infoLabel}>Valuation:</Text>
          <Text style={styles.infoValue}>{formatNumber(valuation ?? 0, currency?.symbol ?? '$')}</Text>
        </View>
        <View style={[styles.infoCell, styles.borderRight]}>
          <Text style={styles.infoLabel}>Target amount:</Text>
          <Text style={styles.infoValue}>{formatNumber(targetAmount ?? 0, currency?.symbol ?? '$')}</Text>
        </View>
        <View style={styles.infoCell}>
          <Text style={styles.infoLabel}>Amount collected:</Text>
          <Text style={styles.infoValue}>{formatNumber(amountCollected ?? 0, currency?.symbol ?? '$')}</Text>
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
    followButton: {
      marginTop: 10,
      backgroundColor: colors.primary,
    },
    followButtonActive: {
      marginTop: 10,
      backgroundColor: colors.onPrimary,
    },
    followButtonLoading: {
      backgroundColor: colors.surfaceVariant,
      width: 35,
      height: 35,
      borderRadius: 20,
      justifyContent: 'center',
      marginRight: 5,
      marginTop:5,
      alignItems: 'center',
    },
  });
