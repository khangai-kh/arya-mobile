import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, IconButton, MD3Theme, Modal, Portal, Text, TouchableRipple, useTheme } from 'react-native-paper';
import { Member } from '../components/Member';
import { MainStackParams } from '../models/navigation';
import { UserModelList } from '../models/users/User/user.model';
import { API } from '../plugins/axios';
import { DEFAULT_PAGE, PAGE_SIZE } from '../constants/constants';
import { RootState } from '../redux/configureStore';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { StackScreenProps } from '@react-navigation/stack';

type MemberProps = StackScreenProps<MainStackParams, 'UserMembers'>;

export const UserMembers = ({navigation, route}: MemberProps) => {
  const refresh = route.params.refresh || false;
  const myUsers = route.params.myUsers || false;
  const [members, setMembers] = useState<UserModelList[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const { token } = useSelector((state: RootState) => state.auth);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalMembers, setTotalMembers] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingFollowId, setLoadingFollowId] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  const { colors } = useTheme();
  const dynamicStyles = createDynamicStyles(colors);

  const fetchAnnouncements = useCallback(
    async (pageNum: number) => {
      try {

        if (myUsers) {
          const response = await API.get('/api/user/my-favorite-users', {
            params: {
              page: pageNum,
              page_size: PAGE_SIZE,
            },
          });
          return response;
        }

        const response = await API.get('/api/users', {
          params: {
            page: pageNum,
            page_size: PAGE_SIZE,
          },
        });
        return response;

      } catch (error) {
        console.error('Error fetching announcements:', error);
        throw error;
      }
    },
    [myUsers] // Added myUsers to dependencies
  );

  const { isFetching: isFetchingAnnouncements, refetch } = useQuery(
    ['contents', page, PAGE_SIZE, token],
    () => fetchAnnouncements(page),
    {
      onSuccess: (data) => {
        if (page === DEFAULT_PAGE) {
          setMembers(data.data);
        } else {
          setMembers((prev) => [...prev, ...data.data]);
        }
        setTotalMembers(data.total);
        setHasMore(data.data.length === PAGE_SIZE);
      },
      enabled: !isLoadingMore,
    }
  );

  useFocusEffect(
    useCallback(() => {
      if (refresh ) {
        setPage(DEFAULT_PAGE);
        setMembers([]);
        refetch();
      }
    }, [refresh, refetch])
  );

  const loadMore = useCallback(async () => {
    if (!isLoadingMore && hasMore && !isFetchingAnnouncements) {
      setIsLoadingMore(true);
      const nextPage = page + 1;
      try {
        const newData = await fetchAnnouncements(nextPage);
        setMembers((prev) => [...prev, ...newData.data]);
        setPage(nextPage);
        setHasMore(newData.data.length === PAGE_SIZE);
      } catch (error) {
        console.error('Error loading more members:', error);
      } finally {
        setIsLoadingMore(false);
      }
    }
  }, [isLoadingMore, hasMore, isFetchingAnnouncements, page, fetchAnnouncements]);

  const handleScroll = ({ nativeEvent }: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const paddingToBottom = 20;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      loadMore();
    }
  };

  const handleFollowPress = useCallback(
    async (userId: number) => {
      setLoadingFollowId(userId);
      try {
        const currentMember = members.find((member) => member.id === userId);
        const currentFollowing = currentMember?.is_favorited || false;

        if (currentFollowing) {
          await API.post('/api/users/unfollow', { user_id: userId });
        } else {
          await API.post('/api/users/follow', { user_id: userId });
        }
        setMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.id === userId
              ? { ...member, is_favorited: !currentFollowing }
              : member
          )
        );
      } catch (error) {
        console.error('Error toggling follow status:', error);
      } finally {
        setLoadingFollowId(null);
      }
    },
    [members]
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <Appbar.Header style={styles.appbarHeader}>
          <Appbar.Action
              icon={require('../assets/flat-icons/angle-small-left.png')}
              color="#414042"
              size={20}
              style={dynamicStyles.appbarActionRight}
              onPress={() => navigation.goBack()}
          />
          <Appbar.Content
              title={
                  <View style={dynamicStyles.titleContainer}>
                      <Text variant="titleMedium" style={dynamicStyles.interestText}>
                         My Followers
                      </Text>
                  </View>
              }
          />
      </Appbar.Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text>{totalMembers} members</Text>
          </View>
          <ScrollView
            style={styles.scrollView}
            onScroll={handleScroll}
            showsVerticalScrollIndicator={false}
          >
            {isFetchingAnnouncements && page === DEFAULT_PAGE ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
              </View>
            ) : (
              members.map((member, index) => (
                <Member
                  key={index}
                  name={member.full_name || ''}
                  image={member.photo}
                  memberRole={member.role?.name || ''}
                  status={member.title}
                  following={member.is_favorited || false}
                  interests={member.interests}
                  isLoading={loadingFollowId === (member.id || 0)}
                  style={[
                    styles.memberItem,
                    index === members.length - 1 && styles.lastMemberItem,
                  ]}
                  onPress={() => {
                    navigation.navigate('Member', { id: member.id });
                  }}
                  onFollowPress={() => handleFollowPress(member.id || 0)}
                />
              ))
            )}
            {isLoadingMore && (
              <View style={styles.loadingMoreContainer}>
                <ActivityIndicator size="small" color={colors.primary} />
              </View>
            )}
          </ScrollView>
        </View>
      </ScrollView>
      <Portal>
        <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={styles.modal}
        >
            <IconButton
                icon={require('../assets/flat-icons/x.png')}
                size={20}
                iconColor="#A09FA0"
                style={styles.modalClose}
                onPress={() => setVisible(false)}
            />
            <Image
                resizeMode="contain"
                source={require('../assets/flat-icons/diamond.png')}
                style={styles.modalIcon}
            />
            <Text variant="headlineSmall" style={styles.modalTitle}>
                Please become a Premium member to join
            </Text>
            <View style={styles.modalButtons}>
                <TouchableRipple
                    style={styles.modalButton}
                    onPress={() => {setVisible(false);}}
                >
                    <Text variant="titleMedium" style={styles.modalButtonText}>
                        Not now
                    </Text>
                </TouchableRipple>
                <TouchableRipple
                    style={styles.modalButtonPrimary}
                    onPress={() => {
                      setVisible(false);
                      navigation.navigate('MemberShip', {
                        agreed_agreement: false,
                        agreed_confidentiality: false,
                      });
                    }}
                >
                    <Text variant="titleMedium" style={styles.modalButtonPrimaryText}>
                        Arya Premium
                    </Text>
                </TouchableRipple>
            </View>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

