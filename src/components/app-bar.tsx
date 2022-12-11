import { Appbar, useTheme } from "react-native-paper";

type AppBarProps = {
  title: string;
  onBack?: () => void;
};

export const AppBar: React.FC<AppBarProps> = ({ title, onBack }) => {
  const theme = useTheme();

  return (
    <Appbar.Header
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
