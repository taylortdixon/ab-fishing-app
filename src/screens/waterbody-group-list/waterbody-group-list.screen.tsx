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
import { Animated, ScrollView, View } from "react-native";
import {
  regulations,
  waterbodyGroups,
} from "../../../regulations/fishing-regulations";
import React, { useState, useRef } from "react";
import { AppBar } from "../../components/app-bar";
import { filterWaterbodyGroup } from "./waterbody-group-list.utils";
import { WaterbodyFilterModal } from "./waterbody-filter-modal";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../root-stack-param-list.type";
import { WaterbodySearchBar } from "./waterbody-search-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSearchBarAnimation } from "./search-bar-animation.hook";

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
  let scrollOffsetY = useRef(new Animated.Value(0)).current;

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const filteredWaterbodyGroups = Object.values(waterbodyGroups).filter(
    filterWaterbodyGroup(searchQuery, isOpenSeason)
  );

  return (
    <SafeAreaView>
      <AppBar title="Alberta Fishing Regulations" />
      <View style={{ position: "relative" }}>
        <WaterbodySearchBar
          searchValue={searchQuery}
          onChangeSearch={onChangeSearch}
          onShowSearchPanel={showDialog}
          animatedValue={scrollOffsetY}
        />

        <Animated.ScrollView
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
        >
          <Animated.View style={{ height: 52, zIndex: -1 }} />
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
        </Animated.ScrollView>
      </View>
      <WaterbodyFilterModal
        isOpenSeason={isOpenSeason}
        visible={visible}
        onClose={hideDialog}
        onToggleOpenSeason={setIsOpenSeason}
      />
    </SafeAreaView>
  );
};
