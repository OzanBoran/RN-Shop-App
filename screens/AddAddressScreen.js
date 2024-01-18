import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";

const AddAddressScreen = () => {
  const navigation = useNavigation();

  const [addresses, setAddresses] = useState([]);
  const { memberId, setMemberId } = useContext(UserType);
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.2.237:8000/addresses/${memberId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };

  // Refresh the addresses when the component comes to the focus i.e when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    })
  )

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#EA871C55",
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="white" />
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
              
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
