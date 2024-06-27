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
      <Link href="profile" style={{ marginRight: 20 }}>
        <FontAwesome name="user" size={24} color="#FCF7F8" />
      </Link>
    );
  };

  if (!loading) {
      return   <Tabs
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
          name="cart"
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
    return user ? (
      <Stack>
        <Stack.Screen
          name="products"
          options={{
            title: "All Products",
            headerRight: headerProfileButton,
            
            headerStyle: {
              backgroundColor: "#009FB7",
            },
            headerTintColor: "#FCF7F8",
          }}
        />
        <Stack.Screen
          name="Map"
          options={{
            title: "Map",
            headerRight: headerProfileButton,
            headerStyle: {
              backgroundColor: "#009FB7",
            },
            headerTintColor: "#FCF7F8",
          }}
        />
        <Stack.Screen
          name="Cart"
          options={{
            title: "Cart",
            headerRight: headerProfileButton,
            headerStyle: {
              backgroundColor: "#009FB7",
            },
            headerTintColor: "#FCF7F8",
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            title: "Profile",
            headerStyle: {
              backgroundColor: "#009FB7",
            },
            headerTintColor: "#FCF7F8",
          }}
        />
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
