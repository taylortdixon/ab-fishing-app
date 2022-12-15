import dayjs from "dayjs";
import { Provider as PaperProvider } from "react-native-paper";
import { AppTheme } from "./app-theme";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WaterbodyGroupList } from "./src/screens/waterbody-group-list/waterbody-group-list.screen";
import { WaterbodyDetailsScreen } from "./src/screens/waterbody-details/waterbody-details.screen";
import { RootStackParamList } from "./root-stack-param-list.type";
import { WaterbodyDetailsRegulationScreen } from "./src/screens/waterbody-details/waterbody-details-regulation.screen";
import { SafeAreaProvider } from "react-native-safe-area-context";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={AppTheme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          >
            <Stack.Screen
              name="WaterbodyGroupList"
              component={WaterbodyGroupList}
            />
            <Stack.Screen
              name="WaterbodyGroupDetails"
              component={WaterbodyDetailsScreen}
            />
            <Stack.Screen
              name="WaterbodyGroupDetailsRegulation"
              component={WaterbodyDetailsRegulationScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
