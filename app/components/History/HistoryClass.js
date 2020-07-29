import React, { Component } from "react";
import Header from "../common/Header/Header";
import {
  ImageBackground,
  ScrollView,
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
} from "react-native";
import Footer from "../common/Footer/Footer";
import Accordian from "../common/Accordion/Accordion";
import { fetchHistory } from "../../redux/actions";
import { Preloader, Spiner } from "../common/Preloader/preloader";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

export default class HistoryClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.fetchHistory();
  }

  renderItem = ({ item }) => {
    return (
      <Accordian
        key={item.created_at}
        title={item.created_at}
        list={
          <View key={item.created_at} style={styles.child}>
            <View style={styles.child__item}>
              <Text style={styles.child__item__text}>Date/Time</Text>
              <Text style={styles.child__item__value}>{item.created_at}</Text>
            </View>
            <View style={styles.child__item}>
              <Text style={styles.child__item__text}>Coin</Text>
              <Text style={styles.child__item__value}>{item.asset_code}</Text>
            </View>
            <View style={styles.child__item}>
              <Text style={styles.child__item__text}>Amount</Text>
              <Text style={styles.child__item__value}>{item.amount}</Text>
            </View>
            <View style={styles.child__item}>
              <Text style={styles.child__item__text}>Fee</Text>
              <Text style={styles.child__item__value}>{item.fee}</Text>
            </View>
            <View style={styles.child__item}>
              <Text style={styles.child__item__text}>WalletAddress</Text>
              <Text style={styles.child__item__value}>{item.address}</Text>
            </View>
            <View style={styles.child__item}>
              <Text style={styles.child__item__text}>Type</Text>
              <Text style={styles.child__item__value}>
                {item.transaction_type}
              </Text>
            </View>
            <View style={styles.child__item}>
              <Text style={styles.child__item__text}>Status</Text>
              <Text style={styles.child__item__value}>{item.status}</Text>
            </View>
          </View>
        }
      />
    );
  };

  async fetchHistory(page) {
    const token = await AsyncStorage.getItem("token");
    let pageNew = page + 1;
    try {
      const { data } = await axios.get(
        `http://185.181.8.210:8901/api/user/wallets/history?current_page=${pageNew}&per_page=15`,
        {
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      console.log("data", data);
      this.setState({
        data: this.state.data.concat(data.transactions.data),
        isLoading: false,
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  handleLoadMore = () => {
    let newPage = this.state.page + 1;
    console.log("handeleloadMore");
    this.setState({ page: newPage, isLoading: true });
    this.fetchHistory(this.state.page);
  };

  renderFooter = () => {
    return this.state.isLoading ? (
      <View style={styles.loader}>
        <Image source={require('../../assets/spiner.gif')}/>
      </View>
    ) : null;
  };

  render() {
    console.log("alldata", this.state.data, this.state.page);
    return (
      <ScrollView>
        {this.state.data.length > 0 ? (
          <ImageBackground
            resizeMode="cover"
            source={require("../../assets/images/transactions/back.png")}
            style={styles.container}
          >
            <Header onPress={() => this.props.navigation.openDrawer()}>
              HISTORY
            </Header>
            {/* {history ? (
            <View style={styles.accordionContainer}>{renderAccordians()}</View>
          ) : null} */}
            <View style={styles.accordionContainer}>
              <FlatList
                style={{ flex: 1 }}
                keyExtractor={(item, index) => index.toString()}
                data={this.state.data}
                renderItem={this.renderItem}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0}
                ListFooterComponent={this.renderFooter}
              />
            </View>
            <Footer />
          </ImageBackground>
        ) : (
          <Spiner />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  child: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
  },
  child__item: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#e1e1e1",
    width: "100%",
  },
  child__item__text: {
    paddingLeft: 8,
    height: 45,
    width: "40%",
    backgroundColor: "#f4f4f4",
    textAlignVertical: "center",
  },
  child__item__value: {
    paddingLeft: 8,

    width: "60%",
    backgroundColor: "#fff",
    textAlignVertical: "center",
  },
  accordionContainer: {
    paddingTop: 50,
    paddingBottom: 100,
    marginTop: 75,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  loader: {
    marginTop: 10,
    alignItems: "center",
  },
});
