/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import Login from "./app/components/Login/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import WithDraw from "./app/components/WithDraw/WithDraw";
import Wallets from "./app/components/Wallets/Wallets";
import Send from "./app/components/Send/Send";
import Navbar from "./app/components/Navbar/Navbar";
import DepositWithDraw from "./app/components/DepositWithDraw/DepositWithDraw";
import SendTable from "./app/components/SendTable/SendTable";
import Deposit from "./app/components/Deposit/Deposit";
import History from "./app/components/History/History";
import { Provider as AuthProvider } from "./app/context/AuthContext";
import { setNavigator } from "./app/components/Login/navigationRef";
import Transfer from "./app/components/Transfer/Transfer";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";

const Drawer = createDrawerNavigator();
const { navigation } = NavigationContainer;

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: "#212123",
          activeBackgroundColor: "#fff",
          inactiveTintColor: "#212123",
          inactiveBackgroundColor: "#fff",
          itemStyle: { borderTopWidth: 0.3, borderColor: "#b4b4b4" },
        }}
        drawerStyle={{
          borderRadius: 25,
        }}
        drawerContent={(props) => <Navbar {...props} />}
      >
     {/*    <Drawer.Screen
          options={{ swipeEnabled: false }}
          name="Login"
          component={Login}
        /> */}
        <Drawer.Screen name="Wallets" component={Wallets} />
        <Drawer.Screen name="Send" component={Send} />
        <Drawer.Screen name="WithDraw" component={WithDraw} />
        <Drawer.Screen name="DepositWithDraw" component={DepositWithDraw} />
        <Drawer.Screen name="SendTable" component={SendTable} />
        <Drawer.Screen name="Deposit" component={Deposit} />
        <Drawer.Screen name="History" component={History} />
        <Drawer.Screen name="Transfer" component={Transfer} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

/* const styles = StyleSheet.create({}); */

export default () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <App
        /* ref={navigator => {
          setNavigator(navigator);
        }} */
        />
      </AuthProvider>
    </Provider>
  );
};