const createDynamicStyles = (colors: MD3Theme['colors']) =>
  StyleSheet.create({
    appbarActionRight: {
        backgroundColor: colors.onPrimary || '#FFFFFF',
        marginRight: 5,
        marginTop: 20,
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    interestText: {
        fontWeight: 'bold',
        paddingLeft: 0,
        marginLeft:-40,
    },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  appbarHeader: {
    width: '100%',
    backgroundColor: 'transparent',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  filterIconContainer: {
    position: 'relative',
  },
  filterDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C71585', // Use a noticeable color, matching your filter count color
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingMoreContainer: {
    alignItems: 'center',
    padding: 20,
  },
  memberItem: {
    marginBottom: 8,
  },
  lastMemberItem: {
    marginBottom: 0,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 24,
    margin: 24,
    padding: 16,
  },
  modalClose: {
      position:'absolute',
      top:10,
      left:250,
  },
  modalIcon: {
      alignSelf: 'center',
      width: 56,
      height: 56,
      tintColor: '#B61D8D',
      marginVertical: 24,
  },
  modalTitle: {
      textAlign: 'center',
  },
  modalText: {
      textAlign: 'center',
      marginTop: 8,
  },
  modalButtons: {
      marginTop: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      rowGap: 8,
  },
  modalButton: {
      flex: 1,
      paddingVertical: 12.5,
      borderRadius: 32,
      alignItems: 'center',
  },
  modalButtonText: {
      textAlign: 'center',
  },
  modalButtonPrimary: {
      paddingVertical: 12.5,
      paddingHorizontal: 28.5,
      backgroundColor: '#B61D8D',
      borderRadius: 32,
      alignItems: 'center',
  },
  modalButtonPrimaryText: {
      color: '#FFFFFF',
  },
});

export default UserMembers;
