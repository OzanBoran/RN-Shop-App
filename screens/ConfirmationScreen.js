import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import { Entypo, Ionicons, FontAwesome5 } from "@expo/vector-icons";

const ConfirmationScreen = () => {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];

  const [currentStep, setCurrentStep] = useState(0);

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

  const [selectedAddress, setSelectedAddress] = useState("");

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
            <View style={{ justifyContent: "center", alignItems: "center" }}>
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
                  <FontAwesome5 name="dot-circle" size={24} color="#008397" />
                ) : (
                  <Entypo
                    onPress={() => setSelectedAddress(item)}
                    name="circle"
                    size={24}
                    color="gray"
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
                        backgroundColor: "#F5F5F5",
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
                        backgroundColor: "#F5F5F5",
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
                        backgroundColor: "#F5F5F5",
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
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
