import React, { useState, useEffect } from "react";

import {
  Picker,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { useDispatch } from "react-redux";
import setLanguage from "../../../redux/language/action";

const PickerComponent = ({ selectedValue, setSelectedValue }) => {
  const languages = ["eng", "spa"];
  const [open, setOpen] = useState(false);
  const openMenu = () => {
    setOpen(!open);
  };
  console.warn("selected value", selectedValue);
  const onSelectLanguage = (lng) => {
    console.warn("selected value", selectedValue);
    setSelectedValue(lng);
    setOpen(false);
  };

  return (
    <>
      <TouchableOpacity onPress={openMenu} style={styles.container}>
        <Image
          style={{ width: 10, height: 10 }}
          source={require("../../../assets/arrow_bottom.png")}
        />
      </TouchableOpacity>
      {open ? (
        <View style={styles.textContainer}>
          {languages.map((el) => (
            <TouchableOpacity onPress={() => onSelectLanguage(el)} style={{}}>
              <Text>{el.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}

          {/* <TouchableOpacity style={{ marginTop: 10 }}>
            <Text>SPA</Text>
          </TouchableOpacity> */}
        </View>
      ) : (
        <View style={styles.lng}>
          <Text style={{ color: "#fff" }}>{selectedValue.toUpperCase()}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 25,
    right: 50,
    width: 40,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  container: {
    position: "absolute",
    top: 30,
    right: 10,
    width: 30,
    height: 40,
    /*  backgroundColor: '#fff' */
  },
  lng: {
    position: "absolute",
    top: 25,
    right: 50,
  },
});

export default PickerComponent;
