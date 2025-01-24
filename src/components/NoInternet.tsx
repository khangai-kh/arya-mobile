import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import { Modal, Snackbar, Text } from 'react-native-paper';
// import { SvgXml } from 'react-native-svg';
// import notificationErrorIcon from '../assets/svg-aicons/notification-error-icon.svg';
import { View, StyleSheet } from 'react-native';

export const NoInternet = (): JSX.Element => {
  const [isInternetReachable, setIsInternetReachable] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(({ isInternetReachable }) => {
      if (typeof isInternetReachable === 'boolean') {
        setIsInternetReachable(isInternetReachable);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Modal
        visible={!isInternetReachable}
        dismissable={false}
        onDismiss={() => {}} // No-op for mandatory prop
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          {/* <SvgXml width={48} height={48} xml={notificationErrorIcon} /> */}
          <Text style={styles.title}>No internet connection!</Text>
          <Text style={styles.message}>
            Try turning off and on your Wi-Fi or cellular data and see if the issue is resolved.
          </Text>
        </View>
      </Modal>
      <Snackbar
        visible={!isInternetReachable}
        onDismiss={() => {}}
        action={{
          label: 'Try again',
          onPress: () => {
            NetInfo.fetch().then(({ isInternetReachable }) => {
              if (typeof isInternetReachable === 'boolean') {
                setIsInternetReachable(isInternetReachable);
              }
            });
          },
        }}
      >
        No internet connection.
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 24,
    margin: 16,
    borderRadius: 8,
  },
  modalContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 16,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
});
