import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Link, Redirect, Stack, Tabs } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import Icon from "@/components/Icon";
import { useAuth } from "@/providers/AuthProvider";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  //const { user, loading } = useAuth();
  const loading = false;
  const user = true;
  
  const headerProfileButton = () => {
    return (
      <Link href="profile" style={{marginRight: 20}}>
        <FontAwesome name="user" size={24} color="black" />
      </Link>
    )
  };
  
  if (!loading) {
    return user ? (
      <Stack>
        <Stack.Screen name="Map" options={{title: "Map", headerRight:headerProfileButton }}/>
        <Stack.Screen name="Cart" options={{title: "Cart", headerBackVisible: false}}/>
        <Stack.Screen name="profile" options={{title: "Profile"}}/>
      </Stack>
    ) : (
      <Redirect href="/(auth)/sign-in" />
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingBottom: 5,
  },
  tabBarLabel: {
    marginBottom: 3,
  },
});
