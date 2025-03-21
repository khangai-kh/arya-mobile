import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParams } from '../models/navigation';
import { DisclosureComponent } from '../components/Disclosure';

type DisclosureTextProps = StackScreenProps<MainStackParams, 'DisclosureText'>;

export const DisclosureText = (props: DisclosureTextProps) => {
    const { navigation } = props;
    const disclosureText = `
        This disclosure text has been prepared by ARYA EKOSİSTEM DANIŞMANLIK A.Ş. (“Arya”) as the data controller within the scope of Article 10 of the Personal Data Protection Law No. 6698 (“Law”) and the Communiqué on the Procedures and Principles to be Followed in Fulfillment of the Disclosure Obligation.

        If you fill out the “Individual Participation Investor (IPI) License” form on the website at https://www.aryawomen.com/aryadan-melek-yatirimci-lisansi/, your name, surname and e-mail address information will be processed by Arya by fully automated means based on your explicit consent in this regard in order to carry out application / advertising / campaign / promotion processes and will be transferred to suppliers limited to what is necessary for the realization of this purpose.

        You can leave Arya's commercial electronic message list at any time. As of the processing of your request to leave the list by Arya, the processing of your personal data mentioned above for this purpose will be terminated.

        Regarding the processing of your personal data, you can submit your requests within the scope of Article 11 of the Law titled “Rights of the Relevant Person” to Arya in accordance with the Communiqué on Application Procedures and Principles to the Data Controller.
    `;

    return (
      <DisclosureComponent
        headerTitle="Terms and condition"
        mainText={disclosureText}
        buttonText="Accept"
        onButtonPress={() => {
          navigation.navigate('IPILicense', {
            agreed: true,
          });
        }}
        isVisible={false}
      />
    );
};
