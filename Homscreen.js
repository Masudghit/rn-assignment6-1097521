import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const products = [
  { id: '1', name: 'Dress 1', image: require('../assets/dress1.png') },
  { id: '2', name: 'Dress 2', image: require('../assets/dress2.png') },
  { id: '3', name: 'Dress 3', image: require('../assets/dress3.png') },
  { id: '4', name: 'Dress 4', image: require('../assets/dress4.png') },
  { id: '5', name: 'Dress 5', image: require('../assets/dress5.png') },
  { id: '6', name: 'Dress 6', image: require('../assets/dress6.png') },
  { id: '7', name: 'Dress 7', image: require('../assets/dress7.png') },
];

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    };
    loadCart();
  }, []);

  const addToCart = async (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
              <Image source={require('../assets/add_circle.png')} style={styles.buttonImage} />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
        <Image source={require('../assets/shoppingBag.png')} style={styles.cartButtonImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productName: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    padding: 10,
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
  cartButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  cartButtonImage: {
    width: 50,
    height: 50,
  },
});

export default HomeScreen;
