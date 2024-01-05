import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

const DatePickerMonth = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();

  const [months, setMonths] = useState([
    { label: "1", value: "Jan" },
    { label: "2", value: "Feb" },
    { label: "3", value: "Mar" },
    { label: "4", value: "Apr" },
    { label: "5", value: "May" },
    { label: "6", value: "Jun" },
    { label: "7", value: "Jul" },
    { label: "8", value: "Aug" },
    { label: "9", value: "Sep" },
    { label: "10", value: "Oct" },
    { label: "11", value: "Nov" },
    { label: "12", value: "Dec" },
  ]);

  return (
    <View>
      <DropDownPicker
        style={{
          borderColor: "#B7B7B7",
          height: 30,
          width: "40%",
        }}
        dropDownContainerStyle={{ width:"40%" }}
        open={open}
        value={value}
        items={months}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setMonths}
        placeholder="Ay"
        zIndex={3000}
        zIndexInverse={1000}
        listMode="SCROLLVIEW"
      />
    </View>
  );
};

export default DatePickerMonth;

const styles = StyleSheet.create({});
