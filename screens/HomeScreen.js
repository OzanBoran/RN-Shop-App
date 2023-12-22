import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";

const HomeScreen = () => {
  const list = [
    {
      id: "0",
      image:
        "https://dogusyapimarket.com.tr/uploads/p/p/Ycl-Yt1404-44-Cep-Organizer-Takim-Cantasi_1.jpg?v=1697209610",
      name: "Hırdavat",
    },
    {
      id: "1",
      image:
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-Wd-5-S-V-25622-Islak-Kuru-Elektrikli-Supurge-16283500_1.jpg?v=1659437850",
      name: "Karcher",
    },
    {
      id: "3",
      image:
        "https://dogusyapimarket.com.tr/uploads/p/p/Makita-DLX2220JX2-Akulu-Combo-Set-DTD155DDF483-2X3-AhSarj-Cihazi_1.jpg?v=1690013637",
      name: "Akülü Aletler",
    },
    {
      id: "4",
      image:
        "https://dogusyapimarket.com.tr/uploads/p/p/Bosch-Gst-8000-E-Gex-125-1-Ae_1.jpg?v=1702884651",
      name: "Elektrikli Aletler",
    },
    {
      id: "5",
      image:
        "https://dogusyapimarket.com.tr/uploads/p/p/Izeltas-Mekanikci-Takim-Cantasi-5-Gozlu-Dolu_1.jpg?v=1698923079",
      name: "El Aletleri",
    },
    {
      id: "6",
      image:
        "https://dogusyapimarket.com.tr/uploads/p/p/Bosch-Profosyonel-Beton-Delme-Vidalama-Seti-35-Li-2607017326_1.jpg",
      name: "Matkap Uçları",
    },
    {
      id: "7",
      image:
        "https://dogusyapimarket.com.tr/uploads/p/p/Bosch-Gol-20-D-bt-160-Gr500-optik-Nivelman_1.jpg",
      name: "Ölçüm Aletleri",
    },
    {
      id: "8",
      image:
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

  const offers = [
    {
      id: "0",
      title: "MAKİTA GA4530R AVUÇ TAŞLAMA",
      offer: "10%",
      oldPrice: "2615,00 TL",
      price: "2353,50 TL",
      image:
        "https://dogusyapimarket.com.tr/uploads/p/p/Makita-Ga4530r-Avuc-Taslama_1.jpg",
      carouselImages: [
        "https://dogusyapimarket.com.tr/uploads/p/p/Makita-Ga4530r-Avuc-Taslama_1.jpg",
        "https://dogusyapimarket.com.tr/uploads/p/p/Makita-Ga4530r-Avuc-Taslama_1.jpg",
        "https://dogusyapimarket.com.tr/uploads/p/p/Makita-Ga4530r-Avuc-Taslama_1.jpg",
        "https://dogusyapimarket.com.tr/uploads/p/p/Makita-Ga4530r-Avuc-Taslama_1.jpg",
      ],
    },
    {
      id: "1",
      title:
        "Karcher Puzzi 10/1 1250 W Profesyonel Halı Ve Koltuk Yıkama Makinesi 1.100-130.0",
      offer: "8%",
      oldPrice: "27750,00 TL",
      price: "25530,00 TL",
      image:
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-Puzzi-101-1250-W-Profesyonel-Hali-Yikama-Makinesi-1100-1300_1.jpg",
      carouselImages: [
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-Puzzi-101-1250-W-Profesyonel-Hali-Yikama-Makinesi-1100-1300_1.jpg",
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-Puzzi-101-1250-W-Profesyonel-Hali-Yikama-Makinesi-1100-1300_1.jpg",
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-Puzzi-101-1250-W-Profesyonel-Hali-Yikama-Makinesi-1100-1300_1.jpg",
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-Puzzi-101-1250-W-Profesyonel-Hali-Yikama-Makinesi-1100-1300_1.jpg",
      ],
    },
    {
      id: "2",
      title: "Makita 3711 El Freze Makinesi",
      offer: "11%",
      oldPrice: "3600,00 TL",
      price: "3204,00 TL",
      image:
        "https://dogusyapimarket.com.tr/uploads/p/p/Makita-3711-El-Freze-Makinesi_1.jpg?v=1679465638",
      carouselImages: [
        "https://dogusyapimarket.com.tr/uploads/p/p/Makita-3711-El-Freze-Makinesi_1.jpg?v=1679465638",
        "https://dogusyapimarket.com.tr/uploads/p/p/Makita-3711-El-Freze-Makinesi_1.jpg?v=1679465638",
        "https://dogusyapimarket.com.tr/uploads/p/p/Makita-3711-El-Freze-Makinesi_1.jpg?v=1679465638",
        "https://dogusyapimarket.com.tr/uploads/p/p/Makita-3711-El-Freze-Makinesi_1.jpg?v=1679465638",
      ],
    },
    {
      id: "3",
      title: "BOSCH PROMO 27 PARÇA TORNAVİDALI MATKAP UCU VE VİDALAMA SETİ",
      offer: "15%",
      oldPrice: "350,00 TL",
      price: "297,50 TL",
      image:
        "https://dogusyapimarket.com.tr/uploads/p/p/Bosch-Promo-27-Parca-Tornavidali-Matkap-Ucu-Ve-Vidalama-Seti_1.jpg",
      carouselImages: [
        "https://dogusyapimarket.com.tr/uploads/p/p/Bosch-Promo-27-Parca-Tornavidali-Matkap-Ucu-Ve-Vidalama-Seti_1.jpg",
        "https://dogusyapimarket.com.tr/uploads/p/p/Bosch-Promo-27-Parca-Tornavidali-Matkap-Ucu-Ve-Vidalama-Seti_1.jpg",
        "https://dogusyapimarket.com.tr/uploads/p/p/Bosch-Promo-27-Parca-Tornavidali-Matkap-Ucu-Ve-Vidalama-Seti_1.jpg",
        "https://dogusyapimarket.com.tr/uploads/p/p/Bosch-Promo-27-Parca-Tornavidali-Matkap-Ucu-Ve-Vidalama-Seti_1.jpg",
      ],
    },
  ];

  const karcher = [
    {
      id: "20",
      title: "Karcher Puzzi 8/1 Koltuk Yıkama Makinası 1.100.240.0",
      oldPrice: "19500,00 TL",
      price: "17745,00 TL",
      image:
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-Puzzi-81-Koltuk-Yikama-Makinasi-11002400_1.jpg?v=1686409780",
      carouselImages: [
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-Puzzi-81-Koltuk-Yikama-Makinasi-11002400_1.jpg?v=1686409780",
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-Puzzi-81-Koltuk-Yikama-Makinasi-11002400_1.jpg?v=1686409780",
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-Puzzi-81-Koltuk-Yikama-Makinasi-11002400_1.jpg?v=1686409780",
      ],
    },
    {
      id: "30",
      title: "Karcher WD6 Islak Kuru Elektrik Süpürgesi 1.628-360.0",
      oldPrice: "9300,00 TL",
      price: "8649,00 TL",
      image:
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-WD6-Islak-Kuru-Elektrik-Supurgesi-1628-3600_1.jpg?v=1702371690",
      carouselImages: [
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-WD6-Islak-Kuru-Elektrik-Supurgesi-1628-3600_1.jpg?v=1702371690",
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-WD6-Islak-Kuru-Elektrik-Supurgesi-1628-3600_1.jpg?v=1702371690",
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-WD6-Islak-Kuru-Elektrik-Supurgesi-1628-3600_1.jpg?v=1702371690",
      ],
    },
    {
      id: "40",
      title: "Karcher conversion Kit 2 From Unit 4.111-051.0",
      oldPrice: "9350,00 TL",
      price: "8695,50 TL",
      image:
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-conversion-Kit-2-From-Unit-4111-0510_1.jpg?v=1702026338",
      carouselImages: [
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-conversion-Kit-2-From-Unit-4111-0510_1.jpg?v=1702026338",
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-conversion-Kit-2-From-Unit-4111-0510_1.jpg?v=1702026338",
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-conversion-Kit-2-From-Unit-4111-0510_1.jpg?v=1702026338",
      ],
    },
    {
      id: "50",
      title: "Karcher EB 30/1 Lİ-ION Bataryalı Elektrik Süpürgesi 1.545-126.0",
      oldPrice: "8550,00 TL",
      price: "7780,50 TL",
      image:
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-EB-301-LI-ION-Bataryali-Elektrik-Supurgesi-1545-1260_1.jpg?v=1700546961",
      carouselImages: [
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-EB-301-LI-ION-Bataryali-Elektrik-Supurgesi-1545-1260_1.jpg?v=1700546961",
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-EB-301-LI-ION-Bataryali-Elektrik-Supurgesi-1545-1260_1.jpg?v=1700546961",
        "https://dogusyapimarket.com.tr/uploads/p/p/Karcher-EB-301-LI-ION-Bataryali-Elektrik-Supurgesi-1545-1260_1.jpg?v=1700546961",
      ],
    },
    {
      id: "60",
      title: "KARCHER HOSE ASSEMBLY TR DN6 25 MPa 10M 6.111-034.0",
      oldPrice: "3800,00 TL",
      price: "3458,00 TL",
      image:
        "https://dogusyapimarket.com.tr/uploads/p/p/KARCHER-HOSE-ASSEMBLY-TR-DN6-25-MPa-10M-6111-0340_1.jpg?v=1700555272",
      carouselImages: [
        "https://dogusyapimarket.com.tr/uploads/p/p/KARCHER-HOSE-ASSEMBLY-TR-DN6-25-MPa-10M-6111-0340_1.jpg?v=1700555272",
        "https://dogusyapimarket.com.tr/uploads/p/p/KARCHER-HOSE-ASSEMBLY-TR-DN6-25-MPa-10M-6111-0340_1.jpg?v=1700555272",
        "https://dogusyapimarket.com.tr/uploads/p/p/KARCHER-HOSE-ASSEMBLY-TR-DN6-25-MPa-10M-6111-0340_1.jpg?v=1700555272",
      ],
    },
    {
      id: "70",
      title: "Hard Surface Adapter 240 mm 4.762-014.0 puzi 10/1 için",
      oldPrice: "1200,00 TL",
      price: "1080,00 TL",
      image:
        "https://dogusyapimarket.com.tr/uploads/p/p/Hard-Surface-Adapter-240-mm-4762-0140_1.jpg?v=1694849407",
      carouselImages: [
        "https://dogusyapimarket.com.tr/uploads/p/p/Hard-Surface-Adapter-240-mm-4762-0140_1.jpg?v=1694849407",
        "https://dogusyapimarket.com.tr/uploads/p/p/Hard-Surface-Adapter-240-mm-4762-0140_1.jpg?v=1694849407",
        "https://dogusyapimarket.com.tr/uploads/p/p/Hard-Surface-Adapter-240-mm-4762-0140_1.jpg?v=1694849407",
      ],
    },
  ];

  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("jewellery");
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.log("Error message", error);
      }
    };
    fetchData();
  }, []);

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const cart = useSelector((state) => state.cart.cart);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fcd7ae66",
        }}
      >
        <ScrollView>
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#EA871C",
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
                color="#EA871C"
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
              backgroundColor: "#FFB669",
            }}
          >
            <Ionicons name="ios-location-outline" size={24} color="black" />
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: 500 }}>
                Deliver to Ozan - Marmaris 48700
              </Text>
            </Pressable>

            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
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
                  source={{ uri: item.image }}
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
            Öne Çıkanlar
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    oldPrice: item?.oldPrice,
                    carouselImages: item.carouselImages,
                    item: item,
                  })
                }
                key={index}
                style={{
                  marginVertical: 5,
                  marginHorizontal: 5,
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 180, height: 180, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
                <View
                  style={{
                    backgroundColor: "#E31837",
                    paddingVertical: 5,
                    width: 130,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    {item?.offer} indirim
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Karcher Marka Ürünler
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {karcher.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    oldPrice: item?.oldPrice,
                    carouselImages: item.carouselImages,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 5,
                  marginHorizontal: 5,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 180, height: 180, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
              </Pressable>
            ))}
          </ScrollView>

          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: "45%",
              marginBottom: open ? 50 : 15,
            }}
          >
            <DropDownPicker
              style={{
                borderColor: "#B7B7B7",
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category} //genderValue
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="Kategori Seçin"
              placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderOpen}
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {products
              ?.filter((item) => item.category === category)
              .map((item, index) => (
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
        <ModalContent style={{ width: "100%", height: 400 }}>
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
                {" "}
                Yeni adres ekle{" "}
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="ios-locate" size={22} color="#EA871C" />
              <Text style={{ color: "#EA871C", fontWeight: 400 }}>
                Mevcut konumumu kullan
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="ios-location-sharp" size={22} color="#EA871C" />
              <Text style={{ color: "#EA871C", fontWeight: 400 }}>
                Posta kodu girin
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({});
