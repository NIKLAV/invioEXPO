import React from "react";
import { View, Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import T from "i18n-react";
import CustomButtonLightSmall from "../Button/CustomButtonLightSmall";
import { windowHeight } from "../../../utilts/windowHeight";
import CustomButton from "../../common/Button/CustomButton";
import Footer from "../Footer/Footer";

const CustomModal = ({ clearErrorMessage, errors }) => {
  if (errors.amount && errors.amount > 1)
    errors = [T.translate("t_0075")];
  if (errors.username) {
    errors = errors.username;
  } else if (errors.amount) {
    errors = [T.translate("t_0075")];
  }
  if (errors.includes("wrong_withdrawal_address"))
    errors = [T.translate("t_0059")];
  if (errors.includes("min_quantity_limit_exceeded"))
    errors = [T.translate("t_0071")];
  if (errors.includes("the_selected_username_is_invalid"))
    errors = [T.translate("t_0070")];
  if (errors.includes("the_amount_must_be_greater_than_0"))
    errors = [T.translate("t_0071")];
  if (errors.includes("invalid_credentials")) errors = [T.translate("t_0072")];
  if (errors.includes("the_totp_field_is_required"))
    errors = [T.translate("t_0073")];
  if (errors.includes("invalid_totp_code")) errors = [T.translate("t_0074")];

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
              {errors &&
              !errors.includes(T.translate("t_0061")) &&
              !errors
                .toString()
                .split(" ")
                .join("")
                .includes(T.translate("t_0067")) ? (
                <Text>{T.translate("t_0057")}</Text>
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
              {errors.includes(T.translate("t_0061")) ||
              errors
                .toString()
                .split(" ")
                .join("")
                .includes(T.translate("t_0067")) ? (
                <Text>{T.translate("t_0056")}</Text>
              ) : (
                <Text>{T.translate("t_0055")}</Text>
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
