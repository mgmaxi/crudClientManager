import React from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import {Text, Button, Headline, Subheading, FAB} from 'react-native-paper';
import axios from 'axios';
import globalStyles from '../styles/global';

const ClientDetails = ({navigation, route}) => {
  const {id, fullName, email, phoneNumber, company} = route.params.item;
  const {setConsultAPI} = route.params;

  // Alert Delete Client
  const showAlert = () => {
    Alert.alert(
      'You want to delete this client?',
      'If you delete this contact you will not be able to recover it!',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: () => deleteClient()},
      ],
    );
  };

  // fn Delete Client
  const deleteClient = async () => {
    // Delete Client from API
    try {
      const url = `http://10.0.2.2:3000/clients/${id}`;
      await axios.delete(url);
    } catch (error) {
      console.log(error);
    }

    // Redirect
    navigation.navigate('Home');

    // Update List of Clients
    setConsultAPI(true);
  };

  return (
    <View style={globalStyles.container}>
      <Headline style={globalStyles.title}>{fullName}</Headline>
      <Text style={styles.text}>
        Company: <Subheading>{company}</Subheading>
      </Text>
      <Text style={styles.text}>
        Email: <Subheading>{email}</Subheading>
      </Text>
      <Text style={styles.text}>
        Phone Number: <Subheading>{phoneNumber}</Subheading>
      </Text>
      <Button
        icon="cancel"
        mode="contained"
        style={styles.btnDelete}
        onPress={() => showAlert()}>
        Delete Client
      </Button>
      <FAB
        style={globalStyles.fab}
        small
        icon="pencil"
        onPress={() =>
          navigation.navigate('NewClient', {
            client: route.params.item,
            setConsultAPI,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {marginBottom: 20, fontSize: 16},
  btnDelete: {marginTop: 25, backgroundColor: '#FF0000'},
});

export default ClientDetails;
