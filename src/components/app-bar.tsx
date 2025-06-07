import { Appbar, useTheme } from "react-native-paper";
import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { InfoDialog } from "./info-dialog";

type AppBarProps = {
  title: string;
  onBack?: () => void;
};

export const AppBar: React.FC<AppBarProps> = ({ title, onBack }) => {
  const theme = useTheme();
  const [infoModalVisible, setInfoModalVisible] = useState(false);

  return (
    <>
      <Appbar.Header
        statusBarHeight={Constants.statusBarHeight}
        style={[
          styles.appBarHeader,
          {
            backgroundColor: theme.colors.primary,
          },
        ]}
      >
        {onBack && <Appbar.BackAction onPress={onBack} />}
        <Appbar.Content title={title} color={theme.colors.onPrimary} />
        <Appbar.Action 
          icon="information-outline" 
          color={theme.colors.onPrimary} 
          onPress={() => setInfoModalVisible(true)} 
        />
      </Appbar.Header>

      <InfoDialog 
        visible={infoModalVisible} 
        onDismiss={() => setInfoModalVisible(false)} 
      />
    </>
  );
};

const styles = StyleSheet.create({
  appBarHeader: {
    justifyContent: "flex-start",
    elevation: 4,
    zIndex: 1,
  },
});
