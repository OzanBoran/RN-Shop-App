import {
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { convert } from "html-to-text";

const ProductInfoScreen = () => {
  const route = useRoute();

  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const height = (width * 100) / 100;

  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  const cart = useSelector((state) => state.cart.cart);

  const productText = (par) => {
    const options = {
      wordwrap: 130,
      // ...
    };
    let text = convert(par, options);
    return text;
  };

  return (
    <ScrollView
      style={{ marginTop: 55, flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
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

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ImageBackground
          style={{ width, height, marginTop: 25, resizeMode: "contain" }}
          source={{ uri: route?.params?.products_picture }}
        ></ImageBackground>
      </ScrollView>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: 500 }}>
          {route?.params?.products_name}
        </Text>

        <Text style={{ fontSize: 18, fontWeight: 600, marginTop: 6 }}>
          {route?.params?.products_price} TL
        </Text>
      </View>

      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
          Toplam {route.params.products_price} TL
        </Text>
        <Text style={{ color: "red" }}>
          250 TL ve üzeri alışverişlerde ücretsiz teslim.
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            alignItems: "center",
            gap: 5,
          }}
        >
          <Ionicons name="ios-location" size={24} color="black" />

          <Text style={{ fontSize: 15, fontWeight: 500 }}>
            Deliver To Ozan - Marmaris 48700
          </Text>
        </View>
      </View>

      <Text style={{ color: "green", marginHorizontal: 10, fontWeight: 500 }}>
        Ürün stokta mevcut
      </Text>

      <Pressable
        onPress={() => addItemToCart(route?.params?.item)}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        {addedToCart ? (
          <View>
            <Text>Sepete eklendi</Text>
          </View>
        ) : (
          <Text>Sepete ekle</Text>
        )}
      </Pressable>
      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />
      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          marginVertical: 5,
          marginHorizontal: 10,
        }}
      >
        Toplam {productText(route.params.products_text)}
      </Text>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
