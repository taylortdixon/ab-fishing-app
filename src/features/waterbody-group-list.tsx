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
} from "react-native-paper";
import { ScrollView } from "react-native";
import { regulations } from "../../regulations/fishing-regulations";
import { useState } from "react";
import { AppBar } from "../components/app-bar";
import { filterWaterbodyGroup } from "./waterbody-group-list.utils";

export const WaterbodyGroupList = () => {
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [visible, setVisible] = useState(false);

  const onChangeSearch = (query) => setSearchQuery(query);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const filteredWaterbodies = regulations.filter(
    filterWaterbodyGroup(searchQuery)
  );

  return (
    <>
      <AppBar />
      <ScrollView>
        <Searchbar
          placeholder="Search for waterbody"
          icon="filter-variant"
          onChangeText={onChangeSearch}
          onIconPress={showDialog}
          value={searchQuery}
        />
        <List.Section>
          {filteredWaterbodies.map((regulation) => (
            <List.Item
              key={regulation.id}
              title={<Text variant="titleLarge">{regulation.waterbody}</Text>}
              description={
                <Text variant="bodyMedium">{regulation.season}</Text>
              }
            />
          ))}
        </List.Section>
      </ScrollView>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>This is simple dialog</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
