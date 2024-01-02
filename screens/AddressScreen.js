import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import axios from "axios";

const AddressScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [openAddress, setOpenAddress] = useState("");
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [quarter, setQuarter] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [idNo, setIdNo] = useState("");
  const [company, setCompany] = useState("");
  const [taxNo, setTaxNo] = useState("");
  const [taxOffice, setTaxOffice] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Bireysel");
  const [items, setItems] = useState([
    { label: "Bireysel", value: "Bireysel" },
    { label: "Kurumsal", value: "Kurumsal" },
  ]);
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);
  
  const handleAddAdress = () => {
    const address = {
      name,
      mobileNo,
      openAddress,
      city,
      town,
      quarter,
      postalCode,
      company,
      taxNo,
      taxOffice,
      idNo,
    };

    axios
      .post("http://192.168.2.237:8000/addresses", { userId, address })
      .then((response) => {
        Alert.alert("Adres başarıyla kaydedildi");
        setName("");
        setMobileNo("");
        setOpenAddress("");
        setCity("");
        setTown("");
        setQuarter("");
        setPostalCode("");
        setCompany("");
        setTaxNo("");
        setTaxOffice("");
        setIdNo("");

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert("Hata!", "Adres oluşturulamadı.");
        console.log("error", error);
      });
  };

  return (
    <ScrollView style={{ marginTop: 50 }} automaticallyAdjustKeyboardInsets>
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
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Yeni bir adres ekleyin.
        </Text>

        <TextInput
          placeholder="Türkiye"
          placeholderTextColor={"black"}
          style={{
            padding: 10,
            borderColor: "#EA871C77",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        ></TextInput>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Tam ad (ad ve soyad)
          </Text>

          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={{
              padding: 10,
              borderColor: "#EA871C77",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Ad ve soyad"
            placeholderTextColor={"black"}
          ></TextInput>
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Teslimat için cep telefonu
          </Text>
          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            style={{
              padding: 10,
              borderColor: "#EA871C77",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="(5xx-xxx-xxxx)"
            placeholderTextColor={"black"}
          ></TextInput>
          <Text style={{ fontSize: 12 }}>
            Teslimata yardımcı olmak için kullanılabilir
          </Text>
        </View>

        <View style={{ marginTop: 30, marginBottom: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Adres satırı
          </Text>
          <TextInput
            value={openAddress}
            onChangeText={(text) => setOpenAddress(text)}
            style={{
              padding: 10,
              borderColor: "#EA871C77",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Açık adres"
            placeholderTextColor={"black"}
          ></TextInput>
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Şehir</Text>
          <TextInput
            value={city}
            onChangeText={(text) => setCity(text)}
            style={{
              padding: 10,
              borderColor: "#EA871C77",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          ></TextInput>
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>İlçe</Text>
          <TextInput
            value={town}
            onChangeText={(text) => setTown(text)}
            style={{
              padding: 10,
              borderColor: "#EA871C77",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          ></TextInput>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Mahalle / Köy
          </Text>
          <TextInput
            value={quarter}
            onChangeText={(text) => setQuarter(text)}
            style={{
              padding: 10,
              borderColor: "#EA871C77",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          ></TextInput>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Posta Kodu</Text>
          <TextInput
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            style={{
              padding: 10,
              borderColor: "#EA871C77",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          ></TextInput>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Fatura türü</Text>
          <DropDownPicker
            style={{
              borderColor: "#B7B7B7",
              height: 30,
              marginBottom: open ? 120 : 30,
              marginTop: 10,
              width: "45%",
              marginBottom: open ? 50 : 30,
            }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            defaultValue={value}
            listMode="SCROLLVIEW"
          />

          {value == "Kurumsal" ? (
            <View>
              <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 10 }}>
                Firma Ünvanı
              </Text>
              <TextInput
                value={company}
                onChangeText={(text) => setCompany(text)}
                style={{
                  padding: 10,
                  borderColor: "#EA871C77",
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
              ></TextInput>
              <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 10 }}>
                Vergi Numarası
              </Text>
              <TextInput
                value={taxNo}
                onChangeText={(text) => setTaxNo(text)}
                style={{
                  padding: 10,
                  borderColor: "#EA871C77",
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
              ></TextInput>
              <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 10 }}>
                Vergi Dairesi
              </Text>
              <TextInput
                value={taxOffice}
                onChangeText={(text) => setTaxOffice(text)}
                style={{
                  padding: 10,
                  borderColor: "#EA871C77",
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
              ></TextInput>
            </View>
          ) : (
            <View>
              <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 10 }}>
                TC kimlik numarası
              </Text>
              <TextInput
                value={idNo}
                onChangeText={(text) => setIdNo(text)}
                style={{
                  padding: 10,
                  borderColor: "#EA871C77",
                  borderWidth: 1,
                  marginTop: 10,
                  borderRadius: 5,
                }}
              ></TextInput>
            </View>
          )}
        </View>

        <Pressable
          onPress={handleAddAdress}
          style={{
            backgroundColor: "#FFC72C",
            padding: 19,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Adres Ekle</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
