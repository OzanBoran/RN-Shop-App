import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import { Entypo, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import DatePickerMonth from "../components/DatePickerMonth";
import DatePickerYear from "../components/DatePickerYear";
import { useNavigation } from "@react-navigation/native";
import { cleanCart } from "../redux/CartReducer";

const ConfirmationScreen = () => {
  const navigation = useNavigation();

  const steps = [
    { title: "Adres", content: "Address Form" },
    { title: "Ödeme Yöntemi", content: "Payment Details" },
    { title: "Ödeme", content: "Payment" },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const cart = useSelector((state) => state.cart.cart);

  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

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

  const dispatch = useDispatch();
  
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedOption, setSelectedOption] = useState(false);

  let deliveryCost = 25;

  // Check if the total item cost is above free shipping limit
  total > 250 ? (deliveryCost = 0) : (deliveryCost = 25);

  /*
  const pay = async () => {
    try{

    } catch(error){
      console.log("Error:", error)
    }
  }
*/
  const handlePlaceOrder = async() => {
    try{
      const orderData = {
        userId:userId,
        cartItems:cart,
        totalPrice: total,
        shippingAddress:selectedAddress,
        paymentMethod: selectedOption
      }

      const response = await axios.post("http://192.168.2.237:8000/orders", orderData)
      if(response.status === 200) {
        navigation.navigate("Order");
        dispatch(cleanCart());
        console.log("Order created succesfully", response.data.order)
      } else {
        console.log("ERROR",error)
      }
    } catch(error) {
      console.log("Error", error)
    }
  }

  return (
    <ScrollView style={{ marginTop: 55 }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          {steps?.map((step, index) => (
            <View
              key={index}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              {index > 0 && (
                <View
                  style={[
                    {
                      flex: 1,
                      height: 2,
                      backgroundColor: "green",
                      marginBottom: 0.3,
                    },
                    index <= currentStep && { backgroundColor: "green" },
                  ]}
                />
              )}

              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{ textAlign: "center", marginTop: 8 }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep == 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Teslimat Adresi Seçin
          </Text>
          <Pressable>
            {addresses?.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: "#D0D0D0",
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  paddingBottom: 17,
                  marginVertical: 7,
                  borderRadius: 6,
                }}
              >
                {selectedAddress && selectedAddress._id === item?._id ? (
                  <FontAwesome5 name="dot-circle" size={20} color="#EA871CAA" />
                ) : (
                  <Entypo
                    onPress={() => setSelectedAddress(item)}
                    name="circle"
                    size={20}
                    color="#EA871C55"
                  />
                )}

                <View style={{ marginLeft: 6 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
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
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {" "}
                    Türkiye{" "}
                  </Text>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {" "}
                    Telefon Numarası: {item?.mobileNo}{" "}
                  </Text>

                  <View>
                    {selectedAddress && selectedAddress._id === item?._id && (
                      <Pressable
                        onPress={() => setCurrentStep(1)}
                        style={{
                          backgroundColor: "#FFC72C",
                          padding: 10,
                          borderRadius: 20,
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 10,
                        }}
                      >
                        <Text style={{ textAlign: "center", color: "black" }}>
                          Bu adrese gönder
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}

      {currentStep == 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Ödeme yönteminizi seçin
          </Text>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#EA871C77",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectedOption ? (
              <FontAwesome5 name="dot-circle" size={20} color="#EA871C77" />
            ) : (
              <Entypo
                onPress={() => setSelectedOption("card")}
                name="circle"
                size={20}
                color="#EA871C55"
              />
            )}
            <Text>Kredi / Banka Kartı</Text>
          </View>

          {!selectedOption ? (
            <Pressable
              style={{
                backgroundColor: "#FFC72C55",
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <Text>Ödeme Yöntemi Seçin</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => setCurrentStep(2)}
              style={{
                backgroundColor: "#FFC72C",
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <Text>Ödeme Adımına Devam Et</Text>
            </Pressable>
          )}
        </View>
      )}

      {currentStep == 2 && selectedOption == "card" && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
            Sipariş Detayı
          </Text>
          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#EA871C77",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 600, color: "#222" }}>
              {selectedAddress?.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 500, color: "gray" }}>
                Ürünler
              </Text>

              <Text style={{ color: "gray", fontSize: 16 }}>{total} TL</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 500, color: "gray" }}>
                Kargo Ücreti
              </Text>
              <Text style={{ color: "gray", fontSize: 16 }}>
                {deliveryCost} TL
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#555" }}>
                Toplam
              </Text>

              <Text style={{ color: "#555", fontSize: 18, fontWeight: "bold" }}>
                {total + deliveryCost} TL
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#EA871C77",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: "gray" }}>Ödeme Yöntemi</Text>
            <Text style={{ fontSize: 16, fontWeight: 600, marginTop: 7 }}>
              Kredi / Banka Kartı
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Kart Bilgileri
            </Text>
            <View
              style={{
                backgroundColor: "white",
                padding: 8,
                borderColor: "#EA871C77",
                borderWidth: 1,
                marginTop: 10,
              }}
            >
              <Text style={{ fontWeight: 500, marginBottom: 5, fontSize: 16 }}>
                Kart Sahibinin Adı ve Soyadı
              </Text>
              <TextInput
                style={{
                  backgroundColor: "#ddd",
                  borderRadius: 5,
                  height: 35,
                  paddingHorizontal: 15,
                }}
              />
              <Text
                style={{ fontWeight: 500, marginVertical: 5, fontSize: 16 }}
              >
                Kart No
              </Text>
              <TextInput
                style={{
                  backgroundColor: "#ddd",
                  borderRadius: 5,
                  height: 35,
                  paddingHorizontal: 15,
                }}
              />

              <View
                style={{
                  flexDirection: "column",
                  marginTop: 8,
                  marginBottom:24,
                  paddingRight:18
                }}
              >
                <Text
                  style={{
                    fontWeight: 500,
                    marginVertical: 5,
                    fontSize: 16,
                    marginRight: 10,
                  }}
                >
                  Son Kullanma Tarihi
                </Text>
                <View style={{ flexDirection:"row" }} >
                {<DatePickerMonth />}
                {<DatePickerYear />}
                </View>
              </View>

              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  marginTop: 8,
                }}
              >
                <Text
                  style={{ fontWeight: 500, marginVertical: 5, fontSize: 16 }}
                >
                  CVC
                </Text>
                <TextInput
                  style={{
                    backgroundColor: "#ddd",
                    borderRadius: 5,
                    height: 35,
                    width: "20%",
                  }}
                />
              </View>
            </View>
          </View>

          <Pressable
          onPress={handlePlaceOrder}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ fontWeight: 500 }}>Siparişi Tamamla</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
