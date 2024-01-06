import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={{ marginTop: 50, flex: 1, backgroundColor: "white" }}>
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
            color="#EA871Ccc"
          />
          <TextInput placeholder="Ürün Ara..." />
        </Pressable>
      </View>

      <View style={{ justifyContent:"center"}} >
        <Pressable
          style={{
            marginVertical: 7,
            marginHorizontal: 7,
            width: 180,
            borderWidth: 1,
            borderColor: "#FF8C0055",
            paddingTop: 3,
            borderRadius: 12,
            backgroundColor: "white",
          }}
        >
          <Image
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 5,
              width: 145,
              height: 160,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              resizeMode: "contain",
            }}
            source={require("../logo.png")}
          />

          <Text
            numberOfLines={1}
            style={{
              width: 180,
              marginTop: 10,
              paddingHorizontal: 5,
              textAlign: "center",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            Kategori
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
