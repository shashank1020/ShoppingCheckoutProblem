import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Button from '../components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Counter from '../components/Counter';
const CheckoutPage = () => {
  const [checkoutItem, setCheckoutItem] = useState<number | undefined>();
  const [station, setStation] = useState<number[][]>([[1, 2], [], [], [], []]);
  const [errorMsg, setError] = useState('');

  const handleSetItem = (text: string) => {
    if (text === '') {
      setError('');
      return;
    }
    if (!isNaN(Number(text))) {
      if (Number(text) > 0) {
        setCheckoutItem(Number(text));
        setError('');
      } else {
        setError('enter a number greater then 0');
      }
    } else {
      setError('enter a number');
    }
  };
  const handleCheckout = () => {
    if (!checkoutItem) {
      return;
    }
    let leastSumItemCounter = Number.MAX_SAFE_INTEGER;
    let leastItemCounterIndex = 0;
    station.map((counter, index) => {
      const sumOfItems = counter.reduce((sum, item) => sum + item, 0);
      if (sumOfItems < leastSumItemCounter) {
        leastSumItemCounter = sumOfItems;
        leastItemCounterIndex = index;
      }
    });
    setStation(prevState => {
      return prevState.map((counter, index) => {
        if (index === leastItemCounterIndex) {
          return [...counter, checkoutItem];
        }
        return counter;
      });
    });
  };

  useEffect(() => {
    const clear = setInterval(() => {
      setStation(prevState => {
        return prevState.map(counter =>
          [counter[0] - 1, ...counter.slice(1)].filter(item => item > 0),
        );
      });
    }, 1500);
    return () => clearInterval(clear);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.H1}>Shopping Checkout</Text>

      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
        <TextInput
          autoFocus
          style={styles.input}
          value={checkoutItem?.toString()}
          keyboardType={'numeric'}
          maxLength={10}
          onChangeText={handleSetItem}
        />
        <Button
          title={'checkout'}
          buttonStyle={{height: 50}}
          onPress={handleCheckout}
        />
      </View>

      <Text style={{color: 'red'}}>{errorMsg}</Text>

      <Counter station={station} />

      <View style={styles.footer}>
        <Text style={styles.description}>
          Problem this app solve is that people who needs to checkout with items
          goes to least busy counter station
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutPage;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  H1: {fontSize: 30, fontWeight: 'bold'},
  description: {fontSize: 18, fontWeight: '300', textAlign: 'center'},
  input: {
    height: 50,
    width: 140,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '90%',
  },
});
