import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, TextInput, View, Text } from "react-native";
import { useAuth } from "@/providers/AuthProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import VisiblityToggle from "@/components/VisibilityToggle";
import IconInputField from "@/components/IconInputField";

export default function TabOneScreen() {
  const { signUp } = useAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [passwordVisiblity, setPasswordVisibility] = useState(true);

  const handleNameChange = (text: string) => {
    setCredentials({ ...credentials, username: text });
  };

  const handleEmailChange = (text: string) => {
    setCredentials({ ...credentials, email: text });
  };

  const handlePasswordChange = (text: string) => {
    setCredentials({ ...credentials, password: text });
  };

  const handleSubmit = async () => {
    const response = signUp(credentials.username, credentials.email, credentials.password);
    response.then((data: void | { error: string }) => {
      if (data) {
        console.log(data.error);
      } else {
        console.log("Successful")
        router.navigate("(tabs)")
      }
    });
  };

  const usernameField = (
    <IconInputField key={"username"}
      value={credentials.username}
      onChangeText={handleNameChange}
      placeholder="Username"
      leftSide={<AntDesign name="user" size={38} color="black" />}
      style={styles.input}
    />
  );

  const emailField = (
    <IconInputField key={"email"}
      value={credentials.email}
      onChangeText={handleEmailChange}
      placeholder="Email"
      leftSide={<AntDesign name="mail" size={38} color="black" />}
      style={styles.input}
    />
  );

  const passwordField = (
    <IconInputField key={"password"}
    value={credentials.password}
    onChangeText={handlePasswordChange}
    placeholder="Password"
    secureTextEntry={passwordVisiblity} // for hiding the password
    style={styles.input}
    leftSide={<AntDesign name="lock" size={38} color="black" />}
    rightSide={
      <VisiblityToggle
      state={passwordVisiblity}
      setState={setPasswordVisibility}/>
    }
    />
  );
  const fields = [emailField, usernameField, passwordField];
  const [activeFieldKey, setFieldKey] = useState<string>(emailField.key ? emailField.key : "");

  const setActiveFieldToNext = () => {
    switch (activeFieldKey) {
      case "email":
        setFieldKey("username");
        break;
      case "username":
        setFieldKey("password");
        break;
      default:
        break;
    }
  };

  const setActiveFieldToPrevious = () => {
    switch (activeFieldKey) {
      case "password":
        setFieldKey("username");
        break;
      case "username":
        setFieldKey("email");
        break;
      default:
        break;
    }
  };

  const getActiveField = () => {
    return fields.filter(field => field.key === activeFieldKey)
  };

  const signUpButton = (
    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>SIGN UP</Text>
    </TouchableOpacity>	
  );

  const nextStepButton = (
    <TouchableOpacity onPress={setActiveFieldToNext}>
      <AntDesign name="right" size={38} color="black" />
    </TouchableOpacity>	
  );

  const previousStepButton = (
    <TouchableOpacity onPress={setActiveFieldToPrevious}>
      <AntDesign name="left" size={38} color="black" />
    </TouchableOpacity>	
  );

  const stepButtons = (
    <View style={styles.buttonContainer}>
      {activeFieldKey !== "email" ? previousStepButton : null}
      {activeFieldKey !== "password" ? nextStepButton : null}
      {activeFieldKey === "password" ? signUpButton : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.circle} />
        <View style={styles.form}>
        <Text style={styles.title}>SIGN UP</Text>
        <View style={styles.inputContainer}>
          {getActiveField()}
          {stepButtons}
          <Link href="(auth)/sign-in" style={styles.link}>Have an account? Log in!</Link>
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
  },
  buttonText: {
    color: "white"
  },
  link: {
    color: "blue",
    textDecorationLine: "underline"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row"
  }
});
