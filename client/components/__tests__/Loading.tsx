import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const LoadingPage = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://example.com/LOGIN__1_-removebg-preview.png' }} // Replace with your image URL
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5b5bff',
    padding: 0,
    margin: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default LoadingPage;
