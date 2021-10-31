import React, {useState, useEffect} from 'react';
import {
  View,
  Platform,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Portal,
  Dialog,
  Paragraph,
} from 'react-native-paper';
import axios from 'axios';
import globalStyles from '../styles/global';

const NewClient = ({navigation, route}) => {
  const {setConsultAPI} = route.params;
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  // Alert
  const [visibleAlert, setVisibleAlert] = useState(false);

  // Upload Data Fields for Edit Client
  useEffect(() => {
    if (route.params.client) {
      const {fullName, email, phoneNumber, company} = route.params.client;

      setFullName(fullName);
      setEmail(email);
      setPhoneNumber(phoneNumber);
      setCompany(company);
    }
  }, []);

  // fnSaveClient Create or Edit Client on DB
  const saveClient = async () => {
    // Validation
    if (
      fullName === '' ||
      email === '' ||
      phoneNumber === '' ||
      company === ''
    ) {
      setVisibleAlert(true);
      return;
    }

    // Make New Client
    const client = {fullName, email, phoneNumber, company};

    // Create or Edit Client on DB
    //Edit Client
    if (route.params.client) {
      const {id} = route.params.client;
      client.id = id;
      const url = `http://10.0.2.2:3000/clients/${id}`;
      try {
        await axios.put(url, client);
      } catch (error) {
        console.log(error);
      }
    }
    // Create Client
    else {
      try {
        if (Platform.OS === 'ios') {
          await axios.post('http://localhost:3000/clients', client);
        } else {
          await axios.post('http://10.0.2.2:3000/clients', client);
        }
      } catch (error) {
        console.log(error);
      }
    }

    // Redirect
    navigation.navigate('Home');

    // Reset Form
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setCompany('');

    // Update the List of Clients
    setConsultAPI(true);
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
      <View style={globalStyles.container}>
        <Headline style={globalStyles.title}>Add New Client</Headline>
        <TextInput
          label="Full Name"
          style={styles.input}
          value={fullName}
          onChangeText={text => setFullName(text)}
          theme={{colors: {primary: '#0655BF'}}}
        />
        <TextInput
          label="Email"
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          theme={{colors: {primary: '#0655BF'}}}
        />
        <TextInput
          label="Phone Number"
          style={styles.input}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          theme={{colors: {primary: '#0655BF'}}}
        />
        <TextInput
          label="Company"
          style={styles.input}
          value={company}
          onChangeText={text => setCompany(text)}
          theme={{colors: {primary: '#0655BF'}}}
        />

        <Button
          icon="account-plus"
          mode="contained"
          onPress={() => saveClient()}>
          Save Client
        </Button>

        <Portal>
          <Dialog
            visible={visibleAlert}
            onDismiss={() => setVisibleAlert(false)}>
            <Dialog.Title>Error</Dialog.Title>
            <Dialog.Content>
              <Paragraph>All fields are required</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setVisibleAlert(false)}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});

export default NewClient;
