import { List, Text } from "react-native-paper";
import { Animated, View } from "react-native";
import React, { useState, useRef } from "react";
import { AppBar } from "../../components/app-bar";
import { filterWaterbodyGroup } from "./waterbody-group-list.utils";
import { WaterbodyFilterModal } from "./waterbody-filter-modal";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../root-stack-param-list.type";
import { WaterbodySearchBar } from "./waterbody-search-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRegulationsContext } from "../../components/regulations.context";

type WaterbodyGroupListProps = NativeStackScreenProps<
  RootStackParamList,
  "WaterbodyGroupList"
>;

export const WaterbodyGroupList: React.FC<WaterbodyGroupListProps> = ({
  navigation,
}) => {
  const { regulations } = useRegulationsContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpenSeason, setIsOpenSeason] = useState(false);
  const [visible, setVisible] = useState(false);
  let scrollOffsetY = useRef(new Animated.Value(0)).current;

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const filteredWaterbodyGroups = Object.values(
    regulations.waterbody_groups
  ).filter(filterWaterbodyGroup(searchQuery, isOpenSeason));

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            {filteredWaterbodyGroups.length === 0 && (
              <List.Item
                title={<Text variant="titleLarge">No results found</Text>}
              />
            )}
            {filteredWaterbodyGroups.map((regulation) => (
              <List.Item
                key={regulation.id}
                title={<Text variant="titleLarge">{regulation.name}</Text>}
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
