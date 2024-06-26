import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link, Redirect, Tabs } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import Icon from "@/components/Icon";
import { useAuth } from "@/providers/AuthProvider";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user, loading } = useAuth();

  if (!loading) {
    return user ? (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          headerShown: useClientOnlyValue(false, true),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon library="Entypo" name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: "Findr",
            tabBarIcon: ({ color }) => (
              <Icon
                library="MaterialCommunityIcons"
                name="map-marker-path"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Cart"
          options={{
            title: "My Cart",
            tabBarIcon: ({ color }) => (
              <Icon library="FontAwesome5" name="shopping-cart" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Icon library="FontAwesome" name="user" color={color} />
            ),
          }}
        />
      </Tabs>
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
