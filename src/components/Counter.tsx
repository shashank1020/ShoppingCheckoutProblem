import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Counter = ({station}: {station: number[][]}) => {
  return (
    <View style={styles.counters}>
      {station.length > 0 &&
        station.map((counter, counterIndex) => (
          <View key={counterIndex}>
            <Text style={{textAlign: 'center'}}>{counterIndex + 1}</Text>
            <View key={counterIndex} style={styles.counter}>
              {counter.map((item, index) => (
                <Text key={index}>{item}</Text>
              ))}
            </View>
          </View>
        ))}
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  counter: {
    margin: 10,
    padding: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
  },
  counters: {
    flexDirection: 'row',
    marginTop: 30,
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 1,
  },
});
