import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

const DatePickerYear = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState();
    
  const [years, setYears] = useState([
    {label:"2024", value:"year1" },
    {label:"2025", value:"year2" },
    {label:"2026", value:"year3" },
    {label:"2027", value:"year4" },
    {label:"2028", value:"year5" },
    {label:"2029", value:"year6" },
    {label:"2030", value:"year7" },
    {label:"2031", value:"year8" },
    {label:"2032", value:"year9" },
  ]);

  return (
    <View>
      <DropDownPicker
        style={{
          borderColor: "#B7B7B7",
          height: 30,
          width: "50%",
        }}
        dropDownContainerStyle={{ width:"50%" }}
        open={open}
        value={value}
        items={years}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setYears}
        placeholder="Yıl"
        zIndex={3000}
        zIndexInverse={1000}
        listMode="SCROLLVIEW"
      />
    </View>
  )
}

export default DatePickerYear;

const styles = StyleSheet.create({})