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
  const [members_gsm, setMembers_gsm] = useState("");
  const [members_address, setMembers_address] = useState("");
  const [cities_cityid, setCities_cityid] = useState("");
  const [towns_townid, setTowns_townid] = useState("");
  const [members_postcode, setMembers_postcode] = useState("");
  const [members_tcno, setMembers_tcno] = useState("");
  const [members_caption, setMembers_caption] = useState("");
  const [members_taxno, setMembers_taxno] = useState("");
  const [members_taxoffice, setMembers_taxoffice] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Bireysel");
  const [items, setItems] = useState([
    { label: "Bireysel", value: "Bireysel" },
    { label: "Kurumsal", value: "Kurumsal" },
  ]);
  const { memberId, setMemberId } = useContext(UserType);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const memberId = decodedToken.memberId;
      setMemberId(memberId);
    };
    fetchUser();
  }, []);

  const handleAddAdress = () => {
    const address = {
      members_gsm,
      members_address,
      cities_cityid,
      towns_townid,
      members_postcode,
      members_caption,
      members_taxno,
      members_taxoffice,
      members_tcno,
    };

    axios
      .post("http://192.168.2.237:8000/addresses", { memberId, address })
      .then((response) => {
        Alert.alert("Adres başarıyla kaydedildi");
        setMembers_gsm("");
        setMembers_address("");
        setCities_cityid("");
        setTowns_townid("");
        setMembers_postcode("");
        setMembers_caption("");
        setMembers_taxno("");
        setMembers_taxoffice("");
        setMembers_tcno("");

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
          backgroundColor: "#EA871C55",
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </Pressable>
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Yeni bir adres ekleyin.
        </Text>
        <Text
          style={{
            height: 1,
            borderColor: "#EA871C55",
            borderWidth: 1,
            marginVertical: 16,
          }}
        />

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Teslimat için cep telefonu
          </Text>
          <TextInput
            value={members_gsm}
            onChangeText={(text) => setMembers_gsm(text)}
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

        <View style={{ marginTop: 16, marginBottom: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Adres satırı</Text>
          <TextInput
            value={members_address}
            onChangeText={(text) => setMembers_address(text)}
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
            value={cities_cityid}
            onChangeText={(text) => setCities_cityid(text)}
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
            value={towns_townid}
            onChangeText={(text) => setTowns_townid(text)}
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
            value={members_postcode}
            onChangeText={(text) => setMembers_postcode(text)}
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
                value={members_caption}
                onChangeText={(text) => setMembers_caption(text)}
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
                value={members_taxno}
                onChangeText={(text) => setMembers_taxno(text)}
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
                value={members_taxoffice}
                onChangeText={(text) => setMembers_taxoffice(text)}
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
                value={members_tcno}
                onChangeText={(text) => setMembers_tcno(text)}
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
