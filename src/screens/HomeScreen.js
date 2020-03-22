import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';
import {FlatList, TextInput} from 'react-native';
import PornItem from '../components/PornItem.js';
import Axios from 'axios';
import AppButton from '../components/AppButton.js';

export default function HomeScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  const [data, setData] = React.useState([]);
  const [tappedItem, setTappedItem] = React.useState(null);
  useEffect(() => request(), [request]);

  const request = useCallback(async () => {
    setLoading(true);
    try {
      const {data} = await Axios.get(
        `https://www.eporner.com/api/v2/video/search/?query=${search}&per_page=10&page=${page}&thumbsize=big&order=top-weekly&gay=2&lq=1&format=json`,
      );
      setData(data.videos);
      setLoading(false);
    } catch (err) {
      console.log('Home', err.message.toString());
      setLoading(false);
    }
  }, [page, search]);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', padding: 10}}>
        <TextInput
          style={{flex: 1}}
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
        />
        <AppButton onPress={request} color="blue">
          Search
        </AppButton>
      </View>
      {loading && <Text>Loading...</Text>}
      {!loading && (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <PornItem
              porn={item}
              navigation={navigation}
              onTap={setTappedItem}
              tappedItem={tappedItem}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
