import {
  Appbar,
  DataTable,
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
  useTheme,
  Button,
  List,
  Searchbar,
} from "react-native-paper";
import { ScrollView, StyleSheet } from "react-native";
import { regulations } from "./regulations/fishing-regulations";
import { useState } from "react";

export const Page = () => {
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <>
      <Appbar.Header
        style={{
          backgroundColor: theme.colors.primary,
        }}
      >
        {/* <Appbar.BackAction onPress={() => {}} /> */}
        <Appbar.Content
          title="Alberta Fishing Regulations"
          color={theme.colors.onPrimary}
        />
      </Appbar.Header>
      <ScrollView>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <List.Section>
          {regulations
            .filter((regulation) => {
              if (!searchQuery) return true;
              return regulation.waterbody
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            })
            .map((regulation) => (
              <List.Item
                key={regulation.id}
                title={regulation.waterbody}
                description={regulation.season}
                titleStyle={{ fontSize: 20 }}
                descriptionStyle={{ fontSize: 16 }}
              />
            ))}
        </List.Section>
      </ScrollView>
    </>
  );
};
