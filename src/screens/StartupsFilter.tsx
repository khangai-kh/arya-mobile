import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, Button, Searchbar, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { MainStackParams } from '../models/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/configureStore';

import {
  setStatuses,
  setInvestmentStatuses,
  setTargetAmounts,
  setTotalInvestments,
  setAmountsCollected,
  setKeyword,
  setPage,
  setPageSize,
  resetFilter,
} from '../redux/startup/reducer';
import CustomCheckbox from '../components/forms/CustomCheckbox';

type FilterProps = StackScreenProps<MainStackParams, 'StartupsFilter'>;

export const StartupsFilter = ({ navigation }: FilterProps) => {
  const dispatch = useDispatch();
  const startupState = useSelector((state: RootState) => state.startup || {});
  const { colors } = useTheme();
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [open, setOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState<string | undefined>(undefined);

  const filters = [
    { id: 0, title: 'Status' },
    { id: 1, title: 'Investment status' },
    { id: 2, title: 'Target amount' },
    { id: 3, title: 'Total investment' },
    { id: 4, title: 'Amount collected' },
  ];

  const statuses = React.useMemo(() => [
    { id: 0, title: 'Idea stage' },
    { id: 1, title: 'Prototype ready' },
    { id: 2, title: 'MVP ready' },
    { id: 3, title: 'Beta testing' },
    { id: 4, title: 'Active market' },
    { id: 5, title: 'Scaling up' },
    { id: 6, title: 'Profitable' },
  ], []);

  const investmentStatuses = React.useMemo(() => [
    { id: 0, title: 'Bootstrapped' },
    { id: 1, title: 'Pre-seed' },
    { id: 2, title: 'Angel round' },
    { id: 3, title: 'Seed round' },
    { id: 4, title: 'Series A' },
    { id: 5, title: 'Series B' },
    { id: 6, title: 'Series C+' },
  ], []);

  const amountRanges = React.useMemo(() => [
    { id: 0, title: '0 – $50K' },
    { id: 1, title: '$50K – $250K' },
    { id: 2, title: '$250K – $1M' },
    { id: 3, title: '$1M – $5M' },
    { id: 4, title: '$5M – $20M' },
    { id: 5, title: '$20M+' },
  ], []);

  const getCurrentFilterItems = () => {
    let items: any[];
    switch (currentFilter) {
      case 'Status':
        items = statuses;
        break;
      case 'Investment status':
        items = investmentStatuses;
        break;
      case 'Target amount':
      case 'Total investment':
      case 'Amount collected':
        items = amountRanges;
        break;
      default:
        items = [];
    }
    if (searchQuery) {
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
    const newSelectedFilters: Record<string, string[]> = {};

    if (startupState.statuses?.length > 0) {
        newSelectedFilters.Statuses = startupState.statuses
          .map(id => statuses.find(batch => batch.id === id)?.title)
          .filter((name): name is string => !!name);
    }

    if (startupState.investmentStatuses?.length > 0) {
        newSelectedFilters['Investment status'] = startupState.investmentStatuses
          .map(id => investmentStatuses.find(status => status.id === id)?.title)
          .filter((name): name is string => !!name);
      }

    if (startupState.targetAmounts?.length > 0) {
    newSelectedFilters['Target amount'] = startupState.targetAmounts
        .map(id => amountRanges.find(range => range.id === id)?.title)
        .filter((name): name is string => !!name);
    }

    if (startupState.totalInvestments?.length > 0) {
    newSelectedFilters['Total investment'] = startupState.totalInvestments
        .map(id => amountRanges.find(range => range.id === id)?.title)
        .filter((name): name is string => !!name);
    }

    if (startupState.amountsCollected?.length > 0) {
    newSelectedFilters['Amount collected'] = startupState.amountsCollected
        .map(id => amountRanges.find(range => range.id === id)?.title)
        .filter((name): name is string => !!name);
    }

    setSelectedFilters(newSelectedFilters);
    setSearchQuery(startupState.keyword);
  }, [amountRanges, investmentStatuses, startupState, statuses]);

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
          <View style={styles.searchContainer}>
            <Searchbar
              icon={require('../assets/flat-icons/search.png')}
              clearIcon={require('../assets/flat-icons/cross-circle.png')}
              placeholder="Search Startups"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchBar}
            />
          </View>
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
                setSelectedFilters({});
                setSearchQuery('');
                setCurrentFilter(undefined);
                dispatch(resetFilter());
              }}
            >
              Reset
            </Text>
          </Appbar.Header>
          <View style={styles.filtersContainer}>
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
          </View>
        </ScrollView>
        <Box px={16} py={16}>
          <Button
            mode="contained"
            onPress={() => {
              const filterModel = {
                statuses: selectedFilters.Status || [],
                investmentStatuses: selectedFilters['Investment status'] || [],
                targetAmounts: selectedFilters['Target amount'] || [],
                totalInvestments: selectedFilters['Total investment'] || [],
                amountsCollected: selectedFilters['Amount collected'] || [],
                keyword: searchQuery,
                page: 1,
                page_size: 10,
              };

              dispatch(setStatuses(filterModel.statuses.map(Number)));
              dispatch(setInvestmentStatuses(filterModel.investmentStatuses.map(Number)));
              dispatch(setTargetAmounts(filterModel.targetAmounts.map(Number)));
              dispatch(setTotalInvestments(filterModel.totalInvestments.map(Number)));
              dispatch(setAmountsCollected(filterModel.amountsCollected.map(Number)));
              dispatch(setKeyword(searchQuery));
              dispatch(setPage(1));
              dispatch(setPageSize(10));

              navigation.navigate('Startups', { type: 1, filterModel: filterModel });
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
  filtersContainer: { marginTop: 16, paddingHorizontal: 16 },
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

export default StartupsFilter;
