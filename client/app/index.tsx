import { Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";
import { Text } from "react-native";
import React from "react";

const Index = () => {
  const { user, loading } = useAuth();

  if(!loading) {
    // return <Redirect href="(tabs)" />
    return user ? (
      <Redirect href="(tabs)" />
    ) : (
      <Redirect href="/(auth)/sign-in" />
    );
  } else {
    return <Text>Loading</Text>
  }

};

export default Index;
