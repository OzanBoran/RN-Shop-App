import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [members_email, setMembers_email] = useState("");
  const [members_pass, setMembers_pass] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          navigation.replace("Main");
        }
      } catch (error) {
        console.log("Error message", error);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    try {
      // Make a POST request to server's login endpoint
      const response = await axios.post("http://192.168.2.237:8000/login", {
        members_email,
        members_pass,
      });

      // Check if the login was successful
      if (response.data.success) {
        // Save the authentication token to AsyncStorage
        const token = response.data.authToken;
        await AsyncStorage.setItem("authToken", token);
        // Navigate to the main screen
        navigation.replace("Main");
       
      } else {
        const errorMessage =
        console.log("Login failed. Server message:", errorMessage);
        // Display an error message if login fails
        Alert.alert("Login Failed", errorMessage);
      }
    } catch (error) {
      // Log the full response data and details for debugging
      console.error("Error during login:", error.message);
      if (error.response) {
        console.error("Response Status:", error.response.status);
        console.error("Response Data:", error.response.data);
      }

      // Handle network errors or other exceptions
      Alert.alert("Error", "An error occurred during login.");
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View>
        <Image
          style={{ width: 130, height: 140 }}
          source={require("../logo.png")}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ marginTop: 70 }}>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 25,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#EA871C",
                }}
              >
                Giriş Yap
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#FFD580",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="email"
                size={24}
                color="#EA871C"
              />
              <TextInput
                value={members_email}
                onChangeText={(text) => setMembers_email(text)}
                style={{
                  color: "black",
                  marginVertical: 10,
                  width: 300,
                  fontSize: members_email ? 16 : 16,
                }}
                placeholder="Email Adresiniz"
              />
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#FFD580",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <Entypo
                style={{ marginLeft: 8 }}
                name="lock"
                size={24}
                color="#EA871C"
              />
              <TextInput
                value={members_pass}
                onChangeText={(text) => setMembers_pass(text)}
                secureTextEntry={true}
                style={{
                  color: "black",
                  marginVertical: 10,
                  width: 300,
                  fontSize: members_pass ? 16 : 16,
                }}
                placeholder="Şifre"
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 12,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          ></View>
          <View style={{ marginTop: 80 }} />
          <Pressable
            onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: "#EA871C",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Giriş Yap
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              Hesabınız yok mu? Hesap oluşturun.
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
