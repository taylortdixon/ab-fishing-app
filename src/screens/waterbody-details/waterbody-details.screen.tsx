import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView } from "react-native";
import { List, Text, useTheme } from "react-native-paper";
import { waterbodyGroups } from "../../../regulations/fishing-regulations";
import { FishLimit, Waterbody } from "../../../regulations/waterbody.type";
import { RootStackParamList } from "../../../root-stack-param-list.type";
import { AppBar } from "../../components/app-bar";
import { fishLimitsIconMap } from "../../components/fish-icons/fish-icons";
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

  return (
    <>
      <AppBar
        title="Alberta Fishing Regulations"
        onBack={() => navigation.goBack()}
      />
      <ScrollView style={{ marginHorizontal: 12 }}>
        <Text variant="displayMedium" style={{ marginTop: 12 }}>
          {waterbodyGroup.name}
        </Text>
        <>
          {Object.keys(waterbodiesByWaterbodyDetail).map((waterbodyDetail) => {
            return (
              <List.Section key={waterbodyDetail}>
                <List.Subheader numberOfLines={3}>
                  {waterbodyDetail}
                </List.Subheader>
                <List.AccordionGroup>
                  {waterbodiesByWaterbodyDetail[waterbodyDetail].map(
                    (waterbody) => {
                      return (
                        <List.Accordion
                          key={waterbody.id}
                          id={waterbody.id}
                          title={waterbody.season}
                          titleNumberOfLines={3}
                        >
                          <List.Item
                            title="Zone"
                            description={waterbody.fish_management_zone}
                          />
                          <List.Item
                            title="Bait Ban"
                            description={waterbody.bait_ban}
                          />
                          {Object.entries(waterbody.fish_limits).map(
                            ([limitName, limit]) => {
                              if (!limit) {
                                return null;
                              }

                              const Icon =
                                fishLimitsIconMap[limitName as FishLimit];

                              return (
                                <List.Item
                                  key={limitName}
                                  title={FISH_LIMIT_LABELS[limitName]}
                                  description={limit}
                                  left={() => <Icon width={50} height={50} />}
                                />
                              );
                            }
                          )}
                        </List.Accordion>
                      );
                    }
                  )}
                </List.AccordionGroup>
              </List.Section>
            );
          })}
        </>
      </ScrollView>
    </>
  );
};
