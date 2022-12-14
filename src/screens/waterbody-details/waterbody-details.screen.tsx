import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, View } from "react-native";
import { List, Text, useTheme } from "react-native-paper";
import { waterbodyGroups } from "../../../regulations/fishing-regulations";
import { FishLimit, Waterbody } from "../../../regulations/waterbody.type";
import { RootStackParamList } from "../../../root-stack-param-list.type";
import { AppBar } from "../../components/app-bar";
import { fishLimitsIconMap } from "../../components/fish-icons/fish-icons";
import { WaterbodyDetailsRegulationList } from "./waterbody-details-regulation-list";
import { FISH_LIMIT_LABELS } from "./waterbody-details.constants";

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
  const waterbodyGroup = waterbodyGroups[route.params.waterbodyGroupId];

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
            <Text variant="titleMedium" style={{ marginBottom: 12 }}>
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
                  style={{
                    backgroundColor: theme.colors.background,
                    marginTop: 0,
                    paddingLeft: 12,
                  }}
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
    <>
      <AppBar
        title="Alberta Fishing Regulations"
        onBack={() => navigation.goBack()}
      />
      <ScrollView style={{ marginHorizontal: 12 }}>
        <Text variant="displaySmall" style={{ marginVertical: 12 }}>
          {waterbodyGroup.name}
        </Text>
        {renderWaterbodyGroupDetails()}
      </ScrollView>
    </>
  );
};
