import React, { useContext, useState, useEffect } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Text,
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Linking,
} from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import useForm from "../../hooks/useForm";
import AsyncStorage from "@react-native-community/async-storage";
import { fetchHistory, fetchWallets } from "../../redux/actions";

const Navbar = (props) => {
  const [userName, setUsername] = useState("");

  useEffect(() => {
    const getName = async () => {
      const name = await AsyncStorage.getItem("name");
      setUsername(name);
    };
    getName();
  }, []);

  /* useEffect(() => {
    const updateData = props.navigation.addListener('drawerClose', (e) => {
      
    });
  }) */

  const { setCredentialsToNull } = useForm();
  const { signout, state } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <ImageBackground
          source={require("../../assets/images/navbar/logo.png")}
          style={styles.logo}
        >
          <Text style={styles.hello}>Hi, {userName || state.username}!</Text>
          {/* захаркодженный текст */}
        </ImageBackground>
      </View>
      <View>
        {/* <DrawerItemList {...props} /> */}

        <DrawerItem
          icon={() => (
            <Image source={require("../../assets/images/navbar/wallets.png")} />
          )}
          label={"Wallets"}
          onPress={() => props.navigation.navigate("Wallets")}
          labelStyle={styles.labelStyle}
          style={styles.borderTop}
        />

        <DrawerItem
          icon={() => (
            <Image source={require("../../assets/images/navbar/send.png")} />
          )}
          label={"Send"}
          onPress={() => props.navigation.navigate("Send")}
          labelStyle={styles.labelStyle}
          style={styles.borderTop}
        />

        <DrawerItem
          icon={() => (
            <Image
              source={require("../../assets/images/navbar/marketplace.png")}
            />
          )}
          label={"Marketplace"}
          onPress={
            () =>
              Linking.openURL(
                "https://reactnative.dev/docs/linking#get-the-deep-link"
              ) /* props.navigation.navigate('Transactions') */
          }
          labelStyle={styles.labelStyle}
          style={styles.borderTop}
        />

        <DrawerItem
          icon={() => <Image source={require("../../assets/history.png")} />}
          label={"History"}
          onPress={() => props.navigation.navigate("History")}
          labelStyle={styles.labelStyle}
          style={styles.borderTop}
        />

        <DrawerItem
          icon={() => <Image source={require("../../assets/transfer.png")} />}
          label={"Transfer"}
          onPress={() => props.navigation.navigate("Transfer")}
          labelStyle={styles.labelStyle}
          style={(styles.borderTop, { marginRight: 10 })}
        />

        <DrawerItem
          icon={() => (
            <Image source={require("../../assets/images/navbar/logout.png")} />
          )}
          label={"Logout"}
          onPress={async () => {
            setCredentialsToNull();
            await signout();
            props.navigation.navigate("Login");
          }}
          labelStyle={styles.labelStyle}
          style={styles.borderTop}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 85,
    paddingBottom: 92,
    marginHorizontal: 35,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 210,
    height: 43,
  },
  hello: {
    fontSize: 22,
  },
  labelStyle: {
    fontSize: 19,
    color: "#212123",
  },
  borderTop: {
    borderTopWidth: 0.2,
    borderColor: "#a0a0a0",
  },
  logout: {
    marginTop: 70,
  },
});

export default Navbar;
