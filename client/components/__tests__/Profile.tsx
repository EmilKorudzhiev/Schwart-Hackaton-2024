import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const ProfilePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.name}>
          <Text style={styles.heading}>My Profile</Text>
        </View>
        <View style={styles.info}>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={styles.image}
          />
          <Text style={styles.nameText}>Явор Томов</Text>
          <Text style={styles.emailText}>qvkatabg@gmail.com</Text>
        </View>
        <View style={styles.name}>
          <Text style={styles.heading}>My Profile</Text>
        </View>
        <View style={styles.options}>
          <View style={styles.option}>
            <Text style={styles.optionText}>History</Text>
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Logout</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aquamarine',
  },
  screen: {
    flex: 1,
    backgroundColor: 'bisque',
    alignItems: 'center',
  },
  name: {
    width: '100%',
    alignItems: 'flex-start',
  },
  heading: {
    margin: 30,
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emailText: {
    fontSize: 14,
    color: 'gray',
  },
  options: {
    width: '100%',
    alignItems: 'center',
  },
  option: {
    width: '80%',
    height: 80,
    backgroundColor: 'blue',
    margin: 10,
    borderRadius: 20,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  optionText: {
    fontSize: 24,
    color: 'white',
  },
});

export default ProfilePage;
