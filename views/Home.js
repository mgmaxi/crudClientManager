import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {List, Headline, Button, FAB} from 'react-native-paper';
import axios from 'axios';
import globalStyles from '../styles/global';

const Home = ({navigation}) => {
  const [clients, setClients] = useState([]);
  const [consultAPI, setConsultAPI] = useState(true);

  useEffect(() => {
    const getClientsAPI = async () => {
      try {
        const url = 'http://10.0.2.2:3000/clients';
        const result = await axios.get(url);
        setClients(result.data);
        setConsultAPI(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (consultAPI) {
      getClientsAPI();
    }
  }, [consultAPI]);

  return (
    <View style={globalStyles.container}>
      <Button
        icon="plus-circle"
        onPress={() => navigation.navigate('NewClient', {setConsultAPI})}>
        Add New Client
      </Button>
      <Headline style={globalStyles.title}>
        {clients.length > 0 ? 'Clients' : 'No Clients Yet'}
      </Headline>
      <FlatList
        data={clients}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <List.Item
            title={item.fullName}
            description={item.company}
            onPress={() =>
              navigation.navigate('ClientDetails', {item, setConsultAPI})
            }
            left={props => (
              <List.Icon {...props} icon="card-account-details-outline" />
            )}
          />
        )}
      />
      <FAB
        style={globalStyles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('NewClient', {setConsultAPI})}
      />
    </View>
  );
};

export default Home;
