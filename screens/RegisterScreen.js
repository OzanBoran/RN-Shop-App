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
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");

  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

  // Send a post request to the backend API
  const successAlert = Alert.alert("Kayıt başarılı!", "Hesabınız başarıyla oluşturuldu.");
  axios
    .post("http://192.168.2.237:8000/register", user)
    .then((response) => {
      successAlert;
      setName("");
      setPassword("");
      setEmail("");
    })
    .catch((error) => {
      Alert.alert(
        "Kayıt oluşturulamadı.",
        "Kayıt sırasında bir hatayla karşılaşıldı"
      );
      console.log("Registration failed", error);
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
                Üye Ol
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
              <Ionicons
                style={{ marginLeft: 8 }}
                name="ios-person"
                size={24}
                color="#EA871C"
              />
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                  color: "black",
                  marginVertical: 10,
                  width: 300,
                  fontSize: name ? 16 : 16,
                }}
                placeholder="Adınız ve Soyadınız"
              />
            </View>
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
            onPress={handleRegister}
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
              Üye Ol
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              Hesabınız var mı? Giriş Yapın.
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
