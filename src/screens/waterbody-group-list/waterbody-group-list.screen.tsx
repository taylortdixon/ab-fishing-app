import {
  Button,
  Dialog,
  List,
  Paragraph,
  Portal,
  Text,
} from "react-native-paper";
import { Animated, View, Linking } from "react-native";
import React, { useState, useRef, useMemo } from "react";
import { AppBar } from "../../components/app-bar";
import { filterWaterbodyGroup } from "./waterbody-group-list.utils";
import { WaterbodyFilterModal } from "./waterbody-filter-modal";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../root-stack-param-list.type";
import { WaterbodySearchBar } from "./waterbody-search-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRegulationsContext } from "../../components/regulations.context";
import { ConfirmationModal } from "./confirmation-modal";
import { WaterbodyGroup } from "../../../regulations/waterbody.type";

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

  const filteredWaterbodyGroups = useMemo(
    () =>
      Object.values(regulations.waterbody_groups).filter(
        filterWaterbodyGroup(searchQuery, isOpenSeason)
      ),
    [regulations, searchQuery, isOpenSeason]
  );

  const flatListData: Array<WaterbodyGroup | undefined> = useMemo(
    () =>
      filteredWaterbodyGroups.length > 0
        ? [undefined, ...filteredWaterbodyGroups]
        : [],
    [filteredWaterbodyGroups]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppBar title="AB Fishing" />
      <View style={{ position: "relative" }}>
        <WaterbodySearchBar
          searchValue={searchQuery}
          onChangeSearch={onChangeSearch}
          onShowSearchPanel={showDialog}
          animatedValue={scrollOffsetY}
        />

        <Animated.FlatList
          data={flatListData}
          renderItem={({ item: regulation }) => {
            if (!regulation) {
              return <Animated.View style={{ height: 52, zIndex: -1 }} />;
            }

            return (
              <List.Item
                key={regulation.id}
                title={<Text variant="titleLarge">{regulation.name}</Text>}
                onPress={() =>
                  navigation.navigate("WaterbodyGroupDetails", {
                    waterbodyGroupId: regulation.id,
                  })
                }
              />
            );
          }}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
          ListEmptyComponent={() => (
            <List.Section>
              <Animated.View style={{ height: 52, zIndex: -1 }} />
              <List.Item
                title={<Text variant="titleLarge">No results found</Text>}
              />
            </List.Section>
          )}
        ></Animated.FlatList>
      </View>
      <WaterbodyFilterModal
        isOpenSeason={isOpenSeason}
        visible={visible}
        onClose={hideDialog}
        onToggleOpenSeason={setIsOpenSeason}
      />
      <ConfirmationModal />
    </SafeAreaView>
  );
};
