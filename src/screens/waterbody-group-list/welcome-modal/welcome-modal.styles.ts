import { StyleSheet } from "react-native";

export const welcomeModalStyles = StyleSheet.create({
  dialog: { bottom: 24 },
  dialogScrollArea: {
    paddingHorizontal: 0,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
  },
  buttonRow: { justifyContent: "space-between", marginVertical: 0 },
  subHeading: { marginTop: 24 },
  paragraph: { marginBottom: 24 },
});
