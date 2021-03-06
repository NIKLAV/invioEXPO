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
import T from "i18n-react";
import { Context as AuthContext } from "../../context/AuthContext";
import useForm from "../../hooks/useForm";
import AsyncStorage from "@react-native-community/async-storage";
import { fetchHistory, fetchWallets } from "../../redux/actions";
import { useDispatch } from "react-redux";

const Navbar = (props) => {
  const { signout, state } = useContext(AuthContext);
  const [userName, setUsername] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const getName = async () => {
      const name = await AsyncStorage.getItem("name");
      console.log("name", name);
      setUsername(name);
    };
    getName();
  }, [signout]);

  const { setCredentialsToNull } = useForm();

  return (
    <DrawerContentScrollView {...props} style={{ paddingVertical: 35 }}>
      <View style={styles.header}>
        <ImageBackground
          source={require("../../assets/images/navbar/logo.png")}
          style={styles.logo}
        >
          <Text style={styles.hello}>
            {T.translate("t_0021")} {userName || state.username}!
          </Text>
        </ImageBackground>
      </View>
      <View>
        <DrawerItem
          icon={() => (
            <Image source={require("../../assets/images/navbar/wallets.png")} />
          )}
          label={T.translate("t_0022")}
          onPress={() => props.navigation.navigate("Wallets")}
          labelStyle={[styles.labelStyle, { paddingLeft: 5 }]}
          style={styles.borderTop}
        />

        <DrawerItem
          icon={() => (
            <Image source={require("../../assets/images/navbar/send.png")} />
          )}
          label={T.translate("t_0013")}
          onPress={() => props.navigation.navigate("Send")}
          labelStyle={[styles.labelStyle, { paddingLeft: 5 }]}
          style={styles.borderTop}
        />

        <DrawerItem
          icon={() => (
            <Image
              source={require("../../assets/images/navbar/marketplace.png")}
            />
          )}
          label={T.translate("t_0014")}
          onPress={
            () =>
              Linking.openURL(
                "http://185.181.8.210:8902/marketplace"
              ) /* props.navigation.navigate('Transactions') */
          }
          labelStyle={[styles.labelStyle, { paddingLeft: 5 }]}
          style={styles.borderTop}
        />

        <DrawerItem
          icon={() => <Image source={require("../../assets/history.png")} />}
          label={T.translate("t_0023")}
          onPress={() => props.navigation.navigate("TradesHistory")}
          labelStyle={[styles.labelStyle, { paddingLeft: 5 }]}
          style={styles.borderTop}
        />

        {/* <DrawerItem
          icon={() => <Image source={require("../../assets/transfer1.png")} />}
          label={"Transfer history"}
          onPress={() => props.navigation.navigate("Transfer")}
          labelStyle={[styles.labelStyle]}
          style={[styles.borderTop]}
        /> */}

        <DrawerItem
          icon={() => (
            <Image source={require("../../assets/images/navbar/logout.png")} />
          )}
          label={T.translate("t_0024")}
          onPress={async () => {
            setCredentialsToNull();
            dispatch({ type: "LOGOUT_TRANSFER" });
            dispatch({ type: "LOGOUT_HISTORY" });
            dispatch({ type: "LOGOUT_TRADES" });
            await signout();
            props.navigation.navigate("Login");
          }}
          labelStyle={[styles.labelStyle, { paddingLeft: 5 }]}
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
    borderTopWidth: 0.3,
    borderColor: "#a0a0a0",
  },
  logout: {
    marginTop: 70,
  },
});

export default Navbar;
