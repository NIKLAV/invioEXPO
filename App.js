/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useContext, useState } from "react";
import Login from "./app/components/Login/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import WithDraw from "./app/components/WithDraw/WithDraw";
import Wallets from "./app/components/Wallets/Wallets";
import Send from "./app/components/Send/Send";
import Navbar from "./app/components/Navbar/Navbar";
import DepositWithDraw from "./app/components/DepositWithDraw/DepositWithDraw";
import SendTable from "./app/components/SendTable/SendTable";
import Deposit from "./app/components/Deposit/Deposit";
import { createStackNavigator } from "@react-navigation/stack";

import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "./app/context/AuthContext";

import { Provider } from "react-redux";
import { store } from "./app/redux/store";
import StartPage from "./app/components/StartPage/StartPage";
import TransferHistory from "./app/components/History/TransferHistory";
import DepositWithdrawHistory from "./app/components/History/DepositWithdrawHistory";
import TradesHistory from "./app/components/History/TradesHistory";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const { navigation } = NavigationContainer;

const App = () => {
  /* const [touched, setTouched] = useState(1); */ 
  const { state } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: "#212123",
          activeBackgroundColor: "#fff",
          inactiveTintColor: "#212123",
          inactiveBackgroundColor: "#fff",
        }}
        drawerStyle={{
          borderRadius: 25,
        }}
        drawerContent={(props) => <Navbar {...props} />}
      >
        {!state.token ? (
          <>
            <Drawer.Screen
              options={{ swipeEnabled: false }}
              name="Login"
              component={Login}
            />
          </>
        ) : (
          <>
            <Drawer.Screen name="StartPage" component={StartPage} />
            <Drawer.Screen name="Wallets" component={Wallets} />
            <Drawer.Screen name="Send" component={Send} />
            <Drawer.Screen name="WithDraw" component={WithDraw} />
            <Drawer.Screen name="DepositWithDraw" component={DepositWithDraw} />
            <Drawer.Screen name="SendTable" component={SendTable} />
            <Drawer.Screen name="Deposit" component={Deposit} />
            <Drawer.Screen
              name="DepositWithdrawHistory"
              component={DepositWithdrawHistory}
            />
            <Drawer.Screen
              name="TransferHistory"
              component={TransferHistory}
            />
            <Drawer.Screen name="TradesHistory" component={TradesHistory} />
          </>
        )}
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
