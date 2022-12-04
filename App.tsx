import { Provider as PaperProvider } from "react-native-paper";
import { AppTheme } from "./app-theme";
import { WaterbodyGroupList } from "./src/features/waterbody-group-list";

export default function App() {
  return (
    <PaperProvider theme={AppTheme}>
      <WaterbodyGroupList />
    </PaperProvider>
  );
}
