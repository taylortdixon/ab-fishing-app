import { Appbar, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { StyleSheet } from "react-native";

type AppBarProps = {
  title: string;
  onBack?: () => void;
};

export const AppBar: React.FC<AppBarProps> = ({ title, onBack }) => {
  const theme = useTheme();

  return (
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
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appBarHeader: {
    justifyContent: "flex-start",
    zIndex: 2,
  },
});
