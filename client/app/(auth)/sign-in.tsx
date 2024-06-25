import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, TextInput, View, Text, Button } from "react-native";
import { useAuth } from "@/providers/AuthProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import IconInputField from "@/components/IconInputField";
import VisiblityToggle from "@/components/VisibilityToggle";

export default function TabOneScreen() {
  const { signIn } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
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
        console.log(data.error);
      } else {
        console.log("Successful")
        router.navigate("(tabs)")
      }
    });
  };

  const [passwordVisiblity, setPasswordVisibility] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.circle} />
        <View style={styles.form}>
        <Text style={styles.title}>LOGIN</Text>
        <View style={styles.inputContainer}>
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
          <TouchableOpacity style={styles.button} onPress={handleSubmit}><Text>SIGN IN</Text></TouchableOpacity>
          <Link href="(auth)/sign-up">Here</Link>
        </View>
        </View>
       
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    // overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 50,
    width: "100%"
  },
  title: {
    fontSize: 32,
    fontFamily: "JosefineSansBold",
    color: "white"
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    color: "white"
  },
  circle: {
    position: "absolute",
    top: -300,
    marginHorizontal: "auto",
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: "blue",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "transparent"
  },
});
