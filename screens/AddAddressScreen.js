import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";

const AddAddressScreen = () => {
  const navigation = useNavigation();

  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.2.237:8000/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#EA871C",
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}
        >
          <Ionicons
            style={{ paddingLeft: 7 }}
            name="ios-search"
            size={22}
            color="#EA871C"
          />
          <TextInput placeholder="Ürün Ara..." />
        </Pressable>
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Adresleriniz</Text>

        <Pressable
          onPress={() => {
            navigation.navigate("Add");
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "#EA871C55",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}
        >
          <Text>Yeni adres ekleyin</Text>
          <AntDesign name="right" size={24} color="black" />
        </Pressable>

        <Text style={{ fontSize: 20, fontWeight: 500, marginTop: 10 }}>
          Kişisel Adresler
        </Text>
        <Pressable>
          {/* All the added addresses */}
          {addresses?.map((item, index) => (
            <Pressable
            key={index}
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#EA871C55",
                padding: 10,
                flexDirection: "column",
                gap: 5,
                marginVertical: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {" "}
                  {item?.name}{" "}
                </Text>
                <Ionicons name="ios-location" size={24} color="black" />
              </View>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                {" "}
                {item?.quarter}, {item?.openAddress}{" "}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                {" "}
                {item?.town}/{item?.city}{" "}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                {" "}
                {item?.postalCode}{" "}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}> Türkiye </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                {" "}
                Telefon Numarası: {item?.mobileNo}{" "}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 7,
                }}
              >
                <Pressable
                  style={{
                    backgroundColor:"#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#EA871C55",
                  }}
                >
                  <Text>Düzenle</Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor:"#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#EA871C55",
                  }}
                >
                  <Text>Kaldır</Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor:"#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#EA871C55",
                  }}
                >
                  <Text>Varsayılan Ayarla</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
