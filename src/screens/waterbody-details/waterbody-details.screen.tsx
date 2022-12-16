import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet } from "react-native";
import { List, Text, useTheme } from "react-native-paper";
import { Waterbody } from "../../../regulations/waterbody.type";
import { RootStackParamList } from "../../../root-stack-param-list.type";
import { AppBar } from "../../components/app-bar";
import { WaterbodyDetailsRegulationList } from "./waterbody-details-regulation-list";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRegulationsContext } from "../../components/regulations.context";

type WaterbodyDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "WaterbodyGroupDetails"
>;

type WaterbodyDetailMap = Record<string, Waterbody[]>;

export const WaterbodyDetailsScreen: React.FC<WaterbodyDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();
  const { regulations } = useRegulationsContext();
  const waterbodyGroup =
    regulations.waterbody_groups[route.params.waterbodyGroupId];

  const waterbodiesByWaterbodyDetail =
    waterbodyGroup.waterbodies.reduce<WaterbodyDetailMap>((acc, waterbody) => {
      if (!acc[waterbody.waterbody_detail]) {
        acc[waterbody.waterbody_detail] = [];
      }

      acc[waterbody.waterbody_detail].push(waterbody);
      return acc;
    }, {});

  const renderWaterbodyGroupDetails = () => {
    if (waterbodyGroup.waterbodies.length === 1) {
      const waterbody = waterbodyGroup.waterbodies[0];
      return (
        <>
          {/* Don't display the waterbody detail again if its the same as the name which sometimes happens. */}
          {waterbody.waterbody !== waterbody.waterbody_detail && (
            <Text variant="titleMedium" style={styles.description}>
              {waterbody.waterbody_detail}
            </Text>
          )}

          <WaterbodyDetailsRegulationList waterbody={waterbody} />
        </>
      );
    }

    return (
      <>
        {Object.keys(waterbodiesByWaterbodyDetail).map((waterbodyDetail) => {
          return (
            <List.AccordionGroup key={waterbodyDetail}>
              <List.Accordion
                id={waterbodyDetail}
                title={<Text variant="titleMedium">{waterbodyDetail}</Text>}
                titleNumberOfLines={5}
              >
                <List.Section
                  style={[
                    styles.groupSection,
                    { backgroundColor: theme.colors.background },
                  ]}
                >
                  {renderWaterbodyDetails(
                    waterbodiesByWaterbodyDetail[waterbodyDetail]
                  )}
                </List.Section>
              </List.Accordion>
            </List.AccordionGroup>
          );
        })}
      </>
    );
  };

  const renderWaterbodyDetails = (waterbodies: Waterbody[]) => {
    if (waterbodies.length === 1) {
      return <WaterbodyDetailsRegulationList waterbody={waterbodies[0]} />;
    }

    return (
      <>
        <List.Subheader>Tap to view details</List.Subheader>
        {waterbodies.map((waterbody) => {
          return (
            <List.Item
              key={waterbody.id}
              title={waterbody.season}
              titleNumberOfLines={3}
              onPress={() =>
                navigation.navigate("WaterbodyGroupDetailsRegulation", {
                  waterbody,
                })
              }
            />
          );
        })}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppBar title="AB Fishing" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.container}>
        <Text variant="displaySmall" style={styles.title}>
          {waterbodyGroup.name}
        </Text>
        {renderWaterbodyGroupDetails()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { paddingHorizontal: 12 },
  title: { marginVertical: 12 },
  description: { marginBottom: 12 },
  groupSection: { marginTop: 0, paddingLeft: 12 },
});
