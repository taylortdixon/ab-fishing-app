import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { RootStackParamList } from "../../../root-stack-param-list.type";
import { AppBar } from "../../components/app-bar";
import { WaterbodyDetailsRegulationList } from "./waterbody-details-regulation-list";

type WaterbodyDetailsRegulationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "WaterbodyGroupDetailsRegulation"
>;

export const WaterbodyDetailsRegulationScreen: React.FC<
  WaterbodyDetailsRegulationScreenProps
> = ({ navigation, route }) => {
  const { waterbody } = route.params;

  return (
    <>
      <AppBar
        title="Alberta Fishing Regulations"
        onBack={() => navigation.goBack()}
      />
      <ScrollView style={{ paddingHorizontal: 12 }}>
        <Text variant="displaySmall" style={{ marginVertical: 12 }}>
          {waterbody.waterbody}
        </Text>
        <Text variant="titleMedium" style={{ marginBottom: 12 }}>
          {waterbody.waterbody_detail}
        </Text>
        <WaterbodyDetailsRegulationList waterbody={waterbody} />
      </ScrollView>
    </>
  );
};
