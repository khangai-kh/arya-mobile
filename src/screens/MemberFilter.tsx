import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, Button, Chip, Searchbar, Switch, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { MainStackParams } from '../models/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/configureStore';
import { API } from '../plugins/axios';
import { useQuery } from 'react-query';
import { UserModel } from '../models/users/User';
import { BatchModel, InterestModel, Sector } from '../models/general/models';
import { TURKEY_CITIES } from '../constants/constants';
import CustomCheckbox from '../components/forms/CustomCheckbox';
import {
  setRoleIds,
  setBatchIds,
  setInterestIds,
  setSectorIds,
  setCities,
  setInMyFavorited,
  setInMentor,
  setHaveInvestestment,
  setKeyword,
  setPage,
  setPageSize,
  resetFilter,
} from '../redux/filter/reducer';

type FilterProps = StackScreenProps<MainStackParams, 'MemberFilter'>;

export const MemberFilter = ({ navigation }: FilterProps) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const filterState = useSelector((state: RootState) => state.filter);
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

  useEffect(() => {
    // Initialize basic states
    setValue(filterState.in_my_favorited ? 'connections' : 'all');
    const roleMapping: Record<number, string> = {
      0: 'All',
      1: 'Investors',
      2: 'Entrepreneurs',
    };
    setRole(roleMapping[filterState.roleIds[0]] || 'All');
    setIsMentorship(filterState.in_mentor);
    setHasInvestment(filterState.have_investestment);
    setSearchQuery(filterState.keyword);

    // Initialize selectedFilters based on Redux state
    const newSelectedFilters: Record<string, string[]> = {};

    // Profile type (batches)
    if (batches && filterState.batchIds && filterState.batchIds.length > 0 && filterState.batchIds[0] !== 0) {
      newSelectedFilters['Profile type'] = filterState.batchIds
        .map(id => batches.find(batch => batch.id === id)?.name)
        .filter((name): name is string => !!name);
    }

    // Interests
    if (interests && filterState.interestIds && filterState.interestIds.length > 0 && filterState.interestIds[0] !== 0) {
      newSelectedFilters['Interest'] = filterState.interestIds
        .map(id => interests.find(interest => interest.id === id)?.name)
        .filter((name): name is string => !!name);
    }

    // Sectors
    if (sectors && filterState.sectorIds && filterState.sectorIds.length > 0 && filterState.sectorIds[0] !== 0) {
      newSelectedFilters['Sector'] = filterState.sectorIds
        .map(id => sectors.find(sector => sector.id === id)?.name)
        .filter((name): name is string => !!name);
    }

    // Locations (cities)
    if (filterState.cities && filterState.cities.length > 0) {
      newSelectedFilters['Location'] = filterState.cities
        .map(cityId => TURKEY_CITIES.find(city => city.id === cityId)?.name)
        .filter((name): name is string => !!name);
    }

    setSelectedFilters(newSelectedFilters);
  }, [filterState, batches, interests, sectors]);

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
            <Appbar.Content title={<Text variant="titleMedium">{currentFilter}</Text>} />
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
                  index === currentFilterItems.length - 1 && styles.filterItemBottomRadius,
                ]}
              >
                <View
                  style={[
                    styles.filterItemContent,
                    index !== currentFilterItems.length - 1 && styles.filterItemBorder,
                  ]}
                >
                  <CustomCheckbox
                    checked={selectedFilters[currentFilter || '']?.includes(item.title) || false}
                    onToggle={() => currentFilter && toggleFilter(currentFilter, item.title)}
                  />
                  <Text variant="titleMedium" style={styles.termsText}>
                    {item.title}
                  </Text>
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

  const isDataLoading =
    isFetchingProfile || isFetchingBatches || isFetchingInterests || isFetchingSectors;

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
              onPress={() =>
                navigation.navigate('BottomTab', { index: 1, filterModel: null })
              }
            />
            <Appbar.Content title={<Text variant="titleMedium">Filter</Text>} />
            <Text
              variant="titleSmall"
              style={styles.resetText}
              onPress={() => {
                // Reset all local states and dispatch Redux reset action.
                setValue('all');
                setRole('All');
                setIsMentorship(false);
                setHasInvestment(false);
                setSelectedFilters({});
                setSearchQuery('');
                setCurrentFilter(undefined);
                dispatch(resetFilter());
              }}
            >
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
              <Text variant="titleMedium" style={styles.roleTitle}>
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
                        marginRight: index === roles.length - 1 ? 0 : 4,
                      },
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
                      <Text variant="labelMedium">{item.title}</Text>
                    </View>
                  </Chip>
                ))}
              </ScrollView>
            </View>
            {filters.map((filter, index) => {
              const selectedCount = selectedFilters[filter.title]?.length ?? 0;
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.filterOption, { marginTop: 8 }]}
                  onPress={() => {
                    setCurrentFilter(filter.title);
                    setSearchQuery('');
                    setOpen(true);
                  }}
                >
                  <Text variant="titleMedium" style={styles.filterText}>
                    {filter.title}
                    {selectedCount > 0 && (
                      <Text style={{ color: '#C71585' }}> ({selectedCount})</Text>
                    )}
                  </Text>
                  <Image
                    source={require('../assets/flat-icons/angle-small-right.png')}
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
              );
            })}
            <View style={styles.switchContainer}>
              <Text variant="titleMedium" style={styles.filterText}>
                MentorShip
              </Text>
              <Switch
                value={isMentorship}
                onValueChange={() => setIsMentorship(!isMentorship)}
                color="#4CB748"
              />
            </View>
            <View style={styles.switchContainer}>
              <Text variant="titleMedium" style={styles.filterText}>
                Have investment
              </Text>
              <Switch
                value={hasInvestment}
                onValueChange={() => setHasInvestment(!hasInvestment)}
                color="#4CB748"
              />
            </View>
          </View>
        </ScrollView>
        <Box px={16} py={16}>
          <Button
            mode="contained"
            onPress={() => {
              const selectedRoleId = roles.find(r => r.title === role)?.id ?? 0;
              const batchIds =
                selectedFilters['Profile type']?.map(title => {
                  const batch = batches?.find(b => b.name === title);
                  return batch ? batch.id : 0;
                }) || [0];
              const interestIds =
                selectedFilters['Interest']?.map(title => {
                  const interest = interests?.find(i => i.name === title);
                  return interest ? interest.id : 0;
                }) || [0];
              const sectorIds =
                selectedFilters['Sector']?.map(title => {
                  const sector = sectors?.find(s => s.name === title);
                  return sector ? sector.id : 0;
                }) || [0];
              const cities = selectedFilters['Location'] || [];
              const filterModel = {
                roleIds: [selectedRoleId],
                batchIds,
                interestIds,
                sectorIds,
                cities,
                in_my_favorited: value !== 'all',
                in_mentor: isMentorship,
                have_investestment: hasInvestment,
                keyword: searchQuery,
                page: 1,
                page_size: 10,
              };

              // Dispatch Redux actions to update filter state
              dispatch(setRoleIds([selectedRoleId]));
              dispatch(setBatchIds(batchIds));
              dispatch(setInterestIds(interestIds));
              dispatch(setSectorIds(sectorIds));
              dispatch(setCities(cities));
              dispatch(setInMyFavorited(value !== 'all'));
              dispatch(setInMentor(isMentorship));
              dispatch(setHaveInvestestment(hasInvestment));
              dispatch(setKeyword(searchQuery));
              dispatch(setPage(1));
              dispatch(setPageSize(10));

              console.log('Filter Model:', filterModel);
              navigation.navigate('BottomTab', { index: 1, filterModel: filterModel });
            }}
          >
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
    marginHorizontal: 16,
  },
  buttonWrapper: { flex: 1 },
  filtersContainer: { marginTop: 16, paddingHorizontal: 16 },
  roleContainer: { backgroundColor: '#fff', padding: 16, borderRadius: 16 },
  roleTitle: { marginBottom: 12 },
  chip: { padding: 6, borderRadius: 32 },
  chipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    width: 14,
    height: 14,
    tintColor: '#414042',
    marginRight: 4,
  },
  filterOption: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    alignItems: 'center',
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
    alignItems: 'center',
  },
  filterItemBorder: { borderBottomColor: '#F2F2F2', borderBottomWidth: 1 },
});

export default MemberFilter;
