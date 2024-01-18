import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartReducer";

const CartItem = (item) => {
  const dispatch = useDispatch();
  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };

  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };

  const deleteFromCart = (item) => {
    dispatch(removeFromCart(item));
  };
  return (
    <ScrollView>
      <View style={{ marginHorizontal: 10 }}>
          <View
            style={{
              backgroundColor: "white",
              marginVertical: 10,
              borderBottomColor: "#F0F0F0",
              borderWidth: 2,
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
            }}
          >
            <Pressable
              style={{
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Image
                  style={{ width: 140, height: 140, resizeMode: "contain" }}
                  source={{ uri: item?.products_picture }}
                />
              </View>
              <View>
                <Text numberOfLines={2} style={{ width: 150, marginTop: 10 }}>
                  {item?.products_name}
                </Text>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 }}
                >
                  {item?.products_price} TL
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={{
                marginTop: 15,
                marginBottom: 20,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 7,
                }}
              >
                {item?.quantity == 1 ? (
                  <Pressable
                    onPress={() => {
                      deleteFromCart(item);
                    }}
                    style={{
                      backgroundColor: "#D8D8D8",
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <AntDesign name="delete" size={24} color="black" />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => {
                      decreaseQuantity(item);
                    }}
                    style={{
                      backgroundColor: "#D8D8D8",
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <Feather name="minus" size={24} color="black" />
                  </Pressable>
                )}

                <Pressable
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 18,
                    paddingVertical: 6,
                  }}
                >
                  <Text>{item?.quantity}</Text>
                </Pressable>
                <Pressable
                  onPress={() => increaseQuantity(item)}
                  style={{
                    backgroundColor: "#D8D8D8",
                    padding: 7,
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                  }}
                >
                  <Feather name="plus" size={24} color="black" />
                </Pressable>
              </View>

              <Pressable
                onPress={() => deleteFromCart(item)}
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: "#C0C0C0",
                  borderWidth: 0.6,
                }}
              >
                <Text>Ürünü Sil</Text>
              </Pressable>
            </Pressable>

            <Pressable>
              <Pressable>
                <Text></Text>
              </Pressable>
            </Pressable>
          </View>
      </View>
    </ScrollView>
  );
};

export default CartItem;

const styles = StyleSheet.create({});
