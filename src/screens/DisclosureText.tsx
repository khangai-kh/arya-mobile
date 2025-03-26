import React, { useState, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParams } from '../models/navigation';
import { DisclosureComponent } from '../components/Disclosure';
import { API } from '../plugins/axios';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

type DisclosureTextProps = StackScreenProps<MainStackParams, 'DisclosureText'>;

export const DisclosureText = (props: DisclosureTextProps) => {
  const { navigation, route } = props;
  const id = route.params?.id as number; 
  const [disclosureText, setDisclosureText] = useState<string>('');
  const [headerText, setheaderText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useTheme();


  useEffect(() => {
    const fetchDisclosureText = async () => {
      try {
        setIsLoading(true);
        const { data } = await API.get(`/api/get-aggrements-by-id?id=${id}`);
        setIsLoading(false);
        setDisclosureText(data.content || 'No text available');
      } catch (err) {
        setDisclosureText('Failed to load agreement text');
        console.error(err);
        setIsLoading(false);
      }
    };

    if (id !== undefined) {
      if(id === 1){
        setheaderText('Terms and condition');
      }

      if(id === 2){
        setheaderText('Arya Agreement');
      }

      if(id === 3){
        setheaderText('Confidentiality Agreement');
      }

      fetchDisclosureText();
    } else {
      setDisclosureText('No agreement ID provided');
    }
  }, [id]); // Re-run if id changes

  if (isLoading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

  return (
    <DisclosureComponent
      headerTitle={headerText}
      mainText={disclosureText}
      buttonText="Accept"
      onButtonPress={() => {
        // Navigate back to the previous screen with the "agreed" parameter
        const previousRouteName = navigation.getState().routes[navigation.getState().index - 1].name;
        if (previousRouteName === 'SignUp') {
          navigation.navigate('SignUp', {
            agreed: true,
          });
        } else if (previousRouteName === 'MemberShip') {
          if(id === 2){
            navigation.navigate('MemberShip', {
              agreed_agreement: true,
              agreed_confidentiality:false,
            });
          }
          if(id === 3){
            navigation.navigate('MemberShip', {
              agreed_agreement: true,
              agreed_confidentiality:true,
            });
          }
        } else {
          console.warn(`Unexpected route name: ${previousRouteName}`);
        }
      }}
      isVisible={true}
    />
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
