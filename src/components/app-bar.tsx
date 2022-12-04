import { Appbar, useTheme } from "react-native-paper";

export const AppBar = () => {
  const theme = useTheme();

  return (
    <Appbar.Header
      style={{
        backgroundColor: theme.colors.primary,
      }}
    >
      {/* <Appbar.BackAction onPress={() => {}} /> */}
      <Appbar.Content
        title="Alberta Fishing Regulations"
        color={theme.colors.onPrimary}
      />
    </Appbar.Header>
  );
};
