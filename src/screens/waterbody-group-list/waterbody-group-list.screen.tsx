import {
  Appbar,
  useTheme,
  Button,
  List,
  Searchbar,
  Portal,
  Dialog,
  Paragraph,
  Text,
  Drawer,
  Modal,
} from "react-native-paper";
import { ScrollView, View } from "react-native";
import {
  regulations,
  waterbodyGroups,
} from "../../../regulations/fishing-regulations";
import { useState } from "react";
import { AppBar } from "../../components/app-bar";
import { filterWaterbodyGroup } from "./waterbody-group-list.utils";
import { WaterbodyFilterModal } from "./waterbody-filter-modal";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../root-stack-param-list.type";

type WaterbodyGroupListProps = NativeStackScreenProps<
  RootStackParamList,
  "WaterbodyGroupList"
>;

export const WaterbodyGroupList: React.FC<WaterbodyGroupListProps> = ({
  navigation,
}) => {
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [isOpenSeason, setIsOpenSeason] = useState(false);
  const [visible, setVisible] = useState(false);

  const onChangeSearch = (query) => setSearchQuery(query);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const filteredWaterbodyGroups = Object.values(waterbodyGroups).filter(
    filterWaterbodyGroup(searchQuery, isOpenSeason)
  );

  return (
    <>
      <AppBar title="Alberta Fishing Regulations" />
      <ScrollView>
        <Searchbar
          placeholder="Search for waterbody"
          icon="filter-variant"
          onChangeText={onChangeSearch}
          onIconPress={showDialog}
          value={searchQuery}
        />
        <List.Section>
          {filteredWaterbodyGroups.map((regulation) => (
            <List.Item
              key={regulation.id}
              title={<Text variant="titleLarge">{regulation.name}</Text>}
              // description={
              //   <Text variant="bodyMedium">{regulation.season}</Text>
              // }
              onPress={() =>
                navigation.navigate("WaterbodyGroupDetails", {
                  waterbodyGroupId: regulation.id,
                })
              }
            />
          ))}
        </List.Section>
      </ScrollView>
      <WaterbodyFilterModal
        isOpenSeason={isOpenSeason}
        visible={visible}
        onClose={hideDialog}
        onToggleOpenSeason={setIsOpenSeason}
      />
    </>
  );
};
