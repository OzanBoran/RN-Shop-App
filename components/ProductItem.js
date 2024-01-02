import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const ProductItem = ({ item }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  return (
    <Pressable
      style={{
        marginVertical: 7,
        marginHorizontal: 7,
        width:180,
        borderWidth:1,
        borderColor:"#FF8C0055",
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
          width: 160,
          height: 160,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          resizeMode: "contain",
        }}
        source={{ uri: item?.image }}
      />

      <Text
        numberOfLines={1}
        style={{
          width: 180,
          marginTop: 10,
          paddingHorizontal: 5,
        }}
      >
        {item?.title}
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
          {item?.price} TL
        </Text>
        <Text style={{ color: "#FF8C00", fontWeight: "bold" }}>
          {item?.rating?.rate} ratings
        </Text>
      </View>

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
          <View>
            <Text>Sepete eklendi</Text>
          </View>
        ) : (
          <Text>Sepete ekle</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
