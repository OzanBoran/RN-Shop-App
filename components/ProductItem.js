import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ item }) => {
  const navigation = useNavigation();

  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  const BASE_URL = "https://dogusyapimarket.com.tr/";
  const ImageWithBaseUrl = (imageUri) => {
    const imageUriWithBase = BASE_URL.concat(imageUri);
    return imageUriWithBase;
  };

  return (
    <View
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
      <Pressable
        onPress={() =>
          navigation.navigate("Info", {
            id: item.id,
            products_name: item?.products_name,
            products_price: item?.products_price,
            oldPrice: item?.oldPrice,
            carouselImages: item.carouselImages,
            products_picture:ImageWithBaseUrl(item?.products_picture),
            products_text: item?.products_text,
            item: item,
          })
        }
      >
        <Image
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 5,
            width: 160,
            height: 160,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            resizeMode: "contain",
          }}
          source={{ uri: ImageWithBaseUrl(item?.products_picture) }}
        />
        <Text
          numberOfLines={2}
          style={{
            width: 180,
            marginTop: 10,
            paddingHorizontal: 5,
          }}
        >
          {item?.products_name}
        </Text>

        <View
          style={{
            marginTop: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 3,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {item?.products_price} TL
          </Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => addItemToCart(item)}
        style={{
          backgroundColor: "#FF8C00",
          padding: 10,
          borderBottomLeftRadius: 11,
          borderBottomRightRadius: 11,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        {addedToCart ? (
            <Text style={{ fontWeight:500 }} >Sepete eklendi</Text>
        ) : (
          <Text>Sepete ekle</Text>
        )}
      </Pressable>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
