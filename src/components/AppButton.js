import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

export default ({children, color = '#ccc', ...etc}) => (
  <TouchableOpacity
    {...etc}
    style={{...styles.default, backgroundColor: color}}>
    <View>
      <Text style={styles.text}>{children}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  default: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});
