import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { RootStackParamList } from "../../../root-stack-param-list.type";
import { AppBar } from "../../components/app-bar";
import { WaterbodyDetailsRegulationList } from "./waterbody-details-regulation-list";
import { SafeAreaView } from "react-native-safe-area-context";

type WaterbodyDetailsRegulationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "WaterbodyGroupDetailsRegulation"
>;

export const WaterbodyDetailsRegulationScreen: React.FC<
  WaterbodyDetailsRegulationScreenProps
> = ({ navigation, route }) => {
  const { waterbody } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppBar
        title="Alberta Fishing Regulations"
        onBack={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <Text variant="displaySmall" style={styles.title}>
          {waterbody.waterbody}
        </Text>
        <Text variant="titleMedium" style={styles.description}>
          {waterbody.waterbody_detail}
        </Text>
        <WaterbodyDetailsRegulationList waterbody={waterbody} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { paddingHorizontal: 12 },
  title: { marginVertical: 12 },
  description: { marginBottom: 12 },
});
