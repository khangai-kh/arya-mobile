import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Image, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, Button, Checkbox, Chip, Searchbar, Switch, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { MainStackParams } from '../models/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/configureStore';
import { API } from '../plugins/axios';
import { useQuery } from 'react-query';
import { UserModel } from '../models/users/User';
import { BatchModel, InterestModel, Sector } from '../models/general/models';
import { TURKEY_CITIES } from '../constants/constants';
import CustomCheckbox from '../components/forms/CustomCheckbox';

type FilterProps = StackScreenProps<MainStackParams, 'MemberFilter'>;

export const MemberFilter = ({ navigation }: FilterProps) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const { colors } = useTheme();
  const [value, setValue] = useState<string>('all');
  const [role, setRole] = useState<string>('All');
  const [isMentorship, setIsMentorship] = useState<boolean>(false);
  const [hasInvestment, setHasInvestment] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [profile, setProfile] = useState<UserModel | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState<string | undefined>(undefined);

  // Fetch profile
  const { isFetching: isFetchingProfile } = useQuery(
    ['profile', token],
    () => API.get('/api/user/my-all-infos'),
    {
      onSuccess: ({ data }) => setProfile(data),
      onError: (error) => console.error('Error fetching profile:', error),
    }
  );

  // Fetch batches for Profile type
  const { data: batches, isFetching: isFetchingBatches } = useQuery(
    ['batches'],
    () => API.get('/api/batches'),
    {
      select: (data) => data.data as BatchModel[],
    }
  );

  // Fetch interests
  const { data: interests, isFetching: isFetchingInterests } = useQuery(
    ['interests'],
    () => API.get('/api/interests'),
    {
      select: (data) => data.data as InterestModel[],
    }
  );

  // Fetch sectors
  const { data: sectors, isFetching: isFetchingSectors } = useQuery(
    ['sectors'],
    () => API.get('/api/sectors'),
    {
      select: (data) => data.data as Sector[],
    }
  );

  const filters = [
    { id: 0, title: 'Profile type' },
    { id: 1, title: 'Interest' },
    { id: 2, title: 'Sector' },
    { id: 3, title: 'Location' },
  ];

  const roles = [
    { id: 0, title: 'All' },
    { id: 1, title: 'Investors' },
    { id: 2, title: 'Entrepreneurs' },
  ];

    const getCurrentFilterItems = () => {
        let items: any[];
        switch (currentFilter) {
        case 'Profile type':
            items = batches?.map(batch => ({ id: batch.id, title: batch.name })) || [];
            break;
        case 'Interest':
            items = interests?.map(interest => ({ id: interest.id, title: interest.name })) || [];
            break;
        case 'Sector':
            items = sectors?.map(sector => ({ id: sector.id, title: sector.name })) || [];
            break;
        case 'Location':
            items = TURKEY_CITIES.map(city => ({ id: city.id, title: city.name }));
            break;
        default:
            items = [];
        }

        // Apply search filter if there's a query and it's not Profile type
        if (searchQuery && currentFilter !== 'Profile type') {
        return items.filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        }
        return items;
     };

  const toggleFilter = (filterType: string, filter: string) => {
    setSelectedFilters((prev) => {
      const current = prev[filterType] || [];
      return {
        ...prev,
        [filterType]: current.includes(filter)
          ? current.filter((item) => item !== filter)
          : [...current, filter],
      };
    });
  };

  const renderDrawerContent = () => {
    const currentFilterItems = getCurrentFilterItems();

    return (
      <SafeAreaView edges={['bottom']} style={styles.drawerContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Appbar.Header style={styles.transparentBackground}>
            <Appbar.Action
              icon={require('../assets/flat-icons/angle-small-left.png')}
              color="#414042"
              style={[styles.actionButton, { backgroundColor: colors.onPrimary }]}
              onPress={() => setOpen(false)}
            />
            <Appbar.Content title={<Text variant='titleMedium'>{currentFilter}</Text>} />
          </Appbar.Header>
          {currentFilter !== 'Profile type' && (
            <View style={styles.searchContainer}>
              <Searchbar
                icon={require('../assets/flat-icons/search.png')}
                clearIcon={require('../assets/flat-icons/cross-circle.png')}
                placeholder="Search Arya"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchBar}
              />
            </View>
          )}
          <View style={styles.filterItemsContainer}>
            {currentFilterItems.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.filterItem,
                  index === 0 && styles.filterItemTopRadius,
                  index === currentFilterItems.length - 1 && styles.filterItemBottomRadius
                ]}
              >
                <View style={[
                  styles.filterItemContent,
                  index !== currentFilterItems.length - 1 && styles.filterItemBorder
                ]}>
                    <CustomCheckbox
                        checked={selectedFilters[currentFilter || '']?.includes(item.title) || false}
                        onToggle={() => currentFilter && toggleFilter(currentFilter, item.title)}
                      />
                  <Text variant="titleMedium" style={styles.termsText}>{item.title}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <Box px={16} py={16} mb={32}>
          <Button mode="contained" onPress={() => setOpen(false)}>
            Apply
          </Button>
        </Box>
      </SafeAreaView>
    );
  };

  const isDataLoading = isFetchingProfile || isFetchingBatches || isFetchingInterests || isFetchingSectors;

  if (isDataLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      swipeEnabled={false}
      drawerPosition="right"
      drawerType="slide"
      drawerStyle={styles.drawer}
      renderDrawerContent={renderDrawerContent}
    >
      <SafeAreaView edges={['bottom']} style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Appbar.Header style={styles.transparentBackground}>
            <Appbar.Action
              icon={require('../assets/flat-icons/angle-small-left.png')}
              color="#414042"
              style={[styles.actionButton, { backgroundColor: colors.onPrimary }]}
              onPress={() => navigation.navigate('BottomTab')}
            />
            <Appbar.Content title={<Text variant='titleMedium'>Filter</Text>} />
            <Text variant='titleSmall' style={styles.resetText} onPress={() => setSelectedFilters({})}>
              Reset
            </Text>
          </Appbar.Header>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <Button
                mode={value === 'all' ? 'contained' : 'text'}
                onPress={() => setValue('all')}
              >
                All members (500)
              </Button>
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                mode={value !== 'all' ? 'contained' : 'text'}
                onPress={() => setValue('connections')}
              >
                Connections ({profile?.following.length || 0})
              </Button>
            </View>
          </View>
          <View style={styles.filtersContainer}>
            <View style={styles.roleContainer}>
              <Text variant='titleMedium' style={styles.roleTitle}>
                Role
              </Text>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                {roles.map((item, index) => (
                  <Chip
                    key={item.id}
                    style={[
                      styles.chip,
                      { 
                        backgroundColor: role === item.title ? '#F5EF99' : '#F2F2F2',
                        marginRight: index === roles.length - 1 ? 0 : 4 
                      }
                    ]}
                    onPress={() => setRole(item.title)}
                  >
                    <View style={styles.chipContent}>
                      {role === item.title && (
                        <Image
                          source={require('../assets/flat-icons/check.png')}
                          style={styles.checkIcon}
                        />
                      )}
                      <Text variant='labelMedium'>{item.title}</Text>
                    </View>
                  </Chip>
                ))}
              </ScrollView>
            </View>
            {filters.map((filter, index) => (
              <TouchableOpacity
                key={filter.id}
                style={[styles.filterOption, { marginTop: index === 0 ? 8 : 8 }]}
                onPress={() => {
                  setCurrentFilter(filter.title);
                  setOpen(true);
                }}
              >
                <Text variant='titleMedium' style={styles.filterText}>
                  {filter.title}
                </Text>
                <Image
                  source={require('../assets/flat-icons/angle-small-right.png')}
                  style={styles.arrowIcon}
                />
              </TouchableOpacity>
            ))}
            <View style={styles.switchContainer}>
              <Text variant='titleMedium' style={styles.filterText}>
                MentorShip
              </Text>
              <Switch
                value={isMentorship}
                onValueChange={() => setIsMentorship(!isMentorship)}
                color='#4CB748'
              />
            </View>
            <View style={styles.switchContainer}>
              <Text variant='titleMedium' style={styles.filterText}>
                Have investment
              </Text>
              <Switch
                value={hasInvestment}
                onValueChange={() => setHasInvestment(!hasInvestment)}
                color='#4CB748'
              />
            </View>
          </View>
        </ScrollView>
        <Box px={16} py={16}>
          <Button mode="contained" onPress={() => {}}>
            Apply
          </Button>
        </Box>
      </SafeAreaView>
    </Drawer>
  );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    termsText: { 
        marginLeft: 8,
        fontSize: 14,
    },
    container: { flex: 1 },
    drawerContainer: { flex: 1, backgroundColor: '#F2F2F2' },
    drawer: { width: '100%' },
    transparentBackground: { backgroundColor: 'transparent' },
    actionButton: { backgroundColor: '#fff' },
    resetText: { fontWeight: '500', marginRight: 16 },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 32,
        marginTop: 24,
        marginHorizontal: 16
    },
    buttonWrapper: { flex: 1 },
    filtersContainer: { marginTop: 16, paddingHorizontal: 16 },
    roleContainer: { backgroundColor: '#fff', padding: 16, borderRadius: 16 },
    roleTitle: { marginBottom: 12 },
    chip: { padding: 6, borderRadius: 32 },
    chipContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkIcon: {
        width: 14,
        height: 14,
        tintColor: '#414042',
        marginRight: 4
    },
    filterOption: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    filterText: { color: '#414042' },
    arrowIcon: { width: 20, height: 20, tintColor: '#414042' },
    switchContainer: {
        marginTop: 8,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchContainer: { margin: 16 },
    searchBar: { backgroundColor: '#fff' },
    filterItemsContainer: { marginTop: 24 },
    filterItem: { backgroundColor: '#fff', paddingHorizontal: 16 },
    filterItemTopRadius: { borderTopLeftRadius: 16, borderTopRightRadius: 16 },
    filterItemBottomRadius: { borderBottomLeftRadius: 16, borderBottomRightRadius: 16 },
    filterItemContent: {
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    filterItemBorder: { borderBottomColor: '#F2F2F2', borderBottomWidth: 1 }
});