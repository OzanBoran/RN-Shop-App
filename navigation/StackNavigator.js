import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign, FontAwesome5, Feather } from "@expo/vector-icons";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import AddAddressScreen from "../screens/AddAddressScreen";
import AddressScreen from "../screens/AddressScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import OrderScreen from "../screens/OrderScreen";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Anasayfa",
            tabBarLabelStyle: {
              color: "#EA871C",
              fontSize: 14,
              fontWeight: "bold",
            },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="ios-home-sharp" size={24} color="#EA871C" />
              ) : (
                <Ionicons name="ios-home-outline" size={24} color="#EA871C" />
              ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profil",
            tabBarLabelStyle: {
              color: "#EA871C",
              fontSize: 14,
              fontWeight: "bold",
            },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="ios-person" size={24} color="#EA871C" />
              ) : (
                <Ionicons name="ios-person-outline" size={24} color="#EA871C" />
              ),
          }}
        />

        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: "Sepet",
            tabBarLabelStyle: {
              color: "#EA871C",
              fontSize: 14,
              fontWeight: "bold",
            },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome5 name="shopping-cart" size={24} color="#EA871C" />
              ) : (
                <Feather name="shopping-cart" size={24} color="#EA871C" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Info"
          component={ProductInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Address"
          component={AddAddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add"
          component={AddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
