import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import axiosInstance from '@/services/api';
import { useAuth } from '@/providers/AuthProvider';
import { AntDesign } from '@expo/vector-icons';
import IconInputField from '@/components/IconInputField';
import VisiblityToggle from '@/components/VisibilityToggle';

export default function TabOneScreen() {
  const { signIn } = useAuth();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleEmailChange = (text: string) => {
    setCredentials({ ...credentials, email: text });
  };

  const handlePasswordChange = (text: string) => {
    setCredentials({ ...credentials, password: text });
  };

  const handleSubmit = async () => {
    const response = signIn(credentials.email, credentials.password);
    response.then((data: void | { error: string }) => {
        if (data) {
            console.log(data.error)
        }
    })
  };

  const [passwordVisiblity, setPasswordVisibility] = useState(false);

  return (
    <View style={styles.container}>
      <IconInputField
        value={credentials.email}
        onChangeText={handleEmailChange}
        placeholder="Email"
        style={styles.input}
        leftSide={<AntDesign name="mail" size={38} color="black" />}
      />
      <IconInputField
        value={credentials.password}
        onChangeText={handlePasswordChange}
        placeholder="Password"
        secureTextEntry={passwordVisiblity} // for hiding the password
        style={styles.input}
        leftSide={<AntDesign name="lock" size={38} color="black" />}
        rightSide={
        <VisiblityToggle 
        state={passwordVisiblity}
        setState={setPasswordVisibility}
        />}
      />
      <Button onPress={handleSubmit} title="SignIn" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
