import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import { jwtDecode } from "jwt-decode";

const HomeScreen = () => {
  const list = [
    {
      id: "1",
      picture:
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-Wd-5-S-V-25622-Islak-Kuru-Elektrikli-Supurge-16283500_1.jpg?v=1659437850",
      name: "Karcher",
    },
    {
      id: "3",
      picture:
        "https://dogusyapimarket.com.tr/uploads/p/p/Makita-DLX2220JX2-Akulu-Combo-Set-DTD155DDF483-2X3-AhSarj-Cihazi_1.jpg?v=1690013637",
      name: "Akülü Aletler",
    },
    {
      id: "4",
      picture:
        "https://dogusyapimarket.com.tr/uploads/p/p/Bosch-Gst-8000-E-Gex-125-1-Ae_1.jpg?v=1702884651",
      name: "Elektrikli Aletler",
    },
    {
      id: "5",
      picture:
        "https://dogusyapimarket.com.tr/uploads/p/p/Izeltas-Mekanikci-Takim-Cantasi-5-Gozlu-Dolu_1.jpg?v=1698923079",
      name: "El Aletleri",
    },
    {
      id: "6",
      picture:
        "https://dogusyapimarket.com.tr/uploads/p/p/Bosch-Profosyonel-Beton-Delme-Vidalama-Seti-35-Li-2607017326_1.jpg",
      name: "Matkap Uçları",
    },
    {
      id: "7",
      picture:
        "https://dogusyapimarket.com.tr/uploads/p/p/Bosch-Gol-20-D-bt-160-Gr500-optik-Nivelman_1.jpg",
      name: "Ölçüm Aletleri",
    },
    {
      id: "8",
      picture:
        "https://dogusyapimarket.com.tr/uploads/p/p/Bosch-Univeral-Verticut1100-Toprak-Havalandirma_1.jpg",
      name: "Bahçe",
    },
  ];

  const images = [
    "https://dogusyapimarket.com.tr/uploads/p/o/lt0IZVX6pFBC.png",
    "https://dogusyapimarket.com.tr/uploads/p/o/nOfmgtlJuFUW.png",
    "https://dogusyapimarket.com.tr/uploads/p/o/vzRW0MyKs96x.png",
    "https://dogusyapimarket.com.tr/uploads/p/o/X8DfxSvYmOPp.png",
    "https://dogusyapimarket.com.tr/uploads/p/o/KAbRl67PEeug.png",
    "https://dogusyapimarket.com.tr/uploads/p/o/d3ZuwECxB852.png",
    "https://dogusyapimarket.com.tr/uploads/p/o/F5x1dkn43PBi.png",
  ];

  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const { memberId, setMemberId } = useContext(UserType);
  const [selectedAddress, setSelectedAddress] = useState("");

  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyI4MjUyYjVkNjIzOTUwODQ4NmM5MjM3N2I3MGZiZjRlZmFkbV9sb2dnZWQiOnRydWUsIjgyNTJiNWQ2MjM5NTA4NDg2YzkyMzc3YjcwZmJmNGVmYWRtX3VzZXJpZCI6IjYiLCI4MjUyYjVkNjIzOTUwODQ4NmM5MjM3N2I3MGZiZjRlZmFkbV91c2VybmFtZSI6ImFwaV91c2VyIiwiODI1MmI1ZDYyMzk1MDg0ODZjOTIzNzdiNzBmYmY0ZWZhZG1fdXNlcmdyb3VwaWQiOiIzIiwiODI1MmI1ZDYyMzk1MDg0ODZjOTIzNzdiNzBmYmY0ZWZhZG1fdXNlcmlzYWRtaW4iOiIxIiwiODI1MmI1ZDYyMzk1MDg0ODZjOTIzNzdiNzBmYmY0ZWZhZG1fYXV0aF9saXN0IjoiKiIsIjgyNTJiNWQ2MjM5NTA4NDg2YzkyMzc3YjcwZmJmNGVmYWRtX2F1dGhfYWRkIjoiKiIsIjgyNTJiNWQ2MjM5NTA4NDg2YzkyMzc3YjcwZmJmNGVmYWRtX2F1dGhfZWRpdCI6IioiLCI4MjUyYjVkNjIzOTUwODQ4NmM5MjM3N2I3MGZiZjRlZmFkbV9hdXRoX3ZpZXciOiIqIiwiODI1MmI1ZDYyMzk1MDg0ODZjOTIzNzdiNzBmYmY0ZWZhZG1fYXV0aF9kZWwiOiIqIiwiODI1MmI1ZDYyMzk1MDg0ODZjOTIzNzdiNzBmYmY0ZWZhZG1fYXV0aF9kZXRhaWwiOiIqIiwiODI1MmI1ZDYyMzk1MDg0ODZjOTIzNzdiNzBmYmY0ZWZhZG1fYXV0aF9yZXBvcnQiOiIqIn0.jfLXQsL0_fu9iJA6pP4FuVSvU61P3NYWS4ueMsrllms"
  );
  myHeaders.append("Cookie", "ci_session=bar9kdte6me6102lrl5go4nhs8k7ejag");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    const getProducts = () => {
      fetch(
        "http://apitest.dogusyapimarket.com.tr/api/v2/products?pagination[perpage]=100",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setProducts(result.data);
        })
        .catch((error) => console.log("error", error));
    };

    getProducts();
  }, []);

  const cart = useSelector((state) => state.cart.cart);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (memberId) {
      fetchAddresses();
    }
  }, [memberId, modalVisible]);

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

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const memberId = decodedToken.memberId;
      setMemberId(memberId);
    };
    fetchUser();
  }, []);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fcd7ae11",
        }}
      >
        <ScrollView>
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#EA871C55",
            }}
          >
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

          <Pressable
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 10,
              backgroundColor: "#FFB66955",
            }}
          >
            <Ionicons name="ios-location-outline" size={24} color="black" />
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              {selectedAddress ? (
                <Text>
                  Alıcı: {selectedAddress?.name} - {selectedAddress?.city}{" "}
                  {selectedAddress?.postalCode}
                </Text>
              ) : (
                <Text style={{ fontSize: 13, fontWeight: 500 }}>
                  Adres ekleyin
                </Text>
              )}
            </Pressable>

            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
              onPress={(item) => products.filter}
                key={index}
                style={{
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: "contain",
                    borderRadius: 30,
                  }}
                  source={{ uri: item.picture }}
                />

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 10,
                    fontWeight: 500,
                    marginTop: 5,
                  }}
                >
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <SliderBox
            images={images}
            autoplay
            circleLoop
            dotColor={"#EA871C"}
            inactiveDotColor={"#fcd3a7"}
            imageComponentStyle={{ width: "100%" }}
            sliderBoxHeight={220}
          />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Bosch Marka Ürünler
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products
              ?.filter((item) => item.brands_brandid === "Bosch")
              .map((item, index) => (
                <ProductItem item={item} key={index} />
              ))}
          </ScrollView>

          <Text
            style={{
              height: 1,
              borderColor: "#EA871C55",
              borderWidth: 1,
              marginVertical: 10,
            }}
          />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Troy Marka Ürünler
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              {products
                ?.filter((item) => item.brands_brandid === "Troy")
                .map((item, index) => (
                  <ProductItem item={item} key={index} />
                ))}
            </View>
          </ScrollView>

          <Text
            style={{
              height: 1,
              borderColor: "#EA871C55",
              borderWidth: 1,
              marginVertical: 10,
            }}
          />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Karcher Marka Ürünler
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products
              ?.filter((item) => item.brands_brandid === "Karcher")
              .map((item, index) => (
                <ProductItem item={item} key={index} />
              ))}
          </ScrollView>

          <Text
            style={{
              height: 1,
              borderColor: "#EA871C55",
              borderWidth: 1,
              marginVertical: 10,
            }}
          />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
           Bütün Ürünler
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {products.map((item, index) => (
              <ProductItem item={item} key={index} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 300 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>
              Konumunuzu seçin
            </Text>
            <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
              Teslimat hızı, teslimat adresine bağlı olarak değişiklik
              gösterebilir.
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* Already added addresses */}
            {addresses?.map((item, index) => (
              <Pressable
                onPress={() => setSelectedAddress(item)}
                key={index}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#EA871C",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  marginRight: 15,
                  backgroundColor: selectedAddress ? "#EA871C22" : "white",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {item?.name}
                  </Text>
                  <Ionicons name="ios-location" size={20} color="black" />
                </View>
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 13, width: 130, textAlign: "center" }}
                >
                  {item?.quarter}, {item?.openAddress}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 13, fontWeight: 500 }}
                >
                  {item?.town}/{item?.city}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 13, width: 130, textAlign: "center" }}
                >
                  {item?.postalCode}
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Address");
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#EA871C88",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#EA871C",
                  fontWeight: 500,
                }}
              >
                Adresleri Yönet
              </Text>
            </Pressable>
          </ScrollView>
        </ModalContent>
      </BottomModal>
    </>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({});
