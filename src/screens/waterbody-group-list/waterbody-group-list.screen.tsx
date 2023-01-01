import { List, Text } from "react-native-paper";
import { Animated, FlatList, View } from "react-native";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { AppBar } from "../../components/app-bar";
import { WaterbodyFilterModal } from "./waterbody-filter-modal";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../root-stack-param-list.type";
import { WaterbodySearchBar } from "./waterbody-search-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ConfirmationModal } from "./confirmation-modal";
import { WaterbodyGroup } from "../../../regulations/waterbody.type";
import { useFilteredWaterbodyGroups } from "./waterbody-group-list-filters.hook";
import { MAX_SEARCH_BAR_HEIGHT } from "./search-bar-animation.hook";
import { WelcomeModal } from "./welcome-modal/welcome-modal";

type WaterbodyGroupListProps = NativeStackScreenProps<
  RootStackParamList,
  "WaterbodyGroupList"
>;

export const WaterbodyGroupList: React.FC<WaterbodyGroupListProps> = ({
  navigation,
}) => {
  const { filteredWaterbodyGroups, searchFilters, updateSearchFilter } =
    useFilteredWaterbodyGroups();

  const [visible, setVisible] = useState(false);
  const waterbodyListRef = useRef<FlatList<WaterbodyGroup>>();
  let scrollOffsetY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    waterbodyListRef.current?.scrollToOffset({ animated: false, offset: 0 });
  }, [searchFilters]);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

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
          searchFilters={searchFilters}
          updateSearchFilter={updateSearchFilter}
          onShowSearchPanel={showDialog}
          animatedValue={scrollOffsetY}
        />

        <Animated.FlatList
          data={flatListData}
          ref={waterbodyListRef}
          renderItem={({ item: regulation }) => {
            if (!regulation) {
              return (
                <Animated.View
                  style={{ height: MAX_SEARCH_BAR_HEIGHT, zIndex: -1 }}
                />
              );
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
              <Animated.View
                style={{ height: MAX_SEARCH_BAR_HEIGHT, zIndex: -1 }}
              />
              <List.Item
                title={<Text variant="titleLarge">No results found</Text>}
                description="Use the default fish management zone regulations"
              />
            </List.Section>
          )}
        ></Animated.FlatList>
      </View>
      <WaterbodyFilterModal
        searchFilters={searchFilters}
        visible={visible}
        onClose={hideDialog}
        updateSearchFilter={updateSearchFilter}
      />
      <ConfirmationModal />
      <WelcomeModal />
    </SafeAreaView>
  );
};
