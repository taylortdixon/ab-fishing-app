import { Appbar, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Constants from "expo-constants";

type AppBarProps = {
  title: string;
  onBack?: () => void;
};

export const AppBar: React.FC<AppBarProps> = ({ title, onBack }) => {
  const { top } = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <Appbar.Header
      statusBarHeight={Constants.statusBarHeight}
      style={{
        backgroundColor: theme.colors.primary,
        zIndex: 2,
      }}
    >
      {onBack && <Appbar.BackAction onPress={onBack} />}
      <Appbar.Content title={title} color={theme.colors.onPrimary} />
    </Appbar.Header>
  );
};
