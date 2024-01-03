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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  });

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.2.237:8000/login", user)
      .then((response) => {
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Main");
      })
      .catch((error) => {
        Alert.alert("Giriş yaparken bir hata oluştu", "Hatalı email");
        console.log(error);
      });
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
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  color: "black",
                  marginVertical: 10,
                  width: 300,
                  fontSize: email ? 16 : 16,
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
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={{
                  color: "black",
                  marginVertical: 10,
                  width: 300,
                  fontSize: password ? 16 : 16,
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
          >
            <Text>Beni Hatırla</Text>
            <Text style={{ color: "red", fontWeight: 500 }}>
              Şifremi Unuttum
            </Text>
          </View>
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
