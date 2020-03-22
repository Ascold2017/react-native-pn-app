import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native';
import PornItem from '../components/PornItem.js';
import {
  Header,
  Item,
  Input,
  Button,
  Text,
  ActionSheet,
  Picker,
  Spinner,
} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {
  SET_SEARCH,
  submitSearch,
  nextPage,
  setType,
  submitSorting,
} from '../store.js';

const HomeHeader = () => {
  const dispatch = useDispatch();
  const search = useSelector(state => state.search);
  const setSearch = string => dispatch({type: SET_SEARCH, payload: string});
  return (
    <Header searchBar rounded>
      <Item>
        <Input placeholder="Search" value={search} onChangeText={setSearch} />
        <Button onPress={() => dispatch(submitSearch())}>
          <Text>Search</Text>
        </Button>
      </Item>
    </Header>
  );
};
export default function HomeScreen({navigation}) {
  const [tappedItem, setTappedItem] = React.useState(null);

  const dispatch = useDispatch();
  const loading = useSelector(state => state.isLoading);
  const list = useSelector(state => state.list);
  const sorting = useSelector(state => state.sorting);
  const type = useSelector(state => state.type);

  useEffect(() => {
    dispatch(submitSearch());
    navigation.setOptions({
      header: () => <HomeHeader />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      {loading && <Spinner />}
      {!loading && (
        <>
          <View style={{flexDirection: 'row'}}>
            <Picker
              mode="dialog"
              headerStyle={{backgroundColor: '#b95dd3'}}
              headerBackButtonTextStyle={{color: '#fff'}}
              headerTitleStyle={{color: '#fff'}}
              selectedValue={type}
              onValueChange={value => dispatch(setType(value))}>
              <Picker.Item label="Getero" value={0} />
              <Picker.Item label="Gay&Getero" value={1} />
              <Picker.Item label="Gay" value={2} />
            </Picker>
            <Picker
              mode="dialog"
              headerStyle={{backgroundColor: '#b95dd3'}}
              headerBackButtonTextStyle={{color: '#fff'}}
              headerTitleStyle={{color: '#fff'}}
              selectedValue={sorting}
              onValueChange={value => dispatch(submitSorting(value))}>
              <Picker.Item label="Latest" value="latest" />
              <Picker.Item label="Longest" value="longest" />
              <Picker.Item label="Shortest" value="shortest" />
              <Picker.Item label="Top-Rated" value="top-rated" />
              <Picker.Item label="Most Popular" value="most-popular" />
            </Picker>
          </View>
          <FlatList
            data={list}
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
          <Button onPress={() => dispatch(nextPage())}>
            <Text>Next</Text>
          </Button>
        </>
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
