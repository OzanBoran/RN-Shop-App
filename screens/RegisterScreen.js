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
  const [members_email, setMembers_email] = useState("");
  const [members_pass, setMembers_pass] = useState("");

  const [members_name, setMembers_name] = useState("");
  const [members_surname, setMembers_surname] = useState("");

  const navigation = useNavigation();

  const handleRegister = () => {
    const member = {
      members_name: members_name,
      members_surname: members_surname,
      members_email: members_email,
      members_pass: members_pass,
    };

  // Send a post request to the backend API
  const successAlert = Alert.alert("Kayıt başarılı!", "Hesabınız başarıyla oluşturuldu.");
  axios
    .post("http://192.168.2.237:8000/register", member)
    .then((response) => {
      successAlert;
      setMembers_name("");
      setMembers_surname("");
      setMembers_pass("");
      setMembers_email("");
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
        <View style={{ marginTop: 50 }}>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
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
                marginTop: 20,
              }}
            >
              <Ionicons
                style={{ marginLeft: 8 }}
                name="ios-person"
                size={24}
                color="#EA871C"
              />
              <TextInput
                value={members_name}
                onChangeText={(text) => setMembers_name(text)}
                style={{
                  color: "black",
                  marginVertical: 10,
                  width: 300,
                  fontSize: members_name ? 16 : 16,
                }}
                placeholder="Adınız"
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
              <Ionicons
                style={{ marginLeft: 8 }}
                name="ios-person"
                size={24}
                color="#EA871C"
              />
              <TextInput
                value={members_surname}
                onChangeText={(text) => setMembers_surname(text)}
                style={{
                  color: "black",
                  marginVertical: 10,
                  width: 300,
                  fontSize: members_surname ? 16 : 16,
                }}
                placeholder="Soyadınız"
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
          >
          </View>
          <View style={{ marginTop: 50 }} />
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
