import React from "react";
import { View, Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import CustomButtonLightSmall from "../Button/CustomButtonLightSmall";
import { windowHeight } from "../../../utilts/windowHeight";
import CustomButton from "../../common/Button/CustomButton";
import Footer from "../Footer/Footer";

const CustomModal = ({ clearErrorMessage, errors }) => {
  console.log(errors);
  if (errors.amount && errors.amount > 1)
    errors = ["The amount must be a number"];
  if (errors.username) {
    errors = errors.username;
  } else if (errors.amount) {
    errors = ["The amount must be a number"];
  }
  if (errors.includes("wrong_withdrawal_address"))
    errors = ["Wrong withdrawal address"];
  if (errors.includes("min_quantity_limit_exceeded"))
    errors = ["The amount must be more than 0"];
  if (errors.includes("the_selected_username_is_invalid"))
    errors = ["This username is not registred"];
  if (errors.includes("the_amount_must_be_greater_than_0"))
    errors = ["The amount must be more than 0"];
  if (errors.includes("invalid_credentials")) errors = ["Invalid credentials"];
  if (errors.includes("the_totp_field_is_required"))
    errors = ["Please enter the TOTP code"];
  if (errors.includes("invalid_totp_code")) errors = ["Invalid TOTP code"];

  return (
    <View>
      <Modal
        presentationStyle="fullScreen"
        transparent={true}
        visible={true}
        animationType={"slide"}
      >
        <View
          style={{
            alignContent: "stretch",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.container}>
            <Text style={{ fontSize: 36, fontWeight: "bold", marginTop: 140 }}>
              {errors && !errors.includes("Successfully!") ? (
                <Text>Error</Text>
              ) : null}
            </Text>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {errors.username ? (
                <Text style={{ fontSize: 25, textAlign: "center" }}>
                  {errors.username}
                </Text>
              ) : (
                errors.map((er, index) => (
                  <Text
                    style={{ fontSize: 25, textAlign: "center" }}
                    key={index}
                  >
                    {er}
                  </Text>
                ))
              )}
            </View>
            <CustomButton onPress={() => clearErrorMessage()}>
              {errors.includes("Successfully!") ? (
                <Text>Ok</Text>
              ) : (
                <Text>Try again</Text>
              )}
            </CustomButton>

            <Footer />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
});

export default CustomModal;
