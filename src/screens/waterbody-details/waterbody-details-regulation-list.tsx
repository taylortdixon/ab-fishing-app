import { View, Linking } from "react-native";
import { List } from "react-native-paper";
import { FishLimit, Waterbody } from "../../../regulations/waterbody.type";
import { fishLimitsIconMap } from "../../components/fish-icons/fish-icons";
import { FISH_LIMIT_LABELS } from "./waterbody-details.constants";

type WaterbodyDetailsRegulationListProps = {
  waterbody: Waterbody;
};

const ICON_WIDTH = 50;
const DummyIcon = <View style={{ width: ICON_WIDTH }} />; // Create a fake icon of same size so all the list items line up.

export const WaterbodyDetailsRegulationList: React.FC<
  WaterbodyDetailsRegulationListProps
> = ({ waterbody }) => {
  return (
    <>
      <List.Item
        title="Zone"
        description={waterbody.fish_management_zone}
        left={() => DummyIcon}
      />
      <List.Item
        title="Season"
        description={waterbody.season}
        left={() => DummyIcon}
      />
      <List.Item
        title="Bait Ban"
        description={waterbody.bait_ban}
        left={() => DummyIcon}
      />
      <List.Item
        title="Alberta Regulations"
        description="Tap to view official page"
        left={() => DummyIcon}
        onPress={() =>
          Linking.openURL(
            `https://albertaregulations.ca/fishingregs/${waterbody.fish_management_zone}.pdf`
          )
        }
      />
      {Object.entries(waterbody.fish_limits).map(([limitName, limit]) => {
        if (!limit) {
          return null;
        }

        const Icon = fishLimitsIconMap[limitName as FishLimit];

        return (
          <List.Item
            key={limitName}
            title={FISH_LIMIT_LABELS[limitName]}
            description={limit}
            left={() => <Icon width={50} height={50} />}
          />
        );
      })}
    </>
  );
};
